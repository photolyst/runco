import type { NextConfig } from "next";
// for env validation
import "./src/env/client";
import "./src/env/server";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
