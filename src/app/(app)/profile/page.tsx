"use client";
// REACT //
import React from "react";

// COMPONENTS //
import ProfileActionButton from "@/app/components/profile/ProfileActionButton";
import ProfileHeader from "@/app/components/profile/ProfileHeader";
import PageHeader from "@/app/components/layout/Header";
import UserFullBodyFollowers from "@/components/icons/neevo-icons/UserFullBodyFollowers";
import Sprint from "@/components/icons/neevo-icons/Sprint";
import HelpChat2 from "@/components/icons/neevo-icons/HelpChat2";
import Logout3 from "@/components/icons/neevo-icons/Logout3";

const ProfileActionsData = [
  {
    icon: (
      <UserFullBodyFollowers
        primaryColor="var(--color-n-800)"
        className="size-3.5"
      />
    ),
    text: "View attendance history",
    href: "/attendance",
  },
  {
    icon: <Sprint primaryColor="var(--color-n-800)" className="size-3.5" />,
    text: "My sessions",
    href: "/sessions",
  },
  {
    icon: <HelpChat2 primaryColor="var(--color-n-800)" className="size-3.5" />,
    text: "Need help?",
    href: "/help",
  },
  {
    icon: <Logout3 primaryColor="var(--color-n-800)" className="size-3.5" />,
    text: "Log out",
    href: "/logout",
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
          {ProfileActionsData.map(
            (profileActionItem, profileActionItemIndex) => (
              <ProfileActionButton
                key={profileActionItem.text + profileActionItemIndex}
                icon={profileActionItem.icon}
                text={profileActionItem.text}
                href={profileActionItem.href}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
