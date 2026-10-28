import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { SunriseMark, Sparkle } from './FoodIllustrations';
import { ENQUIRY_PATH, MAP_LINK, NAV_LINKS, SITE, whatsappLink } from '../config/site';
import { SERVICES } from '../data/services';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <svg className="footer-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 80 V40 Q90 0 180 40 T360 40 T540 40 T720 40 T900 40 T1080 40 T1260 40 T1440 40 V80Z" fill="#183F32" />
      </svg>
      <div className="footer-body">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand brand-footer" aria-label={`${SITE.name} – home`}>
              <SunriseMark className="brand-mark" />
              <span className="brand-text">
                <span className="brand-name">Sunrise</span>
                <span className="brand-sub">Caterers &amp; Events</span>
              </span>
            </Link>
            <p className="footer-tagline">{SITE.tagline}</p>
            <p className="footer-about">
              Catering and event food from Kallekkad, Palakkad. Tell us about your celebration and we will help plan the meal.
            </p>
            <Link className="btn btn-yellow" to={ENQUIRY_PATH}>
              Plan Your Event <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <nav className="footer-col" aria-label="Footer navigation">
            <h2 className="footer-h">Explore</h2>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Catering services">
            <h2 className="footer-h">Catering for</h2>
            <ul>
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link to={`/services#${s.id}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col">
            <h2 className="footer-h">Find us</h2>
            <address className="footer-address">
              <a href={MAP_LINK} target="_blank" rel="noopener noreferrer">
                <MapPin size={18} aria-hidden="true" />
                <span>{SITE.addressLine}</span>
              </a>
              <a href={SITE.phoneHref}>
                <Phone size={18} aria-hidden="true" />
                <span>{SITE.phoneDisplay}</span>
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} aria-hidden="true" />
                <span>Message on WhatsApp</span>
              </a>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                <InstagramIcon size={18} />
                <span>{SITE.instagramHandle}</span>
              </a>
            </address>
          </div>
        </div>

        <p className="footer-giant" aria-hidden="true">
          Sunrise
        </p>

        <div className="container footer-bottom">
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p className="footer-note">
            <Sparkle /> Served with love from Kallekkad, Palakkad
          </p>
        </div>
      </div>
    </footer>
  );
}
