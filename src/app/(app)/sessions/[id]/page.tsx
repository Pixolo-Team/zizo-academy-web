"use client";

// REACT //
import { useState } from "react";

// COMPONENTS //
import PageHeader from "@/app/components/layout/Header";
import Motion from "@/components/animations/Motion";
import SessionCard from "@/components/ui/coach/SessionCard";
import Image from "next/image";

// OTHERS //
import { fadeIn, slideInUp } from "@/lib/animations";
import SearchInput from "@/components/ui/SearchInput";
import { PlayerAttendanceCard } from "@/app/components/academy/PlayerAttendanceCard";
import { AttendanceStatus } from "@/enums/attendance.enum";
import AttendanceSummary from "@/app/components/academy/AttendanceSummary";

// Temporary
export function generateSessionTestData() {
  const now = Date.now();

  const minutes = (m: number) => new Date(now + m * 60 * 1000).toISOString();

  return {
    sessionName: "Strength Training",
    fromTime: minutes(-20),
    toTime: minutes(40),
    location: "Gym Floor",
    reportingTime: minutes(-25),
    checkedInTime: minutes(-26), // early/on time
  };
}

// Player type
type Player = {
  id: string;
  name: string;
  imageUrl: string;
};

export default function SessionDetails() {
  const sessions = generateSessionTestData();

  // Define States
  const [playerSearchInput, setPlayerSearchInput] = useState<string>("");

  // Attendance state: key is player id, value is attendance status
  const [attendanceMap, setAttendanceMap] = useState<
    Record<string, AttendanceStatus | null>
  >({});

  // Sample players data
  const players: Player[] = [1].map((num) => ({
    id: `SUFA0000${num}`,
    name: `Player ${num}`,
    imageUrl: `/images/defaults/default-player.png`,
  }));

  // Handler for marking present
  const handlePresent = (playerId: string) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [playerId]: AttendanceStatus.PRESENT,
    }));
  };

  // Handler for marking absent
  const handleAbsent = (playerId: string) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [playerId]: AttendanceStatus.ABSENT,
    }));
  };

  // Handler for undo
  const handleUndo = (playerId: string) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [playerId]: null,
    }));
  };

  return (
    <div className="flex flex-col gap-6 px-5 pb-5">
      {/* Page Header */}
      <PageHeader text="Session Details">
        <div className="size-8 rounded-full border border-n-500 overflow-hidden">
          <Image
            src={"/images/defaults/default-player.png"}
            width={32}
            height={32}
            alt="Coach Image"
          />
        </div>
      </PageHeader>

      <div className="flex flex-col gap-2.5">
        {/* Session Card */}
        <Motion variants={slideInUp} delay={0.2}>
          <div className="flex flex-col gap-4">
            {/* Session Card */}
            <SessionCard {...sessions} />
          </div>
        </Motion>

        {/* Search Bar */}
        <Motion variants={slideInUp} delay={0.3}>
          <SearchInput
            value={playerSearchInput}
            placeholder="Player Name or ID"
            onChange={(value) => setPlayerSearchInput(value)}
          />
        </Motion>

        {/* Player Attendance Cards */}
        <div className="flex flex-col gap-1.5">
          {players.map((player) => (
            <Motion key={player.id} variants={slideInUp} delay={0.4}>
              <PlayerAttendanceCard
                name={player.name}
                id={player.id}
                imageUrl={player.imageUrl}
                attendanceStatus={attendanceMap[player.id] ?? null}
                onPresent={() => handlePresent(player.id)}
                onAbsent={() => handleAbsent(player.id)}
                onUndo={() => handleUndo(player.id)}
              />
            </Motion>
          ))}
        </div>

        {/* Attendance Summary & Confirm Button */}
        {players && players.length > 0 && (
          <Motion variants={fadeIn} delay={0.6}>
            <AttendanceSummary
              attendanceSummary={[
                {
                  label: "Present",
                  count: players.filter(
                    (player) =>
                      attendanceMap[player.id] === AttendanceStatus.PRESENT,
                  ).length,
                },
                {
                  label: "Absent",
                  count: players.filter(
                    (player) =>
                      attendanceMap[player.id] === AttendanceStatus.ABSENT,
                  ).length,
                },
                {
                  label: "Pending",
                  count: players.filter(
                    (player) => attendanceMap[player.id] === null,
                  ).length,
                },
                {
                  label: "Total",
                  count: players.length,
                },
              ]}
              onConfirm={() => console.log("Confirmed attendance")}
            />
          </Motion>
        )}
      </div>
    </div>
  );
}
