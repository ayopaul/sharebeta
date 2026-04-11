import AnimateOnScroll from "@/components/AnimateOnScroll";
import Link from "next/link";
import { getTeamMembers } from "@/lib/data";

const values = [
  { title: "Integrity", description: "Being honest and upholding firm moral principles." },
  { title: "Passion", description: "Being enthusiastic about our work and striving to succeed our goals." },
  { title: "Commitment", description: "Delivering high-quality work while constantly evolving." },
  { title: "Trust", description: "Helping colleagues and working efficiently as part of a team." },
  { title: "Care", description: "Expressing interest about each other and our clients' needs." },
];

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();
  return (
    <>
      {/* ===== Hero — 80vh ===== */}
      <section style={{ backgroundColor: "#000", height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 6vw", position: "relative", zIndex: 1 }}>
        <h1 style={{ color: "#bcbcbc", fontWeight: 400, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: "110%", letterSpacing: "-0.012em", textAlign: "center", maxWidth: "800px" }}>
          Innovation beyond the ordinary and into consumers&apos; lives
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "25px", fontWeight: 300, lineHeight: "130%", textAlign: "center", maxWidth: "600px", marginTop: "24px" }}>
          Quality at Sharebeta Standards.
        </p>
      </section>

      {/* ===== Who We Are — two-column ===== */}
      <section style={{ backgroundColor: "#000", padding: "5vw 6vw", position: "relative", zIndex: 1, borderTop: "1px solid #262626" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4vw" }}>
          <div style={{ flex: "1 1 300px" }}>
            <AnimateOnScroll>
              <p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, letterSpacing: "0.008em", marginBottom: "16px" }}>Who We Are</p>
              <h2 style={{ color: "#bcbcbc", fontWeight: 400, fontSize: "40px", lineHeight: "110%", margin: 0 }}>We Are Sharebeta</h2>
            </AnimateOnScroll>
          </div>
          <div style={{ flex: "1 1 400px" }}>
            <AnimateOnScroll delay={100}>
              <p style={{ color: "#6f6f6f", fontSize: "18px", fontWeight: 300, lineHeight: "28px" }}>
                We are an innovation driven T.T.L digital marketing communication consultants. We tell a compelling story for your brand to be experienced in a uniquely different style, working across all aspects of the marketing mix. We are wired to better your online results and give you value for your investment.
              </p>
              <p style={{ color: "#6f6f6f", fontSize: "18px", fontWeight: 300, lineHeight: "28px", marginTop: "24px" }}>
                Our team of young and highly innovative millennials specializes in demand generation strategies that deliver quality, quantifiable results.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ===== Vision & Mission — bordered cells ===== */}
      <section style={{ backgroundColor: "#000", padding: "0 6vw 5vw", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 400px", border: "1px solid #262626", padding: "4vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <AnimateOnScroll>
              <h3 style={{ color: "#bcbcbc", fontSize: "30px", fontWeight: 400, lineHeight: "40px", letterSpacing: "-0.008em", marginBottom: "16px" }}>Our Vision</h3>
              <p style={{ color: "#6f6f6f", fontSize: "16px", fontWeight: 400, lineHeight: "150%" }}>
                To become the leading strategic partner in the fields of Digital Marketing and Communication for businesses in Nigeria.
              </p>
            </AnimateOnScroll>
          </div>
          <div style={{ flex: "1 1 400px", border: "1px solid #262626", borderLeft: "none", padding: "4vw", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <AnimateOnScroll delay={100}>
              <h3 style={{ color: "#bcbcbc", fontSize: "30px", fontWeight: 400, lineHeight: "40px", letterSpacing: "-0.008em", marginBottom: "16px" }}>Our Mission</h3>
              <p style={{ color: "#6f6f6f", fontSize: "16px", fontWeight: 400, lineHeight: "150%" }}>
                To contribute to the definition and communication of our customers&apos; digital strategy by achieving measurable implementation of their goals and using best practices, methods and technologies.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ===== Values — Bundl-style: list left, staggered images right ===== */}
      <section style={{ backgroundColor: "#000", padding: "5vw 6vw", position: "relative", zIndex: 1, borderTop: "1px solid #262626" }}>
        <AnimateOnScroll>
          <h2 style={{ color: "#bcbcbc", fontWeight: 400, fontSize: "40px", lineHeight: "110%", marginBottom: "60px" }}>Our Values</h2>
        </AnimateOnScroll>
        <div style={{ display: "flex", gap: "6vw", alignItems: "center" }}>
          {/* Left: values list */}
          <div style={{ flex: "0 0 30%" }}>
            {values.map((v, i) => (
              <AnimateOnScroll key={v.title} delay={i * 60}>
                <div style={{ borderBottom: "1px solid #262626", paddingBottom: "24px", marginBottom: "24px" }}>
                  <h4 style={{ color: "#bcbcbc", fontSize: "20px", fontWeight: 400, lineHeight: "28px", marginBottom: "8px" }}>{v.title}</h4>
                  <p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, lineHeight: "150%" }}>{v.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Right: collage image */}
          <div style={{ flex: "1 1 auto" }}>
            <AnimateOnScroll>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://nuxnfkinthnjrpgruomz.supabase.co/storage/v1/object/public/uploads/sharebeta%20about%20us%20collage.webp" alt="Sharebeta team collage" style={{ width: "100%", maxHeight: "500px", borderRadius: "16px", objectFit: "contain" }} />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ===== Team ===== */}
      <section id="team" style={{ backgroundColor: "#000", padding: "5vw 6vw", position: "relative", zIndex: 1, borderTop: "1px solid #262626" }}>
        <AnimateOnScroll>
          <h2 style={{ color: "#bcbcbc", fontWeight: 400, fontSize: "40px", lineHeight: "110%", marginBottom: "40px" }}>Our Team</h2>
        </AnimateOnScroll>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px 20px" }}>
          {teamMembers.map((m: { name: string; role: string; image?: string; linkedin?: string }, i: number) => (
            <AnimateOnScroll key={m.name} delay={i * 40}>
              <div>
                {m.linkedin ? (
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: "block", cursor: "pointer" }}>
                    <div style={{ width: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", marginBottom: "12px", backgroundColor: "#1a1a1a" }}>
                      {m.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.image} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)", opacity: 0.3 }} />
                      )}
                    </div>
                  </a>
                ) : (
                  <div style={{ width: "100%", aspectRatio: "1/1", borderRadius: "10px", overflow: "hidden", marginBottom: "12px", backgroundColor: "#1a1a1a" }}>
                    {m.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.image} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)", opacity: 0.3 }} />
                    )}
                  </div>
                )}
                <p style={{ color: "#bcbcbc", fontSize: "16px", fontWeight: 400, lineHeight: "22px" }}>{m.name}</p>
                <p style={{ color: "#6f6f6f", fontSize: "13px", fontWeight: 400, lineHeight: "18px", marginTop: "2px" }}>{m.role}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ backgroundColor: "#000", position: "relative", zIndex: 1 }}>
        <div style={{ borderTop: "1px solid #262626", padding: "0 6vw", display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 400px", padding: "8vw 4vw 4vw 0" }}>
            <AnimateOnScroll>
              <h2 style={{ color: "#bcbcbc", fontWeight: 400, fontSize: "clamp(24px, 3vw, 40px)", lineHeight: "110%", marginBottom: "24px" }}>
                Want to work with us?
              </h2>
              <p style={{ color: "#6f6f6f", fontSize: "18px", fontWeight: 300, lineHeight: "28px", marginBottom: "32px" }}>
                We can help you define and communicate your brand story through effective marketing across all channels.
              </p>
              <Link href="/contact" className="btn-arrow" style={{ display: "inline-block", backgroundColor: "#fdfcf9", color: "#000", borderRadius: "50px", fontSize: "16px", fontWeight: 400, lineHeight: "100%", padding: "14px 40px 16px 18px", whiteSpace: "nowrap" }}>
                Contact Us
              </Link>
            </AnimateOnScroll>
          </div>
          <div style={{ flex: "1 1 400px", padding: "8vw 0 8vw 6vw", display: "flex", alignItems: "center" }}>
            <AnimateOnScroll delay={100}>
              <p style={{ color: "#6f6f6f", fontSize: "14px", marginBottom: "8px" }}>Get in touch</p>
              <p style={{ color: "#bcbcbc", fontSize: "18px" }}>Lagos, Nigeria</p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
