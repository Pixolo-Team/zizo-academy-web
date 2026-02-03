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

// UTILS //
import { validatePhoneNumber } from "@/app/utils/validation";
import { sendOtpRequest } from "@/services/api/authentication.api.service";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

/** Login Page */
export default function LoginPage() {
  // Define Navigation
  const router = useRouter();

  const { phoneNumber, setPhoneNumber } = useAuth();

  // States
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] =
    useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /** Function to handle form submission */
  const handleSubmit = () => {
    // Start submission process
    setIsSubmitting(true);

    // Check if phone number is empty
    if (phoneNumber === "") {
      setPhoneNumberErrorMessage("Phone number is required");
    }
    // Check if phone number is invalid
    else if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberErrorMessage("Enter a valid 10-digit mobile number");
    }
    // Clear error message if phone number is valid
    else {
      setPhoneNumberErrorMessage("");
      // Proceed with form submission logic here
      // Make API call to send OTP
      sendOtpRequest(phoneNumber)
        .then((res) => {
          if (res.status) {
            toast.success("OTP sent successfully");
            router.push("/auth/verify-otp");
          } else {
            toast.error(res.message || "Failed to send OTP");
          }
        })
        .catch((error) => {
          toast.error("An unexpected error occurred");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
      return; // Exit the function to avoid setting isSubmitting to false again
    }
    // End submission process
    setIsSubmitting(false);
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
