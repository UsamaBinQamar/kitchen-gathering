import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdmin } from "./admin-auth.server";

export const listActivity = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        limit: z.number().int().min(1).max(500).optional(),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const limit = data.limit ?? 200;
    const { data: logs, error } = await supabaseAdmin
      .from("activity_logs")
      .select("id, user_id, action, target_type, target_id, metadata, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw new Error(error.message);
    const rows = logs ?? [];
    const userIds = Array.from(new Set(rows.map((r) => r.user_id)));
    let profilesById = new Map<string, { display_name: string | null; avatar_url: string | null }>();
    if (userIds.length) {
      const { data: profs } = await supabaseAdmin
        .from("profiles")
        .select("id, display_name, avatar_url")
        .in("id", userIds);
      profilesById = new Map((profs ?? []).map((p) => [p.id, { display_name: p.display_name, avatar_url: p.avatar_url }]));
    }
    return {
      logs: rows.map((r) => ({
        ...r,
        profile: profilesById.get(r.user_id) ?? null,
      })),
    };
  });

export const listActivityForUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        user_id: z.string().uuid(),
        limit: z.number().int().min(1).max(100).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const limit = data.limit ?? 20;
    const { data: logs, error } = await supabaseAdmin
      .from("activity_logs")
      .select("id, action, target_type, target_id, metadata, created_at")
      .eq("user_id", data.user_id)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw new Error(error.message);
    return { logs: logs ?? [] };
  });
