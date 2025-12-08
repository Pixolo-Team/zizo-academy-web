// REACT //
import React from "react";

// COMPONENTS //
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AttendanceStatus } from "@/enums/attendance.enum";

type PlayerAttendanceProps = {
  name: string;
  id: string;
  imageUrl: string;

  /** current status from parent */
  status: AttendanceStatus | null;

  /** click handlers passed from parent */
  onPresent?: () => void;
  onAbsent?: () => void;
};

/**
 * Stateless attendance UI item.
 * Parent is responsible for managing the state.
 */
export const PlayerAttendance: React.FC<PlayerAttendanceProps> = ({
  name,
  id,
  imageUrl,
  status,
  onPresent,
  onAbsent,
}) => {
  return (
    <div className="flex flex-col gap-2.5 py-4">
      <div className="flex gap-2.5">
        <div className="size-11 rounded-full overflow-hidden">
          {/* Image */}
          <Image
            src={imageUrl}
            alt="Profile"
            width={44}
            height={44}
            className="object-cover flex-1"
          />
        </div>

        {/* Name and Id */}
        <div>
          <div className="font-medium text-base">{name}</div>
          <div className="font-light text-xs">{id}</div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex w-full gap-3.5">
        {/* Absent */}
        <Button
          className={`
            w-1/2 h-11 rounded-full text-base font-normal
             ${
               status === AttendanceStatus.ABSENT
                 ? "bg-red-500 text-n-950" // ABSENT
                 : status === AttendanceStatus.PRESENT
                 ? "border-n-400 text-n-400" // PRESENT
                 : "border border-red-500 text-red-500" // ELIGIBLE
             }
          `}
          variant="outline"
          size="lg"
          onClick={onAbsent}
        >
          Absent
        </Button>

        {/* Present */}
        <Button
          className={`
            w-1/2 h-11 rounded-full text-base font-normal
            ${
              status === AttendanceStatus.PRESENT
                ? "bg-green-500 text-n-950"
                : status === AttendanceStatus.ABSENT
                ? "border-n-400 text-n-400"
                : "border border-green-500 text-green-500"
            }
           
          `}
          variant="outline"
          size="lg"
          onClick={onPresent}
        >
          Present
        </Button>
      </div>
    </div>
  );
};
