"use client";

import Motion from "@/components/animations/Motion";
import { shrinkIn } from "@/lib/animations";
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
    <div className="flex flex-col gap-1.5 fixed w-full left-0 bottom-0 bg-n-50 py-4 px-5 rounded-t-3xl">
      {/* Attendance Summary */}
      <div className="flex justify-between px-4">
        {/* Map through attendance summary items */}
        {attendanceSummary.map(({ label, count }, index) => (
          <Motion variants={shrinkIn} delay={index * 0.4} key={label}>
            <div className="flex flex-col items-center gap-1.5">
              {/* Label */}
              <p className="text-xs text-n-600 font-medium">{label}</p>
              {/* Count */}
              <Motion variants={shrinkIn} delay={index * 0.4}>
                <p className="text-2xl font-medium text-n-800">
                  {String(count).padStart(2, "0")}
                </p>
              </Motion>
            </div>
          </Motion>
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
