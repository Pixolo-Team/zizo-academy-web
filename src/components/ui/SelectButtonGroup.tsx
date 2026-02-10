import React from "react";
import SelectButton from "./SelectButton";

interface SelectableItem {
  [key: string]: string;
}

interface SelectableButtonGroupProps<T extends SelectableItem> {
  items: T[];
  selectedItems: T[];
  onSelectionChange: (items: T[]) => void;
  selectMultiple: boolean;
  labelKey?: keyof T;
  idKey?: keyof T;
}

/** Selectable Button Group */
export default function SelectableButtonGroup<T extends SelectableItem>({
  items,
  selectedItems,
  onSelectionChange,
  selectMultiple,
  labelKey = "label" as keyof T,
  idKey = "id" as keyof T,
}: SelectableButtonGroupProps<T>) {
  /** Helper Function */

  /** Handle Click */
  const handleClick = (item: T) => {
    if (selectMultiple) {
      // Multiple selection mode
      const isAlreadySelected = selectedItems.some(
        (selectedItem) => selectedItem[idKey] === item[idKey],
      );

      // If item is already selected, remove it
      if (isAlreadySelected) {
        // Remove item
        onSelectionChange(
          selectedItems.filter(
            (selectedItem) => selectedItem[idKey] !== item[idKey],
          ),
        );
      } else {
        // Add item
        onSelectionChange([...selectedItems, item]);
      }
    } else {
      // Single selection mode
      const isAlreadySelected = selectedItems.some(
        (selectedItem) => selectedItem[idKey] === item[idKey],
      );

      if (isAlreadySelected) {
        // Deselect if clicking the same item
        onSelectionChange([]);
      } else {
        // Select the new item
        onSelectionChange([item]);
      }
    }
  };

  /** Check if item is selected */
  const isItemSelected = (item: T) => {
    return selectedItems.some(
      (selectedItem) => selectedItem[idKey] === item[idKey],
    );
  };

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {/* Map through items and render SelectButton */}
      {items.map((item, index) => (
        <SelectButton
          key={item[idKey] || index}
          label={String(item[labelKey])}
          isSelected={isItemSelected(item)}
          onClick={() => handleClick(item)}
        />
      ))}
    </div>
  );
}
