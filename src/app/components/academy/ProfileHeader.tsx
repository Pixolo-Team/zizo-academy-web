// components/ProfileHeader.tsx
"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface ProfileHeaderProps {
  imageUrl: string;
  onBack?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ imageUrl, onBack }) => {
  return (
    <header className="w-full flex items-center justify-between p-2.5 bg-transparent">
      {/* Back Button */}
      <button onClick={onBack} className="px-2 py-2.5 text-n-100">
        <svg
          width="16"
          height="11"
          viewBox="0 0 16 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.26691 0.0309088C5.0999 0.0849488 4.54567 0.396412 4.14737 0.660055C3.50093 1.08791 2.94265 1.54332 2.34601 2.12948C1.38423 3.07435 0.686957 3.98852 0.156792 4.99975C-0.0787912 5.44906 -0.0686798 5.5224 0.323284 6.20814C0.837473 7.1077 1.47156 7.91579 2.31095 8.74123C3.18714 9.60287 4.0049 10.2171 4.94894 10.7227C5.31061 10.9164 5.43295 10.9427 5.64362 10.8717C5.79675 10.8201 5.89907 10.7436 5.97765 10.6221C6.10182 10.43 6.11854 10.1887 6.02146 9.99025C5.95095 9.84611 5.85342 9.76039 5.62056 9.63784C4.25799 8.92084 2.91015 7.72092 1.9177 6.34142L1.74512 6.10152L8.62835 6.09263C14.5125 6.08505 15.5206 6.08009 15.5738 6.05857C15.6682 6.02032 15.7588 5.95939 15.8323 5.88465C16.0402 5.67327 16.0572 5.29982 15.8698 5.06296C15.8018 4.97702 15.6652 4.87567 15.575 4.84427C15.525 4.82686 14.0518 4.82027 8.62835 4.81323L1.74512 4.80427L1.9177 4.56437C2.48026 3.7824 3.16931 3.0443 3.92524 2.41395C4.50263 1.93246 5.03726 1.5734 5.6738 1.23959C5.94929 1.09511 6.06711 0.928887 6.0806 0.66567C6.08637 0.553094 6.08053 0.502164 6.05385 0.432735C5.97305 0.22235 5.84846 0.101084 5.64416 0.0339653C5.50931 -0.0103365 5.39713 -0.0112428 5.26691 0.0309088Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {/* User Image */}
      <div className="size-9 rounded-full overflow-hidden">
        <Image
          src={imageUrl}
          alt="Profile"
          width={48}
          height={48}
          className="object-cover"
        />
      </div>
    </header>
  );
};

export default ProfileHeader;
