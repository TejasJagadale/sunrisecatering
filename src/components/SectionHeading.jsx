import SplitHeading from './SplitHeading';
import { RollingPin, Squiggle } from './FoodIllustrations';

export default function SectionHeading({ id, eyebrow, lines, lead, as = 'h2', align = 'left', doodle = false, className = '', light = false }) {
  return (
    <header className={`section-heading ${align === 'center' ? 'is-center' : ''} ${light ? 'is-light' : ''} ${className}`}>
      {eyebrow && (
        <p className="eyebrow" data-reveal="fade">
          {eyebrow}
        </p>
      )}
      <SplitHeading as={as} lines={lines} className="h-section" id={id} />
      {doodle && (
        <span className="heading-doodle" aria-hidden="true" data-reveal="fade" data-delay="0.2">
          <RollingPin />
        </span>
      )}
      {!doodle && <Squiggle className="heading-squiggle" />}
      {lead && (
        <p className="lead" data-reveal>
          {lead}
        </p>
      )}
    </header>
  );
}
