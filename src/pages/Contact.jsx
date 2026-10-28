import { MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import Seo from '../components/Seo';
import SplitHeading from '../components/SplitHeading';
import EnquiryForm from '../components/EnquiryForm';
import CtaBand from '../components/CtaBand';
import { InstagramIcon } from '../components/Icons';
import { Chef, Sparkle } from '../components/FoodIllustrations';
import { MAP_EMBED_SRC, MAP_LINK, SITE, whatsappLink } from '../config/site';
import '../styles/contact.css';

export default function Contact() {
  return (
    <>
      <Seo
        path="/contact"
        title="Contact & Event Enquiry | Caterers in Kallekkad, Palakkad"
        description="Enquire about catering with Sunrise Caterers & Event Management, Kallekkad, Palakkad – 678006. Call +91 84880 70589, WhatsApp or send an enquiry."
      />

      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="container contact-hero-grid">
          <div>
            <p className="eyebrow" data-reveal="fade">
              Contact &amp; enquiries
            </p>
            <SplitHeading as="h1" id="contact-title" className="h-hero" lines={['Let’s plan your', '*celebration.*']} />
            <p className="hero-lead" data-reveal data-delay="0.3">
              Call, message or fill in the form. Tell us about your event and we’ll talk through the menu, the numbers and the
              arrangements.
            </p>
            <div className="contact-quick" data-reveal data-delay="0.45">
              <a className="btn btn-primary btn-lg" href={SITE.phoneHref}>
                <Phone size={20} aria-hidden="true" /> Call {SITE.phoneDisplay}
              </a>
              <a className="btn btn-ghost btn-lg" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} aria-hidden="true" /> WhatsApp enquiry
              </a>
            </div>
          </div>
          <div className="contact-art" aria-hidden="true" data-pop>
            <Chef />
            <Sparkle className="ca-spark" />
          </div>
        </div>
      </section>

      <section className="contact-main" aria-label="Enquiry form and business details">
        <div className="container contact-grid">
          <div id="enquiry" className="contact-form-wrap">
            <EnquiryForm />
          </div>

          <aside className="contact-card" aria-labelledby="visit-title" data-reveal>
            <h2 id="visit-title">Visit or call</h2>
            <p className="biz-name">{SITE.legalName}</p>
            <ul className="contact-list">
              <li>
                <MapPin size={20} aria-hidden="true" />
                <address>{SITE.addressLine}</address>
              </li>
              <li>
                <Phone size={20} aria-hidden="true" />
                <a href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
              </li>
              <li>
                <MessageCircle size={20} aria-hidden="true" />
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </li>
              <li>
                <InstagramIcon size={20} />
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                  {SITE.instagramHandle}
                </a>
              </li>
            </ul>
            <a className="btn btn-dark btn-sm" href={MAP_LINK} target="_blank" rel="noopener noreferrer">
              <Navigation size={16} aria-hidden="true" /> Get directions
            </a>
          </aside>
        </div>
      </section>

      <section className="contact-map" aria-labelledby="map-title">
        <div className="container">
          <h2 id="map-title" className="sr-only">
            Map to Sunrise Caterers and Event Management
          </h2>
          <div className="map-frame" data-reveal>
            <iframe
              title="Map showing Sunrise Caterers and Event Management, Kallekkad, Palakkad"
              src={MAP_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="We’d love to hear from you"
        lines={['Good food is better', '*shared.*']}
        text="Whatever the occasion, a quick call is often the easiest way to begin."
        primary={{ to: '/services', label: 'Browse our services' }}
        whatsappText="Hello Sunrise Caterers, I'd like to talk about catering for my event."
      />
    </>
  );
}
