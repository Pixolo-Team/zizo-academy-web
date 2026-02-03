"use client";
// REACT //
import React from "react";

// COMPONENTS //
import LineArrowRight1 from "@/components/icons/neevo-icons/LineArrowRight1";
import ProfileActions from "@/app/components/profile/ProfileActions";
import ProfileHeader from "@/app/components/profile/ProfileHeader";
import PageHeader from "@/app/components/layout/Header";

const ProfileActionsData = [
  {
    icon: LineArrowRight1,
    text: "View attendance history",
  },
  {
    icon: LineArrowRight1,
    text: "My sessions",
  },
  {
    icon: LineArrowRight1,
    text: "Need help?",
  },
  {
    icon: LineArrowRight1,
    text: "Log out",
  },
];

export default function Profile() {
  return (
    <div className="flex flex-col gap-6 px-5">
      <PageHeader text="Shubham Pandit" />
      <div className="flex flex-col gap-8">
        <ProfileHeader name="Shubham Pandit" position="Assistant Coach · U16" />
        {/* Profile Options */}
        <div className="flex flex-col gap-2">
          {ProfileActionsData.map((profileActionItem, index) => (
            <React.Fragment key={index}>
              <ProfileActions
                icon={profileActionItem.icon}
                text={profileActionItem.text}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
