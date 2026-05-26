import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdmin } from "./admin-auth.server";

export const listProfiles = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context.userId);
    const { data: rows, error } = await supabaseAdmin
      .from("profiles")
      .select("id, display_name, avatar_url, enabled, created_at, updated_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    const { data: adminRows, error: rolesErr } = await supabaseAdmin
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");
    if (rolesErr) throw new Error(rolesErr.message);
    const adminIds = new Set((adminRows ?? []).map((r) => r.user_id));
    const profiles = (rows ?? []).map((p) => ({ ...p, is_admin: adminIds.has(p.id) }));
    return { profiles };
  });

export const setAdminRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().uuid(),
        is_admin: z.boolean(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    if (data.id === context.userId && !data.is_admin) {
      throw new Error("You cannot revoke your own admin access.");
    }
    if (data.is_admin) {
      const { error } = await supabaseAdmin
        .from("user_roles")
        .insert({ user_id: data.id, role: "admin" });
      if (error && !error.message.toLowerCase().includes("duplicate")) {
        throw new Error(error.message);
      }
    } else {
      const { error } = await supabaseAdmin
        .from("user_roles")
        .delete()
        .eq("user_id", data.id)
        .eq("role", "admin");
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const updateProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().uuid(),
        display_name: z.string().min(1).max(255).optional(),
        avatar_url: z.string().url().max(2048).nullable().optional(),
        enabled: z.boolean().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const { id, ...patch } = data;
    if (Object.keys(patch).length === 0) return { ok: true };
    const { data: updated, error } = await supabaseAdmin
      .from("profiles")
      .update(patch)
      .eq("id", id)
      .select("id, display_name, avatar_url, enabled, created_at, updated_at")
      .single();
    if (error) throw new Error(error.message);
    return { profile: updated };
  });

export const toggleProfileEnabled = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().uuid(),
        enabled: z.boolean(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ enabled: data.enabled })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await requireAdmin(context.userId);
    if (data.id === context.userId) {
      throw new Error("You cannot delete your own account here.");
    }
    const { error: authErr } = await supabaseAdmin.auth.admin.deleteUser(data.id);
    if (authErr) throw new Error(authErr.message);
    await supabaseAdmin.from("profiles").delete().eq("id", data.id);
    return { ok: true };
  });
