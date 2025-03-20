import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com', 'localhost'],
  },
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  }
};

export default nextConfig;
