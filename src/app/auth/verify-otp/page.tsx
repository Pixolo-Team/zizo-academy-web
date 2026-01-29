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
import { useEffect, useState } from "react";

// UTILS //
import { validateOtp } from "@/app/utils/validation";
import Image from "next/image";
import PageHeader from "@/app/components/layout/Header";

const RESEND_INTERVAL = 30; // seconds

/** Verify OTP Page */
const VerifyOtpPage = () => {
  // State
  const [otpValue, setOtpValue] = useState<string>("");
  const [otpErrorMessage, setOtpErrorMessage] = useState<string>("");
  const [resendSeconds, setResendSeconds] = useState<number>(0);

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

  function handleResendOtp() {
    // 🔁 Call resend OTP API here
    const availableAt = Date.now() + RESEND_INTERVAL * 1000;
    localStorage.setItem("otp_resend_available_at", availableAt.toString());
    setResendSeconds(RESEND_INTERVAL);
  }

  useEffect(() => {
    if (resendSeconds <= 0) return;

    const timer = setInterval(() => {
      setResendSeconds((prev) => {
        if (prev <= 1) {
          localStorage.removeItem("otp_resend_available_at");
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendSeconds]);

  useEffect(() => {
    const storedTime = localStorage.getItem("otp_resend_available_at");

    if (storedTime) {
      const availableAt = Number(storedTime);
      const remaining = Math.ceil((availableAt - Date.now()) / 1000);

      if (remaining > 0) {
        setResendSeconds(remaining);
      }
    } else {
      handleResendOtp();
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 px-5 pb-6 min-h-screen relative">
      <PageHeader />
      <div className="container flex flex-col gap-24">
        {/* Brand logo container */}
        {/* Main Content */}
        <div className="flex flex-col gap-10 items-center">
          {/* Logo */}
          <BrandLogo size={90} />
          {/* Login Form */}
          <div className="flex flex-col gap-10 items-center">
            {/* Text Container */}
            <div className="flex flex-col gap-1 items-center">
              <p className="font-bold text-2xl leading-light text-n-900">
                Verify
              </p>
              <p className="text-lg text-n-500 leading-tight">
                Code sent to your mobile number
              </p>
            </div>
            {/* Form Container */}
            <div className="flex flex-col gap-10 items-center">
              <div className="flex flex-col gap-1.5">
                {/* OTP input */}
                <InputOTP
                  maxLength={5}
                  onChange={(e) => {
                    setOtpValue(e);
                    setOtpErrorMessage("");
                  }}
                  containerClassName="gap-1.5"
                >
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={0}
                      className={`${otpErrorMessage ? "border-red-500" : ""}`}
                    />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={1}
                      className={`${otpErrorMessage ? "border-red-500" : ""}`}
                    />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={2}
                      className={`${otpErrorMessage ? "border-red-500" : ""}`}
                    />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={3}
                      className={`${otpErrorMessage ? "border-red-500" : ""}`}
                    />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={4}
                      className={`${otpErrorMessage ? "border-red-500" : ""}`}
                    />
                  </InputOTPGroup>
                </InputOTP>

                {/* Error Message */}
                {otpErrorMessage && (
                  <p className="text-red-500 text-sm text-center">
                    {otpErrorMessage}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-5 items-center w-full">
                {/* Login Button */}
                <Button
                  onClick={handleSubmit}
                  className="w-full"
                  disabled={otpValue === ""}
                >
                  Get Started
                </Button>

                {resendSeconds > 0 ? (
                  <p className="text-sm text-n-800">
                    Resend Code available in{" "}
                    <span className="font-bold">
                      {String(resendSeconds).padStart(2, "0")}s
                    </span>
                  </p>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    className="font-bold text-xs px-3 py-2 rounded-4xl bg-n-200 text-n-900"
                  >
                    Resend Code
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-lg text-n-800">Having trouble logging in?</p>
          <Link
            href="#"
            className="font-bold text-sm px-4 py-3 rounded-4xl bg-n-200 text-n-900"
          >
            Reach Us
          </Link>
        </div>

        {/* Bottom Image */}
        <div className="absolute bottom-0 w-full left-0 -z-1">
          <Image
            src="/images/login-bottom-image.png"
            alt="Illustration"
            width={1920}
            height={95}
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
