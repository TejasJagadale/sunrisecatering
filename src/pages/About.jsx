import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Seo from '../components/Seo';
import SplitHeading from '../components/SplitHeading';
import SectionHeading from '../components/SectionHeading';
import Picture from '../components/Picture';
import ParallaxImage from '../components/ParallaxImage';
import CtaBand from '../components/CtaBand';
import { BadgeSticker, Chef, Cloche, Ladle, PlateSet, RollingPin, Sparkle, SteamBowl, Sprig } from '../components/FoodIllustrations';
import { ABOUT_FACTS } from '../config/site';
import { IMAGES } from '../config/images';
import '../styles/about.css';

// EDIT: replace the wording below with the owner's real story once they share it.
// Nothing here states a founding year, awards, client numbers or credentials.
const VALUES = [
  { title: 'Freshness', text: 'Good food starts with good ingredients and food cooked close to serving time. This is the standard we aim for on every order.' },
  { title: 'Thoughtful service', text: 'Hosts should get to be guests at their own event. We plan the details so that the food side runs quietly in the background.' },
  { title: 'Attention to detail', text: 'Dietary needs, serving times, how guests move through the meal. The small things are the ones people notice.' },
  { title: 'Memorable hospitality', text: 'A full plate matters, but so does a warm welcome. We want every guest to leave feeling looked after.' },
];

const SPLIT = [
  { key: 'aboutKitchen', label: 'In the kitchen', text: 'Menus are prepared with the schedule of your event in mind.' },
  { key: 'aboutDishes', label: 'On the pass', text: 'Traditional dishes and crowd-pleasers, plated for sharing.' },
  { key: 'aboutServing', label: 'At the table', text: 'Service that keeps the meal moving without hurrying anyone.' },
  { key: 'aboutSetup', label: 'Around the venue', text: 'Setups that suit a hall, a home or an open lawn.' },
];

const SEQUENCE = [
  { key: 'aboutStory', cap: 'Where the day begins' },
  { key: 'svcWedding', cap: 'Weddings' },
  { key: 'menuKerala', cap: 'The feast' },
  { key: 'svcBirthday', cap: 'Birthdays' },
  { key: 'wedTable', cap: 'Dining setups' },
  { key: 'svcFestival', cap: 'Festivals' },
];

const JOURNEY = [
  { Art: PlateSet, title: 'You tell us', text: 'Occasion, date, guests and ideas.' },
  { Art: RollingPin, title: 'We plan', text: 'Menu, serving style and timings.' },
  { Art: SteamBowl, title: 'We cook', text: 'Preparation around your schedule.' },
  { Art: Ladle, title: 'We pack & carry', text: 'Food leaves the kitchen for your venue.' },
  { Art: Cloche, title: 'You celebrate', text: 'Guests are served, and you enjoy the day.' },
];

