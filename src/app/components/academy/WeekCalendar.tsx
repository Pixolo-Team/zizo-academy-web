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
  // Generate last 15 days, today, and next 15 days
  // -----------------------------
  const generateDays = () => {
    const result: DayProps[] = [];
    const today = new Date();

    // Start from 15 days ago
    const start = new Date(today);
    start.setDate(today.getDate() - 15);

    // Generate 31 days total (15 past + today + 15 future)
    for (let i = 0; i < 31; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);

      const isToday = d.toDateString() === today.toDateString();

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

    // Scroll to today's date (15th item, index 14)
    setTimeout(() => {
      if (scrollRef.current) {
        const todayElement = scrollRef.current.children[16] as HTMLElement;
        if (todayElement) {
          todayElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    }, 0);
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
