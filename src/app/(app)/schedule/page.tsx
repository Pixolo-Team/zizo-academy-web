"use client";

// REACT //
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// TYPES //
import { SessionItemData } from "@/types/schedule";

// COMPONENTS //
import ScrollingCalendar from "@/app/components/academy/ScrollingCalendar";
import SessionCard from "@/app/components/academy/SessionCard";
import ProfileHeader from "@/app/components/academy/ProfileHeader";

// API SERVICES //
import { getSessionsRequest } from "@/services/api/schedule.api.service";

// CONTEXTS //
import { useAttendance } from "@/contexts/AttendanceContext";

export default function Page() {
  const router = useRouter();

  // Define Contexts
  const { setSession } = useAttendance();

  // Define States
  const [sessions, setSessions] = useState<SessionItemData[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Define Helper Functions
  /** Fetch Sessions for Selected Date */
  const fetchSessions = async (date: string) => {
    // Empty the prev data
    setSessions([]);
    setIsLoading(true);
    try {
      // Make API Request
      const response = await getSessionsRequest(date);

      // Update State
      setSessions(response.data);
      console.log("Fetched sessions:", response.data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /** Handle Session Card Tap */
  const handleSessionCardTap = (selectedSession: SessionItemData) => {
    setSession({
      date: selectedDate,
      ...selectedSession,
    });
    router.push("/academy");
  };

  // Define Effects
  // Fetch sessions when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      fetchSessions(selectedDate);
    }
  }, [selectedDate]);

  return (
    <section>
      <div className="fixed top-0 bg-n-950  w-full z-10">
        {/* Profile Header */}
        <ProfileHeader
          imageUrl="/images/defaults/default-player.png"
          onBack={() => router.back()}
          iconColor="n-50"
        />

        {/* Scrolling Calendar */}
        <div className="px-6 container mx-auto mt-4 mb-7">
          <ScrollingCalendar
            onDateSelect={(dateString: string) => {
              if (selectedDate !== dateString) {
                setSelectedDate(dateString);
              }
            }}
          />
        </div>
      </div>

      {/* Sessions List */}
      <div className="flex flex-col gap-3 px-6 pb-6 container pt-60 mx-auto">
        {sessions && sessions.length > 0 ? (
          sessions.map((sessionItem: SessionItemData, sessionItemIndex) => (
            <SessionCard
              key={sessionItemIndex}
              startTime={sessionItem.from}
              endTime={sessionItem.to}
              title={sessionItem.batch}
              location={sessionItem.venue}
              status={sessionItem.status}
              onClick={() => handleSessionCardTap(sessionItem)}
            />
          ))
        ) : (
          <p className="text-center text-n-500">
            {isLoading
              ? "Loading sessions..."
              : "No sessions scheduled for this date."}
          </p>
        )}
      </div>
    </section>
  );
}
