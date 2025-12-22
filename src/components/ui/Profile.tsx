"use client";

// Interface Props
interface ProfileProps {
  text: string;
}

export default function Profile({ text = "" }: ProfileProps) {
  return <div>{text}</div>;
}
