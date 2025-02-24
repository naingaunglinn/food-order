import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',  // Use 'http' or 'https' based on your setup
        hostname: 'localhost',  // Your local server hostname
        port: '',  // Leave empty if you're using the default port
        pathname: '/storage/**',  // The pattern for image paths, allowing any image under /storage
      },
    ],
  },
};

export default nextConfig;
