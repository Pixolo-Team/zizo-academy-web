"use client";

import WeekCalendar from "@/app/components/academy/WeekCalendar";
import SessionCard from "../../components/academy/SessionCard";
import ProfileHeader from "@/app/components/academy/ProfileHeader";
import { useRouter } from "next/navigation";

const sessions = [
  {
    id: 1,
    startTime: "18:00",
    endTime: "19:00",
    title: "Practice Session | Under 8",
    location: "Ramji Assar, Ghatkopar East",
    status: "ongoing",
  },
  {
    id: 2,
    startTime: "18:00",
    endTime: "19:00",
    title: "Practice Session | Under 12",
    location: "Ramji Assar, Ghatkopar East",
    status: "cancelled",
  },
  {
    id: 3,
    startTime: "18:00",
    endTime: "19:00",
    title: "Practice Session | Under 14",
    location: "Ramji Assar, Ghatkopar East",
    status: "upcoming",
  },
];

export default function Page() {
  const router = useRouter();

  return (
    <section>
      <ProfileHeader
        imageUrl="/profile-image.jpg"
        onBack={() => router.back()}
        iconColor="text-slate-950"
      />
      <div className="px-6 pb-6 container mx-auto flex flex-col gap-7">
        <WeekCalendar />

        <div className="flex flex-col gap-3">
          {sessions.map((sessionItem) => (
            <SessionCard
              key={sessionItem.id}
              startTime={sessionItem.startTime}
              endTime={sessionItem.endTime}
              title={sessionItem.title}
              location={sessionItem.location}
              status={sessionItem.status}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
