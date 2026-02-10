import FilterDrawer from "@/components/FilterDrawer";
import { Button } from "@/components/ui/button";

/**
 * Drawer component for deleting a coach
 */
export default function DeleteBottomDrawer({
  isOpen,
  onOpenChange,
  onDelete,
  coachDetails,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  coachDetails: {
    coach: string | null;
    role: string | null;
  };
}) {
  return (
    <FilterDrawer
      title="Remove Coach?"
      description={`Are you sure you want to remove ( 
            ${coachDetails?.coach ?? ""} - ${coachDetails?.role ?? ""}
        ) from the session?`}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className="grid grid-cols-2 gap-1">
        {/* Cancel Button */}
        <Button
          onClick={() => {
            onOpenChange(false);
          }}
          variant="outline"
          className="h-[52px] rounded-[30px] text-base border border-n-300 text-n-800"
        >
          Cancel
        </Button>
        {/* Delete Button */}
        <Button
          onClick={() => {
            onDelete();
            onOpenChange(false);
          }}
          className="h-[52px] text-base rounded-[30px]"
        >
          Delete
        </Button>
      </div>
    </FilterDrawer>
  );
}
