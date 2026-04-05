import AnimateOnScroll from "@/components/AnimateOnScroll";
import Link from "next/link";

const cities = ["Lagos", "Abuja", "Kano", "Port Harcourt", "Ibadan", "Kaduna", "Enugu", "Northern Nigeria"];

export default function FootprintPage() {
  return (
    <>
      {/* ===== DARK: Hero ===== */}
      <section style={{ backgroundColor: "#000", height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 6vw", position: "relative", zIndex: 1 }}>
        <h1 style={{ color: "#bcbcbc", fontWeight: 400, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: "110%", letterSpacing: "-0.012em", textAlign: "center", maxWidth: "800px" }}>
          Delivering Quality Outside and Inside Lagos
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "25px", fontWeight: 300, lineHeight: "130%", textAlign: "center", maxWidth: "600px", marginTop: "24px" }}>
          A few of the locations we&apos;ve delivered in with our ambitious partners
        </p>
      </section>

      {/* ===== LIGHT: Locations — animated city names ===== */}
      <section style={{ backgroundColor: "#fdfcf9", padding: "8vw 6vw 4vw", position: "relative", zIndex: 1 }}>
        <AnimateOnScroll>
          <h2 style={{ color: "#0b0c0f", fontWeight: 400, fontSize: "clamp(24px, 3vw, 40px)", lineHeight: "110%", marginBottom: "40px" }}>
            Our reach across Nigeria
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <p style={{ color: "#0b0c0f", fontSize: "clamp(20px, 2.5vw, 36px)", fontWeight: 400, lineHeight: "180%" }}>
            {cities.join(" \u00B7 ")}
          </p>
        </AnimateOnScroll>
      </section>

      {/* ===== LIGHT: Location cards grid ===== */}
      <section style={{ backgroundColor: "#fdfcf9", padding: "0 6vw 5vw", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "2vw", marginTop: "4vw" }}>
          {cities.slice(0, 4).map((city, i) => (
            <AnimateOnScroll key={city} delay={i * 60}>
              <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #e5e5e5" }}>
                <div style={{ width: "100%", height: "200px", background: "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)" }} />
                <div style={{ padding: "20px" }}>
                  <h3 style={{ color: "#0b0c0f", fontSize: "24px", fontWeight: 400, lineHeight: "30px" }}>{city}</h3>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* ===== LIGHT: CTA ===== */}
      <section style={{ backgroundColor: "#fdfcf9", position: "relative", zIndex: 1 }}>
        <div style={{ borderTop: "1px solid #e1e1e1", padding: "8vw 6vw", textAlign: "center" }}>
          <AnimateOnScroll>
            <h2 style={{ color: "#0b0c0f", fontWeight: 400, fontSize: "clamp(24px, 3vw, 40px)", lineHeight: "110%", marginBottom: "24px" }}>
              Ready to expand your reach?
            </h2>
            <Link href="/contact" className="btn-arrow" style={{ display: "inline-block", backgroundColor: "#000", color: "#fdfcf9", borderRadius: "50px", fontSize: "16px", fontWeight: 400, lineHeight: "100%", padding: "14px 40px 16px 18px", whiteSpace: "nowrap" }}>
              Contact Us
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
