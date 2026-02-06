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
import { AuthProvider } from "@/contexts/AuthContext";

const googleSans = localFont({
  src: [
    // Regular
    {
      path: "../../public/fonts/Google_Sans/static/GoogleSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Google_Sans/static/GoogleSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },

    // Medium
    {
      path: "../../public/fonts/Google_Sans/static/GoogleSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Google_Sans/static/GoogleSans-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },

    // SemiBold
    {
      path: "../../public/fonts/Google_Sans/static/GoogleSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Google_Sans/static/GoogleSans-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },

    // Bold
    {
      path: "../../public/fonts/Google_Sans/static/GoogleSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Google_Sans/static/GoogleSans-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-sans",
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
    <html lang="en" className={googleSans.variable}>
      <head>
        <meta name="color-scheme" content="light dark" />
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
      <body className="antialiased font-sans min-h-screen">
        <AuthProvider>
          <AttendanceProvider>{children}</AttendanceProvider>
        </AuthProvider>
        <Toaster
          duration={2000}
          toastOptions={{
            classNames: {
              toast:
                "rounded-2xl text-base! font-bold! text-center! justify-center! px-5! py-4!",
              success: "bg-green-100! border-green-500! text-green-600!",
              info: "bg-n-100! border-n-800! text-n-800!",
              error: "bg-red-100! border-red-500! text-red-600!",
            },
          }}
        />
      </body>
    </html>
  );
}
