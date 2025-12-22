"use client";

// Interface Props
interface ProfileProps {
  text: string;
}

/** Profile Component */
export default function Profile({ text = "" }: ProfileProps) {
  return <div>{text}</div>;
}
