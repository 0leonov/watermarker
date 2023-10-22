import Image from "next/image";
import React from "react";

import styles from "./main-page.module.scss";

import { UploadImageForm } from "@/components/forms/upload-image-form";
import { Footer } from "@/components/layouts/footer";

export default function MainPage() {
  return (
    <div className={styles.page}>
      <main>
        <div className={styles.logo}>
          <Image src="/images/logo.svg" width={32} height={32} alt="" />
          <h1>Watermarker</h1>
        </div>

        <div className={styles.instruction}>
          <p>
            <strong>Upload Image: </strong>
            To upload images, you can use drag and drop or select the file
            manually.
          </p>

          <p>
            <strong>Add Watermark to Images: </strong>
            Type the desired text in the provided text input.
          </p>

          <p>
            <strong>Text Customization: </strong>
            Adjust the font transparency, size, and color using the available
            options.
          </p>

          <p>
            <strong>Position Text: </strong>
            Set the text position by specifying the offset from the top-left
            corner of the image. (Recommended that the vertical offset be larger
            than the font size)
          </p>

          <p>
            <strong>Delete Image: </strong>
            To remove an image, click on the image in the preview section.
          </p>

          <p>
            <strong>Download Image: </strong>
            Click the upload button, and an archive with your watermarked images
            will be downloaded.
          </p>
        </div>

        <UploadImageForm className={styles.form} />
      </main>

      <Footer />
    </div>
  );
}
