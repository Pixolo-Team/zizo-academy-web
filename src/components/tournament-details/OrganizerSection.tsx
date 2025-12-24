"use client";

import Image from "next/image";
import Link from "next/link";

interface OrganizerSectionProps {
  name: string;
  imageSrc: string;
}

export default function OrganizerSection({
  name,
  imageSrc,
}: OrganizerSectionProps) {
  return (
    <div className="flex flex-col gap-3.5">
      <h3 className="text-lg font-medium text-n-950">About the Organizer</h3>
      <div className="flex items-center gap-3">
        {/* Image */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-n-300">
          <Image src={imageSrc} alt={name} fill className="object-cover" />
        </div>

        {/* Name & See Profile */}
        <div className="flex flex-col gap-1">
          <p className="text-lg font-bold leading-none text-n-950">{name}</p>
          <Link
            href="#"
            className="text-sm font-medium leading-none text-green-500 hover:underline"
          >
            See Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
