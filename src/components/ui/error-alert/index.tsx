import React from "react";

import styles from "./error-alert.module.scss";

export function ErrorAlert({
  className,
  message,
}: {
  className?: string;
  message: string;
}) {
  return <div className={`${styles.errorAlert} ${className}`}>{message}</div>;
}
