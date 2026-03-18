import type { NextConfig } from "next";
// for env validation
import "@/env/client";
import "@/env/server";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
