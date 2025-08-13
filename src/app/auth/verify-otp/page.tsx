"use client";

// COMPONENTS //
import BrandLogo from "@/app/components/brand-logo/BrandLogo";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

// NEXT //
import Link from "next/link";

// REACT //
import { useState } from "react";

// UTILS //
import { validateOtp } from "@/app/utils/validation";

/** Verify OTP Page */
const VerifyOtpPage = () => {
  // State
  const [otpValue, setOtpValue] = useState<string>("");
  const [otpErrorMessage, setOtpErrorMessage] = useState<string>("");

  /** Function to handle OTP submission */
  function handleSubmit() {
    // Check OTP length and set error message if invalid
    if (!otpValue.length) {
      setOtpErrorMessage("Please enter OTP");
    }
    // If OTP is too long, set error message
    else if (!validateOtp(otpValue)) {
      setOtpErrorMessage("Please enter a valid OTP");
    }
    // Otherwise, clear the error message
    else {
      setOtpErrorMessage("");
    }
  }

  return (
    <div className="h-screen bg-n-50 flex flex-col gap-11 py-14 px-5 justify-start items-center">
      {/* Brand logo container */}
      <div className="flex flex-col gap-1 justify-start items-center">
        <BrandLogo variant="color-icon" size={111} />
      </div>
      {/* Form container */}
      <div
        className="w-6/25 flex flex-col gap-8 justify-center items-center 
      max-xl:w-6/10 max-md:w-full"
      >
        {/* Form title and subtitle */}
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl font-extrabold text-n-900">Verify & Play</p>
          <p className="text-base font-normal text-n-700">
            We&apos;ve sent a 6-digit code to your number.
          </p>
          <p className="text-base font-normal text-n-700">
            Enter it here to take the next step.
          </p>
        </div>

        {/* OTP input container */}
        <div className="w-full flex flex-col gap-6 justify-center items-center">
          <div className="flex flex-col gap-2 justify-center items-center">
            {/* OTP input */}
            <InputOTP
              maxLength={4}
              onChange={(e) => setOtpValue(e)}
              containerClassName="gap-5"
            >
              <InputOTPGroup>
                <InputOTPSlot
                  className="size-12 text-n-900"
                  index={0}
                  placeholder="X"
                />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot
                  className="size-12 text-n-900"
                  index={1}
                  placeholder="X"
                />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot
                  className="size-12 text-n-900"
                  index={2}
                  placeholder="X"
                />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot
                  className="size-12 text-n-900"
                  index={3}
                  placeholder="X"
                />
              </InputOTPGroup>
            </InputOTP>
            {/* OTP error message */}
            {otpErrorMessage && (
              <p className="text-base font-normal text-red-500">
                {otpErrorMessage}
              </p>
            )}
          </div>

          {/* Form actions container */}
          <div className="w-full flex flex-col gap-12 justify-center items-center">
            {/* Submit button */}
            <Button
              className="w-full h-15 rounded-full text-lg bg-n-900 text-n-50 cursor-pointer hover:bg-n-800"
              onClick={handleSubmit}
            >
              Let&apos;s Play
            </Button>
            {/* Sign up link */}
            <div className="flex gap-1 justify-start items-center">
              <span className="text-base font-normal text-n-900">
                Not a member?
              </span>
              <Link
                href="/auth/sign-up"
                className="text-base font-bold text-n-900"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
