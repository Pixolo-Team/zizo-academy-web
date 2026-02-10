"use client";
// REACT //
import * as React from "react";

// TYPES //
import { IconComponent } from "@/types/icon";

// OTHERS //
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  rightIcon?: IconComponent;
  onRightIconClick?: () => void;
}

function Input({
  className,
  type,
  label,
  rightIcon,
  error,
  required,
  onRightIconClick,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
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
      <div className="flex flex-col gap-0.5 relative">
        <input
          type={type}
          data-slot="input"
          className={cn(
            "flex w-full min-w-0 rounded-4xl border bg-n-50 placeholder:text-n-400 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 border-n-200 text-base p-4",
            error && "border-red-500",
            "",
            rightIcon && "pr-14",
            className,
          )}
          {...props}
        />
        {/* Optional right-side action button (ex: copy-paste).*/}
        {rightIcon && (
          <button
            type="button"
            className="absolute right-5 top-4 cursor-pointer"
            aria-label="Input action"
            onClick={onRightIconClick}
          >
            {React.createElement(rightIcon, {
              primaryColor: "var(--color-n-400)",
              width: 25,
              height: 25,
            })}
          </button>
        )}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </div>
  );
}

export { Input };
