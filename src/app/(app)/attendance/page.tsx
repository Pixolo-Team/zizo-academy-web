"use client";

// COMPONENTS //
import AttendanceStatusCard from "@/app/components/attendance/AttendanceStatusCard";
import PageHeader from "@/app/components/layout/Header";

const AttendancePage = () => {
  return (
    <>
      {/* Page Header */}
      <PageHeader text="Attendance" />
      {/* Attendance Details */}
      <div className="flex flex-col justify-center items-center gap-3">
        <AttendanceStatusCard />
      </div>
    </>
  );
};

export default AttendancePage;
