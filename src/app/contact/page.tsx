"use client";

import AnimateOnScroll from "@/components/AnimateOnScroll";

const locations = [
  { city: "Lagos", address: "Lagos, Nigeria", image: "https://nuxnfkinthnjrpgruomz.supabase.co/storage/v1/object/public/uploads/locations/lagos.webp" },
  { city: "Abuja", address: "Abuja, Nigeria", image: "https://nuxnfkinthnjrpgruomz.supabase.co/storage/v1/object/public/uploads/locations/abuja.webp" },
  { city: "London", address: "London, United Kingdom", image: "https://nuxnfkinthnjrpgruomz.supabase.co/storage/v1/object/public/uploads/locations/london.webp" },
  { city: "Johannesburg", address: "Johannesburg, South Africa", image: "https://nuxnfkinthnjrpgruomz.supabase.co/storage/v1/object/public/uploads/locations/johannesburg.webp" },
];

export default function ContactPage() {
  return (
    <>
      {/* ===== DARK: Hero ===== */}
      <section style={{ backgroundColor: "#000", height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 6vw", position: "relative", zIndex: 1 }}>
        <AnimateOnScroll>
          <h1 style={{ color: "#bcbcbc", fontWeight: 400, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: "110%", letterSpacing: "-0.012em", maxWidth: "800px" }}>
            Build your brand without borders.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "25px", fontWeight: 300, lineHeight: "130%", maxWidth: "600px", marginTop: "24px" }}>
            No matter where you are, our team of creatives can work collaboratively to tell your brand story effectively.
          </p>
        </AnimateOnScroll>
      </section>

      {/* ===== LIGHT: Contact card — split layout ===== */}
      <section style={{ backgroundColor: "#000", position: "relative", zIndex: 1, padding: "0 6vw 6vw" }}>
        <AnimateOnScroll>
          <div style={{ backgroundColor: "#fdfcf9", borderRadius: "12px", display: "flex", flexWrap: "wrap", overflow: "hidden" }}>
            {/* Left — person */}
            <div style={{ flex: "1 1 340px", padding: "60px 40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", borderRight: "1px solid #e5e5e5" }}>
              <div style={{ width: "100px", height: "100px", borderRadius: "50%", overflow: "hidden", marginBottom: "24px", background: "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)" }}>
                <img src="https://nuxnfkinthnjrpgruomz.supabase.co/storage/v1/object/public/uploads/martin%20uro%20zoomed-2.webp" alt="Martin Uro" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <h3 style={{ color: "#0b0c0f", fontWeight: 400, fontSize: "32px", lineHeight: "120%", marginBottom: "6px" }}>Martin Uro</h3>
              <p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, marginBottom: "32px" }}>CEO</p>
              <p style={{ color: "#0b0c0f", fontWeight: 600, fontSize: "18px", marginBottom: "20px" }}>Ask me anything!</p>
              <a href="mailto:martin.uro@sharebetang.com" style={{ color: "#0b0c0f", fontSize: "14px", display: "block", marginBottom: "6px", textDecoration: "none" }}>martin.uro@sharebetang.com</a>
              <a href="https://www.linkedin.com/in/martin-uro-arpa-561a62b9/" target="_blank" rel="noopener noreferrer" style={{ color: "#0b0c0f", fontSize: "14px", textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: "4px" }}>Connect on LinkedIn</a>
              <hr style={{ border: "none", borderTop: "1px solid #e5e5e5", width: "100%", margin: "16px 0" }} />
              <a
                href="https://www.instagram.com/sharebeta/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "14px", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px", color: "#0b0c0f", transition: "all 0.3s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(90deg, #FFAC3E, #FB71A2, #F02800)";
                  e.currentTarget.style.backgroundClip = "text";
                  e.currentTarget.style.webkitBackgroundClip = "text";
                  e.currentTarget.style.color = "transparent";
                  const svg = e.currentTarget.querySelector("svg");
                  if (svg) svg.style.fill = "#FB71A2";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.color = "#0b0c0f";
                  const svg = e.currentTarget.querySelector("svg");
                  if (svg) svg.style.fill = "currentColor";
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ transition: "fill 0.3s", flexShrink: 0 }}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Follow on Instagram
              </a>
            </div>
            {/* Right — strategy call */}
            <div style={{ flex: "1 1 340px", padding: "60px 50px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, marginBottom: "10px" }}>20 minutes of your time</p>
              <h2 style={{ color: "#0b0c0f", fontWeight: 400, fontSize: "40px", lineHeight: "110%", marginBottom: "36px" }}>Schedule a strategy call.</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 44px 0", display: "flex", flexDirection: "column", gap: "14px" }}>
                {["Introduction", "Spot opportunities", "Challenge discussion", "Discuss synergies"].map((item) => (
                  <li key={item} style={{ color: "#0b0c0f", fontSize: "18px", fontWeight: 500, display: "flex", alignItems: "center", gap: "10px" }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10.5L8 14.5L16 5.5" stroke="#0b0c0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="mailto:martin.uro@sharebetang.com" className="btn-arrow-black" style={{ display: "inline-block", backgroundColor: "#fff", color: "#0b0c0f", borderRadius: "50px", fontSize: "14px", fontWeight: 400, lineHeight: "100%", padding: "14px 40px 16px 18px", whiteSpace: "nowrap", border: "1px solid #0b0c0f", cursor: "pointer", textDecoration: "none", width: "fit-content" }}>
                Book a call
              </a>
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* ===== DARK: Locations ===== */}
      <section style={{ backgroundColor: "#000", position: "relative", zIndex: 1, padding: "6vw 6vw 8vw" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "40px 40px" }}>
          {locations.map((loc, i) => (
            <AnimateOnScroll key={loc.city} delay={i * 100}>
              <div>
                <div style={{
                  width: "100%",
                  aspectRatio: "3.5 / 1",
                  borderRadius: "4px",
                  overflow: "hidden",
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}>
                  <img
                    src={loc.image}
                    alt={loc.city}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <h3 style={{ color: "#fdfcf9", fontWeight: 400, fontSize: "18px", lineHeight: "120%", marginTop: "16px" }}>
                  {loc.city}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", fontWeight: 300, marginTop: "4px" }}>
                  {loc.address}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>
    </>
  );
}
