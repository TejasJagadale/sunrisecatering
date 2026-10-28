import { createElement } from 'react';

// Semantic section wrapper. Pass `stagger` to make its direct children appear one after another,
// or `reveal` to fade the whole block in. All motion is handled by useReveals() in lib/motion.js.
export default function AnimatedSection({
  as = 'section',
  className = '',
  stagger = false,
  reveal = false,
  children,
  ...rest
}) {
  return createElement(
    as,
    {
      className,
      'data-stagger': stagger ? '' : undefined,
      'data-reveal': reveal ? (typeof reveal === 'string' ? reveal : '') : undefined,
      ...rest,
    },
    children,
  );
}
