import { IMAGES } from '../config/images';

// Image with a subtle depth effect. The inner layer is moved by GSAP (see data-pimg in lib/motion.js);
// on phones and for reduced-motion visitors it simply stays still.
export default function ParallaxImage({ name, image, ratio = '4 / 5', className = '', eager = false, badge = true, alt }) {
  const img = image || IMAGES[name];
  if (!img) return null;
  return (
    <figure className={`pimg ${className}`} style={{ aspectRatio: ratio }}>
      <div className="pimg-inner" data-pimg>
        <img
          src={img.src}
          alt={alt ?? img.alt}
          width={img.w}
          height={img.h}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'auto'}
        />
      </div>
      {img.sample && badge && <span className="sample-badge">Sample image</span>}
    </figure>
  );
}
