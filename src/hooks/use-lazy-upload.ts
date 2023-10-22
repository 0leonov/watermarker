import { useState } from "react";
import { RgbaColor } from "react-colorful";

import { uploadImagesAndGetBlob } from "@/libs/upload-images-and-get-blob";

export function useLazyUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(
    images: File[],
    text: string,
    color: RgbaColor,
    fontSize: number,
    offsetX: number,
    offsetY: number,
  ) {
    setError(null);
    setIsLoading(true);

    if (images.length === 0) {
      setError("Images is required.");
      setIsLoading(false);
      return;
    }

    if (!text) {
      setError("Text is required.");
      setIsLoading(false);
      return;
    }

    try {
      return await uploadImagesAndGetBlob(
        images,
        text,
        color,
        fontSize,
        offsetX,
        offsetY,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    isLoading,
    error,
    upload,
  };
}
