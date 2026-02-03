"use client";

// REACT //
import { createContext, useContext, useState, ReactNode } from "react";

// OTHERS //
import { AuthResponse, Session, User } from "@supabase/supabase-js";

/** Auth context shape */
interface AuthContextType {
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  user?: UserData;
  setUser?: (user: UserData) => void;
}

export interface UserData {
  user: User | null;
  session: Session | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Define States
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [user, setUser] = useState<UserData | undefined>(undefined);

  return (
    <AuthContext.Provider
      value={{
        phoneNumber,
        setPhoneNumber,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to access auth context safely
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
