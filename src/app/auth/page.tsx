// COMPONENTS //
import { Button } from "@/components/ui/button";

// NEXTJS //
import Image from "next/image";

export default function Auth() {
  return (
    // Main container
    <div className="h-screen relative bg-n-50 overflow-hidden">
      {/* Left side container */}
      <div
        className="h-full flex w-6/10 flex-col justify-center items-center py-20
      max-lg:justify-between max-lg:w-full max-lg:z-10 max-lg:relative
      max-md:py-11"
      >
        {/* Brand logo and text container */}
        <div className="flex flex-col gap-1 justify-start items-center mb-16">
          <Image
            src={"assets/brand-logo.svg"}
            height={99}
            width={110}
            className="max-md:h-[70px] max-md:w-[70px] mb-8"
            alt="zizo brand logo"
          />
          {/* Brand text */}
          <div className="flex flex-col gap-1 justify-start items-center">
            {/* Brand title */}
            <p className="text-4xl font-bold text-n-900 max-sm:text-2xl">
              Every Kick Matters.
            </p>
            {/* Brand subtitle */}
            <div>
              <p className="text-xl text-center font-normal text-n-700 max-sm:text-base">
                Step into your football journey with Zizo.
              </p>
              <p className="text-xl text-center font-normal text-n-700 max-sm:text-base">
                Own your game like a pro.
              </p>
            </div>
          </div>
        </div>

        {/* Sign In button container */}
        <div className="flex flex-col gap-5 justify-start items-center">
          {/* Sign In button */}
          <Button className="cursor-pointer px-[92px] py-[28px] bg-n-950 border border-n-600 rounded-[30px] dark:bg-n-50 text-n-50 font-medium text-lg">
            Sign In to begin
          </Button>
          {/* Sign Up option */}
          <div className="flex gap-1 justify-start items-center">
            <p className="text-base font-normal text-n-900 max-lg:text-slate-50">
              Not a member?
            </p>
            {/* Sign Up link */}
            <p className="text-base font-bold text-n-900 max-lg:text-slate-50 cursor-pointer">
              Sign Up
            </p>
          </div>
        </div>
      </div>

      {/* Right side container */}
      <div
        className="absolute flex justify-end items-end -bottom-56 right-0 min-w-[600px]
      max-lg:w-full max-lg:bottom-0"
      >
        {/* Player vector image */}
        <Image
          src="/assets/player-vector.svg"
          width={834}
          height={709}
          alt="Player image"
          className="flex-1"
        />
      </div>
    </div>
  );
}
