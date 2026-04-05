"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import AdminTable from "@/components/admin/AdminTable";

const inputStyle: React.CSSProperties = { width: "100%", padding: "8px 12px", border: "1px solid #e5e5e5", borderRadius: "8px", fontSize: "14px", color: "#0b0c0f", outline: "none" };

export default function AdminServices() {
  const [services, setServices] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const supabase = createBrowserSupabase();

  const load = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    setServices(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const values = {
      title: form.get("title") as string,
      slug: (form.get("title") as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      tag: form.get("tag") as string,
      tag_color: form.get("tag_color") as string,
      subtitle: form.get("subtitle") as string,
      process: JSON.parse(form.get("process") as string || "[]"),
      output: JSON.parse(form.get("output") as string || "[]"),
      sort_order: parseInt(form.get("sort_order") as string) || 0,
      published: form.get("published") === "on",
    };
    if (editing) {
      await supabase.from("services").update(values).eq("id", editing.id);
    } else {
      await supabase.from("services").insert(values);
    }
    setShowForm(false); setEditing(null); load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "30px", fontWeight: 400, color: "#0b0c0f" }}>Services</h1>
        <button onClick={() => { setEditing(null); setShowForm(true); }} style={{ padding: "8px 20px", backgroundColor: "#0b0c0f", color: "#fdfcf9", border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>+ Add Service</button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e5e5e5", padding: "24px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 400, marginBottom: "20px" }}>{editing ? "Edit Service" : "New Service"}</h2>
          <form onSubmit={handleSave}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Title</label><input name="title" defaultValue={(editing?.title as string) ?? ""} required style={inputStyle} /></div>
              <div><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Tag (e.g. Ongoing)</label><input name="tag" defaultValue={(editing?.tag as string) ?? ""} required style={inputStyle} /></div>
              <div><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Tag Color</label><input name="tag_color" type="color" defaultValue={(editing?.tag_color as string) ?? "#c5f7f9"} style={{ ...inputStyle, height: "40px" }} /></div>
              <div><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Sort Order</label><input name="sort_order" type="number" defaultValue={(editing?.sort_order as number) ?? 0} style={inputStyle} /></div>
              <div style={{ gridColumn: "span 2" }}><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Subtitle</label><textarea name="subtitle" defaultValue={(editing?.subtitle as string) ?? ""} required rows={2} style={{ ...inputStyle, resize: "vertical" }} /></div>
              <div><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Process (JSON array)</label><textarea name="process" defaultValue={JSON.stringify(editing?.process ?? [], null, 2)} rows={5} style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "13px" }} /></div>
              <div><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Output (JSON array)</label><textarea name="output" defaultValue={JSON.stringify(editing?.output ?? [], null, 2)} rows={5} style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "13px" }} /></div>
              <div><label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#6f6f6f", cursor: "pointer" }}><input type="checkbox" name="published" defaultChecked={editing?.published !== false} />Published</label></div>
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <button type="submit" style={{ padding: "8px 24px", backgroundColor: "#0b0c0f", color: "#fdfcf9", border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>{editing ? "Update" : "Create"}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} style={{ padding: "8px 24px", backgroundColor: "#fff", color: "#0b0c0f", border: "1px solid #e5e5e5", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <AdminTable
        columns={[
          { key: "title", label: "Title" },
          { key: "tag", label: "Tag" },
          { key: "tag_color", label: "Color", render: (v) => <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><div style={{ width: "16px", height: "16px", borderRadius: "4px", backgroundColor: v as string }} />{v as string}</div> },
          { key: "sort_order", label: "Order" },
          { key: "published", label: "Status", render: (v) => <span style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "12px", backgroundColor: v ? "#c1f89820" : "#ff9e9e20", color: v ? "#2d7a3a" : "#d32f2f" }}>{v ? "Published" : "Draft"}</span> },
        ]}
        data={services}
        onEdit={(row) => { setEditing(row); setShowForm(true); }}
        onDelete={async (id) => { await supabase.from("services").delete().eq("id", id); load(); }}
      />
    </div>
  );
}
