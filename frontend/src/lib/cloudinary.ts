/**
 * Inject Cloudinary transformation parameters into a URL.
 * Works with URLs like: https://res.cloudinary.com/xxx/image/upload/v123/file.jpg
 * Inserts transforms after "upload/" segment.
 */
export function cloudinaryUrl(
  url: string,
  opts: { width?: number; height?: number; quality?: string; format?: string } = {},
): string {
  if (!url || !url.includes('res.cloudinary.com')) return url;

  const { width, height, quality = 'auto', format = 'auto' } = opts;
  const transforms: string[] = [`f_${format}`, `q_${quality}`];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  transforms.push('c_limit');

  return url.replace('/upload/', `/upload/${transforms.join(',')}/`);
}
