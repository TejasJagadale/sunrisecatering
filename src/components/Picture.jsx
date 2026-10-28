import { IMAGES } from '../config/images';

// Single place that renders photographs: lazy loading, fixed aspect ratio (no layout shift)
// and an honest "Sample" badge while the image is placeholder artwork.
export default function Picture({
  name,
  image,
  className = '',
  eager = false,
  mask = false,
  ratio,
  badge = true,
  sizes = '(max-width: 860px) 100vw, 50vw',
  alt,
  style,
}) {
  const img = image || IMAGES[name];
  if (!img) return null;
  return (
    <figure
      className={`pic ${className}`}
      data-mask={mask ? '' : undefined}
      style={{ aspectRatio: ratio || `${img.w} / ${img.h}`, ...style }}
    >
      <img
        src={img.src}
        alt={alt ?? img.alt}
        width={img.w}
        height={img.h}
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={eager ? 'high' : 'auto'}
      />
      {img.sample && badge && <span className="sample-badge">Sample image</span>}
    </figure>
  );
}
