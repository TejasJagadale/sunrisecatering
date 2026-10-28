import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Info, MessageCircle } from 'lucide-react';
import Seo from '../components/Seo';
import SplitHeading from '../components/SplitHeading';
import SectionHeading from '../components/SectionHeading';
import Picture from '../components/Picture';
import CtaBand from '../components/CtaBand';
import { SteamBowl } from '../components/FoodIllustrations';
import { whatsappLink } from '../config/site';
import { FOOD_EXPERIENCES, MENU_CATEGORIES, MENU_DISCLAIMER } from '../data/menu';
import '../styles/menu.css';

export default function Menu() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(MENU_CATEGORIES[0].id);
  const tabRefs = useRef([]);
  const active = MENU_CATEGORIES.find((c) => c.id === activeId);

  const onKeyDown = (e, index) => {
    const last = MENU_CATEGORIES.length - 1;
    let next = null;
    if (e.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (e.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActiveId(MENU_CATEGORIES[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <Seo
        path="/menu"
        title="Sample Menu | Kerala & Event Catering in Palakkad"
        description="Explore sample Kerala-inspired, vegetarian and non-vegetarian catering categories from Sunrise Caterers, Palakkad. Dishes are illustrative; request a custom menu."
      />

      <section className="menu-hero" aria-labelledby="menu-title">
        <div className="container menu-hero-grid">
          <div>
            <p className="eyebrow" data-reveal="fade">
              Menu &amp; food experiences
            </p>
            <SplitHeading as="h1" id="menu-title" className="h-hero" lines={['A menu built', 'around *your day.*']} />
            <p className="hero-lead" data-reveal data-delay="0.3">
              Browse the kinds of food that can be planned for an event, from a traditional Kerala spread to starters, sweets and
              drinks.
            </p>
          </div>
          <div className="menu-hero-art" aria-hidden="true" data-pop>
            <SteamBowl />
          </div>
        </div>
        <div className="container">
          <p className="menu-disclaimer" role="note" data-reveal>
            <Info size={20} aria-hidden="true" />
            <span>
              <strong>Sample menu.</strong> {MENU_DISCLAIMER} No prices or availability are shown.
            </span>
          </p>
        </div>
      </section>

      <section className="menu-body" aria-label="Menu categories">
        <div className="menu-tabs-wrap">
          <div className="container">
            <div className="menu-tabs" role="tablist" aria-label="Menu categories">
              {MENU_CATEGORIES.map((c, i) => (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`tab-${c.id}`}
                  aria-selected={activeId === c.id}
                  aria-controls={`panel-${c.id}`}
                  tabIndex={activeId === c.id ? 0 : -1}
                  className={`menu-tab ${activeId === c.id ? 'is-active' : ''}`}
                  onClick={() => setActiveId(c.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                >
                  {activeId === c.id && <motion.span layoutId="menu-tab-ind" className="menu-tab-ind" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              id={`panel-${active.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${active.id}`}
              tabIndex={0}
              className="menu-panel"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduce ? 0 : 0.35 }}
            >
              <div className="menu-panel-media">
                <Picture name={active.imageKey} ratio="3 / 2" eager sizes="(max-width: 860px) 100vw, 44vw" />
                <p className="menu-blurb">{active.blurb}</p>
              </div>
              <div className="menu-panel-list">
                <h2 className="menu-panel-title">{active.label}</h2>
                <p className="menu-legend">
                  <span className="dot dot-veg" aria-hidden="true" /> Vegetarian <span className="dot dot-nonveg" aria-hidden="true" /> Non-vegetarian
                  <span className="tag-sample">Illustrative</span>
                </p>
                <ul className="dishes">
                  {active.dishes.map((d) => (
                    <li key={d.name} className="dish">
                      <span className={`dot ${d.veg ? 'dot-veg' : 'dot-nonveg'}`} role="img" aria-label={d.veg ? 'Vegetarian' : 'Non-vegetarian'} />
                      <span className="dish-name">{d.name}</span>
                      <span className="dish-lead" aria-hidden="true" />
                      <span className="dish-note">{d.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="exp section" aria-labelledby="exp-title">
        <div className="container">
          <SectionHeading
            eyebrow="Food experiences"
            lines={['Ways to *serve* it']}
            id="exp-title"
            lead="Options worth discussing. Which of them can be arranged depends on your event, so please ask."
          />
          <ul className="exp-list" data-stagger>
            {FOOD_EXPERIENCES.map((e, i) => (
              <li key={e.title}>
                <span className="exp-num">0{i + 1}</span>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="custom section" aria-labelledby="custom-title">
        <div className="container custom-inner">
          <div>
            <SectionHeading
              light
              eyebrow="Custom menu"
              lines={['Ask for a menu made', 'for your *occasion*']}
              id="custom-title"
              lead="Tell us the occasion, guest count, food preferences and budget, and we will talk you through a menu that fits."
            />
          </div>
          <div className="custom-actions" data-reveal>
            <Link className="btn btn-yellow btn-lg" to="/contact?event=other#enquiry">
              Request a custom menu <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <a
              className="btn btn-ghost-light btn-lg"
              href={whatsappLink('Hello Sunrise Caterers, I would like a customised menu.\nOccasion: \nApprox. guests: \nPreferences: \nBudget: ')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={20} aria-hidden="true" /> Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <CtaBand
        lines={['Hungry for', '*more ideas?*']}
        text="See the occasions we cater for, or browse the gallery for a feel of the food and the setups."
        primary={{ to: '/services', label: 'Explore Our Services' }}
        whatsappText="Hello Sunrise Caterers, I have a question about the menu."
      />
    </>
  );
}
