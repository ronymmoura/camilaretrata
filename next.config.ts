import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/uploads/**",
      },
    ],
    remotePatterns: [new URL('http://camilaretrata.com.br/uploads/**')],
  }
};

export default nextConfig;
