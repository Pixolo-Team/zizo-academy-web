"use client";

// REACT //
import { useState } from "react";
import { useRouter } from "next/navigation";

// COMPONENTS //
import BrandLogo from "@/app/components/brand-logo/BrandLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

// API SERVICES //
import {
  checkPhoneExistsRequest,
  sendOtpRequest,
} from "@/services/api/authentication.api.service";

// UTILS //
import { validatePhoneNumber } from "@/app/utils/validation";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

// ENUMS //
import { LocalStorageKeys } from "@/enums/local-storage.enum";

/** Login Page */
export default function LoginPage() {
  // Define Navigation
  const router = useRouter();

  // Define Contexts

  // Define States
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] =
    useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /** Function to handle form submission */
  const handleSubmit = async () => {
    // Add country code
    const fullPhoneNumber = "+91" + phoneNumber;
    // Start submission process
    setIsSubmitting(true);

    // Check if phone number is invalid
    if (!validatePhoneNumber(fullPhoneNumber)) {
      setPhoneNumberErrorMessage("Enter a valid 10-digit mobile number");
      setIsSubmitting(false);
      return;
    }

    // Clear error message if phone number is valid
    setPhoneNumberErrorMessage("");

    try {
      // Check if phone number exists
      const checkPhoneResponse = await checkPhoneExistsRequest(fullPhoneNumber);

      // If status is false, show error message
      if (!checkPhoneResponse.status) {
        toast.error(
          checkPhoneResponse.message || "Failed to verify phone number",
        );
        setIsSubmitting(false);
        return;
      }

      // If data is false, show error message
      if (!checkPhoneResponse.data) {
        toast.error("Phone number not registered. Please sign up first.");
        setIsSubmitting(false);
        return;
      }

      // Phone exists, send OTP
      const otpResponse = await sendOtpRequest(fullPhoneNumber);

      // If status is true, show success message
      if (otpResponse.status) {
        toast.success("OTP sent successfully");
        // Store in localStorage
        localStorage.setItem(LocalStorageKeys.PHONE_NUMBER, fullPhoneNumber);
        router.push(ROUTES.VERIFY_OTP);
      } else {
        toast.error("Well… that didn’t work. OTP not sent");
      }
    } catch (error) {
      console.error(error);
      toast.error("Oops! That one’s on us. OTP failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container min-h-screen py-16 px-5 flex flex-col gap-20 sm:gap-24 relative">
      {/* Main Content */}
      <div className="flex flex-col gap-10 items-center">
        {/* Logo */}
        <BrandLogo size={90} showText={true} />

        <div className="flex flex-col gap-10 items-center">
          {/* Text Container */}
          <div className="flex flex-col gap-1 items-center">
            <p className="font-bold text-2xl leading-light text-n-900">
              Sign In
            </p>
            <p className="text-lg text-n-500 leading-tight">
              using your phone number
            </p>
          </div>

          {/* Form Container */}
          <div className="flex flex-col gap-10 items-center">
            <div className="flex flex-col gap-1.5">
              <div className="flex gap-2 items-end">
                {/* Country Code */}
                <span className="text-3xl text-n-400 border-b-2 border-n-400 pb-2">
                  +91
                </span>
                <Input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  placeholder=""
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (phoneNumberErrorMessage) {
                      setPhoneNumberErrorMessage("");
                    }
                  }}
                  className={`
                              border-0
                              border-b-2
                              border-b-n-600
                              rounded-none
                              focus-visible:ring-0 
                              focus-visible:ring-offset-0
                              focus:border-b-n-600
                              shadow-none
                              text-5xl 
                              text-n-800
                              font-normal
                              leading-none
                              placeholder:text-n-400
                              placeholder:text-xl
                              p-0
                              h-[60px]
                              ${phoneNumberErrorMessage ? "border-b-red-500" : ""}
                            `}
                />
              </div>

              {/* Error Message */}
              {phoneNumberErrorMessage && (
                <p className="text-red-500 text-sm text-center">
                  {phoneNumberErrorMessage}
                </p>
              )}
            </div>

            {/* Login Button */}
            <Button
              variant="secondary"
              onClick={handleSubmit}
              disabled={phoneNumber === "" || isSubmitting}
              className="h-[62px] w-full rounded-full py-4 px-6 gap-4 bg-n-900 text-xl font-bold text-n-50 hover:bg-n-850 hover:scale-102 ease-in-out transition-all"
            >
              {isSubmitting ? "Sending OTP..." : "Get Started"}
            </Button>
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
          loading="eager"
        />
      </div>
    </div>
  );
}
