"use client";

// REACT //
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

// TYPES //
import { AttendancePlayerData } from "@/types/attendance";

// COMPONENTS //
import ProfileHeader from "@/app/components/academy/ProfileHeader";
import { PlayerAttendance } from "@/app/components/academy/PlayerAttendance";
import AttendanceSummary from "@/app/components/academy/AttendanceSummary";

// API SERVICES //
import { getPlayersForAttendanceRequest } from "@/services/api/attendance.api.service";

// CONTEXTS //
import { useAttendance } from "@/contexts/AttendanceContext";

// IMAGES //
import AcademyBackground from "@/../public/academy-background.jpg";

export default function Academy() {
  // Define Navigation
  const router = useRouter();

  // Define Contexts
  const { session } = useAttendance();

  // Define States
  const [playerDetails, setPlayerDetails] = useState<AttendancePlayerData[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  // Helper Functions
  const fetchAttendancePlayers = useCallback(async () => {
    if (!session || !session.date || !session.batch) return;

    try {
      setLoading(true);

      // Make an API call
      const response = await getPlayersForAttendanceRequest(
        session.date,
        session.batch
      );
      const attendanceData = response.data; // <-- single object

      // Update the state
      setPlayerDetails(attendanceData.eligible);
    } catch (err) {
      console.error("Error fetching attendance:", err);
    } finally {
      setLoading(false);
    }
  }, [session]);

  /**
   * Calculates attendance summary based on player list.
   */
  const calculateSummary = (players: AttendancePlayerData[]) => {
    const eligiblePlayers = players.filter(
      (p) => p.attendance !== "Not Eligible"
    );

    const present = eligiblePlayers.filter(
      (p) => p.attendance === "Present"
    ).length;

    const absent = eligiblePlayers.filter(
      (p) => p.attendance === "Absent"
    ).length;

    const pending = eligiblePlayers.filter(
      (p) => p.attendance === "Eligible"
    ).length;

    const total = eligiblePlayers.length;

    // Return Attendance Summary
    return [
      { label: "Present", count: present },
      { label: "Absent", count: absent },
      { label: "Pending", count: pending },
      { label: "Total", count: total },
    ];
  };

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
          imageUrl="/images/defaults/default-player.png"
          onBack={() => router.back()}
        />
        {/* Overlay */}
        <div className="absolute top-0 w-full h-full -z-1 bg-slate-900/90" />

        <div className="flex flex-col gap-5 z-2 px-5">
          <div className="flex flex-col gap-1">
            {/* Session Title */}
            <p className="text-xl font-medium text-n-950">
              {session?.batch ?? "Skorost Batch"}
            </p>

            {/* Location */}
            <p className="text-sm font-normal text-n-500">
              {session?.venue ?? "Ramji Assar, Ghatkopar East"}
            </p>
          </div>

          <div className="flex justify-between z-2 items-center">
            {/* Start Time */}
            <p className="text-base text-n-950 font-normal">
              {session?.from ?? "18:00"}
            </p>

            {/* Total Time  */}
            <div className="bg-n-400 px-3.5 py-1.5 rounded-xl">
              <span className="text-n-700">1h</span>
            </div>

            {/* End Time */}
            <p className="text-base text-n-950 font-normal">
              {session?.to ?? "19:00"}
            </p>
          </div>
        </div>
      </div>

      {/* Attendance card content  */}
      <div className="flex flex-col justify-between px-5 pt-50 pb-20">
        {playerDetails && playerDetails.length > 0 ? (
          // Player Attendance List
          playerDetails.map((playerItem, index) => (
            <React.Fragment key={index}>
              {/* Player Attendance Card  */}
              <PlayerAttendance
                name={playerItem.playerName}
                id={playerItem.skorostId}
                imageUrl={
                  playerItem.skorostId
                    ? `http://pixoloproductions.com/static/zizo-academy/skorost-united-football-school/players/${playerItem.skorostId}.png`
                    : "/images/defaults/default-player.png"
                }
                onPresent={() =>
                  console.log(`${playerItem.skorostId} marked Present`)
                }
                onAbsent={() =>
                  console.log(`${playerItem.skorostId} marked Absent`)
                }
              />

              {/* Border */}
              {index < playerDetails.length - 1 && (
                <div className="border-n-300 border-[0.5px] border-dashed" />
              )}
            </React.Fragment>
          ))
        ) : (
          // Empty State
          <p className="text-center text-n-500 pt-5">
            {loading
              ? "Loading players..."
              : "No players found for attendance."}
          </p>
        )}
      </div>

      {/* Attendance Summary & Confirm Button */}
      {playerDetails && (
        <AttendanceSummary
          attendanceSummary={calculateSummary(playerDetails)}
          onConfirm={() => console.log("Confirmed attendance")}
        />
      )}
    </section>
  );
}
