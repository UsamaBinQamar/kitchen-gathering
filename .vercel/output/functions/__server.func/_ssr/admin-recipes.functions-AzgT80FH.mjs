import { c as createServerRpc } from "./createServerRpc-C9ZqtvN8.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-CtG7XZTW.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { r as requireAdmin } from "./admin-auth.server-CEz5OOXw.mjs";
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
const listRecipesForUser_createServerFn_handler = createServerRpc({
  id: "c8e7da2243ced64ce8bed251a554ece2a86c2440f544918e0ecdeb5bea08b3e8",
  name: "listRecipesForUser",
  filename: "src/lib/admin-recipes.functions.ts"
}, (opts) => listRecipesForUser.__executeServer(opts));
const listRecipesForUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  user_id: stringType().uuid()
}).parse(input)).handler(listRecipesForUser_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireAdmin(context.userId);
  const {
    data: recipes,
    error
  } = await supabaseAdmin.from("recipes").select("id, title, description, image_url, visibility, cuisine, meal_type, tags, cook_time, created_at").eq("user_id", data.user_id).order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return {
    recipes: recipes ?? []
  };
});
export {
  listRecipesForUser_createServerFn_handler
};
