// MODULES //
import axios, { AxiosRequestConfig } from "axios";

// TYPES //
import { ApiResponseData } from "@/types/api";

// CONSTANTS //
import { CONSTANTS } from "@/constants";

export interface AddCoachInputData {
  name: string;
  email: string;
  phone: string;
  imageUrl?: string;
}

/** Add Coach API Request */
export const addCoachRequest = async (
  data: AddCoachInputData,
): Promise<ApiResponseData<boolean>> => {
  // Prepare the API Call
  const config: AxiosRequestConfig = {
    method: "post",
    url: `${CONSTANTS.API_URL}add-coach.php`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(data),
  };
  // Make the API Call and return Data
  const response = await axios.request<ApiResponseData<boolean>>(config);
  return response.data;
};
