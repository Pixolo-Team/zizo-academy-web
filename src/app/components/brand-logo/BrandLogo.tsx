// REACT //
import React from "react";

// NEXTJS //
import Image from "next/image";

// Interface for the BrandLogo component */
interface BrandLogoProps {
  variant: Variant;
  size?: number;
}

// Type for the variant prop
type Variant = "color" | "white" | "color-icon" | "white-icon";

/** Brand Logo Component */
const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "color",
  size = 20,
}) => {
  // The path to the SVG logo image
  const imagePath = `/brand-logo/${variant}.svg`;

  return (
    // The container for the logo
    <div className={`size-${size}`}>
      {/* The image element */}
      <Image src={imagePath} alt="Brand Logo" width={188} height={188} />
    </div>
  );
};

export default BrandLogo;
