"use client";
// REACT //
import { useRouter } from "next/navigation";
import React from "react";

// COMPONENTS //
import { Button } from "@/components/ui/button";
import LineArrowRight1 from "@/components/icons/neevo-icons/LineArrowRight1";

// Interface props
interface PageHeaderProps {
  children?: React.ReactNode;
  text?: string;
}

// Page Header Component
export default function PageHeader({ children, text }: PageHeaderProps) {
  // Define Navigation
  const router = useRouter();

  // Define Context

  // Define States

  // Define Refs

  // Helper Functions

  // Use Effects

  return (
    <div className="flex justify-between items-center pt-6">
      <Button
        aria-label="Go back"
        className={`rounded-full bg-transparent hover:bg-n-100 border border-n-300`}
        variant="secondary"
        size="icon-sm"
        onClick={() => router.back()}
      >
        <LineArrowRight1
          primaryColor="var(--color-n-800)"
          className="rotate-180"
        />
      </Button>

      {/* Title */}
      {text && <p className="text-n-950">{text}</p>}

      {/* Right Content */}
      <div>{children}</div>
    </div>
  );
}
