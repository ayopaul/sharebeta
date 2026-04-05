import AnimateOnScroll from "@/components/AnimateOnScroll";
import Link from "next/link";
import { getTeamMembers } from "@/lib/data";

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  const stats = [
    { number: String(teamMembers.length), label: "Team Members" },
    { number: "5+", label: "Years Experience" },
    { number: "3+", label: "Departments" },
  ];

  return (
    <>
      <section style={{ backgroundColor: "#000", height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 6vw", position: "relative", zIndex: 1 }}>
        <h1 style={{ color: "#bcbcbc", fontWeight: 400, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: "110%", letterSpacing: "-0.012em", textAlign: "center", maxWidth: "800px" }}>Comprised of genuinely gifted minds</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "25px", fontWeight: 300, lineHeight: "130%", textAlign: "center", maxWidth: "600px", marginTop: "24px" }}>Our team is our greatest asset</p>
      </section>

      <section style={{ backgroundColor: "#fdfcf9", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", height: "200px" }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", borderTop: "1px solid #e5e5e5", borderBottom: "1px solid #e5e5e5", borderRight: i < stats.length - 1 ? "1px solid #e5e5e5" : "none" }}>
              <div style={{ color: "#0b0c0f", fontSize: "48px", fontWeight: 400, lineHeight: "100%" }}>{s.number}</div>
              <div style={{ color: "#6f6f6f", fontSize: "16px", fontWeight: 400, lineHeight: "150%", marginTop: "8px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: "#fdfcf9", padding: "5vw 6vw", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "3vw 2vw" }}>
          {teamMembers.map((m: { name: string; role: string; image: string }, i: number) => (
            <AnimateOnScroll key={m.name} delay={i * 40}>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: "100%", maxWidth: "240px", aspectRatio: "1", margin: "0 auto 16px", borderRadius: "50%", border: "16px solid #0b0c0f", overflow: "hidden", background: m.image || "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)" }}>
                  {m.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.image} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                </div>
                <p style={{ color: "#0b0c0f", fontSize: "18px", fontWeight: 400, lineHeight: "22px" }}>{m.name}</p>
                <p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, lineHeight: "21px", marginTop: "4px" }}>{m.role}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: "#fdfcf9", padding: "5vw 6vw", textAlign: "center", position: "relative", zIndex: 1 }}>
        <AnimateOnScroll>
          <h2 style={{ color: "#0b0c0f", fontWeight: 400, fontSize: "40px", lineHeight: "110%", marginBottom: "24px" }}>Want to join our team?</h2>
          <Link href="/contact" className="btn-arrow" style={{ display: "inline-block", backgroundColor: "#000", color: "#fdfcf9", borderRadius: "50px", fontSize: "16px", fontWeight: 400, lineHeight: "100%", padding: "14px 40px 16px 18px", whiteSpace: "nowrap" }}>Get in Touch</Link>
        </AnimateOnScroll>
      </section>

      <section style={{ backgroundColor: "#fdfcf9", position: "relative", zIndex: 1 }}>
        <div style={{ borderTop: "1px solid #e1e1e1", borderBottom: "1px solid #e1e1e1", padding: "0 6vw", display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 400px", padding: "8vw 4vw 4vw 0" }}>
            <AnimateOnScroll>
              <h2 style={{ color: "#0b0c0f", fontWeight: 400, fontSize: "40px", lineHeight: "110%", marginBottom: "24px" }}>Ready to start something amazing?</h2>
              <Link href="/contact" className="btn-arrow" style={{ display: "inline-block", backgroundColor: "#000", color: "#fdfcf9", borderRadius: "50px", fontSize: "16px", fontWeight: 400, lineHeight: "100%", padding: "14px 40px 16px 18px", whiteSpace: "nowrap" }}>Let&apos;s Begin</Link>
            </AnimateOnScroll>
          </div>
          <div style={{ flex: "1 1 400px", padding: "8vw 0 8vw 6vw", display: "flex", alignItems: "center" }}>
            <AnimateOnScroll delay={100}>
              <p style={{ color: "#6f6f6f", fontSize: "14px", marginBottom: "8px" }}>Get in touch</p>
              <p style={{ color: "#0b0c0f", fontSize: "18px", fontWeight: 300 }}>Lagos, Nigeria</p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
