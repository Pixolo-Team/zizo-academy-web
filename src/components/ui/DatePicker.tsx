"use client";

// COMPONENTS //
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// OTHERS //
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import BlankCalendar from "../icons/neevo-icons/BlankCalendar";

interface DatePickerProps {
  value: string | undefined;
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  error?: string;
  required?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  label,
  required,
  error,
}: DatePickerProps) {
  const dateValue = value ? new Date(value) : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      {label && (
        <div className="relative flex">
          <label className="text-sm text-n-700">
            {label}
            {required && (
              <span className="absolute top-0 ml-0.5 text-red-500">*</span>
            )}
          </label>
        </div>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex flex-col gap-0.5">
            <Button
              variant={"outline"}
              className={cn(
                `h-[52px] text-n-950 flex w-full min-w-0 rounded-4xl border bg-n-50 placeholder:text-n-400 transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 border-n-200 text-base !p-4 justify-between ${error && "border-red-500"}`,
                !value && "text-n-950",
                className,
              )}
            >
              {dateValue ? (
                format(dateValue, "dd/MM/yyyy")
              ) : (
                <span className="text-n-400">{placeholder}</span>
              )}
              <BlankCalendar
                primaryColor="var(--color-n-400)"
                className="size-5"
              />
            </Button>
            {error && <span className="text-xs text-red-500">{error}</span>}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4 mr-4" align="start">
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={(date) =>
              onChange(date ? format(date, "yyyy-MM-dd") : "")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
