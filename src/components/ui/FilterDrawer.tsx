"use client";

// COMPONENTS //
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

/** Filter Drawer Props */
interface FilterDrawerProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

/** Filter Drawer Component */
export default function FilterDrawer({
  title = "Game Preferences",
  description = "Select your preferences",
  children,
}: FilterDrawerProps) {
  return (
    <Drawer>
      {/* Drawer Trigger */}
      <DrawerTrigger asChild>
        <button className="bg-n-50 text-n-950 rounded-2xl border-none px-4 py-2 whitespace-nowrap">
          More Filters
        </button>
      </DrawerTrigger>

      {/* Drawer Content  */}
      <DrawerContent>
        {/* Drawer Header */}
        <DrawerHeader>
          <DrawerTitle className="text-n-950 text-left">{title}</DrawerTitle>
          <DrawerDescription className="text-n-500 text-xs text-left">
            {description}
          </DrawerDescription>
        </DrawerHeader>

        {/* Drawer Body */}
        <div className="px-3 pt-3 pb-8 overflow-y-auto">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
