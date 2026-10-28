// ILLUSTRATIVE MENU – NOT a confirmed list of what Sunrise Caterers cooks.
// Dishes below are common examples for each category so that visitors understand the kind of
// food that can be discussed. Replace/trim them once the client confirms the real menu.
// No prices and no availability promises are shown anywhere on the site.

export const MENU_DISCLAIMER =
  'Sample dishes shown for illustration. The final menu is confirmed with Sunrise Caterers for your occasion.';

export const MENU_CATEGORIES = [
  {
    id: 'kerala',
    label: 'Traditional Kerala',
    imageKey: 'menuKerala',
    blurb: 'The comfort of a Kerala-style sadya: rice at the centre, a ring of small curries and a sweet finish.',
    dishes: [
      { name: 'Sadya-style spread', note: 'Rice with a selection of traditional accompaniments', veg: true },
      { name: 'Avial', note: 'Mixed vegetables in coconut and curd', veg: true },
      { name: 'Parippu & ghee', note: 'Yellow dal served with rice', veg: true },
      { name: 'Sambar', note: 'Lentil and vegetable stew with tamarind', veg: true },
      { name: 'Kerala-style thoran', note: 'Stir-fried vegetables with grated coconut', veg: true },
      { name: 'Pickles & banana chips', note: 'The little crunchy and tangy extras', veg: true },
    ],
  },
  {
    id: 'veg',
    label: 'Vegetarian',
    imageKey: 'menuVeg',
    blurb: 'Plant-forward dishes that feel generous enough for a celebration.',
    dishes: [
      { name: 'Vegetable stew', note: 'Gently spiced coconut-milk stew', veg: true },
      { name: 'Paneer butter masala', note: 'Creamy tomato gravy', veg: true },
      { name: 'Mixed vegetable kurma', note: 'Coconut-based vegetable curry', veg: true },
      { name: 'Vegetable biryani', note: 'Fragrant rice layered with vegetables', veg: true },
      { name: 'Dal fry', note: 'Tempered lentils', veg: true },
    ],
  },
  {
    id: 'nonveg',
    label: 'Non-vegetarian',
    imageKey: 'menuNonVeg',
    blurb: 'Hearty non-vegetarian options for guests who want something richer.',
    dishes: [
      { name: 'Kerala chicken roast', note: 'Slow-cooked with onions and spices', veg: false },
      { name: 'Fish curry', note: 'Tangy, coconut-based', veg: false },
      { name: 'Mutton stew', note: 'Mild and aromatic, a good match for appam', veg: false },
      { name: 'Egg roast', note: 'Boiled eggs in a spiced onion masala', veg: false },
      { name: 'Chicken biryani', note: 'Rice and chicken cooked together', veg: false },
    ],
  },
  {
    id: 'starters',
    label: 'Starters & snacks',
    imageKey: 'menuStarters',
    blurb: 'Something to nibble on while guests arrive and settle in.',
    dishes: [
      { name: 'Vegetable cutlet', note: 'Crisp outside, soft inside', veg: true },
      { name: 'Pazham pori', note: 'Banana fritters, a classic tea-time snack', veg: true },
      { name: 'Samosa', note: 'Spiced filling in a crisp pastry', veg: true },
      { name: 'Paneer tikka', note: 'Marinated and grilled', veg: true },
      { name: 'Chicken fry', note: 'Spiced and shallow-fried', veg: false },
    ],
  },
  {
    id: 'mains',
    label: 'Main courses',
    imageKey: 'menuMains',
    blurb: 'The centrepiece of the meal – breads, rice and gravies that suit your crowd.',
    dishes: [
      { name: 'Ghee rice', note: 'Aromatic rice with fried onions and nuts', veg: true },
      { name: 'Malabar parotta', note: 'Layered flatbread', veg: true },
      { name: 'Appam with stew', note: 'Lacy rice pancakes', veg: true },
      { name: 'Chapati & curry', note: 'Everyday favourite, party-sized', veg: true },
      { name: 'Meen/Chicken curry with rice', note: 'A comforting main for non-vegetarian guests', veg: false },
    ],
  },
  {
    id: 'desserts',
    label: 'Desserts & sweets',
    imageKey: 'menuDesserts',
    blurb: 'A sweet ending: payasam, laddu and more.',
    dishes: [
      { name: 'Ada pradhaman', note: 'Rice-flake payasam in jaggery and coconut milk', veg: true },
      { name: 'Semiya payasam', note: 'Vermicelli in sweet milk', veg: true },
      { name: 'Laddu', note: 'Festive gram-flour sweet', veg: true },
      { name: 'Halwa', note: 'Soft, glossy and rich', veg: true },
      { name: 'Ice cream', note: 'A cool finish for warm days', veg: true },
    ],
  },
  {
    id: 'beverages',
    label: 'Beverages',
    imageKey: 'menuBeverages',
    blurb: 'Cool welcome drinks and warm cups to round off the meal.',
    dishes: [
      { name: 'Sambaram', note: 'Spiced buttermilk', veg: true },
      { name: 'Fresh lime soda', note: 'Sweet, salted or mixed', veg: true },
      { name: 'Welcome drink', note: 'A chilled sherbet for arriving guests', veg: true },
      { name: 'Tea & coffee', note: 'For after the meal or tea-time events', veg: true },
    ],
  },
];

export const FOOD_EXPERIENCES = [
  { title: 'Banana-leaf service', text: 'A traditional way of serving, ideal for weddings, festivals and family functions. Ask us about arrangements for your event.' },
  { title: 'Buffet style', text: 'Easy for larger gatherings where guests help themselves. We can talk about how it would work at your venue.' },
  { title: 'Snacks & tea service', text: 'Light refreshments for meetings, functions and tea-time events.' },
  { title: 'Welcome drinks & sweets', text: 'A cool drink on arrival and something sweet at the end. Tell us what you would like.' },
  { title: 'Live counters & extras', text: 'Options such as live counters can be discussed. Please ask whether they can be arranged for your date and venue.' },
];
