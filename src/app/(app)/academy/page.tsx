"use client";

// REACT //
import { useRouter } from "next/navigation";

// COMPONENTS //
import ProfileHeader from "@/app/components/academy/ProfileHeader";
import { PlayerAttendance } from "@/app/components/academy/PlayerAttendance";
import AttendanceSummary from "@/app/components/academy/AttendanceSummary";

// IMAGES //
import AcademyBackground from "@/../public/academy-background.jpg";
import React from "react";

const playerDetails = [
  {
    name: "Ritesh Kumar Sigham",
    id: "SUFA 0032",
    imageUrl: "/player-photo.png",
    status: "present",
  },
  {
    name: "Amit Solanki",
    id: "SUFA 0045",
    imageUrl: "/player-photo.png",
    status: "present",
  },
  {
    name: "Jay Patel",
    id: "SUFA 0021",
    imageUrl: "/player-photo.png",
    status: "absent",
  },
  {
    name: "Jay Patel",
    id: "SUFA 0021",
    imageUrl: "/player-photo.png",
    status: "pending",
  },
  {
    name: "Jay Patel",
    id: "SUFA 0021",
    imageUrl: "/player-photo.png",
    status: "pending",
  },
];

const attendanceSummary = [
  { label: "Present", count: 2 },
  { label: "Absent", count: 1 },
  { label: "Pending", count: 2 },
  { label: "Total", count: 5 },
];

export default function Academy() {
  // Define Navigation
  const router = useRouter();

  // Define States

  // Helper Functions

  // Define Use Effects

  return (
    <section className="min-h-screen relative">
      {/* Top Background Section with ProfileHeader */}
      <div
        className="fixed top-0 w-full bg-cover bg-center z-1 pb-5"
        style={{
          backgroundImage: `url(${AcademyBackground.src})`,
        }}
      >
        <ProfileHeader
          iconColor="n-900"
          imageUrl="/player-photo.png"
          onBack={() => router.back()}
        />
        {/* Overlay */}
        <div className="absolute top-0 w-full h-full -z-1 bg-slate-900/90" />

        <div className="flex flex-col gap-5 z-2 px-5">
          <div className="flex flex-col gap-1">
            {/* Session Title */}
            <p className="text-xl font-medium text-n-950">
              Practice Session | Under 8
            </p>

            {/* Location */}
            <p className="text-sm font-normal text-n-500">
              Ramji Assar, Ghatkopar East
            </p>
          </div>

          <div className="flex justify-between z-2 items-center">
            {/* Start Time */}
            <p className="text-base text-n-950 font-normal">18:00</p>

            {/* Total Time  */}
            <div className="bg-n-400 px-3.5 py-1.5 rounded-xl">
              <span className="text-n-700">1h</span>
            </div>

            {/* End Time */}
            <p className="text-base text-n-950 font-normal">19:00</p>
          </div>
        </div>
      </div>

      {/* Attendance card content  */}
      <div className="flex flex-col justify-between px-5 pt-50 pb-40">
        {playerDetails.map((playerItem, index) => (
          <React.Fragment key={index}>
            <PlayerAttendance
              name={playerItem.name}
              id={playerItem.id}
              imageUrl={playerItem.imageUrl}
              onPresent={() => console.log(`${playerItem.name} marked Present`)}
              onAbsent={() => console.log(`${playerItem.name} marked Absent`)}
            />
            {index < playerDetails.length - 1 && (
              <div className="border-n-300 border-[0.5px] border-dashed" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Attendance Summary & Confirm Button */}
      <AttendanceSummary
        attendanceSummary={attendanceSummary}
        onConfirm={() => console.log("Confirmed attendance")}
      />
    </section>
  );
}
