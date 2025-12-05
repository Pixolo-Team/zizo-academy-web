// MODULES //
import axios, { AxiosRequestConfig } from "axios";

// TYPES //
import { ApiResponseData } from "@/types/api";
import { SessionItemData } from "@/types/schedule";

// CONSTANTS //
import { CONSTANTS } from "@/constants";

/** Get Sessions by Date */
export const getSessionsRequest = async (
  date: string
): Promise<ApiResponseData<SessionItemData[]>> => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${CONSTANTS.API_URL}get-sessions.php?date=${date}`,
    headers: { "Content-Type": "application/json" },
  };

  const response = await axios.request<ApiResponseData<SessionItemData[]>>(
    config
  );
  return response.data;
};
