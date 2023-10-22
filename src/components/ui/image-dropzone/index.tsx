import { FileUp } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";

import styles from "./image-dropzone.module.scss";

export interface ImageDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  className?: string;
}

export function ImageDropzone({ className, onDrop }: ImageDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
  });

  return (
    <div
      {...getRootProps({
        className: `${styles.dropzone} ${
          isDragActive && styles.active
        } ${className}`,
      })}
    >
      <input {...getInputProps()} />

      <FileUp />

      <span>
        {isDragActive ? "Drop images here" : "Choose images or drag it here"}
      </span>

      <span className={styles.extensions}>.jpeg, .jpg, .png</span>
    </div>
  );
}
