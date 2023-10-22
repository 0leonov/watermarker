"use client";

import React, { useCallback, useState } from "react";
import { RgbaColor, RgbaColorPicker } from "react-colorful";
import { v4 as uuidv4 } from "uuid";

import styles from "./upload-image-form.module.scss";

import { ImagePreview } from "@/components/image-preview";
import {
  Button,
  ErrorAlert,
  ImageDropzone,
  Input,
  Spinner,
} from "@/components/ui";
import { useLazyUpload } from "@/hooks/use-lazy-upload";
import { downloadFile } from "@/libs/dowload-file";
import { ImageData } from "@/types";

export function UploadImageForm({ className }: { className: string }) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [text, setText] = useState<string>("");
  const [fontSize, setFontSize] = useState<number>(24);
  const [offsetX, setOffsetX] = useState<number>(10);
  const [offsetY, setOffsetY] = useState<number>(50);
  const [color, setColor] = useState<RgbaColor>({
    r: 0,
    g: 0,
    b: 0,
    a: 0.5,
  });

  const { isLoading, error, upload } = useLazyUpload();

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();

    const imageFiles = images.map((imageData) => imageData.file);

    const blob = await upload(
      imageFiles,
      text,
      color,
      fontSize,
      offsetX,
      offsetY,
    );

    if (blob) {
      downloadFile(blob, "watermarked_images.zip");
      setImages([]);
    }
  }

  function onDrop(acceptedFiles: File[]) {
    if (!acceptedFiles.length) {
      return;
    }

    setImages([
      ...images,
      ...acceptedFiles.map((file) => ({
        id: uuidv4(),
        file: file,
      })),
    ]);
  }

  const removeHandler = useCallback(
    (id: string) => {
      setImages(images.filter((image) => image.id !== id));
    },
    [images],
  );

  return (
    <form onSubmit={handleUpload} className={`${styles.form} ${className}`}>
      {error && <ErrorAlert message={error} />}

      <section>
        <RgbaColorPicker
          color={color}
          onChange={setColor}
          className={styles.colorPicker}
        />

        <div className={styles.inputs}>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Watermark"
            label="Watermark Text"
            className={styles.input}
          />

          <Input
            value={fontSize}
            type="number"
            onChange={(e) => setFontSize(+e.target.value)}
            placeholder="24"
            min={1}
            label="Font Size"
            className={styles.input}
          />

          <div className={styles.offsets}>
            <Input
              value={offsetX}
              type="number"
              onChange={(e) => setOffsetX(+e.target.value)}
              label="Horizontal offset"
              className={styles.input}
            />

            <Input
              value={offsetY}
              onChange={(e) => setOffsetY(+e.target.value)}
              label="Vertical offset"
              className={styles.input}
            />
          </div>
        </div>
      </section>

      <ImageDropzone className={styles.dropzone} onDrop={onDrop} />

      <Button
        className={styles.uploadButton}
        disabled={isLoading || !text || !images.length}
      >
        {isLoading && <Spinner />}
        Upload {images.length} image(s)
      </Button>

      <ImagePreview
        images={images}
        removeHandler={removeHandler}
        className={styles.imagePreview}
      />
    </form>
  );
}
