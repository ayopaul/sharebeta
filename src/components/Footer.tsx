import Link from "next/link";

const col1 = [
  "Social Media Marketing",
  "Search Engine Marketing",
  "Email Marketing",
  "Content Creation",
];

const col2 = [
  "Experiential Marketing",
  "Storytelling Advertising",
  "Events & Activations",
  "Brand Assets",
];

const col3 = [
  "Website Design",
  "Web Applications",
  "SEO",
  "DTC Promotions",
];

const col4 = [
  { label: "About Us", href: "/about" },
  { label: "Team", href: "/about#team" },
  { label: "Projects", href: "/projects" },
  { label: "Our Footprint", href: "/footprint" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#fdfcf9] relative z-[1]" style={{ padding: "3vw" }}>
      {/* CTA + Footer grid with bg */}
      <div
        className="border border-black/10 rounded-2xl overflow-hidden"
        style={{ background: "radial-gradient(185.59% 145.4% at 2.11% 98.35%, rgba(255,172,62,0.8) 0%, rgba(251,113,162,0.8) 56.76%, rgba(240,40,0,0.8) 100%)", padding: "1.5vw", marginBottom: "1.5vw" }}
      >
        {/* CTA section */}
        <div style={{ padding: "3vw 2vw 3vw" }}>
          <h2 style={{ color: "#0b0c0f", fontWeight: 400, lineHeight: "110%", letterSpacing: "-0.012em", fontSize: "clamp(24px, 3vw, 40px)", marginBottom: "16px" }}>
            Ready to start something amazing?
          </h2>
          <p style={{ color: "#0b0c0f", fontSize: "16px", fontWeight: 300, lineHeight: "28px", marginBottom: "32px", opacity: 0.6 }}>
            We can help you define and communicate your brand story through
            effective marketing across all channels.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href="/contact"
              className="btn-arrow"
              style={{
                display: "inline-block",
                backgroundColor: "#000",
                color: "#fdfcf9",
                borderRadius: "50px",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "100%",
                whiteSpace: "nowrap",
                padding: "14px 40px 16px 18px",
              }}
            >
              Let&apos;s Begin
            </Link>
            <a
              href="https://www.instagram.com/sharebeta/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "50%", backgroundColor: "#000", color: "#fdfcf9", transition: "opacity 0.2s" }}
              title="Follow us on Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>

        {/* Horizontal divider */}
        <hr style={{ border: "none", borderTop: "1px solid rgba(0,0,0,0.1)", margin: "0 2vw" }} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-[4vw] gap-y-[2vw]" style={{ padding: "2vw 2vw 1vw" }}>
          {/* Col 1 */}
          <div>
            <h4 className="text-[#0b0c0f] text-[18px] font-normal leading-[22px] mb-0">
              Digital & Social
            </h4>
            <ul className="flex flex-col gap-[6px] mt-8">
              {col1.map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-[#0b0c0f] text-[14px] leading-[21px] hover:opacity-60 transition-opacity">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-[#0b0c0f] text-[18px] font-normal leading-[22px] mb-0">
              Experiential & BTL
            </h4>
            <ul className="flex flex-col gap-[6px] mt-8">
              {col2.map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-[#0b0c0f] text-[14px] leading-[21px] hover:opacity-60 transition-opacity">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-[#0b0c0f] text-[18px] font-normal leading-[22px] mb-0">
              Web & Tech
            </h4>
            <ul className="flex flex-col gap-[6px] mt-8">
              {col3.map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-[#0b0c0f] text-[14px] leading-[21px] hover:opacity-60 transition-opacity">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-[#0b0c0f] text-[18px] font-normal leading-[22px] mb-0">
              More
            </h4>
            <ul className="flex flex-col gap-[6px] mt-8">
              {col4.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[#0b0c0f] text-[14px] leading-[21px] hover:opacity-60 transition-opacity">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-[1.5vw]">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <img src="https://nuxnfkinthnjrpgruomz.supabase.co/storage/v1/object/public/uploads/sharebeta-logo-.webp" alt="Sharebeta" style={{ height: "20px", width: "auto" }} />
          </Link>
          <span className="text-[#bcbcbc] text-[12px]">Lagos, Nigeria</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="#" className="text-[#0b0c0f] text-[12px] hover:opacity-60 transition-opacity">
            Privacy Policy
          </Link>
          <Link href="#" className="text-[#0b0c0f] text-[12px] hover:opacity-60 transition-opacity">
            Terms &amp; Conditions
          </Link>
          <span className="text-[#bcbcbc] text-[12px]">
            &copy; {new Date().getFullYear()} Sharebeta LTD
          </span>
        </div>
      </div>
    </footer>
  );
}
