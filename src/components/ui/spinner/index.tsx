import { Loader2 } from "lucide-react";
import React from "react";

import styles from "./spinner.module.scss";

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={`${styles.spinner} ${className}`} />;
}
