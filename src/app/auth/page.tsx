import Image from "next/image";

export default function Auth() {
  return (
    <div className="flex h-screen">
      {/* Left side container */}
      <div className="flex  w-[70%] flex-col justify-center items-center border border-gray-300">
        <div className="flex flex-col gap-1 justify-start items-center">
          {/* <BrandLogo /> */}
          <div className="flex flex-col gap-1 justify-start items-center">
            <span className="text-4xl font-extrabold text-n-900">
              Every Kick Matters.
            </span>
            <span className="text-xl font-normal text-n-700 font-sans font-thin">
              Step into your football journey with Zizo.Own your game like a
              pro.
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-5 justify-start items-center">
          {/* <Button /> */}
          <div className="flex gap-1 justify-start items-center">
            <span className="text-base font-normal text-gray-500">
              Not a member?
            </span>
            <span className="text-base font-bold text-gray-500">Sign Up</span>
          </div>
        </div>
      </div>
      {/* Right side container */}
       <div className="flex  w-[30%]  justify-center items-center border border-red-300">
        {/* Player vector image */}
        <Image src="/assets/player-vector.svg" width={100} height={100} alt="Player image"/>
      </div>
    </div>
  );
}
