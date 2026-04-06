"use client";

import { useRef, useState } from "react";
import Link from "next/link";

interface BlogPostData {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
}

const gradients = [
  "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)",
  "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)",
  "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)",
  "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)",
  "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)",
];

export default function KnowledgeHub({ blogPosts }: { blogPosts: BlogPostData[] }) {
  const allPosts = blogPosts.map((p, i) => ({
    topic: p.category,
    type: "Article",
    title: p.title,
    excerpt: p.excerpt,
    bg: p.image || gradients[i % gradients.length],
  }));
  const topics = [...new Set(blogPosts.map((p) => p.category))];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const posts = activeFilter ? allPosts.filter((p) => p.topic === activeFilter) : allPosts;

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector("a");
    const amount = card ? card.offsetWidth + 20 : 300;
    scrollRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section style={{ backgroundColor: "#e8e0d5", position: "relative", zIndex: 1, padding: "60px 0", overflow: "hidden" }}>
      <div className="kh-container" style={{ padding: "0 0 0 6vw" }}>
        {/* Heading */}
        <h3 style={{ color: "#0b0c0f", fontSize: "30px", fontWeight: 400, lineHeight: "40px", letterSpacing: "-0.008em", marginBottom: "0" }}>
          Knowledge and insights from our team
        </h3>

        {/* Two-column: pills left, cards right */}
        <div className="kh-layout" style={{ display: "flex", gap: "40px", justifyContent: "space-between", alignItems: "center", width: "100%", marginTop: "40px" }}>
          {/* Left: topic filter pills */}
          <div className="kh-pills" style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", zIndex: 10 }}>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveFilter(activeFilter === topic ? null : topic)}
                style={{
                  border: "1px solid #0b0c0f",
                  borderRadius: "50px",
                  padding: "7px 11px 8px",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "100%",
                  color: activeFilter === topic ? "#fdfcf9" : "#0b0c0f",
                  backgroundColor: activeFilter === topic ? "#0b0c0f" : "transparent",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Right: horizontally scrolling cards */}
          <div
            ref={scrollRef}
            className="hide-scrollbar"
            style={{ display: "flex", gap: "20px", overflowX: "scroll", overflowY: "hidden", paddingRight: "6vw", flex: "1 1 auto", WebkitOverflowScrolling: "touch" }}
          >
            {posts.map((post, i) => (
              <Link key={i} href="/blog" style={{ display: "block", flexShrink: 0, textDecoration: "none", color: "inherit" }}>
                <div
                  className="know-tile"
                  style={{
                    borderRadius: "16px",
                    border: "1px solid rgba(0,0,0,0.08)",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    background: post.bg,
                    backgroundPosition: "50%",
                    backgroundSize: "104% 104%",
                    width: "clamp(280px, 45vw, 750px)",
                    height: "clamp(250px, 22vw, 360px)",
                    padding: "16px 15px 16px 16px",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  {/* Text content */}
                  <div style={{ zIndex: 1, pointerEvents: "none", maxWidth: "80%", position: "relative" }}>
                    <span style={{
                      backgroundColor: "#000",
                      color: "#fdfcf9",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      borderRadius: "8px",
                      padding: "8px",
                      fontSize: "14px",
                      fontWeight: 400,
                      lineHeight: "100%",
                      display: "inline-block",
                    }}>
                      {post.type}
                    </span>
                    <h4 style={{ color: "#000", marginTop: "16px", fontSize: "24px", fontWeight: 400, lineHeight: "30px" }}>
                      {post.title}
                    </h4>
                  </div>

                  {/* Arrow button bottom-right */}
                  <div style={{
                    position: "absolute",
                    right: "16px",
                    bottom: "16px",
                    zIndex: 2,
                    backgroundColor: "#000",
                    borderRadius: "8px",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.2s",
                  }}>
                    <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
                      <path d="M1 6.5h11m0 0L7 1.5m5 5L7 11.5" stroke="#fdfcf9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation row */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "6px", marginTop: "20px", paddingRight: "6vw" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            {/* Prev arrow (flipped) */}
            <button
              onClick={() => scroll("left")}
              style={{
                backgroundColor: "#000",
                border: "none",
                borderRadius: "8px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transform: "rotateY(180deg)",
              }}
            >
              <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
                <path d="M1 6.5h11m0 0L7 1.5m5 5L7 11.5" stroke="#fdfcf9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Next arrow */}
            <button
              onClick={() => scroll("right")}
              style={{
                backgroundColor: "#000",
                border: "none",
                borderRadius: "8px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
                <path d="M1 6.5h11m0 0L7 1.5m5 5L7 11.5" stroke="#fdfcf9" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <Link href="/blog" style={{ color: "#0b0c0f", fontSize: "14px", textDecoration: "none", marginLeft: "20px", marginRight: "10px" }}>
            View all: Blog
          </Link>
        </div>
      </div>
    </section>
  );
}
