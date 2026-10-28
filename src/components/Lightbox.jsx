import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { lockScroll } from '../lib/lenis';

// Accessible image lightbox: Escape closes, ←/→ navigate, swipe on touch, focus is trapped and restored.
export default function Lightbox({ items, index, onClose, onIndex }) {
  const reduce = useReducedMotion();
  const open = index !== null && index >= 0;
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const lastFocus = useRef(null);
  const item = open ? items[index] : null;

  const go = (dir) => onIndex((index + dir + items.length) % items.length);

  useEffect(() => {
    if (!open) return undefined;
    lastFocus.current = document.activeElement;
    lockScroll(true);
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab') {
        const nodes = dialogRef.current?.querySelectorAll('button:not([disabled])');
        if (!nodes?.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      lockScroll(false);
      lastFocus.current?.focus?.({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          ref={dialogRef}
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${item.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <button ref={closeRef} type="button" className="lb-btn lb-close" onClick={onClose} aria-label="Close image viewer">
            <X size={24} aria-hidden="true" />
          </button>
          <button type="button" className="lb-btn lb-prev" onClick={() => go(-1)} aria-label="Previous image">
            <ChevronLeft size={28} aria-hidden="true" />
          </button>
          <button type="button" className="lb-btn lb-next" onClick={() => go(1)} aria-label="Next image">
            <ChevronRight size={28} aria-hidden="true" />
          </button>

          <motion.figure
            key={item.id}
            className="lb-figure"
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            drag={reduce ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1);
              else if (info.offset.x > 80) go(-1);
            }}
          >
            <img src={item.src} alt={item.alt} width={item.w} height={item.h} draggable="false" />
            <figcaption>
              <span>
                {item.title}
                {item.sample && <em> · Sample image</em>}
              </span>
              <span className="lb-count" aria-live="polite">
                {index + 1} / {items.length}
              </span>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
