import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
  images: {
    remotePatterns: [
      // {
      //   protocol: "http",
      //   hostname: "localhost",
      //   port: "3000",
      //   pathname: "/uploads/**",
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'camilaretrata.com.br',
      //   port: '',
      //   pathname: '/uploads/**',
      // }
    ],
  }
};

export default nextConfig;
