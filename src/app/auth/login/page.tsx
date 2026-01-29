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

/** Login Page */
export default function LoginPage() {
  // Define Navigation
  const router = useRouter();

  // States
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] =
    useState<string>("");

  /** Function to handle form submission */
  const handleSubmit = () => {
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
      // Example: Navigate to the next page or perform authentication
      router.push("/auth/verify-otp");
    }
  };

  return (
    <div className="container min-h-screen py-16 px-5 flex flex-col gap-20 sm:gap-24 relative">
      {/* Main Content */}
      <div className="flex flex-col gap-10 items-center">
        {/* Logo */}
        <BrandLogo size={90} />
        {/* Login Form */}
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
                  type="number"
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
            <Button onClick={handleSubmit} disabled={phoneNumber === ""}>
              Get Started
            </Button>
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
          loading="eager"
        />
      </div>
    </div>
  );
}
