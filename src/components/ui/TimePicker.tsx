"use client";

import { useState } from "react";
import Picker from "react-mobile-picker";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const hours = Array.from({ length: 12 }, (_, i) => String(i + 1));
const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);
const period = ["AM", "PM"];

export default function TimePicker({
  value,
  onChange,
  placeholder = "Pick a time",
  className,
  label,
  required,
  error,
}: {
  value: string | undefined;
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState({
    hour: "9",
    minute: "41",
    period: "AM",
  });

  console.log(time);

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
      <Popover open={open} onOpenChange={setOpen}>
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
              {value ? (
                value
              ) : (
                <span className="text-n-400">{placeholder}</span>
              )}
            </Button>
            {error && <span className="text-xs text-red-500">{error}</span>}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto" align="start">
          <div className="flex flex-col items-center bg-n-50 rounded-xl w-50">
            <Picker
              value={time}
              onChange={setTime}
              wheelMode="normal"
              height={180}
              itemHeight={36}
              className="w-full"
            >
              <Picker.Column name="hour">
                {hours.map((hour) => (
                  <Picker.Item key={hour} value={hour} className="w-full">
                    {({ selected }) => (
                      /* Use the `selected` state to conditionally style the selected item */
                      <div
                        style={{
                          color: selected
                            ? "var(--color-n-950)"
                            : "var(--color-n-400)",
                        }}
                      >
                        {hour}
                      </div>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>

              <Picker.Column name="minute">
                {minutes.map((minute) => (
                  <Picker.Item key={minute} value={minute} className="w-full">
                    {({ selected }) => (
                      /* Use the `selected` state to conditionally style the selected item */
                      <div
                        style={{
                          color: selected
                            ? "var(--color-n-950)"
                            : "var(--color-n-400)",
                        }}
                      >
                        {minute}
                      </div>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>

              <Picker.Column name="period">
                {period.map((period) => (
                  <Picker.Item key={period} value={period} className="w-full">
                    {({ selected }) => (
                      /* Use the `selected` state to conditionally style the selected item */
                      <div
                        style={{
                          color: selected
                            ? "var(--color-n-950)"
                            : "var(--color-n-400)",
                        }}
                      >
                        {period}
                      </div>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
            </Picker>

            <div className="flex justify-end gap-4 mt-4 w-full text-blue-600 font-medium">
              <button onClick={() => setOpen(false)}>CANCEL</button>
              <button
                onClick={() => {
                  onChange(`${time.hour}:${time.minute} ${time.period}`);
                  setOpen(false);
                }}
              >
                OK
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
