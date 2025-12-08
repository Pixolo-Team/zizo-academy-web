// MODULES //
import axios, { AxiosRequestConfig } from "axios";

// TYPES //
import { ApiResponseData } from "@/types/api";
import { AttendanceData } from "@/types/attendance";

// CONSTANTS //
import { CONSTANTS } from "@/constants";

/** Get Players for Attendance by Date and batch */
export const getPlayersForAttendanceRequest = async (
  date: string,
  batch: string
): Promise<ApiResponseData<AttendanceData>> => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${CONSTANTS.API_URL}get-players-for-attendance.php?date=${date}&team=${batch}`,
    headers: { "Content-Type": "application/json" },
  };

  const response = await axios.request<ApiResponseData<AttendanceData>>(config);
  return response.data;
};
