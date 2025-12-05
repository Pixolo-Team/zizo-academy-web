// REACT //
import React from "react";

// ENUMS //
import { SessionStatus } from "@/enums/schedule.enum";

// TYPES
const statusColors = {
  upcoming: "#F5A623", // Yellow
  ongoing: "#29C36A", // Green
  cancelled: "#FF4D4F", // Red
};

interface SessionCardProps {
  startTime: string;
  endTime: string;
  title: string;
  location: string;
  status?: SessionStatus;
}

const SessionCard: React.FC<SessionCardProps> = ({
  startTime,
  endTime,
  title,
  location,
  status = SessionStatus.UPCOMING,
}) => {
  return (
    <div className="w-full rounded-xl border border-n-800 p-4 flex flex-col gap-2 relative">
      {/* Time */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {/* Status Icon */}
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.00015 2.88462C3.83372 2.88462 2.88477 3.83359 2.88477 5C2.88477 6.16642 3.83373 7.11538 5.00015 7.11538C6.16657 7.11538 7.11553 6.16641 7.11553 5C7.11553 3.83358 6.16656 2.88462 5.00015 2.88462M5 0C7.76143 0 10 2.23858 10 5C10 7.76143 7.76142 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0Z"
              fill={statusColors[status]}
            />
          </svg>

          {/* Start and End Time */}
          <p className="text-[#8F9BB3] text-xs font-medium">
            {startTime}–{endTime}
          </p>
        </div>

        {/* Menu */}
        <div className="flex gap-0.5">
          <span className="size-1 rounded-full bg-[#8F9BB3]" />
          <span className="size-1 rounded-full bg-[#8F9BB3]" />
          <span className="size-1 rounded-full bg-[#8F9BB3]" />
        </div>
      </div>

      {/* Title */}
      <p className="text-[#222B45] text-base font-normal">{title}</p>

      {/* Location */}
      <p className="text-[#8F9BB3] text-xs font-normal">{location}</p>
    </div>
  );
};

export default SessionCard;
