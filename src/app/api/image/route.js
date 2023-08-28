import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import path, { resolve } from "path";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function POST(request) {
  const data = await request.formData();
  const image = data.get("image");

  if (!image) {
    return NextResponse.json("No se subió una imagen", { status: 400 });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // const filePath = path.join(process.cwd(), "public", image.name);
  // await writeFile(filePath, buffer);

  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      })
      .end(buffer);
  });

  console.log(response.secure_url);

  return NextResponse.json({
    message: "imagen subida",
    url: response.secure_url,
  });
}
