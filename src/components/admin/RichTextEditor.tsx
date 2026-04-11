"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useState, useRef, useEffect, useCallback } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const btnStyle = (active: boolean): React.CSSProperties => ({
  padding: "4px 8px",
  border: "none",
  borderRadius: "4px",
  backgroundColor: active ? "#0b0c0f" : "transparent",
  color: active ? "#fff" : "#444",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: 600,
  lineHeight: 1,
  minWidth: "28px",
  height: "28px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const sepStyle: React.CSSProperties = {
  width: "1px",
  height: "20px",
  backgroundColor: "#e5e5e5",
  margin: "0 4px",
};

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Start writing..." }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external value changes (e.g. when editing a different post)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
  }, [editor]);

  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageDragOver, setImageDragOver] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const uploadAndInsertImage = useCallback(async (file: File) => {
    if (!editor) return;
    setImageUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) {
      editor.chain().focus().setImage({ src: data.url }).run();
    }
    setImageUploading(false);
    setShowImageUpload(false);
  }, [editor]);

  if (!editor) return null;

  return (
    <div style={{ border: "1px solid #e5e5e5", borderRadius: "8px", overflow: "hidden" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2px", padding: "6px 8px", borderBottom: "1px solid #e5e5e5", backgroundColor: "#fafafa" }}>
        {/* Text style */}
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} style={btnStyle(editor.isActive("bold"))} title="Bold">B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} style={btnStyle(editor.isActive("italic"))} title="Italic"><em>I</em></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} style={btnStyle(editor.isActive("underline"))} title="Underline"><u>U</u></button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} style={btnStyle(editor.isActive("strike"))} title="Strikethrough"><s>S</s></button>

        <div style={sepStyle} />

        {/* Headings */}
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} style={btnStyle(editor.isActive("heading", { level: 1 }))} title="Heading 1">H1</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} style={btnStyle(editor.isActive("heading", { level: 2 }))} title="Heading 2">H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} style={btnStyle(editor.isActive("heading", { level: 3 }))} title="Heading 3">H3</button>

        <div style={sepStyle} />

        {/* Alignment */}
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()} style={btnStyle(editor.isActive({ textAlign: "left" }))} title="Align left">&equiv;</button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()} style={btnStyle(editor.isActive({ textAlign: "center" }))} title="Align center">=</button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()} style={btnStyle(editor.isActive({ textAlign: "right" }))} title="Align right">&equiv;</button>

        <div style={sepStyle} />

        {/* Lists */}
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} style={btnStyle(editor.isActive("bulletList"))} title="Bullet list">&bull;&bull;</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} style={btnStyle(editor.isActive("orderedList"))} title="Ordered list">1.</button>

        <div style={sepStyle} />

        {/* Block */}
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} style={btnStyle(editor.isActive("blockquote"))} title="Blockquote">&ldquo;</button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} style={btnStyle(editor.isActive("codeBlock"))} title="Code block">&lt;/&gt;</button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} style={btnStyle(false)} title="Horizontal rule">&mdash;</button>

        <div style={sepStyle} />

        {/* Media & links */}
        <button type="button" onClick={addLink} style={btnStyle(editor.isActive("link"))} title="Add link">&#128279;</button>
        <button type="button" onClick={() => setShowImageUpload(!showImageUpload)} style={btnStyle(showImageUpload)} title="Add image">&#128247;</button>

        <div style={sepStyle} />

        {/* Undo / redo */}
        <button type="button" onClick={() => editor.chain().focus().undo().run()} style={btnStyle(false)} disabled={!editor.can().undo()} title="Undo">&#x21A9;</button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} style={btnStyle(false)} disabled={!editor.can().redo()} title="Redo">&#x21AA;</button>
      </div>

      {/* Image upload drop zone */}
      {showImageUpload && (
        <div
          onDragOver={(e) => { e.preventDefault(); setImageDragOver(true); }}
          onDragLeave={() => setImageDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setImageDragOver(false);
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith("image/")) uploadAndInsertImage(file);
          }}
          onClick={() => imageInputRef.current?.click()}
          style={{
            border: `2px dashed ${imageDragOver ? "#0b0c0f" : "#ccc"}`,
            borderRadius: "6px",
            padding: "16px",
            margin: "8px 10px",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: imageDragOver ? "#f5f4f1" : "#fafafa",
            transition: "all 0.15s",
          }}
        >
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadAndInsertImage(file);
              e.target.value = "";
            }}
          />
          <p style={{ color: "#6f6f6f", fontSize: "14px", margin: 0 }}>
            {imageUploading ? "Uploading image..." : "Drop an image here or click to browse"}
          </p>
        </div>
      )}

      {/* Editor content */}
      <style>{`
        .tiptap-editor .ProseMirror {
          padding: 16px;
          min-height: 300px;
          outline: none;
          font-size: 15px;
          line-height: 1.7;
          color: #0b0c0f;
        }
        .tiptap-editor .ProseMirror h1 { font-size: 28px; font-weight: 700; margin: 16px 0 8px; }
        .tiptap-editor .ProseMirror h2 { font-size: 22px; font-weight: 600; margin: 14px 0 6px; }
        .tiptap-editor .ProseMirror h3 { font-size: 18px; font-weight: 600; margin: 12px 0 4px; }
        .tiptap-editor .ProseMirror p { margin: 0 0 8px; }
        .tiptap-editor .ProseMirror ul, .tiptap-editor .ProseMirror ol { padding-left: 24px; margin: 8px 0; }
        .tiptap-editor .ProseMirror blockquote { border-left: 3px solid #e5e5e5; padding-left: 16px; margin: 12px 0; color: #6f6f6f; }
        .tiptap-editor .ProseMirror pre { background: #f5f4f1; border-radius: 6px; padding: 12px; font-size: 13px; overflow-x: auto; }
        .tiptap-editor .ProseMirror code { background: #f5f4f1; padding: 2px 4px; border-radius: 3px; font-size: 13px; }
        .tiptap-editor .ProseMirror img { max-width: 100%; height: auto; border-radius: 8px; margin: 12px 0; }
        .tiptap-editor .ProseMirror a { color: #2563eb; text-decoration: underline; }
        .tiptap-editor .ProseMirror hr { border: none; border-top: 1px solid #e5e5e5; margin: 16px 0; }
        .tiptap-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #adb5bd;
          pointer-events: none;
          float: left;
          height: 0;
        }
      `}</style>
      <div className="tiptap-editor">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
