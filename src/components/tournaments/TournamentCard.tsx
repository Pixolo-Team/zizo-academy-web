"use client";

// REACT //
import { CalendarDays, ChevronRight, Contact, Users } from "lucide-react";

// TYPES //
import { TournamentListingItemData } from "@/types/tournament";

// COMPONENTS //
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import TournamentCardImage from "./TournamentCardImage";

// OTHERS //
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

// Interface Props
interface TournamentCardProps {
  tournamentListingItem: TournamentListingItemData;
  onShareBtnClick: () => void;
  onRightArrowClick: () => void;
  isLoading?: boolean;
}

export default function TournamentCard({
  tournamentListingItem,
  onShareBtnClick,
  onRightArrowClick,
  isLoading,
}: TournamentCardProps) {
  // Define Navigation

  // Define Context

  // Define States

  // Define Refs

  // Helper Functions

  // Use Effects
  return (
    <div className="rounded-4xl bg-n-50 overflow-hidden w-full">
      {/* Image part */}
      <div className="relative rounded-3xl overflow-hidden">
        {isLoading ? (
          <Skeleton className="bg-n-200 h-[195px] w-full" />
        ) : (
          <TournamentCardImage
            posterUrl={tournamentListingItem?.poster_url}
            onShareBtnClick={onShareBtnClick}
          />
        )}
      </div>
      {/* Content part */}
      <div className="p-5 flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          {/* Title + price */}
          <div className="flex justify-between items-start">
            {/* Title + location */}
            <div
              className={`flex flex-col justify-start items-start ${
                isLoading && "gap-3"
              }`}
            >
              {/* Title */}
              {isLoading ? (
                <Skeleton className="h-3.5 w-44" />
              ) : (
                <p className="justify-start text-n-900 text-xl font-medium leading-none">
                  {tournamentListingItem.tournament_name}
                </p>
              )}

              {/* Location */}
              {isLoading ? (
                <Skeleton className="h-3.5 w-24" />
              ) : (
                <p className="justify-start text-n-500 text-xs font-normal ">
                  {tournamentListingItem.area}
                </p>
              )}
            </div>

            {/* Price */}
            {isLoading ? (
              <Skeleton className="h-3.5 w-16" />
            ) : (
              <p className="justify-start text-green-500 text-lg font-bold leading-6">
                ₹{tournamentListingItem.entry_fee}
              </p>
            )}
          </div>

          {/* Badges */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Badge component */}
            {isLoading ? (
              <Skeleton className="h-9 w-36 rounded-3xl" />
            ) : (
              <Badge
                className="flex items-center gap-1 px-3 py-2.5 text-n-900 font-normal text-xs"
                variant={"secondary"}
              >
                {/* Calendar Icon */}
                <CalendarDays className="h-3 w-3" />
                {tournamentListingItem.start_date}
              </Badge>
            )}

            {isLoading ? (
              <Skeleton className="h-9 w-24 rounded-3xl" />
            ) : (
              <Badge
                className="flex items-center gap-1 px-3 py-2.5 text-n-900 font-normal text-xs"
                variant={"secondary"}
              >
                {/* Users Icon */}
                <Users className="h-3 w-3" />
                {tournamentListingItem.format}
              </Badge>
            )}

            {isLoading ? (
              <Skeleton className="h-9 w-24 rounded-3xl" />
            ) : (
              <Badge
                className="flex items-center gap-1 px-3 py-2.5 text-n-900 font-normal text-xs"
                variant={"secondary"}
              >
                {/* Contact Icon */}
                <Contact className="h-3 w-3" />
                {tournamentListingItem.age_category}
              </Badge>
            )}
          </div>
        </div>

        {/* Winning Prizes + Right Arrow Button */}
        {tournamentListingItem.cash_prize_total > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-center items-start gap-1">
              {isLoading ? (
                <Skeleton className="justify-start h-2.5 w-16" />
              ) : (
                <p className="justify-start text-n-500 text-xs font-normal ">
                  Winning Prize
                </p>
              )}

              {isLoading ? (
                <Skeleton className="h-5 w-36" />
              ) : (
                <div className="flex justify-start items-end gap-0.5">
                  {/* Total Cash Prize */}
                  <p className="text-n-900 text-xl font-bold leading-6">
                    ₹{tournamentListingItem.cash_prize_total}
                  </p>

                  {/* Extra text */}
                  <p className="text-n-500 text-xs font-normal leading-5">
                    and more
                  </p>
                </div>
              )}
            </div>

            {/* Right Arrow Button */}
            {isLoading ? (
              <Skeleton className="h-3.5 w-6" />
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="View tournament details"
                onClick={onRightArrowClick}
              >
                <ChevronRight />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
