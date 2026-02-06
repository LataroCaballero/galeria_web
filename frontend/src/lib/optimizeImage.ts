import imageCompression from 'browser-image-compression';

const OPTIONS = {
  maxSizeMB: 2,
  maxWidthOrHeight: 2048,
  useWebWorker: true,
  initialQuality: 0.92,
  preserveExif: false,
};

export async function optimizeImage(file: File): Promise<File> {
  const compressed = await imageCompression(file, OPTIONS);
  return new File([compressed], file.name, { type: compressed.type });
}
