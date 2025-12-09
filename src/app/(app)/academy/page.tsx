"use client";

// REACT //
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

// TYPES //
import { AttendancePlayerData } from "@/types/attendance";

// ENUMS //
import { AttendanceStatus } from "@/enums/attendance.enum";

// COMPONENTS //
import ProfileHeader from "@/app/components/academy/ProfileHeader";
import { PlayerAttendanceCard } from "@/app/components/academy/PlayerAttendanceCard";
import AttendanceSummary from "@/app/components/academy/AttendanceSummary";
import SearchInput from "@/components/ui/SearchInput";

// API SERVICES //
import {
  getPlayersForAttendanceRequest,
  updateAttendanceRequest,
} from "@/services/api/attendance.api.service";

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
  const [playerSearchInput, setPlayerSearchInput] = useState<string>("");

  // Helper Functions
  // Filtered players based on search input
  const filteredPlayers = playerDetails.filter((player) => {
    const query = playerSearchInput.toLowerCase();

    return (
      player.playerName.toLowerCase().includes(query) ||
      player.skorostId.toLowerCase().includes(query)
    );
  });

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

  /** Handle Marking Attendance */
  const handleMarkAttendance = async (
    index: number,
    skorostId: string,
    newStatus: AttendanceStatus
  ) => {
    // Optimistic UI update
    setPlayerDetails((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        attendance: newStatus,
      };
      return updated;
    });

    if (!session || !session.date) return;

    try {
      await updateAttendanceRequest(
        skorostId,
        session.date,
        newStatus === "Present" ? "P" : "A",
        session.batch
      );
    } catch (error) {
      console.error("Failed to update attendance:", error);

      // Rollback optimistic update
      setPlayerDetails((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          attendance: AttendanceStatus.ELIGIBLE, // reset since API failed
        };
        return updated;
      });
    }
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
        <div className="my-4">
          <SearchInput
            value={playerSearchInput}
            placeholder="Player name or ID"
            onChange={(value) => setPlayerSearchInput(value)}
          />
        </div>
        {filteredPlayers && filteredPlayers.length > 0 ? (
          // Player Attendance List
          filteredPlayers.map((playerItem, index) => (
            <React.Fragment key={index}>
              {/* Player Attendance Card  */}
              <PlayerAttendanceCard
                name={playerItem.playerName}
                id={playerItem.skorostId}
                imageUrl={
                  playerItem.skorostId
                    ? `http://pixoloproductions.com/static/zizo-academy/skorost-united-football-school/players/${playerItem.skorostId}.png`
                    : "/images/defaults/default-player.png"
                }
                attendanceStatus={
                  playerItem.attendance ?? AttendanceStatus.ELIGIBLE
                }
                onPresent={() =>
                  handleMarkAttendance(
                    index,
                    playerItem.skorostId,
                    AttendanceStatus.PRESENT
                  )
                }
                onAbsent={() =>
                  handleMarkAttendance(
                    index,
                    playerItem.skorostId,
                    AttendanceStatus.ABSENT
                  )
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
