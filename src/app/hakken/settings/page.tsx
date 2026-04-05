"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import ImageUpload from "@/components/admin/ImageUpload";

const inputStyle: React.CSSProperties = { width: "100%", padding: "8px 12px", border: "1px solid #e5e5e5", borderRadius: "8px", fontSize: "14px", color: "#0b0c0f", outline: "none" };

const settingFields = [
  { key: "company_name", label: "Company Name" },
  { key: "tagline", label: "Tagline" },
  { key: "location", label: "Location" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "instagram", label: "Instagram URL" },
  { key: "twitter", label: "Twitter URL" },
  { key: "linkedin", label: "LinkedIn URL" },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createBrowserSupabase();

  useEffect(() => {
    supabase.from("site_settings").select("*").then(({ data }) => {
      const map: Record<string, string> = {};
      data?.forEach((row: { key: string; value: string }) => { map[row.key] = row.value; });
      setSettings(map);
    });
  }, [supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const allKeys = [...settingFields.map((f) => f.key), "logo"];
    for (const key of allKeys) {
      const value = settings[key] || "";
      await supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 style={{ fontSize: "30px", fontWeight: 400, color: "#0b0c0f", marginBottom: "24px" }}>Site Settings</h1>

      <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e5e5e5", padding: "24px" }}>
        <form onSubmit={handleSave}>
          {/* Logo upload */}
          <div style={{ marginBottom: "24px" }}>
            <ImageUpload
              value={settings.logo || ""}
              onChange={(url) => setSettings({ ...settings, logo: url })}
              label="Site Logo"
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {settingFields.map((field) => (
              <div key={field.key}>
                <label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>{field.label}</label>
                <input value={settings[field.key] || ""} onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })} style={inputStyle} />
              </div>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "24px" }}>
            <button type="submit" disabled={saving} style={{ padding: "8px 24px", backgroundColor: "#0b0c0f", color: "#fdfcf9", border: "none", borderRadius: "8px", fontSize: "14px", cursor: saving ? "wait" : "pointer", opacity: saving ? 0.6 : 1 }}>
              {saving ? "Saving..." : "Save Settings"}
            </button>
            {saved && <span style={{ color: "#2d7a3a", fontSize: "14px" }}>Saved successfully</span>}
          </div>
        </form>
      </div>

      <StatsManager />
      <CategoryManager />
    </div>
  );
}

