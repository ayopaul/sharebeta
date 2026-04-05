"use client";

import AnimateOnScroll from "@/components/AnimateOnScroll";

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

      {/* ===== LIGHT: Contact person ===== */}
      <section style={{ backgroundColor: "#fdfcf9", padding: "5vw 6vw", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4vw", alignItems: "center" }}>
          <div style={{ flex: "0 0 auto" }}>
            <AnimateOnScroll>
              <div style={{ width: "180px", height: "180px", borderRadius: "50%", overflow: "hidden", background: "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)" }} />
            </AnimateOnScroll>
          </div>
          <div style={{ flex: "1 1 300px" }}>
            <AnimateOnScroll delay={100}>
              <p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, marginBottom: "8px" }}>Ask us anything!</p>
              <h2 style={{ color: "#0b0c0f", fontWeight: 400, fontSize: "40px", lineHeight: "110%", marginBottom: "16px" }}>Get in touch</h2>
              <p style={{ color: "#0b0c0f", fontSize: "18px", fontWeight: 400 }}>Lagos, Nigeria</p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ===== LIGHT: Contact form — split layout ===== */}
      <section style={{ backgroundColor: "#fdfcf9", position: "relative", zIndex: 1 }}>
        <div style={{ borderTop: "1px solid #e1e1e1", padding: "0 6vw", display: "flex", flexWrap: "wrap" }}>
          {/* Left — info */}
          <div style={{ flex: "1 1 400px", padding: "8vw 4vw 4vw 0", borderRight: "1px solid #e1e1e1" }}>
            <AnimateOnScroll>
              <h2 style={{ color: "#0b0c0f", fontWeight: 400, fontSize: "40px", lineHeight: "110%", marginBottom: "24px" }}>
                Drop us a message
              </h2>
              <p style={{ color: "rgba(11,12,15,0.5)", fontSize: "18px", fontWeight: 300, lineHeight: "28px" }}>
                Get in touch and we&apos;ll get back to you as soon as we can. We look forward to hearing from you!
              </p>
            </AnimateOnScroll>
          </div>
          {/* Right — form */}
          <div style={{ flex: "1 1 400px", padding: "8vw 0 8vw 6vw" }}>
            <AnimateOnScroll delay={100}>
              <form onSubmit={(e) => e.preventDefault()}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", color: "#6f6f6f", fontSize: "14px", marginBottom: "8px" }}>First Name</label>
                    <input type="text" style={{ width: "100%", backgroundColor: "rgba(0,0,0,0.04)", border: "none", borderRadius: "4px", padding: "12px 16px 16px", fontSize: "16px", color: "#0b0c0f", outline: "none" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", color: "#6f6f6f", fontSize: "14px", marginBottom: "8px" }}>Last Name</label>
                    <input type="text" style={{ width: "100%", backgroundColor: "rgba(0,0,0,0.04)", border: "none", borderRadius: "4px", padding: "12px 16px 16px", fontSize: "16px", color: "#0b0c0f", outline: "none" }} />
                  </div>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", color: "#6f6f6f", fontSize: "14px", marginBottom: "8px" }}>Email</label>
                  <input type="email" style={{ width: "100%", backgroundColor: "rgba(0,0,0,0.04)", border: "none", borderRadius: "4px", padding: "12px 16px 16px", fontSize: "16px", color: "#0b0c0f", outline: "none" }} />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", color: "#6f6f6f", fontSize: "14px", marginBottom: "8px" }}>Subject</label>
                  <input type="text" style={{ width: "100%", backgroundColor: "rgba(0,0,0,0.04)", border: "none", borderRadius: "4px", padding: "12px 16px 16px", fontSize: "16px", color: "#0b0c0f", outline: "none" }} />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", color: "#6f6f6f", fontSize: "14px", marginBottom: "8px" }}>Message</label>
                  <textarea rows={6} style={{ width: "100%", backgroundColor: "rgba(0,0,0,0.04)", border: "none", borderRadius: "4px", padding: "12px 16px 16px", fontSize: "16px", color: "#0b0c0f", outline: "none", resize: "none" }} />
                </div>
                <button type="submit" className="btn-arrow" style={{ marginTop: "40px", display: "inline-block", backgroundColor: "#000", color: "#fdfcf9", borderRadius: "50px", fontSize: "16px", fontWeight: 400, lineHeight: "100%", padding: "14px 40px 16px 18px", whiteSpace: "nowrap", border: "none", cursor: "pointer" }}>
                  Send Message
                </button>
              </form>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
