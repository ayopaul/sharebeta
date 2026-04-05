"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const row1Logos = [
  { name: "Jaguar", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e6a3_Jaguar%20logo.png" },
  { name: "Land Rover", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e610_Land%20rover.svg" },
  { name: "AB InBev", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e152_610953326e72a0e7f2f4abe9_Logo-ABInbev-black%20(2).svg" },
  { name: "LG", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e6ae_LG-svg.svg" },
  { name: "Magnum", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/69b420a71cf1be9ebe0e43c4_magnum-logo-white.svg" },
  { name: "P&G", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e6ac_p%26g-black.svg" },
  { name: "Fujitsu", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e6be_fujitsu.svg" },
  { name: "Henkel", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e6ad_henkel-svg.svg" },
  { name: "3M", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e709_3m-logo.svg" },
  { name: "Grohe", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e6af_grohe-svg.svg" },
  { name: "BNP Paribas", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e150_Logo-BNPParibasFortis-black.svg" },
  { name: "Nike", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e14e_Logo-Nike-black.svg" },
  { name: "Microsoft", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e66f_microsoft.svg" },
];

const row2Logos = [
  { name: "Essity", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e66c_Essity.svg" },
  { name: "PepsiCo", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e6ff_pepsico_logo.webp" },
  { name: "HSBC", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e5e1_HDBC.svg" },
  { name: "Beiersdorf", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e6ab_beiersdorf.svg" },
  { name: "Chanel", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e5d6_Channel.svg" },
  { name: "Nestle", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e6c1_nestle-black.svg" },
  { name: "IKEA", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e6c0_ikea-black.svg" },
  { name: "Jaguar", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e6a3_Jaguar%20logo.png" },
  { name: "Nike", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e14e_Logo-Nike-black.svg" },
  { name: "AB InBev", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e152_610953326e72a0e7f2f4abe9_Logo-ABInbev-black%20(2).svg" },
  { name: "LG", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e6ae_LG-svg.svg" },
  { name: "Microsoft", src: "https://cdn.prod.website-files.com/68779f680660261925b3e0fd/68779f680660261925b3e66f_microsoft.svg" },
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
              justifyContent: "space-around",
              alignItems: "center",
              width: "180vw",
              display: "flex",
              marginLeft: "-25%",
            }}
          >
            {row1Logos.map((logo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`r1-${i}`}
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                style={{ filter: "invert()", objectFit: "contain", maxWidth: "100px", height: "60px", maxHeight: "30px" }}
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
              justifyContent: "space-around",
              alignItems: "center",
              width: "180vw",
              display: "flex",
            }}
          >
            {row2Logos.map((logo, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`r2-${i}`}
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                style={{ filter: "invert()", objectFit: "contain", maxWidth: "100px", height: "60px", maxHeight: "30px" }}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
