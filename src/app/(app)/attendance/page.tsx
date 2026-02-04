"use client";

// REACT //
import { Month } from "react-day-picker";

// COMPONENTS //
import AttendanceStatusCard from "@/app/components/attendance/AttendanceStatusCard";
import PageHeader from "@/app/components/layout/Header";
import { MonthCalendar } from "@/components/attendance/MonthCalendar";

const attendanceData = [
  {
    currentAttendance: 30,
    totalSessions: 30,
    percentageChange: 0,
    onTimeCount: 28,
    lateCount: 2,
    latePercentageChange: 10,
    trendStatus: "Late Increased 10%",
    trendDescription: "Late check-ins increased by 1 this week",
  },
  {
    currentAttendance: 25,
    totalSessions: 30,
    percentageChange: -16,
    onTimeCount: 20,
    lateCount: 5,
    latePercentageChange: -20,
    trendStatus: "Late Decreased 20%",
    trendDescription: "Late check-ins decreased by 2 this week",
  },
  {
    currentAttendance: 25,
    totalSessions: 30,
    percentageChange: -16,
    onTimeCount: 20,
    lateCount: 5,
    latePercentageChange: 0,
    trendStatus: "Late Decreased 20%",
    trendDescription: "Late check-ins decreased by 2 this week",
  },
];

const AttendancePage = () => {
  return (
    <div className="flex flex-col gap-6 px-5 pb-5">
      {/* Page Header */}
      <PageHeader text="Attendance" />

      {/* Month Calendar */}
      <MonthCalendar />

      {/* Attendance Details */}
      {attendanceData.map((data, index) => (
        <AttendanceStatusCard key={index} {...data} />
      ))}
    </div>
  );
};

export default AttendancePage;
