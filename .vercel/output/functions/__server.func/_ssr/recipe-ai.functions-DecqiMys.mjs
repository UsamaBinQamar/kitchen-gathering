import { c as createServerRpc } from "./createServerRpc-C9ZqtvN8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CtG7XZTW.mjs";
import { a as createServerFn } from "./server-B1MpUZnh.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, e as enumType } from "../_libs/zod.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
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
const InputSchema = objectType({
  kind: enumType(["url", "text", "image"]),
  url: stringType().url().optional(),
  text: stringType().max(5e4).optional(),
  imageBase64: stringType().max(1e7).optional()
});
const parseRecipe_createServerFn_handler = createServerRpc({
  id: "74741af0ab40d84144fef1f13eb863591ef9a25410c9cf055f4f58b1383e3320",
  name: "parseRecipe",
  filename: "src/lib/recipe-ai.functions.ts"
}, (opts) => parseRecipe.__executeServer(opts));
const parseRecipe = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => InputSchema.parse(input)).handler(parseRecipe_createServerFn_handler, async ({
  data
}) => {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("AI is not configured");
  let userContent;
  let scrapedImageUrl;
  if (data.kind === "url") {
    if (!data.url) throw new Error("URL is required");
    const res2 = await fetch(data.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 SagedBot"
      }
    });
    if (!res2.ok) throw new Error(`Could not fetch page (${res2.status})`);
    const html = await res2.text();
    scrapedImageUrl = extractImageUrl(html, data.url);
    const stripped = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 18e3);
    userContent = `Source URL: ${data.url}

Page text:
${stripped}`;
  } else if (data.kind === "text") {
    if (!data.text) throw new Error("Text is required");
    userContent = data.text;
  } else {
    if (!data.imageBase64) throw new Error("Image is required");
    userContent = [{
      type: "text",
      text: "Extract the recipe from this image."
    }, {
      type: "image_url",
      image_url: {
        url: data.imageBase64
      }
    }];
  }
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: data.kind === "image" ? "google/gemini-2.5-flash" : "google/gemini-2.5-flash",
      messages: [{
        role: "system",
        content: SYSTEM
      }, {
        role: "user",
        content: userContent
      }],
      response_format: {
        type: "json_object"
      }
    })
  });
  if (res.status === 429) throw new Error("Too many requests. Try again in a moment.");
  if (res.status === 402) throw new Error("AI credits exhausted. Add credits in Settings.");
  if (!res.ok) throw new Error(`AI error (${res.status})`);
  const json = await res.json();
  const content = json.choices?.[0]?.message?.content ?? "{}";
  const parsed = JSON.parse(content);
  const parsedImage = typeof parsed.image_url === "string" ? parsed.image_url : void 0;
  return {
    title: String(parsed.title ?? "").slice(0, 200),
    description: parsed.description ? String(parsed.description).slice(0, 1e3) : void 0,
    ingredients: Array.isArray(parsed.ingredients) ? parsed.ingredients.slice(0, 100).map((i) => ({
      quantity: i?.quantity ? String(i.quantity).slice(0, 80) : void 0,
      item: String(i?.item ?? "").slice(0, 200)
    })).filter((i) => i.item) : [],
    instructions: Array.isArray(parsed.instructions) ? parsed.instructions.slice(0, 50).map((s) => String(s).slice(0, 1500)).filter(Boolean) : [],
    servings: parsed.servings ? String(parsed.servings).slice(0, 50) : void 0,
    prep_time: parsed.prep_time ? String(parsed.prep_time).slice(0, 50) : void 0,
    cook_time: parsed.cook_time ? String(parsed.cook_time).slice(0, 50) : void 0,
    tags: Array.isArray(parsed.tags) ? parsed.tags.slice(0, 10).map((t) => String(t).slice(0, 40)) : void 0,
    image_url: scrapedImageUrl ?? parsedImage,
    source_url: data.kind === "url" ? data.url : void 0
  };
});
function extractImageUrl(html, pageUrl) {
  const head = html.slice(0, 2e5);
  const metaPatterns = [/<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]*content=["']([^"']+)["']/i, /<meta[^>]+content=["']([^"']+)["'][^>]*property=["']og:image(?::secure_url)?["']/i, /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]*content=["']([^"']+)["']/i, /<meta[^>]+content=["']([^"']+)["'][^>]*name=["']twitter:image(?::src)?["']/i];
  for (const re of metaPatterns) {
    const m = head.match(re);
    if (m?.[1]) return absolutize(m[1], pageUrl);
  }
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
  return void 0;
}
function findRecipeImage(node) {
  if (!node) return void 0;
  if (Array.isArray(node)) {
    for (const n of node) {
      const r = findRecipeImage(n);
      if (r) return r;
    }
    return void 0;
  }
  if (typeof node === "object") {
    const o = node;
    if (o["@graph"]) {
      const r = findRecipeImage(o["@graph"]);
      if (r) return r;
    }
    const type = o["@type"];
    const isRecipe = type === "Recipe" || Array.isArray(type) && type.includes("Recipe");
    if (isRecipe && o.image) {
      const img = o.image;
      if (typeof img === "string") return img;
      if (Array.isArray(img)) {
        const first = img[0];
        if (typeof first === "string") return first;
        if (first && typeof first === "object" && typeof first.url === "string") return first.url;
      }
      if (typeof img === "object" && typeof img.url === "string") return img.url;
    }
  }
  return void 0;
}
function absolutize(url, base) {
  try {
    return new URL(url, base).toString();
  } catch {
    return url;
  }
}
export {
  parseRecipe_createServerFn_handler
};
