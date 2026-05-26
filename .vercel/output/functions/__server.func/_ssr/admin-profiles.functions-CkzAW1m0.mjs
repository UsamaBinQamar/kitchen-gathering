import { c as createServerRpc } from "./createServerRpc-C9ZqtvN8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CtG7XZTW.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { r as requireAdmin } from "./admin-auth.server-CEz5OOXw.mjs";
import { a as createServerFn } from "./server-B1MpUZnh.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, b as booleanType, s as stringType } from "../_libs/zod.mjs";
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
const listProfiles_createServerFn_handler = createServerRpc({
  id: "562fd1c2cac9fe74e0cb1aad42ce696884f273ae29979a7807af32a442be9679",
  name: "listProfiles",
  filename: "src/lib/admin-profiles.functions.ts"
}, (opts) => listProfiles.__executeServer(opts));
const listProfiles = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(listProfiles_createServerFn_handler, async ({
  context
}) => {
  await requireAdmin(context.userId);
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("profiles").select("id, display_name, avatar_url, enabled, created_at, updated_at").order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  const {
    data: adminRows,
    error: rolesErr
  } = await supabaseAdmin.from("user_roles").select("user_id").eq("role", "admin");
  if (rolesErr) throw new Error(rolesErr.message);
  const adminIds = new Set((adminRows ?? []).map((r) => r.user_id));
  const profiles = (rows ?? []).map((p) => ({
    ...p,
    is_admin: adminIds.has(p.id)
  }));
  return {
    profiles
  };
});
const setAdminRole_createServerFn_handler = createServerRpc({
  id: "536051deeb82ee0616975a95d710db802db8d4816879a206a06584714b2edbe3",
  name: "setAdminRole",
  filename: "src/lib/admin-profiles.functions.ts"
}, (opts) => setAdminRole.__executeServer(opts));
const setAdminRole = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid(),
  is_admin: booleanType()
}).parse(input)).handler(setAdminRole_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  if (data.id === context.userId && !data.is_admin) {
    throw new Error("You cannot revoke your own admin access.");
  }
  if (data.is_admin) {
    const {
      error
    } = await supabaseAdmin.from("user_roles").insert({
      user_id: data.id,
      role: "admin"
    });
    if (error && !error.message.toLowerCase().includes("duplicate")) {
      throw new Error(error.message);
    }
  } else {
    const {
      error
    } = await supabaseAdmin.from("user_roles").delete().eq("user_id", data.id).eq("role", "admin");
    if (error) throw new Error(error.message);
  }
  return {
    ok: true
  };
});
const updateProfile_createServerFn_handler = createServerRpc({
  id: "9d51a7c76989ef9def673fbd012cc1dda2da00e66ac366c4d97961a58d4a1371",
  name: "updateProfile",
  filename: "src/lib/admin-profiles.functions.ts"
}, (opts) => updateProfile.__executeServer(opts));
const updateProfile = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid(),
  display_name: stringType().min(1).max(255).optional(),
  avatar_url: stringType().url().max(2048).nullable().optional(),
  enabled: booleanType().optional()
}).parse(input)).handler(updateProfile_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const {
    id,
    ...patch
  } = data;
  if (Object.keys(patch).length === 0) return {
    ok: true
  };
  const {
    data: updated,
    error
  } = await supabaseAdmin.from("profiles").update(patch).eq("id", id).select("id, display_name, avatar_url, enabled, created_at, updated_at").single();
  if (error) throw new Error(error.message);
  return {
    profile: updated
  };
});
const toggleProfileEnabled_createServerFn_handler = createServerRpc({
  id: "6eda1e013dfbfb132fb43f7606401fcedda0bf08d7b0a8b89814d244b60e503b",
  name: "toggleProfileEnabled",
  filename: "src/lib/admin-profiles.functions.ts"
}, (opts) => toggleProfileEnabled.__executeServer(opts));
const toggleProfileEnabled = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid(),
  enabled: booleanType()
}).parse(input)).handler(toggleProfileEnabled_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const {
    error
  } = await supabaseAdmin.from("profiles").update({
    enabled: data.enabled
  }).eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const deleteProfile_createServerFn_handler = createServerRpc({
  id: "82d428b9f7c53225e7b9c9db9e2d6562f3acea716e238a002ac3f6977a64c8d4",
  name: "deleteProfile",
  filename: "src/lib/admin-profiles.functions.ts"
}, (opts) => deleteProfile.__executeServer(opts));
const deleteProfile = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  id: stringType().uuid()
}).parse(input)).handler(deleteProfile_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  if (data.id === context.userId) {
    throw new Error("You cannot delete your own account here.");
  }
  const {
    error: authErr
  } = await supabaseAdmin.auth.admin.deleteUser(data.id);
  if (authErr) throw new Error(authErr.message);
  await supabaseAdmin.from("profiles").delete().eq("id", data.id);
  return {
    ok: true
  };
});
export {
  deleteProfile_createServerFn_handler,
  listProfiles_createServerFn_handler,
  setAdminRole_createServerFn_handler,
  toggleProfileEnabled_createServerFn_handler,
  updateProfile_createServerFn_handler
};
