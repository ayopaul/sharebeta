import AnimateOnScroll from "@/components/AnimateOnScroll";
import Link from "next/link";

const values = [
  { title: "Integrity", description: "Being honest and upholding firm moral principles." },
  { title: "Passion", description: "Being enthusiastic about our work and striving to succeed our goals." },
  { title: "Commitment", description: "Delivering high-quality work while constantly evolving." },
  { title: "Trust", description: "Helping colleagues and working efficiently as part of a team." },
  { title: "Care", description: "Expressing interest about each other and our clients' needs." },
];

const teamMembers = [
  { name: "Martin Uro", role: "CEO / MD" },
  { name: "Ifedayo Betiku", role: "Digital Lead" },
  { name: "Ayo Paul", role: "Data / Tech Lead" },
  { name: "Ifeoma Ezeh", role: "Account Manager" },
  { name: "Jason Cumming", role: "Creative / Strategy Consultant" },
  { name: "Ezekiel Abiodun", role: "Head of Finance / Admin" },
  { name: "Amarachi Judith", role: "Community Manager" },
  { name: "Moses Oluwatobi", role: "Art Director" },
  { name: "Uche David", role: "Senior UX Consultant" },
  { name: "Ebuka Okosa", role: "Art Director" },
  { name: "Chioma Ukwuoma", role: "Community Manager" },
  { name: "Ayonaike Adebowale", role: "Art Director" },
];

const capabilities = [
  "Social Media Marketing",
  "Experiential Marketing",
  "Search Engine Optimization",
  "Content Creation",
  "Web Design & Development",
  "Storytelling Advertising",
];

