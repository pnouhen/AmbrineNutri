import React from "react";

export async function handleRecipeImage({
  input,
  setFile,
  setPreview,
  setNameLabel,
}) {
  let file;

  // If we receive a URL, we download the image
  if (typeof input === "string") {
    const response = await fetch(input);
    const blob = await response.blob();
    const name = input.split("/").pop().split("?")[0] || "image.webp";
    file = new File([blob], name, { type: blob.type });
  }
  //
  else if (input instanceof File) {
    file = input;
  }

  if (setNameLabel) setNameLabel("Image chargée");

  // Create a new Image instance to handle the uploaded file
  const img = new Image();

  // Initialize a FileReader to read the image file content
  const reader = new FileReader();

  // Once the file is read, assign the result (as a DataURL) to the image source
  reader.onload = () => {
    img.src = reader.result;
  };

  // Start reading the file as a DataURL (required for canvas manipulation)
  reader.readAsDataURL(file);

  // When the image has fully loaded into memory:
  img.onload = () => {
    // Define the target output dimensions
    const targetWidth = 319;
    const targetHeight = 319;

    // Calculate the scaling factor to fully cover the target area
    // Math.max ensures the image fills the canvas with a centered crop
    const scale = Math.max(targetWidth / img.width, targetHeight / img.height);

    // Compute the scaled image dimensions
    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;

    // Calculate the offset to center the crop
    const offsetX = (scaledWidth - targetWidth) / 2;
    const offsetY = (scaledHeight - targetHeight) / 2;

    // Create an offscreen canvas to draw and process the image
    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");

    // Draw the scaled and centered image onto the canvas
    ctx.drawImage(img, -offsetX, -offsetY, scaledWidth, scaledHeight);

    // Convert the canvas content into a compressed WebP file (quality = 0.8)
    canvas.toBlob(
      (blob) => {
        // Generate a new filename with a .webp extension
        const webpName = file.name.replace(/\.\w+$/, ".webp");

        // Create a new File object from the resulting blob
        const webpFile = new File([blob], webpName, { type: "image/webp" });

        // Update React state: preview URL and file reference
        setPreview(URL.createObjectURL(webpFile));
        setFile(webpFile);
      },
      "image/webp",
      0.8
    );
  };
}
