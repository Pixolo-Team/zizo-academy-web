"use client";

// components/WeekCalendar.tsx
import React, { useState, useEffect } from "react";

interface WeekDay {
  date: Date;
  isToday: boolean;
  isSelected: boolean;
  hasEvent?: boolean;
}

const WeekCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [week, setWeek] = useState<WeekDay[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    generateWeek(currentDate);
  }, [currentDate]);

  const generateWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    // Set to Monday
    const day = date.getDay(); // Sunday = 0
    const diff = day === 0 ? -6 : 1 - day; // adjust if Sunday
    startOfWeek.setDate(date.getDate() + diff);

    const days: WeekDay[] = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return {
        date: d,
        isToday: d.toDateString() === new Date().toDateString(),
        isSelected: d.toDateString() === selectedDate.toDateString(),
        hasEvent: [22, 24].includes(d.getDate()), // example for green dots
      };
    });

    setWeek(days);
  };

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    generateWeek(date);
  };

  const formatDay = (date: Date) =>
    date.toLocaleDateString("en-US", { weekday: "short" });

  const formatDate = (date: Date) => date.getDate();

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-lg text-n-100 font-bold">
        {currentDate.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </h2>
      <div className="flex justify-between items-center gap-2 overflow-x-scroll">
        {week.map((day) => (
          <div
            key={day.date.toDateString()}
            onClick={() => handleSelect(day.date)}
            className={`week-day  flex flex-col items-center p-3 gap-2.5 rounded-full cursor-pointer ${
              day.isSelected ? "selected" : ""
            }`}
          >
            <span className="text-sm z-10">{formatDay(day.date)}</span>
            <span className="text-lg font-bold z-10 relative ">
              {formatDate(day.date)}
              {day.hasEvent && (
                <span className="absolute size-1 bg-green-500 rounded-full"></span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekCalendar;
