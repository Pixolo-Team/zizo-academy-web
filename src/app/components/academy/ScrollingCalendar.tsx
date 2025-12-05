"use client";

import { formatDate } from "@/app/utils/date";
import React, { useState, useEffect, useRef, useCallback } from "react";

export interface DayProps {
  date: Date;
  isToday: boolean;
  hasEvent?: boolean;
}

export interface ScrollingCalendarProps {
  onDateSelect?: (dateString: string) => void;
  selectedDate?: string;
}

// Scrolling Calendar Components
const ScrollingCalendar: React.FC<ScrollingCalendarProps> = ({
  onDateSelect,
  selectedDate: externalSelectedDate,
}) => {
  // Define States
  const [selectedDate, setSelectedDate] = useState<Date>(
    externalSelectedDate
      ? new Date(
          externalSelectedDate.split("/").reverse().join("-") // Convert DD/MM/YYYY → YYYY-MM-DD
        )
      : new Date()
  );
  const [days, setDays] = useState<DayProps[]>([]);

  // Define Refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef(new Date());

  // Define Helper Functions
  /**
   * Generates 31 days:
   * - 15 days before today
   * - today
   * - 15 days after today
   */
  const generateDays = useCallback(() => {
    const today = todayRef.current;

    // Start 15 days before today
    const start = new Date(today);
    start.setDate(start.getDate() - 15);

    // Generate days array
    const generated = Array.from({ length: 31 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);

      // Return DayProps
      return {
        date,
        isToday: date.toDateString() === today.toDateString(),
        hasEvent: false,
      };
    });

    // Update state
    setDays(generated);
  }, []);

  /**
   * Handles selecting a date in the calendar.
   * Updates state and notifies parent.
   */
  const handleSelect = (day: DayProps) => {
    setSelectedDate(day.date);

    const dateString = formatDate(day.date);

    // Send formatted date to parent
    onDateSelect?.(dateString);
  };

  /** Month title displayed above the calendar */
  const monthTitle = selectedDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  // Define Effects
  useEffect(() => {
    generateDays();
  }, [generateDays]);

  /**
   * On first render, after days are generated,
   * notify the parent of the initial selected date.
   */
  useEffect(() => {
    if (!onDateSelect) return;

    // Format date as DD/MM/YYYY
    const dateString = formatDate(selectedDate);

    onDateSelect(dateString);
  }, [days, onDateSelect, selectedDate, externalSelectedDate]); // Runs once because days only updates once on mount

  /**
   * Scrolls the currently selected date into center view.
   */
  useEffect(() => {
    if (!scrollRef.current || days.length === 0) return;

    // Find index of selected date in days array
    const index = days.findIndex(
      (dayItem) => dayItem.date.toDateString() === selectedDate.toDateString()
    );

    if (index === -1) return;

    const element = scrollRef.current.children[index] as HTMLElement;
    element?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [selectedDate, days]);

  return (
    <div className="flex flex-col gap-4">
      {/* Month Title */}
      <h2 className="text-lg text-n-100 font-bold">{monthTitle}</h2>

      {/* Scrollable days */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-scroll no-scrollbar"
      >
        {days.map((day, index) => {
          const isSelected =
            day.date.toDateString() === selectedDate.toDateString();

          return (
            <div
              key={index}
              onClick={() => handleSelect(day)}
              className={`flex flex-col items-center p-3 gap-2.5 rounded-full cursor-pointer min-w-[48px]
                ${
                  isSelected
                    ? "bg-n-50 text-n-900 font-medium"
                    : "text-n-50 font-normal"
                }
              `}
            >
              {/* Weekday (Mon, Tue...) */}
              <p className="text-sm">
                {day.date.toLocaleDateString("en-US", { weekday: "short" })}
              </p>

              {/* Day Number */}
              <p className="text-base">{day.date.getDate()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScrollingCalendar;
