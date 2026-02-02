"use client";

// REACT //
import { useState } from "react";

// COMPONENTS //
import PageHeader from "@/app/components/layout/Header";
import { Input } from "@/components/ui/input";

// API SERVICES //
import {
  ReachOutInputData,
  reachOutRequest,
} from "@/services/api/authentication.api.service";

// UTILS //
import { validateEmail } from "@/utils/validation";

// OTHERS //
import { toast } from "sonner";

const ReachUsPage = () => {
  // Define States
  const [reachUsInputs, setReachUsInputs] = useState<ReachOutInputData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Define Helper Functions
  /** Handles input changes for the form fields */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // Extract name and value from the event target
    const { name, value } = e.target;
    // Update the corresponding field in state
    setReachUsInputs((prev) => ({
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
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    // Validate Name
    if (!reachUsInputs.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Validate Email
    if (!reachUsInputs.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(reachUsInputs.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    // Validate Message
    if (!reachUsInputs.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  /** Handles form submission */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form before submission
    if (validateForm()) {
      // Make API call
      reachOutRequest(reachUsInputs)
        .then((response) => {
          if (response.status) {
            // Show toast and reset form
            setReachUsInputs({ name: "", email: "", message: "" });
            toast.success("Your message has been sent successfully!");
          } else {
            // Handle API error and show toast
            toast.error("Failed to send your message. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error sending reach out request:", error);
          toast.error("An error occurred. Please try again later.");
        });
    }
  };

  // Define Use Effects

  return (
    <div className="flex flex-col gap-6 px-5 pb-6 min-h-screen relative">
      {/* Page Header */}
      <PageHeader text="Reach Out" />
      {/* Main Content */}
      <div className="container flex flex-col gap-20 sm:gap-24">
        {/* Example Input */}
        <Input
          type="text"
          placeholder="Your Name"
          required
          label="Name"
          error={errors.name}
          onChange={handleInputChange}
          name="name"
          value={reachUsInputs.name}
        />
      </div>
    </div>
  );
};
export default ReachUsPage;
