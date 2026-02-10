"use client";
// REACT //
import React from "react";

// COMPONENTS //
import Link from "next/link";

interface ProfileActionButtonProps {
  icon: React.ReactNode;
  text: string;
  href: string;
}

export default function ProfileActionButton({
  icon,
  text,
  href,
}: ProfileActionButtonProps) {
  return (
    <Link
      href={href}
      className="flex flex-row items-center gap-4 px-6 py-3 bg-n-50 border border-n-200 rounded-[12px] hover:bg-n-100 cursor-pointer transition-all"
    >
      {icon}
      <p className="text-base font-regular leading-none text-n-800">{text}</p>
    </Link>
  );
}
