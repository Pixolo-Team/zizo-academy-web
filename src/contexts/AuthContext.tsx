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
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;

  session: Session | null;
  setSession?: (session: Session | null) => void;

  user: AppUser | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AppUser | null>(null); // future API
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    /**
     * 1️⃣ Restore session on refresh
     */
    const restoreSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!isMounted) return;

      if (error) {
        console.error("Error restoring session:", error);
        setSession(null);
      } else {
        setSession(data.session ?? null);
      }

      setIsLoading(false);
    };

    restoreSession();

    /**
     * 2️⃣ Listen for auth changes
     */
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;
        console.log("Auth event:", _event);

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
        phoneNumber,
        setPhoneNumber,
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
