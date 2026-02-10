"use client";

// REACT //
import React from "react";

// COMPONENTS //
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  name: string;
  position: string;
}

export default function ProfileHeader({ name, position }: ProfileHeaderProps) {
  return (
    <div className="flex gap-5">
      {/* Profile Photo */}
      <Image
        src="/images/profile/profile-photo.png"
        alt="Profile Image"
        width={112}
        height={112}
        className="w-28 object-cover rounded-4xl"
      />
      {/* Profile details */}
      <div className="flex flex-col gap-3 self-center w-full">
        {/* Name and Position */}
        <div className="flex flex-col gap-1">
          <p className="text-lg leading-none font-medium text-n-950">{name}</p>
          <p>{position}</p>
        </div>
        <Button className="w-fit h-[30px] rounded-4xl py-3 px-6">
          <p className="text-xs leading-none font-medium text-n-100">
            Edit Profile
          </p>
        </Button>
      </div>
    </div>
  );
}
