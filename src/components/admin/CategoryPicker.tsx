"use client";

import { useEffect, useState, useRef } from "react";
import { createBrowserSupabase } from "@/lib/supabase-browser";

interface CategoryPickerProps {
  value: string;
  onChange: (value: string) => void;
  type: "blog" | "project" | "service";
  label?: string;
}

export default function CategoryPicker({ value, onChange, type, label = "Category" }: CategoryPickerProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const supabase = createBrowserSupabase();

  useEffect(() => {
    supabase.from("categories").select("name").eq("type", type).order("sort_order").then(({ data }) => {
      setCategories(data?.map((c: { name: string }) => c.name) ?? []);
    });
  }, [type, supabase]);

  useEffect(() => { setSearch(value); }, [value]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = categories.filter((c) => c.toLowerCase().includes(search.toLowerCase()));
  const isNew = search && !categories.includes(search);

  const select = async (name: string) => {
    onChange(name);
    setSearch(name);
    setOpen(false);

    // Save new category if it doesn't exist
    if (!categories.includes(name)) {
      await supabase.from("categories").upsert({ name, type }, { onConflict: "name" });
      setCategories([...categories, name]);
    }
  };

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>{label}</label>
      <input
        value={search}
        onChange={(e) => { setSearch(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder="Type or select..."
        style={{ width: "100%", padding: "8px 12px", border: "1px solid #e5e5e5", borderRadius: "8px", fontSize: "14px", color: "#0b0c0f", outline: "none" }}
      />

      {open && (filtered.length > 0 || isNew) && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, backgroundColor: "#fff", border: "1px solid #e5e5e5", borderRadius: "8px", marginTop: "4px", maxHeight: "200px", overflowY: "auto", zIndex: 50, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
          {filtered.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => select(cat)}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", border: "none", backgroundColor: cat === value ? "#f5f4f1" : "transparent", cursor: "pointer", fontSize: "14px", color: "#0b0c0f" }}
            >
              {cat}
            </button>
          ))}
          {isNew && (
            <button
              type="button"
              onClick={() => select(search)}
              style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", border: "none", backgroundColor: "transparent", cursor: "pointer", fontSize: "14px", color: "#2d7a3a", borderTop: "1px solid #f5f4f1" }}
            >
              + Create &quot;{search}&quot;
            </button>
          )}
        </div>
      )}
    </div>
  );
}
