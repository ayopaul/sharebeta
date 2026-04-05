"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ProjectData {
  slug: string;
  title: string;
  category: string;
  client: string;
  location: string;
  description: string;
  image: string;
  result: string;
}

export default function FeaturedCase({ projects }: { projects: ProjectData[] }) {
  const cases = projects.map((p) => ({
    industry: p.category,
    client: p.client,
    location: p.location,
    service: p.category,
    metric: { label: "Result", value: p.result?.split(".")[0] || "—" },
    description: p.description,
    image: p.image || "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)",
  }));

  const industries = [...new Set(projects.map((p) => p.category))];
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 8000;
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / duration) * 100);
      if (elapsed >= duration) {
        elapsed = 0;
        setProgress(0);
        setActiveIndex((prev) => (prev + 1) % cases.length);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const activeCase = cases[activeIndex];

  return (
    <section style={{ backgroundColor: "#000", position: "relative", zIndex: 1, height: "90vh", minHeight: "600px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 3vw", overflow: "hidden" }}>

      {/* Case info — bottom left */}
      <div style={{ position: "absolute", bottom: 0, left: "3vw", width: "30vw", maxWidth: "380px", paddingBottom: "20px", display: "flex", flexDirection: "column", gap: "30px", zIndex: 10 }}>
        {/* Progress bar */}
        <div style={{ position: "relative", width: "100%", height: "3px", borderRadius: "2px", backgroundColor: "#262626" }}>
          <div style={{ height: "100%", borderRadius: "2px", backgroundImage: "linear-gradient(90deg, #b2fcff, #c3ff97)", width: `${progress}%`, transition: "width 50ms linear" }} />
        </div>

        {/* Client name */}
        <h3 style={{ color: "#fdfcf9", fontSize: "30px", fontWeight: 400, lineHeight: "40px" }}>{activeCase.client}</h3>

        {/* Data rows */}
        <div style={{ width: "100%" }}>
          {[
            { label: "Location", value: activeCase.location },
            { label: "Service", value: activeCase.service },
            { label: activeCase.metric.label, value: activeCase.metric.value },
          ].map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #262626", padding: "2px 0 4px", color: "#bcbcbc", fontSize: "14px", fontWeight: 400 }}>
              <span style={{ color: "#6f6f6f" }}>{row.label}</span>
              <span>{row.value}</span>
            </div>
          ))}
        </div>

        <p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, lineHeight: "150%" }}>{activeCase.description}</p>

        <Link href="/projects" style={{ color: "#6f6f6f", fontSize: "14px", textDecoration: "none" }}>
          View all projects →
        </Link>
      </div>

      {/* Case image — center */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "55vw", maxHeight: "70vh", aspectRatio: "4/3", borderRadius: "16px", overflow: "hidden", opacity: 1, transition: "opacity 300ms ease", background: activeCase.image }} />

      {/* Industry pills — right column */}
      <div style={{ position: "absolute", right: "3vw", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px", zIndex: 10 }}>
        <p style={{ color: "#6f6f6f", fontSize: "18px", fontWeight: 300, lineHeight: "28px", marginBottom: "16px" }}>Cases by industry</p>

        {industries.map((ind, i) => {
          const matchingCaseIndex = cases.findIndex((c) => c.industry === ind);
          const isActive = activeCase.industry === ind;

          return (
            <div key={ind} style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
              {/* Loader bars */}
              {matchingCaseIndex >= 0 && (
                <div style={{ display: "flex", gap: "6px", alignItems: "center", marginRight: "8px" }}>
                  {cases.filter((c) => c.industry === ind).map((_, j) => (
                    <div key={j} style={{
                      width: isActive && j === 0 ? "50px" : "40px",
                      height: "2px",
                      borderRadius: "4px",
                      background: isActive && j === 0 ? "linear-gradient(90deg, #b2fcff, #c3ff98)" : "#4d4d4d",
                    }} />
                  ))}
                </div>
              )}
              <button
                onClick={() => { if (matchingCaseIndex >= 0) { setActiveIndex(matchingCaseIndex); setProgress(0); } }}
                style={{
                  color: isActive ? "#bcbcbc" : "#6f6f6f",
                  cursor: matchingCaseIndex >= 0 ? "pointer" : "default",
                  border: "1px solid #404040",
                  borderRadius: "20px",
                  padding: "8px 10px",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "100%",
                  backgroundColor: isActive ? "#1b1b1b" : "transparent",
                  transition: "all 0.15s",
                }}
              >
                {ind}
              </button>
            </div>
          );
        })}

        <button style={{ color: "#6f6f6f", border: "1px solid #404040", borderRadius: "20px", padding: "8px 10px", fontSize: "14px", fontWeight: 400, backgroundColor: "transparent", cursor: "pointer", marginTop: "10px" }}>
          + See more
        </button>
      </div>
    </section>
  );
}
