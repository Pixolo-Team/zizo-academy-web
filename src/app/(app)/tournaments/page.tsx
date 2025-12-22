"use client";

// COMPONENTS //
import Motion from "@/components/animations/Motion";
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
      <div className="container mx-auto px-6 py-7">
        <Motion as="div" variants={shrinkIn} delay={0.1}>
          {/* PageHeader component */}
          <PageHeader title="Find local football tournaments near you." />
        </Motion>
      </div>
    </section>
  );
}
