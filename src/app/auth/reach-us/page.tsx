"use client";

// REACT //
import { useState } from "react";

// COMPONENTS //
import PageHeader from "@/app/components/layout/Header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// API SERVICES //
import {
  ReachOutInputData,
  reachOutRequest,
} from "@/services/api/authentication.api.service";

// UTILS //
import { validatePhoneNumber } from "@/utils/validation";

// OTHERS //
import { toast } from "sonner";

const ReachUsPage = () => {
  // Define States
  const [reachUsInputs, setReachUsInputs] = useState<ReachOutInputData>({
    name: "",
    phoneNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phoneNumber: "",
    message: "",
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

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

    setIsSubmitDisabled(false);
  };

  /** Handles form validation */
  const validateForm = () => {
    const newErrors = { name: "", phoneNumber: "", message: "" };
    let isValid = true;

    // Validate Name
    if (!reachUsInputs.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Validate Phone Number
    if (!reachUsInputs.phoneNumber.trim()) {
      newErrors.phoneNumber = "Mobile number is required";
      isValid = false;
    } else if (!validatePhoneNumber(reachUsInputs.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid mobile number";
      isValid = false;
    }

    // Validate Message
    if (!reachUsInputs.message.trim()) {
      newErrors.message = "Please describe the issue";
      isValid = false;
    }
    setErrors(newErrors);

    setIsSubmitDisabled(!isValid);

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
            setReachUsInputs({ name: "", phoneNumber: "", message: "" });
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
    <div className="flex flex-col bg-n-50 gap-10 px-5 min-h-screen relative">
      {/* Page Header */}
      <PageHeader text="Reach Out" />
      {/* Main Content */}
      <div className="flex flex-col gap-8">
        {/* Need Help Header*/}
        <div className="flex flex-col gap-1.5">
          <p className="text-2xl font-bold leading-5 text-n-900">Need help?</p>
          <p className="text-lg font-normal leading-none text-n-500">
            Tell us what went wrong
          </p>
        </div>
        {/* Need help form */}
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {/* Name Input */}
            <Input
              type="text"
              placeholder="Enter your name"
              required
              label="Your Name"
              error={errors.name}
              onChange={handleInputChange}
              name="name"
              value={reachUsInputs.name}
            />
            <Input
              type="text"
              placeholder="Enter your Phone Number"
              required
              label="Phone Number"
              error={errors.phoneNumber}
              onChange={handleInputChange}
              name="phoneNumber"
              value={reachUsInputs.phoneNumber}
            />
            <Textarea
              placeholder="Briefly describe the issue you’re facing"
              required
              label="Problem Faced"
              error={errors.message}
              onChange={handleInputChange}
              name="message"
              value={reachUsInputs.message}
            />
          </div>
          {/* Raise Request Button */}
          <Button
            variant="secondary"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className="h-[52px] w-full rounded-full py-4 px-6 gap-4 bg-n-900 text-base font-medium leading-none text-n-50 hover:bg-n-850 hover:scale-102 ease-in-out transition-all"
          >
            Raise Request
          </Button>
        </form>
      </div>
    </div>
  );
};
export default ReachUsPage;
