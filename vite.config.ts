// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import netlify from "@netlify/vite-plugin-tanstack-start";

// The Netlify plugin's dev middleware intercepts requests for Vite-internal
// assets (e.g. /src/styles.css imports, /node_modules/vite/dist/client/env.mjs)
// and serves them via its SPA static fallback as text/html, which breaks
// CSS and triggers `__DEFINES__ is not defined`. Only enable it for builds.
const isBuild = process.env.NODE_ENV === "production";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: isBuild ? [netlify()] : [],
  },
});
