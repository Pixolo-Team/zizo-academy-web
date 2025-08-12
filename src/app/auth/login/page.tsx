"use client";

// COMPONENTS //
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// NEXT //
import Link from "next/link";

export default function LoginPage() {
  return (
    // Main container
    <div className="h-screen flex flex-col gap-16 pl-14 pr-14 pt-24 pb-24 justify-start items-center">
      {/* Logo container */}
      <div className="flex flex-col gap-0.5 justify-start items-center">
        {/* <BrandLogo /> */}
      </div>

      {/* Form container */}
      <div className="flex flex-col gap-6 justify-center items-center">
        {/* Form header */}
        <div className="flex flex-col justify-center items-center">
          <span className="text-2xl font-bold text-n-900">
            Kick off your journey
          </span>
          <span className="text-base font-normal text-n-700">
            Enter your phone number to get in the game
          </span>
        </div>

        {/* Form body */}
        <div className="w-full flex flex-col justify-center items-center">
          {/* Phone number input */}
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            className="mb-5"
          />
          {/* Lets Play button and sign up link container */}
          <div className="w-full flex flex-col gap-10 justify-center items-center">
            {/* Lets Play button */}
            <Button className="w-full h-13 rounded-full" type="submit">
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
