"use client";

import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";

interface Service {
  slug: string;
  title: string;
  tag: string;
  tag_color: string;
  subtitle: string;
  process: string[];
  output: string[];
  image: string;
}

const additionalServices = [
  "Above The Line (ATL)", "Below The Line (BTL)", "Web/Tech Solutions",
  "DTC Promotions", "Events Productions", "Hospitality", "Live Shows", "Brand Assets Fabrication",
];

export default function ServicesClient({ services }: { services: Service[] }) {
  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#000", height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 6vw", position: "relative", zIndex: 1 }}>
        <AnimateOnScroll>
          <h1 style={{ color: "#bcbcbc", fontWeight: 400, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: "110%", letterSpacing: "-0.012em", maxWidth: "800px" }}>
            There is a way for better marketing.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "25px", fontWeight: 300, lineHeight: "130%", maxWidth: "600px", marginTop: "24px" }}>
            We utilize all available channels to deliver the best measurable results for your business.
          </p>
        </AnimateOnScroll>
      </section>

      {/* Jump to a service */}
      <section style={{ backgroundColor: "#000", padding: "0 6vw 4vw", position: "relative", zIndex: 1 }}>
        <AnimateOnScroll>
        <p style={{ color: "#fdfcf9", fontSize: "16px", fontWeight: 400, lineHeight: "150%" }}>Jump to a service</p>
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {services.map((s) => (
            <button
              key={s.slug}
              onClick={() => {
                const el = document.getElementById(s.slug);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ display: "flex", alignItems: "center", color: "#fdfcf9", cursor: "pointer", border: "1.5px solid rgba(255,255,255,0.5)", borderRadius: "200px", marginBottom: "8px", marginRight: "8px", padding: "4px 10px", fontSize: "16px", fontWeight: 400, backgroundColor: "transparent", transition: "opacity 0.15s" }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.5"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              <div style={{ width: "12px", height: "12px", borderRadius: "20px", marginRight: "13px", backgroundColor: s.tag_color }} />
              {s.title}
            </button>
          ))}
        </div>
        </AnimateOnScroll>
      </section>

      {/* Service blocks */}
      <section style={{ backgroundColor: "#000", paddingTop: 0, paddingBottom: 0, position: "relative", zIndex: 1 }}>
        {services.map((s) => (
          <div key={s.slug} id={s.slug} style={{ display: "flex", borderBottom: "1px solid #262626", minHeight: "80vh" }}>
            <div style={{ width: "50%", position: "relative" }}>
              <div style={{ position: "sticky", top: "120px", padding: "3vw 10vw 16vh 6vw", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <AnimateOnScroll>
                  <div style={{ backgroundColor: s.tag_color, color: "#000", borderRadius: "8px", textTransform: "uppercase", padding: "3px 8px", fontSize: "14px", fontWeight: 400, display: "inline-flex", justifyContent: "center", alignItems: "center" }}>{s.tag}</div>
                  <h2 style={{ color: "#bcbcbc", fontWeight: 400, fontSize: "clamp(32px, 4vw, 56px)", lineHeight: "110%", marginTop: "20px", marginBottom: "20px" }}>{s.title}</h2>
                  <p style={{ color: "#bcbcbc", fontSize: "16px", fontWeight: 400, lineHeight: "150%", marginBottom: "40px" }}>{s.subtitle}</p>
                  <Link href="/contact" className="btn-arrow" style={{ display: "inline-block", border: "2px solid #bcbcbc", borderRadius: "100px", padding: "10px 34px 11px 16px", fontSize: "16px", fontWeight: 400, lineHeight: "100%", color: "#bcbcbc", backgroundColor: "transparent", whiteSpace: "nowrap", transition: "all 0.15s" }}>Book a call</Link>
                </AnimateOnScroll>
              </div>
            </div>
            <div style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ borderTop: "0.5px solid rgba(0,0,0,0.2)", marginBottom: "3vw", paddingTop: "3vw", paddingRight: "6vw" }}>
                <AnimateOnScroll>
                  <div style={{ width: "100%", height: "20vw", borderRadius: "16px", overflow: "hidden", background: "radial-gradient(185.59% 145.4% at 2.11% 98.35%, rgba(255,172,62,0.25) 0%, rgba(251,113,162,0.25) 56.76%, rgba(240,40,0,0.25) 100%)" }}>
                    {s.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.image} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    )}
                  </div>
                </AnimateOnScroll>
                <AnimateOnScroll>
                  <div style={{ border: "1px solid #262626", borderRadius: "16px", marginTop: "2vw", marginBottom: "2vw" }}>
                    <div style={{ borderBottom: "1px solid #262626", padding: "20px 24px" }}>
                      <h3 style={{ color: "#6f6f6f", fontSize: "20px", fontWeight: 400, lineHeight: "24px", marginBottom: "16px" }}>Process</h3>
                      <div style={{ color: "#fdfcf9", fontSize: "18px", fontWeight: 300, lineHeight: "28px" }}>
                        {(s.process as string[]).map((step: string, j: number) => <p key={j} style={{ marginBottom: "8px" }}>{j + 1}. {step}</p>)}
                      </div>
                    </div>
                    <div style={{ padding: "20px 24px" }}>
                      <h3 style={{ color: "#6f6f6f", fontSize: "20px", fontWeight: 400, lineHeight: "24px", marginBottom: "16px" }}>Output</h3>
                      <div style={{ color: "#fdfcf9", fontSize: "18px", fontWeight: 300, lineHeight: "28px" }}>
                        {(s.output as string[]).map((item: string, j: number) => <p key={j} style={{ marginBottom: "8px" }}>{j + 1}. {item}</p>)}
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Additional services */}
      <section style={{ backgroundColor: "#000", padding: "5vw 6vw", position: "relative", zIndex: 1 }}>
        <AnimateOnScroll>
          <h3 style={{ color: "#bcbcbc", fontWeight: 400, fontSize: "30px", lineHeight: "40px", textAlign: "center", marginBottom: "3vw" }}>We also specialize in</h3>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
            {additionalServices.map((s) => (
              <span key={s} style={{ padding: "8px 16px", border: "1px solid #262626", borderRadius: "100px", fontSize: "14px", color: "#6f6f6f", fontWeight: 400 }}>{s}</span>
            ))}
          </div>
        </AnimateOnScroll>
      </section>
    </>
  );
}
