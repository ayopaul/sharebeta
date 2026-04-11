import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug } from "@/lib/data";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      {/* Hero */}
      <section
        style={{
          backgroundColor: "#000",
          padding: "160px 6vw 60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <AnimateOnScroll>
          <div style={{ maxWidth: "800px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "#fdfcf9",
                  fontSize: "14px",
                  fontWeight: 400,
                  padding: "4px 12px",
                  borderRadius: "50px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {post.category}
              </span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
                {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
            <h1
              style={{
                color: "#fdfcf9",
                fontWeight: 400,
                fontSize: "clamp(32px, 4vw, 56px)",
                lineHeight: "115%",
                letterSpacing: "-0.012em",
              }}
            >
              {post.title}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", marginTop: "20px" }}>
              By {post.author}
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Featured Image */}
      {post.image && (
        <section style={{ backgroundColor: "#000", padding: "0 6vw 40px", position: "relative", zIndex: 1 }}>
          <AnimateOnScroll>
            <div style={{ maxWidth: "900px", borderRadius: "12px", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.title}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
              />
            </div>
          </AnimateOnScroll>
        </section>
      )}

      {/* Content */}
      <section
        style={{
          backgroundColor: "#000",
          padding: "40px 6vw 80px",
          position: "relative",
          zIndex: 1,
          borderBottom: "1px solid #262626",
        }}
      >
        <AnimateOnScroll>
          <div
            className="blog-content"
            style={{ maxWidth: "740px" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </AnimateOnScroll>
      </section>

      {/* Back link */}
      <section style={{ backgroundColor: "#000", padding: "40px 6vw", position: "relative", zIndex: 1 }}>
        <Link
          href="/blog"
          className="btn-arrow"
          style={{
            display: "inline-block",
            backgroundColor: "#fdfcf9",
            color: "#000",
            borderRadius: "50px",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "100%",
            padding: "14px 40px 16px 18px",
            whiteSpace: "nowrap",
          }}
        >
          Back to Blog
        </Link>
      </section>

      <style>{`
        .blog-content {
          color: rgba(255, 255, 255, 0.8);
          font-size: 17px;
          line-height: 1.8;
        }
        .blog-content h1 { color: #fdfcf9; font-size: 32px; font-weight: 400; margin: 40px 0 16px; line-height: 120%; }
        .blog-content h2 { color: #fdfcf9; font-size: 26px; font-weight: 400; margin: 36px 0 14px; line-height: 125%; }
        .blog-content h3 { color: #fdfcf9; font-size: 20px; font-weight: 400; margin: 28px 0 12px; line-height: 130%; }
        .blog-content p { margin: 0 0 16px; }
        .blog-content a { color: #FB71A2; text-decoration: underline; }
        .blog-content ul, .blog-content ol { padding-left: 24px; margin: 16px 0; }
        .blog-content li { margin-bottom: 8px; }
        .blog-content blockquote { border-left: 3px solid rgba(255,255,255,0.2); padding-left: 20px; margin: 24px 0; color: rgba(255,255,255,0.5); font-style: italic; }
        .blog-content pre { background: rgba(255,255,255,0.05); border-radius: 8px; padding: 16px; overflow-x: auto; font-size: 14px; margin: 20px 0; }
        .blog-content code { background: rgba(255,255,255,0.08); padding: 2px 6px; border-radius: 4px; font-size: 14px; }
        .blog-content img { max-width: 100%; height: auto; border-radius: 10px; margin: 24px 0; }
        .blog-content hr { border: none; border-top: 1px solid #262626; margin: 32px 0; }
      `}</style>
    </>
  );
}
