import { Sparkle } from './FoodIllustrations';

// CSS-only infinite ticker. The duplicate row is hidden from assistive tech.
export default function Marquee({ items, reverse = false, className = '' }) {
  const row = (hidden) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {items.map((text) => (
        <li key={text}>
          <span>{text}</span>
          <Sparkle />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`marquee ${reverse ? 'is-reverse' : ''} ${className}`}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
        {row(true)}
      </div>
    </div>
  );
}
