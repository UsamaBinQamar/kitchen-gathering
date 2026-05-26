import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
async function requireAdmin(userId) {
  const { data, error } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}
export {
  requireAdmin as r
};
