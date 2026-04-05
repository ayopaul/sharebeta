"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import AdminTable from "@/components/admin/AdminTable";
import CategoryPicker from "@/components/admin/CategoryPicker";
import ImageUpload from "@/components/admin/ImageUpload";

const inputStyle: React.CSSProperties = { width: "100%", padding: "8px 12px", border: "1px solid #e5e5e5", borderRadius: "8px", fontSize: "14px", color: "#0b0c0f", outline: "none" };

export default function AdminProjects() {
  const [projects, setProjects] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [links, setLinks] = useState<{ label: string; url: string }[]>([]);
  const supabase = createBrowserSupabase();

  const load = async () => {
    const { data } = await supabase.from("projects").select("*").order("sort_order");
    setProjects(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const openForm = (row?: Record<string, unknown>) => {
    setEditing(row ?? null);
    setCategory((row?.category as string) ?? "");
    setImage((row?.image as string) ?? "");
    setLinks(Array.isArray(row?.external_links) ? row.external_links as { label: string; url: string }[] : []);
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const values = {
      title: form.get("title") as string,
      slug: (form.get("title") as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      category,
      year: form.get("year") as string,
      client: form.get("client") as string,
      location: form.get("location") as string,
      services: (form.get("services") as string).split(",").map((s) => s.trim()).filter(Boolean),
      description: form.get("description") as string,
      challenge: form.get("challenge") as string,
      strategy: form.get("strategy") as string,
      result: form.get("result") as string,
      image,
      external_links: links,
      published: form.get("published") === "on",
    };
    if (editing) {
      await supabase.from("projects").update(values).eq("id", editing.id);
    } else {
      await supabase.from("projects").insert(values);
    }
    setShowForm(false); setEditing(null); load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "30px", fontWeight: 400, color: "#0b0c0f" }}>Projects</h1>
        <button onClick={() => openForm()} style={{ padding: "8px 20px", backgroundColor: "#0b0c0f", color: "#fdfcf9", border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>+ Add Project</button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e5e5e5", padding: "24px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 400, marginBottom: "20px" }}>{editing ? "Edit Project" : "New Project"}</h2>
          <form onSubmit={handleSave}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Title</label><input name="title" defaultValue={(editing?.title as string) ?? ""} required style={inputStyle} /></div>
              <CategoryPicker value={category} onChange={setCategory} type="project" />
              <div><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Year</label><input name="year" defaultValue={(editing?.year as string) ?? new Date().getFullYear().toString()} required style={inputStyle} /></div>
              <div><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Client</label><input name="client" defaultValue={(editing?.client as string) ?? ""} required style={inputStyle} /></div>
              <div><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Location</label><input name="location" defaultValue={(editing?.location as string) ?? "Lagos"} required style={inputStyle} /></div>
              <div><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Services (comma separated)</label><input name="services" defaultValue={Array.isArray(editing?.services) ? (editing.services as string[]).join(", ") : ""} style={inputStyle} /></div>
              <div style={{ gridColumn: "span 2" }}><ImageUpload value={image} onChange={setImage} label="Project Image" /></div>
              <div style={{ gridColumn: "span 2" }}><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Description</label><textarea name="description" defaultValue={(editing?.description as string) ?? ""} required rows={3} style={{ ...inputStyle, resize: "vertical" }} /></div>
              <div style={{ gridColumn: "span 2" }}><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Challenge</label><textarea name="challenge" defaultValue={(editing?.challenge as string) ?? ""} rows={3} style={{ ...inputStyle, resize: "vertical" }} /></div>
              <div><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Strategy</label><textarea name="strategy" defaultValue={(editing?.strategy as string) ?? ""} rows={3} style={{ ...inputStyle, resize: "vertical" }} /></div>
              <div><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Result</label><textarea name="result" defaultValue={(editing?.result as string) ?? ""} rows={3} style={{ ...inputStyle, resize: "vertical" }} /></div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Preview Links</label>
                {links.map((link, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                    <input value={link.label} onChange={(e) => { const l = [...links]; l[i].label = e.target.value; setLinks(l); }} placeholder="Label (e.g. Instagram)" style={{ ...inputStyle, flex: 1 }} />
                    <input value={link.url} onChange={(e) => { const l = [...links]; l[i].url = e.target.value; setLinks(l); }} placeholder="URL" style={{ ...inputStyle, flex: 2 }} />
                    <button type="button" onClick={() => setLinks(links.filter((_, j) => j !== i))} style={{ padding: "4px 12px", border: "1px solid #ff9e9e", borderRadius: "6px", backgroundColor: "#fff", color: "#ff9e9e", cursor: "pointer", fontSize: "13px" }}>Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => setLinks([...links, { label: "", url: "" }])} style={{ padding: "6px 16px", fontSize: "13px", border: "1px solid #e5e5e5", borderRadius: "6px", cursor: "pointer", backgroundColor: "#fff" }}>+ Add Link</button>
              </div>
              <div><label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#6f6f6f", cursor: "pointer" }}><input type="checkbox" name="published" defaultChecked={editing?.published !== false} />Published</label></div>
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <button type="submit" style={{ padding: "8px 24px", backgroundColor: "#0b0c0f", color: "#fdfcf9", border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>{editing ? "Update" : "Create"}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} style={{ padding: "8px 24px", backgroundColor: "#fff", color: "#0b0c0f", border: "1px solid #e5e5e5", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <AdminTable columns={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "year", label: "Year" },
        { key: "published", label: "Status", render: (v) => <span style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "12px", backgroundColor: v ? "#c1f89820" : "#ff9e9e20", color: v ? "#2d7a3a" : "#d32f2f" }}>{v ? "Published" : "Draft"}</span> },
      ]} data={projects} onEdit={(row) => openForm(row)} onDelete={async (id) => { await supabase.from("projects").delete().eq("id", id); load(); }} />
    </div>
  );
}
