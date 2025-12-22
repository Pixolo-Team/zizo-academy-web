"use client";

// Interface Props
interface SectionProps {
  text: string;
}

export default function Section({ text = "" }: SectionProps) {
  return <div>{text}</div>;
}
