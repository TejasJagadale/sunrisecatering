import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Info, ZoomIn } from 'lucide-react';
import Seo from '../components/Seo';
import SplitHeading from '../components/SplitHeading';
import Lightbox from '../components/Lightbox';
import CtaBand from '../components/CtaBand';
import { Sparkle } from '../components/FoodIllustrations';
import { GALLERY, FILTERS, countFor } from '../data/gallery';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';
import '../styles/gallery.css';

export default function Gallery() {
  const [params, setParams] = useSearchParams();
  const requested = params.get('filter');
  const filter = FILTERS.some((f) => f.id === requested) ? requested : 'all';
  const [lightbox, setLightbox] = useState(null);
  const gridRef = useRef(null);

  const items = useMemo(() => (filter === 'all' ? GALLERY : GALLERY.filter((g) => g.category === filter)), [filter]);

  const choose = (id) => {
    setParams(id === 'all' ? {} : { filter: id }, { replace: true, preventScrollReset: true });
  };

  // GSAP-powered staggered reveal; re-runs whenever the filter changes.
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray('.g-item');
      gsap.set(tiles, { opacity: 0, y: 46 });
      ScrollTrigger.batch(tiles, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, overwrite: true });
          batch.forEach((el) => {
            const img = el.querySelector('img');
            if (img) gsap.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.4, ease: 'power3.out', clearProps: 'transform' });
          });
        },
      });
    }, grid);
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, [filter]);

  return (
    <>
      <Seo
        path="/gallery"
        title="Gallery | Wedding & Event Catering in Palakkad"
        description="Browse the Sunrise Caterers gallery: wedding setups, food, family celebrations, parties and events from Kallekkad, Palakkad."
      />

      <section className="gal-hero" aria-labelledby="gal-title">
        <div className="container">
          <p className="eyebrow" data-reveal="fade">
            Gallery
          </p>
          <SplitHeading as="h1" id="gal-title" className="h-hero" lines={['Tables, plates &', '*happy faces*']} />
          <p className="hero-lead" data-reveal data-delay="0.3">
            A look at the sort of celebrations and food we cater for. Filter by occasion, then tap any picture to see it larger.
          </p>
          <p className="gal-note" role="note" data-reveal>
            <Info size={20} aria-hidden="true" />
            <span>
              <strong>Sample images.</strong> The pictures here are illustrated placeholders, not photographs of Sunrise Caterers’ work. Real
              photographs from the business will replace them (see the README for how).
            </span>
          </p>
        </div>
      </section>

      <section className="gal-body" aria-label="Photo gallery">
        <div className="container">
          <div className="gal-filters" role="group" aria-label="Filter the gallery">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`chip-btn ${filter === f.id ? 'is-active' : ''}`}
                aria-pressed={filter === f.id}
                onClick={() => choose(f.id)}
              >
                {f.label}
                <span className="chip-count">{countFor(f.id)}</span>
              </button>
            ))}
          </div>

          <p className="sr-only" aria-live="polite">
            Showing {items.length} images{filter !== 'all' ? ` in ${FILTERS.find((f) => f.id === filter)?.label}` : ''}.
          </p>

          <ul className="masonry" ref={gridRef} key={filter}>
            {items.map((item, i) => (
              <li key={item.id} className={`g-item g-${(i % 5) + 1}`}>
                <button type="button" className="g-btn" onClick={() => setLightbox(i)} aria-label={`Open image: ${item.title}`}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={item.w}
                    height={item.h}
                    loading={i < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                    style={{ aspectRatio: `${item.w} / ${item.h}` }}
                  />
                  <span className="g-cap">
                    <span>{item.title}</span>
                    <ZoomIn size={18} aria-hidden="true" />
                  </span>
                  {item.sample && <span className="sample-badge">Sample image</span>}
                </button>
              </li>
            ))}
          </ul>

          <p className="gal-foot">
            <Sparkle /> Want to see something specific?{' '}
            <Link className="link-arrow" to="/contact#enquiry">
              Ask us <ArrowRight size={16} aria-hidden="true" />
            </Link>
            {' '}or follow our{' '}
            <a href="https://www.instagram.com/sunrisecaterers_palakkad/" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            .
          </p>
        </div>
      </section>

      <Lightbox items={items} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />

      <CtaBand
        lines={['Like what you see?', '*Let’s plan yours.*']}
        text="Tell us about your event and we’ll talk through the food and the arrangements."
        whatsappText="Hello Sunrise Caterers, I saw your gallery and would like to plan an event."
      />
    </>
  );
}
