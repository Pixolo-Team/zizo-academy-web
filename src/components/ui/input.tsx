"use client";
// REACT //
import * as React from "react";

// OTHERS //
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  prefix?: string;
}

function Input({
  className,
  type,
  label,
  error,
  required,
  prefix,
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
      <div className="flex flex-col gap-0.5">
        <div className="relative">
          {/* Prefix Container */}
          {prefix && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-n-400 text-base pointer-events-none">
              {prefix}
            </span>
          )}
          <input
            type={type}
            data-slot="input"
            className={cn(
              "flex w-full min-w-0 rounded-4xl border bg-n-50 placeholder:text-n-400 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 border-n-200 text-base p-4",
              prefix ? "pl-12" : "pl-4",
              error && "border-red-500",
              "",
              className,
            )}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </div>
  );
}

export { Input };
