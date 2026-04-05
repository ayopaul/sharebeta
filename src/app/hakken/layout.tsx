"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { createBrowserSupabase } from "@/lib/supabase-browser";

const navItems = [
  { label: "Dashboard", href: "/hakken", icon: "◻" },
  { label: "Projects", href: "/hakken/projects", icon: "◼" },
  { label: "Blog", href: "/hakken/blog", icon: "✎" },
  { label: "Team", href: "/hakken/team", icon: "◉" },
  { label: "Services", href: "/hakken/services", icon: "⚙" },
  { label: "Settings", href: "/hakken/settings", icon: "☰" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createBrowserSupabase();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && pathname !== "/hakken/login") {
        router.replace("/hakken/login");
      } else {
        setUser(session?.user ?? null);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && pathname !== "/hakken/login") {
        router.replace("/hakken/login");
      }
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [pathname, router, supabase.auth]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#0b0c0f", color: "#bcbcbc" }}>
        Loading...
      </div>
    );
  }

  // Login page — no sidebar
  if (pathname === "/hakken/login") {
    return <>{children}</>;
  }

  if (!user) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f4f1" }}>
      {/* Sidebar */}
      <aside style={{
        width: "240px",
        backgroundColor: "#0b0c0f",
        color: "#fdfcf9",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 50,
      }}>
        <div style={{ padding: "24px 20px", borderBottom: "1px solid #262626" }}>
          <Link href="/hakken" style={{ color: "#fdfcf9", textDecoration: "none", fontSize: "18px", fontWeight: 600 }}>
            sharebeta
          </Link>
          <p style={{ color: "#6f6f6f", fontSize: "12px", marginTop: "4px" }}>Admin Panel</p>
        </div>

        <nav style={{ flex: 1, padding: "12px 0" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/hakken" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 20px",
                  color: isActive ? "#fdfcf9" : "#6f6f6f",
                  backgroundColor: isActive ? "#262626" : "transparent",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: 400,
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: "16px" }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "16px 20px", borderTop: "1px solid #262626" }}>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.replace("/hakken/login");
            }}
            style={{
              width: "100%",
              padding: "8px",
              backgroundColor: "transparent",
              border: "1px solid #262626",
              borderRadius: "8px",
              color: "#6f6f6f",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: "240px", padding: "32px" }}>
        {children}
      </main>
    </div>
  );
}
