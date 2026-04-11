"use client";

import { useState } from "react";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const gradients = [
  "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)",
  "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)",
  "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)",
  "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)",
  "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)",
];

type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
};

export default function BlogClient({ blogPosts }: { blogPosts: BlogPost[] }) {
  const [active, setActive] = useState("All");
  const categories = ["All", ...new Set(blogPosts.map((p) => p.category))];
  const filtered = active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active);

  return (
    <>
      <section style={{ backgroundColor: "#000", padding: "0 6vw 20px", position: "relative", zIndex: 1 }}>
        <div className="hide-scrollbar" style={{ display: "flex", gap: "4px", overflowX: "auto" }}>
          {categories.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                padding: "8px 16px",
                fontSize: "16px",
                fontWeight: 400,
                border: f === active ? "1px solid transparent" : "1px solid rgba(255,255,255,0.15)",
                borderRadius: "100px",
                backgroundColor: f === active ? "#fdfcf9" : "transparent",
                color: f === active ? "#0b0c0f" : "#fdfcf9",
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.075, 0.82, 0.165, 1)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: "#000", padding: "3vw 6vw 6vw", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", rowGap: "6vw", columnGap: "4vw" }}>
          {filtered.map((post, i) => (
            <AnimateOnScroll key={post.slug} delay={i * 60}>
              <Link href={`/blog/${post.slug}`} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <div className="know-tile" style={{ width: "100%", height: "23vw", maxHeight: "250px", borderRadius: "10px", overflow: "hidden", marginBottom: "16px", border: "1px solid rgba(255,255,255,0.1)", background: post.image || gradients[i % gradients.length], backgroundSize: "104%", backgroundPosition: "50%" }}>
                  {post.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ display: "inline-block", backgroundColor: "rgba(255,255,255,0.08)", color: "#fdfcf9", fontSize: "14px", fontWeight: 400, padding: "4px 12px", borderRadius: "50px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{post.category}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                </div>
                <h3 style={{ color: "#fdfcf9", fontSize: "24px", fontWeight: 400, lineHeight: "30px", marginBottom: "8px" }}>{post.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", fontWeight: 400, lineHeight: "150%" }}>{post.excerpt}</p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", marginTop: "12px" }}>By {post.author}</p>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
