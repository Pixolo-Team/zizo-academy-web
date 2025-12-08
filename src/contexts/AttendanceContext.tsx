"use client";

// REACT //
import React, { createContext, useContext, useState } from "react";

// TYPES //
import { SessionItemData } from "@/types/schedule";

/**
 * Context value containing session + setter.
 */
interface AttendanceContextValue {
  session: SessionItemData | null;
  setSession: (session: SessionItemData) => void;
}

// Create context
const AttendanceContext = createContext<AttendanceContextValue | undefined>(
  undefined
);

/**
 * Provider for attendance state.
 */
export const AttendanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Define States
  const [session, setSession] = useState<SessionItemData | null>(null);

  return (
    <AttendanceContext.Provider value={{ session, setSession }}>
      {children}
    </AttendanceContext.Provider>
  );
};

/**
 * Hook to access attendance context.
 */
export const useAttendance = () => {
  const ctx = useContext(AttendanceContext);
  if (!ctx)
    throw new Error("useAttendance must be used inside AttendanceProvider");
  return ctx;
};
