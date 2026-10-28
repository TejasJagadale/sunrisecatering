import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import SplitHeading from '../components/SplitHeading';
import SectionHeading from '../components/SectionHeading';
import Picture from '../components/Picture';
import ParallaxImage from '../components/ParallaxImage';
import CtaBand from '../components/CtaBand';
import { Sparkle, Sprig } from '../components/FoodIllustrations';
import { IMAGES } from '../config/images';
import '../styles/weddings.css';

const STAGES = [
  {
    key: 'wedPlanning',
    title: 'Menu planning',
    text: 'We sit down (or talk over the phone) with the family: guest numbers, dishes, dietary needs and how the meal should flow. The menu is shaped around your wishes.',
  },
  {
    key: 'wedPrep',
    title: 'Preparation',
    text: 'Once the plan is agreed, cooking is scheduled around your muhurtham and mealtimes, so food is ready when your guests are.',
  },
  {
    key: 'wedServing',
    title: 'Serving',
    text: 'Whether it is a sit-down feast or a buffet, we discuss how many servers and which arrangement suits the hall and the crowd.',
  },
  {
    key: 'wedTable',
    title: 'The celebration',
    text: 'With the food looked after, the family can greet guests, take photographs and enjoy the day they have been planning.',
  },
];

const STRIP = [
  { key: 'wedTable', cls: 'ws-1', ratio: '16 / 9' },
  { key: 'wedServing', cls: 'ws-2', ratio: '4 / 5' },
  { key: 'wedBuffet', cls: 'ws-3', ratio: '3 / 2' },
  { key: 'wedFeast', cls: 'ws-4', ratio: '4 / 5' },
  { key: 'wedEngagement', cls: 'ws-5', ratio: '4 / 5' },
  { key: 'svcWedding2', cls: 'ws-6', ratio: '1 / 1' },
];

