// MODULES //
import axios, { AxiosRequestConfig } from "axios";

// TYPES //
import { ApiResponseData } from "@/types/api";
import { AttendanceData, UpdateAttendanceData } from "@/types/attendance";

// CONSTANTS //
import { CONSTANTS } from "@/constants";

/** Get Players for Attendance by Date and batch */
export const getPlayersForAttendanceRequest = async (
  date: string,
  batch: string
): Promise<ApiResponseData<AttendanceData>> => {
  // Prepare the API Call
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${CONSTANTS.API_URL}get-players-for-attendance.php?date=${date}&team=${batch}`,
    headers: { "Content-Type": "application/json" },
  };

  // Make the API Call and return Data
  const response = await axios.request<ApiResponseData<AttendanceData>>(config);
  return response.data;
};

/**
 * Update attendance for a player.
 */
export const updateAttendanceRequest = async (
  skorostId: string,
  date: string,
  status: "P" | "A" | "E",
  team: string
): Promise<ApiResponseData<UpdateAttendanceData>> => {
  // Prepare the API Call
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${
      CONSTANTS.API_URL
    }update-attendance.php?skorostId=${encodeURIComponent(
      skorostId
    )}&date=${encodeURIComponent(date)}&status=${encodeURIComponent(
      status
    )}&team=${encodeURIComponent(team)}`,
    headers: { "Content-Type": "application/json" },
  };

  // Make the API Call and return Data
  const response = await axios.request<ApiResponseData<UpdateAttendanceData>>(
    config
  );
  return response.data;
};
