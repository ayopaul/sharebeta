"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > lastScrollY && currentScrollY > 80);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[1000] flex justify-center"
      style={{
        paddingTop: "2vw",
        transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
        transform: hidden ? "translateY(-125px)" : "translateY(0)",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          width: "96vw",
          height: "70px",
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          borderRadius: "8px",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center h-full text-white"
          style={{ marginLeft: "2vw", paddingTop: "24px", paddingBottom: "24px" }}
        >
          <span className="text-[20px] font-semibold tracking-tight">sharebeta</span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden lg:flex items-center h-full"
          style={{ paddingRight: "20px" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center h-full text-white hover:opacity-70 transition-opacity"
              style={{
                fontSize: "14px",
                fontWeight: 400,
                letterSpacing: "0.008em",
                padding: "12px 13px",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white"
          style={{ marginRight: "2vw", padding: "8px" }}
          aria-label="Menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="lg:hidden absolute w-[96vw]"
          style={{
            top: "calc(70px + 2vw + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            borderRadius: "8px",
          }}
        >
          <div className="py-4 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white hover:opacity-70 transition-opacity"
                style={{ fontSize: "14px", fontWeight: 400, padding: "10px 24px" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
