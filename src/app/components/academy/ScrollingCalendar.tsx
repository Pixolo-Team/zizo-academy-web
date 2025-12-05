"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

/**
 * Represents a single day item in the calendar.
 */
interface DayProps {
  date: Date;
  isToday: boolean;
  isSelected: boolean;
  hasEvent?: boolean;
}

const ScrollingCalendar: React.FC = () => {
  // Define States
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [days, setDays] = useState<DayProps[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Memoize today so it's not recalculated on every render
  const today = useMemo(() => new Date(), []);

  // Format the month title based on selected date
  const monthTitle = selectedDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Define Helper Functions
  /** Handles selecting a date */
  const handleSelect = (day: DayProps) => {
    setSelectedDate(day.date); // Update selected date

    // Update selected state inside the days array
    setDays((prev) =>
      prev.map((d) => ({
        ...d,
        isSelected: d.date.toDateString() === day.date.toDateString(),
      }))
    );
  };

  /** Generates 31 days (15 past → today → 15 future) */
  const generateDays = useCallback(() => {
    // Start from 15 days before today
    const start = new Date(today);
    start.setDate(start.getDate() - 15);

    // Create array of 31 day objects
    const generated: DayProps[] = Array.from({ length: 31 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i); // Move forward day by day

      const isToday = d.toDateString() === today.toDateString();

      return {
        date: d,
        isToday,
        isSelected: isToday, // Select today initially
        hasEvent: false,
      };
    });

    setDays(generated);
  }, [today]);

  // Generate days on component mount
  useEffect(() => {
    generateDays();
  }, [generateDays]);

  /** Scroll to today's date only if selected date is today */
  useEffect(() => {
    if (!scrollRef.current) return;

    // Check if selected date is today
    const isTodaySelected =
      selectedDate.toDateString() === today.toDateString();

    if (!isTodaySelected) return;

    // Today is always index 15 (middle of 31 days)
    const todayIndex = 15;
    const el = scrollRef.current.children[todayIndex] as
      | HTMLElement
      | undefined;

    // Scroll into view if element exists
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedDate, today, days]);

  return (
    <div className="flex flex-col gap-4">
      {/* Month Title */}
      <h2 className="text-lg text-n-100 font-bold">{monthTitle}</h2>

      {/* Scrollable calendar row */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-scroll no-scrollbar"
      >
        {days.map((day, index) => (
          <div
            key={index}
            onClick={() => handleSelect(day)} // Handle clicking a day
            className={`flex flex-col items-center p-3 gap-2.5 rounded-full cursor-pointer min-w-[48px]
              ${
                day.isSelected
                  ? "bg-n-50 text-n-900 font-medium"
                  : "text-n-50 font-normal"
              }
            `}
          >
            {/* Weekday Name */}
            <span className="text-sm">
              {day.date.toLocaleDateString("en-US", { weekday: "short" })}
            </span>

            {/* Day Number */}
            <span className="text-base">{day.date.getDate()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingCalendar;
