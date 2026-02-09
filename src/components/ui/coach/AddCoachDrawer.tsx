import FilterDrawer from "@/components/FilterDrawer";
import Dropdown from "../Dropdown";
import { Button } from "../button";
import CoachDropdown from "./CoachDropdown";

export default function AddCoachDrawer({
  isOpen,
  onOpenChange,
  coaches,
  roles,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  coaches: { label: string; value: string }[];
  roles: { label: string; value: string }[];
}) {
  return (
    <FilterDrawer
      title="Assign Coach for Session"
      description="Select a coach and define their role for this session."
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className="flex flex-col gap-6">
        {/* Coach and Role */}
        <div className="flex flex-col gap-4">
          <CoachDropdown
            label="Coach"
            required
            options={coaches}
            onChange={(value) => {}}
            selectedOption=""
            placeholder="Choose Coach"
          />
          <Dropdown
            label="Role"
            required
            options={roles}
            onChange={(value) => {}}
            selectedOption=""
            placeholder="Choose Role"
          />
        </div>

        {/* Assign Coach Button */}
        <Button>Assign Coach</Button>
      </div>
    </FilterDrawer>
  );
}
