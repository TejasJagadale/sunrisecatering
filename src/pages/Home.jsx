import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ChevronsDown, MapPin, Phone } from 'lucide-react';
import Seo from '../components/Seo';
import SplitHeading from '../components/SplitHeading';
import SectionHeading from '../components/SectionHeading';
import Picture from '../components/Picture';
import ParallaxImage from '../components/ParallaxImage';
import Marquee from '../components/Marquee';
import CtaBand from '../components/CtaBand';
import {
  BadgeSticker, Banana, Chef, Cloche, Confetti, Idli, Laddu, Ladle, PlateSet, RollingPin, Sparkle, SteamBowl, Sprig, SunBurst,
} from '../components/FoodIllustrations';
import { ABOUT_FACTS, ENQUIRY_PATH, SITE } from '../config/site';
import { SERVICES } from '../data/services';
import { scrollToTarget } from '../lib/lenis';
import '../styles/home.css';

const MARQUEE = ['Made with Care', 'Served with Love', 'Celebrations Made Special', 'Good Food. Grand Celebrations.'];

const FEATURED = ['wedding', 'birthday', 'festival', 'private', 'corporate'].map((id) => SERVICES.find((s) => s.id === id));

const EVENT_PANELS = [
  { id: 'wedding', label: 'Weddings', imageKey: 'svcWedding', text: 'Feasts and buffets planned around the family’s wishes.', event: 'wedding' },
  { id: 'birthday', label: 'Birthdays', imageKey: 'svcBirthday', text: 'Party-friendly food for little ones and grown-ups alike.', event: 'birthday' },
  { id: 'private', label: 'Family functions', imageKey: 'svcPrivate', text: 'Housewarmings, reunions and get-togethers at home or in a hall.', event: 'private' },
  { id: 'festival', label: 'Festivals', imageKey: 'svcFestival', text: 'Traditional meals for festivals and religious gatherings.', event: 'festival' },
  { id: 'corporate', label: 'Corporate', imageKey: 'svcCorporate', text: 'Organised food service for meetings, launches and staff events.', event: 'corporate' },
];

