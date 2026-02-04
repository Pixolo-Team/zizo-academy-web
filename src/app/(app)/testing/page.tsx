"use client";

import SessionCard from "@/components/ui/coach/SessionCard";

// utils/sessionTestData.ts

export function generateSessionTestData() {
  const now = Date.now();

  const minutes = (m: number) => new Date(now + m * 60 * 1000).toISOString();

  return [
    // Upcoming session (no check-in)
    {
      sessionName: "Morning Yoga",
      fromTime: minutes(-20),
      toTime: minutes(90),
      location: "Studio A",
      reportingTime: minutes(20),
    },

    // Ongoing session (on-time check-in)
    {
      sessionName: "Strength Training",
      fromTime: minutes(-20),
      toTime: minutes(40),
      location: "Gym Floor",
      reportingTime: minutes(-25),
      checkedInTime: minutes(-26), // early/on time
    },

    // Ongoing session (late check-in)
    {
      sessionName: "Cardio Blast",
      fromTime: minutes(-15),
      toTime: minutes(45),
      location: "Track Area",
      reportingTime: minutes(-20),
      checkedInTime: minutes(-5), // late
    },

    // Completed session
    {
      sessionName: "Evening Pilates",
      fromTime: minutes(-120),
      toTime: minutes(-60),
      location: "Studio B",
      reportingTime: minutes(-130),
      checkedInTime: minutes(-125),
    },
  ];
}

export default function TestingPage() {
  const sessions = generateSessionTestData();
  return (
    <div className="p-6 flex flex-col gap-6 max-w-xl mx-auto">
      {sessions.map((s, i) => (
        <SessionCard key={i} {...s} />
      ))}
    </div>
  );
}
