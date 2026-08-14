const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 0.7;
const COMPRESSION_TIMEOUT_MS = 8000;

async function compress(file: File): Promise<File> {
  const bitmap = await createImageBitmap(file);

  const scale = Math.min(
    1,
    MAX_DIMENSION / Math.max(bitmap.width, bitmap.height)
  );
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return file;

  ctx.drawImage(bitmap, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY)
  );

  if (!blob) return file;

  const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], name, { type: "image/jpeg" });
}

// Some mobile browsers occasionally stall (not reject) decoding certain
// camera photos via createImageBitmap. A plain try/catch can't guard
// against a hang, only a rejection — so this races compression against a
// timeout and always falls back to the original file rather than blocking
// the upload indefinitely.
export function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    let settled = false;

    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve(file);
      }
    }, COMPRESSION_TIMEOUT_MS);

    compress(file)
      .then((result) => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          resolve(result);
        }
      })
      .catch(() => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          resolve(file);
        }
      });
  });
}
