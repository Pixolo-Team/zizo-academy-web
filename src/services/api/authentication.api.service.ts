// MODULES //
import axios, { AxiosRequestConfig } from "axios";

// TYPES //
import { ApiResponseData } from "@/types/api";

// CONSTANTS //
import { CONSTANTS } from "@/constants";

export interface ReachOutInputData {
  name: string;
  phoneNumber: string;
  message: string;
}

/** Reach Out API Request */
export const reachOutRequest = async (
  data: ReachOutInputData,
): Promise<ApiResponseData<boolean>> => {
  // Prepare the API Call
  const config: AxiosRequestConfig = {
    method: "post",
    url: `${CONSTANTS.API_URL}reach-out.php`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(data),
  };
  // Make the API Call and return Data
  const response = await axios.request<ApiResponseData<boolean>>(config);
  return response.data;
};
