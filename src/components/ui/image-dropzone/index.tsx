import { FileUp } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";

import styles from "./image-dropzone.module.scss";

export interface ImageDropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  className?: string;
}

export const ImageDropzone = React.forwardRef<
  HTMLInputElement,
  ImageDropzoneProps
>(({ className, onDrop }, ref) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
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
      <input {...getInputProps()} ref={ref} />

      <FileUp />

      <span>
        {isDragActive ? "Drop images here" : "Choose images or drag it here"}
      </span>

      <span className={styles.extensions}>.jpeg, .jpg, .png</span>
    </div>
  );
});
ImageDropzone.displayName = "ImageDropzone";
