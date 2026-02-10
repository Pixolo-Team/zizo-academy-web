// REACT //
import * as React from "react";

// OTHERS //
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"textarea"> {
  label?: string;
  error?: string;
}

function Textarea({ className, label, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="relative flex">
        {label && (
          <label className="text-sm text-n-700">
            {label}
            {props.required && (
              <span className="absolute top-0 ml-0.5 text-red-500">*</span>
            )}
          </label>
        )}
      </div>
      <textarea
        data-slot="textarea"
        className={cn(
          "flex w-full min-w-0 rounded-3xl border bg-n-50 placeholder:text-n-400 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 border-n-200 text-base p-4 resize-none max-h-[150px]",
          error && "border-red-500",
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export { Textarea };
