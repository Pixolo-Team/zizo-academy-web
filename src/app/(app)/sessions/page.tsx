"use client";

// REACT //
import { useState } from "react";

// COMPONENTS //
import ScrollingCalendar from "@/app/components/academy/ScrollingCalendar";
import PageHeader from "@/app/components/layout/Header";
import Motion from "@/components/animations/Motion";
import { MonthCalendar } from "@/components/attendance/MonthCalendar";
import SessionCard from "@/components/ui/coach/SessionCard";
import Image from "next/image";

// OTHERS //
import { slideInUp } from "@/lib/animations";

// Temporary
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

export default function Sessions() {
  // Define States
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const sessions = generateSessionTestData();
  return (
    <div className="flex flex-col gap-6 px-5 pb-5">
      {/* Page Header */}
      <PageHeader text="My Sessions">
        <div className="size-8 rounded-full border border-n-500 overflow-hidden">
          <Image
            src={"/images/defaults/default-player.png"}
            width={32}
            height={32}
            alt="Coach Image"
          />
        </div>
      </PageHeader>

      <div className="flex flex-col gap-3">
        {/* Month Calendar */}
        <MonthCalendar
          onMonthChange={(date) => setSelectedMonth(date)}
          initialDate={selectedMonth}
        />

        <ScrollingCalendar
          currentMonth={selectedMonth}
          onDateSelect={() => {}}
        />
      </div>

      <Motion variants={slideInUp} delay={0.2}>
        <div className="flex flex-col gap-4">
          {/* Session Details */}
          {sessions.map((s, i) => (
            <SessionCard key={i} {...s} />
          ))}
        </div>
      </Motion>
    </div>
  );
}
