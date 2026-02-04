"use server";

// TYPES //
import { ApiResponseData } from "@/types/api";

// OTHERS //
import { createClient } from "@/lib/supabase/server";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../supabase";

/** Send OTP to phone */
export async function sendOtpRequest(
  phone: string,
): Promise<ApiResponseData<boolean>> {
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
}

/** Verify OTP */
export async function verifyOtpRequest(
  phone: string,
  otp: string,
): Promise<ApiResponseData<Session | null>> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.verifyOtp({
    phone: "+91" + phone,
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
