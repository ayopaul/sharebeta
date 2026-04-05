"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { createBrowserSupabase } from "@/lib/supabase-browser";

interface Project {
  slug: string;
  title: string;
  category: string;
  image: string;
}

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const width = useTransform(scrollYProgress, [0.19, 0.46, 0.69, 0.88], ["70%", "100%", "100%", "70%"]);

  return (
    <div ref={ref} style={{ display: "flex", justifyContent: "center" }}>
      <motion.div style={{ width, maxWidth: "100%" }}>
        <Link href={`/projects/${project.slug}`} style={{ display: "block", textDecoration: "none", position: "relative", borderRadius: "15px", overflow: "hidden", cursor: "pointer" }}>
          {/* Image */}
          <div style={{ width: "100%", aspectRatio: "16/9" }}>
            {project.image && (project.image.startsWith("/") || project.image.startsWith("http")) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", background: project.image || "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)" }} />
            )}
          </div>

          {/* Bottom gradient overlay */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(transparent, rgba(0,0,0,0.6))", pointerEvents: "none" }} />

          {/* Title */}
          <div style={{ position: "absolute", bottom: "3rem", left: 0, right: 0, zIndex: 5, textAlign: "center" }}>
            <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "30px", fontWeight: 400, lineHeight: "133%", letterSpacing: "-1.74px", color: "#fff", margin: 0 }}>
              {project.title}
            </h3>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const supabase = createBrowserSupabase();

  useEffect(() => {
    supabase.from("projects").select("slug, title, category, image").eq("published", true).order("sort_order").then(({ data }) => {
      const mapped = (data ?? []).map((p) => ({
        slug: p.slug as string,
        title: p.title as string,
        category: p.category as string,
        image: (p.image as string) || "",
      }));
      setProjects(mapped);
      setCategories([...new Set(mapped.map((p) => p.category))]);
    });
  }, [supabase]);

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#000", paddingTop: "180px", paddingBottom: "60px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", maxWidth: "544px", margin: "0 auto", padding: "0 15px" }}>
          <AnimateOnScroll>
            <p style={{ fontSize: "14px", fontWeight: 500, lineHeight: "143%", letterSpacing: "0.48px", textTransform: "uppercase", color: "#bcbcbc", marginBottom: "7px" }}>Portfolio</p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <h1 style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: "108%", fontWeight: 400, letterSpacing: "-2.32px", color: "#bcbcbc", margin: 0, fontFamily: "var(--font-playfair), serif" }}>Our Projects</h1>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Filter pills */}
      <section style={{ backgroundColor: "#000", padding: "0 6vw 40px", position: "relative", zIndex: 1 }}>
        <div className="hide-scrollbar" style={{ display: "flex", gap: "8px", overflowX: "auto", justifyContent: "center" }}>
          <button
            onClick={() => setActiveFilter("All")}
            style={{
              padding: "8px 16px", fontSize: "15px", fontWeight: 400, borderRadius: "100px", whiteSpace: "nowrap", cursor: "pointer", transition: "all 0.15s",
              border: activeFilter === "All" ? "1px solid transparent" : "1px solid #404040",
              backgroundColor: activeFilter === "All" ? "#fdfcf9" : "transparent",
              color: activeFilter === "All" ? "#0b0c0f" : "#6f6f6f",
            }}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: "8px 16px", fontSize: "15px", fontWeight: 400, borderRadius: "100px", whiteSpace: "nowrap", cursor: "pointer", transition: "all 0.15s",
                border: activeFilter === cat ? "1px solid transparent" : "1px solid #404040",
                backgroundColor: activeFilter === cat ? "#fdfcf9" : "transparent",
                color: activeFilter === cat ? "#0b0c0f" : "#6f6f6f",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Project cards — single column, scroll-animated width */}
      <section style={{ backgroundColor: "#000", padding: "0 15px 80px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
          {filtered.length === 0 && (
            <p style={{ textAlign: "center", color: "#6f6f6f", fontSize: "18px", padding: "80px 0" }}>No projects in this category yet.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: "#000", position: "relative", zIndex: 1 }}>
        <div style={{ borderTop: "1px solid #262626", padding: "8vw 6vw", textAlign: "center" }}>
          <AnimateOnScroll>
            <h2 style={{ color: "#bcbcbc", fontWeight: 400, fontSize: "40px", lineHeight: "110%", marginBottom: "24px" }}>Ready to start your next project?</h2>
            <Link href="/contact" className="btn-arrow" style={{ display: "inline-block", backgroundColor: "#fdfcf9", color: "#0b0c0f", borderRadius: "50px", fontSize: "16px", fontWeight: 400, lineHeight: "100%", padding: "14px 40px 16px 18px", whiteSpace: "nowrap" }}>Let&apos;s Talk</Link>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
