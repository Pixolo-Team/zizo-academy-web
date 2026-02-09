"use client";

// REACT //
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// SERVICES //
import { supabase } from "@/services/supabase";

// OTHERS //
import { Session } from "@supabase/supabase-js";

// SUPABASE //

/** App-level user (from your backend later) */
export interface AppUser {
  phone: string;
}

/** Auth context shape */
interface AuthContextType {
  session: Session | null;
  setSession: (session: Session | null) => void;

  user: AppUser | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user] = useState<AppUser | null>(null); // future API
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    /**
     * 1️⃣ Restore session on refresh
     */
    const restoreSession = async () => {
      // Get session from supabase
      const { data, error } = await supabase.auth.getSession();

      // If component is unmounted, return
      if (!isMounted) return;

      // If there is an error, log it and set session to null
      if (error) {
        console.error("Error restoring session:", error);
        setSession(null);
      } else {
        setSession(data.session ?? null);
      }

      // Set loading to false
      setIsLoading(false);
    };

    // Restore session on mount
    restoreSession();

    /**
     * 2️⃣ Listen for auth changes
     */
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;
        setSession(session);
      },
    );

    /**
     * 3️⃣ Cleanup
     */
    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        setSession,
        user, // always null for now
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Safe hook
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
