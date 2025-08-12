// REACT //
import React from "react";

// NEXTJS //
import Image from "next/image";

// Interface for the BrandLogo component */
interface BrandLogoProps {
  variant?: Variant;
  size?: string;
}

// Type for the variant prop
type Variant = "color" | "white" | "color-icon" | "white-icon";

/** Brand Logo Component */
const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "color",
  size = "auto",
}) => {
  // The path to the SVG logo image
  const imagePath = `/brand-logo/${variant}.svg`;

  // The size classes for the logo
  const sizeClasses = size || "w-auto h-auto";

  return (
    // The container for the logo
    <div className={`relative ${sizeClasses}`}>
      {/* The image element */}
      <Image src={imagePath} alt="Brand Logo" fill priority />
    </div>
  );
};

export default BrandLogo;
