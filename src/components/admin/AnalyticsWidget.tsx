"use client";

import { useEffect, useState } from "react";

interface AnalyticsData {
  overview: {
    users: number;
    sessions: number;
    pageViews: number;
    avgDuration: number;
    bounceRate: number;
  };
  topPages: { path: string; views: number; users: number }[];
  daily: { date: string; users: number; sessions: number }[];
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}m ${s}s`;
}

export default function AnalyticsWidget() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch(() => setError("Failed to load analytics"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e5e5e5", padding: "24px" }}>
        <p style={{ color: "#6f6f6f", fontSize: "14px" }}>Loading analytics...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e5e5e5", padding: "24px" }}>
        <p style={{ color: "#d32f2f", fontSize: "14px" }}>{error || "No data available"}</p>
      </div>
    );
  }

  const maxUsers = Math.max(...data.daily.map((d) => d.users), 1);

  const statCards = [
    { label: "Visitors", value: data.overview.users.toLocaleString(), color: "#c5f7f9" },
    { label: "Sessions", value: data.overview.sessions.toLocaleString(), color: "#c1f898" },
    { label: "Page Views", value: data.overview.pageViews.toLocaleString(), color: "#e0cbff" },
    { label: "Avg. Duration", value: formatDuration(data.overview.avgDuration), color: "#ffb98d" },
    { label: "Bounce Rate", value: `${Math.round(data.overview.bounceRate * 100)}%`, color: "#ff9e9e" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 400, color: "#0b0c0f" }}>Analytics</h2>
        <span style={{ fontSize: "13px", color: "#6f6f6f" }}>Last 30 days</span>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px" }}>
        {statCards.map((s) => (
          <div key={s.label} style={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e5e5e5", padding: "16px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "3px", backgroundColor: s.color, marginBottom: "10px" }} />
            <p style={{ color: "#6f6f6f", fontSize: "12px", marginBottom: "2px" }}>{s.label}</p>
            <p style={{ color: "#0b0c0f", fontSize: "24px", fontWeight: 400, lineHeight: 1 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Daily visitors chart */}
      <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e5e5e5", padding: "20px" }}>
        <p style={{ color: "#6f6f6f", fontSize: "13px", marginBottom: "16px" }}>Daily Visitors (14 days)</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "120px" }}>
          {data.daily.map((d) => (
            <div key={d.date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%" }}>
              <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                <div
                  style={{
                    width: "100%",
                    height: `${Math.max((d.users / maxUsers) * 100, 4)}%`,
                    backgroundColor: "#0b0c0f",
                    borderRadius: "3px 3px 0 0",
                    transition: "height 0.3s",
                  }}
                  title={`${d.users} visitors`}
                />
              </div>
              <span style={{ fontSize: "10px", color: "#6f6f6f", whiteSpace: "nowrap" }}>{d.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top pages */}
      <div style={{ backgroundColor: "#fff", borderRadius: "16px", border: "1px solid #e5e5e5", padding: "20px" }}>
        <p style={{ color: "#6f6f6f", fontSize: "13px", marginBottom: "12px" }}>Top Pages</p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", fontSize: "11px", color: "#999", fontWeight: 500, padding: "4px 0", borderBottom: "1px solid #f0f0f0" }}>Page</th>
              <th style={{ textAlign: "right", fontSize: "11px", color: "#999", fontWeight: 500, padding: "4px 0", borderBottom: "1px solid #f0f0f0" }}>Views</th>
              <th style={{ textAlign: "right", fontSize: "11px", color: "#999", fontWeight: 500, padding: "4px 0", borderBottom: "1px solid #f0f0f0" }}>Users</th>
            </tr>
          </thead>
          <tbody>
            {data.topPages.map((page) => (
              <tr key={page.path}>
                <td style={{ padding: "6px 0", fontSize: "13px", color: "#0b0c0f", borderBottom: "1px solid #f5f5f5" }}>{page.path}</td>
                <td style={{ padding: "6px 0", fontSize: "13px", color: "#0b0c0f", textAlign: "right", borderBottom: "1px solid #f5f5f5" }}>{page.views}</td>
                <td style={{ padding: "6px 0", fontSize: "13px", color: "#6f6f6f", textAlign: "right", borderBottom: "1px solid #f5f5f5" }}>{page.users}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
