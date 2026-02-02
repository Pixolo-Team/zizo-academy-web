"use client";

// REACT //
import { useState } from "react";

// COMPONENTS //
import PageHeader from "@/app/components/layout/Header";
import { Input } from "@/components/ui/input";

// API SERVICES //
import {
  AddCoachInputData,
  addCoachRequest,
} from "@/services/api/coach.api.service";

// UTILS //
import { validateEmail, validatePhoneNumber } from "@/utils/validation";

// OTHERS //
import { toast } from "sonner";
import ImageUpload from "@/components/ui/ImageUpload";
import { Button } from "@/components/ui/button";

const AddCoachPage = () => {
  // Define States
  const [addCoachInputs, setAddCoachInputs] = useState<AddCoachInputData>({
    name: "",
    email: "",
    phone: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Define Helper Functions
  /** Handles input changes for the form fields */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    // Update the corresponding field in state
    setAddCoachInputs((prev) => ({ ...prev, [name]: value }));
    // Clear error message for the field being edited
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /** Validates the form inputs */
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate Name
    if (!addCoachInputs.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Validate Email
    if (!addCoachInputs.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(addCoachInputs.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    // Validate Phone
    if (!addCoachInputs.phone.trim()) {
      newErrors.phone = "Phone is required";
      isValid = false;
    } else if (!validatePhoneNumber(addCoachInputs.phone)) {
      newErrors.phone = "Phone Number is invalid";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  /** Handles form submission */
  const handleSubmit = () => {
    // Validate the form inputs
    if (validateForm()) {
      // Make API call to submit the form
      addCoachRequest(addCoachInputs)
        .then((response) => {
          if (response.status) {
            // Show success toast and reset form
            toast.success("Coach added successfully!");
            setAddCoachInputs({ name: "", email: "", phone: "", imageUrl: "" });
          } else {
            // Show error toast
            toast.error("Failed to add coach. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error adding coach:", error);
          toast.error("An error occurred. Please try again later.");
        });
    }
  };

  return (
    <div className="flex flex-col gap-6 px-5 pb-6 min-h-screen relative">
      {/* Page Header */}
      <PageHeader text="Add Coach" />
      {/* Main Content */}
      <div className="container w-full flex flex-col gap-6 sm:gap-8">
        {/* Input */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Coach Image */}
          <div className="self-center">
            <ImageUpload
              onImageCropped={(base64Image) => {
                setAddCoachInputs((prev) => ({
                  ...prev,
                  imageUrl: base64Image,
                }));
              }}
              imageUrl={addCoachInputs.imageUrl}
            />
          </div>
          {/* Input Fields */}
          <Input
            type="text"
            placeholder="Enter your name"
            required
            label="Full Name"
            error={errors.name}
            name="name"
            value={addCoachInputs.name}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            placeholder="Enter your email"
            required
            label="Email"
            error={errors.email}
            name="email"
            value={addCoachInputs.email}
            onChange={handleInputChange}
          />
          <Input
            type="tel"
            placeholder="+91"
            required
            label="Phone Number"
            error={errors.phone}
            name="phone"
            value={addCoachInputs.phone}
            onChange={handleInputChange}
          />
        </div>
        <Button onClick={handleSubmit}>Add Coach</Button>
      </div>
    </div>
  );
};
export default AddCoachPage;
