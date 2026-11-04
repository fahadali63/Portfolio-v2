import type { NextConfig } from "next";

// Static export: `npm run build` writes plain HTML/CSS/JS to out/ for Netlify.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
