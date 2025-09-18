import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "camilaretrata.com.br",
        port: "80",
        pathname: "/uploads/**",
      },
    ],
  }
};

export default nextConfig;
