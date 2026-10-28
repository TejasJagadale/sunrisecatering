// Tiny registry so any component can talk to the (optional) Lenis instance.
// Lenis is not created when the visitor prefers reduced motion, so every helper has a native fallback.

let instance = null;

export const setLenis = (lenis) => {
  instance = lenis;
};
export const getLenis = () => instance;

export function scrollToTarget(target, options = {}) {
  if (instance) {
    instance.scrollTo(target, { offset: -84, duration: 1.1, ...options });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'auto' });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function scrollToTopNow() {
  if (instance) instance.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
}

// Lock page scroll while a drawer / lightbox is open.
export function lockScroll(locked) {
  document.documentElement.classList.toggle('is-locked', locked);
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
}

// Called after a route change: reset to top, or jump to the #hash target.
export function scrollAfterNavigate() {
  scrollToTopNow();
  const { hash } = window.location;
  if (hash && hash.length > 1) {
    window.setTimeout(() => {
      let el = null;
      try {
        el = document.querySelector(decodeURIComponent(hash));
      } catch {
        el = null;
      }
      if (el) scrollToTarget(el);
    }, 120);
  }
}
