import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000" // ONLY allow main site
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true"
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, OPTIONS"
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization"
          },
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self' http://localhost:3000;
              script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:3000;
              frame-ancestors http://localhost:3000;
              connect-src 'self' http://localhost:3000;
            `.replace(/\n/g, ' ')
          },
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM http://localhost:3000" // Allow embedding from main site only
          }
        ]
      }
    ];
  }

};

export default nextConfig;
