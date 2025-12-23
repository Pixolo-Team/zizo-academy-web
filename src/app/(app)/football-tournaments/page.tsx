"use client";

// REACT //
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

// TYPES //
import { TournamentListingItemData } from "@/types/tournament";

// COMPONENTS //
import Motion from "@/components/animations/Motion";
import TournamentCard from "@/components/tournaments/TournamentCard";
import PageHeader from "@/components/ui/PageHeader";
import BrandLogo from "@/app/components/brand-logo/BrandLogo";
import SearchInput from "@/components/ui/SearchInput";
import Image from "next/image";

// SERVICES //
import { getTournaments } from "@/services/queries/tournaments.query";

// OTHERS //
import { fadeIn, shrinkIn } from "@/lib/animations";

/** Tournaments Page */
export default function Tournaments() {
  // Define Navigation
  const router = useRouter();

  // Define Context

  // Define States
  const [searchInput, setSearchInput] = useState("");
  const [tournamentItems, setTournamentItems] = useState<
    TournamentListingItemData[]
  >([]);
  const [isTournamentsLoading, setIsTournamentsLoading] = useState(true);

  // Define Refs

  // Helper Functions
  /** Function to get all tournaments */
  const getAllTournaments = useCallback(async () => {
    const { data, error } = await getTournaments({
      city: "",
      area: "",
      age_category: "",
      gender: "",
      tournament_format: "",
      format: "",
      ground_type: "",
      entry_fee_min: undefined,
      entry_fee_max: undefined,
      has_cash_prize: false,
      start_date: "",
      end_date: "",
      search_text: searchInput,
      page: 1,
      page_size: 10,
    });

    if (error) {
      console.error("Error getting tournaments:", error);
    } else {
      console.log("Tournaments fetched successfully:", data);
      setTournamentItems(data ?? []);
    }
    setIsTournamentsLoading(false);
    // setTournamentItems([]);
  }, [searchInput]);

  // Use Effects
  useEffect(() => {
    getAllTournaments();
  }, [getAllTournaments]);

  return (
    // Tournaments Listing Page
    <section className="relative bg-n-100 h-screen overflow-x-hidden">
      {/* Backdrop Image */}
      <Motion as="div" variants={fadeIn} delay={0.1}>
        <div className="fixed -top-[80px] -right-[140px] opacity-20 ">
          <BrandLogo variant="color-icon" size={380} />
        </div>
      </Motion>

      {/* Page Container */}
      <div className="container relative mx-auto h-full  px-6 py-7 flex flex-col gap-5 z-2">
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

        {/* TODO: Add Primary filters when ready */}

        {/* Tournaments Listing */}
        <div className="flex flex-col gap-5">
          {/* Tournament Card component */}
          {(isTournamentsLoading ? Array(3).fill({}) : tournamentItems).map(
            (tournamentItem, index) => (
              <TournamentCard
                key={
                  isTournamentsLoading
                    ? `skeleton-${index}`
                    : tournamentItem.tournament_id
                }
                isLoading={isTournamentsLoading}
                tournamentListingItem={tournamentItem}
                onShareBtnClick={() => {
                  console.log("Share button clicked");
                }}
                onRightArrowClick={() => {
                  if (!isTournamentsLoading) {
                    router.push(
                      `/football-tournaments/${tournamentItem.tournament_id}`
                    );
                  }
                }}
              />
            )
          )}
        </div>

        {/* Empty State */}
        {!isTournamentsLoading && tournamentItems.length === 0 && (
          <div className="flex flex-col gap-6 h-full items-center justify-center">
            {/* Empty State Image */}
            <Image
              src="/images/field-image.png"
              alt=""
              width={1200}
              height={120}
              priority
              className="w-[220px] h-[120px] object-contain"
            />

            <div className="flex flex-col gap-2.5 items-center w-[78%]">
              {/* Empty State Title */}
              <p className="text-center text-n-900 font-medium text-xl">
                No tournaments on the field
              </p>

              {/* Empty State Subtitle */}
              <p className="text-center text-n-600 font-normal text-sm">
                Try changing your filters or search a different area
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
