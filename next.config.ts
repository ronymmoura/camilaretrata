import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/uploads/**",
      },
    ],
    remotePatterns: [new URL('https://camilaretrata.com.br/uploads/**')],
  }
};

export default nextConfig;
