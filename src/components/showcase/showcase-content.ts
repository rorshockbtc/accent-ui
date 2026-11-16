/**
 * Accént Showcase — one business, two builds.
 *
 * Each business below is rendered twice on /design-system/templates/compare:
 *   1. BangDraftSite      — what a free local BANG! build (Qwen / Llama + STYLES.md) realistically produces.
 *   2. StudioCraftedSite  — an art-directed Colon Hyphen Bracket (:-]) build of the same facts.
 *
 * Both versions read the SAME content so the comparison stays fair. All 20 images under
 * /showcase/<business>/ are owned editorial photography converted cleanly to WebP.
 */

export interface ShowcaseImage {
  src: string;
  alt: string;
  /** Final owned file path once generated. */
  target: string;
  /** Prompt for the image model (follow-up item). */
  prompt: string;
}

export interface ShowcaseItem {
  name: string;
  detail: string;
  price: string;
}

export interface ShowcaseBusiness {
  id: 'taco' | 'bank' | 'salon' | 'office' | 'portfolio';
  kind: string;
  name: string;
  city: string;
  phone: string;
  address: string;
  hours: string;
  status: string;
  /** Studio headline, one entry per line (revealed line by line). */
  headline: string[];
  intro: string;
  /** Generic copy a local model tends to write. */
  draftHeadline: string;
  draftIntro: string;
  primaryCta: string;
  secondaryCta: string;
  brand: {
    bg: string;
    surface: string;
    ink: string;
    muted: string;
    accent: string;
    accentInk: string;
    rule: string;
    display: string;
    body: string;
    /** Corner radius used for buttons in the studio build. */
    radius: string;
    /** True when the studio build uses a dark page. */
    dark?: boolean;
  };
  /** Short architecture labels contrasting Draft vs. Studio across the 5 businesses. */
  draftPatternLabel: string;
  studioPatternLabel: string;
  /** Per-business "What changed?" callout items (1..5) shown in the drawer. */
  callouts: { n: number; title: string; body: string }[];
  stats: { value: string; label: string }[];
  story: {
    eyebrow: string;
    heading: string;
    steps: { title: string; body: string; image: ShowcaseImage }[];
  };
  menu: {
    eyebrow: string;
    heading: string;
    categories: { name: string; items: ShowcaseItem[] }[];
  };
  booking: {
    eyebrow: string;
    heading: string;
    note: string;
    options: string[];
    cta: string;
    confirm: string;
  };
  quotes: { text: string; who: string }[];
  images: { hero: ShowcaseImage };
}

const img = (src: string, alt: string, target: string, prompt: string): ShowcaseImage => ({
  src,
  alt,
  target,
  prompt,
});

