// Service descriptions are written to be accurate for ANY caterer: they describe the occasion and
// what is worth discussing. Extras (live counters, decoration, staffing…) are phrased as
// "ask us" topics, not guarantees. Edit freely once the client confirms what they offer.

export const SERVICES = [
  {
    id: 'wedding',
    number: '01',
    title: 'Wedding catering',
    short: 'A feast worthy of the day',
    imageKey: 'svcWedding',
    image2Key: 'svcWedding2',
    composition: 'arch',
    summary:
      'Weddings are the one meal everybody remembers. We plan the food side of your day with your family – the menu, the serving style and the flow of guests – so the celebration can stay at the centre.',
    detail:
      'Share your guest count, muhurtham timing and the style of meal you have in mind, from a traditional banana-leaf feast to a buffet, and we will talk through how it can be arranged.',
    discuss: ['Guest count & timing', 'Feast or buffet style', 'Veg / non-veg preferences', 'Venue access'],
    cta: 'Enquire for Wedding Catering',
    event: 'wedding',
    extra: { to: '/weddings', label: 'See wedding experiences' },
  },
  {
    id: 'engagement',
    number: '02',
    title: 'Engagement catering',
    short: 'Intimate, warm and well fed',
    imageKey: 'svcEngagement',
    image2Key: 'svcEngagement2',
    composition: 'stack',
    summary:
      'An engagement brings two families to one table for the first time. A relaxed, thoughtful meal helps everyone feel at home.',
    detail:
      'Tell us how many guests you expect and whether you prefer a sit-down meal, a buffet or a lighter spread, and we will suggest ways to make it comfortable for both families.',
    discuss: ['Sit-down or buffet', 'Mix of guests & ages', 'Snacks and sweets', 'Serving timeline'],
    cta: 'Enquire for Engagement Catering',
    event: 'engagement',
    extra: { to: '/weddings#engagements', label: 'Engagements & family events' },
  },
  {
    id: 'birthday',
    number: '03',
    title: 'Birthday party catering',
    short: 'Cake-cutting and good company',
    imageKey: 'svcBirthday',
    composition: 'circle',
    summary:
      'From a child’s first birthday to a milestone surprise, a birthday works best when the food is easy to enjoy and easy to serve.',
    detail:
      'Let us know the age group, the venue and the kind of food your guests enjoy; we can talk about party-friendly options, snacks and desserts that suit the occasion.',
    discuss: ['Age group of guests', 'Snacks & desserts', 'Home or hall venue', 'Timing around the cake'],
    cta: 'Enquire for Birthday Catering',
    event: 'birthday',
  },
  {
    id: 'anniversary',
    number: '04',
    title: 'Anniversary celebrations',
    short: 'Marking the years, beautifully',
    imageKey: 'svcAnniversary',
    composition: 'wide',
    summary:
      'Anniversaries are about gratitude and togetherness. Whether it is a quiet dinner for family or a larger gathering of friends, the menu can be shaped around what the couple loves.',
    detail:
      'Tell us about the guests, the mood you want and favourite dishes; we will help turn that into a menu and a serving plan that feels personal.',
    discuss: ['Favourite dishes', 'Plated or buffet', 'Guest count', 'Evening or daytime event'],
    cta: 'Enquire for Anniversary Catering',
    event: 'anniversary',
  },
  {
    id: 'private',
    number: '05',
    title: 'Private parties & family functions',
    short: 'Gatherings at home or in a hall',
    imageKey: 'svcPrivate',
    composition: 'arch-flip',
    summary:
      'Housewarmings, naming ceremonies, reunions and get-togethers all deserve good food without the stress of cooking for a crowd.',
    detail:
      'Whether the function is at home or in a hall, tell us the number of guests, kitchen access and meal timings, and we will talk about how to arrange the service.',
    discuss: ['Home or hall', 'Number of guests', 'Meal timings', 'Special dietary needs'],
    cta: 'Enquire for Family Function Catering',
    event: 'private',
  },
  {
    id: 'festival',
    number: '06',
    title: 'Festival & religious celebrations',
    short: 'Traditional meals, honoured properly',
    imageKey: 'svcFestival',
    image2Key: 'svcFestival2',
    composition: 'stack-flip',
    summary:
      'Festivals and temple or church functions often call for traditional meals, served at the right time and in the right way. Tell us what your occasion needs.',
    detail:
      'Share the customs and dietary rules you follow – for example vegetarian-only service – and we will discuss how the meal can be prepared and served accordingly.',
    discuss: ['Dietary customs', 'Traditional dishes', 'Serving time & style', 'Community gatherings'],
    cta: 'Enquire for Festival Catering',
    event: 'festival',
  },
  {
    id: 'corporate',
    number: '07',
    title: 'Corporate & special events',
    short: 'Dependable food for working days and big days',
    imageKey: 'svcCorporate',
    composition: 'wide-flip',
    summary:
      'Conferences, staff celebrations, inaugurations and launches run better when the catering is organised. We can talk through how to keep service smooth and on schedule.',
    detail:
      'Give us the date, number of attendees, venue and timings, and tell us if you need tea-and-snacks service or a full lunch, so we can discuss what suits your event.',
    discuss: ['Attendee count', 'Meal or tea & snacks', 'Schedule on the day', 'Venue logistics'],
    cta: 'Enquire for Corporate Catering',
    event: 'corporate',
  },
];

export const EVENT_TYPES = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'engagement', label: 'Engagement' },
  { value: 'birthday', label: 'Birthday party' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'private', label: 'Private party / family function' },
  { value: 'festival', label: 'Festival / religious celebration' },
  { value: 'corporate', label: 'Corporate / special event' },
  { value: 'other', label: 'Something else' },
];

export const PLANNING_TOPICS = [
  { icon: 'Users', title: 'Guest count', text: 'A rough number is enough to begin. It shapes quantities, staffing and the way food is served.' },
  { icon: 'UtensilsCrossed', title: 'Menu preferences', text: 'Tell us the dishes, cuisines and style of meal you have in mind, or ask for suggestions.' },
  { icon: 'MapPin', title: 'Event location', text: 'Home, hall or auditorium – the venue affects preparation, transport and service arrangements.' },
  { icon: 'Leaf', title: 'Dietary requirements', text: 'Vegetarian guests, allergies or religious customs? Mention them early so they are planned for.' },
  { icon: 'ClipboardList', title: 'Service arrangements', text: 'Banana-leaf, buffet or plated; timings and number of servers. Ask us what can be arranged.' },
];
