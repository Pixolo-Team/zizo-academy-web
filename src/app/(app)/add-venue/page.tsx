"use client";

// REACT //
import React, { useState } from "react";

// COMPONENTS //
import { Input } from "@/components/ui/input";
import PageHeader from "@/app/components/layout/Header";
import { Button } from "@/components/ui/button";
import CopyPaste from "@/components/icons/neevo-icons/CopyPaste";
import { toast } from "sonner";

// Defining the type
type AddVenueInputData = {
  venueName: string;
  address: string;
  area: string;
  googleMapsLink: string;
};

type AddVenueErrorsData = Partial<Record<keyof AddVenueInputData, string>>;

const AddVenuePage = () => {
  // Define States
  const [addVenueInputs, setAddVenueInputs] = useState<AddVenueInputData>({
    venueName: "",
    address: "",
    area: "",
    googleMapsLink: "",
  });

  // Holds validation error messages for each input field
  const [errors, setErrors] = useState<AddVenueErrorsData>({});

  //  Checks API Submission state to prevent duplicate requests
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Handles input changes for the form fields */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Extract name and value from the event target
    const { name, value } = e.target;
    // Update the corresponding field in state
    setAddVenueInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error message for the field being edited
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /** Handles form validation */
  const validateForm = () => {
    const newErrors: AddVenueErrorsData = {};
    let isValid = true;

    // Validate Venue Name
    if (!addVenueInputs.venueName.trim()) {
      newErrors.venueName = "Venue Name is required";
      isValid = false;
    }

    // Validate Address
    if (!addVenueInputs.address.trim()) {
      newErrors.address = "Full address is required";
      isValid = false;
    }

    // Validate Area
    if (!addVenueInputs.area.trim()) {
      newErrors.area = "Area is required";
      isValid = false;
    }

    // Validate Link
    if (!addVenueInputs.googleMapsLink.trim()) {
      newErrors.googleMapsLink = "Google maps link is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  /** Handles form submission */
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    // Validate form before submission
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      // Make API call
      // const response = await addVenueRequest(addVenueInputs);
      // Remove this after API integration
      const response = {
        status: true,
      };

      if (response.status) {
        // Show toast and reset form
        toast.success("Venue added");

        // Reset form
        setAddVenueInputs({
          venueName: "",
          address: "",
          area: "",
          googleMapsLink: "",
        });

        setErrors({});
      } else {
        // Handle API error and show toast
        toast.error("Couldn't add venue");
      }
    } catch (error) {
      console.error("Error adding venue:", error);
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /** Paste Google Maps Link */
  const handlePasteGoogleMapsLink = async () => {
    try {
      // Read text from clipboard
      const text = await navigator.clipboard.readText();
      // Update the googleMapsLink field
      setAddVenueInputs((prev) => ({
        ...prev,
        googleMapsLink: text,
      }));
    } catch (error) {
      console.error("Error pasting Google Maps link:", error);
      toast.error("Failed to paste Google Maps link");
    }
  };

  return (
    <div className="flex flex-col gap-6 px-5 pb-5 bg-n-50 min-h-screen">
      {/* Page Header */}
      <PageHeader text="Add Venue" />
      {/* Add Venue Form */}
      <form
        className="flex flex-col gap-6"
        onSubmit={(event) => {
          handleSubmit();
          event.preventDefault();
        }}
      >
        <div className="flex flex-col gap-4">
          {/* Venue Name */}
          <Input
            type="text"
            placeholder="Venue name"
            required
            label="Venue Name"
            error={errors.venueName}
            onChange={handleInputChange}
            name="venueName"
            value={addVenueInputs.venueName}
          />

          {/* Full Address Input */}
          <Input
            type="text"
            placeholder="Full address"
            required
            label="Full Address"
            error={errors.address}
            onChange={handleInputChange}
            name="address"
            value={addVenueInputs.address}
          />

          {/* Area / Locality Name Input */}
          <Input
            type="text"
            placeholder="Area/Locality Name"
            required
            label="Area/Locality Name"
            error={errors.area}
            onChange={handleInputChange}
            name="area"
            value={addVenueInputs.area}
          />

          {/* Google Maps Link Input */}
          <Input
            type="text"
            placeholder="Paste maps link"
            required
            label="Google Maps Link"
            rightIcon={CopyPaste}
            onRightIconClick={handlePasteGoogleMapsLink}
            error={errors.googleMapsLink}
            onChange={handleInputChange}
            name="googleMapsLink"
            value={addVenueInputs.googleMapsLink}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating Venue..." : "Create Venue"}
        </Button>
      </form>
    </div>
  );
};

export default AddVenuePage;
