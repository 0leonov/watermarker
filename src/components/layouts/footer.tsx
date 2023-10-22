import Link from "next/link";
import React from "react";

import styles from "./footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      Created by{" "}
      <Link href="https://github.com/0leonov" target="_blank">
        Artyom Leonov
      </Link>
      . The source code is available on{" "}
      <Link href="https://github.com/0leonov" target="_blank">
        Github
      </Link>
      .
    </footer>
  );
}
