// REACT //
import { useState } from "react";

// OTHERS //
import TaillessLineArrowLeft1 from "../icons/neevo-icons/TaillessLineArrowLeft1";

interface MonthCalendarProps {
  onMonthChange?: (date: Date) => void;
  initialDate?: Date;
}

/** Month Calendar Component */
export const MonthCalendar = ({
  onMonthChange,
  initialDate = new Date(),
}: MonthCalendarProps) => {
  // Define States
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);

  // Get today's date
  const today = new Date();

  // Check if currently viewing the current month
  const isCurrentMonth =
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();

  /* Navigate to previous month */
  const goToPreviousMonth = () => {
    // Calculate new date for previous month
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    setCurrentDate(newDate);
    onMonthChange?.(newDate);
  };

  /* Navigate to next month */
  const goToNextMonth = () => {
    if (isCurrentMonth) return; // Don't allow going to future months

    // Calculate the new date for the next month
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    );
    setCurrentDate(newDate);
    onMonthChange?.(newDate);
  };

  // Format month and year display
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="py-2 px-3 bg-n-50 flex justify-between items-center rounded-2xl border border-n-200">
      {/* Go to Previous Month Button */}
      <button
        onClick={goToPreviousMonth}
        className="bg-n-100 size-9 rounded-full flex justify-center items-center hover:bg-n-200 transition-colors active:scale-95"
        aria-label="Previous month"
      >
        <TaillessLineArrowLeft1
          primaryColor="var(--color-n-900)"
          className="size-2.5"
        />
      </button>

      {/* Month and Year Display Text */}
      <div className="text-n-900">
        {monthYear}
        {isCurrentMonth && " (This Month)"}
      </div>

      {/* Go to Next Month Button */}
      <button
        onClick={goToNextMonth}
        disabled={isCurrentMonth}
        className={`size-9 rounded-full flex justify-center items-center transition-colors ${
          isCurrentMonth ? "bg-n-200 cursor-not-allowed" : "bg-n-100"
        }`}
        aria-label="Next month"
      >
        <TaillessLineArrowLeft1
          primaryColor={
            isCurrentMonth ? "var(--color-n-400)" : "var(--color-n-900)"
          }
          className="size-2.5 rotate-180"
        />
      </button>
    </div>
  );
};
