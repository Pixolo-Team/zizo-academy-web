"use client";

// REACT //
import { useState } from "react";

// COMPONENTS //
import PageHeader from "@/app/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Dropdown from "@/components/ui/Dropdown";

const CreateBatch = () => {
  // Define States
  const [createBatchInputs, setcreateBatchInputs] = useState({
    batchName: "",
    primaryCoach: "",
  });
  const [errors, setErrors] = useState({
    batchName: "",
    primaryCoach: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Define Helper Functions

  /** Handles input changes for the form fields */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    // Update the corresponding field in state
    setcreateBatchInputs((prev) => ({ ...prev, [name]: value }));
    // Clear error message for the field being edited
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /** Validates the form inputs */
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate Batch Name
    if (!createBatchInputs.batchName.trim()) {
      newErrors.batchName = "Batch name is required";
      isValid = false;
    }
    // Validate Primary Coach
    if (!createBatchInputs.primaryCoach.trim()) {
      newErrors.primaryCoach = "Select coach";
      isValid = false;
    }
    // Update error state to show validation messages
    setErrors(newErrors);
    return isValid;
  };

  /** Handles form submission */
  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-6 px-5">
      <PageHeader text="Create batch" />
      {/* Create batch form */}
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          {/* Input Fields */}
          {/* Batch Name */}
          <Input
            type="text"
            placeholder="Batch name"
            required
            label="Batch Name"
            error={errors.batchName}
            name="batchName"
            value={createBatchInputs.batchName}
            onChange={handleInputChange}
          />
          <Dropdown
            title=""
            options={["Coach A", "Coach B", "Coach C"]}
            onChange={(value) => {
              setcreateBatchInputs((prev) => ({
                ...prev,
                primaryCoach: value,
              }));
              setErrors((prev) => ({ ...prev, primaryCoach: "" }));
            }}
            selectedOption={createBatchInputs.primaryCoach}
            label="Select Option"
            required
            error={errors.primaryCoach}
            placeholder="Choose Coach"
          />
        </div>
        {/* Create Batch Button */}
        <Button type="button" onClick={handleSubmit}>
          {isSubmitting ? "Creating Batch..." : "Create Batch"}
        </Button>
      </form>
    </div>
  );
};
export default CreateBatch;
