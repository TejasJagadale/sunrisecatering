// ─────────────────────────────────────────────────────────────────────────────
// CENTRAL IMAGE CONFIGURATION
//
// Every picture on the site is referenced from here. All images currently point to
// illustrated SAMPLE artwork in /public/images/sample (NOT photos of Sunrise Caterers).
//
// To swap in real photographs (e.g. supplied by the client from their Instagram):
//   1. Put the files in /public/images/client/  (JPG/WebP, ~1600px on the long edge)
//   2. Change `src` to e.g. `client('wedding-feast.jpg')`, set the real width/height,
//      write a descriptive `alt`, and set `sample: false`.
// The "Sample" badge disappears automatically once `sample` is false.
// ─────────────────────────────────────────────────────────────────────────────

const BASE = import.meta.env.BASE_URL;
const sample = (file) => `${BASE}images/sample/${file}`;
// eslint-disable-next-line no-unused-vars
const client = (file) => `${BASE}images/client/${file}`;

const P = [1200, 1500]; // portrait 4:5
const L = [1500, 1000]; // landscape 3:2
const Sq = [1200, 1200];
const W = [1800, 1000]; // wide 16:9
const T = [1000, 1400]; // tall 5:7

const make = (file, [w, h], alt) => ({ src: sample(`${file}.svg`), w, h, alt, sample: true });

export const IMAGES = {
  // ── Home ──────────────────────────────────────────────────────────────────
  heroMain: make('hero-main', P, 'Illustration of a traditional Kerala banana-leaf feast with rice, curries, banana and payasam'),
  heroSide: make('hero-side', Sq, 'Illustration of a serving cloche lifted to reveal a steaming rice dish between two candles'),
  heroSmall: make('hero-small', L, 'Illustration of a platter of crisp starters with chutneys'),
  intro: make('intro', P, 'Illustration of a round family dining table seen from above, set with banana leaves'),

  // ── About ─────────────────────────────────────────────────────────────────
  aboutStory: make('about-story', P, 'Illustration of a busy kitchen with a large pot on the boil and fresh vegetables'),
  aboutKitchen: make('about-kitchen', L, 'Illustration of a catering kitchen with a large simmering pot'),
  aboutServing: make('about-serving', P, 'Illustration of a server presenting a covered dish'),
  aboutSetup: make('about-setup', L, 'Illustration of a long dining table laid with banana leaves and flowers'),
  aboutDishes: make('about-dishes', L, 'Illustration of a pot of biryani, parotta and curry'),

  // ── Services ──────────────────────────────────────────────────────────────
  svcWedding: make('svc-wedding', P, 'Illustration of a wedding mandap decorated with marigold garlands'),
  svcWedding2: make('svc-wedding-2', Sq, 'Illustration of a wedding buffet line with warming dishes'),
  svcEngagement: make('svc-engagement', L, 'Illustration of a traditional lamp and marigold garlands for an engagement'),
  svcEngagement2: make('svc-engagement-2', T, 'Illustration of an elegantly laid banquet table with flowers'),
  svcBirthday: make('svc-birthday', L, 'Illustration of a birthday cake with balloons and bunting'),
  svcAnniversary: make('svc-anniversary', L, 'Illustration of a candle-lit celebration dinner under a cloche'),
  svcPrivate: make('svc-private', L, 'Illustration of a family function table laid for a shared meal'),
  svcFestival: make('svc-festival', P, 'Illustration of a festival lamp with flower garlands and diyas'),
  svcFestival2: make('svc-festival-2', Sq, 'Illustration of a festive banana-leaf meal'),
  svcCorporate: make('svc-corporate', L, 'Illustration of round banquet tables arranged for a corporate event'),

  // ── Weddings ──────────────────────────────────────────────────────────────
  wedHero: make('wed-hero', W, 'Illustration of a decorated wedding stage with garlands and a traditional lamp'),
  wedFeast: make('wed-feast', P, 'Illustration of a banana-leaf wedding feast'),
  wedBuffet: make('wed-buffet', L, 'Illustration of a wedding buffet arrangement with warming dishes and plates'),
  wedPlanning: make('wed-planning', L, 'Illustration of sweets and desserts being planned for a menu'),
  wedPrep: make('wed-prep', L, 'Illustration of food being prepared in a large pot'),
  wedServing: make('wed-serving', P, 'Illustration of a server presenting a dish at a celebration'),
  wedEngagement: make('wed-engagement', P, 'Illustration of a lit traditional lamp for an engagement ceremony'),
  wedFamily: make('wed-family', L, 'Illustration of a family celebration table seen from above'),
  wedTable: make('wed-table', W, 'Illustration of a long wedding dining table with banana-leaf settings'),

  // ── Menu categories ───────────────────────────────────────────────────────
  menuKerala: make('menu-kerala', L, 'Illustration of a traditional Kerala banana-leaf meal'),
  menuVeg: make('menu-veg', L, 'Illustration of vegetarian dishes in a pot with parotta'),
  menuNonVeg: make('menu-nonveg', L, 'Illustration of a pot of rice and a bowl of curry'),
  menuStarters: make('menu-starters', L, 'Illustration of a platter of starters and snacks'),
  menuMains: make('menu-mains', L, 'Illustration of main-course dishes: rice, parotta and curry'),
  menuDesserts: make('menu-desserts', L, 'Illustration of desserts and sweets in cups'),
  menuBeverages: make('menu-beverages', L, 'Illustration of three chilled beverages'),
};

