import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/aspen-investor",
  images: { unoptimized: true },
};

export default nextConfig;
