import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useReveals } from '../lib/motion';
import { scrollAfterNavigate } from '../lib/lenis';
import { SunriseMark } from './FoodIllustrations';

// Wraps every page. Framer Motion only animates this wrapper's OPACITY (never a transform), so the
// GSAP/ScrollTrigger measurements inside the page stay exact. A green "sunrise curtain" lifts on
// each navigation for a little personality.

function PageShell({ children }) {
  const ref = useRef(null);
  useReveals(ref);
  return (
    <div ref={ref} className="page">
      {children}
    </div>
  );
}

export default function PageTransition({ children }) {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const isFirstRender = useRef(true);
  const showCurtain = !reduce && !isFirstRender.current;

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <>
      <AnimatePresence mode="wait" initial={false} onExitComplete={scrollAfterNavigate}>
        <motion.main
          key={pathname}
          id="main"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.3, ease: 'easeOut' }}
        >
          <PageShell>{children}</PageShell>
        </motion.main>
      </AnimatePresence>
      {showCurtain && (
        <motion.div
          key={`curtain-${pathname}`}
          className="curtain"
          aria-hidden="true"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{
            clipPath: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 0% 0%)', 'inset(0% 0% 100% 0%)'],
          }}
          transition={{ duration: 0.9, times: [0, 0.4, 0.5, 1], ease: 'easeInOut' }}
        >
          <SunriseMark className="curtain-mark" />
        </motion.div>
      )}
    </>
  );
}
