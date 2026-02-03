"use client";
import Link from "next/link";
import React from "react";

interface ProfileOptionsProps {
  // We use React.ElementType so you can pass the component name itself
  icon: React.ElementType;
  text: string;
}

export default function ProfileOptions({
  icon: Icon,
  text,
}: ProfileOptionsProps) {
  return (
    <Link
      href={"/profile"}
      className="flex flex-row items-center gap-4 px-3 py-6 bg-n-50 border border-n-200 rounded-[12px] hover:bg-n-100 cursor-pointer transition-all"
    >
      <Icon className="w-4 h-4" />
      <p className="text-base font-regular leading-none text-n-800">{text}</p>
    </Link>
  );
}
