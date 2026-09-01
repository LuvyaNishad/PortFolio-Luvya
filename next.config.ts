import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    qualities: [75, 90, 92, 100],
  },
};

export default nextConfig;
