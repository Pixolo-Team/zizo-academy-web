"use client";

// REACT //
import { SlidersHorizontal } from "lucide-react";

// COMPONENTS //
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MagnifyingGlass from "../icons/neevo-icons/MagnifyingGlass";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  className?: string;
  rightIcon?: boolean;
  onRightIconClick?: () => void;
};

export default function SearchInput({
  value = "",
  onChange,
  placeholder = "Search...",
  onClear,
  className,
  rightIcon,
  onRightIconClick,
}: Props) {
  // Define Context

  // Define States

  // Define Refs

  // Helper Functions
  const handleClear = () => {
    onClear?.();
    onChange && onChange("");
  };

  // Use Effects

  return (
    <div
      className={`flex relative items-center gap-2 w-full ${className ?? ""}`}
    >
      {/* Left Search Icon */}
      <div className="absolute top-1/2 -translate-y-1/2 left-5">
        <MagnifyingGlass primaryColor="var(--color-n-700)" className="size-5" />
      </div>

      {/* Input */}
      <Input
        type="search"
        value={value}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        placeholder={placeholder}
        aria-label={placeholder}
        className={`pl-12 w-full ${rightIcon ? "pr-12" : ""} h-[50px] ${className}`}
      />

      {/* Right Icon */}
      {rightIcon && (
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={onRightIconClick}
          className="absolute right-5 size-5 rounded-full hover:bg-n-100"
        >
          <SlidersHorizontal className="h-4 w-4 text-n-500" />
        </Button>
      )}
    </div>
  );
}
