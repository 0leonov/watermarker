import { Canvas, Image } from "canvas";

export async function addWatermarkToImage(
  image: Image,
  canvas: Canvas,
  watermarkText: string,
  watermarkTextColor: string,
  fontSize: number,
  offsetX: number,
  offsetY: number,
) {
  const context = canvas.getContext("2d");

  context.drawImage(image, 0, 0);
  context.font = `${fontSize}px Arial`;
  context.fillStyle = watermarkTextColor;
  context.fillText(watermarkText, offsetX, offsetY);
}
