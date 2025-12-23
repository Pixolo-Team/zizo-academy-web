"use client";

// REACT //
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// TYPES //
import {
  TournamentFiltersData,
  TournamentListingItemData,
} from "@/types/tournament";

// COMPONENTS //
import Motion from "@/components/animations/Motion";
import TournamentCard from "@/components/tournaments/TournamentCard";
import PageHeader from "@/components/ui/PageHeader";
import BrandLogo from "@/app/components/brand-logo/BrandLogo";
import SearchInput from "@/components/ui/SearchInput";
import Image from "next/image";
import PrimaryFilters from "@/components/tournaments/PrimaryFilters";
import TournamentsFilterDrawer from "@/components/tournaments/TournamentsFilterDrawer";
import ShareDialog from "@/components/ui/ShareDialog";

// SERVICES //
import { getTournaments } from "@/services/queries/tournaments.query";

// HOOKS //
import { useDebounce } from "@/hooks/useDebounce";

// OTHERS //
import { format } from "date-fns";
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
  const [filters, setFilters] = useState<TournamentFiltersData>({
    city: "",
    area: "",
    format: "",
    tournament_format: "",
    age_category: "",
    gender: "",
    start_date: format(new Date(), "yyyy-MM-dd"),
    end_date: format(new Date(), "yyyy-MM-dd"),
  });
  const [isMoreFiltersDrawerOpen, setIsMoreFiltersDrawerOpen] =
    useState<boolean>(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false);
  const [shouldRefresh, setshouldRefresh] = useState<boolean>(false);

  // Define Refs

  // Helper Functions
  /** Function to get all tournaments */
  const getAllTournaments = async () => {
    // Set loading state
    setIsTournamentsLoading(true);

    const { data, error } = await getTournaments({
      ...filters,
      // age_category: filters.age_category?.toLowerCase() || "",
      gender: filters.gender?.toLowerCase() || "",
      tournament_format:
        filters.tournament_format?.toLowerCase().replace(" ", "_") || "",
      ground_type: "",
      entry_fee_min: undefined,
      entry_fee_max: undefined,
      has_cash_prize: false,
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
  };

  /** Update Filter */
  const updateFilter = (key: keyof TournamentFiltersData, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  /** Reset Filters */
  const resetFilters = (primary?: boolean) => {
    // Reset Filters
    setFilters({
      city: "",
      area: "",
      format: "",
      tournament_format: "",
      age_category: "",
      gender: "",
      start_date: "",
      end_date: "",
    });

    // Refresh Data
    if (primary) {
      setshouldRefresh((prev) => !prev);
    }
  };

  // Use Effects
  const debouncedSearchInput = useDebounce(searchInput, 500);

  useEffect(() => {
    getAllTournaments();
  }, [debouncedSearchInput, filters.city, filters.format, shouldRefresh]);

  return (
    // Tournaments Listing Page
    <section className="relative bg-n-100 min-h-screen overflow-x-hidden">
      {/* Backdrop Image */}
      <Motion as="div" variants={fadeIn} delay={0.1}>
        <div className="fixed -top-[80px] -right-[140px] opacity-20 ">
          <BrandLogo variant="color-icon" size={380} />
        </div>
      </Motion>

      {/* Page Container */}
      <div className="container relative mx-auto h-full  px-6 py-7 flex flex-col gap-5 z-4">
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
              setSearchInput(value);
            }}
            rightIcon
            onRightIconClick={() => {
              setIsMoreFiltersDrawerOpen(true);
            }}
          />
        </Motion>

        {/* FILTER BAR */}
        <Motion as="div" variants={shrinkIn} delay={0.3}>
          <PrimaryFilters
            filters={filters}
            updateFilter={updateFilter}
            resetFilters={() => resetFilters(true)}
          />
        </Motion>

        {/* Tournaments Listing */}
        <Motion as="div" variants={shrinkIn} delay={0.4}>
          <div className="flex flex-col gap-5">
            {/* Tournament Card component */}
            {(isTournamentsLoading
              ? Array<TournamentListingItemData>(3).fill(
                  {} as TournamentListingItemData
                )
              : tournamentItems
            ).map((tournamentItem, index) => (
              <TournamentCard
                key={
                  isTournamentsLoading
                    ? `skeleton-${index}`
                    : tournamentItem.tournament_id
                }
                isLoading={isTournamentsLoading}
                tournamentListingItem={tournamentItem}
                onShareBtnClick={() => {
                  setIsShareDialogOpen(true);
                }}
                onRightArrowClick={() => {
                  if (!isTournamentsLoading) {
                    router.push(
                      `/football-tournaments/${tournamentItem.tournament_id}`
                    );
                  }
                }}
              />
            ))}
          </div>
        </Motion>

        {/* Empty State */}
        {!isTournamentsLoading && tournamentItems.length === 0 && (
          <div className="flex flex-col gap-6 h-full items-center justify-center">
            {/* Empty State Image */}
            <Image
              src="/images/field-image.png"
              alt="Field Image"
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
      {/* MORE FILTERS DRAWER */}
      <TournamentsFilterDrawer
        filters={filters}
        updateFilter={updateFilter}
        resetFilters={() => resetFilters(false)}
        onSearch={() => {
          getAllTournaments();
          setIsMoreFiltersDrawerOpen(false);
        }}
        isOpen={isMoreFiltersDrawerOpen}
        onOpenChange={setIsMoreFiltersDrawerOpen}
      />

      {/* SHARE DIALOG */}
      <ShareDialog
        isOpen={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        copyLink="https://somelink.com"
      />
    </section>
  );
}
