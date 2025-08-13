"use client";

import BrandLogo from "@/app/components/brand-logo/BrandLogo";
import { validatePhoneNumber } from "@/app/utils/validation";
// COMPONENTS //
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// NEXT //
import Link from "next/link";

// REACT //
import { useState } from "react";

/** Login Page */
export default function LoginPage() {
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
      setPhoneNumberErrorMessage("Phone number is invalid");
    }
    // Clear error message if phone number is valid
    else {
      setPhoneNumberErrorMessage("");
    }
  };

  return (
    // Main container
    <div
      className="h-screen bg-n-50 flex flex-col gap-[58px] pl-14 pr-14 pt-24 pb-24 justify-start items-center
    max-md:px-5 max-md:py-14 max-md:gap-[44px]"
    >
      {/* Logo container */}
      <div className="flex flex-col justify-start items-center">
        {/* Brand logo */}
        <BrandLogo variant="color-icon" size={111} />
      </div>

      {/* Form container */}
      <div className="w-[24%] flex flex-col gap-6 justify-center items-center max-xl:w-[60%] max-md:w-full">
        {/* Form header */}
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl font-bold text-n-900">Kick off your journey</p>
          <p className="text-base font-normal text-n-700">
            Enter your phone number to get in the game
          </p>
        </div>

        {/* Form body */}
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full mb-5 flex flex-col gap-1">
            {/* Phone number input */}
            <Input
              id="phone"
              type="tel"
              placeholder="Enter Phone Number"
              className={`py-6 ps-3 pe-[56px] border-n-300 text-lg h-13 placeholder:text-n-400 ${
                phoneNumberErrorMessage ? "border-red-500" : ""
              }`}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {phoneNumberErrorMessage && (
              <p className="text-sm text-red-500">{phoneNumberErrorMessage}</p>
            )}
          </div>
          {/* Lets Play button and sign up link container */}
          <div className="w-full flex flex-col gap-10 justify-center items-center">
            {/* Lets Play button */}
            <Button
              className="w-full h-15 rounded-full text-lg font-medium bg-n-900 text-n-50 cursor-pointer hover:bg-n-700"
              type="submit"
              onClick={handleSubmit}
            >
              Lets Play
            </Button>
            {/* Sign up link */}
            <div className="flex gap-1 justify-start items-center">
              <p className="text-base font-normal text-n-900">Not a member?</p>
              <Link
                href="/auth/signup"
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
}
