import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Auth() {
  return (
    <div className="flex h-screen">
      {/* Left side container */}
      <div className="flex  w-[70%] flex-col justify-center items-center">
        <div className="flex flex-col gap-1 justify-start items-center mb-5">
          <Image
            src={"assets/brand-logo.svg"}
            height={156}
            width={156}
            alt="zizo brand logo"
          />
          <div className="flex flex-col gap-1 justify-start items-center">
            <span className="text-4xl font-extrabold text-n-900">
              Every Kick Matters.
            </span>
            <span className="text-xl font-normal text-n-700">
              Step into your football journey with Zizo.Own your game like a
              pro.
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5 justify-start items-center">
          <Button className="bg-n-950">Sign In to begin</Button>
          <div className="flex gap-1 justify-start items-center">
            <span className="text-base font-normal text-gray-500">
              Not a member?
            </span>
            <span className="text-base font-bold text-gray-500">Sign Up</span>
          </div>
        </div>
      </div>
      {/* Right side container */}
      <div className="flex  w-[30%]  justify-end items-end">
        {/* Player vector image */}
        <Image
          src="/assets/player-vector.svg"
          width={700}
          height={700}
          alt="Player image"
        />
      </div>
    </div>
  );
}
