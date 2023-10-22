import { RgbaColor } from "react-colorful";

import { convertColorToString } from "@/libs/convert-color-to-string";

export async function uploadImagesAndGetBlob(
  images: File[],
  text: string,
  color: RgbaColor,
  fontSize: number,
  offsetX: number,
  offsetY: number,
) {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append(`images`, image);
  });
  formData.set("text", text);
  formData.set("color", convertColorToString(color));
  formData.set("font-size", fontSize.toString());
  formData.set("offset-x", offsetX.toString());
  formData.set("offset-y", offsetY.toString());

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error?.message || "Unexpected error.");
  }

  return response.blob();
}
