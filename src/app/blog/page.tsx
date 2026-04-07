import { getBlogPosts } from "@/lib/data";
import BlogClient from "./BlogClient";

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <>
      <section style={{ backgroundColor: "#000", padding: "160px 6vw 5vw", position: "relative", zIndex: 1 }}>
        <h1 style={{ color: "#bcbcbc", fontWeight: 400, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: "110%", letterSpacing: "-0.012em", maxWidth: "800px" }}>Insights &amp; Resources</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "25px", fontWeight: 300, lineHeight: "130%", maxWidth: "600px", marginTop: "24px" }}>Thoughts, guides, and insights from our team on marketing, SEO, and digital strategy.</p>
      </section>

      <BlogClient blogPosts={blogPosts} />
    </>
  );
}
