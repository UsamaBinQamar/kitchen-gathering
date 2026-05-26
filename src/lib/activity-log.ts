import { supabase } from "@/integrations/supabase/client";

export type ActivityAction =
  | "login"
  | "signup"
  | "logout"
  | "recipe.create"
  | "recipe.update"
  | "recipe.delete"
  | "recipe.copy"
  | "recipe.visibility.public"
  | "recipe.visibility.private"
  | "rating.create"
  | "rating.update"
  | "rating.delete";

export async function logActivity(
  action: ActivityAction,
  opts: { target_type?: string; target_id?: string; metadata?: Record<string, unknown> } = {},
) {
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    await supabase.from("activity_logs").insert({
      user_id: data.user.id,
      action,
      target_type: opts.target_type ?? null,
      target_id: opts.target_id ?? null,
      metadata: (opts.metadata ?? {}) as never,
    });
  } catch {
    // best-effort; never block user flow
  }
}
