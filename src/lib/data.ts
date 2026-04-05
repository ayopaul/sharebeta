import { supabaseAdmin } from "./supabase-server";

export async function getProjects() {
  const { data } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  return data ?? [];
}

export async function getProjectBySlug(slug: string) {
  const { data } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getBlogPosts() {
  const { data } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });
  return data ?? [];
}

export async function getTeamMembers() {
  const { data } = await supabaseAdmin
    .from("team_members")
    .select("*")
    .eq("active", true)
    .order("sort_order");
  return data ?? [];
}

export async function getServices() {
  const { data } = await supabaseAdmin
    .from("services")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  return data ?? [];
}

export async function getStats() {
  const { data } = await supabaseAdmin
    .from("stats")
    .select("*")
    .order("sort_order");
  return data ?? [];
}

export async function getClientLogos(row?: number) {
  let query = supabaseAdmin
    .from("client_logos")
    .select("*")
    .eq("active", true)
    .order("sort_order");
  if (row) query = query.eq("row", row);
  const { data } = await query;
  return data ?? [];
}

export async function getSetting(key: string): Promise<string> {
  const { data } = await supabaseAdmin
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .single();
  return data?.value ?? "";
}

export async function getSettings(): Promise<Record<string, string>> {
  const { data } = await supabaseAdmin
    .from("site_settings")
    .select("*");
  const map: Record<string, string> = {};
  data?.forEach((row: { key: string; value: string }) => {
    map[row.key] = row.value;
  });
  return map;
}
