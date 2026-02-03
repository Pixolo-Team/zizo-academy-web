"use client";
import SessionCard from "@/components/ui/coach/SessionCard";

export default function TestingPage() {
  return (
    <div className="p-5">
      <SessionCard
        sessionName="Advanced Training | Under 10"
        time="4:00 PM - 7:00 PM"
        location="Kasturba Gandhi, Borivali West"
        reportingTime="8:30 AM"
        status="ongoing"
      />
    </div>
  );
}
