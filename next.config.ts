import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL" // Allows embedding from any domain
          },
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self' http://localhost:3000;
              script-src 'self' 'unsafe-inline';
              style-src 'self' 'unsafe-inline';
              frame-ancestors 'self' http://localhost:3000;
            `.replace(/\n/g, " ")
          }
        ]
      }
    ];
  }


};

export default nextConfig;
