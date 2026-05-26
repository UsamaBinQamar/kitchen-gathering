import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BASE_URL = "https://kitchengathering.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/browse", changefreq: "daily", priority: "0.9" },
          { path: "/import", changefreq: "monthly", priority: "0.7" },
          { path: "/login", changefreq: "monthly", priority: "1.0" },
          { path: "/signup", changefreq: "monthly", priority: "1.0" },
          { path: "/my-recipes", changefreq: "weekly", priority: "0.8" },
        ];

        // Add all public recipes
        const { data: recipes } = await supabaseAdmin
          .from("recipes")
          .select("id, updated_at")
          .eq("visibility", "public");

        if (recipes) {
          for (const recipe of recipes) {
            entries.push({
              path: `/recipes/${recipe.id}`,
              lastmod: recipe.updated_at ? new Date(recipe.updated_at).toISOString().split("T")[0] : undefined,
              changefreq: "weekly",
              priority: "0.8",
            });
          }
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
