import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self' http://localhost:3000;
              script-src 'self' 'unsafe-inline';
              style-src 'self' 'unsafe-inline';
              frame-ancestors 'self' https://your-main-domain.com;
            `.replace(/\n/g, " ")
          }
        ]
      }
    ];
  }


};

export default nextConfig;
