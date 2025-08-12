"use client";

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
  const [isError, setIsError] = useState<boolean>(true);

  return (
    // Main container
    <div
      className="h-screen flex flex-col gap-16 pl-14 pr-14 pt-24 pb-24 justify-start items-center
    max-md:px-5 max-md:py-14"
    >
      {/* Logo container */}
      <div className="flex flex-col gap-16 justify-start items-center">
        {/* <BrandLogo /> */}
      </div>

      {/* Form container */}
      <div className="w-[30%] flex flex-col gap-6 justify-center items-center max-xl:w-[60%] max-md:w-full">
        {/* Form header */}
        <div className="flex flex-col justify-center items-center">
          <span className="text-2xl font-semibold text-n-900">
            Kick off your journey
          </span>
          <span className="text-base font-normal text-n-700">
            Enter your phone number to get in the game
          </span>
        </div>

        {/* Form body */}
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full mb-5 flex flex-col gap-1 justify-center items-center">
            {/* Phone number input */}
            <Input
              id="phone"
              type="tel"
              placeholder="Enter Phone Number"
              className={`py-6 ps-3 pe-[56px] border-n-300 ${
                isError ? "border-red-500" : ""
              }`}
            />
            {isError && (
              <p className="text-sm text-red-500">
                The phone number you entered is not a Zizo user
              </p>
            )}
          </div>
          {/* Lets Play button and sign up link container */}
          <div className="w-full flex flex-col gap-10 justify-center items-center">
            {/* Lets Play button */}
            <Button
              className="w-full h-13 rounded-full text-lg font-medium bg-n-900 text-n-50 cursor-pointer hover:bg-n-700"
              type="submit"
            >
              Lets Play
            </Button>
            {/* Sign up link */}
            <div className="flex gap-1 justify-start items-center">
              <span className="text-base font-normal text-n-900">
                Not a member?
              </span>
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
