import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Sanitize filename and add timestamp to prevent collisions
  const ext = path.extname(file.name).toLowerCase();
  const safeName = file.name
    .replace(ext, "")
    .replace(/[^a-z0-9]/gi, "-")
    .toLowerCase();
  const filename = `${safeName}-${Date.now()}${ext}`;

  const uploadDir = path.join(process.cwd(), "public", "sharebetaUploads");
  await mkdir(uploadDir, { recursive: true });

  const filepath = path.join(uploadDir, filename);
  await writeFile(filepath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
