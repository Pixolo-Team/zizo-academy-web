"use client";

// REACT //
import { useState } from "react";

// COMPONENTS //
import { Input } from "@/components/ui/input";
import PageHeader from "@/app/components/layout/Header";
import { Button } from "@/components/ui/button";
import CopyPaste from "@/components/icons/neevo-icons/CopyPaste";

const AddVenuePage = () => {
  // Defining the type
  type AddVenueInputData = {
    venueName: string;
    address: string;
    area: string;
    googleMapsLink: string;
  };
  // Define States
  const [addVenueInputs, setAddVenueInputs] = useState<AddVenueInputData>({
    venueName: "",
    address: "",
    area: "",
    googleMapsLink: "",
  });

  /** Handles input changes for the form fields */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // Extract name and value from the event target
    const { name, value } = e.target;
    // Update the corresponding field in state
    setAddVenueInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-6 px-5 pb-5 bg-n-50">
      {/* Page Header */}
      <PageHeader text="Add Venue" />
      {/* Add Venue Form */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Venue name"
            required
            label="Venue Name"
            // error={errors.venueName}
            onChange={handleInputChange}
            name="venueName"
            value={addVenueInputs.venueName}
          />
          <Input
            type="text"
            placeholder="Full address"
            required
            label="Full Address"
            // error={errors.address}
            onChange={handleInputChange}
            name="address"
            value={addVenueInputs.address}
          />
          <Input
            type="text"
            placeholder="Area/Locality Name"
            required
            label="Area/Locality Name"
            // error={errors.area}
            onChange={handleInputChange}
            name="area"
            value={addVenueInputs.area}
          />
          <Input
            type="text"
            placeholder="Paste maps link"
            required
            label="Google Maps Link"
            rightIcon={CopyPaste}
            // error={errors.googleMapsLink}
            onChange={handleInputChange}
            name="area"
            value={addVenueInputs.area}
          />
        </div>
        <Button type="button">Create Venue</Button>
      </div>
    </div>
  );
};

export default AddVenuePage;
