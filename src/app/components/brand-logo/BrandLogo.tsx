// REACT //
import React from "react";

// NEXTJS //
import Image from "next/image";

// Interface for the BrandLogo component */
interface BrandLogoProps {
  variant?: Variant;
  size?: string;
  className?: string;
}

// Type for the variant prop
type Variant = "color" | "white" | "color-icon" | "white-icon";

/**
 * A component for rendering the Brand logo
 */
const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "color",
  size = "auto",
  className = "",
}) => {
  // The path to the SVG logo image
  const imagePath = `/brand-logo/${variant}.svg`;

  // The size classes for the logo
  const sizeClasses = size || "w-auto h-auto";

  return (
    // The container for the logo
    <div className={`relative ${sizeClasses} ${className}`}>
      {/* The image element */}
      <Image
        src={imagePath}
        alt="Brand Logo"
        fill
        style={{
          objectFit: "contain",
          objectPosition: "center",
        }}
        priority
      />
    </div>
  );
};

export default BrandLogo;
