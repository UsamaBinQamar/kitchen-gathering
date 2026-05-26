import { c as createServerRpc } from "./createServerRpc-C9ZqtvN8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CtG7XZTW.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { r as requireAdmin } from "./admin-auth.server-CEz5OOXw.mjs";
import { a as createServerFn } from "./server-B1MpUZnh.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, n as numberType, s as stringType } from "../_libs/zod.mjs";
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
const listActivity_createServerFn_handler = createServerRpc({
  id: "f6251bb76805ec4fbb5ebcda8307cd612f275d8686a621a457a96e8c21aeb0a4",
  name: "listActivity",
  filename: "src/lib/admin-activity.functions.ts"
}, (opts) => listActivity.__executeServer(opts));
const listActivity = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  limit: numberType().int().min(1).max(500).optional()
}).parse(input ?? {})).handler(listActivity_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const limit = data.limit ?? 200;
  const {
    data: logs,
    error
  } = await supabaseAdmin.from("activity_logs").select("id, user_id, action, target_type, target_id, metadata, created_at").order("created_at", {
    ascending: false
  }).limit(limit);
  if (error) throw new Error(error.message);
  const rows = logs ?? [];
  const userIds = Array.from(new Set(rows.map((r) => r.user_id)));
  let profilesById = /* @__PURE__ */ new Map();
  if (userIds.length) {
    const {
      data: profs
    } = await supabaseAdmin.from("profiles").select("id, display_name, avatar_url").in("id", userIds);
    profilesById = new Map((profs ?? []).map((p) => [p.id, {
      display_name: p.display_name,
      avatar_url: p.avatar_url
    }]));
  }
  return {
    logs: rows.map((r) => ({
      ...r,
      profile: profilesById.get(r.user_id) ?? null
    }))
  };
});
const listActivityForUser_createServerFn_handler = createServerRpc({
  id: "32564ba405604316c491038c9a78659715f7f484e08cef94371ce74878c414b1",
  name: "listActivityForUser",
  filename: "src/lib/admin-activity.functions.ts"
}, (opts) => listActivityForUser.__executeServer(opts));
const listActivityForUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  user_id: stringType().uuid(),
  limit: numberType().int().min(1).max(100).optional()
}).parse(input)).handler(listActivityForUser_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const limit = data.limit ?? 20;
  const {
    data: logs,
    error
  } = await supabaseAdmin.from("activity_logs").select("id, action, target_type, target_id, metadata, created_at").eq("user_id", data.user_id).order("created_at", {
    ascending: false
  }).limit(limit);
  if (error) throw new Error(error.message);
  return {
    logs: logs ?? []
  };
});
export {
  listActivityForUser_createServerFn_handler,
  listActivity_createServerFn_handler
};
