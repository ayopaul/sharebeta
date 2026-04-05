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
  { label: "Team", href: "/team" },
  { label: "Projects", href: "/projects" },
  { label: "Our Footprint", href: "/footprint" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#fdfcf9] relative z-[1]" style={{ padding: "3vw" }}>
      {/* Footer grid with bg */}
      <div
        className="border border-black/10 rounded-2xl overflow-hidden bg-gradient-to-br from-[#f9f7f1] to-[#f5f4f1]"
        style={{ padding: "1.5vw", marginBottom: "1.5vw" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-[4vw] gap-y-[2vw]">
          {/* Col 1 */}
          <div>
            <h4 className="text-[#0b0c0f] text-[18px] font-normal leading-[22px] mb-0">
              Digital & Social
            </h4>
            <ul className="flex flex-col gap-[6px] mt-5">
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
            <ul className="flex flex-col gap-[6px] mt-5">
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
            <ul className="flex flex-col gap-[6px] mt-5">
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
            <ul className="flex flex-col gap-[6px] mt-5">
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
          <Link href="/" className="text-[#0b0c0f] text-[14px] font-semibold">
            sharebeta
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
