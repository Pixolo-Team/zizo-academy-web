"use client";

// TYPES //
import { TournamentFiltersData } from "@/types/tournament";

// ENUMS //
import {
  Age,
  AreaFilter,
  CityFilter,
  Gender,
  MatchFormatFilter,
  TournamentFilter,
} from "@/enums/tournament-filter.enum";

// COMPONENTS //
import FilterDrawer from "@/components/ui/FilterDrawer";
import FilterDropdown from "@/components/ui/FilterDropdown";
import { DatePicker } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/button";
import Motion from "../animations/Motion";
import { shrinkIn, slideInUp } from "@/lib/animations";

interface TournamentsFilterDrawerProps {
  filters: TournamentFiltersData;
  updateFilter: (key: keyof TournamentFiltersData, value: string) => void;
  resetFilters: () => void;
  onSearch: () => void;
}

export default function TournamentsFilterDrawer({
  filters,
  updateFilter,
  resetFilters,
  onSearch,
}: TournamentsFilterDrawerProps) {
  return (
    <FilterDrawer
      title="Matchday Starts here"
      description="Find tournaments made for you"
    >
      <div className="flex flex-col gap-7">
        {/* Location */}
        <Motion variants={slideInUp} delay={0.1}>
          <div className="flex flex-col gap-2">
            <p className="text-n-700 ml-2 leading-tight">Location</p>
            <div className="flex flex-wrap gap-3 gap-y-2">
              <FilterDropdown
                title="City"
                options={Object.values(CityFilter)}
                selectedOption={filters.city}
                onChange={(value) => updateFilter("city", value)}
                className="border border-n-200"
              />
              <FilterDropdown
                title="Area"
                options={Object.values(AreaFilter)}
                selectedOption={filters.area}
                onChange={(value) => updateFilter("area", value)}
                className="border border-n-200"
              />
            </div>
          </div>
        </Motion>

        {/* Basic Information */}
        <Motion variants={slideInUp} delay={0.2}>
          <div className="flex flex-col gap-2">
            <p className="text-n-700 ml-2 leading-tight">Basic Information</p>
            <div className="flex flex-wrap gap-3 gap-y-2">
              <FilterDropdown
                title="Age"
                options={Object.values(Age)}
                selectedOption={filters.age}
                onChange={(value) => updateFilter("age", value)}
                className="border border-n-200"
              />
              <FilterDropdown
                title="Gender"
                options={Object.values(Gender)}
                selectedOption={filters.gender}
                onChange={(value) => updateFilter("gender", value)}
                className="border border-n-200"
              />
            </div>
          </div>
        </Motion>

        {/* Match Details */}
        <Motion variants={slideInUp} delay={0.3}>
          <div className="flex flex-col gap-2">
            <p className="text-n-700 ml-2 leading-tight">Match Up Details</p>
            <div className="flex flex-wrap gap-3 gap-y-2">
              <FilterDropdown
                title="Tournament Type"
                options={Object.values(TournamentFilter)}
                selectedOption={filters.tournament_type}
                onChange={(value) => updateFilter("tournament_type", value)}
                className="border border-n-200"
              />
              <FilterDropdown
                title="Match Format"
                options={Object.values(MatchFormatFilter)}
                selectedOption={filters.match_format}
                onChange={(value) => updateFilter("match_format", value)}
                className="border border-n-200"
              />
            </div>
          </div>
        </Motion>

        {/* Date Range */}
        <Motion variants={slideInUp} delay={0.4}>
          <div className="flex flex-col gap-2">
            <p className="text-n-700 ml-2 leading-tight">Date Range</p>

            <div className="grid grid-cols-2 items-center">
              {/* From Date */}
              <DatePicker
                value={filters.start_date}
                onChange={(date) => updateFilter("start_date", date)}
                placeholder="From"
                className="rounded-l-full h-11 rounded-r-none border-r-0 border-n-200 bg-n-50"
              />

              {/* To Date */}
              <DatePicker
                value={filters.end_date}
                onChange={(date) => updateFilter("end_date", date)}
                placeholder="To"
                className="rounded-r-full h-11 rounded-l-none border-n-200 bg-n-50"
              />
            </div>
          </div>
        </Motion>

        {/* Reset and Search Button */}
        <Motion variants={slideInUp} delay={0.5}>
          <div className="grid grid-cols-2 gap-2 w-full">
            {/* Reset Button */}
            <Motion variants={shrinkIn} delay={0.6}>
              <Button
                type="button"
                onClick={resetFilters}
                className="bg-n-50 text-n-950 border border-n-200 h-11 w-full rounded-3xl"
              >
                Reset
              </Button>
            </Motion>

            {/* Search Button */}
            <Motion variants={shrinkIn} delay={0.7}>
              <Button
                type="button"
                onClick={onSearch}
                className="h-11 w-full rounded-3xl"
              >
                Search
              </Button>
            </Motion>
          </div>
        </Motion>
      </div>
    </FilterDrawer>
  );
}
