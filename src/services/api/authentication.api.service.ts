"use server";

// TYPES //
import { ApiResponseData } from "@/types/api";

// OTHERS //
import { createClient } from "@/lib/supabase/server";
import { Session } from "@supabase/supabase-js";

// SERVICES //
import { supabase } from "@/services/supabase";

// API SERVICES //
import axios, { AxiosRequestConfig } from "axios";

// CONSTANTS //
import { CONSTANTS } from "@/constants";

/** Send OTP to phone */
export async function sendOtpRequest(
  phone: string,
): Promise<ApiResponseData<boolean>> {
  // Send OTP to phone using Supabase
  const { error } = await supabase.auth.signInWithOtp({
    phone,
    options: {
      shouldCreateUser: false,
    },
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
}

/** Verify OTP */
export async function verifyOtpRequest(
  phone: string,
  otp: string,
): Promise<ApiResponseData<Session | null>> {
  // Create a new server-side Supabase client
  const serverSupabase = await createClient();

  // Verify OTP using Supabase
  const { data, error } = await serverSupabase.auth.verifyOtp({
    phone,
    token: otp,
    type: "sms",
  });

  if (error) {
    return {
      status: false,
      data: null,
      message: error.message,
      status_code: error.status || 500,
    };
  }

  return {
    status: true,
    data: data.session,
    message: "OTP verified successfully",
    status_code: 200,
  };
}

/** Check if phone number exists in users table */
export async function checkPhoneExistsRequest(
  phone: string,
): Promise<ApiResponseData<boolean>> {
  // TODO: Replace with actual API call or Supabase query
  // const supabase = await createClient()
  // const { data, error } = await supabase
  //   .from('users')
  //   .select('phone')
  //   .eq('phone', '+91' + phone)
  //   .single()

  // For now, return true (phone exists)
  return {
    status: true,
    data: true,
    message: "Phone number exists",
    status_code: 200,
  };
}

export interface ReachOutInputData {
  name: string;
  phoneNumber: string;
  message: string;
}

/** Reach out to us API Request */
export async function reachOutRequest(
  data: ReachOutInputData,
): Promise<ApiResponseData<boolean>> {
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
}
