import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/me',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
