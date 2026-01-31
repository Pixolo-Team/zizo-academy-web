"use client";
// REACT //
import { useRouter } from "next/navigation";

// COMPONENTS //
import { Button } from "@/components/ui/button";

/** Home Page */
export default function Home() {
  // Define Navigation
  const router = useRouter();

  // Eslint check

  // hello world

  return (
    <div className=" flex flex-col items-center justify-center gap-4 mt-18">
      <h1 className="text-2xl font-bold">Welcome to the Academy App</h1>
      <Button onClick={() => router.push("schedule")}>
        Check Today&apos;s Schedule
      </Button>
    </div>
  );
}
