// CONSTANTS //
import { MAX_OTP_LENGTH } from "@/app/constants";

/** Function to validate OTP */
export const validateOtp = (otp: string): boolean => {
  const otpRegex = new RegExp(`^[0-9]{${MAX_OTP_LENGTH}}$`);
  return otpRegex.test(otp);
};