export default function Weddings() {
  return (
    <>
      <Seo
        path="/weddings"
        title="Wedding Catering in Palakkad | Weddings & Celebrations"
        description="Wedding catering in Palakkad by Sunrise Caterers, Kallekkad: traditional feasts, buffets, engagement and family celebrations, planned around your family."
      />

      {/* Immersive hero */}
      <section className="w-hero" aria-labelledby="w-hero-title">
        <ParallaxImage name="wedHero" ratio="auto" className="w-hero-bg" eager alt="" />
        <div className="w-hero-shade" aria-hidden="true" />
        <div className="container w-hero-inner">
          <p className="eyebrow on-dark" data-reveal="fade">
            Weddings &amp; celebrations
          </p>
          <SplitHeading as="h1" id="w-hero-title" className="h-hero on-dark" lines={['Wedding feasts,', 'served with *grace.*']} />
          <p className="hero-lead on-dark" data-reveal data-delay="0.3">
            Wedding catering in Palakkad from Sunrise Caterers &amp; Event Management, with the food planned around your family, your
            customs and your guests.
          </p>
          <div className="hero-cta" data-reveal data-delay="0.45">
            <Link className="btn btn-yellow btn-lg" to="/contact?event=wedding#enquiry">
              Plan Your Wedding Catering <ArrowRight size={20} aria-hidden="true" />
            </Link>
            <Link className="btn btn-ghost-light btn-lg" to="/menu">
              See the sample menu
            </Link>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="w-statement section" aria-label="Our approach to weddings">
        <div className="container-narrow">
          <span className="w-sprig" aria-hidden="true" data-parallax="14">
            <Sprig />
          </span>
          <p className="w-quote" data-reveal>
            A wedding feast is more than a meal. It is the moment two families sit down together, and the memory guests carry home.
          </p>
          <p className="w-quote-sub" data-reveal>
            We would be honoured to help you serve it well.
          </p>
        </div>
      </section>

      {/* Feast presentation */}
      <section className="w-feast section" aria-labelledby="w-feast-title">
        <div className="container w-row">
          <div className="w-media">
            <ParallaxImage name="wedFeast" ratio="4 / 5" className="w-arch" />
          </div>
          <div className="w-copy">
            <SectionHeading eyebrow="The traditional feast" lines={['A feast laid out', 'with *care*']} id="w-feast-title" />
            <p data-reveal>
              For many families, the wedding sadya is the heart of the day: rice at the centre of the leaf, curries and sides arranged
              in their familiar order, and payasam to finish. If that is what you imagine, we can talk about how it can be presented
              and served at your venue.
            </p>
            <p data-reveal>
              Tell us which dishes matter most to your family and which customs you follow, and we will plan around them.
            </p>
            <Link className="link-arrow" to="/menu" data-reveal>
              Explore Kerala-style dishes <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="container w-row is-reverse">
          <div className="w-media">
            <ParallaxImage name="wedBuffet" ratio="3 / 2" className="w-frame" />
            <Sparkle className="w-spark" />
          </div>
          <div className="w-copy">
            <SectionHeading eyebrow="Celebratory dining" lines={['Buffets that keep', 'the party *moving*']} id="w-buffet-title" />
            <p data-reveal>
              For larger guest lists, a buffet can keep queues short and guests comfortable. We can discuss the layout, the number of
              serving points and how to keep dishes fresh through a long reception.
            </p>
            <p data-reveal>
              Starters, mains, desserts and drinks can be combined in whichever way suits your event.
            </p>
            <Link className="link-arrow" to="/services#wedding" data-reveal>
              Wedding catering details <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Progression */}
      <section className="w-journey section" aria-labelledby="w-journey-title">
        <div className="container">
          <SectionHeading
            eyebrow="From plan to plate"
            lines={['From menu planning to', 'the last *serving*']}
            id="w-journey-title"
            align="center"
          />
          <ol className="w-steps" data-draw-scope>
            <svg className="w-steps-line" viewBox="0 0 4 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path d="M2 0 V100" pathLength="1" data-draw />
            </svg>
            {STAGES.map((st, i) => (
              <li key={st.key} className={`w-step ${i % 2 ? 'is-alt' : ''}`}>
                <div className="w-step-media" data-reveal={i % 2 ? 'right' : 'left'}>
                  <Picture image={IMAGES[st.key]} ratio="3 / 2" sizes="(max-width: 860px) 100vw, 40vw" />
                </div>
                <div className="w-step-copy" data-reveal={i % 2 ? 'left' : 'right'}>
                  <span className="w-step-num">0{i + 1}</span>
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Engagements & family */}
      <section id="engagements" className="w-more section" aria-labelledby="w-more-title">
        <div className="container">
          <SectionHeading
            eyebrow="Beyond the wedding day"
            lines={['Engagements & family', '*celebrations*']}
            id="w-more-title"
            lead="The same care goes into the smaller ceremonies that lead up to, and follow, the wedding."
          />
          <div className="w-duo" data-stagger>
            <article className="w-card">
              <Picture name="wedEngagement" ratio="4 / 5" className="w-card-pic" sizes="(max-width: 860px) 90vw, 36vw" />
              <div>
                <h3>Engagement ceremonies</h3>
                <p>
                  A warm, well-paced meal for both families meeting around the table, with options discussed to suit the number of
                  guests and the venue.
                </p>
                <Link className="link-arrow" to="/contact?event=engagement#enquiry">
                  Enquire for engagement catering <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </article>
            <article className="w-card is-low">
              <Picture name="wedFamily" ratio="4 / 5" className="w-card-pic" sizes="(max-width: 860px) 90vw, 36vw" />
              <div>
                <h3>Family celebrations</h3>
                <p>
                  Receptions, pre-wedding gatherings, return feasts and get-togethers. Share the plan and we’ll talk through what
                  suits.
                </p>
                <Link className="link-arrow" to="/contact?event=private#enquiry">
                  Enquire for family functions <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="w-gallery section" aria-labelledby="w-gallery-title">
        <div className="container">
          <SectionHeading eyebrow="Dining setups" lines={['Tables, leaves and', 'little *details*']} id="w-gallery-title" />
          <div className="ws-grid">
            {STRIP.map((s) => (
              <Picture key={s.key} name={s.key} className={`ws-item ${s.cls}`} ratio={s.ratio} mask sizes="(max-width: 860px) 50vw, 33vw" />
            ))}
          </div>
          <p className="w-gallery-more" data-reveal>
            <Link className="link-arrow" to="/gallery?filter=weddings">
              See more wedding images <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        tone="night"
        eyebrow="Wedding enquiries"
        lines={['Tell us about your', '*wedding.*']}
        text="We don’t publish fixed packages or prices: every wedding is different. Share the date, the guest count and what you have in mind, and we’ll take it from there."
        primary={{ to: '/contact?event=wedding#enquiry', label: 'Enquire for Wedding Catering' }}
        whatsappText="Hello Sunrise Caterers, I'd like to enquire about wedding catering."
      />
    </>
  );
}
