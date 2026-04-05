"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase-browser";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createBrowserSupabase();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.replace("/hakken");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0b0c0f", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "0 24px" }}>
        <h1 style={{ color: "#fdfcf9", fontSize: "24px", fontWeight: 400, marginBottom: "8px" }}>sharebeta</h1>
        <p style={{ color: "#6f6f6f", fontSize: "14px", marginBottom: "40px" }}>Sign in to the admin panel</p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", color: "#6f6f6f", fontSize: "14px", marginBottom: "8px" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid #262626",
                borderRadius: "8px",
                padding: "12px 16px",
                fontSize: "16px",
                color: "#fdfcf9",
                outline: "none",
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", color: "#6f6f6f", fontSize: "14px", marginBottom: "8px" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid #262626",
                borderRadius: "8px",
                padding: "12px 16px",
                fontSize: "16px",
                color: "#fdfcf9",
                outline: "none",
              }}
            />
          </div>

          {error && <p style={{ color: "#ff9e9e", fontSize: "14px", marginBottom: "16px" }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#fdfcf9",
              color: "#0b0c0f",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              fontSize: "16px",
              fontWeight: 500,
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