function StatsManager() {
  const [stats, setStats] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const supabase = createBrowserSupabase();

  const load = async () => {
    const { data } = await supabase.from("stats").select("*").order("sort_order");
    setStats(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const values = { number: form.get("number") as string, label: form.get("label") as string, sort_order: parseInt(form.get("sort_order") as string) || 0 };
    if (editing) { await supabase.from("stats").update(values).eq("id", editing.id); } else { await supabase.from("stats").insert(values); }
    setEditing(null); load();
  };

  return (
    <div style={{ marginTop: "32px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 400, color: "#0b0c0f", marginBottom: "16px" }}>Homepage Stats</h2>
      <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e5e5e5", padding: "24px" }}>
        {stats.map((stat) => (
          <div key={stat.id as string} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 0", borderBottom: "1px solid #f5f4f1" }}>
            {editing?.id === stat.id ? (
              <form onSubmit={handleSave} style={{ display: "flex", gap: "8px", flex: 1 }}>
                <input name="number" defaultValue={stat.number as string} style={{ ...inputStyle, width: "80px" }} />
                <input name="label" defaultValue={stat.label as string} style={{ ...inputStyle, flex: 1 }} />
                <input name="sort_order" type="number" defaultValue={stat.sort_order as number} style={{ ...inputStyle, width: "60px" }} />
                <button type="submit" style={{ padding: "4px 12px", fontSize: "13px", backgroundColor: "#0b0c0f", color: "#fdfcf9", border: "none", borderRadius: "6px", cursor: "pointer" }}>Save</button>
                <button type="button" onClick={() => setEditing(null)} style={{ padding: "4px 12px", fontSize: "13px", border: "1px solid #e5e5e5", borderRadius: "6px", cursor: "pointer", backgroundColor: "#fff" }}>Cancel</button>
              </form>
            ) : (
              <>
                <span style={{ fontSize: "24px", fontWeight: 400, color: "#0b0c0f", width: "80px" }}>{stat.number as string}</span>
                <span style={{ flex: 1, fontSize: "14px", color: "#6f6f6f" }}>{stat.label as string}</span>
                <button onClick={() => setEditing(stat)} style={{ padding: "4px 12px", fontSize: "13px", border: "1px solid #e5e5e5", borderRadius: "6px", cursor: "pointer", backgroundColor: "#fff" }}>Edit</button>
                <button onClick={async () => { if (confirm("Delete?")) { await supabase.from("stats").delete().eq("id", stat.id); load(); } }} style={{ padding: "4px 12px", fontSize: "13px", border: "1px solid #ff9e9e", borderRadius: "6px", cursor: "pointer", backgroundColor: "#fff", color: "#ff9e9e" }}>Delete</button>
              </>
            )}
          </div>
        ))}
        <button onClick={() => { supabase.from("stats").insert({ number: "0+", label: "New Stat", sort_order: stats.length }).then(() => load()); }} style={{ marginTop: "16px", padding: "6px 16px", fontSize: "13px", border: "1px solid #e5e5e5", borderRadius: "6px", cursor: "pointer", backgroundColor: "#fff" }}>+ Add Stat</button>
      </div>
    </div>
  );
}

function CategoryManager() {
  const [categories, setCategories] = useState<Record<string, unknown>[]>([]);
  const supabase = createBrowserSupabase();

  const load = async () => {
    const { data } = await supabase.from("categories").select("*").order("type").order("sort_order");
    setCategories(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const toggle = async (id: string, field: string, current: boolean) => {
    await supabase.from("categories").update({ [field]: !current }).eq("id", id);
    load();
  };

  return (
    <div style={{ marginTop: "32px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 400, color: "#0b0c0f", marginBottom: "16px" }}>Categories</h2>
      <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e5e5e5", padding: "24px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e5e5e5" }}>
              <th style={{ textAlign: "left", padding: "8px 0", fontSize: "12px", fontWeight: 500, color: "#6f6f6f", textTransform: "uppercase" }}>Name</th>
              <th style={{ textAlign: "left", padding: "8px 0", fontSize: "12px", fontWeight: 500, color: "#6f6f6f", textTransform: "uppercase" }}>Type</th>
              <th style={{ textAlign: "center", padding: "8px 0", fontSize: "12px", fontWeight: 500, color: "#6f6f6f", textTransform: "uppercase" }}>Show on Homepage</th>
              <th style={{ textAlign: "right", padding: "8px 0", fontSize: "12px", fontWeight: 500, color: "#6f6f6f", textTransform: "uppercase" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id as string} style={{ borderBottom: "1px solid #f5f4f1" }}>
                <td style={{ padding: "8px 0", fontSize: "14px" }}>{cat.name as string}</td>
                <td style={{ padding: "8px 0", fontSize: "14px", color: "#6f6f6f" }}>{cat.type as string}</td>
                <td style={{ padding: "8px 0", textAlign: "center" }}>
                  <button onClick={() => toggle(cat.id as string, "show_on_homepage", cat.show_on_homepage as boolean)} style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "12px", border: "none", cursor: "pointer", backgroundColor: cat.show_on_homepage ? "#c1f89820" : "#f5f4f1", color: cat.show_on_homepage ? "#2d7a3a" : "#6f6f6f" }}>
                    {cat.show_on_homepage ? "Yes" : "No"}
                  </button>
                </td>
                <td style={{ padding: "8px 0", textAlign: "right" }}>
                  <button onClick={async () => { if (confirm("Delete category?")) { await supabase.from("categories").delete().eq("id", cat.id); load(); } }} style={{ padding: "4px 12px", fontSize: "13px", border: "1px solid #ff9e9e", borderRadius: "6px", cursor: "pointer", backgroundColor: "#fff", color: "#ff9e9e" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
