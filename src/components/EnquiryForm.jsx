import { useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CircleAlert, CircleCheck, Info, LoaderCircle, MessageCircle, Phone, Send } from 'lucide-react';
import { SITE, whatsappLink } from '../config/site';
import { EVENT_TYPES } from '../data/services';

/*
  ENQUIRY FORM – submission behaviour
  ───────────────────────────────────
  • Client-side validation runs first (see `validate`).
  • If VITE_FORM_ENDPOINT is set (src/config/site.js → SITE.formEndpoint) the form POSTs JSON to it and
    only shows the success message when the server answers 2xx.
  • If no endpoint is configured the form runs in DEMO MODE: nothing is sent anywhere, and the page says
    so plainly, offering WhatsApp / phone so the visitor can still reach the business. No fake "sent" state.
  See README → "Connecting the enquiry form".
*/

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  event: '',
  date: '',
  guests: '',
  venue: '',
  menuType: '',
  dietary: '',
  message: '',
  company: '', // honeypot – real visitors never see or fill this
};

const MENU_TYPES = ['Vegetarian', 'Non-vegetarian', 'Both vegetarian and non-vegetarian', 'Not decided yet'];

function localToday() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  const digits = v.phone.replace(/[\s()+-]/g, '');
  if (!/^\d{10,13}$/.test(digits)) e.phone = 'Enter a valid phone number (10 to 13 digits).';
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'That email address looks incomplete.';
  if (!v.event) e.event = 'Please choose the type of event.';
  if (v.date && v.date < localToday()) e.date = 'Please choose today or a future date.';
  if (v.guests) {
    const n = Number(v.guests);
    if (!Number.isInteger(n) || n < 1 || n > 20000) e.guests = 'Enter a whole number between 1 and 20,000.';
  }
  if (v.dietary.length > 500) e.dietary = 'Please keep this under 500 characters.';
  if (v.message.length > 1000) e.message = 'Please keep your message under 1,000 characters.';
  return e;
}

const eventLabel = (value) => EVENT_TYPES.find((t) => t.value === value)?.label || '';

function buildSummary(v) {
  const lines = [
    'Hello Sunrise Caterers, I would like to enquire about catering.',
    v.name && `Name: ${v.name.trim()}`,
    v.phone && `Phone: ${v.phone.trim()}`,
    v.event && `Event: ${eventLabel(v.event)}`,
    v.date && `Date: ${v.date}`,
    v.guests && `Approx. guests: ${v.guests}`,
    v.venue && `Venue: ${v.venue.trim()}`,
    v.menuType && `Menu: ${v.menuType}`,
    v.dietary && `Dietary needs: ${v.dietary.trim()}`,
    v.message && `Message: ${v.message.trim()}`,
  ];
  return lines.filter(Boolean).join('\n');
}

