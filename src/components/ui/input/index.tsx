import React from "react";

import styles from "./input.module.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, ...props }, ref) => (
    <div className={className}>
      <label htmlFor="" className={styles.label}>
        {label}
      </label>
      <input ref={ref} className={styles.input} {...props} />
    </div>
  ),
);
Input.displayName = "Input";
