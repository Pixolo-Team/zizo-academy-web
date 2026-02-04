// REACT //
import React from "react";

// COMPONENTS //
import Image from "next/image";

// NEXTJS //

// Interface for the BrandLogo component */
interface BrandLogoProps {
  variant?: Variant;
  size?: number;
  showText?: boolean;
  className?: string;
}

// Type for the variant prop
type Variant =
  | "color"
  | "white"
  | "color-icon"
  | "white-icon"
  | "text-logo"
  | "text-logo-white";

/** Brand Logo Component */
const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "color",
  size = 120,
  showText = false,
  className,
}) => {
  // The path to the SVG logo image
  const imagePath = `/brand-logo/${variant}.svg`;

  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src={imagePath}
        alt="Zizo Brand Logo"
        width={size}
        height={size}
        className={className}
        loading="eager"
      />
      {showText && (
        <span className="text-lg font-medium text-n-700 leading-none">
          ACADEMY
        </span>
      )}
    </div>
  );
};

export default BrandLogo;
