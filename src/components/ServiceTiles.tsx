"use client";

import Link from "next/link";
import { useRef } from "react";

const SB_GRADIENT = "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)";
const SB_GRADIENT_HOVER = "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFB85C 0%, #FC8AB3 56.76%, #F04020 100%)";

const tiles = [
  {
    title: "Digital & Social Media",
    desc: "We manage your social media channels with smart targeting, reaching the right audience and personas.",
    bg: SB_GRADIENT,
    bgHover: SB_GRADIENT_HOVER,
  },
  {
    title: "Experiential & Events",
    desc: "Using creative ideas to immerse consumers in live experiences and activations that leave lasting impressions.",
    bg: SB_GRADIENT,
    bgHover: SB_GRADIENT_HOVER,
  },
  {
    title: "Web & Content Strategy",
    desc: "Website design that fulfills business goals, combined with storytelling that transforms brands.",
    bg: SB_GRADIENT,
    bgHover: SB_GRADIENT_HOVER,
  },
];

export default function ServiceTiles() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleEnter = (idx: number) => {
    if (!wrapperRef.current) return;
    const links = wrapperRef.current.querySelectorAll<HTMLElement>(".stile");
    links.forEach((el, i) => {
      if (i === idx) {
        el.style.opacity = "1";
        el.style.backgroundImage = tiles[i].bgHover;
      } else {
        el.style.opacity = "0.5";
      }
    });
  };

  const handleLeave = () => {
    if (!wrapperRef.current) return;
    const links = wrapperRef.current.querySelectorAll<HTMLElement>(".stile");
    links.forEach((el, i) => {
      el.style.opacity = "1";
      el.style.backgroundImage = tiles[i].bg;
    });
  };

  return (
    <div
      ref={wrapperRef}
      className="service-tiles-flex"
      style={{
        display: "flex",
        justifyContent: "space-between",
        columnGap: "8px",
        rowGap: "8px",
      }}
      onMouseLeave={handleLeave}
    >
      {tiles.map((tile, idx) => (
        <Link
          key={tile.title}
          href="/services"
          className="stile"
          style={{
            flex: "none",
            width: "25vw",
            minWidth: "300px",
            maxWidth: "413px",
            height: "29vw",
            minHeight: "400px",
            maxHeight: "480px",
            padding: "16px 16px 16px 18px",
            borderRadius: "16px",
            backgroundImage: tile.bg,
            backgroundSize: "100% 100%",
            backgroundPosition: "50%",
            transition: "all 0.15s",
            color: "#000",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            textDecoration: "none",
          }}
          onMouseEnter={() => handleEnter(idx)}
        >
          <div>
            <h2
              style={{
                fontSize: "40px",
                fontWeight: 400,
                lineHeight: "110%",
                width: "100%",
                whiteSpace: "normal",
                color: "#000",
                margin: 0,
              }}
            >
              {tile.title}
            </h2>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "150%",
                marginTop: "10px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(0,0,0,0.1)",
                paddingRight: "60px",
                color: "#000",
                textAlign: "justify",
              }}
            >
              {tile.desc}
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                border: "1px solid rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.12s",
                backgroundColor: "transparent",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M1 6.5h11m0 0L7 1.5m5 5L7 11.5"
                  stroke="#0b0c0f"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
