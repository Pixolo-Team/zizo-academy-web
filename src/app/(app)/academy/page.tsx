"use client";

// REACT //
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

// TYPES //
import { AttendancePlayerData } from "@/types/attendance";

// COMPONENTS //
import ProfileHeader from "@/app/components/academy/ProfileHeader";
import { PlayerAttendance } from "@/app/components/academy/PlayerAttendance";
import AttendanceSummary from "@/app/components/academy/AttendanceSummary";

// API SERVICES //
import { getPlayersForAttendance } from "@/services/api/attendance.api.service";

// IMAGES //
import AcademyBackground from "@/../public/academy-background.jpg";

const attendanceSummary = [
  { label: "Present", count: 2 },
  { label: "Absent", count: 1 },
  { label: "Pending", count: 2 },
  { label: "Total", count: 5 },
];

export default function Academy() {
  // Define Navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  const date = searchParams.get("date"); // "05/12/2025"
  const batch = searchParams.get("batch");

  // Define States
  const [playerDetails, setPlayerDetails] = useState<AttendancePlayerData[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  // Helper Functions
  const fetchAttendancePlayers = useCallback(async () => {
    if (!date || !batch) return;

    try {
      setLoading(true);
      const response = await getPlayersForAttendance(date, batch);
      const attendanceData = response.data; // <-- single object
      console.log(response);

      setPlayerDetails(attendanceData.eligible);
    } catch (err) {
      console.error("Error fetching attendance:", err);
    } finally {
      setLoading(false);
    }
  }, [date, batch]);

  // Define Use Effects
  useEffect(() => {
    fetchAttendancePlayers();
  }, [fetchAttendancePlayers]);

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
              {batch || "Skorost Batch"}
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
      <div className="flex flex-col justify-between px-5 pt-50 pb-20">
        {playerDetails && playerDetails.length > 0 ? (
          playerDetails.map((playerItem, index) => (
            <React.Fragment key={index}>
              <PlayerAttendance
                name={playerItem.playerName}
                id={playerItem.skorostId}
                imageUrl={"/player-photo.png"}
                onPresent={() =>
                  console.log(`${playerItem.skorostId} marked Present`)
                }
                onAbsent={() =>
                  console.log(`${playerItem.skorostId} marked Absent`)
                }
              />
              {index < playerDetails.length - 1 && (
                <div className="border-n-300 border-[0.5px] border-dashed" />
              )}
            </React.Fragment>
          ))
        ) : (
          <p className="text-center text-n-500 pt-5">
            {loading
              ? "Loading players..."
              : "No players found for attendance."}
          </p>
        )}
      </div>

      {/* Attendance Summary & Confirm Button */}
      <AttendanceSummary
        attendanceSummary={attendanceSummary}
        onConfirm={() => console.log("Confirmed attendance")}
      />
    </section>
  );
}
