"use client";

// COMPONENTS //
import Motion from "@/components/animations/Motion";
import TournamentCard from "@/components/tournaments/TournamentCard";
import PageHeader from "@/components/ui/PageHeader";

// OTHERS //
import { shrinkIn } from "@/lib/animations";

/** Tournaments Page */
export default function Tournaments() {
  // Define Navigation

  // Define Context

  // Define States

  // Define Refs

  // Helper Functions

  // Use Effects
  return (
    // Tournaments Listing Page
    <section>
      <div className="container mx-auto px-6 py-7 flex flex-col gap-5">
        <Motion as="div" variants={shrinkIn} delay={0.1}>
          {/* PageHeader component */}
          <PageHeader title="Find local football tournaments near you." />
        </Motion>

        {/* Tournaments Grid */}
        <Motion as="div" variants={shrinkIn} delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TournamentCard
              src="/images/defaults/tournament-card-dummy.png"
              title="Mumbai Super League"
              location="Ghatkopar, Mumbai"
              price="₹2,500"
              btnText="View Tournament"
              badgeItems={[
                "Prize Pool",
                "1st Hello team",

                "10 Teams",
                "2nd Place",
                "3rd Place",
              ]}
            />
          </div>
        </Motion>
      </div>
    </section>
  );
}