export default function About() {
  const rail = useRef(null);
  const facts = ABOUT_FACTS.filter((f) => f.value);

  const slide = (dir) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 480), behavior: 'smooth' });
  };

  return (
    <>
      <Seo
        path="/about"
        title="About Sunrise Caterers | Caterers in Kallekkad, Palakkad"
        description="Meet Sunrise Caterers & Event Management in Kallekkad, Palakkad: our approach to food, hospitality and celebrations, and how we plan your event with you."
      />

      {/* Banner */}
      <section className="about-banner" aria-labelledby="about-title">
        <div className="container about-banner-grid">
          <div>
            <p className="eyebrow" data-reveal="fade">
              About us
            </p>
            <SplitHeading as="h1" id="about-title" className="h-hero" lines={['Where food', 'meets *hospitality.*']} />
            <p className="hero-lead" data-reveal data-delay="0.3">
              Sunrise Caterers &amp; Event Management is a Palakkad caterer built around one idea: a celebration should feel as good as it
              tastes.
            </p>
          </div>
          <div className="about-banner-art" aria-hidden="true">
            <div className="about-arch" data-pop>
              <Chef />
            </div>
            <span className="ab-spark ab-s1" data-parallax="16"><Sparkle /></span>
            <span className="ab-spark ab-s2" data-parallax="24"><Sparkle /></span>
            <span className="ab-sprig" data-parallax="20"><Sprig /></span>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="story section" aria-labelledby="story-title">
        <div className="container story-grid">
          <div className="story-side">
            <SectionHeading eyebrow="Our story" lines={['The joy of', 'feeding *people.*']} id="story-title" />
          </div>
          <div className="story-text">
            <p className="story-first" data-reveal>
              Few things bring people together like a shared meal. At a wedding, a birthday or a quiet family function, the food is
              what everyone remembers long after the decorations are gone.
            </p>
            <p data-reveal>
              That is the thinking behind Sunrise Caterers &amp; Event Management in Kallekkad, Palakkad. We cook for celebrations, and we
              treat every one as the most important event of the year to the family who is hosting it.
            </p>
            <p data-reveal>
              Our approach is simple: listen first, plan the menu together, and serve with the kind of warmth Kerala hospitality is known
              for. Have a look at the <Link to="/services">occasions we cater for</Link> or the <Link to="/menu">sample menu</Link>, or
              simply call or message us to talk it through.
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
          </div>
        </div>
      </section>

      {/* Visual split */}
      <section className="split-visual section" aria-labelledby="split-title">
        <div className="container">
          <SectionHeading eyebrow="Behind the scenes" lines={['From the kitchen to', 'the *celebration*']} id="split-title" align="center" />
          <div className="sv-grid">
            {SPLIT.map((s, i) => (
              <figure key={s.key} className={`sv-item sv-${i + 1}`} data-reveal={i % 2 ? 'right' : 'left'}>
                <Picture name={s.key} className="sv-pic" sizes="(max-width: 860px) 100vw, 40vw" />
                <figcaption>
                  <strong>{s.label}</strong>
                  <span>{s.text}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values section" aria-labelledby="values-title">
        <div className="container values-grid">
          <SectionHeading light eyebrow="What we care about" lines={['Four things we', 'hold *dear*']} id="values-title" />
          <ol className="values-list" data-stagger>
            {VALUES.map((v, i) => (
              <li key={v.title}>
                <span className="v-num">0{i + 1}</span>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Horizontal sequence */}
      <section className="rail-section section" aria-labelledby="rail-title">
        <div className="container rail-head">
          <SectionHeading eyebrow="A picture of it" lines={['Moments we', 'cater *for*']} id="rail-title" />
          <div className="rail-controls">
            <button type="button" onClick={() => slide(-1)} aria-label="Scroll images left">
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => slide(1)} aria-label="Scroll images right">
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="rail" ref={rail} tabIndex={0} role="group" aria-label="Photo sequence – scroll sideways">
          {SEQUENCE.map((s, i) => (
            <figure key={s.key} className={`rail-item ${i % 2 ? 'is-low' : ''}`}>
              <Picture image={IMAGES[s.key]} ratio="4 / 5" sizes="(max-width: 860px) 70vw, 28vw" />
              <figcaption>{s.cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="journey section" aria-labelledby="journey-title" data-draw-scope>
        <div className="container">
          <SectionHeading
            eyebrow="How it flows"
            lines={['From our kitchen to', 'your *celebration*']}
            id="journey-title"
            align="center"
          />
          <div className="journey-track">
            <svg className="journey-line" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path d="M0 30 Q125 -10 250 30 T500 30 T750 30 T1000 30" pathLength="1" data-draw />
            </svg>
            <ol className="journey-list">
              {JOURNEY.map(({ Art, title, text }, i) => (
                <li key={title}>
                  <span className="j-art" aria-hidden="true">
                    <Art />
                  </span>
                  <span className="j-num">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="journey-badge" aria-hidden="true">
            <BadgeSticker />
          </div>
        </div>
      </section>

      <CtaBand
        lines={['Let’s talk about your', '*next celebration.*']}
        text="Share a few details and we’ll take it from there, with menu ideas, serving options and honest answers."
        whatsappText="Hello Sunrise Caterers, I read your About page and would like to talk about my event."
      />
    </>
  );
}
