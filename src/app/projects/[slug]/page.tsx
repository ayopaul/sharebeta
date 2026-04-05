import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p: { slug: string }) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const allProjects = await getProjects();
  const related = allProjects.filter((p: { slug: string }) => p.slug !== slug).slice(0, 2);
  const services = Array.isArray(project.services) ? project.services : JSON.parse(project.services || "[]");

  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: "#fdfcf9", paddingTop: "176px", paddingBottom: "130px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "690px", margin: "0 auto", textAlign: "center", padding: "0 6vw" }}>
          <AnimateOnScroll>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: "108%", fontWeight: 400, letterSpacing: "-2.32px", color: "#0b0c0f", margin: 0, fontFamily: "var(--font-playfair), serif" }}>{project.title}</h1>
          </AnimateOnScroll>
          <AnimateOnScroll delay={100}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid rgba(0,0,0,0.3)", borderBottom: "1px solid rgba(0,0,0,0.3)", padding: "26px 0", marginTop: "40px", marginBottom: "50px", gap: "16px" }}>
              <div><p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, marginBottom: "4px" }}>Year</p><p style={{ color: "#0b0c0f", fontSize: "16px", fontWeight: 400 }}>{project.year}</p></div>
              <div style={{ textAlign: "center" }}><p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, marginBottom: "4px" }}>Category</p><p style={{ color: "#0b0c0f", fontSize: "16px", fontWeight: 400 }}>{project.category}</p></div>
              <div style={{ textAlign: "right" }}><p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, marginBottom: "4px" }}>Location</p><p style={{ color: "#0b0c0f", fontSize: "16px", fontWeight: 400 }}>{project.location}</p></div>
            </div>
          </AnimateOnScroll>
        </div>
        <AnimateOnScroll>
          <div style={{ padding: "0 6vw" }}>
            <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: "15px", overflow: "hidden", background: project.image || "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)" }}>
              {project.image && project.image.startsWith("/") && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              )}
            </div>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Content */}
      <section style={{ backgroundColor: "#fdfcf9", padding: "0 6vw 130px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px", maxWidth: "1160px", margin: "0 auto" }}>
          <div>
            <div style={{ position: "sticky", top: "128px", backgroundColor: "#fff", borderRadius: "15px", padding: "45px 50px 47px", boxShadow: "0 16px 241px rgba(0,0,0,0.15)", maxWidth: "440px" }}>
              <h3 style={{ fontSize: "30px", fontWeight: 400, lineHeight: "133%", color: "#0b0c0f", marginBottom: "16px" }}>About this project</h3>
              <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", color: "#6f6f6f", marginBottom: "24px" }}>{project.description}</p>
              <div style={{ height: "1px", backgroundColor: "rgba(0,0,0,0.3)", marginBottom: "24px" }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div><p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, marginBottom: "4px" }}>Client</p><p style={{ color: "#0b0c0f", fontSize: "16px", fontWeight: 400 }}>{project.client}</p></div>
                <div><p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, marginBottom: "4px" }}>Location</p><p style={{ color: "#0b0c0f", fontSize: "16px", fontWeight: 400 }}>{project.location}</p></div>
                <div><p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, marginBottom: "4px" }}>Services</p><p style={{ color: "#0b0c0f", fontSize: "16px", fontWeight: 400 }}>{services.join(", ")}</p></div>
                <div><p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, marginBottom: "4px" }}>Year</p><p style={{ color: "#0b0c0f", fontSize: "16px", fontWeight: 400 }}>{project.year}</p></div>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: "705px" }}>
            <AnimateOnScroll>
              <h2 style={{ fontSize: "30px", fontWeight: 400, lineHeight: "122%", letterSpacing: "-1.74px", color: "#0b0c0f", marginBottom: "24px" }}>The Challenge</h2>
              <p style={{ fontSize: "18px", fontWeight: 300, lineHeight: "28px", color: "#6f6f6f", marginBottom: "48px" }}>{project.challenge}</p>
            </AnimateOnScroll>
            <AnimateOnScroll>
              <div style={{ backgroundColor: "#000", borderRadius: "15px", padding: "30px 20px", marginBottom: "48px" }}>
                <div style={{ marginBottom: "24px" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: 400, lineHeight: "133%", color: "#6f6f6f", marginBottom: "12px" }}>Strategy</h3>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", color: "#fdfcf9" }}>{project.strategy}</p>
                </div>
                <div style={{ borderTop: "1px solid #262626", paddingTop: "24px" }}>
                  <h3 style={{ fontSize: "20px", fontWeight: 400, lineHeight: "133%", color: "#6f6f6f", marginBottom: "12px" }}>Result</h3>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "150%", color: "#fdfcf9" }}>{project.result}</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ backgroundColor: "#fdfcf9", padding: "0 6vw 140px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "1160px", margin: "0 auto" }}>
            <AnimateOnScroll>
              <h2 style={{ fontSize: "40px", fontWeight: 400, lineHeight: "110%", color: "#0b0c0f", textAlign: "center", maxWidth: "708px", margin: "0 auto", paddingBottom: "48px" }}>More projects</h2>
            </AnimateOnScroll>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
              {related.map((rp: { slug: string; title: string; category: string; image: string }) => (
                <AnimateOnScroll key={rp.slug}>
                  <Link href={`/projects/${rp.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                    <div className="project-card" style={{ border: "1px solid #a9a9a9", borderRadius: "15px", padding: "20px" }}>
                      <div style={{ borderRadius: "15px", overflow: "hidden", width: "100%", aspectRatio: "16/10", marginBottom: "16px" }}>
                        <div style={{ width: "100%", height: "100%", background: rp.image || "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3 style={{ fontSize: "24px", fontWeight: 400, lineHeight: "141%", letterSpacing: "-1.15px", color: "#0b0c0f", margin: 0 }}>{rp.title}</h3>
                        <span style={{ border: "1px solid #a9a9a9", borderRadius: "30px", padding: "6px 17px", fontSize: "14px", fontWeight: 400, color: "#0b0c0f", whiteSpace: "nowrap" }}>{rp.category}</span>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
