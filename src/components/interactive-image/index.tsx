import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

import styles from "./interactive-image.module.scss";

export function InteractiveImage({
  id,
  file,
  removeHandler,
  className,
}: {
  id: string;
  file: File;
  removeHandler: (id: string) => void;
  className?: string;
}) {
  const src = URL.createObjectURL(file);

  return (
    <div className={`${styles.container} ${className}`}>
      <Image
        src={src}
        alt=""
        width={192}
        height={192}
        className={styles.image}
      />

      <div className={styles.deleteButton} onClick={() => removeHandler(id)}>
        <X className={styles.icon} />
      </div>
    </div>
  );
}
