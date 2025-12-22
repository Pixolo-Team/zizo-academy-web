"use client";

// Interface Props
interface InfoListItemProps {
  text: string;
}

/** InfoListItem Component */
export default function InfoListItem({ text = "" }: InfoListItemProps) {
  return <div>{text}</div>;
}
