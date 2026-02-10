"use client";
// REACT //
import React, { useState } from "react";

// COMPONENTS //
import PageHeader from "@/app/components/layout/Header";
import { DatePicker } from "@/components/ui/DatePicker";
import TimePicker from "@/components/ui/TimePicker";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/ui/Dropdown";
import Image from "next/image";
import Add1 from "@/components/icons/neevo-icons/Add1";
import { Button } from "@/components/ui/button";
import AddCoachDrawer from "@/components/ui/coach/AddCoachDrawer";
import SelectableButtonGroup from "@/components/ui/SelectButtonGroup";
import DeleteBottomDrawer from "@/components/ui/DeleteBottomDrawer";

// Dummy Batches
const dummyBatches = [
  {
    batch_name: "Under 12",
    batch_id: "batch-1",
  },
  {
    batch_name: "Under 14",
    batch_id: "batch-2",
  },
];

interface Coach {
  coach: string;
  role: string;
}

interface Batch {
  batch_name: string;
  batch_id: string;
}

/**
 * Form component for creating a new session
 * Handles session details including name, date, time, venue, batches, and coaches
 */
export default function AddSessions() {
  // State to hold all session input values
  const [addSessionInputs, setAddSessionInputs] = useState({
    session_name: "",
    date: "",
    from_time: "",
    to_time: "",
    reporting_time: "",
    batches: [] as Batch[],
    venue: "",
    coaches: [] as Coach[],
  });

  // State to hold validation errors for each field
  const [errors, setErrors] = useState({
    session_name: "",
    date: "",
    time: "",
    reporting_time: "",
    venue: "",
    coaches: "",
    batches: "",
  });
  const [selectedCoachIndex, setSelectedCoachIndex] = useState<number | null>(
    null,
  );

  // State to control the visibility of the add coach drawer
  const [isAddCoachDrawerOpen, setIsAddCoachDrawerOpen] =
    useState<boolean>(false);
  const [isDeleteBottomDrawerOpen, setIsDeleteBottomDrawerOpen] =
    useState<boolean>(false);

  /**
   * Handles adding a new coach to the session
   */
  const handleAssignCoach = (newCoach: Coach) => {
    setAddSessionInputs((prev) => ({
      ...prev,
      coaches: [...prev.coaches, newCoach],
    }));
    // Remove Error
    if (errors.coaches !== "") {
      setErrors((prev) => ({ ...prev, coaches: "" }));
    }
  };

  /**
   * Handles removing a coach from the session
   */
  const handleRemoveCoach = (index: number) => {
    setAddSessionInputs((prev) => ({
      ...prev,
      coaches: prev.coaches.filter((_, i) => i !== index),
    }));
    // Remove Error
    if (errors.coaches !== "") {
      setErrors((prev) => ({ ...prev, coaches: "" }));
    }
  };

  /**
   * Handles deleting a coach from the session
   */
  const handleDeleteSession = () => {
    if (selectedCoachIndex === null) return;
    // Remove Error
    handleRemoveCoach(selectedCoachIndex);
    // Close Drawer
    setIsDeleteBottomDrawerOpen(false);
    // Reset Selected Coach Index
    setSelectedCoachIndex(null);
    // Remove Error
    if (errors.coaches !== "") {
      setErrors((prev) => ({ ...prev, coaches: "" }));
    }
  };

  /**
   * Validates all form fields
   * Returns true if all validations pass, false otherwise
   */
  const validateForm = (): boolean => {
    const newErrors = {
      session_name: "",
      date: "",
      time: "",
      reporting_time: "",
      venue: "",
      coaches: "",
      batches: "",
    };

    let isValid = true;

    // Session Name validation
    if (!addSessionInputs.session_name.trim()) {
      newErrors.session_name = "Session name is required";
      isValid = false;
    }

    // Batches validation
    if (addSessionInputs.batches.length === 0) {
      newErrors.batches = "Please select at least one batch";
      isValid = false;
    }

    // Date validation
    if (!addSessionInputs.date) {
      newErrors.date = "Date is required";
      isValid = false;
    }

    // Time validation
    if (!addSessionInputs.from_time || !addSessionInputs.to_time) {
      newErrors.time = "Both from and to time are required";
      isValid = false;
    } else if (addSessionInputs.from_time >= addSessionInputs.to_time) {
      newErrors.time = "To time must be after from time";
      isValid = false;
    }

    // Reporting Time validation
    if (!addSessionInputs.reporting_time) {
      newErrors.reporting_time = "Reporting time is required";
      isValid = false;
    }

    // Venue validation
    if (!addSessionInputs.venue) {
      newErrors.venue = "Venue is required";
      isValid = false;
    }

    // Coaches validation
    if (addSessionInputs.coaches.length === 0) {
      newErrors.coaches = "Please add at least one coach";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handles the creation of a new session
   * Validates form, creates session, and resets form
   */
  const handleCreateSession = () => {
    if (validateForm()) {
      // Create session logic here
      console.log("Session created:", addSessionInputs);
      // Reset form
      setAddSessionInputs({
        session_name: "",
        date: "",
        from_time: "",
        to_time: "",
        reporting_time: "",
        venue: "",
        coaches: [],
        batches: [],
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 px-5 bg-n-50 min-h-screen pb-5">
      <PageHeader text="Add Session" />

      <div className="flex gap-6 flex-col">
        {/* Session Details */}
        <div className="flex flex-col gap-4">
          {/* Session Name */}
          <Input
            label="Session Name"
            required
            error={errors.session_name}
            value={addSessionInputs.session_name}
            onChange={(e) => {
              setAddSessionInputs((prev) => ({
                ...prev,
                session_name: e.target.value,
              }));
              // Remove Error
              if (errors.session_name !== "") {
                setErrors((prev) => ({ ...prev, session_name: "" }));
              }
            }}
            placeholder="Enter Session Name"
            className=""
          />

          {/* Batches */}
          <div className="flex flex-col gap-1.5">
            <div className="relative flex">
              <label className="text-sm text-n-700">
                Batches
                <span className="absolute top-0 ml-0.5 text-red-500">*</span>
              </label>
            </div>
            <div className="flex flex-col gap-0.5">
              {/* Selectable Button Group */}
              <SelectableButtonGroup
                items={dummyBatches}
                selectedItems={addSessionInputs.batches}
                onSelectionChange={(batches) => {
                  setAddSessionInputs((prev) => ({ ...prev, batches }));
                  // Remove Error
                  if (errors.batches !== "") {
                    setErrors((prev) => ({ ...prev, batches: "" }));
                  }
                }}
                selectMultiple={true}
                labelKey="batch_name"
                idKey="batch_id"
              />
              {errors.batches && (
                <span className="text-xs text-red-500">{errors.batches}</span>
              )}
            </div>
          </div>

          {/* From Date */}
          <DatePicker
            label="Date"
            required
            error={errors.date}
            value={addSessionInputs.date}
            onChange={(date) => {
              setAddSessionInputs((prev) => ({ ...prev, date }));
              // Remove Error
              if (errors.date !== "") {
                setErrors((prev) => ({ ...prev, date: "" }));
              }
            }}
            placeholder="Select Date"
            className=""
          />

          {/* Time */}
          <div className="flex flex-col gap-1.5">
            <div className="relative flex">
              <label className="text-sm text-n-700">
                Time
                <span className="absolute top-0 ml-0.5 text-red-500">*</span>
              </label>
            </div>
            {/* Time Picker */}
            <div className="flex flex-col gap-0.5">
              <div className="grid grid-cols-2">
                {/* From Time */}
                <TimePicker
                  required
                  value={addSessionInputs.from_time}
                  onChange={(time) => {
                    setAddSessionInputs((prev) => ({
                      ...prev,
                      from_time: time,
                    }));
                  }}
                  placeholder="From"
                  className="rounded-l-full rounded-r-none"
                />
                {/* To Time */}
                <TimePicker
                  required
                  value={addSessionInputs.to_time}
                  onChange={(time) => {
                    setAddSessionInputs((prev) => ({ ...prev, to_time: time }));
                    // Remove Error
                    if (errors.time !== "") {
                      setErrors((prev) => ({ ...prev, time: "" }));
                    }
                  }}
                  placeholder="To"
                  className="rounded-r-full rounded-l-none border-l-0"
                />
              </div>
              {errors.time && (
                <span className="text-xs text-red-500">{errors.time}</span>
              )}
            </div>
          </div>

          {/* Reporting Time */}
          <TimePicker
            label="Reporting Time"
            required
            value={addSessionInputs.reporting_time}
            onChange={(time) => {
              setAddSessionInputs((prev) => ({
                ...prev,
                reporting_time: time,
              }));
              // Remove Error
              if (errors.reporting_time !== "") {
                setErrors((prev) => ({ ...prev, reporting_time: "" }));
              }
            }}
            error={errors.reporting_time}
            placeholder="Reporting Time"
          />

          {/* Venue */}
          <Dropdown
            label="Venue"
            required
            error={errors.venue}
            options={[
              { label: "Venue 1", value: "venue-1" },
              { label: "Venue 2", value: "venue-2" },
              { label: "Venue 3", value: "venue-3" },
            ]}
            onChange={(value) => {
              setAddSessionInputs((prev) => ({ ...prev, venue: value }));
              // Remove Error
              if (errors.venue !== "") {
                setErrors((prev) => ({ ...prev, venue: "" }));
              }
            }}
            selectedOption={addSessionInputs.venue}
            placeholder="Choose Venue"
          />

          {/* Coaches */}
          <div className="flex flex-col gap-1.5">
            <div className="relative flex">
              <label className="text-sm text-n-700">
                Coaches
                <span className="absolute top-0 ml-0.5 text-red-500">*</span>
              </label>
            </div>
            <div className="flex flex-col gap-4">
              {/* Coaches */}
              {addSessionInputs.coaches.length > 0 &&
                addSessionInputs.coaches.map((coach, index) => (
                  <div
                    className="p-3 flex justify-between items-center border border-n-200 rounded-[32px]"
                    key={index}
                  >
                    <div className="flex items-center gap-3">
                      <div className="overflow-hidden">
                        <Image
                          src="/images/defaults/default-player.png"
                          alt="coach"
                          width={40}
                          height={40}
                          className="rounded-full border-n-200 border"
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className=" text-n-900">{coach.coach}</p>
                        <p className="text-xs text-n-500">{coach.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCoachIndex(index);
                        setIsDeleteBottomDrawerOpen(true);
                      }}
                      className="bg-n-100 size-7 rounded-full flex justify-center items-center"
                    >
                      <Add1
                        primaryColor="var(--color-n-600)"
                        className="size-3 rotate-45"
                      />
                    </button>
                  </div>
                ))}

              {/* Error */}
              {errors.coaches && (
                <span className="text-xs text-red-500">{errors.coaches}</span>
              )}

              {/* Add Coach & Role */}
              <Button
                onClick={() => setIsAddCoachDrawerOpen(true)}
                variant="outline"
                className="border-n-800 rounded-full text-sm text-n-800 font-medium px-5 h-[42px] w-fit m-auto"
              >
                Add Coach & Role
                <Add1 primaryColor="var(--color-n-800)" className="size-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Add Session Button */}
        <Button onClick={handleCreateSession}>Create Session</Button>
      </div>

      {/* Add Coach Drawer */}
      <AddCoachDrawer
        isOpen={isAddCoachDrawerOpen}
        onOpenChange={setIsAddCoachDrawerOpen}
        coaches={[
          { label: "Coach 1", value: "coach-1" },
          { label: "Coach 2", value: "coach-2" },
          { label: "Coach 3", value: "coach-3" },
        ]}
        roles={[
          { label: "Role 1", value: "role-1" },
          { label: "Role 2", value: "role-2" },
          { label: "Role 3", value: "role-3" },
        ]}
        onAssignCoach={handleAssignCoach}
      />

      {/* Delete Bottom Drawer */}
      {selectedCoachIndex !== null && (
        <DeleteBottomDrawer
          isOpen={isDeleteBottomDrawerOpen}
          onOpenChange={setIsDeleteBottomDrawerOpen}
          onDelete={() => handleDeleteSession()}
          coachDetails={addSessionInputs.coaches[selectedCoachIndex]}
        />
      )}
    </div>
  );
}