const STEPS = [
  { Art: PlateSet, title: 'Tell us the occasion', text: 'Share the date, guest count and the kind of event, by call, WhatsApp or the enquiry form.' },
  { Art: RollingPin, title: 'Shape the menu together', text: 'We talk through dishes, serving style and dietary needs until the plan feels right.' },
  { Art: SteamBowl, title: 'We prepare with care', text: 'Your agreed menu is cooked and packed with the day’s timings in mind.' },
  { Art: Cloche, title: 'Serve and celebrate', text: 'The food reaches your guests, so you can spend the day with them.' },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const facts = ABOUT_FACTS.filter((f) => f.value);

  return (
    <>
      <Seo
        path="/"
        title="Caterers in Palakkad | Wedding & Event Catering"
        description="Sunrise Caterers & Event Management in Kallekkad, Palakkad: wedding, engagement, birthday and family function catering near Ottapalam. Call +91 84880 70589."
      />

      {/* ───────────── Hero ───────────── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-bg" aria-hidden="true">
          <Confetti className="hero-confetti" />
        </div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow" data-reveal="fade">
              <MapPin size={16} aria-hidden="true" /> Kallekkad, Palakkad · Kerala
            </p>
            <SplitHeading as="h1" id="hero-title" className="h-hero" lines={['Good Food.', 'Grand', '*Celebrations.*']} />
            <p className="hero-lead" data-reveal data-delay="0.35">
              {SITE.name} brings warm Kerala hospitality to weddings, family functions and every gathering worth a good meal. Tell us
              about your celebration, and we’ll help plan the food.
            </p>
            <div className="hero-cta" data-reveal data-delay="0.5">
              <Link className="btn btn-primary btn-lg" to={ENQUIRY_PATH}>
                Plan Your Event <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link className="btn btn-ghost btn-lg" to="/services">
                Explore Our Services
              </Link>
            </div>
            <ul className="hero-points" data-reveal data-delay="0.65">
              <li>
                <Phone size={16} aria-hidden="true" />
                <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
              </li>
              <li>
                <Sparkle /> Weddings · Family functions · Corporate events
              </li>
            </ul>
          </div>

          <div className="hero-art">
            <div className="hero-sun" aria-hidden="true">
              <SunBurst />
            </div>
            <Picture name="heroMain" className="hero-arch" eager mask sizes="(max-width: 860px) 80vw, 40vw" />
            <Picture name="heroSide" className="hero-card" eager mask sizes="(max-width: 860px) 40vw, 20vw" />
            <div className="hero-chef" aria-hidden="true" data-pop data-delay="0.6">
              <Chef />
            </div>
            <span className="hf hf-idli" aria-hidden="true" data-parallax="30"><Idli /></span>
            <span className="hf hf-banana" aria-hidden="true" data-parallax="22"><Banana /></span>
            <span className="hf hf-laddu" aria-hidden="true" data-parallax="38"><Laddu /></span>
            <span className="hf hf-ladle" aria-hidden="true" data-parallax="26"><Ladle /></span>
            <span className="hf hf-spark1" aria-hidden="true" data-parallax="16"><Sparkle /></span>
            <span className="hf hf-spark2" aria-hidden="true" data-parallax="24"><Sparkle /></span>
          </div>
        </div>

        <button type="button" className="scroll-cue" onClick={() => scrollToTarget('#intro')} aria-label="Scroll to the introduction">
          <span>Scroll</span>
          <span className="scroll-cue-track" aria-hidden="true">
            <ChevronsDown size={18} />
          </span>
        </button>
      </section>

      {/* ───────────── Brand introduction ───────────── */}
      <section id="intro" className="intro section" aria-labelledby="intro-title">
        <div className="container intro-grid">
          <div className="intro-media">
            <ParallaxImage name="intro" ratio="4 / 5" className="intro-img" />
            <div className="intro-badge" data-pop aria-hidden="true">
              <BadgeSticker />
            </div>
            <span className="intro-sprig" aria-hidden="true" data-parallax="18">
              <Sprig />
            </span>
          </div>
          <div className="intro-copy">
            <SectionHeading
              id="intro-title"
              eyebrow="Welcome to Sunrise"
              lines={['Food that feels like *home,*', 'served at your *celebration.*']}
              doodle
            />
            <p data-reveal>
              Sunrise Caterers &amp; Event Management is a caterer based in Kallekkad, Palakkad. We believe a celebration is only as good
              as the meal at its centre, and that good hospitality means making every guest feel looked after.
            </p>
            <p data-reveal>
              Whether you are planning a wedding feast or a family function at home, tell us what you have in mind. We will help you
              shape the menu, the serving style and the arrangements for the day.
            </p>
            {facts.length > 0 && (
              <dl className="facts" data-stagger>
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <Link className="link-arrow" to="/about" data-reveal>
              Read our story <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <Marquee items={MARQUEE} className="home-marquee" />

      {/* ───────────── Featured services ───────────── */}
      <section className="fs section" aria-labelledby="fs-title">
        <div className="container">
          <SectionHeading
            id="fs-title"
            eyebrow="What we cater"
            lines={['Every occasion deserves', 'a *good meal.*']}
            lead="From grand weddings to quiet family functions, here are some of the celebrations we can cater for."
          />
          <div className="fs-grid" data-stagger>
            {FEATURED.map((s, i) => (
              <Link key={s.id} to={`/services#${s.id}`} className={`fs-tile fs-${i + 1}`}>
                <Picture name={s.imageKey} ratio="auto" badge={false} />
                <span className="fs-shade" aria-hidden="true" />
                <span className="fs-num">{s.number}</span>
                <span className="fs-body">
                  <span className="fs-title">{s.title}</span>
                  <span className="fs-short">{s.short}</span>
                </span>
                <span className="fs-arrow" aria-hidden="true">
                  <ArrowUpRight size={20} />
                </span>
              </Link>
            ))}
            <Link to="/services" className="fs-tile fs-6 fs-all">
              <span className="fs-all-art" aria-hidden="true">
                <PlateSet />
              </span>
              <span className="fs-title">See all services</span>
              <span className="fs-short">Engagements, anniversaries and more</span>
              <span className="fs-arrow" aria-hidden="true">
                <ArrowRight size={20} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── Signature feast ───────────── */}
      <section className="feast section" aria-labelledby="feast-title">
        <div className="container feast-grid">
          <div className="feast-copy">
            <SectionHeading
              light
              id="feast-title"
              eyebrow="The feast"
              lines={['A table worth', 'gathering *around.*']}
              lead="Kerala-style feasts, festive sweets and food made for sharing. The dishes you see are illustrative; your menu is planned with you."
            />
            <ul className="feast-list" data-stagger>
              <li>
                <span className="feast-dot" aria-hidden="true" />
                <div>
                  <h3>Banana-leaf feasts</h3>
                  <p>A traditional way to serve, which can be discussed for weddings, festivals and family functions.</p>
                </div>
              </li>
              <li>
                <span className="feast-dot" aria-hidden="true" />
                <div>
                  <h3>Buffets for bigger gatherings</h3>
                  <p>Easy for guests to enjoy, with arrangements talked through for your venue.</p>
                </div>
              </li>
              <li>
                <span className="feast-dot" aria-hidden="true" />
                <div>
                  <h3>Snacks, sweets and drinks</h3>
                  <p>Welcome drinks, starters and desserts to bookend the meal.</p>
                </div>
              </li>
            </ul>
            <div className="feast-links" data-reveal>
              <Link className="btn btn-yellow" to="/menu">
                Browse the sample menu
              </Link>
              <Link className="link-arrow on-dark" to="/weddings">
                Wedding feasts <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="feast-stack">
            <div className="fc fc-1" data-parallax="22">
              <Picture name="menuKerala" ratio="4 / 3" sizes="(max-width: 860px) 70vw, 30vw" />
            </div>
            <div className="fc fc-2" data-parallax="-26">
              <Picture name="wedFeast" ratio="4 / 5" sizes="(max-width: 860px) 60vw, 26vw" />
            </div>
            <div className="fc fc-3" data-parallax="30">
              <Picture name="menuDesserts" ratio="1 / 1" sizes="(max-width: 860px) 50vw, 20vw" />
            </div>
            <div className="feast-cloche" aria-hidden="true" data-pop>
              <Cloche />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Interactive event gallery ───────────── */}
      <section className="eg-section section" aria-labelledby="eg-title">
        <div className="container">
          <SectionHeading
            id="eg-title"
            eyebrow="Celebrations"
            lines={['Pick an occasion,', 'we’ll *set the table.*']}
            lead="Hover or tap a panel to explore the kinds of events we can cater."
          />
        </div>
        <div className="container eg-wrap" data-reveal>
          <div className="eg" role="group" aria-label="Event types we cater for">
            {EVENT_PANELS.map((p, i) => (
              <article
                key={p.id}
                className={`eg-panel ${active === i ? 'is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <Picture name={p.imageKey} ratio="auto" badge={active === i} sizes="(max-width: 860px) 100vw, 40vw" />
                <span className="eg-shade" aria-hidden="true" />
                <button type="button" className="eg-tab" aria-expanded={active === i} onClick={() => setActive(i)}>
                  <span className="eg-num">0{i + 1}</span>
                  <span className="eg-label">{p.label}</span>
                </button>
                <div className="eg-body">
                  <p>{p.text}</p>
                  <Link to={`/contact?event=${p.event}#enquiry`}>
                    Enquire about {p.label.toLowerCase()} <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="eg-more">
            <Link className="link-arrow" to="/gallery">
              Open the full gallery <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      {/* ───────────── Process ───────────── */}
      <section className="how section" aria-labelledby="how-title">
        <div className="container">
          <SectionHeading id="how-title" eyebrow="How it works" lines={['How we make it', '*special*']} align="center" />
          <ol className="how-list" data-stagger>
            {STEPS.map(({ Art, title, text }, i) => (
              <li key={title} className="how-step">
                <span className="how-art" aria-hidden="true">
                  <Art />
                </span>
                <span className="how-num">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        lines={['Ready to plan your', '*celebration?*']}
        text="Tell us about your event and we will talk through the menu, the numbers and the arrangements with you."
        whatsappText="Hello Sunrise Caterers, I'd like to plan catering for an upcoming event."
      />
    </>
  );
}
