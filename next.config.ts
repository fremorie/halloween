import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
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
