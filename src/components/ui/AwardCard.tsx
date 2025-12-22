"use client";

// Interface Props
interface AwardCardProps {
  text: string;
}

export default function AwardCard({ text = "" }: AwardCardProps) {
  return <div>{text}</div>;
}
