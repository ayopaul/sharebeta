"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-server";
import { createBrowserSupabase } from "@/lib/supabase-browser";

interface Counts {
  projects: number;
  blog: number;
  team: number;
  services: number;
}

const cards = [
  { label: "Projects", key: "projects" as const, href: "/hakken/projects", color: "#c5f7f9" },
  { label: "Blog Posts", key: "blog" as const, href: "/hakken/blog", color: "#c1f898" },
  { label: "Team Members", key: "team" as const, href: "/hakken/team", color: "#e0cbff" },
  { label: "Services", key: "services" as const, href: "/hakken/services", color: "#ffb98d" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>({ projects: 0, blog: 0, team: 0, services: 0 });
  const supabase = createBrowserSupabase();

  useEffect(() => {
    async function load() {
      const [p, b, t, s] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("team_members").select("id", { count: "exact", head: true }),
        supabase.from("services").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        projects: p.count ?? 0,
        blog: b.count ?? 0,
        team: t.count ?? 0,
        services: s.count ?? 0,
      });
    }
    load();
  }, [supabase]);

  return (
    <div>
      <h1 style={{ fontSize: "30px", fontWeight: 400, color: "#0b0c0f", marginBottom: "32px" }}>Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px", marginBottom: "40px" }}>
        {cards.map((card) => (
          <Link key={card.key} href={card.href} style={{ textDecoration: "none" }}>
            <div style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              padding: "24px",
              border: "1px solid #e5e5e5",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              <div style={{ width: "12px", height: "12px", borderRadius: "4px", backgroundColor: card.color, marginBottom: "16px" }} />
              <p style={{ color: "#6f6f6f", fontSize: "14px", marginBottom: "4px" }}>{card.label}</p>
              <p style={{ color: "#0b0c0f", fontSize: "36px", fontWeight: 400, lineHeight: 1 }}>{counts[card.key]}</p>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Link href="/hakken/settings" style={{ textDecoration: "none" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e5e5" }}>
            <p style={{ color: "#0b0c0f", fontSize: "18px", fontWeight: 400, marginBottom: "8px" }}>Site Settings</p>
            <p style={{ color: "#6f6f6f", fontSize: "14px" }}>Manage company info, contact details, and social links</p>
          </div>
        </Link>
        <Link href="/" target="_blank" style={{ textDecoration: "none" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "16px", padding: "24px", border: "1px solid #e5e5e5" }}>
            <p style={{ color: "#0b0c0f", fontSize: "18px", fontWeight: 400, marginBottom: "8px" }}>View Website</p>
            <p style={{ color: "#6f6f6f", fontSize: "14px" }}>Open the live website in a new tab</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
