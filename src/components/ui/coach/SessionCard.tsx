"use client";

// COMPONENTS //
import CircleClock from "@/components/icons/neevo-icons/CircleClock";
import LocationPin from "@/components/icons/neevo-icons/LocationPin";
import TimerStopwatchQuickFastExpress from "@/components/icons/neevo-icons/TimerStopwatchQuickFastExpress";
import VerticalMenu from "@/components/icons/neevo-icons/VerticalMenu";
import { Button } from "../button";

// Interface Props
interface SessionCardProps {
  sessionName: string;
  fromTime: string;
  toTime: string;
  location: string;
  reportingTime: string;
  checkedInTime?: string;
}

/** SessionCard Component */
export default function SessionCard({
  sessionName,
  fromTime,
  toTime,
  location,
  reportingTime,
  checkedInTime,
}: SessionCardProps) {
  // Define Navigation

  // Define Context

  // Define States

  // Define Refs

  // Helper Functions

  // Use Effects
  return (
    <div className="p-5 border border-n-200 rounded-2xl bg-n-50 flex flex-col gap-4">
      {/* Session Details */}
      <div className="flex flex-col gap-3">
        {/* Session Name  */}
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg text-n-900">{sessionName}</p>
          <VerticalMenu
            className="size-4.5 text-n-400 cursor-pointer"
            primaryColor="var(--color-n-800)"
          />
        </div>

        {/* Time and Location  */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <CircleClock
              className="size-3 text-n-400"
              primaryColor="var(--color-n-700)"
            />
            <p className="text-n-700 text-sm">
              Session Time: {fromTime} - {toTime}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <LocationPin
              className="size-3 text-n-400"
              primaryColor="var(--color-n-700)"
            />
            <p className="text-n-700 text-sm">{location}</p>
          </div>
        </div>
      </div>

      {/* Reporting and Checked-in Time */}
      <div
        className={`pt-2 flex-col flex gap-1.5 bg-green-50 border border-green-200 rounded-3xl`}
      >
        {/* Reporting Time */}
        <div className="flex gap-2 items-center justify-center">
          <TimerStopwatchQuickFastExpress
            primaryColor="var(--color-n-800)"
            className="size-3.5"
          />
          <p className="text-n-800 text-xs font-bold text-center">
            Reporting Time: {reportingTime}
          </p>
        </div>

        <Button className="w-full px-6 py-3 rounded-3xl text-sm font-bold bg-green-200 text-green-600 h-[42px]">
          {status === "ongoing"
            ? "Check-in Now"
            : status === "completed"
              ? `Checked-in at ${checkedInTime}`
              : "Upcoming Session"}
        </Button>
      </div>
    </div>
  );
}
