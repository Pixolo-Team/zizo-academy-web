"use client";

import React, { useState, useEffect, useRef } from "react";

interface DayProps {
  date: Date;
  isToday: boolean;
  isSelected: boolean;
  hasEvent?: boolean;
}

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [days, setDays] = useState<DayProps[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // -----------------------------
  // Generate days but show TODAY in the visible first 6 items
  // -----------------------------
  const generateDays = () => {
    const result: DayProps[] = [];

    // TODAY should be the 3rd item in view (center-ish)
    const start = new Date();
    start.setDate(start.getDate() - 2); // 2 days before today

    for (let i = 0; i < 120; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);

      const isToday = d.toDateString() === new Date().toDateString();

      result.push({
        date: d,
        isToday,
        isSelected: isToday,
        hasEvent: false,
      });
    }

    setDays(result);
  };

  useEffect(() => {
    generateDays();
  }, []);

  // -----------------------------
  // Month title based on selected date
  // -----------------------------
  const monthTitle = selectedDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const handleSelect = (day: DayProps) => {
    setSelectedDate(day.date);

    setDays((prev) =>
      prev.map((d) => ({
        ...d,
        isSelected: d.date.toDateString() === day.date.toDateString(),
      }))
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Month Title */}
      <h2 className="text-lg text-n-100 font-bold">{monthTitle}</h2>

      {/* Calendar Row (No auto scroll) */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-scroll no-scrollbar"
      >
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => handleSelect(day)}
            className={`flex flex-col items-center p-3 gap-2.5 rounded-full cursor-pointer min-w-[48px]
              ${
                day.isSelected
                  ? "bg-n-50 text-n-900 font-medium"
                  : "text-n-50 font-normal"
              }
            `}
          >
            {/* Day Name */}
            <span className="text-sm">
              {day.date.toLocaleDateString("en-US", { weekday: "short" })}
            </span>

            {/* Date */}
            <span className="text-base relative">{day.date.getDate()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
