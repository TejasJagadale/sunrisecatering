// Central business configuration. Everything in here is VERIFIED business information
// supplied by the client. Do not add unverified claims (years in business, awards, counts…).

const rawUrl = import.meta.env.VITE_SITE_URL || 'https://www.your-domain.example';

export const SITE = {
  name: 'Sunrise Caterers & Event Management',
  legalName: 'Sunrise Caterers and Event Management',
  shortName: 'Sunrise Caterers',
  tagline: 'Good Food. Grand Celebrations.',
  url: rawUrl.replace(/\/$/, ''),
  locale: 'en_IN',

  phoneDisplay: '+91 84880 70589',
  phoneHref: 'tel:+918488070589',
  phoneE164: '+918488070589',
  whatsappNumber: '918488070589', // country code + number, digits only

  address: {
    street: 'Near Vyasa Vidhya Peedom, Ottapalam Palakkad Road',
    locality: 'Kallekkad',
    city: 'Palakkad',
    region: 'Kerala',
    postalCode: '678006',
    country: 'IN',
  },
  addressLine: 'Near Vyasa Vidhya Peedom, Ottapalam Palakkad Road, Kallekkad, Palakkad – 678006, Kerala',

  instagram: 'https://www.instagram.com/sunrisecaterers_palakkad/',
  instagramHandle: '@sunrisecaterers_palakkad',

  // Enquiry form back-end. Leave empty for the clearly-labelled demo mode.
  // Works with any endpoint that accepts a JSON POST (Formspree, Web3Forms, your own API…).
  formEndpoint: (import.meta.env.VITE_FORM_ENDPOINT || '').trim(),
};

export const mapQuery = encodeURIComponent(`${SITE.legalName}, ${SITE.addressLine}`);
// Keyless embed centred on the supplied address.
export const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(SITE.addressLine)}&output=embed`;
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.addressLine)}`;

export const whatsappLink = (text = 'Hello Sunrise Caterers, I would like to enquire about catering for an event.') =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services', hasMenu: true },
  { to: '/weddings', label: 'Weddings' },
  { to: '/menu', label: 'Menu' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

export const ENQUIRY_PATH = '/contact#enquiry';

// OPTIONAL "at a glance" facts for the About page. Leave a value empty ('') to hide it.
// Only fill these in with facts confirmed by the client.
export const ABOUT_FACTS = [
  { label: 'Established', value: '' },
  { label: 'Events served', value: '' },
  { label: 'Team size', value: '' },
];
