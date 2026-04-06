import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import HeroCards from "@/components/HeroCards";
import ServiceTiles from "@/components/ServiceTiles";
import LogoMarquee from "@/components/LogoMarquee";
import LocationsMarquee from "@/components/LocationsMarquee";
import FeaturedCase from "@/components/FeaturedCase";
import KnowledgeHub from "@/components/KnowledgeHub";
import { getStats, getProjects, getBlogPosts } from "@/lib/data";


export default async function Home() {
  const [stats, projects, blogPosts] = await Promise.all([
    getStats(),
    getProjects(),
    getBlogPosts(),
  ]);
  return (
    <>
      {/* ============================================================
          DARK SECTION (all black background, sections 1-7)
          ============================================================ */}

      {/* 1. HERO — 100vh */}
      <section
        className="relative z-[1] bg-black flex flex-col justify-center items-center"
        style={{ height: "100vh" }}
      >
        <div className="flex flex-col items-center px-[6vw]" style={{ paddingTop: "120px" }}>
          <h1
            className="text-center text-[#bcbcbc] font-normal leading-[110%] tracking-[-0.012em]"
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              width: "70vw",
              maxWidth: "800px",
              marginBottom: "2vw",
              fontFamily: "var(--font-playfair), serif",
            }}
          >
            Professional Storytellers for Consumer Brands
          </h1>
        </div>

        <div
          className="relative flex justify-center items-end overflow-hidden hero-wheel-container"
          style={{
            width: "100vw",
            height: "50vh",
            marginTop: "5vh",
            backgroundImage: "linear-gradient(303deg, #000 5%, transparent 32%), linear-gradient(45deg, #000 5%, transparent 34%)",
          }}
        >
          <HeroCards />
          <div className="relative z-[999] flex flex-col items-center justify-start hero-learn-more">
            <Link
              href="#services"
              className="btn-down-arrow border border-[#262626] text-[#bcbcbc] rounded-full text-[16px] font-normal leading-none whitespace-nowrap bg-transparent"
              style={{ padding: "17px 24px 20px 50px" }}
            >
              Learn more
            </Link>
            <div className="w-[1px] h-[80px]" style={{ backgroundImage: "linear-gradient(0deg, #000, #555)" }} />
          </div>
        </div>
      </section>

      {/* 2. SERVICES TILES */}
      <section id="services" className="bg-black relative z-[1]" style={{ paddingBottom: "6vw" }}>
        <div className="flex flex-col items-center w-full px-[6vw]" style={{ paddingTop: "80px" }}>
          <h2
            className="text-[#bcbcbc] font-normal text-center leading-[110%]"
            style={{ fontSize: "clamp(24px, 5vw, 40px)", width: "100%", maxWidth: "60vw", marginBottom: "80px" }}
          >
            Create, manage, and scale effective marketing across all channels
          </h2>
          <ServiceTiles />
        </div>
      </section>

      {/* 3. KPI STATS — bordered cells, 300px tall */}
      <section className="bg-black relative z-[1]">
        <div className="px-[6vw]">
          <div className="stats-grid" style={{ display: "flex", height: "300px", overflow: "hidden" }}>
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  border: "1px solid #262626",
                  borderLeftStyle: i === 0 ? "none" : "solid",
                  borderRightStyle: i === stats.length - 1 ? "none" : "solid",
                  marginRight: i < stats.length - 1 ? "-1px" : "0",
                }}
              >
                <div style={{ color: "#bcbcbc", fontSize: "clamp(24px, 3vw, 48px)", fontWeight: 400, lineHeight: 1 }}>
                  {stat.number}
                </div>
                <div style={{ color: "#6f6f6f", fontSize: "20px", fontWeight: 400, lineHeight: "130%", marginTop: "12px" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CLIENT LOGOS — two-row scroll-linked marquee */}
      <LogoMarquee />

      {/* 5. GRADIENT TEXT BANNER */}
      <section style={{ backgroundColor: "#000", borderTop: "1px solid #262626", padding: "6vw", position: "relative", zIndex: 1 }}>
        <div style={{ width: "100%", maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ color: "#bcbcbc", fontWeight: 400, lineHeight: "110%", letterSpacing: "-0.012em", fontSize: "clamp(24px, 3.5vw, 40px)" }}>
            Building compelling stories across Marketing, Digital, and Experiential.{" "}
            <span className="gradient-text">Innovation-driven.</span>
          </h2>
        </div>
      </section>

      {/* 6. FEATURED CASE STUDY — 100vh, dark, auto-switching */}
      <FeaturedCase projects={projects} />

      {/* ============================================================
          LIGHT SECTION (off-white background)
          ============================================================ */}

      {/* 7. ABOUT / CTA */}
      <section style={{ backgroundColor: "#fdfcf9", padding: "10vw 6vw 6vw", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4vw" }}>
          <div style={{ flex: "1 1 400px" }}>
            <AnimateOnScroll>
              <p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 400, letterSpacing: "0.008em", marginBottom: "16px" }}>About Us</p>
              <h2 style={{ color: "#0b0c0f", fontWeight: 400, lineHeight: "110%", letterSpacing: "-0.012em", fontSize: "clamp(24px, 3vw, 40px)", marginBottom: "24px" }}>
                Strategic partners dedicated to your growth
              </h2>
              <p style={{ color: "#6f6f6f", fontSize: "20px", fontWeight: 400, lineHeight: "130%", marginBottom: "32px" }}>
                As a full-service agency, we become strategic partners with our clients to develop and execute their marketing and help them succeed their goals.
              </p>
              <Link href="/about" className="btn-arrow-black" style={{ display: "inline-block", backgroundColor: "transparent", border: "1px solid rgba(0,0,0,0.1)", color: "#0b0c0f", borderRadius: "50px", fontSize: "16px", fontWeight: 400, lineHeight: "100%", whiteSpace: "nowrap", padding: "13px 39px 15px 17px" }}>
                Discover Sharebeta
              </Link>
            </AnimateOnScroll>
          </div>
          <div style={{ flex: "1 1 400px" }}>
            <AnimateOnScroll delay={100}>
              <div style={{ width: "100%", aspectRatio: "4/3", borderRadius: "16px", overflow: "hidden", background: "radial-gradient(185.59% 145.4% at 2.11% 98.35%, #FFAC3E 0%, #FB71A2 56.76%, #F02800 100%)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/UFW4676-scaled-2.webp`} alt="Sharebeta team" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* 8. KNOWLEDGE HUB — pills left, scrolling cards right, nav arrows */}
      <KnowledgeHub blogPosts={blogPosts} />

      {/* 8. LOCATIONS — 3-row scroll-linked marquee like bundl */}
      <LocationsMarquee />

    </>
  );
}
