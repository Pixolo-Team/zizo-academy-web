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
  currentMonth?: Date;
}

// Scrolling Calendar Components
const ScrollingCalendar: React.FC<ScrollingCalendarProps> = ({
  onDateSelect,
  selectedDate: externalSelectedDate,
  currentMonth, // NEW: Receive current month
}) => {
  // Define States
  const [selectedDate, setSelectedDate] = useState<Date>(
    externalSelectedDate
      ? new Date(
          externalSelectedDate.split("/").reverse().join("-"), // Convert DD/MM/YYYY → YYYY-MM-DD
        )
      : new Date(),
  );
  const [days, setDays] = useState<DayProps[]>([]);

  // Define Refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const todayRef = useRef(new Date());

  // Define Helper Functions
  /**
   * Generates all days in the given month
   */
  const generateDays = useCallback(() => {
    const today = todayRef.current;

    // Use currentMonth if provided, otherwise use selectedDate's month
    const monthToShow = currentMonth || selectedDate;

    // Get the first day of the month
    const firstDay = new Date(
      monthToShow.getFullYear(),
      monthToShow.getMonth(),
      1,
    );

    // Get the last day of the month
    const lastDay = new Date(
      monthToShow.getFullYear(),
      monthToShow.getMonth() + 1,
      0,
    );

    // Calculate number of days in the month
    const daysInMonth = lastDay.getDate();

    // Generate days array for the entire month
    const generated = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(
        monthToShow.getFullYear(),
        monthToShow.getMonth(),
        i + 1,
      );

      // Return DayProps
      return {
        date,
        isToday: date.toDateString() === today.toDateString(),
        hasEvent: false,
      };
    });

    // Update state
    setDays(generated);
  }, [currentMonth, selectedDate]);

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
  }, [days, onDateSelect, selectedDate, externalSelectedDate]);

  /**
   * Scrolls the currently selected date into center view.
   */
  useEffect(() => {
    if (!scrollRef.current || days.length === 0) return;

    // Find index of selected date in days array
    const index = days.findIndex(
      (dayItem) => dayItem.date.toDateString() === selectedDate.toDateString(),
    );

    if (index === -1) {
      // If selected date is not in current month, scroll to today or first day
      const todayIndex = days.findIndex((day) => day.isToday);
      const scrollIndex = todayIndex !== -1 ? todayIndex : 0;

      const element = scrollRef.current.children[scrollIndex] as HTMLElement;
      element?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      return;
    }

    const element = scrollRef.current.children[index] as HTMLElement;
    element?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [days, selectedDate]);

  return (
    <div className="flex flex-col gap-4">
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
              className={`flex flex-col items-center px-2.5 py-2 gap-2.5 rounded-[12px] cursor-pointer
                ${
                  isSelected
                    ? "bg-n-900 text-n-50 font-normal"
                    : " text-n-900 font-normal"
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
