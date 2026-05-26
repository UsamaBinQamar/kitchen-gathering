import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const Input = z.object({
  recipientEmail: z.string().email(),
  recipientName: z.string().max(100).optional(),
  recipeTitle: z.string().max(200),
  recipeUrl: z.string().url(),
  note: z.string().max(500).optional(),
  senderName: z.string().max(100).optional(),
});

export const shareRecipeByEmail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i) => Input.parse(i))
  .handler(async ({ data }) => {
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
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        to: [data.recipientEmail],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`Could not send email: ${txt.slice(0, 200)}`);
    }
    return { ok: true };
  });

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
