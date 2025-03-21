import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com', 'localhost', 'csi420-01-vm7.ucd.ie'],
  },
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  }
};

export default nextConfig;
