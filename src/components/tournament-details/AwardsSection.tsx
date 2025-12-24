"use client";

import { Award, Trophy, Shirt } from "lucide-react";
import RunIcon from "../icons/Run";
import BallIcon from "../icons/Ball";

interface AwardItem {
  icon: React.ReactNode;
  label: string;
}

const mockAwards: AwardItem[] = [
  { icon: <RunIcon className="text-n-600" />, label: "Best Player" },
  { icon: <BallIcon className="text-n-600" />, label: "Best Player" },
  {
    icon: <Shirt className="text-n-600" />,
    label: "Best Goalkeeper",
  },
];

export default function AwardsSection() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-medium text-n-950">Honours & Awards</h3>
      <div className="grid grid-cols-3 gap-3">
        {mockAwards.map((award, index) => (
          <div
            key={index}
            className="bg-n-100 rounded-2xl justify-between flex flex-col p-2.5 gap-3"
          >
            <div className="size-5 text-n-950">{award.icon}</div>
            <p className="text-[14px] text-n-800 leading-none">{award.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
