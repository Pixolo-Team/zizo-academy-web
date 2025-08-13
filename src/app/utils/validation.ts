// CONSTANTS //
import { OTP_LENGTH } from "@/app/constants";

/** Function to validate phone number */
export function validatePhoneNumber(phoneNumber: string): boolean {
  const regex = /^[0-9]{10}$/;
  return regex.test(phoneNumber);
}

/** Function to validate OTP */
export const validateOtp = (otp: string): boolean => {
  const otpRegex = new RegExp(`^[0-9]{${OTP_LENGTH}}$`);
  return otpRegex.test(otp);
};
