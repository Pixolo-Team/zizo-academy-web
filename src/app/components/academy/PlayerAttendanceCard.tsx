// REACT //
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// COMPONENTS //
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AttendanceStatus } from "@/enums/attendance.enum";
import DeleteRecentlyDeletedCross from "@/components/icons/neevo-icons/DeleteRecentlyDeletedCross";

type PlayerAttendanceProps = {
  name: string;
  id: string;
  imageUrl: string;

  /** current status from parent */
  attendanceStatus: AttendanceStatus | null;

  /** click handlers passed from parent */
  onPresent?: () => void;
  onAbsent?: () => void;
  onUndo?: () => void;
};

export const PlayerAttendanceCard: React.FC<PlayerAttendanceProps> = ({
  name,
  id,
  imageUrl,
  attendanceStatus,
  onPresent,
  onAbsent,
  onUndo,
}) => {
  // Spring animation config matching your screenshot
  const springConfig = {
    type: "spring" as const,
    stiffness: 484,
    damping: 34.4,
    mass: 1,
  };

  return (
    <div
      className={`flex flex-col gap-3 px-5 py-3.5 border rounded-2xl bg-n-50 transition-colors duration-200
      ${attendanceStatus === AttendanceStatus.PRESENT ? "border-green-500" : ""}
        ${attendanceStatus === AttendanceStatus.ABSENT ? "border-red-500" : ""}
        ${!attendanceStatus ? "border-n-200" : ""}
    `}
    >
      <div className="flex gap-2">
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
          <div className="font-medium text-base text-n-800">{name}</div>
          <div className="font-medium text-xs text-n-500">{id}</div>
        </div>
      </div>

      {/* Buttons */}
      <motion.div className="flex gap-1.5" layout transition={springConfig}>
        <AnimatePresence mode="sync">
          {/* Absent */}
          {attendanceStatus !== AttendanceStatus.PRESENT && (
            <motion.div
              key="absent"
              className="flex-1"
              transition={springConfig}
              layout
            >
              <Button
                className={`
                  w-full h-11 border-0 rounded-full text-base font-normal transition-colors duration-200
                  ${
                    attendanceStatus === AttendanceStatus.ABSENT
                      ? "bg-red-100 text-red-500"
                      : "bg-red-500 text-n-50"
                  }
                `}
                variant="outline"
                size="lg"
                onClick={onAbsent}
              >
                Absent
              </Button>
            </motion.div>
          )}

          {/* Present */}
          {attendanceStatus !== AttendanceStatus.ABSENT && (
            <motion.div
              key="present"
              className="flex-1"
              transition={springConfig}
              layout
            >
              <Button
                className={`
                  w-full h-11 border-0 rounded-full text-base font-normal transition-colors duration-200
                  ${
                    attendanceStatus === AttendanceStatus.PRESENT
                      ? "bg-green-100 text-green-500"
                      : "bg-green-500 text-n-50"
                  }
                `}
                variant="outline"
                size="lg"
                onClick={onPresent}
              >
                Present
              </Button>
            </motion.div>
          )}

          {/* Undo Button */}
          {attendanceStatus && (
            <motion.div key="undo" transition={springConfig} layout>
              <Button
                className="p-3 bg-n-100 rounded-4xl flex items-center justify-center w-[55px] h-[42px]"
                onClick={onUndo}
              >
                <DeleteRecentlyDeletedCross
                  primaryColor="var(--color-n-800)"
                  className="size-5"
                />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
