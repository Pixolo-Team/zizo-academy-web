// REACT //
import React, { useState } from "react";

// COMPONENTS //
import { Button } from "@/components/ui/button";
import Image from "next/image";

type PlayerAttendanceProps = {
  name: string;
  id: string;
  imageUrl: string;
  onPresent?: () => void;
  onAbsent?: () => void;
};

export const PlayerAttendance: React.FC<PlayerAttendanceProps> = ({
  name,
  id,
  imageUrl,
  onPresent,
  onAbsent,
}) => {
  const [status, setStatus] = useState<"present" | "absent" | null>(null);

  const handlePresent = () => {
    setStatus("present");
    onPresent?.();
  };

  const handleAbsent = () => {
    setStatus("absent");
    onAbsent?.();
  };

  return (
    <div className="flex flex-col gap-2.5 py-4">
      <div className="flex gap-2.5">
        <div className="size-11 rounded-full overflow-hidden">
          <Image
            src={imageUrl}
            alt="Profile"
            width={44}
            height={44}
            className="object-cover flex-1"
          />
        </div>
        <div>
          <div className="font-medium text-base">{name}</div>
          <div className="font-light text-xs">{id}</div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex w-full gap-3.5">
        {/* Absent Button */}
        <Button
          className={`
    w-1/2 h-11 rounded-full text-base font-normal
    ${
      status === "absent"
        ? "bg-red-500 text-n-950"
        : "border border-red-500 text-red-500"
    }
    ${status === "present" ? "border-n-400 text-n-400" : ""}
  `}
          variant="outline"
          size="lg"
          onClick={handleAbsent}
        >
          Absent
        </Button>

        {/* Present Button */}
        <Button
          className={`
    w-1/2 h-11 rounded-full text-base font-normal
    ${
      status === "present"
        ? "bg-green-500 text-n-950"
        : "border border-green-500 text-green-500"
    }
    ${status === "absent" ? "border-n-400 text-n-400" : ""}
  `}
          variant="outline"
          size="lg"
          onClick={handlePresent}
        >
          Present
        </Button>
      </div>
    </div>
  );
};
