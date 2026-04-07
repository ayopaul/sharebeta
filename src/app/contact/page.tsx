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
        <h1 style={{ color: "#bcbcbc", fontWeight: 400, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: "110%", letterSpacing: "-0.012em", maxWidth: "800px" }}>
          Build your brand without borders.
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "25px", fontWeight: 300, lineHeight: "130%", maxWidth: "600px", marginTop: "24px" }}>
          No matter where you are, our team of creatives can work collaboratively to tell your brand story effectively.
        </p>
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
              <a href="https://www.linkedin.com/in/martin-uro-arpa-561a62b9/" target="_blank" rel="noopener noreferrer" style={{ color: "#0b0c0f", fontSize: "14px", textDecoration: "none" }}>Connect on LinkedIn</a>
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
              <a href="mailto:martin.uro@sharebetang.com" className="btn-arrow" style={{ display: "inline-block", backgroundColor: "#fff", color: "#0b0c0f", borderRadius: "50px", fontSize: "14px", fontWeight: 400, lineHeight: "100%", padding: "14px 40px 16px 18px", whiteSpace: "nowrap", border: "1px solid #0b0c0f", cursor: "pointer", textDecoration: "none", width: "fit-content" }}>
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
