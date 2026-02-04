// REACT //
import { ReactNode } from "react";
import BrandLogo from "../components/brand-logo/BrandLogo";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-n-100 relative">
      <div className="fixed -top-20.25 -right-30 opacity-6">
        <BrandLogo
          variant="color-icon"
          size={340}
          className="hidden dark-mode-block lg:hidden!"
        />
        <BrandLogo
          variant="color-icon"
          size={340}
          className="block dark-mode-hidden lg:hidden!"
        />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
