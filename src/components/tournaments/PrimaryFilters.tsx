"use client";

// TYPES //
import { TournamentFiltersData } from "@/types/tournament";

// ENUMS //
import { CityFilter, MatchFormatFilter } from "@/enums/tournament-filter.enum";

// COMPONENTS //
import FilterDropdown from "@/components/ui/FilterDropdown";

interface PrimaryFiltersProps {
  filters: TournamentFiltersData;
  updateFilter: (key: keyof TournamentFiltersData, value: string) => void;
  resetFilters: () => void;
}

export default function PrimaryFilters({
  filters,
  updateFilter,
  resetFilters,
}: PrimaryFiltersProps) {
  return (
    <div className="flex justify-between items-center w-full px-6 gap-3.5">
      {/* Primary Filters */}
      <div className="flex gap-3.5 overflow-x-auto no-scrollbar">
        <FilterDropdown
          title="City"
          options={Object.values(CityFilter)}
          selectedOption={filters.city}
          onChange={(value) => updateFilter("city", value)}
        />
        <FilterDropdown
          title="Match Format"
          options={Object.values(MatchFormatFilter)}
          selectedOption={filters.match_format}
          onChange={(value) => updateFilter("match_format", value)}
        />
      </div>

      {/* Reset Button */}
      <button
        type="button"
        className="bg-n-50 text-n-950 rounded-full size-10 shrink-0 items-center justify-center flex"
        onClick={resetFilters}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M1.35135 9.99912H0C0.000182381 7.92305 0.646511 5.8985 1.84931 4.20636C3.05212 2.51421 4.75176 1.23838 6.71243 0.555853C8.67311-0.12667 10.7976-0.182038 12.7912 0.397429C14.7847 0.976897 16.5485 2.16247 17.8378 3.78966V2.29642H19.1892V7.02615H14.4595V5.6748H17.4896C16.7299 4.36073 15.638 3.2695 14.3234 2.51052C13.0089 1.75154 11.5179 1.35149 10 1.35047C5.23108 1.35047 1.35135 5.2302 1.35135 9.99912ZM18.6486 9.99912C18.6486 14.768 14.7689 18.6478 10 18.6478C8.48209 18.6468 6.99112 18.2467 5.67658 17.4877C4.36205 16.7288 3.27014 15.6375 2.51036 14.3234H5.54054V12.9721H0.810811V17.7018H2.16216V16.2086C3.45147 17.8358 5.21527 19.0213 7.20883 19.6008C9.2024 20.1803 11.3269 20.1249 13.2876 19.4424C15.2482 18.7599 16.9479 17.484 18.1507 15.7919C19.3535 14.0997 19.9998 12.0752 20 9.99912H18.6486Z"
            fill="#020617"
          />
        </svg>
      </button>
    </div>
  );
}
