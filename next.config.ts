import type { NextConfig } from "next";

const basePath = "/halloween";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
      "*.glsl": {
        loaders: ["./loaders/glsl-include-loader.js"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
