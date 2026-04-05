"use client";

import { useState, useRef } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (data.url) {
      onChange(data.url);
    }
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  };

  return (
    <div>
      <label style={{ display: "block", fontSize: "14px", color: "#6f6f6f", marginBottom: "6px" }}>{label}</label>

      {value && (
        <div style={{ marginBottom: "8px", position: "relative", display: "inline-block" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" style={{ height: "80px", borderRadius: "8px", objectFit: "cover" }} />
          <button
            onClick={() => onChange("")}
            style={{ position: "absolute", top: "-6px", right: "-6px", width: "20px", height: "20px", borderRadius: "50%", backgroundColor: "#ff9e9e", color: "#fff", border: "none", cursor: "pointer", fontSize: "12px", lineHeight: 1 }}
          >
            x
          </button>
        </div>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? "#0b0c0f" : "#e5e5e5"}`,
          borderRadius: "8px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: dragOver ? "#f5f4f1" : "#fff",
          transition: "all 0.15s",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
          }}
        />
        <p style={{ color: "#6f6f6f", fontSize: "14px" }}>
          {uploading ? "Uploading..." : "Drop an image here or click to browse"}
        </p>
      </div>

      {/* Manual URL input */}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste an image URL"
        style={{
          width: "100%",
          padding: "6px 10px",
          border: "1px solid #e5e5e5",
          borderRadius: "6px",
          fontSize: "13px",
          color: "#6f6f6f",
          marginTop: "8px",
          outline: "none",
        }}
      />
    </div>
  );
}
