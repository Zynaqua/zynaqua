import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product images currently live under /public/images/products/ (a
    // local static path, not a remote host) — local files under `public/`
    // need NO remotePatterns entry at all; Next.js optimizes them
    // automatically. This entry is here for when real product photography
    // moves to a CDN/remote host post-V1 — uncomment and set the real
    // domain then:
    //
    // remotePatterns: [
    //   { protocol: "https", hostname: "cdn.zynaqua.com", pathname: "/images/**" },
    // ],
  },
};

export default nextConfig;