"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

/**
 * Exact idotive timing for 5 cards in 500vh:
 * - Animation runs from 18% to 75% of scroll (57% active range)
 * - Each card lifecycle ~15% of scroll = 75vh
 * - Enter: 9% (Y:50vh rotateX:-50 → Y:0 rotateX:0)
 * - Hold + blur clear: 5%
 * - Exit: 5% (Y:0 → Y:-132vh Z:-35vw blur:15px)
 *
 * For 6 cards in 600vh: scale proportionally
 * - Active range: 18% to 78% (60% active)
 * - Each card: ~12% of scroll = 72vh
 */

function ProjectCard({ project, index, total, scrollYProgress }: {
  project: Project;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useSpring>;
}) {

  // Map idotive's exact keyframe pattern
  // First card visible from 0-18%, exits 18-27%
  // Subsequent cards: enter over 9%, hold 5%, exit 5%, with 3% overlap with next
  const activeStart = 0.18;
  const cardSpan = 0.12; // 12% per card
  const isFirst = index === 0;
  const isLast = index === total - 1;

  // Card keyframe positions
  const enterStart = isFirst ? 0 : activeStart + (index - 1) * cardSpan + cardSpan * 0.6;
  const enterEnd = isFirst ? 0 : enterStart + cardSpan * 0.4;
  const exitStart = activeStart + index * cardSpan;
  const exitEnd = exitStart + cardSpan * 0.4;

  const y = useTransform(scrollYProgress,
    isFirst
      ? [0, exitStart, exitEnd]
      : isLast
        ? [enterStart, enterEnd, 1]
        : [enterStart, enterEnd, exitStart, exitEnd],
    isFirst
      ? ["0vh", "0vh", "-138vh"]
      : isLast
        ? ["50vh", "0vh", "0vh"]
        : ["50vh", "0vh", "0vh", "-132vh"]
  );

  const rotateX = useTransform(scrollYProgress,
    isFirst
      ? [0, exitStart]
      : [enterStart, enterEnd],
    isFirst
      ? [0, 0]
      : [-50, 0]
  );

  const z = useTransform(scrollYProgress,
    isFirst
      ? [0, exitStart, exitEnd]
      : isLast
        ? [enterStart, enterEnd, 1]
        : [enterStart, enterEnd, exitStart, exitEnd],
    isFirst
      ? ["0vw", "0vw", "-35vw"]
      : isLast
        ? ["-10vw", "0vw", "0vw"]
        : ["-10vw", "0vw", "0vw", "-35vw"]
  );

  const blur = useTransform(scrollYProgress,
    isFirst
      ? [0, exitStart, exitEnd]
      : isLast
        ? [enterStart, enterEnd, 1]
        : [enterStart, enterEnd, exitStart, exitEnd],
    isFirst
      ? [0, 0, 15]
      : isLast
        ? [15, 0, 0]
        : [15, 0, 0, 15]
  );

  const opacity = useTransform(scrollYProgress,
    isFirst
      ? [0, exitStart, exitEnd]
      : isLast
        ? [enterStart, enterStart + 0.02, 1]
        : [enterStart, enterStart + 0.02, exitStart, exitEnd],
    isFirst
      ? [1, 1, 0]
      : isLast
        ? [0, 1, 1]
        : [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        y,
        rotateX,
        translateZ: z,
        opacity,
        transformOrigin: "50% 100%",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div style={{ filter: useTransform(blur, (v) => `blur(${v}px)`) }}>
        <Link
          href={`/projects/${project.slug}`}
          style={{
            display: "block",
            textDecoration: "none",
            color: "inherit",
            width: "min(72.5rem, 90vw)",
            padding: "0 15px",
          }}
        >
          <div
            className="project-card"
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: "30px 30px 22px",
              overflow: "hidden",
            }}
          >
            <div style={{ borderRadius: "20px", overflow: "hidden", width: "100%", aspectRatio: "16/9" }}>
              <div
                className="project-card-image"
                style={{
                  width: "100%",
                  height: "100%",
                  background: project.image,
                  transition: "transform 0.78s ease",
                }}
              />
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "16px",
              gap: "16px",
            }}>
              <h3 style={{
                fontSize: "24px",
                fontWeight: 400,
                lineHeight: "141%",
                letterSpacing: "-1.15px",
                color: "#0b0c0f",
                margin: 0,
              }}>
                {project.title}
              </h3>
              <p style={{
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "163%",
                color: "#6f6f6f",
                flex: 1,
                maxWidth: "380px",
                textAlign: "right",
              }}>
                {project.description}
              </p>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectStack({ projects }: { projects: Project[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: rawProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smoothing matching Webflow IX2 smoothing: 95
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.0001,
  });

  return (
    <div
      ref={containerRef}
      style={{
        height: "600vh", // 500vh/5cards * 6cards = 600vh
        position: "relative",
        zIndex: 9,
        perspective: "1000px",
      }}
    >
      <div style={{
        position: "sticky",
        top: 0,
        height: "120vh",
        perspective: "1200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "96px",
        paddingBottom: "96px",
        overflow: "hidden",
      }}>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            total={projects.length}
            scrollYProgress={smoothProgress}
          />
        ))}
      </div>
    </div>
  );
}
