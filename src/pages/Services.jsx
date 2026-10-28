import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardList, Leaf, MapPin, Users, UtensilsCrossed } from 'lucide-react';
import Seo from '../components/Seo';
import SplitHeading from '../components/SplitHeading';
import SectionHeading from '../components/SectionHeading';
import Picture from '../components/Picture';
import CtaBand from '../components/CtaBand';
import { Confetti, Idli, Laddu, PlateSet, Sparkle, Banana } from '../components/FoodIllustrations';
import { PLANNING_TOPICS, SERVICES } from '../data/services';
import '../styles/services.css';

const ICONS = { Users, UtensilsCrossed, MapPin, Leaf, ClipboardList };
const TONES = ['cream', 'butter', 'cream', 'green', 'cream', 'butter', 'sage'];
const ACCENTS = {
  wedding: Laddu,
  engagement: Sparkle,
  birthday: Confetti,
  anniversary: Sparkle,
  private: Idli,
  festival: Banana,
  corporate: PlateSet,
};

function Media({ s }) {
  const base = s.composition.replace('-flip', '');
  const Accent = ACCENTS[s.id];
  if (base === 'stack') {
    return (
      <div className="m-stack">
        <Picture name={s.imageKey} className="m-stack-a" mask sizes="(max-width: 860px) 80vw, 36vw" />
        {s.image2Key && <Picture name={s.image2Key} className="m-stack-b" mask badge={false} sizes="(max-width: 860px) 50vw, 20vw" />}
        <span className="svc-accent" aria-hidden="true" data-parallax="18">
          <Accent />
        </span>
      </div>
    );
  }
  if (base === 'circle') {
    return (
      <div className="m-circle">
        <span className="m-ring" aria-hidden="true" />
        <Picture name={s.imageKey} className="m-circle-pic" mask ratio="1 / 1" sizes="(max-width: 860px) 80vw, 36vw" />
        <span className="svc-accent" aria-hidden="true" data-parallax="22">
          <Accent />
        </span>
      </div>
    );
  }
  if (base === 'wide') {
    return (
      <div className="m-wide">
        <Picture name={s.imageKey} className="m-wide-pic" mask ratio="16 / 10" sizes="(max-width: 860px) 100vw, 56vw" />
        <span className="svc-accent" aria-hidden="true" data-parallax="18">
          <Accent />
        </span>
      </div>
    );
  }
  return (
    <div className="m-arch">
      <Picture name={s.imageKey} className="m-arch-pic" mask ratio="4 / 5" sizes="(max-width: 860px) 80vw, 36vw" />
      <span className="svc-accent" aria-hidden="true" data-parallax="22">
        <Accent />
      </span>
    </div>
  );
}

function ServiceBlock({ s, i }) {
  const tone = TONES[i % TONES.length];
  const flip = s.composition.endsWith('-flip');
  return (
    <section id={s.id} className={`svc tone-${tone} ${flip ? 'is-flip' : ''} comp-${s.composition.replace('-flip', '')}`} aria-labelledby={`${s.id}-title`}>
      <div className="container svc-grid">
        <div className="svc-media">
          <Media s={s} />
        </div>
        <div className="svc-copy">
          <p className="svc-kicker" data-reveal="fade">
            <span className="svc-num">{s.number}</span>
            {s.short}
          </p>
          <SplitHeading as="h2" id={`${s.id}-title`} className="h-section" lines={[s.title]} />
          <p className="lead" data-reveal>
            {s.summary}
          </p>
          <p data-reveal>{s.detail}</p>
          <div className="svc-discuss" data-reveal>
            <h3>Worth talking about</h3>
            <ul className="chips">
              {s.discuss.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <div className="svc-actions" data-reveal>
            <Link className="btn btn-primary" to={`/contact?event=${s.event}#enquiry`}>
              {s.cta} <ArrowRight size={18} aria-hidden="true" />
            </Link>
            {s.extra && (
              <Link className="link-arrow" to={s.extra.to}>
                {s.extra.label} <ArrowRight size={18} aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <>
      <Seo
        path="/services"
        title="Catering Services in Palakkad | Weddings, Parties, Events"
        description="Wedding, engagement, birthday, anniversary, family function, festival and corporate catering from Sunrise Caterers in Kallekkad, near Ottapalam, Palakkad."
      />

      <section className="svc-hero" aria-labelledby="svc-hero-title">
        <div className="container svc-hero-grid">
          <div>
            <p className="eyebrow" data-reveal="fade">
              Catering services
            </p>
            <SplitHeading as="h1" id="svc-hero-title" className="h-hero" lines={['Catering for every', 'kind of *celebration.*']} />
            <p className="hero-lead" data-reveal data-delay="0.3">
              Event catering in Kallekkad and around Palakkad, for weddings, family functions, festivals and workplaces. Pick your
              occasion below, or{' '}
              <Link to="/contact#enquiry">tell us about it directly</Link>.
            </p>
          </div>
          <nav className="svc-index" aria-label="Services on this page" data-stagger>
            <ol>
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link to={`/services#${s.id}`}>
                    <span>{s.number}</span>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <ServiceBlock key={s.id} s={s} i={i} />
      ))}

      <section className="plan section" aria-labelledby="plan-title">
        <div className="container plan-grid">
          <div className="plan-intro">
            <SectionHeading
              eyebrow="Planning with us"
              lines={['What to tell us', 'when you *call*']}
              id="plan-title"
              lead="You don’t need a finished plan. A few details are enough to start a conversation, and we’ll help with the rest."
            />
            <p className="plan-note" data-reveal>
              Extras such as live counters or decoration are not assumed. If you’d like something particular, ask and we’ll tell you
              whether it can be arranged for your event.
            </p>
            <Link className="btn btn-primary" to="/contact#enquiry" data-reveal>
              Start your enquiry <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <ul className="plan-list" data-stagger>
            {PLANNING_TOPICS.map((t) => {
              const Icon = ICONS[t.icon];
              return (
                <li key={t.title}>
                  <span className="plan-icon" aria-hidden="true">
                    <Icon size={24} />
                  </span>
                  <div>
                    <h3>{t.title}</h3>
                    <p>{t.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand
        lines={['Not sure which', 'service fits? *Ask us.*']}
        text="Describe your occasion in a sentence or two, and we’ll point you in the right direction."
        whatsappText="Hello Sunrise Caterers, I'd like help choosing the right catering for my event."
      />
    </>
  );
}
