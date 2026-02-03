"use client";

// REACT //
import { useEffect, useState } from "react";

// ENUMS //
import { LocalStorageKeys } from "@/enums/local-storage.enum";

// COMPONENTS //
import BrandLogo from "@/app/components/brand-logo/BrandLogo";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/app/components/layout/Header";

// API SERVICES //
import {
  verifyOtpRequest,
  sendOtpRequest,
} from "@/services/api/authentication.api.service";

// CONTEXTS //
import { useAuth, UserData } from "@/contexts/AuthContext";

// UTILS //
import { validateOtp } from "@/app/utils/validation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// NEXT //

const RESEND_INTERVAL = 30; // seconds

/** Verify OTP Page */
const VerifyOtpPage = () => {
  // Define Navigation
  const router = useRouter();

  // Define Contexts
  const { phoneNumber, setUser } = useAuth();

  // State to store entered OTP value
  const [otpValue, setOtpValue] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // State to store OTP validation error
  const [otpErrorMessage, setOtpErrorMessage] = useState<string>("");

  // Countdown timer
  const [resendSeconds, setResendSeconds] = useState<number>(0);

  /** Function to handle OTP submission */
  function handleSubmit() {
    // Start verifying process
    setIsVerifying(true);

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
      // Proceed with OTP verification logic here
      // Make API call to verify OTP
      verifyOtp();
    }
    // End verifying process
    setIsVerifying(false);
  }

  /** Verify OTP Request */
  const verifyOtp = async () => {
    verifyOtpRequest(phoneNumber, otpValue)
      .then((res) => {
        if (res.status) {
          // OTP verified successfully
          // Proceed with further actions (e.g., navigate to dashboard)
          toast.success("OTP verified successfully");
          setUser && setUser(res.data as UserData);
          router.push("/");
        } else {
          // OTP verification failed, show error message
          setOtpErrorMessage(res.message || "Failed to verify OTP");
        }
      })
      .finally(() => {
        // End verifying process
        setIsVerifying(false);
        return;
      });
  };

  /** Starts resets otp and resends countdown */
  const sendResetOtp = () => {
    sendOtpRequest(phoneNumber).then((res) => {
      if (res.status) {
        toast.success("OTP resent successfully");
        // Set resend availability time in local storage
        const availableAt = Date.now() + RESEND_INTERVAL * 1000;
        localStorage.setItem(
          LocalStorageKeys.OTP_RESEND_AVAILABLE_AT,
          availableAt.toString(),
        );
        setResendSeconds(RESEND_INTERVAL);
      } else {
        toast.error(res.message || "Failed to resend OTP");
      }
    });
  };

  // Use Effects

  /** Countdown timer */
  useEffect(() => {
    // If countdown is already finished
    if (resendSeconds <= 0) return;

    // Timer that runs after every second
    const timer = setInterval(() => {
      setResendSeconds((prev) => {
        if (prev <= 1) {
          localStorage.removeItem("otp_resend_available_at");
          // Stop the timer
          clearInterval(timer);
          return 0;
        }
        // Decrease countdown by 1 second
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendSeconds]);

  // Restores resend timer on page refresh from local storage
  useEffect(() => {
    if (!phoneNumber) {
      router.push("/auth/login");
      return;
    }
    // Getting stored resend availability time from localStorage
    const storedTime = localStorage.getItem(
      LocalStorageKeys.OTP_RESEND_AVAILABLE_AT,
    );

    let nextResendSeconds = 0;

    if (storedTime) {
      // Convert stored value to number
      const availableAt = Number(storedTime);
      // Calculating remaining seconds
      nextResendSeconds = Math.ceil((availableAt - Date.now()) / 1000);

      if (nextResendSeconds > 0) {
        setResendSeconds(nextResendSeconds);
      }
    } else {
      sendResetOtp();
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 px-5 pb-6 min-h-screen relative">
      <PageHeader />
      <div className="container flex flex-col gap-20 sm:gap-24">
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
                Code sent to +91 {phoneNumber}
              </p>
            </div>

            {/* Form Container */}
            <div className="flex flex-col gap-10 items-center">
              <div className="flex flex-col gap-1.5">
                {/* OTP input */}
                <InputOTP
                  maxLength={6}
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
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={5}
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
                {/* Confirm Button */}
                <Button
                  onClick={handleSubmit}
                  className="w-full"
                  disabled={otpValue === "" || isVerifying}
                >
                  {isVerifying ? "Verifying..." : "Confirm"}
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
                    onClick={sendResetOtp}
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
            href="/auth/reach-us"
            className="font-bold text-sm px-4 py-3 rounded-4xl bg-n-200 text-n-900"
          >
            Reach Us
          </Link>
        </div>

        {/* Bottom Image */}
        <div className="absolute bottom-0 w-full left-0 -z-1">
          <Image
            src="/images/auth/login-bottom-image.png"
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
