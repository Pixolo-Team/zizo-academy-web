// STYLES //
import "./globals.css";

// COMPONENTS //
import Script from "next/script";
import localFont from "next/font/local";

// CONTEXTS //
import { AttendanceProvider } from "@/contexts/AttendanceContext";

// OTHERS //
import { Toaster } from "@/components/ui/sonner";

// DATA //
import type { Metadata } from "next";

/* GT Walsheim Font */
const gtWalsheimFont = localFont({
  src: [
    {
      path: "../../public/fonts/GT-walsheim/GT-Walsheim-Thin.otf",
      weight: "100",
      style: "thin",
    },
    {
      path: "../../public/fonts/GT-walsheim/GT-Walsheim-Ultra-Light.otf",
      weight: "200",
      style: "ultra-light",
    },
    {
      path: "../../public/fonts/GT-walsheim/GT-Walsheim-Light.otf",
      weight: "300",
      style: "light",
    },
    {
      path: "../../public/fonts/GT-walsheim/GT-Walsheim-Regular.otf",
      weight: "400",
      style: "regular",
    },
    {
      path: "../../public/fonts/GT-walsheim/GT-Walsheim-Medium.otf",
      weight: "500",
      style: "medium",
    },
    {
      path: "../../public/fonts/GT-walsheim/GT-Walsheim-Bold.otf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../public/fonts/GT-walsheim/GT-Walsheim-Ultra-Bold.otf",
      weight: "800",
      style: "ultra-bold",
    },
    {
      path: "../../public/fonts/GT-walsheim/GT-Walsheim-Black.otf",
      weight: "900",
      style: "black",
    },
  ],
  variable: "--font-gtwalsheim",
  display: "swap",
});

// Metadata
export const metadata: Metadata = {
  title: "Zizo App",
  description: "Zizo App",
};

/** Root Layout */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={gtWalsheimFont.className}>
      <head>
        {/* Favicon for light mode */}
        <link
          rel="icon"
          href="/favicon-light.svg"
          media="(prefers-color-scheme: light)"
        />

        {/* Favicon for dark mode */}
        <link
          rel="icon"
          href="/favicon-dark.svg"
          media="(prefers-color-scheme: dark)"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SW05KZD0XF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SW05KZD0XF', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="antialiased font-sans">
        <AttendanceProvider>{children}</AttendanceProvider>
        <Toaster duration={2000} />
      </body>
    </html>
  );
}
