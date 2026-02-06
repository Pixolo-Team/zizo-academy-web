"use client";

// REACT //
import { useState } from "react";

// COMPONENTS //
import { Input } from "@/components/ui/input";
import PageHeader from "@/app/components/layout/Header";
import { Button } from "@/components/ui/button";
import CopyPaste from "@/components/icons/neevo-icons/CopyPaste";

// OTHERS //
import { toast } from "sonner";

// Defining the type
type AddVenueInputData = {
  venueName: string;
  address: string;
  area: string;
  googleMapsLink: string;
};

type AddVenueErrors = Partial<Record<keyof AddVenueInputData, string>>;

const AddVenuePage = () => {
  // Define States
  const [addVenueInputs, setAddVenueInputs] = useState<AddVenueInputData>({
    venueName: "",
    address: "",
    area: "",
    googleMapsLink: "",
  });

  const [errors, setErrors] = useState<AddVenueErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Clear error message for the field being edited
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /** Handles form validation */
  const validateForm = () => {
    const newErrors: AddVenueErrors = {};
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

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const response = await addVenueRequest(addVenueInputs);

      if (response.status) {
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
        toast.error("Couldn't add venue");
      }
    } catch (error) {
      console.error("Error adding venue:", error);
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 px-5 pb-5 bg-n-50">
      {/* Page Header */}
      <PageHeader text="Add Venue" />
      {/* Add Venue Form */}
      <form
        className="flex flex-col gap-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex flex-col gap-4">
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
          <Input
            type="text"
            placeholder="Paste maps link"
            required
            label="Google Maps Link"
            rightIcon={CopyPaste}
            error={errors.googleMapsLink}
            onChange={handleInputChange}
            name="googleMapsLink"
            value={addVenueInputs.googleMapsLink}
          />
        </div>
        <Button type="button" disabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? "Creating Venue..." : "Create Venue"}
        </Button>
      </form>
    </div>
  );
};

export default AddVenuePage;
