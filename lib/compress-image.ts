/**
 * Browser-side image downscaling for quote-request photos.
 *
 * Vercel caps a function's request body at 4.5 MB, and a modern phone photo is
 * 3–8 MB on its own — so uploading originals would 413 on the first real
 * submission. Resizing to a 1600px JPEG brings a typical photo under ~300 KB,
 * which is still ample to judge whether a dent is PDR-viable, and makes the
 * upload survivable on mobile data.
 */

/** Maximum photos a customer can attach to one enquiry. */
export const MAX_PHOTOS = 5;

/** Client-side ceiling for the combined upload, kept under Vercel's 4.5 MB. */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

const MAX_EDGE = 1600;
const QUALITY = 0.8;

export const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

function toJpgName(name: string): string {
  const base = name.replace(/\.[^.]+$/, "").trim() || "photo";
  return `${base}.jpg`;
}

async function decode(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") {
    try {
      // `from-image` honours the EXIF orientation flag — without it, photos
      // taken in portrait arrive in the inbox rotated on their side.
      return await createImageBitmap(file, { imageOrientation: "from-image" });
    } catch {
      // Fall through to the <img> path below.
    }
  }

  return await new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Could not read ${file.name}`));
    };
    img.src = url;
  });
}

/**
 * Downscales and re-encodes an image as JPEG. Returns the original untouched if
 * compressing it would not actually make it smaller.
 *
 * Throws if the file cannot be decoded — the caller should surface that to the
 * customer rather than silently dropping the photo.
 */
export async function compressImage(file: File): Promise<File> {
  const source = await decode(file);

  const width = source.width;
  const height = source.height;
  if (!width || !height) throw new Error(`Could not read ${file.name}`);

  const scale = Math.min(1, MAX_EDGE / Math.max(width, height));
  const targetWidth = Math.max(1, Math.round(width * scale));
  const targetHeight = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Image compression is unavailable in this browser");

  ctx.drawImage(source, 0, 0, targetWidth, targetHeight);
  if (source instanceof ImageBitmap) source.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", QUALITY)
  );
  if (!blob) throw new Error(`Could not process ${file.name}`);

  // Re-encoding an already-small image can make it bigger; keep the smaller one.
  if (blob.size >= file.size) return file;

  return new File([blob], toJpgName(file.name), {
    type: "image/jpeg",
    lastModified: file.lastModified,
  });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
