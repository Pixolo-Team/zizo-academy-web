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

// DUmmy Batches
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

export default function AddSessions() {
  const [addSessionInputs, setAddSessionInputs] = useState({
    session_name: "",
    date: "",
    from_time: "",
    to_time: "",
    reporting_time: "",
    batches: [
      {
        batch_name: "Batch 1",
        batch_id: "batch-1",
      },
    ],
    venue: "",
    coaches: [
      {
        coach: "Dipesh Suvarna",
        role: "Head Coach",
      },
    ],
  });

  const [errors, setErrors] = useState({
    session_name: "",
    date: "",
    time: "",
    reporting_time: "",
    venue: "",
    coaches: "",
    batches: "",
  });

  const [isAddCoachDrawerOpen, setIsAddCoachDrawerOpen] =
    useState<boolean>(false);

  return (
    <div className="flex flex-col gap-6 px-5 bg-n-50 min-h-screen pb-5">
      <PageHeader text="Add Session" />

      <div className="flex gap-6 flex-col">
        <div className="flex flex-col gap-4">
          {/* Session Name */}
          <Input
            label="Session Name"
            required
            error={errors.session_name}
            value={addSessionInputs.session_name}
            onChange={(e) =>
              setAddSessionInputs((prev) => ({
                ...prev,
                session_name: e.target.value,
              }))
            }
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
            <div className="flex items-center gap-1.5">
              {dummyBatches &&
                dummyBatches.map((batch, index) => (
                  <button
                    className={`py-3 px-4 rounded-4xl bg-n-50 border border-n-200  ${
                      addSessionInputs.batches.includes(batch)
                        ? "bg-n-900 text-n-50"
                        : "bg-n-50 text-n-950"
                    }`}
                    onClick={() =>
                      setAddSessionInputs((prev) => ({
                        ...prev,
                        batches: [...prev.batches, batch],
                      }))
                    }
                    key={index}
                  >
                    {batch.batch_name}
                  </button>
                ))}
            </div>
          </div>

          {/* From Date */}
          <DatePicker
            label="Date"
            required
            error={errors.date}
            value={addSessionInputs.date}
            onChange={(date) =>
              setAddSessionInputs((prev) => ({ ...prev, date }))
            }
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
            <div className="flex flex-col gap-0.5">
              <div className="grid grid-cols-2">
                <TimePicker
                  required
                  value={addSessionInputs.from_time}
                  onChange={(time) =>
                    setAddSessionInputs((prev) => ({
                      ...prev,
                      from_time: time,
                    }))
                  }
                  placeholder="From"
                  className="rounded-l-full rounded-r-none"
                />

                <TimePicker
                  required
                  value={addSessionInputs.to_time}
                  onChange={(time) =>
                    setAddSessionInputs((prev) => ({ ...prev, to_time: time }))
                  }
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
            onChange={(time) =>
              setAddSessionInputs((prev) => ({
                ...prev,
                reporting_time: time,
              }))
            }
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
            onChange={(value) =>
              setAddSessionInputs((prev) => ({ ...prev, venue: value }))
            }
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
              {addSessionInputs.coaches.map((coach, index) => (
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
                  <div className="bg-n-100 size-7 rounded-full flex justify-center items-center">
                    <Add1
                      primaryColor="var(--color-n-600)"
                      className="size-3 rotate-45"
                    />
                  </div>
                </div>
              ))}

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
        <Button>Create Session</Button>
      </div>

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
      />
    </div>
  );
}
