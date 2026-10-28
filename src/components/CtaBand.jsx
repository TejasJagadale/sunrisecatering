import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';
import SplitHeading from './SplitHeading';
import { Confetti, SunBurst } from './FoodIllustrations';
import { ENQUIRY_PATH, SITE, whatsappLink } from '../config/site';

// Reusable "tell us about your event" band used at the end of every page.
export default function CtaBand({
  eyebrow = 'Planning an event?',
  lines = ['Let’s cook up your *celebration*.'],
  text = 'Tell us the occasion, the guest count and the kind of meal you have in mind. We will talk it through with you.',
  primary = { to: ENQUIRY_PATH, label: 'Plan Your Event' },
  whatsappText,
  tone = 'sun',
}) {
  return (
    <section className={`cta-band tone-${tone}`} aria-labelledby="cta-heading">
      <Confetti className="cta-confetti" />
      <div className="container cta-inner">
        <div className="cta-copy">
          <p className="eyebrow" data-reveal="fade">
            {eyebrow}
          </p>
          <SplitHeading as="h2" lines={lines} className="h-section" id="cta-heading" />
          <p className="lead" data-reveal>
            {text}
          </p>
          <div className="cta-actions" data-reveal>
            <Link className="btn btn-dark" to={primary.to}>
              {primary.label} <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a className="btn btn-ghost-dark" href={whatsappLink(whatsappText)} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} aria-hidden="true" /> WhatsApp
            </a>
            <a className="btn btn-ghost-dark" href={SITE.phoneHref}>
              <Phone size={18} aria-hidden="true" /> {SITE.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="cta-art" aria-hidden="true" data-pop>
          <SunBurst />
        </div>
      </div>
    </section>
  );
}
