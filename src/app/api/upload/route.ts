import { Buffer } from "buffer";

import { createCanvas, loadImage } from "canvas";
import JSZip from "jszip";
import { NextRequest, NextResponse } from "next/server";

import { addWatermarkToImage } from "@/libs/add-watermark-to-image";

export async function POST(request: NextRequest) {
  try {
    // Parse the form data from the request
    const formData = await request.formData();
    const images = formData.getAll("images") as File[];
    const color = formData.get("color") as string;
    const text = formData.get("text") as string;
    const fontSize = +(formData.get("font-size") as string);
    const offsetX = +(formData.get("offset-x") as string);
    const offsetY = +(formData.get("offset-y") as string);

    // Check for missing or invalid input
    if (!formData || images.length === 0) {
      return NextResponse.json(
        { message: "Images are required." },
        { status: 400 },
      );
    }

    if (!color) {
      return NextResponse.json(
        { message: "Color is required." },
        { status: 400 },
      );
    }

    if (!text) {
      return NextResponse.json(
        { message: "Text is required." },
        { status: 400 },
      );
    }

    if (fontSize <= 0) {
      return NextResponse.json(
        { message: "Font size must be greater than 0." },
        { status: 400 },
      );
    }

    // Create a new JSZip instance to generate a ZIP archive
    const zip = new JSZip();

    for (const file of images) {
      try {
        // Read the image file as an ArrayBuffer
        const imageBuffer = await file.arrayBuffer();

        // Load the image using the "canvas" library
        const image = await loadImage(Buffer.from(imageBuffer));
        const canvas = createCanvas(image.width, image.height);

        await addWatermarkToImage(
          image,
          canvas,
          text,
          color,
          fontSize,
          offsetX,
          offsetY,
        );

        // Convert the canvas to a buffer
        const watermarkedBuffer = Buffer.from(canvas.toBuffer());

        // Add the watermarked image to the ZIP archive
        zip.file(file.name, watermarkedBuffer);
      } catch (error) {
        return NextResponse.json(
          { message: `Invalid image (${file.name}).` },
          { status: 400 },
        );
      }
    }

    // Generate the ZIP archive as a blob
    const archive = await zip.generateAsync({ type: "blob" });

    const headers = {
      "Content-Disposition": `attachment; filename="watermarked_images.zip"`,
      "Content-Type": "application/zip",
    };

    // Return the ZIP archive as the response
    return new NextResponse(archive, { headers });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
