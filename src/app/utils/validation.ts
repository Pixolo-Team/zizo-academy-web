// CONSTANTS //
import { OTP_LENGTH } from "@/app/constants";

/** Function to validate phone number */
export function validatePhoneNumber(phoneNumber: string): boolean {
  if (!phoneNumber) return false;
  // Validates +91 followed by 10 digits
  const regex = /^\+91[6-9][0-9]{9}$/;
  return regex.test(phoneNumber);
}

/** Function to validate OTP */
export const validateOtp = (otp: string): boolean => {
  const otpRegex = new RegExp(`^[0-9]{${OTP_LENGTH}}$`);
  return otpRegex.test(otp);
};
