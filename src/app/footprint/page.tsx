import AnimateOnScroll from "@/components/AnimateOnScroll";
import Globe from "@/components/Globe";

const locations = [
  { city: "Lagos", address: "Lagos, Nigeria", image: "https://nuxnfkinthnjrpgruomz.supabase.co/storage/v1/object/public/uploads/locations/lagos.webp" },
  { city: "Abuja", address: "Abuja, Nigeria", image: "https://nuxnfkinthnjrpgruomz.supabase.co/storage/v1/object/public/uploads/locations/abuja.webp" },
  { city: "London", address: "London, United Kingdom", image: "https://nuxnfkinthnjrpgruomz.supabase.co/storage/v1/object/public/uploads/locations/london.webp" },
  { city: "Johannesburg", address: "Johannesburg, South Africa", image: "https://nuxnfkinthnjrpgruomz.supabase.co/storage/v1/object/public/uploads/locations/johannesburg.webp" },
];

export default function FootprintPage() {
  return (
    <>
      {/* ===== DARK: Hero + Globe ===== */}
      <section style={{ backgroundColor: "#000", display: "flex", flexDirection: "column", alignItems: "center", padding: "160px 6vw 6vw", position: "relative", zIndex: 1 }}>
        <AnimateOnScroll>
          <h1 style={{ color: "#bcbcbc", fontWeight: 400, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: "110%", letterSpacing: "-0.012em", textAlign: "center", maxWidth: "800px" }}>
            Our Reach In and Outside Africa
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "25px", fontWeight: 300, lineHeight: "130%", textAlign: "center", maxWidth: "600px", marginTop: "24px", marginLeft: "auto", marginRight: "auto" }}>
            A few of the locations we&apos;ve delivered in with our ambitious partners
          </p>
        </AnimateOnScroll>
        <Globe />
      </section>

      {/* ===== LIGHT: Locations heading ===== */}
      <section style={{ backgroundColor: "#fdfcf9", padding: "8vw 6vw 4vw", position: "relative", zIndex: 1 }}>
        <AnimateOnScroll>
          <h2 style={{ color: "#0b0c0f", fontWeight: 400, fontSize: "clamp(24px, 3vw, 40px)", lineHeight: "110%", marginBottom: "40px" }}>
            Our reach in and outside Africa
          </h2>
        </AnimateOnScroll>
      </section>

      {/* ===== LIGHT: Location cards grid ===== */}
      <section style={{ backgroundColor: "#fdfcf9", padding: "0 6vw 5vw", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "40px 40px", marginTop: "4vw" }}>
          {locations.map((loc, i) => (
            <AnimateOnScroll key={loc.city} delay={i * 100}>
              <div>
                <div style={{ width: "100%", aspectRatio: "3.5 / 1", borderRadius: "4px", overflow: "hidden", backgroundColor: "#e5e5e5" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={loc.image} alt={loc.city} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <h3 style={{ color: "#0b0c0f", fontWeight: 400, fontSize: "18px", lineHeight: "120%", marginTop: "16px" }}>{loc.city}</h3>
                <p style={{ color: "#6f6f6f", fontSize: "14px", fontWeight: 300, marginTop: "4px" }}>{loc.address}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

    </>
  );
}
