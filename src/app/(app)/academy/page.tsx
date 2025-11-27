"use client";

import AcademyBackground from "@/../public/academy-background.jpg";
import ProfileHeader from "@/app/components/academy/ProfileHeader";
import { useRouter } from "next/navigation";
import { PlayerAttendance } from "@/app/components/academy/PlayerAttendance";
import { Button } from "@/components/ui/button";

const playerDetails = [
  {
    name: "Ritesh Kumar Sigham",
    id: "SUFA 0032",
    imageUrl: "/profile-image.jpg",
  },
  {
    name: "Amit Solanki",
    id: "SUFA 0045",
    imageUrl: "/profile-image.jpg",
  },
  {
    name: "Jay Patel",
    id: "SUFA 0021",
    imageUrl: "/profile-image.jpg",
  },
];

export default function Academy() {
  const router = useRouter();
  return (
    <section>
      <div
        className="relative w-full h-44 bg-cover bg-center z-1"
        style={{
          backgroundImage: `url(${AcademyBackground.src})`,
        }}
      >
        <ProfileHeader
          iconColor="text-slate-50"
          imageUrl="/profile-image.jpg"
          onBack={() => router.back()}
        />
        {/* Overlay */}
        <div className="absolute top-0 w-full h-44 -z-1 bg-slate-900/90" />

        <div className="flex flex-col gap-5 z-2 px-5">
          <div className="flex flex-col gap-1">
            {/* Session Title */}
            <p className="text-xl font-medium text-n-950">
              Practice Session | Under 8
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
      <div className="flex flex-col justify-between p-5">
        <div>
          {playerDetails.map((playerItem, index) => (
            <PlayerAttendance
              key={index}
              name={playerItem.name}
              id={playerItem.id}
              imageUrl={playerItem.imageUrl}
              onPresent={() => console.log(`${playerItem.name} marked Present`)}
              onAbsent={() => console.log(`${playerItem.name} marked Absent`)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between px-4">
            {/* Present */}
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs text-n-300 font-normal">Present</p>
              <p className="text-xl font-medium text-n-50">12</p>
            </div>

            {/* Absent */}
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs text-n-300 font-normal">Absent</p>

              <p className="text-xl font-medium text-n-50">03</p>
            </div>

            {/* Pending */}
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs text-n-300 font-normal">Pending</p>

              <p className="text-xl font-medium text-n-50">05</p>
            </div>

            {/* Total */}
            <div className="flex flex-col items-center gap-1">
              <p className="text-xs text-n-300 font-normal">Total</p>

              <p className="text-xl font-medium text-n-50">20</p>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="h-14">
            <Button
              className={
                "bg-n-100 rounded-full w-full h-full text-n-950 font-medium text-base z-2"
              }
              variant="default"
              size="lg"
            >
              Confirm Attendance
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
