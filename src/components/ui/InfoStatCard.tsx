"use client";

// Interface Props
interface InfoListItemProps {
  text: string;
}

export default function InfoListItem({ text = "" }: InfoListItemProps) {
  return <div>{text}</div>;
}
