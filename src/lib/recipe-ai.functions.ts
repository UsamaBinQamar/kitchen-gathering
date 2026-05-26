import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const SYSTEM = `You extract structured recipes from messy input (web pages, pasted text, or image OCR).
Always reply with ONLY a JSON object matching this TypeScript type, no markdown, no commentary:
{
  "title": string,
  "description"?: string,
  "ingredients": { "quantity"?: string, "item": string }[],
  "instructions": string[],
  "servings"?: string,
  "prep_time"?: string,
  "cook_time"?: string,
  "tags"?: string[]
}
If the input does not contain a recipe, return {"title":"","ingredients":[],"instructions":[]}.`;

const InputSchema = z.object({
  kind: z.enum(["url", "text", "image"]),
  url: z.string().url().optional(),
  text: z.string().max(50000).optional(),
  imageBase64: z.string().max(10_000_000).optional(),
});

export const parseRecipe = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("AI is not configured");

    let userContent: unknown;
    let scrapedImageUrl: string | undefined;
    if (data.kind === "url") {
      if (!data.url) throw new Error("URL is required");
      const res = await fetch(data.url, { headers: { "User-Agent": "Mozilla/5.0 SagedBot" } });
      if (!res.ok) throw new Error(`Could not fetch page (${res.status})`);
      const html = await res.text();
      scrapedImageUrl = extractImageUrl(html, data.url);
      const stripped = html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .slice(0, 18000);
      userContent = `Source URL: ${data.url}\n\nPage text:\n${stripped}`;
    } else if (data.kind === "text") {
      if (!data.text) throw new Error("Text is required");
      userContent = data.text;
    } else {
      if (!data.imageBase64) throw new Error("Image is required");
      userContent = [
        { type: "text", text: "Extract the recipe from this image." },
        { type: "image_url", image_url: { url: data.imageBase64 } },
      ];
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: data.kind === "image" ? "google/gemini-2.5-flash" : "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: userContent },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (res.status === 429) throw new Error("Too many requests. Try again in a moment.");
    if (res.status === 402) throw new Error("AI credits exhausted. Add credits in Settings.");
    if (!res.ok) throw new Error(`AI error (${res.status})`);

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(content);

    const parsedImage = typeof parsed.image_url === "string" ? parsed.image_url : undefined;

    return {
      title: String(parsed.title ?? "").slice(0, 200),
      description: parsed.description ? String(parsed.description).slice(0, 1000) : undefined,
      ingredients: Array.isArray(parsed.ingredients) ? parsed.ingredients.slice(0, 100).map((i: { quantity?: unknown; item?: unknown }) => ({
        quantity: i?.quantity ? String(i.quantity).slice(0, 80) : undefined,
        item: String(i?.item ?? "").slice(0, 200),
      })).filter((i: { item: string }) => i.item) : [],
      instructions: Array.isArray(parsed.instructions) ? parsed.instructions.slice(0, 50).map((s: unknown) => String(s).slice(0, 1500)).filter(Boolean) : [],
      servings: parsed.servings ? String(parsed.servings).slice(0, 50) : undefined,
      prep_time: parsed.prep_time ? String(parsed.prep_time).slice(0, 50) : undefined,
      cook_time: parsed.cook_time ? String(parsed.cook_time).slice(0, 50) : undefined,
      tags: Array.isArray(parsed.tags) ? parsed.tags.slice(0, 10).map((t: unknown) => String(t).slice(0, 40)) : undefined,
      image_url: scrapedImageUrl ?? parsedImage,
      source_url: data.kind === "url" ? data.url : undefined,
    };
  });

function extractImageUrl(html: string, pageUrl: string): string | undefined {
  const head = html.slice(0, 200_000);
  const metaPatterns = [
    /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]*content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:image(?::secure_url)?["']/i,
    /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]*content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]*name=["']twitter:image(?::src)?["']/i,
  ];
  for (const re of metaPatterns) {
    const m = head.match(re);
    if (m?.[1]) return absolutize(m[1], pageUrl);
  }
  // JSON-LD recipe image
  const ldMatches = head.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) ?? [];
  for (const block of ldMatches) {
    const body = block.replace(/^[\s\S]*?>/, "").replace(/<\/script>$/i, "");
    try {
      const parsed = JSON.parse(body);
      const found = findRecipeImage(parsed);
      if (found) return absolutize(found, pageUrl);
    } catch {
      const m = body.match(/"image"\s*:\s*"([^"]+)"/);
      if (m?.[1]) return absolutize(m[1], pageUrl);
    }
  }
  return undefined;
}

function findRecipeImage(node: unknown): string | undefined {
  if (!node) return undefined;
  if (Array.isArray(node)) {
    for (const n of node) { const r = findRecipeImage(n); if (r) return r; }
    return undefined;
  }
  if (typeof node === "object") {
    const o = node as Record<string, unknown>;
    if (o["@graph"]) { const r = findRecipeImage(o["@graph"]); if (r) return r; }
    const type = o["@type"];
    const isRecipe = type === "Recipe" || (Array.isArray(type) && type.includes("Recipe"));
    if (isRecipe && o.image) {
      const img = o.image;
      if (typeof img === "string") return img;
      if (Array.isArray(img)) {
        const first = img[0];
        if (typeof first === "string") return first;
        if (first && typeof first === "object" && typeof (first as Record<string, unknown>).url === "string") return (first as Record<string, string>).url;
      }
      if (typeof img === "object" && typeof (img as Record<string, unknown>).url === "string") return (img as Record<string, string>).url;
    }
  }
  return undefined;
}

function absolutize(url: string, base: string): string {
  try { return new URL(url, base).toString(); } catch { return url; }
}
