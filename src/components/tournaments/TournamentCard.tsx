"use client";

// Interface Props
interface TournamentCardProps {
  text: string;
}

export default function TournamentCard({ text = "" }: TournamentCardProps) {
  return <div>{text}</div>;
}
