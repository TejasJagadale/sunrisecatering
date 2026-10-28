import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { SunriseMark } from './FoodIllustrations';
import { InstagramIcon } from './Icons';
import { ENQUIRY_PATH, NAV_LINKS, SITE, whatsappLink } from '../config/site';
import { SERVICES } from '../data/services';
import { lockScroll } from '../lib/lenis';

const DARK_HERO_ROUTES = ['/weddings'];

export default function Navbar() {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const toggleRef = useRef(null);
  const drawerRef = useRef(null);

  // Solid background once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the drawer on navigation.
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Drawer behaviour: scroll lock, Escape to close, focus trap, return focus.
  useEffect(() => {
    if (!open) return undefined;
    lockScroll(true);
    const toggle = toggleRef.current;
    const first = drawerRef.current?.querySelector('a, button');
    first?.focus({ preventScroll: true });

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = [toggle, ...(drawerRef.current?.querySelectorAll('a[href], button:not([disabled])') || [])].filter(Boolean);
      if (!nodes.length) return;
      const firstNode = nodes[0];
      const lastNode = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstNode) {
        e.preventDefault();
        lastNode.focus();
      } else if (!e.shiftKey && document.activeElement === lastNode) {
        e.preventDefault();
        firstNode.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      lockScroll(false);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  const dark = DARK_HERO_ROUTES.includes(pathname) && !scrolled && !open;

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${dark ? 'is-dark' : ''} ${open ? 'is-open' : ''}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label={`${SITE.name} – home`}>
          <SunriseMark className="brand-mark" />
          <span className="brand-text">
            <span className="brand-name">Sunrise</span>
            <span className="brand-sub">Caterers &amp; Events</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to} className={link.hasMenu ? 'has-menu' : undefined}>
                <NavLink to={link.to} end={link.end} className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {link.hasMenu && <ChevronDown size={14} aria-hidden="true" />}
                      {isActive && <motion.span layoutId="nav-indicator" className="nav-ind" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                    </>
                  )}
                </NavLink>
                {link.hasMenu && (
                  <ul className="submenu" aria-label="Catering services">
                    {SERVICES.map((s) => (
                      <li key={s.id}>
                        <Link to={`/services#${s.id}`}>
                          <span>{s.number}</span>
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <Link className="btn btn-primary nav-cta" to={ENQUIRY_PATH}>
          Plan Your Event
        </Link>

        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={drawerRef}
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: reduce ? 0 : 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="Mobile">
              <ul className="drawer-list">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : 0.18 + i * 0.05, duration: 0.45 }}
                  >
                    <div className="drawer-row">
                      <NavLink to={link.to} end={link.end} className={({ isActive }) => `drawer-link ${isActive ? 'is-active' : ''}`}>
                        <span className="drawer-num">0{i + 1}</span>
                        {link.label}
                      </NavLink>
                      {link.hasMenu && (
                        <button
                          type="button"
                          className={`drawer-expand ${servicesOpen ? 'is-open' : ''}`}
                          aria-expanded={servicesOpen}
                          aria-controls="drawer-services"
                          aria-label={servicesOpen ? 'Hide service list' : 'Show service list'}
                          onClick={() => setServicesOpen((v) => !v)}
                        >
                          <ChevronDown size={22} aria-hidden="true" />
                        </button>
                      )}
                    </div>
                    {link.hasMenu && servicesOpen && (
                      <ul id="drawer-services" className="drawer-sub">
                        {SERVICES.map((s) => (
                          <li key={s.id}>
                            <Link to={`/services#${s.id}`}>{s.title}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="drawer-foot">
              <Link className="btn btn-primary" to={ENQUIRY_PATH}>
                Plan Your Event
              </Link>
              <div className="drawer-contacts">
                <a href={SITE.phoneHref}>
                  <Phone size={18} aria-hidden="true" /> {SITE.phoneDisplay}
                </a>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} aria-hidden="true" /> WhatsApp
                </a>
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon size={18} /> Instagram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
