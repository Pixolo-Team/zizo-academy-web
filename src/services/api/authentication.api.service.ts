// MODULES //
import axios, { AxiosRequestConfig } from "axios";

// TYPES //
import { ApiResponseData } from "@/types/api";

// CONSTANTS //
import { CONSTANTS } from "@/constants";
import { supabase } from "../supabase";
import { UserData } from "@/contexts/AuthContext";
import { AuthResponse, Session, User } from "@supabase/supabase-js";

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
    phone: "+91" + phone,
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
): Promise<ApiResponseData<UserData>> => {
  const { data, error } = await supabase.auth.verifyOtp({
    phone: "+91" + phone,
    token: otp,
    type: "sms",
  });

  if (error) {
    return {
      status: false,
      data: data,
      message: error.message,
      status_code: error.status || 500,
    };
  }

  return {
    status: true,
    data: data,
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