// Gallery photos: id, which category tab they belong to, and a title for the lightbox.
// Categories: weddings | food | family | parties | events
const g = (file, dims, category, title, alt) => ({
  id: file,
  category,
  title,
  ...make(file, dims, alt),
});

export const GALLERY_IMAGES = [
  g('g01', P, 'weddings', 'Wedding stage', 'Illustration of a decorated wedding stage with marigold garlands'),
  g('g02', L, 'food', 'Banana-leaf feast', 'Illustration of a banana-leaf feast'),
  g('g03', Sq, 'family', 'Family table', 'Illustration of a round family table from above'),
  g('g04', P, 'parties', 'Birthday cake', 'Illustration of a tiered birthday cake with balloons'),
  g('g05', L, 'events', 'Banquet round tables', 'Illustration of round banquet tables for an event'),
  g('g06', L, 'weddings', 'Buffet line', 'Illustration of a wedding buffet with warming dishes'),
  g('g07', Sq, 'food', 'Sweets and desserts', 'Illustration of laddu, jalebi and payasam'),
  g('g08', P, 'weddings', 'Dining setup', 'Illustration of a long dining table with banana-leaf settings'),
  g('g09', L, 'events', 'Festival lamps', 'Illustration of a traditional lamp with flower garlands'),
  g('g10', P, 'food', 'Starters platter', 'Illustration of a starters platter with chutneys'),
  g('g11', Sq, 'parties', 'Cloche reveal', 'Illustration of a cloche lifted from a rice dish'),
  g('g12', L, 'parties', 'Cool drinks', 'Illustration of three chilled drinks'),
  g('g13', L, 'events', 'At your service', 'Illustration of a server presenting a covered dish'),
  g('g14', Sq, 'family', 'Biryani and parotta', 'Illustration of a pot of biryani with parotta and curry'),
  g('g15', P, 'family', 'In the kitchen', 'Illustration of a big pot being cooked in a kitchen'),
  g('g16', L, 'parties', 'Celebration cake', 'Illustration of a celebration cake with bunting'),
];

export const GALLERY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'food', label: 'Food' },
  { id: 'family', label: 'Family Celebrations' },
  { id: 'parties', label: 'Parties' },
  { id: 'events', label: 'Events' },
];

// Social share image (PNG, 1200×630). Replace /public/og-image.png with a branded image.
export const OG_IMAGE = `${BASE}og-image.png`;
