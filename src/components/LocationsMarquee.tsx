"use client";

/**
 * Exact bundl implementation:
 * - 3 rows of city names, each row has content duplicated 3x for seamless loop
 * - Row 1: translateX 0% → -200% in 120s (left)
 * - Row 2: translateX -200% → 0% in 150s (right)
 * - Row 3: translateX 0% → -200% in 57s (left, faster)
 * - .animation-location-name: color #bcbcbc, font-size 5vw, font-weight 400
 * - Hover: yellow gradient sweep via ::before pseudo-element
 * - .location-row-text-container: min-width 200%, max-width 200%, display flex, justify-content space-around
 * - .location-rows: min-height 7vw, margin 1vw top/bottom
 */

const row1Cities = ["Lagos", "Abuja", "London", "Port Harcourt", "Johannesburg", "Kaduna", "Cape Town"];
const row2Cities = ["Manchester", "Lagos", "Abuja", "Durban", "Port Harcourt", "Ibadan", "Birmingham"];
const row3Cities = ["Pretoria", "Kano", "Lagos", "Enugu", "London", "Port Harcourt", "Johannesburg"];

function CityRow({
  cities,
  animationName,
  duration,
}: {
  cities: string[];
  animationName: string;
  duration: string;
}) {
  return (
    <div style={{ minHeight: "7vw", marginTop: "1vw", marginBottom: "1vw", transform: "translate(0)" }}>
      <div style={{ alignItems: "center", fontSize: "5vw", display: "flex", overflow: "hidden", minHeight: "7vw" }}>
        {/* 3 copies for seamless loop */}
        {[0, 1, 2].map((copy) => (
          <div
            key={copy}
            className={animationName}
            style={{
              justifyContent: "space-around",
              minWidth: "200%",
              maxWidth: "200%",
              display: "flex",
              gap: "4vw",
              position: "relative",
              animation: `${animationName} ${duration} linear infinite`,
            }}
          >
            {cities.map((city, i) => (
              <span key={`${copy}-${i}`} className="location-city">
                {city}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LocationsMarquee() {
  return (
    <section
      style={{
        backgroundColor: "#fdfcf9",
        padding: "4vw 0 4vw",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
        width: "100%",
      }}
    >
      {/* Heading */}
      <div style={{ padding: "0 6vw", marginBottom: "4vw" }}>
        <h2 style={{ color: "#0b0c0f", fontWeight: 400, lineHeight: "110%", letterSpacing: "-0.012em", fontSize: "clamp(28px, 4vw, 40px)", marginBottom: "16px" }}>
          Delivering quality across the world
        </h2>
        <p style={{ color: "#6f6f6f", fontSize: "clamp(14px, 2vw, 20px)", fontWeight: 400, lineHeight: "130%", opacity: 0.4 }}>
          A few of the locations we&apos;ve delivered in with our ambitious partners
        </p>
      </div>

      {/* 3 rows */}
      <CityRow cities={row1Cities} animationName="locLeft" duration="120s" />
      <CityRow cities={row2Cities} animationName="locRight" duration="150s" />
      <CityRow cities={row3Cities} animationName="locLeftFast" duration="57s" />
    </section>
  );
}
