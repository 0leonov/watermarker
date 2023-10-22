import React, { memo } from "react";

import styles from "./image-preview.module.scss";

import { InteractiveImage } from "@/components/interactive-image";
import { ImageData } from "@/types";

export const ImagePreview = memo(function ImagePreview({
  images,
  removeHandler,
  className,
}: {
  images: ImageData[];
  removeHandler: (id: string) => void;
  className?: string;
}) {
  if (!images.length) {
    return null;
  }

  return (
    <div className={className}>
      <h2>Upload Preview</h2>

      <div className={styles.images}>
        {images.map(({ id, file }) => (
          <InteractiveImage
            key={id}
            id={id}
            file={file}
            removeHandler={removeHandler}
          />
        ))}
      </div>
    </div>
  );
});
