"use client";

const IMG_SRC = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/sharebeta%20projects%20wheel-2.webp`;

export default function HeroCards() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG_SRC} alt="" loading="eager" className="hero-image" />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[100] pointer-events-none"
        style={{
          backgroundImage: [
            "linear-gradient(0deg, #000, transparent 15%)",
            "linear-gradient(303deg, #000 5%, transparent 32%)",
            "linear-gradient(45deg, #000 5%, transparent 34%)",
          ].join(", "),
        }}
      />
    </>
  );
}
