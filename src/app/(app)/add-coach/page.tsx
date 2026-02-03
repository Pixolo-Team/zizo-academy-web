"use client";

// REACT //
import { useState } from "react";

// COMPONENTS //
import PageHeader from "@/app/components/layout/Header";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui/ImageUpload";
import { Button } from "@/components/ui/button";

// API SERVICES //
import {
  AddCoachInputData,
  addCoachRequest,
} from "@/services/api/coach.api.service";

// UTILS //
import { validateEmail, validatePhoneNumber } from "@/utils/validation";

// OTHERS //
import { toast } from "sonner";

const AddCoachPage = () => {
  // Define States
  const [addCoachInputs, setAddCoachInputs] = useState<AddCoachInputData>({
    name: "",
    email: "",
    phone: "",
    imageUrl: "/images/defaults/default-coach.png",
  });
  const [errors, setErrors] = useState<Record<keyof AddCoachInputData, string>>(
    {
      name: "",
      email: "",
      phone: "",
      imageUrl: "",
    },
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Define Helper Functions
  // Check if all form fields are filled
  const isFormValid =
    Object.values(errors).every((error) => !error) &&
    Object.values(addCoachInputs).every((value) => value.trim() !== "");

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
    } else if (/\d/.test(addCoachInputs.name)) {
      newErrors.name = "Name cannot contain numbers";
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
    // Update error state to show validation messages
    setErrors(newErrors);
    return isValid;
  };

  /** Handles form submission */
  const handleSubmit = () => {
    setIsSubmitting(true);
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
        })
        .finally(() => {
          setIsSubmitting(false);
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
          {/* Name */}
          <Input
            type="text"
            placeholder="Your name"
            required
            label="Full Name"
            error={errors.name}
            name="name"
            value={addCoachInputs.name}
            onChange={handleInputChange}
          />

          {/* Email */}
          <Input
            type="text"
            placeholder="Your email"
            required
            label="Email"
            error={errors.email}
            name="email"
            value={addCoachInputs.email}
            onChange={handleInputChange}
          />

          {/* Phone number */}
          <Input
            type="tel"
            placeholder=""
            required
            label="Phone Number"
            error={errors.phone}
            name="phone"
            value={addCoachInputs.phone}
            onChange={handleInputChange}
            prefix="+91"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={10}
          />
        </div>

        {/* Add Coach Button  */}
        <Button onClick={handleSubmit} disabled={!isFormValid || isSubmitting}>
          {isSubmitting ? "Adding Coach..." : "Add Coach"}
        </Button>
      </div>
    </div>
  );
};
export default AddCoachPage;
