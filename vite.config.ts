// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

// Nitro replaces the Cloudflare plugin for the Vercel deployment target.
// Nitro auto-detects Vercel via the VERCEL env var at build time and produces
// the .vercel/output directory Vercel expects. To deploy elsewhere, set the
// `preset` option (e.g. nitro({ preset: "node-server" })).
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  cloudflare: false,
  plugins: [nitro()],
});
