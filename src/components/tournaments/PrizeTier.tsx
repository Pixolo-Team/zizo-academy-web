"use client";

// Interface Props
interface PrizeTierProps {
  text: string;
}

export default function PrizeTier({ text = "" }: PrizeTierProps) {
  return <div>{text}</div>;
}
