"use client";

// REACT //
import { useMemo, useState } from "react";

// COMPONENTS //
import CircleClock from "@/components/icons/neevo-icons/CircleClock";
import LocationPin from "@/components/icons/neevo-icons/LocationPin";
import TimerStopwatchQuickFastExpress from "@/components/icons/neevo-icons/TimerStopwatchQuickFastExpress";

// OTHERS //
import { Button } from "../button";

// Interface Props
interface SessionCardProps {
  sessionName: string;
  fromTime: string; // timestamp
  toTime: string; // timestamp
  location: string;
  reportingTime: string; // timestamp
  checkedInTime?: string; // timestamp
}

/**
 * Format timestamp → readable time
 */
export function formatTime(ts: string) {
  // Create date object from timestamp
  const date = new Date(ts);

  // Extract hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  // Format time string in HH:MM AM/PM
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${ampm}`;
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
  const [now, setNow] = useState<number>(() => Date.now());

  // Determine session status and lateness
  const { status, isLate } = useMemo(() => {
    // Get current time
    if (!now) return { status: "upcoming", isLate: false };

    // Convert session times to timestamps
    const start = new Date(fromTime).getTime();
    const end = new Date(toTime).getTime();

    // Determine session status
    let sessionStatus: "upcoming" | "ongoing" | "completed";

    // Session is upcoming if current time is before start, ongoing if between start and end, completed if after end
    if (now < start) sessionStatus = "upcoming";
    else if (now <= end) sessionStatus = "ongoing";
    else sessionStatus = "completed";

    // Determine lateness (only relevant if checked in)
    let late = false;

    // If there's a checked-in time, compare it to reporting time
    if (checkedInTime) {
      late =
        new Date(checkedInTime).getTime() > new Date(reportingTime).getTime();
    }

    // Return status and lateness
    return { status: sessionStatus, isLate: late };
  }, [fromTime, toTime, reportingTime, checkedInTime, now]);

  return (
    <div
      className={`p-5 rounded-2xl bg-n-50 flex flex-col gap-4 border relative
        ${status === "ongoing" ? "border-2 border-n-600" : "border border-n-200"}
      `}
    >
      {/* Session Details */}
      <div className="flex flex-col gap-3">
        {/* Session Name */}
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg text-n-900">{sessionName}</p>
        </div>

        {/* Session Time & Location */}
        <div className="flex flex-col gap-1">
          {/* Session Time */}
          <div className="flex items-center gap-2">
            <CircleClock
              className="size-3 text-n-400"
              primaryColor="var(--color-n-700)"
            />
            <p className="text-n-700 text-sm">
              Session Time: {formatTime(fromTime)} - {formatTime(toTime)}
            </p>
          </div>

          {/* Session Location  */}
          <div className="flex items-center gap-2">
            <LocationPin
              className="size-3 text-n-400"
              primaryColor="var(--color-n-700)"
            />
            <p className="text-n-700 text-sm">{location}</p>
          </div>
        </div>
      </div>

      {/* Reporting Section */}
      <div
        className={`pt-2 flex-col flex gap-1.5 rounded-3xl border ${
          checkedInTime
            ? isLate
              ? "bg-amber-50 border-amber-200"
              : "bg-green-50 border-green-200"
            : "bg-n-100 border-n-200"
        }`}
      >
        {/* Reporting Time & Check-in Button */}
        <div className="flex gap-2 items-center justify-center">
          <TimerStopwatchQuickFastExpress
            primaryColor="var(--color-n-800)"
            className="size-3.5"
          />
          <p className="text-n-800 text-xs font-bold text-center">
            Reporting Time: {formatTime(reportingTime)}
          </p>
        </div>

        {/* Check in Button */}
        <Button
          className={`w-full px-6 py-3 rounded-3xl text-sm font-bold h-[42px]
            ${
              checkedInTime
                ? isLate
                  ? "bg-amber-200 text-amber-600"
                  : "bg-green-200 text-green-600"
                : "bg-n-900 text-n-50"
            }
          `}
        >
          {!checkedInTime
            ? "Check-in"
            : isLate
              ? `Checked in (Late) • ${formatTime(checkedInTime)}`
              : `Checked in • ${formatTime(checkedInTime)}`}
        </Button>
      </div>

      {/* Ongoing  */}
      {status === "ongoing" && (
        <div className="py-1 px-4 rounded-[9px] bg-n-800 text-n-50 font-medium text-[9px] absolute -top-3">
          Ongoing Session
        </div>
      )}
    </div>
  );
}
