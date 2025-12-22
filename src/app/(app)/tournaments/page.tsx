"use client";

// REACT //
import { useEffect, useState } from "react";

// TYPES //
import { TournamentFilterData } from "@/types/tournament";

// COMPONENTS //
import PrimaryFilters from "@/components/tournaments/PrimaryFilters";
import TournamentsFilterDrawer from "@/components/tournaments/TournamentsFilterDrawer";

// API SERVICES //
import { getTournamentsByFiltersRequest } from "@/services/api/tournament.api.service";

export default function Tournaments() {
  // Define Navigation

  // Define Context

  // Define States
  const [filters, setFilters] = useState<TournamentFilterData>({
    city: "",
    area: "",
    match_format: "",
    tournament_type: "",
    age: "",
    gender: "",
    from_date: "",
    to_date: "",
  });

  // Define Refs

  // Define Functions
  /** Update Filter */
  const updateFilter = (key: keyof TournamentFilterData, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  /** Reset Filters */
  const resetFilters = () => {
    setFilters({
      city: "",
      area: "",
      match_format: "",
      tournament_type: "",
      age: "",
      gender: "",
      from_date: "",
      to_date: "",
    });
  };

  const searchTournaments = () => {
    // Make API call to search tournaments
    getTournamentsByFiltersRequest(filters).then((response) => {
      console.log(response);
    });
  };

  // Use Effects
  useEffect(() => {
    searchTournaments();
  }, [filters.city, filters.match_format]);

  return (
    <div className="flex flex-col items-center bg-n-100 min-h-screen gap-4 pt-18">
      <h1 className="text-2xl font-bold">Tournaments</h1>

      {/* FILTER BAR */}
      <PrimaryFilters
        filters={filters}
        updateFilter={updateFilter}
        resetFilters={resetFilters}
      />

      {/* MORE FILTERS DRAWER */}
      <TournamentsFilterDrawer
        filters={filters}
        updateFilter={updateFilter}
        resetFilters={resetFilters}
        onSearch={searchTournaments}
      />
    </div>
  );
}
