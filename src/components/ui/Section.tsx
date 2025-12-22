"use client";

// Interface Props
interface SectionProps {
  text: string;
}

/** Section Component */
export default function Section({ text = "" }: SectionProps) {
  return <div>{text}</div>;
}
