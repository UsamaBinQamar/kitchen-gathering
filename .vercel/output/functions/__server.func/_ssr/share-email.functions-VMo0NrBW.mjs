import { c as createServerRpc } from "./createServerRpc-C9ZqtvN8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CtG7XZTW.mjs";
import { a as createServerFn } from "./server-B1MpUZnh.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
const Input = objectType({
  recipientEmail: stringType().email(),
  recipientName: stringType().max(100).optional(),
  recipeTitle: stringType().max(200),
  recipeUrl: stringType().url(),
  note: stringType().max(500).optional(),
  senderName: stringType().max(100).optional()
});
const shareRecipeByEmail_createServerFn_handler = createServerRpc({
  id: "610f8f79c147f128ed099a81b5f409f8d4ab5116a165d0859c239a7883009260",
  name: "shareRecipeByEmail",
  filename: "src/lib/share-email.functions.ts"
}, (opts) => shareRecipeByEmail.__executeServer(opts));
const shareRecipeByEmail = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((i) => Input.parse(i)).handler(shareRecipeByEmail_createServerFn_handler, async ({
  data
}) => {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("Email is not configured");
  const subject = `${data.senderName ?? "A friend"} shared a recipe: ${data.recipeTitle}`;
  const html = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto;padding:24px;background:#fafaf5;">
        <h1 style="font-family:Georgia,serif;color:#2d4a35;">${escapeHtml(data.recipeTitle)}</h1>
        ${data.note ? `<p style="color:#555;font-style:italic;">"${escapeHtml(data.note)}"</p>` : ""}
        <p>${data.senderName ? escapeHtml(data.senderName) + " thought you'd like this recipe." : "Someone shared this recipe with you."}</p>
        <p><a href="${data.recipeUrl}" style="display:inline-block;padding:12px 20px;background:#3b5d44;color:#fff;border-radius:999px;text-decoration:none;">View the recipe</a></p>
        <p style="color:#888;font-size:12px;margin-top:32px;">Sent via Saged</p>
      </div>`;
  const res = await fetch("https://ai.gateway.lovable.dev/v1/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      to: [data.recipientEmail],
      subject,
      html
    })
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Could not send email: ${txt.slice(0, 200)}`);
  }
  return {
    ok: true
  };
});
function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);
}
export {
  shareRecipeByEmail_createServerFn_handler
};
