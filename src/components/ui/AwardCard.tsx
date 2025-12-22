"use client";

// Interface Props
interface AwardCardProps {
  text: string;
}

/** AwardCard Component */
export default function AwardCard({ text = "" }: AwardCardProps) {
  return <div>{text}</div>;
}
