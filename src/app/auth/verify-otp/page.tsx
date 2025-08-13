"use client";

// COMPONENTS //
import BrandLogo from "@/app/components/brand-logo/BrandLogo";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// REACT //
import { useState } from "react";

/** Verify OTP Page */
const VerifyOtpPage = () => {
  // State
  const [isError, setIsError] = useState(false);

  return (
    <div className="h-screen bg-n-50 flex flex-col gap-11 py-[56px] px-5 justify-start items-center">
      {/* Brand logo container */}
      <div className="flex flex-col gap-1 justify-start items-center">
        <BrandLogo variant="color-icon" size={111} />
      </div>
      {/* Form container */}
      <div
        className="w-[24%] flex flex-col gap-8 justify-center items-center 
      max-xl:w-[60%] max-md:w-full"
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
            <InputOTP maxLength={4}>
              <InputOTPGroup className="me-5">
                <InputOTPSlot className="size-12 text-n-900" index={0} />
              </InputOTPGroup>
              <InputOTPGroup className="me-5">
                <InputOTPSlot className="size-12 text-n-900" index={1} />
              </InputOTPGroup>
              <InputOTPGroup className="me-5">
                <InputOTPSlot className="size-12 text-n-900" index={2} />
              </InputOTPGroup>
              <InputOTPGroup>
                <InputOTPSlot className="size-12 text-n-900" index={3} />
              </InputOTPGroup>
            </InputOTP>
            {/* OTP error message */}
            {isError && (
              <p className="text-base font-normal text-red-500">
                You have entered the wrong OTP
              </p>
            )}
          </div>

          {/* Form actions container */}
          <div className="w-full flex flex-col gap-12 justify-center items-center">
            {/* Submit button */}
            <Button className="w-full h-15 rounded-full text-lg bg-n-900 text-n-50 cursor-pointer hover:bg-n-800">
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
