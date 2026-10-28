// One animation system: GSAP + ScrollTrigger drives every scroll-based effect.
// Framer Motion is only used for UI state (page fades, drawer, lightbox, tabs) and never touches
// the same elements GSAP animates, so the two cannot fight over transforms.
//
// Authoring API – add data attributes to markup, the hook below does the rest:
//   data-split            SplitHeading words slide up
//   data-reveal[=left|right|scale|fade]   fade/slide in once
//   data-delay="0.2"      optional delay for the two above
//   data-stagger          children fade/slide in one after another
//   data-mask             image "uncover" (clip-path) + subtle zoom-out
//   data-parallax="30"    decorative element drifts ±30px as its section scrolls
//   data-pimg             inner layer of <ParallaxImage/>
//   data-draw             SVG path (pathLength=1) that draws itself on scroll
//   data-pop              illustration pops in
//
// Nothing is hidden by CSS: start states are applied by GSAP itself, so if JavaScript fails the
// content simply stays visible.
import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const once = (trigger, start = 'top 88%') => ({ trigger, start, once: true });

export function useReveals(scopeRef, deps = []) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return undefined;

    const mm = gsap.matchMedia(scope);
    mm.add(
      { motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 861px)' },
      (ctx) => {
        const { motion, desktop } = ctx.conditions;
        if (!motion) return;
        const all = (sel) => gsap.utils.toArray(sel, scope);

        all('[data-split]').forEach((el) => {
          const words = el.querySelectorAll('.sw-i');
          if (!words.length) return;
          gsap.from(words, {
            yPercent: 118,
            rotate: 4,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.07,
            delay: Number(el.dataset.delay || 0),
            scrollTrigger: once(el, 'top 94%'),
          });
        });

        all('[data-reveal]').forEach((el) => {
          const type = el.dataset.reveal;
          const vars = {
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: Number(el.dataset.delay || 0),
            scrollTrigger: once(el),
          };
          if (type === 'left') vars.x = -60;
          else if (type === 'right') vars.x = 60;
          else if (type === 'scale') vars.scale = 0.9;
          else if (type !== 'fade') vars.y = 40;
          gsap.from(el, vars);
        });

        all('[data-stagger]').forEach((box) => {
          const kids = Array.from(box.children);
          if (!kids.length) return;
          gsap.from(kids, {
            opacity: 0,
            y: 36,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: once(box, 'top 86%'),
          });
        });

        all('[data-mask]').forEach((el) => {
          const img = el.querySelector('img');
          gsap.fromTo(
            el,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.2,
              ease: 'power3.inOut',
              clearProps: 'clipPath',
              scrollTrigger: once(el, 'top 90%'),
            },
          );
          if (img) {
            gsap.from(img, {
              scale: 1.3,
              duration: 1.6,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: once(el, 'top 90%'),
            });
          }
        });

        all('[data-pop]').forEach((el) => {
          gsap.from(el, {
            scale: 0.4,
            rotate: -18,
            opacity: 0,
            duration: 0.9,
            ease: 'back.out(1.8)',
            delay: Number(el.dataset.delay || 0),
            scrollTrigger: once(el, 'top 92%'),
          });
        });

        // Decorative drift – lighter on small screens.
        all('[data-parallax]').forEach((el) => {
          const amount = (Number(el.dataset.parallax) || 30) * (desktop ? 1 : 0.4);
          gsap.fromTo(
            el,
            { y: -amount },
            {
              y: amount,
              ease: 'none',
              scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
            },
          );
        });

        // Photographic parallax only on larger screens (keeps phones smooth).
        if (desktop) {
          all('[data-pimg]').forEach((el) => {
            gsap.fromTo(
              el,
              { yPercent: -7 },
              {
                yPercent: 7,
                ease: 'none',
                scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
              },
            );
          });
        }

        all('[data-draw]').forEach((path) => {
          gsap.fromTo(
            path,
            { strokeDasharray: 1, strokeDashoffset: 1 },
            {
              strokeDashoffset: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: path.closest('[data-draw-scope]') || path,
                start: 'top 70%',
                end: 'bottom 70%',
                scrub: true,
              },
            },
          );
        });
      },
    );

    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 350);
    window.addEventListener('load', refresh, { once: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', refresh);
      mm.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
