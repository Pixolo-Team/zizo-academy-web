import React from "react";

interface SelectButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * A simple button that can be selected or deselected.
 * @param label - The text to display on the button.
 * @param isSelected - Whether the button is selected.
 * @param onClick - The function to call when the button is clicked.
 */
export default function SelectButton({
  label,
  isSelected,
  onClick,
}: SelectButtonProps) {
  return (
    <button
      className={`py-3 px-4 rounded-4xl border border-n-200 ${
        isSelected ? "bg-n-900 text-n-50" : "bg-n-50 text-n-950"
      }`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
