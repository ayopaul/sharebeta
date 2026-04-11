import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import path from "path";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();

  // Sanitize filename and add timestamp to prevent collisions
  const ext = path.extname(file.name).toLowerCase();
  const safeName = file.name
    .replace(ext, "")
    .replace(/[^a-z0-9]/gi, "-")
    .toLowerCase();
  const filename = `${safeName}-${Date.now()}${ext}`;

  const { error } = await supabase.storage
    .from("uploads")
    .upload(filename, bytes, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = supabase.storage
    .from("uploads")
    .getPublicUrl(filename);

  return NextResponse.json({ url: urlData.publicUrl });
}
