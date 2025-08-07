import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Auth() {
  return (
    // Main container
    <div className="h-screen relative bg-n-50 overflow-hidden">
      {/* Left side container */}
      <div
        className="h-full flex w-6/10 flex-col justify-center items-center py-20 px-5 
      max-lg:justify-between max-lg:w-full max-lg:z-10 max-lg:relative
      max-md:py-11"
      >
        {/* Brand logo and text container */}
        <div className="flex flex-col gap-1 justify-start items-center mb-16">
          <Image
            src={"assets/brand-logo.svg"}
            height={156}
            width={156}
            className="max-md:h-[111px] max-md:w-[111px]"
            alt="zizo brand logo"
          />
          <div className="flex flex-col gap-1 justify-start items-center">
            <p className="text-4xl font-bold text-n-900 max-sm:text-2xl">
              Every Kick Matters.
            </p>
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

        {/* Sign In button */}
        <div className="flex flex-col gap-5 justify-start items-center">
          <Button className="px-[90px] py-[20px] bg-n-950 border border-n-600 rounded-[30px] dark:bg-n-50 text-n-50">
            Sign In to begin
          </Button>
          <div className="flex gap-1 justify-start items-center">
            <p className="text-base font-normal text-n-900 max-xl:text-slate-50">
              Not a member?
            </p>
            <p className="text-base font-bold text-n-900 max-xl:text-slate-50">
              Sign Up
            </p>
          </div>
        </div>
      </div>

      {/* Right side container */}
      <div
        className="absolute flex justify-end items-end -bottom-56 right-0
      max-lg:w-full max-lg:bottom-0 max-lg:right-0"
      >
        {/* Player vector image */}
        <Image
          src="/assets/player-vector.svg"
          width={834}
          height={709}
          alt="Player image"
          className="flex-1 min-w-[600px]"
        />
      </div>
    </div>
  );
}
