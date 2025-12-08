import { AttendanceStatus } from "@/enums/attendance.enum";

/**
 * Represents a single player's attendance record.
 */
export interface AttendancePlayerData {
  playerName: string;
  skorostId: string; // can be empty string
  attendance: AttendanceStatus;
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

export interface UpdateAttendanceData {
  updatedCell: string;
  skorostId: string;
  date: string;
  status: "P" | "A" | "E" | "NE";
}
