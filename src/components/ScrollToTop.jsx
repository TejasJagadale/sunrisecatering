import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { scrollToTarget } from '../lib/lenis';

// 1) Handles #hash jumps on the same page / first load (cross-page jumps are handled by
//    PageTransition once the exit animation finishes).
// 2) Renders the back-to-top button.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const samePage = previousPath.current === null || previousPath.current === pathname;
    const firstLoad = previousPath.current === null;
    previousPath.current = pathname;
    if (!hash || !samePage) return undefined;
    const timer = window.setTimeout(
      () => {
        try {
          const el = document.querySelector(decodeURIComponent(hash));
          if (el) scrollToTarget(el);
        } catch {
          /* invalid selector – ignore */
        }
      },
      firstLoad ? 700 : 30,
    );
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      className={`to-top ${visible ? 'is-visible' : ''}`}
      onClick={() => scrollToTarget(0, { offset: 0 })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
