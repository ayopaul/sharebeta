"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import AdminTable from "@/components/admin/AdminTable";
import ImageUpload from "@/components/admin/ImageUpload";

const inputStyle: React.CSSProperties = { width: "100%", padding: "8px 12px", border: "1px solid #e5e5e5", borderRadius: "8px", fontSize: "14px", color: "#0b0c0f", outline: "none" };

export default function AdminTeam() {
  const [members, setMembers] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [image, setImage] = useState("");
  const supabase = createBrowserSupabase();

  const load = async () => {
    const { data } = await supabase.from("team_members").select("*").order("sort_order");
    setMembers(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const openForm = (row?: Record<string, unknown>) => {
    setEditing(row ?? null);
    setImage((row?.image as string) ?? "");
    setShowForm(true);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const values = {
      name: form.get("name") as string,
      role: form.get("role") as string,
      image,
      linkedin: form.get("linkedin") as string,
      sort_order: parseInt(form.get("sort_order") as string) || 0,
      active: form.get("active") === "on",
    };
    if (editing) {
      await supabase.from("team_members").update(values).eq("id", editing.id);
    } else {
      await supabase.from("team_members").insert(values);
    }
    setShowForm(false); setEditing(null); load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "30px", fontWeight: 400, color: "#0b0c0f" }}>Team Members</h1>
        <button onClick={() => openForm()} style={{ padding: "8px 20px", backgroundColor: "#0b0c0f", color: "#fdfcf9", border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>+ Add Member</button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e5e5e5", padding: "24px", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 400, marginBottom: "20px" }}>{editing ? "Edit Member" : "New Member"}</h2>
          <form onSubmit={handleSave}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Name</label><input name="name" defaultValue={(editing?.name as string) ?? ""} required style={inputStyle} /></div>
              <div><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Role</label><input name="role" defaultValue={(editing?.role as string) ?? ""} required style={inputStyle} /></div>
              <div style={{ gridColumn: "span 2" }}><ImageUpload value={image} onChange={setImage} label="Profile Photo" /></div>
              <div><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>LinkedIn URL</label><input name="linkedin" defaultValue={(editing?.linkedin as string) ?? ""} style={inputStyle} /></div>
              <div><label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>Sort Order</label><input name="sort_order" type="number" defaultValue={(editing?.sort_order as number) ?? 0} style={inputStyle} /></div>
              <div><label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#6f6f6f", cursor: "pointer" }}><input type="checkbox" name="active" defaultChecked={editing?.active !== false} />Active</label></div>
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <button type="submit" style={{ padding: "8px 24px", backgroundColor: "#0b0c0f", color: "#fdfcf9", border: "none", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>{editing ? "Update" : "Create"}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} style={{ padding: "8px 24px", backgroundColor: "#fff", color: "#0b0c0f", border: "1px solid #e5e5e5", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <AdminTable columns={[
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "sort_order", label: "Order" },
        { key: "active", label: "Status", render: (v) => <span style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "12px", backgroundColor: v ? "#c1f89820" : "#ff9e9e20", color: v ? "#2d7a3a" : "#d32f2f" }}>{v ? "Active" : "Inactive"}</span> },
      ]} data={members} onEdit={(row) => openForm(row)} onDelete={async (id) => { await supabase.from("team_members").delete().eq("id", id); load(); }} />
    </div>
  );
}
