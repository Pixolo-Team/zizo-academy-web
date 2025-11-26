import WeekCalendar from "@/app/components/academy/WeekCalendar";
import SessionCard from "../../components/academy/SessionCard";

export default function Page() {
  return (
    <section>
      <div className="px-6 container mx-auto py-8">
        <div className="flex flex-col gap-3">
          <WeekCalendar />

          <SessionCard
            startTime="18:00"
            endTime="19:00"
            title="Practice Session | Under 8"
            location="Ramji Assar, Ghatkopar East"
            status="ongoing"
          />
          <SessionCard
            startTime="18:00"
            endTime="19:00"
            title="Practice Session | Under 8"
            location="Ramji Assar, Ghatkopar East"
            status="cancelled"
          />
          <SessionCard
            startTime="18:00"
            endTime="19:00"
            title="Practice Session | Under 8"
            location="Ramji Assar, Ghatkopar East"
          />
        </div>
      </div>
    </section>
  );
}
