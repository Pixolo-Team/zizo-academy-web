import { useState } from "react";
import FilterDrawer from "@/components/FilterDrawer";
import Dropdown from "../Dropdown";
import { Button } from "../button";
import CoachDropdown from "./CoachDropdown";

interface Coach {
  coach: string;
  role: string;
}

/**
 * Drawer component for assigning a coach and their role to a session
 */
export default function AddCoachDrawer({
  isOpen,
  onOpenChange,
  coaches,
  roles,
  onAssignCoach,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  coaches: { label: string; value: string }[];
  roles: { label: string; value: string }[];
  onAssignCoach: (coach: Coach) => void;
}) {
  // State to hold selected coach and role values
  const [coach, setCoach] = useState({
    coach: "",
    role: "",
  });

  /**
   * Handles the assignment of coach and role
   * Finds the labels from values, passes to parent, resets form and closes drawer
   */
  const handleAssignCoach = () => {
    // Only proceed if both coach and role are selected
    if (coach.coach && coach.role) {
      // Find the label for the selected coach value
      const coachLabel =
        coaches.find((c) => c.value === coach.coach)?.label || "";
      // Find the label for the selected role value
      const roleLabel = roles.find((r) => r.value === coach.role)?.label || "";

      // Send the coach data to parent component
      onAssignCoach({
        coach: coachLabel,
        role: roleLabel,
      });

      // Reset the form to initial state
      setCoach({ coach: "", role: "" });
      // Close the drawer
      onOpenChange(false);
    }
  };

  return (
    <FilterDrawer
      title="Assign Coach for Session"
      description="Select a coach and define their role for this session."
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className="flex flex-col gap-6">
        {/* Coach and Role Selection */}
        <div className="flex flex-col gap-4">
          {/* Coach Dropdown */}
          <CoachDropdown
            label="Coach"
            required
            options={coaches}
            onChange={(value) =>
              setCoach((prev) => ({ ...prev, coach: value }))
            }
            selectedOption={coach.coach}
            placeholder="Choose Coach"
          />
          {/* Role Dropdown */}
          <Dropdown
            label="Role"
            required
            options={roles}
            onChange={(value) => setCoach((prev) => ({ ...prev, role: value }))}
            selectedOption={coach.role}
            placeholder="Choose Role"
          />
        </div>

        {/* Assign Coach Button - Disabled if coach or role not selected */}
        <Button
          onClick={handleAssignCoach}
          disabled={!coach.coach || !coach.role}
        >
          Assign Coach
        </Button>
      </div>
    </FilterDrawer>
  );
}
