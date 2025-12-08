import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "pixoloproductions.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
