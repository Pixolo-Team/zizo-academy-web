/**
 * Represents a single player's attendance record.
 */
export interface AttendancePlayerData {
  playerName: string;
  skorostId: string; // can be empty string
  attendance: "Eligible" | "Present" | "Not Eligible";
}

/**
 * Represents full attendance response:
 * - eligible players
 * - not eligible players
 */
export interface AttendanceData {
  eligible: AttendancePlayerData[];
  notEligible: AttendancePlayerData[];
}
