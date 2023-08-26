import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  const data = await request.formData();
  const image = data.get("image");

  if (!image) {
    return NextResponse.json("No se subió una imagen", { status: 400 });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "public", image.name);
  await writeFile(filePath, buffer);

  return NextResponse.json("Imagen Subida");
}