export default function EnquiryForm() {
  const [params] = useSearchParams();
  const presetEvent = params.get('event');
  const [values, setValues] = useState(() => ({
    ...EMPTY,
    event: EVENT_TYPES.some((t) => t.value === presetEvent) ? presetEvent : '',
  }));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | invalid | sending | sent | demo | failed
  const formRef = useRef(null);
  const statusRef = useRef(null);
  const today = useMemo(localToday, []);

  const set = (name) => (e) => {
    const value = e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const blur = (name) => () => {
    const next = validate(values)[name];
    setErrors((prev) => ({ ...prev, [name]: next }));
  };

  const fieldProps = (name) => ({
    id: `enq-${name}`,
    name,
    value: values[name],
    onChange: set(name),
    onBlur: blur(name),
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `enq-${name}-err` : undefined,
  });

  const err = (name) =>
    errors[name] ? (
      <span className="field-error" id={`enq-${name}-err`}>
        <CircleAlert size={14} aria-hidden="true" /> {errors[name]}
      </span>
    ) : null;

  async function onSubmit(event) {
    event.preventDefault();
    if (values.company) return; // honeypot tripped – silently ignore bots

    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      setStatus('invalid');
      formRef.current?.querySelector(`#enq-${firstInvalid}`)?.focus();
      return;
    }

    if (!SITE.formEndpoint) {
      setStatus('demo');
      window.requestAnimationFrame(() => statusRef.current?.focus());
      return;
    }

    setStatus('sending');
    try {
      const { company, ...payload } = values;
      const res = await fetch(SITE.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, eventLabel: eventLabel(values.event), source: 'sunrise-website' }),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setStatus('sent');
      setValues(EMPTY);
    } catch {
      setStatus('failed');
    }
    window.requestAnimationFrame(() => statusRef.current?.focus());
  }

  const waHref = whatsappLink(buildSummary(values));

  return (
    <form className="enquiry" ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="enquiry-title">
      <h2 id="enquiry-title" className="enquiry-title">
        Tell us about your event
      </h2>
      <p className="enquiry-intro">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required. Everything else helps us plan better, but you can skip it.
      </p>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="enq-name">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input type="text" autoComplete="name" required {...fieldProps('name')} />
          {err('name')}
        </div>

        <div className="field">
          <label htmlFor="enq-phone">
            Phone number <span aria-hidden="true">*</span>
          </label>
          <input type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. 98765 43210" required {...fieldProps('phone')} />
          {err('phone')}
        </div>

        <div className="field">
          <label htmlFor="enq-email">Email (optional)</label>
          <input type="email" autoComplete="email" {...fieldProps('email')} />
          {err('email')}
        </div>

        <div className="field">
          <label htmlFor="enq-event">
            Type of event <span aria-hidden="true">*</span>
          </label>
          <select required {...fieldProps('event')}>
            <option value="">Choose an event type</option>
            {EVENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {err('event')}
        </div>

        <div className="field">
          <label htmlFor="enq-date">Event date (tentative is fine)</label>
          <input type="date" min={today} {...fieldProps('date')} />
          {err('date')}
        </div>

        <div className="field">
          <label htmlFor="enq-guests">Approximate guest count</label>
          <input type="number" inputMode="numeric" min="1" max="20000" step="1" placeholder="e.g. 250" {...fieldProps('guests')} />
          {err('guests')}
        </div>

        <div className="field field-wide">
          <label htmlFor="enq-venue">Venue or event location</label>
          <input type="text" autoComplete="off" placeholder="Hall name, home address or town" {...fieldProps('venue')} />
          {err('venue')}
        </div>

        <div className="field">
          <label htmlFor="enq-menuType">Menu preference</label>
          <select {...fieldProps('menuType')}>
            <option value="">Select if you know</option>
            {MENU_TYPES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="enq-dietary">Dietary requirements or allergies</label>
          <input type="text" placeholder="e.g. no onion/garlic, nut allergy" {...fieldProps('dietary')} />
          {err('dietary')}
        </div>

        <div className="field field-wide">
          <label htmlFor="enq-message">Anything else we should know?</label>
          <textarea rows="4" placeholder="Favourite dishes, timings, budget range, questions…" {...fieldProps('message')} />
          {err('message')}
        </div>

        {/* Honeypot: hidden from people, visible to naive bots */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="enq-company">Company</label>
          <input id="enq-company" name="company" type="text" tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
        </div>
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <LoaderCircle className="spin" size={18} aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              <Send size={18} aria-hidden="true" /> {SITE.formEndpoint ? 'Send enquiry' : 'Check my enquiry'}
            </>
          )}
        </button>
        <a className="btn btn-ghost" href={waHref} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={18} aria-hidden="true" /> Send on WhatsApp instead
        </a>
      </div>

      <div className="form-status" aria-live="polite" ref={statusRef} tabIndex={-1}>
        {status === 'invalid' && (
          <div className="notice notice-error" role="alert">
            <CircleAlert size={20} aria-hidden="true" />
            <p>Please check the highlighted fields and try again.</p>
          </div>
        )}

        {status === 'demo' && (
          <div className="notice notice-info">
            <Info size={20} aria-hidden="true" />
            <div>
              <p>
                <strong>Your details look good, but nothing has been sent yet.</strong> This website is not connected to a form service
                at the moment, so your enquiry has not reached Sunrise Caterers.
              </p>
              <p>To get in touch right now, send the details above on WhatsApp or call us.</p>
              <div className="notice-actions">
                <a className="btn btn-primary btn-sm" href={waHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} aria-hidden="true" /> Send on WhatsApp
                </a>
                <a className="btn btn-ghost btn-sm" href={SITE.phoneHref}>
                  <Phone size={16} aria-hidden="true" /> Call {SITE.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        )}

        {status === 'sent' && (
          <div className="notice notice-success" role="status">
            <CircleCheck size={20} aria-hidden="true" />
            <p>
              <strong>Thank you – your enquiry has been sent.</strong> Sunrise Caterers will get back to you on the phone number you gave.
              You can also reach us on {SITE.phoneDisplay}.
            </p>
          </div>
        )}

        {status === 'failed' && (
          <div className="notice notice-error" role="alert">
            <CircleAlert size={20} aria-hidden="true" />
            <div>
              <p>
                <strong>Sorry – we could not send your enquiry.</strong> Please try again in a moment, or reach us directly.
              </p>
              <div className="notice-actions">
                <a className="btn btn-primary btn-sm" href={waHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} aria-hidden="true" /> WhatsApp
                </a>
                <a className="btn btn-ghost btn-sm" href={SITE.phoneHref}>
                  <Phone size={16} aria-hidden="true" /> Call
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