export default function AboutPage() {
  return (
    <>
      {/* ===== DARK: Hero — 80vh, centered text, no image ===== */}
      <section style={{ backgroundColor: "#000", height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 6vw", position: "relative", zIndex: 1 }}>
        <h1 style={{ color: "#bcbcbc", fontWeight: 400, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: "110%", letterSpacing: "-0.012em", textAlign: "center", maxWidth: "800px" }}>
          Innovation beyond the ordinary and into consumers&apos; lives
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "25px", fontWeight: 300, lineHeight: "130%", textAlign: "center", maxWidth: "600px", marginTop: "24px" }}>
          Quality at Sharebeta Standards.
        </p>
      </section>

      {/* ===== LIGHT: Who We Are — two-column ===== */}
      <section style={{ backgroundColor: "#fdfcf9", padding: "5vw 6vw", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4vw" }}>
          <div style={{ flex: "1 1 300px" }}>
            <AnimateOnScroll>
              <p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, letterSpacing: "0.008em", marginBottom: "16px" }}>Who We Are</p>
              <h2 style={{ color: "#0b0c0f", fontWeight: 400, fontSize: "40px", lineHeight: "110%", margin: 0 }}>We Are Sharebeta</h2>
            </AnimateOnScroll>
          </div>
          <div style={{ flex: "1 1 400px" }}>
            <AnimateOnScroll delay={100}>
              <p style={{ color: "rgba(11,12,15,0.5)", fontSize: "18px", fontWeight: 300, lineHeight: "28px" }}>
                We are an innovation driven T.T.L digital marketing communication consultants. We tell a compelling story for your brand to be experienced in a uniquely different style, working across all aspects of the marketing mix. We are wired to better your online results and give you value for your investment.
              </p>
              <p style={{ color: "rgba(11,12,15,0.5)", fontSize: "18px", fontWeight: 300, lineHeight: "28px", marginTop: "24px" }}>
                Our team of young and highly innovative millennials specializes in demand generation strategies that deliver quality, quantifiable results.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ===== LIGHT: Vision & Mission — bordered cells ===== */}
      <section style={{ backgroundColor: "#fdfcf9", padding: "0 6vw 5vw", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 400px", border: "1px solid #e5e5e5", padding: "4vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <AnimateOnScroll>
              <h3 style={{ color: "#0b0c0f", fontSize: "30px", fontWeight: 400, lineHeight: "40px", letterSpacing: "-0.008em", marginBottom: "16px" }}>Our Vision</h3>
              <p style={{ color: "rgba(11,12,15,0.5)", fontSize: "16px", fontWeight: 400, lineHeight: "150%" }}>
                To become the leading strategic partner in the fields of Digital Marketing and Communication for businesses in Nigeria.
              </p>
            </AnimateOnScroll>
          </div>
          <div style={{ flex: "1 1 400px", border: "1px solid #e5e5e5", borderLeft: "none", padding: "4vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <AnimateOnScroll delay={100}>
              <h3 style={{ color: "#0b0c0f", fontSize: "30px", fontWeight: 400, lineHeight: "40px", letterSpacing: "-0.008em", marginBottom: "16px" }}>Our Mission</h3>
              <p style={{ color: "rgba(11,12,15,0.5)", fontSize: "16px", fontWeight: 400, lineHeight: "150%" }}>
                To contribute to the definition and communication of our customers&apos; digital strategy by achieving measurable implementation of their goals and using best practices, methods and technologies.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ===== LIGHT: Capabilities — horizontal scroll ===== */}
      <section style={{ backgroundColor: "#fdfcf9", padding: "5vw 6vw", position: "relative", zIndex: 1 }}>
        <AnimateOnScroll>
          <h2 style={{ color: "#0b0c0f", fontWeight: 400, fontSize: "40px", lineHeight: "110%", marginBottom: "40px" }}>Our Capabilities</h2>
        </AnimateOnScroll>
        <div className="hide-scrollbar" style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
          {capabilities.map((cap, i) => (
            <AnimateOnScroll key={cap} delay={i * 60}>
              <div style={{ flex: "none", width: "280px", height: "200px", borderRadius: "16px", border: "1px solid #e5e5e5", padding: "24px", display: "flex", alignItems: "flex-end" }}>
                <p style={{ color: "#0b0c0f", fontSize: "20px", fontWeight: 400, lineHeight: "130%" }}>{cap}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* ===== LIGHT: Values — 4-column grid ===== */}
      <section style={{ backgroundColor: "#fdfcf9", padding: "5vw 6vw", position: "relative", zIndex: 1 }}>
        <AnimateOnScroll>
          <h2 style={{ color: "#0b0c0f", fontWeight: 400, fontSize: "40px", lineHeight: "110%", marginBottom: "40px" }}>Our Values</h2>
        </AnimateOnScroll>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1vw" }}>
          {values.map((v, i) => (
            <AnimateOnScroll key={v.title} delay={i * 60}>
              <div style={{ border: "1px solid #e5e5e5", borderRadius: "16px", padding: "24px", minHeight: "200px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <h4 style={{ color: "#0b0c0f", fontSize: "24px", fontWeight: 400, lineHeight: "30px", margin: 0 }}>{v.title}</h4>
                <p style={{ color: "rgba(11,12,15,0.5)", fontSize: "14px", fontWeight: 400, lineHeight: "150%", marginTop: "16px" }}>{v.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* ===== LIGHT: Team — grid with hover opacity cascade ===== */}
      <section style={{ backgroundColor: "#fdfcf9", padding: "5vw 6vw", position: "relative", zIndex: 1 }}>
        <AnimateOnScroll>
          <h2 style={{ color: "#0b0c0f", fontWeight: 400, fontSize: "40px", lineHeight: "110%", marginBottom: "40px" }}>Our Team</h2>
        </AnimateOnScroll>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "3vw 2vw" }}>
          {teamMembers.map((m, i) => (
            <AnimateOnScroll key={m.name} delay={i * 40}>
              <div className="group" style={{ cursor: "pointer" }}>
                <div style={{ width: "100%", aspectRatio: "1", borderRadius: "50%", border: "12px solid #0b0c0f", overflow: "hidden", marginBottom: "16px", background: "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)" }} />
                <p style={{ color: "#0b0c0f", fontSize: "18px", fontWeight: 400, lineHeight: "22px" }}>{m.name}</p>
                <p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, lineHeight: "21px", marginTop: "4px" }}>{m.role}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* ===== LIGHT: CTA ===== */}
      <section style={{ backgroundColor: "#fdfcf9", position: "relative", zIndex: 1 }}>
        <div style={{ borderTop: "1px solid #e1e1e1", borderBottom: "1px solid #e1e1e1", padding: "0 6vw", display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 400px", padding: "8vw 4vw 4vw 0" }}>
            <AnimateOnScroll>
              <h2 style={{ color: "#0b0c0f", fontWeight: 400, fontSize: "clamp(24px, 3vw, 40px)", lineHeight: "110%", marginBottom: "24px" }}>
                Want to work with us?
              </h2>
              <p style={{ color: "rgba(11,12,15,0.5)", fontSize: "18px", fontWeight: 300, lineHeight: "28px", marginBottom: "32px" }}>
                We can help you define and communicate your brand story through effective marketing across all channels.
              </p>
              <Link href="/contact" className="btn-arrow" style={{ display: "inline-block", backgroundColor: "#000", color: "#fdfcf9", borderRadius: "50px", fontSize: "16px", fontWeight: 400, lineHeight: "100%", padding: "14px 40px 16px 18px", whiteSpace: "nowrap" }}>
                Contact Us
              </Link>
            </AnimateOnScroll>
          </div>
          <div style={{ flex: "1 1 400px", padding: "8vw 0 8vw 6vw", display: "flex", alignItems: "center" }}>
            <AnimateOnScroll delay={100}>
              <p style={{ color: "#6f6f6f", fontSize: "14px", marginBottom: "8px" }}>Get in touch</p>
              <p style={{ color: "#0b0c0f", fontSize: "18px" }}>Lagos, Nigeria</p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
