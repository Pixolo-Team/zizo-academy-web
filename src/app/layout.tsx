// STYLES //
import "./globals.css";

// COMPONENTS //
import Script from "next/script";

// CONTEXTS //
import { AttendanceProvider } from "@/contexts/AttendanceContext";

// DATA //
import type { Metadata } from "next";

// FONTS //

// Fetch Fonts
// const gtWalsheim = localFont({
//   src: [
//     // Thin (100)
//     {
//       path: "./fonts/gt-walsheim/GT-Walsheim-Thin.otf",
//       weight: "100",
//       style: "normal",
//     },
//     {
//       path: "./fonts/gt-walsheim/GT-Walsheim-Thin-Oblique.otf",
//       weight: "100",
//       style: "italic",
//     },
//     // Ultra Light (200)
//     {
//       path: "./fonts/gt-walsheim/GT-Walsheim-Ultra-Light.otf",
//       weight: "200",
//       style: "normal",
//     },
//     {
//       path: "./fonts/gt-walsheim/GT-Walsheim-Ultra-Light-Oblique.otf",
//       weight: "200",
//       style: "italic",
//     },
//     // Light (300)
//     {
//       path: "./fonts/gt-walsheim/GT-Walsheim-Light.otf",
//       weight: "300",
//       style: "normal",
//     },
//     {
//       path: "./fonts/gt-walsheim/GT-Walsheim-Light-Oblique.otf",
//       weight: "300",
//       style: "italic",
//     },
//     // Regular (400)
//     {
//       path: "./fonts/gt-walsheim/GT-Walsheim-Regular.otf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "./fonts/gt-walsheim/GT-Walsheim-Regular-Oblique.otf",
//       weight: "400",
//       style: "italic",
//     },
//     // Medium (500)
//     {
//       path: "./fonts/gt-walsheim/GT-Walsheim-Medium.otf",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "./fonts/gt-walsheim/GT-Walsheim-Medium-Oblique.otf",
//       weight: "500",
//       style: "italic",
//     },
//     // Bold (700)
//     {
//       path: "./fonts/gt-walsheim/GT-Walsheim-Bold.otf",
//       weight: "700",
//       style: "normal",
//     },
//     {
//       path: "./fonts/gt-walsheim/GT-Walsheim-Bold-Oblique.otf",
//       weight: "700",
//       style: "italic",
//     },
//     // Ultra Bold (800)
//     {
//       path: "./fonts/gt-walsheim/GT-Walsheim-Ultra-Bold.otf",
//       weight: "800",
//       style: "normal",
//     },
//     {
//       path: "./fonts/gt-walsheim/GT-Walsheim-Ultra-Bold-Oblique.otf",
//       weight: "800",
//       style: "italic",
//     },
//     // Black (900)
//     {
//       path: "./fonts/gt-walsheim/GT-Walsheim-Black.otf",
//       weight: "900",
//       style: "normal",
//     },
//     {
//       path: "./fonts/gt-walsheim/GT-Walsheim-Black-Oblique.otf",
//       weight: "900",
//       style: "italic",
//     },
//   ],
//   variable: "--font-gt-walsheim",
//   display: "swap",
// });

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
    <html lang="en">
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
      </body>
    </html>
  );
}
