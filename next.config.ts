import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // Dev-only: allow the ngrok tunnel to reach the dev server. This used to be
  // assigned via a stray `module.exports = {...}` block, which Next ignores in
  // an ESM TypeScript config, so the option silently never applied.
  allowedDevOrigins: ["tearless-untragically-kaye.ngrok-free.dev", '192.168.1.7'],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  experimental: {
    // Keep barrel packages tree-shaken down to the named exports actually
    // used (lucide-react ships ~1500 icons; we use a dozen).
    optimizePackageImports: ["lucide-react"],
  },

  compiler: {
    // Strip console noise from the production client bundle, but keep the
    // warnings/errors the site relies on for diagnostics.
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;
