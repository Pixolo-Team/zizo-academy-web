// MODULES //
import axios, { AxiosRequestConfig } from "axios";

// TYPES //
import { ApiResponseData } from "@/types/api";

// CONSTANTS //
import { CONSTANTS } from "@/constants";
import { supabase } from "../supabase";

export interface ReachOutInputData {
  name: string;
  email: string;
  message: string;
}

/** Send OTP to phone */
export const sendOtpRequest = async (
  phone: string,
): Promise<ApiResponseData<boolean>> => {
  const { error } = await supabase.auth.signInWithOtp({
    phone,
  });

  if (error) {
    return {
      status: false,
      data: false,
      message: error.message,
      status_code: error.status || 500,
    };
  }

  return {
    status: true,
    data: true,
    message: "OTP sent successfully",
    status_code: 200,
  };
};

/** Verify OTP */
export const verifyOtpRequest = async (
  phone: string,
  otp: string,
): Promise<ApiResponseData<boolean>> => {
  const { error } = await supabase.auth.verifyOtp({
    phone,
    token: otp,
    type: "sms",
  });

  if (error) {
    return {
      status: false,
      data: false,
      message: error.message,
      status_code: error.status || 500,
    };
  }

  return {
    status: true,
    data: true,
    message: "OTP verified successfully",
    status_code: 200,
  };
};

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
