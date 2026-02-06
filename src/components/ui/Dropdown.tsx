"use client";

// COMPONENTS //
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Interface Props
interface DropdownProps {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  selectedOption: string;
  className?: string;
  error?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  leftChild?: React.ReactNode;
  rightChild?: React.ReactNode;
}

/** Filter Component */
export default function Dropdown({
  options = [],
  onChange,
  selectedOption,
  className,
  error,
  label,
  required,
  placeholder,
  leftChild,
  rightChild,
}: DropdownProps) {
  // Define Navigation

  // Define Context

  // Define States

  // Define Refs

  // Helper Functions

  // Use Effects
  return (
    <div className="flex flex-col gap-1.5 h-full">
      {/* Label */}
      <div className="relative flex">
        {label && (
          <label className="text-sm text-n-700">
            {label}
            {required && (
              <span className="absolute top-0 ml-0.5 text-red-500">*</span>
            )}
          </label>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <Select value={selectedOption} onValueChange={onChange}>
          {/* Select Trigger */}
          <SelectTrigger
            isSelected={Boolean(selectedOption)}
            className={
              `h-[52px] text-n-950 flex w-full min-w-0 rounded-4xl border bg-n-50 placeholder:text-n-400 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 border-n-200 text-base px-4 py-1.5 ${leftChild && "pl-1.5"} ${error && "border-red-500"}` +
              " " +
              className
            }
          >
            <div className="flex items-center gap-2 w-2/3">
              {leftChild && <div className="flex-1">{leftChild}</div>}
              <SelectValue
                placeholder={placeholder}
                className="placeholder:text-n-400 w-full"
              />
            </div>
          </SelectTrigger>

          {/* Select Content */}
          <SelectContent className="bg-n-50">
            {options.map((option) => (
              <SelectItem
                key={option.label}
                value={option.value}
                className="text-n-950"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </div>
  );
}
