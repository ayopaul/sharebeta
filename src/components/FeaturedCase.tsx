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
    <>
      <style>{`
        .fc-section {
          background-color: #000; position: relative; z-index: 1;
          height: 80vh; min-height: 550px; max-height: 750px;
          display: flex; justify-content: space-between; align-items: center;
          padding: 0 3vw; overflow: hidden;
        }
        .fc-info {
          position: absolute; bottom: 0; left: 3vw;
          width: 30vw; max-width: 380px; padding-bottom: 60px;
          display: flex; flex-direction: column; gap: 30px; z-index: 10;
        }
        .fc-image {
          position: absolute; top: 50%; left: 55%;
          transform: translate(-50%, -50%);
          width: 35vw; max-height: 70vh; aspect-ratio: 4/3;
          border-radius: 16px; overflow: hidden;
          transition: opacity 300ms ease;
        }
        .fc-pills {
          position: absolute; right: 3vw; top: 50%;
          transform: translateY(-50%);
          display: flex; flex-direction: column; align-items: flex-end;
          gap: 12px; z-index: 10;
        }
        .fc-pill {
          color: #6f6f6f; cursor: pointer;
          border: 1px solid #404040; border-radius: 20px;
          padding: 8px 10px; font-size: 14px; font-weight: 400;
          line-height: 100%; background: transparent;
          transition: all 0.15s;
        }
        .fc-pill-active {
          color: #fdfcf9; border: none; padding: 1px;
          background: linear-gradient(90deg, #FFAC3E, #FB71A2, #F02800);
          border-radius: 20px;
        }
        .fc-pill-active span {
          display: block; background: #1b1b1b;
          border-radius: 19px; padding: 7px 9px;
          font-size: 14px; font-weight: 400; line-height: 100%;
        }
        @media (max-width: 768px) {
          .fc-section {
            height: auto; min-height: unset; max-height: unset;
            flex-direction: column; padding: 24px 5vw 40px;
          }
          .fc-pills {
            position: relative; right: auto; top: auto;
            transform: none; flex-direction: row; flex-wrap: wrap;
            align-items: center; justify-content: flex-start;
            padding: 0 0 16px; gap: 8px; order: 1;
          }
          .fc-pills-title { display: none; }
          .fc-image {
            position: relative; top: auto; left: auto;
            transform: none; width: 100%; max-height: 50vh;
            order: 2; aspect-ratio: 4/3;
          }
          .fc-info {
            position: relative; bottom: auto; left: auto;
            width: 100%; max-width: 100%; padding: 24px 0 0;
            order: 3;
          }
        }
      `}</style>
      <section className="fc-section">

        {/* Case image — center */}
        <div className="fc-image" style={{ background: activeCase.image }} />

        {/* Case info — bottom left */}
        <div className="fc-info">
          {/* Progress bar */}
          <div style={{ position: "relative", width: "100%", height: "3px", borderRadius: "2px", backgroundColor: "#262626" }}>
            <div style={{ height: "100%", borderRadius: "2px", backgroundImage: "linear-gradient(90deg, #FFAC3E, #FB71A2, #F02800)", width: `${progress}%`, transition: "width 50ms linear" }} />
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
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", gap: "16px", borderBottom: "1px solid #262626", padding: "2px 0 4px", color: "#bcbcbc", fontSize: "14px", fontWeight: 400 }}>
                <span style={{ color: "#6f6f6f", flexShrink: 0 }}>{row.label}</span>
                <span style={{ textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.value}</span>
              </div>
            ))}
          </div>

          <p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, lineHeight: "150%" }}>{activeCase.description}</p>

          <Link href="/projects" className="gradient-text" style={{ fontSize: "14px", textDecoration: "none" }}>
            View all projects →
          </Link>
        </div>

        {/* Industry pills — right column */}
        <div className="fc-pills">
          <p className="fc-pills-title" style={{ color: "#6f6f6f", fontSize: "18px", fontWeight: 300, lineHeight: "28px", marginBottom: "16px" }}>Cases by industry</p>

          {industries.map((ind, i) => {
            const matchingCaseIndex = cases.findIndex((c) => c.industry === ind);
            const isActive = activeCase.industry === ind;

            return isActive ? (
              <div key={ind} className="fc-pill-active" onClick={() => { setActiveIndex(matchingCaseIndex); setProgress(0); }} style={{ cursor: "pointer" }}>
                <span>{ind}</span>
              </div>
            ) : (
              <button
                key={ind}
                className="fc-pill"
                onClick={() => { if (matchingCaseIndex >= 0) { setActiveIndex(matchingCaseIndex); setProgress(0); } }}
                style={{ cursor: matchingCaseIndex >= 0 ? "pointer" : "default" }}
              >
                {ind}
              </button>
            );
          })}

          <button className="fc-pill" style={{ marginTop: "10px", cursor: "pointer" }}>
            + See more
          </button>
        </div>
      </section>
    </>
  );
}
