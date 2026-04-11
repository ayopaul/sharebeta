"use client";

import { useState, useEffect } from "react";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: "#111",
        borderTop: "1px solid #262626",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <p style={{ color: "#aaa", fontSize: "14px", margin: 0, maxWidth: "720px", lineHeight: 1.5 }}>
        We use cookies to enhance your browsing experience and analyse site traffic. By continuing to use this site, you consent to our use of cookies.
      </p>
      <button
        onClick={handleAccept}
        style={{
          backgroundColor: "#fff",
          color: "#000",
          border: "none",
          padding: "10px 24px",
          fontSize: "14px",
          fontWeight: 600,
          cursor: "pointer",
          borderRadius: "4px",
          flexShrink: 0,
        }}
      >
        Accept
      </button>
    </div>
  );
}
