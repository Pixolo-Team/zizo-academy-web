"use client";

// REACT //
import React from "react";

// COMPONENTS //

type AttendanceSummaryProps = {
  attendanceSummary: { label: string; count: number }[];
  onConfirm?: () => void;
};

export default function AttendanceSummary({
  attendanceSummary: attendanceSummary,
}: AttendanceSummaryProps) {
  return (
    <div className="flex flex-col gap-1.5 fixed w-full bottom-0 bg-n-950 p-5">
      {/* Attendance Summary */}
      <div className="flex justify-between px-4">
        {/* Map through attendance summary items */}
        {attendanceSummary.map(({ label, count }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            {/* Label */}
            <p className="text-xs text-n-300 font-normal">{label}</p>
            {/* Count */}
            <p className="text-xl font-medium text-n-50">
              {String(count).padStart(2, "0")}
            </p>
          </div>
        ))}
      </div>

      {/* Confirm Button */}
      {/* <div className="h-14">
        <Button
          className={
            "bg-n-100 rounded-full w-full h-full text-n-950 font-medium text-base z-2"
          }
          variant="default"
          size="lg"
          onClick={onConfirm}
        >
          Confirm Attendance
        </Button>
      </div> */}
    </div>
  );
}