export const SHOWCASE_BUSINESSES: ShowcaseBusiness[] = [
  {
    id: 'taco',
    kind: 'Restaurant',
    name: 'Eastside Taco Co.',
    city: 'Austin, TX',
    phone: '(512) 555-0142',
    address: '1708 E 6th St, Austin, TX 78702',
    hours: 'Mon–Thu 7 am – 9 pm · Fri–Sat 7 am – 11 pm · Sun 8 am – 3 pm',
    status: 'Open now · Kitchen closes at 9 pm',
    headline: ['Breakfast tacos', 'worth getting up for.'],
    intro:
      'Hand-pressed tortillas, slow-cooked fillings, and strong coffee on East 6th since 2014. Order ahead and skip the line.',
    draftHeadline: 'Welcome to Eastside Taco Co.',
    draftIntro:
      'We are a taco restaurant in Austin, Texas. We serve delicious tacos made with fresh ingredients. Come visit us today!',
    primaryCta: 'Order for pickup',
    secondaryCta: 'See the menu',
    brand: {
      bg: '#FFF8EF',
      surface: '#FBEBD7',
      ink: '#1F1712',
      muted: '#5E4E43',
      accent: '#C2410C',
      accentInk: '#FFFFFF',
      rule: 'rgba(31,23,18,0.14)',
      display: "var(--font-bricolage), 'Bricolage Grotesque', system-ui, sans-serif",
      body: "var(--font-sans), 'Inter', system-ui, sans-serif",
      radius: '9999px',
    },
    stats: [
      { value: '1,200', label: 'tortillas pressed every morning' },
      { value: '10 min', label: 'average pickup time' },
      { value: '4.8★', label: 'from 2,300 neighbors' },
    ],
    story: {
      eyebrow: 'How we cook',
      heading: 'Simple food, done the slow way.',
      steps: [
        {
          title: 'Tortillas pressed at 6 am',
          body: 'Masa is mixed fresh every morning and pressed to order, so every taco starts warm and soft.',
          image: img('/showcase/taco/tortillas.webp', 'Fresh tortillas stacked on a warm griddle', '/showcase/taco/tortillas.webp', 'Close-up of fresh corn tortillas on a cast-iron comal, warm morning light, Austin taco shop kitchen, editorial food photography'),
        },
        {
          title: 'Brisket smoked for 12 hours',
          body: 'Our brisket goes on the smoker the night before. Pork and chicken are braised low and slow.',
          image: img('/showcase/taco/brisket.webp', 'Smoker and kitchen line', '/showcase/taco/brisket.webp', 'Sliced smoked brisket on butcher paper next to a taco, natural light, Texas BBQ meets taqueria, editorial food photography'),
        },
        {
          title: 'Salsas made in small batches',
          body: 'Four salsas, made twice a day. Ask for the green one if you like heat.',
          image: img('/showcase/taco/salsas.webp', 'Small bowls of salsa', '/showcase/taco/salsas.webp', 'Four small bowls of red and green salsa on a wooden counter, overhead shot, bright and appetizing'),
        },
      ],
    },
    menu: {
      eyebrow: 'Menu',
      heading: 'Order what the regulars order.',
      categories: [
        {
          name: 'Breakfast',
          items: [
            { name: 'Bacon, egg & cheese', detail: 'Crispy bacon, scrambled eggs, cheddar, flour tortilla', price: '$4.25' },
            { name: 'Migas', detail: 'Eggs, tortilla strips, pico, queso fresco', price: '$4.50' },
            { name: 'Potato & bean', detail: 'Roasted potatoes, refried beans, cheddar', price: '$3.75' },
          ],
        },
        {
          name: 'Lunch & Dinner',
          items: [
            { name: 'Smoked brisket', detail: '12-hour brisket, pickled onion, salsa verde', price: '$5.50' },
            { name: 'Al pastor', detail: 'Marinated pork, pineapple, cilantro, onion', price: '$4.75' },
            { name: 'Crispy fish', detail: 'Beer-battered cod, cabbage slaw, lime crema', price: '$5.25' },
          ],
        },
        {
          name: 'Drinks',
          items: [
            { name: 'Cold brew', detail: 'Local roast, steeped 18 hours', price: '$4.00' },
            { name: 'Horchata', detail: 'House-made, cinnamon and vanilla', price: '$3.50' },
            { name: 'Fresh lime agua fresca', detail: 'Lightly sweetened', price: '$3.50' },
          ],
        },
      ],
    },
    booking: {
      eyebrow: 'Order ahead',
      heading: 'Pick a pickup time.',
      note: 'We’ll text you when your order is ready. Pay at the counter.',
      options: ['7:30 am', '8:00 am', '8:30 am', '12:00 pm', '12:30 pm', '6:00 pm'],
      cta: 'Hold my pickup time',
      confirm: 'Got it. We’ll text you when it’s ready.',
    },
    quotes: [
      { text: 'Best breakfast taco on the east side. Not close.', who: 'Maria G., Google review' },
      { text: 'The brisket taco ruined every other taco for me.', who: 'Dan P., Yelp' },
      { text: 'Order-ahead actually works. In and out in two minutes.', who: 'Priya S., Google review' },
      { text: 'Friendly people, fair prices, great coffee.', who: 'Chris L., Yelp' },
    ],
    images: {
      hero: img('/showcase/taco/hero.webp', 'Tacos and coffee on the counter at Eastside Taco Co.', '/showcase/taco/hero.webp', 'Three breakfast tacos in paper-lined baskets next to an iced coffee on a sunny counter, colorful Austin taco shop interior blurred behind, editorial food photography, 16:9'),
    },
    draftPatternLabel: 'Counter Menu Board · 2-column paper menu + walk-up hours',
    studioPatternLabel: 'Multi-Page Pickup App + 5 AM Comal Zine · Bag builder, SHU salsa heat & group box planner',
    callouts: [
      { n: 1, title: 'Split poster hero + live wait badge', body: 'Pairs morning light photography with a real-time ~10 min kitchen readiness indicator.' },
      { n: 2, title: 'Interactive Pickup Bag Builder', body: 'Tap + Add on any taco or drink, pick Verde/Roja/Habanero heat, and watch subtotal + TX tax update live.' },
      { n: 3, title: 'Horizontal scroll-snap kitchen strip', body: 'Native snap-scrolling photo cards for 6 am masa, 12-hr brisket, and small-batch salsas.' },
      { n: 4, title: 'Tactile spring feedback & window hold', body: 'Spring physics on category pills plus one-tap pickup time ticket (#ET-204).' },
      { n: 5, title: 'Multi-page Comal Dispatches & Group Box Planner', body: 'Full editorial zine stories on nixtamal corn, 12-hour post-oak brisket, and office taco box tiers.' },
    ],
  },
  {
    id: 'bank',
    kind: 'Community Bank',
    name: 'Hill Country Community Bank',
    city: 'Fredericksburg, TX',
    phone: '(830) 555-0190',
    address: '210 W Main St, Fredericksburg, TX 78624',
    hours: 'Lobby Mon–Fri 9 am – 5 pm · Drive-thru Sat 9 am – noon',
    status: 'Lobby open · Drive-thru until 6 pm',
    headline: ['Local decisions.', 'Real people who answer.'],
    intro:
      'Checking, savings, and small-business loans from a bank that has served the Hill Country since 1962. Every loan is decided here, not in another state.',
    draftHeadline: 'Welcome to Hill Country Community Bank',
    draftIntro:
      'We are a bank that offers many financial services. Our team is dedicated to helping you with all your banking needs. Contact us today.',
    primaryCta: 'Open an account',
    secondaryCta: 'Talk to a banker',
    brand: {
      bg: '#FFFFFF',
      surface: '#EEF3FA',
      ink: '#0B1F3A',
      muted: '#44546A',
      accent: '#1D4ED8',
      accentInk: '#FFFFFF',
      rule: 'rgba(11,31,58,0.12)',
      display: "var(--font-source-serif), 'Source Serif 4', Georgia, serif",
      body: "var(--font-public-sans), 'Public Sans', system-ui, sans-serif",
      radius: '6px',
    },
    stats: [
      { value: '62 yrs', label: 'serving Gillespie County' },
      { value: '4.15%', label: 'APY on 12-month CDs' },
      { value: '1 day', label: 'typical small-loan decision' },
    ],
    story: {
      eyebrow: 'Why people switch',
      heading: 'Banking that feels like a neighbor.',
      steps: [
        {
          title: 'Call and a person picks up',
          body: 'No phone tree. Our branch team answers during business hours and knows your name.',
          image: img('/showcase/bank/lobby.webp', 'Bank lobby with a banker at a desk', '/showcase/bank/lobby.webp', 'Bright, modern small-town bank lobby with wood desks and a friendly banker, natural window light, editorial photography'),
        },
        {
          title: 'Loans decided locally',
          body: 'Our loan committee meets every week in Fredericksburg. You can sit down with the person who approves your loan.',
          image: img('/showcase/bank/main-street.webp', 'Main Street storefronts', '/showcase/bank/main-street.webp', 'Historic Texas Hill Country main street with limestone storefronts on a sunny morning, editorial photography'),
        },
        {
          title: 'Modern tools, no fine print',
          body: 'Mobile deposit, Zelle, and free bill pay. No monthly fee on checking with direct deposit.',
          image: img('/showcase/bank/mobile.webp', 'Customer using a mobile banking app', '/showcase/bank/mobile.webp', 'Hands holding a phone showing a simple banking app over a kitchen table with coffee, soft daylight'),
        },
      ],
    },
    menu: {
      eyebrow: 'Accounts & rates',
      heading: 'Clear rates, updated every Monday.',
      categories: [
        {
          name: 'Checking',
          items: [
            { name: 'Everyday Checking', detail: 'No monthly fee with direct deposit', price: '$0 / mo' },
            { name: 'Interest Checking', detail: 'Earn on balances over $2,500', price: '0.85% APY' },
            { name: 'Student Checking', detail: 'Ages 16–24, free debit card', price: '$0 / mo' },
          ],
        },
        {
          name: 'Savings & CDs',
          items: [
            { name: 'Savings', detail: '$25 to open', price: '1.10% APY' },
            { name: '12-Month CD', detail: '$1,000 minimum', price: '4.15% APY' },
            { name: 'Money Market', detail: 'Tiered rates over $10,000', price: '3.25% APY' },
          ],
        },
        {
          name: 'Business',
          items: [
            { name: 'Business Checking', detail: '250 free transactions a month', price: '$0 / mo' },
            { name: 'Equipment Loans', detail: 'Terms up to 7 years', price: 'From 7.2% APR' },
            { name: 'Line of Credit', detail: 'Up to $250,000', price: 'Prime + 1%' },
          ],
        },
      ],
    },
    booking: {
      eyebrow: 'Talk to a banker',
      heading: 'Book a 20-minute visit.',
      note: 'Bring a photo ID. We’ll help you open an account or talk through a loan.',
      options: ['Mon 10:00 am', 'Mon 2:30 pm', 'Tue 11:00 am', 'Wed 9:30 am', 'Thu 1:00 pm', 'Fri 3:00 pm'],
      cta: 'Request this time',
      confirm: 'Thanks. A banker will call to confirm within one business day.',
    },
    quotes: [
      { text: 'They approved our equipment loan in two days. The big banks took weeks.', who: 'Ranch supply owner' },
      { text: 'I call, someone answers. That’s worth everything.', who: 'Customer since 1998' },
      { text: 'Switched our whole family. No regrets.', who: 'Kerrville customer' },
    ],
    images: {
      hero: img('/showcase/bank/hero.webp', 'Hill Country Community Bank branch exterior', '/showcase/bank/hero.webp', 'Limestone community bank building on a small-town Texas main street, blue sky, live oak trees, welcoming and trustworthy, editorial architecture photography, 16:9'),
    },
    draftPatternLabel: 'Main Street Institutional Ledger · FDIC utility bar + semantic Monday rate table',
    studioPatternLabel: 'Treasury Calculator + Hill Country Briefings + FDIC Coverage Matrix & Branch Officers',
    callouts: [
      { n: 1, title: 'FDIC & Routing masthead (zero gimmick motion)', body: 'Calm Source Serif typography paired with local branch charter info instead of flashy bounce effects.' },
      { n: 2, title: 'Interactive CD Yield & Equipment Loan Calculator', body: 'Slide deposit or loan amounts from $5k to $250k to compare 4.15% APY vs. big-bank 0.45% APY.' },
      { n: 3, title: '3-pillar relationship banking ledger', body: 'Pairs branch photography with named Texas business and family customer quotes.' },
      { n: 4, title: 'Keyboard-scrollable Monday Rate Sheet', body: 'Semantic HTML rate table with tabular numbers across Checking, Savings/CDs, and Business Loans.' },
      { n: 5, title: 'Hill Country Briefings & FDIC Coverage Guide', body: 'Local treasury essays, officer NMLS directory, and an interactive FDIC coverage calculator page.' },
    ],
  },
  {
    id: 'salon',
    kind: 'Hair Salon',
    name: 'Maple & Mirror Hair Studio',
    city: 'Denver, CO',
    phone: '(303) 555-0117',
    address: '3320 Tejon St, Denver, CO 80211',
    hours: 'Tue–Fri 10 am – 7 pm · Sat 9 am – 4 pm · Closed Sun–Mon',
    status: 'Next opening today at 3:30 pm',
    headline: ['Haircuts that grow', 'out as well as they start.'],
    intro:
      'A small, calm studio in the Highlands. Five stylists, no rush, and honest advice about what will actually work with your hair.',
    draftHeadline: 'Welcome to Maple & Mirror Hair Studio',
    draftIntro:
      'We are a hair salon offering haircuts, color, and styling services. Our talented stylists will make you look your best. Book now!',
    primaryCta: 'Book an appointment',
    secondaryCta: 'Services & prices',
    brand: {
      bg: '#FBF4F1',
      surface: '#F2E3DE',
      ink: '#1E1416',
      muted: '#5E4C50',
      accent: '#9D2C57',
      accentInk: '#FFFFFF',
      rule: 'rgba(30,20,22,0.14)',
      display: "var(--font-eb-garamond), 'EB Garamond', Georgia, serif",
      body: "var(--font-work-sans), 'Work Sans', system-ui, sans-serif",
      radius: '2px',
    },
    stats: [
      { value: '5', label: 'senior stylists' },
      { value: '60 min', label: 'for every cut, never rushed' },
      { value: '91%', label: 'of clients rebook' },
    ],
    story: {
      eyebrow: 'Your visit',
      heading: 'Slow down. We’ve got time.',
      steps: [
        {
          title: 'A real consultation first',
          body: 'We talk about your routine, your hair, and what you want before anyone picks up scissors.',
          image: img('/showcase/salon/consult.webp', 'Stylist talking with a client', '/showcase/salon/consult.webp', 'Hair stylist consulting with a client in a bright minimalist salon with plants, soft natural light, editorial photography'),
        },
        {
          title: 'Cut and color, done carefully',
          body: 'Precision cuts and low-maintenance color that still looks good eight weeks later.',
          image: img('/showcase/salon/chair.webp', 'Salon chair and mirror', '/showcase/salon/chair.webp', 'Elegant salon styling chair facing a round mirror, blush walls, warm afternoon light, editorial interior photography'),
        },
        {
          title: 'Leave knowing how to style it',
          body: 'We show you how to recreate the look at home with the products you already own.',
          image: img('/showcase/salon/finish.webp', 'Finished hairstyle', '/showcase/salon/finish.webp', 'Close-up of a freshly styled soft wavy bob haircut from behind, salon background blurred, natural light'),
        },
      ],
    },
    menu: {
      eyebrow: 'Services',
      heading: 'Simple pricing. No surprise add-ons.',
      categories: [
        {
          name: 'Cuts',
          items: [
            { name: 'Signature cut', detail: 'Consultation, wash, cut, and style', price: '$85' },
            { name: 'Short cut & clean-up', detail: 'For shorter styles, every 4–6 weeks', price: '$55' },
            { name: 'Kids (under 12)', detail: 'Wash and cut', price: '$40' },
          ],
        },
        {
          name: 'Color',
          items: [
            { name: 'All-over color', detail: 'Single process, includes style', price: 'From $120' },
            { name: 'Lived-in highlights', detail: 'Soft, low-maintenance blend', price: 'From $185' },
            { name: 'Gloss', detail: 'Shine and tone refresh', price: '$60' },
          ],
        },
        {
          name: 'Styling',
          items: [
            { name: 'Blowout', detail: 'Wash and smooth or bouncy finish', price: '$50' },
            { name: 'Event styling', detail: 'Updos and special occasions', price: 'From $95' },
            { name: 'Deep conditioning', detail: 'Add to any service', price: '$25' },
          ],
        },
      ],
    },
    booking: {
      eyebrow: 'Book online',
      heading: 'Choose a time that works.',
      note: 'Times shown are for a signature cut. We’ll confirm your stylist by text.',
      options: ['Today 3:30 pm', 'Wed 10:00 am', 'Wed 5:30 pm', 'Thu 1:00 pm', 'Fri 11:30 am', 'Sat 9:00 am'],
      cta: 'Book this time',
      confirm: 'You’re booked. A confirmation text is on its way.',
    },
    quotes: [
      { text: 'First haircut in years that actually grew out well.', who: 'Ashley R.' },
      { text: 'Calm, kind, and they listen. Rare.', who: 'Jordan T.' },
      { text: 'My color still looks good at week ten.', who: 'Sam K.' },
    ],
    images: {
      hero: img('/showcase/salon/hero.webp', 'Inside Maple & Mirror Hair Studio', '/showcase/salon/hero.webp', 'Bright boutique hair salon interior with blush walls, round mirrors, green plants and natural light, a stylist working in soft focus, editorial interior photography, 16:9'),
    },
    draftPatternLabel: 'Centered Editorial Lookbook · 3-plate photo triptych + 2-column price sheet',
    studioPatternLabel: 'Editorial Lookbook + Chair Matcher + The Chair Journal Essays & Stylist Portfolios',
    callouts: [
      { n: 1, title: 'Magazine-cover portrait & slow curtain reveal', body: 'Vertical portrait framing set with quiet 600ms editorial motion that matches the studio pace.' },
      { n: 2, title: '3-Chapter Interactive Lookbook', body: 'Crossfade between Consultation, Cut & Color, and At-Home Finish with grow-out expectations.' },
      { n: 3, title: '3-Step Service, Stylist & Chair Matcher', body: 'Select a cut or color, choose Maya, Elena, or First Available, and lock your chair time with exact total.' },
      { n: 4, title: 'Transparent, no-surprise menu categories', body: 'Switch seamlessly between Cuts, Color, and Styling with honest starting ranges.' },
      { n: 5, title: 'The Chair Journal & Stylist Specialty Directory', body: 'Hair health essays (bond repair, dry-cut curly method) paired with direct stylist chair booking.' },
    ],
  },
  {
    id: 'office',
    kind: 'Small Office',
    name: 'Brightline Accounting',
    city: 'Columbus, OH',
    phone: '(614) 555-0163',
    address: '88 E Broad St, Suite 410, Columbus, OH 43215',
    hours: 'Mon–Fri 8:30 am – 5 pm · Extended hours Feb–Apr',
    status: 'Now booking spring tax appointments',
    headline: ['Taxes and books,', 'handled. All year.'],
    intro:
      'A five-person CPA office for small businesses and families. Flat monthly pricing, plain-English answers, and no surprise bills in April.',
    draftHeadline: 'Welcome to Brightline Accounting',
    draftIntro:
      'We provide professional accounting and tax services for individuals and businesses. Our experienced team is here to help. Contact us for more information.',
    primaryCta: 'Book a free call',
    secondaryCta: 'See pricing',
    brand: {
      bg: '#F7F9FC',
      surface: '#E8EEF6',
      ink: '#102A43',
      muted: '#486581',
      accent: '#C2410C',
      accentInk: '#FFFFFF',
      rule: 'rgba(16,42,67,0.12)',
      display: "var(--font-plex-sans), 'IBM Plex Sans', system-ui, sans-serif",
      body: "var(--font-plex-sans), 'IBM Plex Sans', system-ui, sans-serif",
      radius: '4px',
    },
    stats: [
      { value: '340', label: 'small businesses served' },
      { value: '24 hr', label: 'email reply, guaranteed' },
      { value: '$0', label: 'surprise fees, ever' },
    ],
    story: {
      eyebrow: 'How it works',
      heading: 'Three steps, then you’re done thinking about it.',
      steps: [
        {
          title: 'Free 20-minute call',
          body: 'Tell us what you have and what’s stressing you out. We’ll tell you honestly if we’re a fit.',
          image: img('/showcase/office/call.webp', 'Accountant on a video call', '/showcase/office/call.webp', 'Friendly accountant on a video call at a tidy desk with a laptop and notebook, bright modern office, natural light'),
        },
        {
          title: 'One flat monthly price',
          body: 'Bookkeeping, payroll, and taxes in one plan. You know the cost before we start.',
          image: img('/showcase/office/pricing.webp', 'Simple pricing sheet on a desk', '/showcase/office/pricing.webp', 'Clean desk with a printed one-page plan, a pen and coffee, overhead shot, calm blue and white tones'),
        },
        {
          title: 'Quarterly check-ins',
          body: 'Every three months we review your numbers and flag anything that could save you money.',
          image: img('/showcase/office/meeting.webp', 'Small team meeting', '/showcase/office/meeting.webp', 'Small team of three accountants reviewing a chart on a screen in a modern conference room, candid, editorial photography'),
        },
      ],
    },
    menu: {
      eyebrow: 'Pricing',
      heading: 'Flat monthly plans.',
      categories: [
        {
          name: 'Small Business',
          items: [
            { name: 'Bookkeeping', detail: 'Monthly reconciliation and reports', price: '$350 / mo' },
            { name: 'Books + Payroll', detail: 'Up to 10 employees', price: '$520 / mo' },
            { name: 'Full Service', detail: 'Books, payroll, and business tax return', price: '$790 / mo' },
          ],
        },
        {
          name: 'Individuals',
          items: [
            { name: 'Personal tax return', detail: 'Federal and Ohio, W-2 income', price: '$275' },
            { name: 'Return with side business', detail: 'Includes Schedule C', price: '$450' },
            { name: 'Tax planning session', detail: '60 minutes, with written summary', price: '$200' },
          ],
        },
      ],
    },
    booking: {
      eyebrow: 'Free consultation',
      heading: 'Pick a time for a quick call.',
      note: '20 minutes by phone or video. No sales pitch.',
      options: ['Mon 9:00 am', 'Mon 1:30 pm', 'Tue 10:30 am', 'Wed 3:00 pm', 'Thu 11:00 am', 'Fri 9:30 am'],
      cta: 'Book my free call',
      confirm: 'Booked. You’ll get a calendar invite by email.',
    },
    quotes: [
      { text: 'First year I wasn’t scared of April.', who: 'Owner, Clintonville bakery' },
      { text: 'They explain things like a normal person.', who: 'Freelance photographer' },
      { text: 'Flat pricing changed everything for our budget.', who: 'HVAC company, 8 employees' },
    ],
    images: {
      hero: img('/showcase/office/hero.webp', 'Brightline Accounting office', '/showcase/office/hero.webp', 'Bright modern small accounting office with large windows, plants, two people talking at a desk, calm blue and white palette with a warm orange accent, editorial photography, 16:9'),
    },
    draftPatternLabel: 'Two-Column CPA Advisory Dossier · Sticky credentials rail + flat-fee tiers + native FAQ',
    studioPatternLabel: 'Flat-Fee CPA Estimator + Client Advisory Memos Binder + 2026 Federal & Ohio Deadlines',
    callouts: [
      { n: 1, title: 'Swiss-grid masthead & SLA guarantees', body: 'Leads immediately with 24-hr reply time and $0 April surprise bills above clean IBM Plex Sans.' },
      { n: 2, title: 'Interactive Flat-Fee Scope Recommender', body: 'Select Solo, LLC/S-Corp, or Personal + team size to see your exact flat monthly or annual fee.' },
      { n: 3, title: 'Interactive Q1–Q4 Year-Round Tax Roadmap', body: 'Explore what Brightline handles every quarter so taxes stop feeling like an April ambush.' },
      { n: 4, title: 'Accessible native CPA FAQ disclosures', body: 'Expand switching, software stack, and IRS notice answers without leaving the page.' },
      { n: 5, title: 'Client Advisory Memos & 2026 Deadline Table', body: 'Searchable S-Corp/RITA/IRS memos with scope CTA handoffs and a keyboard-scrollable deadline table.' },
    ],
  },
  {
    id: 'portfolio',
    kind: 'Personal Portfolio',
    name: 'Jordan Lee',
    city: 'Portland, OR',
    phone: '(503) 555-0109',
    address: 'Portland, OR · Working with clients everywhere',
    hours: 'Booking projects for March onward',
    status: 'Available for 2 new projects this spring',
    headline: ['Product designer', 'for small, careful teams.'],
    intro:
      'I help early-stage companies turn messy ideas into simple products people enjoy using. Ten years, forty launches, one pair of hands.',
    draftHeadline: 'Hi, I’m Jordan Lee',
    draftIntro:
      'I am a passionate product designer with experience in UX and UI design. I love creating beautiful and functional designs. Check out my work below.',
    primaryCta: 'See selected work',
    secondaryCta: 'Get in touch',
    brand: {
      bg: '#111113',
      surface: '#1C1C20',
      ink: '#F4F4F2',
      muted: '#A8A8A2',
      accent: '#B8F25C',
      accentInk: '#111113',
      rule: 'rgba(244,244,242,0.14)',
      display: "var(--font-newsreader), 'Newsreader', Georgia, serif",
      body: "var(--font-sans), 'Inter', system-ui, sans-serif",
      radius: '9999px',
      dark: true,
    },
    stats: [
      { value: '40+', label: 'products launched' },
      { value: '10 yrs', label: 'designing software' },
      { value: '3', label: 'apps featured by Apple' },
    ],
    story: {
      eyebrow: 'Selected work',
      heading: 'A few projects I’m proud of.',
      steps: [
        {
          title: 'Fieldnote — note-taking for farmers',
          body: 'Redesigned onboarding and cut setup time from 12 minutes to 3. Retention up 38%.',
          image: img('/showcase/portfolio/fieldnote.webp', 'Fieldnote app shown on a phone in a field', '/showcase/portfolio/fieldnote.webp', 'Smartphone showing a clean note-taking app held up in a green farm field, shallow depth of field, product photography'),
        },
        {
          title: 'Ledgerly — invoicing for freelancers',
          body: 'Designed the product from zero to launch in 14 weeks with a team of four.',
          image: img('/showcase/portfolio/ledgerly.webp', 'Ledgerly dashboard on a laptop', '/showcase/portfolio/ledgerly.webp', 'Laptop on a wooden desk showing a minimal invoicing dashboard, dark mode with lime accent, product photography'),
        },
        {
          title: 'Parkside — a city parks guide',
          body: 'Accessible, offline-first guide used by 200,000 Portland residents.',
          image: img('/showcase/portfolio/parkside.webp', 'Parkside app over a city park', '/showcase/portfolio/parkside.webp', 'Phone showing a parks map app in front of a lush Pacific Northwest city park, morning light, product photography'),
        },
      ],
    },
    menu: {
      eyebrow: 'Services',
      heading: 'Ways we can work together.',
      categories: [
        {
          name: 'Projects',
          items: [
            { name: 'Product sprint', detail: '2 weeks: research, prototype, test', price: 'From $9,000' },
            { name: 'MVP design', detail: '6–10 weeks, launch-ready designs', price: 'From $28,000' },
            { name: 'Design audit', detail: 'Written review with prioritized fixes', price: '$2,500' },
          ],
        },
        {
          name: 'Ongoing',
          items: [
            { name: 'Fractional design lead', detail: '2 days a week', price: '$7,500 / mo' },
            { name: 'Office hours', detail: 'Monthly calls for founders', price: '$600 / mo' },
          ],
        },
      ],
    },
    booking: {
      eyebrow: 'Get in touch',
      heading: 'Grab 30 minutes to talk about your project.',
      note: 'Video call. Tell me what you’re building and where you’re stuck.',
      options: ['Tue 9:00 am PT', 'Tue 2:00 pm PT', 'Wed 11:00 am PT', 'Thu 10:00 am PT', 'Thu 3:30 pm PT', 'Fri 1:00 pm PT'],
      cta: 'Request this call',
      confirm: 'Thanks. I’ll send a calendar invite today.',
    },
    quotes: [
      { text: 'Jordan made our product feel obvious. Hard thing to do.', who: 'Founder, Fieldnote' },
      { text: 'Fast, thoughtful, and great with engineers.', who: 'CTO, Ledgerly' },
      { text: 'The best design hire we never had to make full-time.', who: 'COO, Parkside' },
    ],
    images: {
      hero: img('/showcase/portfolio/hero.webp', 'Portrait of Jordan Lee', '/showcase/portfolio/hero.webp', 'Environmental portrait of a friendly product designer in their 30s at a sunlit studio desk with sketches and a laptop, muted dark tones, editorial portrait photography, 16:9'),
    },
    draftPatternLabel: 'Minimalist Maker Index · Light stone single-column dossier + numbered work + rate sheet',
    studioPatternLabel: 'Dark Case Workbench + Full Case Deep-Dives + Design Essays & 10-Day Sprint Colophon',
    callouts: [
      { n: 1, title: 'Dark obsidian + electric lime studio masthead', body: 'Editorial Newsreader headlines paired with spring availability status and compact founder portrait.' },
      { n: 2, title: 'Interactive Case-Study Workbench (01–03)', body: 'Switch between Fieldnote, Ledgerly, and Parkside with a crisp spring layoutId indicator.' },
      { n: 3, title: 'Per-project Proof Lens Switcher', body: 'Toggle between Outcome & Metrics, What Shipped, and Founder Quote inside the active stage.' },
      { n: 4, title: 'Interactive Sprint Scope & Deliverable Builder', body: 'Select Product Sprint ($9k), MVP ($28k), Audit ($2.5k), or Fractional Lead to inspect week-by-week output.' },
      { n: 5, title: 'Full Case Deep-Dives, Essays & Sprint Colophon', body: 'Every workbench case opens a complete architecture write-up alongside studio field notes and a 10-day timeline.' },
    ],
  },
];

export const SHOWCASE_BY_ID = Object.fromEntries(
  SHOWCASE_BUSINESSES.map((b) => [b.id, b])
) as Record<ShowcaseBusiness['id'], ShowcaseBusiness>;

/** What the studio build adds, shown in the "What changed?" drawer. */
export const STUDIO_CALLOUTS = [
  { n: 1, title: 'Art-directed first screen', body: 'Full-bleed photo, a headline written for the customer, and the next step one tap away.' },
  { n: 2, title: 'Proof up front', body: 'Real numbers instead of “we are dedicated to quality.”' },
  { n: 3, title: 'A story with a point of view', body: 'Short, specific copy paired with photos that change as you read.' },
  { n: 4, title: 'Easy-to-scan menu or pricing', body: 'Grouped tabs and clear prices. No PDFs, no guessing.' },
  { n: 5, title: 'Built-in booking', body: 'Pick a time right on the page instead of a generic contact form.' },
  { n: 6, title: 'Social proof and finish', body: 'Reviews, hours, and location, laid out with care down to the footer.' },
] as const;
