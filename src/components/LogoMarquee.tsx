"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BUCKET = "https://nuxnfkinthnjrpgruomz.supabase.co/storage/v1/object/public/uploads/client%20logos";

const row1Logos = [
  { name: "Danone", src: `${BUCKET}/Danone-1.png` },
  { name: "Goldberg", src: `${BUCKET}/Goldberg.png` },
  { name: "Heineken", src: `${BUCKET}/Heineken.png` },
  { name: "Life", src: `${BUCKET}/Life.png` },
  { name: "MTN", src: `${BUCKET}/MTN.png` },
  { name: "NHS", src: `${BUCKET}/NHS.png` },
  { name: "Polo", src: `${BUCKET}/Polo.png` },
  { name: "Samsung", src: `${BUCKET}/Samsung.png` },
  { name: "Star", src: `${BUCKET}/Star.png` },
  { name: "Tiger Beer", src: `${BUCKET}/Tiger%20beer.png` },
  { name: "Zagg", src: `${BUCKET}/zagg.png` },
  { name: "Terraform", src: `${BUCKET}/Terraform%20restaurant%20and%20bar.png` },
];

const row2Logos = [
  { name: "Samsung", src: `${BUCKET}/Samsung.png` },
  { name: "NHS", src: `${BUCKET}/NHS.png` },
  { name: "Tiger Beer", src: `${BUCKET}/Tiger%20beer.png` },
  { name: "Danone", src: `${BUCKET}/Danone-1.png` },
  { name: "Star", src: `${BUCKET}/Star.png` },
  { name: "Heineken", src: `${BUCKET}/Heineken.png` },
  { name: "Zagg", src: `${BUCKET}/zagg.png` },
  { name: "MTN", src: `${BUCKET}/MTN.png` },
  { name: "Goldberg", src: `${BUCKET}/Goldberg.png` },
  { name: "Polo", src: `${BUCKET}/Polo.png` },
  { name: "Life", src: `${BUCKET}/Life.png` },
  { name: "Terraform", src: `${BUCKET}/Terraform%20restaurant%20and%20bar.png` },
];

/**
 * Exact bundl implementation:
 * - .logo-home-container: width 180vw, display flex, justify-content space-around, opacity 0.4
 * - .logo-home-carousel-logo: filter invert(), object-fit contain, max-width 100px, height 60px, max-height 30px
 * - Row 1 (.inversed): scroll-linked translateX 0 → -80vw
 * - Row 2: scroll-linked translateX 0 → +77vw
 * - .animated-logo-section: height 9vh, min-height 100px
 * - Logos are NOT duplicated in HTML. Single set per row.
 */

export default function LogoMarquee() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const row1X = useTransform(scrollYProgress, [0, 1], ["0vw", "-80vw"]);
  const row2X = useTransform(scrollYProgress, [0, 1], ["0vw", "77vw"]);

  return (
    <div ref={sectionRef} style={{ backgroundColor: "#000", position: "relative", zIndex: 1 }}>
      {/* Row 1 — .inversed, scrolls LEFT */}
      <section style={{ zIndex: 1, backgroundColor: "#000", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "9vh", minHeight: "100px", paddingTop: "10px", display: "flex", position: "relative" }}>
        <div style={{ textAlign: "center", flexFlow: "column", display: "flex", overflow: "hidden" }}>
          <motion.div
            style={{
              x: row1X,
              opacity: 0.4,
              justifyContent: "space-between",
              alignItems: "center",
              width: "180vw",
              display: "flex",
              marginLeft: "-25%",
              gap: "40px",
              paddingLeft: "40px",
              paddingRight: "40px",
            }}
          >
            {row1Logos.map((logo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`r1-${i}`}
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                style={{ objectFit: "contain", width: "120px", height: "60px", flexShrink: 0 }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Row 2 — scrolls RIGHT */}
      <section style={{ zIndex: 1, backgroundColor: "#000", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "9vh", minHeight: "100px", display: "flex", position: "relative", borderBottom: "1px solid #262626" }}>
        <div style={{ textAlign: "center", flexFlow: "column", display: "flex", overflow: "hidden", justifyContent: "center", alignItems: "flex-end" }}>
          <motion.div
            style={{
              x: row2X,
              opacity: 0.4,
              justifyContent: "space-between",
              alignItems: "center",
              width: "180vw",
              display: "flex",
              gap: "40px",
              paddingLeft: "40px",
              paddingRight: "40px",
            }}
          >
            {row2Logos.map((logo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`r2-${i}`}
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                style={{ objectFit: "contain", width: "120px", height: "60px", flexShrink: 0 }}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
