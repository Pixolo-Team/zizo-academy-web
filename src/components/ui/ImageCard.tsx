"use client";

// Interface Props
interface ImageCardProps {
  text: string;
}

/** ImageCard Component */
export default function ImageCard({ text = "" }: ImageCardProps) {
  return <div>{text}</div>;
}
