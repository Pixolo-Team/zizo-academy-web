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

export default function AddSessions() {
  const [addSessionInputs, setAddSessionInputs] = useState({
    session_name: "",
    date: "",
    from_time: "",
    to_time: "",
    reporting_time: "",
    venue: "",
    coaches: [
      {
        coach: "",
        role: "",
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
  });
  return (
    <div className="flex flex-col gap-6 px-5 bg-n-50 min-h-screen">
      <PageHeader text="Add Session" />

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
                  setAddSessionInputs((prev) => ({ ...prev, from_time: time }))
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
        <div className="flex items-center gap-1.5 w-full">
          {/* Coach Name  */}
          <div className="flex-1">
            <Dropdown
              options={[
                {
                  label: "Coach 1",
                  value: "coach-1",
                },
                {
                  label: "Coach 2",
                  value: "coach-2",
                },
                {
                  label: "Coach 3",
                  value: "coach-3",
                },
              ]}
              onChange={(value) =>
                setAddSessionInputs((prev) => ({ ...prev, coach: value }))
              }
              selectedOption={addSessionInputs.coaches[0].coach}
              placeholder="Coach"
              className=""
              leftChild={
                <div className="border border-n-200 rounded-full size-10">
                  <Image
                    src="/images/defaults/default-coach.png"
                    alt="Coach"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
              }
            />
          </div>

          {/* Coach Role */}
          <div className="flex-1">
            <Dropdown
              options={[
                {
                  label: "Coach 1",
                  value: "coach-1",
                },
                {
                  label: "Coach 2",
                  value: "coach-2",
                },
                {
                  label: "Coach 3",
                  value: "coach-3",
                },
              ]}
              onChange={(value) =>
                setAddSessionInputs((prev) => ({ ...prev, coach: value }))
              }
              selectedOption={addSessionInputs.coaches[0].role}
              placeholder="Role"
            />
          </div>

          {/* Cross Button */}
          <button className="size-8 bg-n-100 rounded-full flex items-center justify-center shrink-0">
            <Add1 primaryColor="var(--color-n-600)" className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
