"use client";

// REACT //
import { useRouter } from "next/navigation";

// TYPES //
import { TournamentListingItemData } from "@/types/tournament";

// COMPONENTS //
import Motion from "@/components/animations/Motion";
import TournamentCard from "@/components/tournaments/TournamentCard";
import PageHeader from "@/components/ui/PageHeader";
import BrandLogo from "@/app/components/brand-logo/BrandLogo";

// OTHERS //
import { fadeIn, shrinkIn } from "@/lib/animations";
import SearchInput from "@/components/ui/SearchInput";
import { useState } from "react";

//TODO: Remove after API call
// Dummy data
const tournament: TournamentListingItemData = {
  tournament_id: "1",
  tournament_name: "Mumbai Super League",
  age_category: "u10",
  format: "5v5",
  gender: "boys",
  tournament_format: "league",
  entry_fee: 2500,
  cash_prize_total: 10000,
  slot_status: "open",
  start_date: "2025-06-01",
  end_date: "2025-06-10",
  city: "Mumbai",
  area: "Ghatkopar, Mumbai",
  ground_type: "turf",
  poster_url: "/images/defaults/tournament-card-dummy.png",
  organizer_name: "Zizo Sports",
};

/** Tournaments Page */
export default function Tournaments() {
  // Define Navigation
  const router = useRouter();

  // Define Context

  // Define States
  const [searchInput, setSearchInput] = useState("");

  // Define Refs

  // Helper Functions

  // Use Effects
  return (
    // Tournaments Listing Page
    <section className="relative bg-n-100 h-screen">
      {/* Backdrop Image */}
      <Motion as="div" variants={fadeIn} delay={0.1}>
        <div className="absolute -top-[15%] -right-[32%] opacity-20 ">
          <BrandLogo variant="color-icon" size={380} />
        </div>
      </Motion>

      {/* Page Container */}
      <div className="container mx-auto px-6 py-7 flex flex-col gap-5 z-1">
        <Motion as="div" variants={shrinkIn} delay={0.1}>
          {/* PageHeader component */}
          <PageHeader title="Find local football tournaments near you." />
        </Motion>

        {/* Search Input */}
        <Motion as="div" variants={shrinkIn} delay={0.2}>
          <SearchInput
            className="rounded-3xl bg-n-50"
            value={searchInput}
            onChange={(value) => {
              console.log("Search input:", value);
              setSearchInput(value);
            }}
            rightIcon
            onRightIconClick={() => {
              console.log("Right icon clicked");
            }}
          />
        </Motion>

        {/* Tournaments Listing */}
        <Motion as="div" variants={shrinkIn} delay={0.2}>
          <div className="flex flex-col gap-5">
            {/* Tournament Card component */}
            <TournamentCard
              isLoading={false}
              tournamentListingItem={tournament}
              onShareBtnClick={() => {
                console.log("Share button clicked");
              }}
              onRightArrowClick={() => {
                router.push(
                  `/football-tournaments/${tournament.tournament_id}`
                );
              }}
            />
          </div>
        </Motion>
      </div>
    </section>
  );
}
