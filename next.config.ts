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
              default-src * data: blob: 'unsafe-inline' 'unsafe-eval';
              script-src * data: blob: 'unsafe-inline' 'unsafe-eval';
              style-src * data: blob: 'unsafe-inline';
              img-src * data: blob:;
              font-src * data: blob:;
              frame-ancestors *;
              connect-src * data: blob:;
              media-src * data: blob:;
              object-src *;
            `.replace(/\n/g, " ")
          }
        ]
      }
    ];
  }


};

export default nextConfig;
