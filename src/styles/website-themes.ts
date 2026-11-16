export type WebsiteThemeId =
  | 'hacienda-hospitality'
  | 'hearth-provisions'
  | 'field-dispatch'
  | 'clinical-sanctuary'
  | 'fiduciary-chambers'
  | 'maker-catalog'
  | 'case-study-studio'
  | 'civic-almanac';

export type WebsiteLayoutArchetype =
  | 'terrace-editorial'
  | 'menu-ledger'
  | 'dispatch-split'
  | 'intake-guide'
  | 'chambers-dossier'
  | 'plate-catalog'
  | 'studio-casegrid'
  | 'parish-broadsheet';

export interface SiteOfferingItem {
  name: string;
  detail: string;
  priceOrSpec: string;
  badge?: string;
}

export interface SiteScheduleSpecItem {
  label: string;
  value: string;
  note?: string;
}

export interface SiteGalleryImage {
  url: string;
  caption: string;
  alt: string;
}

export interface SiteFaqItem {
  question: string;
  answer: string;
}

export interface SiteContentContract {
  slug: string;
  businessName: string;
  tagline: string;
  cityState: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  heroImageUrl: string;
  heroImageAlt: string;
  storyHeading: string;
  storyParagraphs: string[];
  offeringsTitle: string;
  offerings: SiteOfferingItem[];
  scheduleOrSpecsTitle: string;
  scheduleOrSpecs: SiteScheduleSpecItem[];
  galleryImages: SiteGalleryImage[];
  notesOrFaq: SiteFaqItem[];
  themeId: WebsiteThemeId;
}

export interface WebsiteThemePersonality {
  heroVariant: ThemeHeroVariant;
  imageTreatment: string;
  motionProfile: string;
  buttonShapeLabel: string;
  voice: string;
  sampleHeadline: string;
}

export type ThemeHeroVariant =
  | 'wide-landscape'
  | 'split-counter'
  | 'urgent-callout'
  | 'calm-letter'
  | 'ruled-dossier'
  | 'specimen-first'
  | 'architectural-band'
  | 'broadsheet-lead';

export interface WebsiteThemeSpec {
  id: WebsiteThemeId;
  name: string;
  shortName: string;
  archetype: WebsiteLayoutArchetype;
  archetypeLabel: string;
  summary: string;
  bestFor: string;
  avoidFor: string;
  brandDialect: string;
  personality: WebsiteThemePersonality;
  typography: {
    display: string;
    body: string;
    mono: string;
    displayLabel: string;
    bodyLabel: string;
    monoLabel: string;
    googleFontsUrl: string;
    displayScale: string;
    tracking: string;
    pairingRationale: string;
  };
  palette: {
    bg: string;
    surface: string;
    ink: string;
    muted: string;
    accent: string;
    accentInk: string;
    border: string;
    focalSurface: string;
  };
  geometry: {
    radius: string;
    hairlineWidth: string;
    navStyle: string;
    heroStyle: string;
    offeringsComponent: string;
    maxWidthPx: number;
  };
  motion?: {
    entranceMs: number;
    easing: string;
    hoverRule: string;
  };
  sameBusinessNote: string;
  domainExample: SiteContentContract;
}

export const DEFAULT_THEME_MOTION = {
  entranceMs: 180,
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  hoverRule: '1px border darkening on cards and crisp focus outlines',
};

export interface EcosystemHandoffStep {
  step: number;
  product: string;
  role: string;
  plainEnglishSummary: string;
  handoffFormat: string;
  externalTools?: string[];
}

export const ECOSYSTEM_HANDOFF_STEPS: EcosystemHandoffStep[] = [
  {
    step: 1,
    product: 'Hash',
    role: 'Draft rough notes & owner voice',
    plainEnglishSummary:
      'Capture owner notes, hours, menus, photos, and honest answers on your phone or computer before touching layout code.',
    handoffFormat: 'Markdown & structured notes synced to your personal or company Pipe.',
  },
  {
    step: 2,
    product: 'Your Pipe',
    role: 'Keep durable business & craft sources together',
    plainEnglishSummary:
      'Store price sheets, supplier origins, customer FAQs, and reference articles so every tool pulls from the same verified source of truth.',
    handoffFormat: 'Structured JSON nodes synced locally and in your workspace.',
  },
  {
    step: 3,
    product: 'Pipes Desktop + BANG!',
    role: 'Auto-tuned local AI & visual site builder',
    plainEnglishSummary:
      'Detects your computer memory and disk space, configures local Qwen/Llama models, builds clean zero-fee HTML/CSS, and checks every photo for real-world fit.',
    handoffFormat: 'site.content.json + static /public bundle + local preview on 127.0.0.1:4321.',
  },
  {
    step: 4,
    product: 'pipe\\website-design',
    role: 'Proven layout, stack & deployment playbooks',
    plainEnglishSummary:
      'Teaches owners and local models which layout fits the business, why static/TypeScript beats pricey cloud servers, and exact menu clicks for GitHub, Vercel, and Cloudflare.',
    handoffFormat: 'Cited craft articles & checklist playbooks readable by both humans and local AIs.',
  },
  {
    step: 5,
    product: 'Accént Design System + Paid Templates',
    role: 'Switch complete layout skeletons & contribute themes',
    plainEnglishSummary:
      'Change typography, hairline spacing, and page geometry across 8 tested themes without rewriting your copy—and submit your own tested themes to earn marketplace payouts.',
    handoffFormat: 'Versioned STYLES.md + standalone CSS contract (?theme=<id>).',
  },
  {
    step: 6,
    product: 'Semi & Greater',
    role: 'Plain-English second opinion & public proof',
    plainEnglishSummary:
      'Ask Semi questions in clear English whenever DNS, hosting menus, or wording feel confusing, or cross-check claims against primary sources.',
    handoffFormat: 'Grounded Q&A and public source verification.',
  },
  {
    step: 7,
    product: 'Pipes Extension + External Coding Agents',
    role: 'Edit live copy in Chrome & hand off to any IDE agent',
    plainEnglishSummary:
      'Click text or flag wrong photos directly on the live webpage, export bang-live-edits.json back to Pipes Desktop, or open the folder in Antigravity, Codex, Claude Code, or Cursor with pre-built instructions.',
    handoffFormat: 'bang-live-edits.json + AGENTS.md + CLAUDE.md + .cursor/rules/pipes-bang.mdc + HANDOFF_PROMPT.md',
    externalTools: ['Antigravity', 'Codex', 'Claude Code', 'Cursor', 'Windsurf'],
  },
];

export const FINCA_MIRADOR_BASE_CONTENT: SiteContentContract = {
  slug: 'cypress-creek-coffee',
  businessName: 'Cypress Creek Coffee & Inn',
  tagline: 'Small-Batch Roastery & Shaded Porch Breakfast · Wimberley, TX',
  cityState: 'Wimberley, TX',
  phone: '(512) 555-0148',
  email: 'hello@cypresscreekinn.example',
  address: '412 River Rd, Wimberley, TX 78676',
  hours: 'Tue–Sun 7:30 AM – 6:30 PM · Closed Mondays',
  ctaLabel: 'Book Porch Tasting',
  ctaHref: '#contact',
  secondaryCtaLabel: 'Call the Roastery',
  secondaryCtaHref: 'tel:+15125550148',
  heroImageUrl: '/themes/assets/hero.webp',
  heroImageAlt: 'Sunlit shaded veranda and green trees overlooking hills at dusk',
  storyHeading: 'Slow-Roasted Beside the Limestone Creek',
  storyParagraphs: [
    'Every morning in Wimberley, morning fog lifts off Cypress Creek just as the first drum roast drops onto our cooling tray. We buy single-origin lots directly from small partner growers and roast twice weekly in 25-pound batches.',
    'Because the roastery and coffee bar sit twenty steps apart, guests taste clean washed sweetness, toasted pecan, and cocoa right on the shaded porch under live oak trees.',
    'Stop by for walk-up morning espresso and warm breakfast plates, or reserve a seat at our Friday and Saturday guided tasting table.',
  ],
  offeringsTitle: 'Fresh Harvest Lots & Porch Offerings',
  offerings: [
    {
      name: 'Cypress Washed Bourbon (12 oz Whole Bean)',
      detail: 'Medium-light small-batch roast; clean citrus finish, brown sugar sweetness, roasted twice weekly.',
      priceOrSpec: '$18 / 12 oz',
      badge: 'Daily Pour',
    },
    {
      name: 'Hill Country Honey Lot (12 oz Whole Bean)',
      detail: 'Slow patio-dried green beans for a velvety body with notes of peach and roasted almond.',
      priceOrSpec: '$21 / 12 oz',
      badge: 'Roaster Pick',
    },
    {
      name: 'Guided Roastery Walk & Cupping Table',
      detail: '60-minute walk around our sample roaster followed by a three-origin side-by-side tasting flight.',
      priceOrSpec: '$24 / guest',
      badge: 'Fri–Sun 10:00 AM',
    },
    {
      name: 'Porch Breakfast & Estate Espresso Plate',
      detail: 'Farmhouse skillet eggs, sourdough toast with cultured butter, and double-shot seasonal espresso.',
      priceOrSpec: '$14 / plate',
      badge: '7:30 AM – Noon',
    },
  ],
  scheduleOrSpecsTitle: 'Roastery Hours & Tasting Schedule',
  scheduleOrSpecs: [
    { label: 'Roast Days', value: 'Mondays & Thursdays', note: 'Bags peak 2–7 days off-roast' },
    { label: 'Lot Profile', value: 'Washed Bourbon & Honey Lots', note: 'Direct farm relationships' },
    { label: 'Brewing Bar', value: 'Pour-Over, Drip & Espresso', note: 'Oat & local dairy available' },
    { label: 'Porch & Coffee Bar', value: 'Tue–Sun · 7:30 AM – 6:30 PM', note: 'Walk-ins welcome' },
    { label: 'Weekend Cupping', value: 'Fri–Sun at 10:00 AM', note: 'Small table, max 8 guests' },
  ],
  galleryImages: [
    {
      url: '/themes/assets/courtyard-arches.webp',
      caption: 'Shaded garden seating along the stone veranda beside the creek',
      alt: 'Shaded green garden arches and sunlit courtyard terrace',
    },
    {
      url: '/themes/assets/coffee-plantation.webp',
      caption: 'High-grown partner coffee rows cultivated beneath native shade canopy',
      alt: 'Lush hillside coffee rows under tall shade trees',
    },
    {
      url: '/themes/assets/coffee-cherries.webp',
      caption: 'Hand-sorted ripe coffee cherries selected at peak harvest ripeness',
      alt: 'Close-up of ripe red coffee cherries on a leafy branch',
    },
  ],
  notesOrFaq: [
    {
      question: 'Do we need a reservation just to stop by for coffee and breakfast?',
      answer: 'No reservation is needed for the porch espresso bar or breakfast tables. We recommend booking ahead only for the weekend guided tasting table.',
    },
    {
      question: 'How fresh are the whole-bean bags sold at the counter?',
      answer: 'We roast Mondays and Thursdays in small batches, so every bag on the shelf is stamped with a roast date within the past seven days.',
    },
    {
      question: 'Can offices or local restaurants order five-pound wholesale bags?',
      answer: 'Yes. Send your weekly volume through the inquiry form below and our head roaster will reply within one business day with wholesale pricing.',
    },
  ],
  themeId: 'hacienda-hospitality',
};

export const ACCENT_WEBSITE_THEMES: WebsiteThemeSpec[] = [
  {
    id: 'hacienda-hospitality',
    name: 'Warm Countryside Inn',
    shortName: 'Countryside',
    archetype: 'terrace-editorial',
    archetypeLabel: 'Full-width scenic photo banner + unhurried story + 3 gallery cards',
    summary: 'Warm sandstone paper, deep forest green accent, wide scenic hero band, and relaxed story-led pacing.',
    bestFor: 'Inns, roasteries, tasting rooms, regional dining, retreats, and outdoor venues.',
    avoidFor: '24/7 emergency repair dispatch or high-volume parts spreadsheets.',
    brandDialect: 'Editorial Sandstone + Forest Botanical',
    personality: {
      heroVariant: 'wide-landscape',
      imageTreatment: 'Full-width 16:9 widescreen hero photo with subtle rounded frame (8px)',
      motionProfile: 'Slow editorial ease (180ms), hairline border hover, zero bouncing',
      buttonShapeLabel: 'Softly rounded rectangle (8px)',
      voice: 'Unhurried, welcoming, rooted in place and sensory detail',
      sampleHeadline: 'Slow mornings under the live oaks — fresh roasts Thursday through Sunday.',
    },
    typography: {
      display: "'Fraunces', Georgia, serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
      displayLabel: 'Fraunces',
      bodyLabel: 'Inter',
      monoLabel: 'JetBrains Mono',
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap',
      displayScale: 'clamp(2.1rem, 4.4vw, 3.35rem)',
      tracking: '-0.02em',
      pairingRationale: 'Soft serif headings bring hospitality warmth while Inter keeps hours and pricing crystal clear.',
    },
    palette: {
      bg: '#F4EFE6',
      surface: '#FCF9F3',
      ink: '#1C241E',
      muted: '#525C54',
      accent: '#1E5B3A',
      accentInk: '#FFFFFF',
      border: '#D6CEBF',
      focalSurface: '#EAE3D3',
    },
    geometry: {
      radius: '8px',
      hairlineWidth: '1px',
      navStyle: 'Single-row hairline header with town stamp & single reservation button',
      heroStyle: 'Full-width headline above a wide 16:9 scenic photo',
      offeringsComponent: 'Two-column tasting & menu cards paired with a hours/fact sheet',
      maxWidthPx: 1120,
    },
    motion: {
      entranceMs: 180,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      hoverRule: '1px border darkening on cards and subtle opacity shift on links (zero bouncy transforms)',
    },
    sameBusinessNote:
      'Gives Cypress Creek Coffee & Inn room to breathe: wide creek-side landscape first, roasting story in the middle, and relaxed tasting tables below.',
    domainExample: FINCA_MIRADOR_BASE_CONTENT,
  },
  {
    id: 'hearth-provisions',
    name: 'Neighborhood Counter & Bakery',
    shortName: 'Counter',
    archetype: 'menu-ledger',
    archetypeLabel: 'Top hours strip + 50/50 split hero + ruled price menu',
    summary: 'Warm cream linen, burnt terracotta accent, compact top fold showing today’s hours immediately, and a scannable counter price table.',
    bestFor: 'Bakeries, taco shops, neighborhood cafés, butchers, wine shops, and farm stands.',
    avoidFor: 'Long architecture portfolios that need full-screen photo essays.',
    brandDialect: 'Warm Terracotta Linen',
    personality: {
      heroVariant: 'split-counter',
      imageTreatment: '50/50 side-by-side 4:3 product photo right beside today’s hours and CTA',
      motionProfile: 'Brisk 150ms tactile settle with ruled table hover highlight',
      buttonShapeLabel: 'Crisp counter button (6px)',
      voice: 'Direct, neighborly, proud of daily batch times and honest prices',
      sampleHeadline: 'First sourdough out at 7:00 am sharp. Call ahead to hold a loaf.',
    },
    typography: {
      display: "'Lora', Georgia, serif",
      body: "'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
      displayLabel: 'Lora',
      bodyLabel: 'Work Sans',
      monoLabel: 'JetBrains Mono',
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Lora:wght@500;700&family=Work+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap',
      displayScale: 'clamp(1.95rem, 3.8vw, 2.9rem)',
      tracking: '-0.015em',
      pairingRationale: 'Lora brings bakery-chalkboard warmth while Work Sans keeps itemized weights and prices effortless to scan.',
    },
    palette: {
      bg: '#F7EFE4',
      surface: '#FFFBF5',
      ink: '#241812',
      muted: '#5F4B41',
      accent: '#9A3B1E',
      accentInk: '#FFFFFF',
      border: '#DFCFBC',
      focalSurface: '#EFE2D0',
    },
    geometry: {
      radius: '6px',
      hairlineWidth: '1px',
      navStyle: 'Warm top counter bar highlighting today’s open hours',
      heroStyle: 'Side-by-side split: today’s menu CTA on the left, 4:3 bread photo on the right',
      offeringsComponent: 'Dotted-rule native menu table followed by bake schedule list',
      maxWidthPx: 1060,
    },
    sameBusinessNote:
      'Turns Cypress Creek Coffee & Inn into a tight counter-first café menu—putting espresso prices, breakfast hours, and bean weights right at the top.',
    domainExample: {
      slug: 'hearth-and-rye-bakery',
      businessName: 'Hearth & Rye Bakery',
      tagline: 'Naturally Leavened Sourdough, Heritage Grains & Morning Pastry · Madison, WI',
      cityState: 'Madison, WI',
      phone: '(608) 555-0183',
      email: 'hello@hearthandrye.example',
      address: '614 Williamson St, Madison, WI 53703',
      hours: 'Wed–Sun 7:00 AM – 2:30 PM (or until loaves sell out)',
      ctaLabel: 'Reserve Saturday Loaves',
      ctaHref: '#contact',
      secondaryCtaLabel: 'Call Counter',
      secondaryCtaHref: 'tel:+16085550183',
      heroImageUrl: '/themes/assets/sourdough-bread.webp',
      heroImageAlt: 'Scored golden-crust country sourdough loaves fresh from the hearth oven',
      storyHeading: 'Fresh Stone-Milled Flour, Forty-Hour Cold Ferment',
      storyParagraphs: [
        'We mill organic midwestern red wheat each Tuesday so the natural germ oils still smell sweet when the dough meets our steam deck oven at dawn.',
        'Every country boule and seeded rye loaf ferments cold for forty hours before baking on hearth bricks, giving a crisp blistered crust and moist honeycomb crumb.',
      ],
      offeringsTitle: 'Today’s Bake Menu',
      offerings: [
        { name: 'Country Heritage Sourdough Boule (2 lb)', detail: '70% bread flour, 30% freshly milled whole-grain red wheat, sea salt.', priceOrSpec: '$8.00 / loaf', badge: '7:00 AM Out' },
        { name: 'Roasted Sesame & Honey Whole-Wheat Batard', detail: 'Toasted white and black sesame fold-ins; ideal for table slicing.', priceOrSpec: '$8.50 / loaf', badge: '8:30 AM Out' },
        { name: 'Cardamom Brown-Butter Morning Buns', detail: 'Laminated brioche dough knotted with freshly cracked green cardamom.', priceOrSpec: '$4.25 / bun', badge: 'Warm Batch' },
        { name: 'Weekend Family Loaf Standing Order', detail: 'Guaranteed two loaves held every Saturday until 1:30 PM without waiting in line.', priceOrSpec: '$60 / month', badge: 'Pre-Paid' },
      ],
      scheduleOrSpecsTitle: 'Oven Schedule & Counter Rules',
      scheduleOrSpecs: [
        { label: 'First Oven Pull', value: '7:00 AM sharp', note: 'Country boules & brioche buns' },
        { label: 'Baguette & Focaccia Bake', value: '10:30 AM', note: 'Limited 36-loaf midday run' },
        { label: 'Pre-Order Cutoff', value: '5:00 PM day prior', note: 'Hold until 1:30 PM next day' },
        { label: 'Wholesale Accounts', value: 'Local bistros & coffee bars', note: 'Minimum 12 loaves/week' },
      ],
      galleryImages: [
        { url: '/themes/assets/sourdough-bread.webp', caption: 'Golden blistered crust on our forty-hour country sourdough', alt: 'Country sourdough loaf with deep golden crust' },
        { url: '/themes/assets/coffee-roaster.webp', caption: 'Partner micro-roaster pulling morning batch espresso alongside fresh pastry', alt: 'Small-batch drum coffee roaster in warm workshop light' },
        { url: '/themes/assets/courtyard-arches.webp', caption: 'Shaded morning garden tables behind the bakehouse', alt: 'Shaded green garden terrace seating area' },
      ],
      notesOrFaq: [
        { question: 'Do you keep extra loaves after 11:00 AM?', answer: 'Loaves often sell out by noon on weekends. Submitting a reserve message before 5:00 PM Friday locks in your Saturday pickup behind the counter.' },
        { question: 'How should I store an uncut sourdough loaf?', answer: 'Keep cut-side down on a wooden board for two days or freeze wrapped in butcher paper; slice while cold and toast directly for bakery crust.' },
      ],
      themeId: 'hearth-provisions',
    },
  },
  {
    id: 'field-dispatch',
    name: 'Home Service & Dispatch',
    shortName: 'Service',
    archetype: 'dispatch-split',
    archetypeLabel: 'Emergency phone strip + 3-step promise + upfront price list',
    summary: 'Clean slate daylight, bold electric cobalt accent, click-to-call phone number first, and transparent flat rates.',
    bestFor: 'Plumbers, electricians, HVAC, roofers, appliance repair, mechanics, and emergency locksmiths.',
    avoidFor: 'Slow luxury retreats or high-art brand essays.',
    brandDialect: 'Crisp Utility Slate',
    personality: {
      heroVariant: 'urgent-callout',
      imageTreatment: 'Top dispatch phone bar + split work photo paired directly beside primary CTA',
      motionProfile: 'Instant zero-delay response for stressed mobile visitors',
      buttonShapeLabel: 'Crisp utility rectangle (4px)',
      voice: 'No-nonsense, reassuring, phone number and flat pricing upfront',
      sampleHeadline: 'A pipe burst or water heater out? Call (512) 555-0194 — van on site under 90 min.',
    },
    typography: {
      display: "'Public Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      body: "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
      displayLabel: 'Public Sans',
      bodyLabel: 'Roboto',
      monoLabel: 'JetBrains Mono',
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Public+Sans:wght@600;700;800&family=Roboto:wght@400;500;700&display=swap',
      displayScale: 'clamp(1.9rem, 3.6vw, 2.75rem)',
      tracking: '-0.025em',
      pairingRationale: 'Public Sans + Roboto deliver municipal sign-level legibility in bright sun on a homeowner’s cracked phone screen.',
    },
    palette: {
      bg: '#F5F8FC',
      surface: '#FFFFFF',
      ink: '#0F1E36',
      muted: '#475569',
      accent: '#1D4ED8',
      accentInk: '#FFFFFF',
      border: '#CBD5E1',
      focalSurface: '#FFF1E6',
    },
    geometry: {
      radius: '4px',
      hairlineWidth: '1px',
      navStyle: 'Direct utility strip displaying click-to-call dispatch phone number and hours',
      heroStyle: 'Split header with Call Dispatch CTA paired next to clean jobsite photo',
      offeringsComponent: 'Numbered 3-step promise cards + upfront flat-rate price table',
      maxWidthPx: 1100,
    },
    sameBusinessNote:
      'Reframes Cypress Creek Coffee & Inn around wholesale office delivery and group event catering—putting phone number, pickup window, and unit prices first.',
    domainExample: {
      slug: 'barton-creek-plumbing',
      businessName: 'Barton Creek Plumbing & HVAC',
      tagline: 'Licensed Master Plumbers · Same-Day Copper Repiping, Water Heaters & Leak Dispatch',
      cityState: 'Austin & Central TX',
      phone: '(512) 555-0194',
      email: 'dispatch@bartoncreekplumbing.example',
      address: '2140 S Congress Ave, Bay 4, Austin, TX 78704',
      hours: 'Mon–Sat 7:00 AM – 7:00 PM · 24/7 Burst Pipe Emergency Line',
      ctaLabel: 'Request Dispatch Now',
      ctaHref: '#contact',
      secondaryCtaLabel: 'Call Dispatch Live',
      secondaryCtaHref: 'tel:+15125550194',
      heroImageUrl: '/themes/assets/copper-pipes.webp',
      heroImageAlt: 'Cleanly soldered copper hydronic supply lines with fiberglass insulation sleeves',
      storyHeading: 'Upfront Flat-Rate Pricing Before We Turn a Wrench',
      storyParagraphs: [
        'Homeowners call us because nobody wants a mystery hourly meter running while a truck drives across town for fittings. Our vans carry ProPress copper, brass isolation valves, and tankless service kits so 90% of repairs finish in one visit.',
        'Every technician is background-checked, licensed under Texas State Board of Plumbing Examiners rules, and leaves you with pressure-test readings and a written five-year workmanship guarantee.',
      ],
      offeringsTitle: 'Upfront Flat-Rate Service Schedule',
      offerings: [
        { name: 'On-Site Diagnostic & Thermal Leak Trace', detail: 'Includes hydrostatic pressure gauge test and itemized written quote before repair begins (waived with repair).', priceOrSpec: '$89 flat', badge: 'Same-Day' },
        { name: 'Tankless Water Heater Descale & Annual Flush', detail: 'Food-grade descaling circulation, inlet screen cleaning, and anode/combustion inspection.', priceOrSpec: '$185 flat', badge: '90 Min Visit' },
        { name: 'Whole-Home Type-L Copper PRV & Main Shutoff Upgrade', detail: 'Replace failing gate valve with full-port ball valve and brass pressure regulator.', priceOrSpec: '$540 complete', badge: '5-Yr Warranty' },
        { name: 'Sewer Camera Video Inspection + Locator Map', detail: '150 ft push camera with recorded MP4 link and surface paint flags if line repair is needed.', priceOrSpec: '$225 flat', badge: 'Video Included' },
      ],
      scheduleOrSpecsTitle: 'Dispatch Window & Licensing',
      scheduleOrSpecs: [
        { label: 'Texas Master License', value: 'M-44108 (Insured $2M GL)', note: 'Verified upon request' },
        { label: 'Average Arrival', value: 'Under 90 minutes', note: 'Travis & Williamson counties' },
        { label: 'Diagnostic Policy', value: 'Waived when repair proceeds', note: 'Written quote upfront' },
        { label: 'Emergency Surge', value: '$0 after-hours surcharges', note: 'Mon–Sat until 9:00 PM' },
      ],
      galleryImages: [
        { url: '/themes/assets/copper-pipes.webp', caption: 'Insulated Type-L copper manifold soldered cleanly with labeled shutoffs', alt: 'Insulated copper pipes arranged neatly along utility wall' },
        { url: '/themes/assets/joinery-chisels.webp', caption: 'Clean finish carpentry access panels restored after in-wall piping', alt: 'Precision hand chisels and layout gauges on timber' },
        { url: '/themes/assets/timber-architecture.webp', caption: 'Custom home hydronic rough-in coordination with structural framing', alt: 'Exposed heavy timber framing structure' },
      ],
      notesOrFaq: [
        { question: 'Do you charge a call-out fee just to give me an estimate?', answer: 'Minor straightforward replacements have phone ballpark quotes. For hidden leaks or diagnostic troubleshooting, we charge $89 upfront and credit 100% of it toward any approved repair on the same visit.' },
        { question: 'Should I switch from my gas tank heater to tankless?', answer: 'We inspect your existing gas line BTU capacity first—never overselling a tankless conversion if your gas meter or venting path would double the installation cost.' },
      ],
      themeId: 'field-dispatch',
    },
  },
  {
    id: 'clinical-sanctuary',
    name: 'Calm Clinic & Care',
    shortName: 'Clinic',
    archetype: 'intake-guide',
    archetypeLabel: 'Quiet centered column + new-patient notice + FAQ accordion',
    summary: 'Soft eucalyptus-sage accents on unbleached linen, unhurried reading width, clear insurance/first-visit steps, and soothing typography.',
    bestFor: 'Therapists, independent family doctors, physical therapists, midwives, nutritionists, and wellness clinics.',
    avoidFor: 'Bargain-hunter retail catalogs or aggressive urgency sales.',
    brandDialect: 'Botanical Sage & Quiet Rag Paper',
    personality: {
      heroVariant: 'calm-letter',
      imageTreatment: 'Centered quiet portrait column above a soft intake callout and framed greenery',
      motionProfile: 'Whisper-gentle 200ms fade with zero abrupt layout shifts',
      buttonShapeLabel: 'Soft welcoming rectangle (12px)',
      voice: 'Gentle, reassuring, honest about openings and first-visit privacy',
      sampleHeadline: 'Accepting new morning appointments — start with a free 15-minute phone call.',
    },
    typography: {
      display: "'Newsreader', Georgia, serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
      displayLabel: 'Newsreader',
      bodyLabel: 'Inter',
      monoLabel: 'JetBrains Mono',
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Newsreader:opsz,wght@6..72,400;6..72,600&display=swap',
      displayScale: 'clamp(1.95rem, 3.6vw, 2.85rem)',
      tracking: '-0.015em',
      pairingRationale: 'Newsreader softens clinical authority into human warmth, paired with generous 1.7 line height for anxious readers.',
    },
    palette: {
      bg: '#F5FAF9',
      surface: '#FFFFFF',
      ink: '#13302C',
      muted: '#4A5F5B',
      accent: '#0F766E',
      accentInk: '#FFFFFF',
      border: '#CFE2DE',
      focalSurface: '#E3F1EE',
    },
    geometry: {
      radius: '12px',
      hairlineWidth: '1px',
      navStyle: 'Unhurried minimal bar with quiet direct intake link',
      heroStyle: 'Centered quiet letter layout with highlighted New-Patient Status notice',
      offeringsComponent: 'Gentle 2-column care pathway rows + native <details> FAQ drawer',
      maxWidthPx: 980,
    },
    sameBusinessNote:
      'Slows Cypress Creek Coffee & Inn down into a peaceful morning sanctuary—highlighting quiet porch hours, decaf options, and private group reservations.',
    domainExample: {
      slug: 'cedar-grove-counseling',
      businessName: 'Cedar Grove Counseling & Care',
      tagline: 'Independent Adult, Couples & Grief Psychotherapy · In-Person & Statewide Telehealth',
      cityState: 'Portland, OR',
      phone: '(503) 555-0162',
      email: 'intake@cedargrovecare.example',
      address: '1842 NW Flanders St, Suite 204, Portland, OR',
      hours: 'Tue–Fri 8:30 AM – 6:00 PM · Accepting New Patients',
      ctaLabel: 'Request Free 15-Min Intro Call',
      ctaHref: '#contact',
      secondaryCtaLabel: 'Call Office Line',
      secondaryCtaHref: 'tel:+15035550162',
      heroImageUrl: '/themes/assets/botanical-sanctuary.webp',
      heroImageAlt: 'Sunlit conservatory canopy filled with green ferns and calm natural daylight',
      storyHeading: 'Clear Care Without Insurance Maze Gatekeeping',
      storyParagraphs: [
        'Reaching out for help is often hardest when clinic websites hide whether anyone is actually taking patients. Our practice calendar stays current every Monday so you know right away if morning or late-afternoon openings exist.',
        'Sessions last a full 55 minutes in a sunlit upstairs room with zero lobby waiting-room overlap, or through a private encrypted telehealth room from home.',
      ],
      offeringsTitle: 'Areas of Care & Transparent Session Fees',
      offerings: [
        { name: 'Free 15-Minute Consultation Phone Call', detail: 'Talk directly with your clinician to ask questions and check fit before booking an intake.', priceOrSpec: '$0 · 15 min', badge: 'First Step' },
        { name: 'Individual Psychotherapy Session', detail: '55-minute clinical hour for anxiety, burnout, caregiver fatigue, and life transitions.', priceOrSpec: '$165 / session', badge: 'In-Person / Video' },
        { name: 'Couples & Family Communication Intensive', detail: '75-minute structured dialogue session focusing on repair, boundaries, and practical habits.', priceOrSpec: '$210 / session', badge: '75 Minutes' },
        { name: 'Sliding-Scale Community Slots', detail: 'Four weekly seats reserved at reduced rates with zero proof-of-income paperwork.', priceOrSpec: '$95 – $120', badge: 'Available Now' },
      ],
      scheduleOrSpecsTitle: 'Practice Credentials & Practical Details',
      scheduleOrSpecs: [
        { label: 'License', value: 'Oregon LCSW #L7842', note: '12 years clinical practice' },
        { label: 'Out-of-Network Superbills', value: 'Issued monthly automatically', note: 'For PPO reimbursement' },
        { label: 'Transit & Access', value: 'Ground elevator + bike lockup', note: 'Street parking on NW 19th' },
        { label: 'Response Time', value: 'Within 24 business hours', note: 'Confidential encrypted form' },
      ],
      galleryImages: [
        { url: '/themes/assets/botanical-sanctuary.webp', caption: 'Calm daylight-filled conservatory walk nearby before and after sessions', alt: 'Sunlit green indoor botanical conservatory walkways' },
        { url: '/themes/assets/law-library.webp', caption: 'Quiet reading study stocked with grief and somatic practice texts', alt: 'Sunlit study shelves lined with reference books' },
        { url: '/themes/assets/chapel-interior.webp', caption: 'Neighborhood stone courtyard steps from the office for quiet walks', alt: 'Quiet stone sanctuary interior bathed in natural window light' },
      ],
      notesOrFaq: [
        { question: 'Do I have to share sensitive medical details in this website form?', answer: 'No. Please include only your first name, best callback window, and whether you prefer Tuesday morning or afternoon. We handle clinical history live on the phone.' },
        { question: 'Will my employer HSA/FSA card work for session fees?', answer: 'Yes. All psychotherapy sessions qualify directly for HSA and FSA reimbursement without a prior referral.' },
      ],
      themeId: 'clinical-sanctuary',
    },
  },
  {
    id: 'fiduciary-chambers',
    name: 'Law, Tax & Advisory',
    shortName: 'Advisory',
    archetype: 'chambers-dossier',
    archetypeLabel: 'Top accent stripe + ruled summary brief + transparent fee table',
    summary: 'Crisp cotton paper, oxford navy authority with a 4px top bar, left-ruled brief, and transparent fixed engagement fees.',
    bestFor: 'Law firms, independent CPAs, estate planners, wealth fiduciaries, mediators, and appraisal specialists.',
    avoidFor: 'Playful food counters or casual drop-in cafes.',
    brandDialect: 'Institutional Navy & Archival Vellum',
    personality: {
      heroVariant: 'ruled-dossier',
      imageTreatment: '4px navy header rule + left-ruled advisory brief + 3-box admissions strip beside interior plate',
      motionProfile: 'Measured 150ms crisp border highlight without distraction',
      buttonShapeLabel: 'Tailored legal hairline corner (2px)',
      voice: 'Clear, authoritative, plain-English fixed fees upfront',
      sampleHeadline: 'Published flat engagement fees — drafted directly by a senior partner.',
    },
    typography: {
      display: "'EB Garamond', Georgia, serif",
      body: "'Source Serif 4', Georgia, serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
      displayLabel: 'EB Garamond',
      bodyLabel: 'Source Serif 4',
      monoLabel: 'JetBrains Mono',
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500;700&family=JetBrains+Mono:wght@400;500&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap',
      displayScale: 'clamp(2.15rem, 4vw, 3.2rem)',
      tracking: '-0.01em',
      pairingRationale: 'Double serif hierarchy (EB Garamond + Source Serif 4) reads like bound appellate briefs with impeccable numeral alignment.',
    },
    palette: {
      bg: '#FFFFFF',
      surface: '#F7F8FA',
      ink: '#0F1B2D',
      muted: '#4A5568',
      accent: '#1E3A8A',
      accentInk: '#FFFFFF',
      border: '#D5DAE3',
      focalSurface: '#EEF2F8',
    },
    geometry: {
      radius: '2px',
      hairlineWidth: '1px',
      navStyle: '4px navy crown border with Bar/CPA admissions line & office address',
      heroStyle: 'Left-ruled advisory brief + 3-column admissions bar beside classic wood-paneled study photo',
      offeringsComponent: 'Roman-numeral practice scope rows + transparent fixed-fee retainer table',
      maxWidthPx: 1040,
    },
    sameBusinessNote:
      'Turns Cypress Creek Coffee & Inn into a clean wholesale partner prospectus—ideal for restaurants and offices reviewing bulk terms and tasting agreements.',
    domainExample: {
      slug: 'alder-hale-fiduciary',
      businessName: 'Alder & Hale Fiduciary Law',
      tagline: 'Wills, Family Trusts, Probate Administration & Closely Held Business Succession',
      cityState: 'Santa Fe, NM',
      phone: '(505) 555-0137',
      email: 'chambers@alderhalelaw.example',
      address: '320 Paseo de Peralta, Suite 1B, Santa Fe, NM',
      hours: 'Mon–Fri 8:30 AM – 5:00 PM · Office Consultations by Appointment',
      ctaLabel: 'Schedule Office Consultation',
      ctaHref: '#contact',
      secondaryCtaLabel: 'Telephone Office',
      secondaryCtaHref: 'tel:+15055550137',
      heroImageUrl: '/themes/assets/law-library.webp',
      heroImageAlt: 'Floor-to-ceiling timber bookshelves inside an independent legal library',
      storyHeading: 'Plain-English Estate Architecture, Fixed-Fee Certainty',
      storyParagraphs: [
        'Families put off estate planning not because they dislike order, but because traditional billable-hour retainers hide what a simple deed or revocable trust will actually cost. Our chambers publish flat engagement fees in advance.',
        'Every document set is drafted personally by a licensed senior partner—never outsourced to generic form software—and reviewed with you line by line before execution.',
      ],
      offeringsTitle: 'Published Practice Scope & Engagement Fees',
      offerings: [
        { name: 'I. Essential Will, Power of Attorney & Healthcare Directive', detail: 'Individual statutory package including notarized witness execution in chambers.', priceOrSpec: '$1,250 fixed fee', badge: 'Individual' },
        { name: 'II. Revocable Living Trust & Real Property Funding Package', detail: 'Complete trust instrument, pour-over wills, and up to two New Mexico quitclaim/transfer-on-death deeds.', priceOrSpec: '$3,400 fixed fee', badge: 'Most Requested' },
        { name: 'III. Small-Business Buy-Sell & Operating Agreement Audit', detail: 'Line-by-line succession review for LLCs, family ranches, and medical partnerships.', priceOrSpec: '$1,850 fixed fee', badge: 'Commercial' },
        { name: 'IV. Independent Estate Probate Administration', detail: 'Court filings, creditor notices, inventory accounting, and fiduciary distribution oversight.', priceOrSpec: '$325 / hr (capped)', badge: 'Transparent Ledger' },
      ],
      scheduleOrSpecsTitle: 'Chambers Admissions & Standards',
      scheduleOrSpecs: [
        { label: 'Bar Admissions', value: 'New Mexico (#14902) · Colorado (#48811)', note: 'In good standing since 2011' },
        { label: 'Standard Draft Turnaround', value: '10 business days from intake', note: 'Redlines included' },
        { label: 'Document Custody', value: 'Original signed binders + encrypted PDF archive', note: 'Zero cloud lock-in' },
        { label: 'Initial Briefing', value: '45 minutes · $150 (credited to engagement)', note: 'Zoom or Santa Fe chambers' },
      ],
      galleryImages: [
        { url: '/themes/assets/law-library.webp', caption: 'Chambers reference library on Paseo de Peralta', alt: 'Law library bookshelves and wooden reading tables' },
        { url: '/themes/assets/courtyard-arches.webp', caption: 'Quiet shaded courtyard adjacent to chambers', alt: 'Arched stucco veranda overlooking quiet garden' },
        { url: '/themes/assets/chapel-interior.webp', caption: 'Historic stone vaulted architecture neighboring our chambers', alt: 'Historic stone vaulted interior' },
      ],
      notesOrFaq: [
        { question: 'Why should a married couple with a house consider a Trust over a Will alone?', answer: 'A Will still passes through district probate court, freezing bank accounts and home transfers for four to nine months; a properly funded Revocable Trust passes title seamlessly.' },
        { question: 'What happens to my records if I move out of state later?', answer: 'You receive bound originals plus plain digital copies of every deed and trust schedule—no subscription portal fees required to retrieve your own paperwork.' },
      ],
      themeId: 'fiduciary-chambers',
    },
  },
  {
    id: 'maker-catalog',
    name: 'Craft Shop & Maker Catalog',
    shortName: 'Craft',
    archetype: 'plate-catalog',
    archetypeLabel: 'Photo-first split + gallery before text + build spec sheet',
    summary: 'Gallery alabaster ground, indigo violet accent, work photos placed right at the top, and exact material measurements.',
    bestFor: 'Custom furniture makers, ceramicists, metalworkers, luthiers, bespoke signage shops, and specialty retail.',
    avoidFor: 'Urgent 24/7 emergency plumbing or dense text newsletters.',
    brandDialect: 'Gallery Stone + Burnt Iron',
    personality: {
      heroVariant: 'specimen-first',
      imageTreatment: 'Reversed hero split (4:3 photo on left, lead copy on right) + 3-plate gallery directly beneath hero',
      motionProfile: 'Crisp 140ms workbench hover with hairline border snap',
      buttonShapeLabel: 'Clean squared gallery edge (3px)',
      voice: 'Pride in materials, clear lead times, zero mystery around build specs',
      sampleHeadline: 'Solid kiln-dried white oak — built to order in 5 to 8 weeks.',
    },
    typography: {
      display: "'Bricolage Grotesque', 'Inter', sans-serif",
      body: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
      displayLabel: 'Bricolage Grotesque',
      bodyLabel: 'IBM Plex Sans',
      monoLabel: 'JetBrains Mono',
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap',
      displayScale: 'clamp(2.1rem, 4.2vw, 3.3rem)',
      tracking: '-0.03em',
      pairingRationale: 'Bricolage Grotesque gives craft personality without kitsch, while IBM Plex Sans + Mono align dimensions cleanly.',
    },
    palette: {
      bg: '#F7F6F3',
      surface: '#FFFFFF',
      ink: '#18181B',
      muted: '#52525B',
      accent: '#6D28D9',
      accentInk: '#FFFFFF',
      border: '#D9D6E3',
      focalSurface: '#EEEAF8',
    },
    geometry: {
      radius: '3px',
      hairlineWidth: '1px',
      navStyle: 'Workshop spec bar displaying location & current build lead time',
      heroStyle: 'Image-first 50/50 split putting bench craftsmanship on the left above the gallery row',
      offeringsComponent: 'Plate-numbered catalog table with dimensions, materials & lead times',
      maxWidthPx: 1140,
    },
    sameBusinessNote:
      'Showcases Cypress Creek Coffee & Inn lots as numbered tasting plates with roast weight, process, origin farm, and tasting notes in tabular columns.',
    domainExample: {
      slug: 'redwood-iron-joinery',
      businessName: 'Redwood & Iron Woodworks',
      tagline: 'Solid Hardwood Tables, Architectural Shelving & Hand-Cut Joinery · Eugene, OR',
      cityState: 'Eugene, OR',
      phone: '(541) 555-0171',
      email: 'bench@redwoodiron.example',
      address: '908 Mill St, Shop 2, Eugene, OR 97401',
      hours: 'Thu–Sat 10:00 AM – 5:00 PM · Shop Floor Open by Appointment',
      ctaLabel: 'Request Build Sheet & Quote',
      ctaHref: '#contact',
      secondaryCtaLabel: 'Call the Woodshop',
      secondaryCtaHref: 'tel:+15415550171',
      heroImageUrl: '/themes/assets/joinery-chisels.webp',
      heroImageAlt: 'Precision beveled-edge woodworking chisels, angle gauges, and layout pencil on benchtop',
      storyHeading: 'Kiln-Dried Timber, Drawbored Tenons, Zero Veneer',
      storyParagraphs: [
        'We build worktables and domestic cabinetry from air-dried white oak, black walnut, and salvaged cypress planks milled thick enough to plane flat ten decades from now.',
        'Rather than hiding particleboard behind thin tape or pocket screws, every joint uses wedged through-tenons and brass hardware fastened into solid hardwood rails.',
      ],
      offeringsTitle: 'Standard Workshop Editions & Lead Times',
      offerings: [
        { name: 'Plate 01 · Trestle Dining Table (84" × 38" × 30")', detail: '8/4 solid Appalachian white oak, hand-chamfered underside, raw tung oil finish.', priceOrSpec: '$3,650 · 7 wks', badge: 'Custom Size' },
        { name: 'Plate 02 · Record & Amplifier Credenza (66" × 19" × 28")', detail: 'Sliding woven-cane & brass-track doors, ventilated amp bay, walnut legs.', priceOrSpec: '$2,950 · 6 wks', badge: 'Bench Favorite' },
        { name: 'Plate 03 · Architectural Wall Bookshelf System', detail: 'Modular solid maple uprights with notched bridle joints; scribed to plaster walls.', priceOrSpec: '$240 / linear ft', badge: 'Site Fitted' },
        { name: 'Plate 04 · Live-Edge Flitch Slab Pairing Consultation', detail: 'Measure room clearances, inspect raw lumber stacks in Mill Shed 2, receive scaled elevation drawing.', priceOrSpec: '$150 (credited)', badge: 'Shop Visit' },
      ],
      scheduleOrSpecsTitle: 'Timber Inventory & Shop Specifications',
      scheduleOrSpecs: [
        { label: 'Moisture Content Target', value: '6.5% – 7.8% MC', note: 'Checked at rough-mill and glue-up' },
        { label: 'Finish Chemistry', value: 'Zero-VOC Pure Tung Oil + Beeswax', note: 'Field-repairable with 0000 wool' },
        { label: 'Current Lead Time', value: '5 to 8 weeks', note: 'Weekly bench progress photos' },
        { label: 'Freight & Install', value: 'Blanket-wrapped white glove', note: 'Regional & nationwide crating' },
      ],
      galleryImages: [
        { url: '/themes/assets/joinery-chisels.webp', caption: 'Plate 01 · Precision bench chisels prepared for dovetail layout', alt: 'Beveled woodworking chisels and gauges on timber bench' },
        { url: '/themes/assets/timber-architecture.webp', caption: 'Plate 02 · Structural mortise-and-tenon post frame collaboration', alt: 'Exposed heavy timber frame joinery structure' },
        { url: '/themes/assets/coffee-roaster.webp', caption: 'Plate 03 · Custom copper and cast-iron hopper hood fabricated in shop', alt: 'Custom fabricated metal and wood workshop roaster assembly' },
      ],
      notesOrFaq: [
        { question: 'Can I bring my own heirloom family slab to be milled and joined?', answer: 'Yes, provided the slab is dry below 10% moisture and scanned free of nails. We flatten on our router sled and fabricate custom steel or timber bases.' },
        { question: 'How do oil finishes hold up to daily coffee mugs and dinner spills?', answer: 'Pure cured tung oil repels red wine and espresso for hours when wiped cleanly, and unlike polyurethane plastic film, a water ring sands out in two minutes with zero stripping.' },
      ],
      themeId: 'maker-catalog',
    },
  },
  {
    id: 'case-study-studio',
    name: 'Architecture & Project Studio',
    shortName: 'Studio',
    archetype: 'studio-casegrid',
    archetypeLabel: 'Dark title bar + framed hero dossier + numbered project list',
    summary: 'Drafting-table light stone paired with an inverted dark top bar, framed project dossier block, and oversize numbered rows.',
    bestFor: 'Architects, civil/structural engineers, landscape designers, product studios, and custom builders.',
    avoidFor: 'Casual walk-in bakeries or community bulletin boards.',
    brandDialect: 'Architect Limestone + Signal Charcoal',
    personality: {
      heroVariant: 'architectural-band',
      imageTreatment: 'Inverted dark header bar + framed 4px left-accent hero dossier alongside crisp 0px square-edge villa photo',
      motionProfile: 'Zero fluff: sharp instant border highlight (0px radius)',
      buttonShapeLabel: 'Sharp 90-degree drafting square (0px)',
      voice: 'Technical, disciplined, organized around phases 01 to 04',
      sampleHeadline: 'Buildings tuned to daylight, wind, and honest Pacific Northwest timber.',
    },
    typography: {
      display: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
      displayLabel: 'IBM Plex Sans',
      bodyLabel: 'Inter',
      monoLabel: 'JetBrains Mono',
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap',
      displayScale: 'clamp(2.1rem, 4.1vw, 3.15rem)',
      tracking: '-0.03em',
      pairingRationale: 'Architectural IBM Plex weight contrast pairs effortlessly with monospace project square-footage and year tags.',
    },
    palette: {
      bg: '#FAFAFA',
      surface: '#FFFFFF',
      ink: '#0A0A0A',
      muted: '#525252',
      accent: '#BE185D',
      accentInk: '#FFFFFF',
      border: '#D4D4D4',
      focalSurface: '#0A0A0A',
    },
    geometry: {
      radius: '0px',
      hairlineWidth: '1px',
      navStyle: 'Full-width dark studio title bar with discipline code & studio year',
      heroStyle: 'Left-accented framed studio brief sitting beside sharp square-edge villa photo',
      offeringsComponent: 'Numbered Case Study Rows (01 / 02 / 03 / 04) + engineering credentials',
      maxWidthPx: 1160,
    },
    sameBusinessNote:
      'Presents Cypress Creek Coffee & Inn like an architectural site brief: roastery floor plan numbers, batch capacity, and tasting bar seating.',
    domainExample: {
      slug: 'cascade-timber-studio',
      businessName: 'Cascade Architecture & Timber',
      tagline: 'Adaptive Timber Structures, Passive Solar Houses & Civic Pavilions · Pacific Northwest',
      cityState: 'Bellingham, WA',
      phone: '(360) 555-0155',
      email: 'studio@cascadetimber.example',
      address: '114 Holly St, Loft 3A, Bellingham, WA',
      hours: 'Mon–Fri 9:00 AM – 5:30 PM · Site Walks Scheduled Weekly',
      ctaLabel: 'Book Site Feasibility Walk',
      ctaHref: '#contact',
      secondaryCtaLabel: 'Call Studio Desk',
      secondaryCtaHref: 'tel:+13605550155',
      heroImageUrl: '/themes/assets/timber-architecture.webp',
      heroImageAlt: 'Exposed engineered timber villa featuring deep overhanging solar eaves',
      storyHeading: 'Buildings Tuned to Daylight, Wind and Regional Mass Timber',
      storyParagraphs: [
        'Good small-scale architecture prevents wasted mechanical heating and leaky flat roofs before ground is ever broken. Every commission begins with a topographic solar walk and structural span study tailored to local builders.',
        'We handle feasibility permitting, structural timber detailing, contractor bidding clarity, and bi-weekly construction observation so budgets hold through framing.',
      ],
      offeringsTitle: 'Selected Built Studies & Scope Structure',
      offerings: [
        { name: '01 · Pre-Design Site & Zoning Feasibility Brief', detail: 'Setback study, solar path diagram, septic/utility map, and realistic cost-per-square-foot range.', priceOrSpec: '$3,200 · 3 wks', badge: 'Phase 01' },
        { name: '02 · Custom Passive Residence (1,800 – 3,200 sq ft)', detail: 'Complete architectural & Douglas fir joinery package ready for permit review and competitive bids.', priceOrSpec: '11% const. cost', badge: 'AIA Scope' },
        { name: '03 · ADU & Backyard Courtyard Studio', detail: 'Pre-detailed acoustic timber framing kit engineered for narrow urban alleys.', priceOrSpec: '$14,500 Permit Set', badge: 'Rapid Permit' },
        { name: '04 · Historic Masonry & Mill Structural Retrofit', detail: 'Seismic shear integration, daylight clerestories, and mechanical acoustic isolation.', priceOrSpec: 'Fixed Phase Fee', badge: 'Adaptive Reuse' },
      ],
      scheduleOrSpecsTitle: 'Studio Credentials & Engineering Bench',
      scheduleOrSpecs: [
        { label: 'NCARB / AIA Registration', value: 'WA #AR-99210 · OR #AR-18402', note: 'Direct principal oversight' },
        { label: 'Thermal Target', value: '0.6 ACH50 Airtight Envelope', note: 'Passive House informed' },
        { label: 'CAD / BIM Handoff', value: 'Open IFC + Print-Ready 24×36 PDFs', note: 'Owner retains full drawings' },
        { label: 'Construction Admin', value: 'Included bi-weekly site logs', note: 'Whatcom, Skagit & King Co.' },
      ],
      galleryImages: [
        { url: '/themes/assets/timber-architecture.webp', caption: 'Project 01 · South-facing deep-eave timber villa', alt: 'Timber-framed villa with exposed wooden beams and steep roof' },
        { url: '/themes/assets/courtyard-arches.webp', caption: 'Project 02 · Masonry arcaded courtyard passive cooling study', alt: 'Arched shaded courtyard veranda' },
        { url: '/themes/assets/joinery-chisels.webp', caption: 'Project 03 · Full-scale timber joinery mockups built before frame raise', alt: 'Precision joinery layout gauges and chisels' },
      ],
      notesOrFaq: [
        { question: 'Should we involve an architect before hiring a general contractor?', answer: 'Yes—even a 3-week Feasibility Brief saves 10× its fee by letting three qualified contractors bid apples-to-apples from the same structural drawing set.' },
        { question: 'Do you take projects outside Bellingham?', answer: 'We design across western Washington and Oregon and pair remote commissions with experienced local general contractors.' },
      ],
      themeId: 'case-study-studio',
    },
  },
  {
    id: 'civic-almanac',
    name: 'Community & Parish Bulletin',
    shortName: 'Bulletin',
    archetype: 'parish-broadsheet',
    archetypeLabel: 'Double-ruled newspaper header + 3-column weekly calendar',
    summary: 'Classic double-rule broadsheet edition style, heritage burgundy accent, multi-column calendar notices, and timeless grace.',
    bestFor: 'Churches, neighborhood associations, museums, historical societies, libraries, independent schools, and local festivals.',
    avoidFor: 'High-speed SaaS landing pages or flash sales.',
    brandDialect: 'Parish Burgundy & Broadsheet Rag',
    personality: {
      heroVariant: 'broadsheet-lead',
      imageTreatment: 'Newspaper edition banner + front-page story split + 3-column hairline almanac',
      motionProfile: 'Still print stillness — zero sliding tickers, instant disclosure toggles',
      buttonShapeLabel: 'Muted editorial plate rectangle (3px)',
      voice: 'Generous, civic-minded, welcoming to all neighbors in print clarity',
      sampleHeadline: 'An open limestone hall since 1894 — Sunday choral service at 10:00 AM.',
    },
    typography: {
      display: "'Literata', Georgia, serif",
      body: "'Source Serif 4', Georgia, serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
      displayLabel: 'Literata',
      bodyLabel: 'Source Serif 4',
      monoLabel: 'JetBrains Mono',
      googleFontsUrl:
        'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Literata:opsz,wght@7..72,500;7..72,700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap',
      displayScale: 'clamp(2.05rem, 4.1vw, 3.2rem)',
      tracking: '-0.015em',
      pairingRationale: 'Literata evokes crisp parish broadsheets while Source Serif keeps weekly parish schedules welcoming for elders.',
    },
    palette: {
      bg: '#F6F1EA',
      surface: '#FCF9F4',
      ink: '#1E1515',
      muted: '#594848',
      accent: '#7A1C1C',
      accentInk: '#FFFFFF',
      border: '#D5C9BD',
      focalSurface: '#EDE5DA',
    },
    geometry: {
      radius: '3px',
      hairlineWidth: '1px',
      navStyle: 'Double-hairline broadsheet flag showing edition town, open hours & telephone',
      heroStyle: 'Front-page dispatch lead paired beside stone sanctuary interior plate',
      offeringsComponent: '3-column desktop calendar grid collapsing cleanly to single stack on phone',
      maxWidthPx: 1120,
    },
    sameBusinessNote:
      'Turns Cypress Creek Coffee & Inn into a quarterly neighborhood almanac—publishing cupping dates, seasonal release calendars, and open acoustic nights.',
    domainExample: {
      slug: 'oak-park-chapel-commons',
      businessName: 'Oak Park Historic Chapel & Commons',
      tagline: 'Sunday Choral Matins, Food Pantry, Heritage Lecture Series & Open Bell Tower · Est. 1894',
      cityState: 'San Antonio, TX',
      phone: '(210) 555-0129',
      email: 'office@oakparkcommons.example',
      address: '418 King William Way, San Antonio, TX',
      hours: 'Sanctuary Open Daily 8:00 AM – 4:00 PM · Sunday Gathering 10:00 AM',
      ctaLabel: 'Send Parish Office Note',
      ctaHref: '#contact',
      secondaryCtaLabel: 'Call Parish Sexton',
      secondaryCtaHref: 'tel:+12105550129',
      heroImageUrl: '/themes/assets/chapel-interior.webp',
      heroImageAlt: 'High stone vaulted sanctuary interior bathed in warm tall arched window light',
      storyHeading: 'An Open Stone Porch Since 1894',
      storyParagraphs: [
        'For more than a century our carved limestone hall has opened early every weekday so neighbors, night-shift nurses, and walking students alike can sit for ten quiet minutes out of the Texas heat.',
        'Alongside Sunday morning liturgy and pipe-organ vespers, the parish annex runs a Thursday community produce pantry, neighborhood choral rehearsals, and bilingual citizenship tutoring.',
      ],
      offeringsTitle: 'This Week’s Parish Almanac & Regular Ministries',
      offerings: [
        { name: 'Sunday Choral Service & Courtyard Coffee Hour', detail: 'Traditional choir, scripture readings, and pecan coffee under the oaks right after.', priceOrSpec: 'Sundays 10:00 AM', badge: 'Open to All' },
        { name: 'Thursday Neighborhood Produce Co-Op', detail: 'Zero-registration fresh vegetables, staples, and bread packed with parish volunteers.', priceOrSpec: 'Thu 4:00 – 6:30 PM', badge: 'Annex Courtyard' },
        { name: 'First-Friday Candlelight Chamber Concert', detail: 'Local string quartet and sanctuary acoustics; suggested door donation supports roof upkeep.', priceOrSpec: '7:30 PM · Free Entry', badge: 'Monthly' },
        { name: 'Heritage Hall Community Rentals', detail: 'Historic oak-beamed parish hall available for neighborhood meetings, lectures, and family recitals.', priceOrSpec: '$85 / hr sliding', badge: 'Bookings' },
      ],
      scheduleOrSpecsTitle: 'Weekly Doors, Bells & Contacts',
      scheduleOrSpecs: [
        { label: 'Quiet Sanctuary Hours', value: 'Mon–Sat · 8:00 AM – 4:00 PM', note: 'North garden gate unlocked' },
        { label: 'Parish Choir Practice', value: 'Wednesdays 7:00 PM', note: 'No audition required' },
        { label: 'Parking & Streetcar', value: 'Behind Annex off Adams St', note: 'ADA ramp at South Portal' },
        { label: 'Benevolence Fund', value: '100% pass-through assistance', note: 'Administered by deacons' },
      ],
      galleryImages: [
        { url: '/themes/assets/chapel-interior.webp', caption: 'Sanctuary arches and stained-glass clerestory during morning sun', alt: 'Interior of vaulted stone chapel with tall arched windows' },
        { url: '/themes/assets/law-library.webp', caption: 'Parish reading room and neighborhood history archive open Thursdays', alt: 'Warm timber archive room filled with local books' },
        { url: '/themes/assets/courtyard-arches.webp', caption: 'Shaded garden portico where Sunday coffee hour gathers', alt: 'Shaded courtyard arches overlooking tropical greenery' },
      ],
      notesOrFaq: [
        { question: 'Is everyone welcome inside during weekday quiet hours?', answer: 'Yes. Whether you come to pray, cool down on a summer walk, or look at the 1894 stonework, the side sanctuary doors remain open Monday through Saturday.' },
        { question: 'How do neighbors volunteer for the Thursday produce table?', answer: 'Arrive at 3:15 PM behind the annex with comfortable shoes—no prior training needed, or send your email below to join the monthly volunteer rotation.' },
      ],
      themeId: 'civic-almanac',
    },
  },
];

export const WEBSITE_THEME_MAP: Record<WebsiteThemeId, WebsiteThemeSpec> = ACCENT_WEBSITE_THEMES.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<WebsiteThemeId, WebsiteThemeSpec>
);

export function getWebsiteTheme(themeId?: string | null): WebsiteThemeSpec {
  if (themeId && themeId in WEBSITE_THEME_MAP) {
    return WEBSITE_THEME_MAP[themeId as WebsiteThemeId];
  }
  return WEBSITE_THEME_MAP['hacienda-hospitality'];
}

function escapeHtml(text: string | undefined | null): string {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function resolveAssetUrl(url: string, assetPrefix = ''): string {
  if (!url) return '';
  if (/^https?:\/\//i.test(url) || url.startsWith('data:')) return url;
  if (!assetPrefix) return url;
  const cleanPrefix = assetPrefix.replace(/\/+$/, '');
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${cleanPrefix}${cleanUrl}`;
}

export function generateThemeStylesMarkdown(theme: WebsiteThemeSpec): string {
  const { palette, typography, geometry } = theme;
  const motion = theme.motion ?? DEFAULT_THEME_MOTION;
  return `# Accént Website Theme Contract: ${theme.name} (\`${theme.id}\`)

> **Layout Archetype**: \`${theme.archetype}\` — ${theme.archetypeLabel}  
> **Best Suited For**: ${theme.bestFor}  
> **Avoid For**: ${theme.avoidFor}  
> **Accént Brand Dialect**: ${theme.brandDialect}

## Color Palette (WCAG 2.1 AA+ Calibrated, Zero CSS Gradients)
- \`--bg\`: \`${palette.bg}\` (warm/daylight paper surface, zero pure #FFFFFF floodlight)
- \`--surface\`: \`${palette.surface}\` (elevated card/table panel)
- \`--ink\`: \`${palette.ink}\` (primary copy)
- \`--muted\`: \`${palette.muted}\` (secondary captions, >= 4.5:1)
- \`--accent\`: \`${palette.accent}\` (one focal brand hue per view — never stack 3 accents)
- \`--accent-ink\`: \`${palette.accentInk}\`
- \`--border\`: \`${palette.border}\` (1px crisp structural hairline)
- \`--focal-surface\`: \`${palette.focalSurface}\`

## Optical Font Trio
- **Display**: ${typography.display} (scale: \`${typography.displayScale}\`, letter-spacing: \`${typography.tracking}\`)
- **Body**: ${typography.body} (minimum body size >= \`16px\`, UI micro floor >= \`13px\`)
- **Monospace / Numerals**: ${typography.mono} (use \`font-variant-numeric: tabular-nums\` in all pricing/spec columns)
- **Why This Pairing Works**: ${typography.pairingRationale}

## Structural Geometry & Responsive Rules
- **Container Max Width**: \`${geometry.maxWidthPx}px\`
- **Border Radius**: \`${geometry.radius}\` (clean, non-bubbly corners)
- **Header Pattern**: ${geometry.navStyle}
- **Hero Pattern**: ${geometry.heroStyle}
- **Primary Offerings Component**: ${geometry.offeringsComponent}
- **Tap Targets**: All buttons, phone links, nav items, and disclosure toggles must clear \`min-height: 44px\`.
- **Mobile 390x844 Rule**: Stack split columns cleanly below \`760px\`; zero horizontal page overflow.
- **Motion Budget**: ${motion.entranceMs}ms \`${motion.easing}\`, ${motion.hoverRule}.

## Visual Personality & Voice
- **Hero Layout**: \`${theme.personality.heroVariant}\` — ${theme.personality.imageTreatment}
- **Motion Feel**: ${theme.personality.motionProfile}
- **Button Corner Style**: ${theme.personality.buttonShapeLabel}
- **Writing Voice**: ${theme.personality.voice}

## Live Editing & Pipes Round-Trip Hooks
Stamp every editable text node with \`data-bang-slot="<slotName>"\` and every image with \`data-bang-image-slot="<slotName>"\`, so the **Pipes Chromium Extension** ("Edit Site" tab) and **Pipes Desktop BANG!** can inspect live text and swap local photos without losing your layout.
`;
}

export interface ThemeAuditCheck {
  id: string;
  label: string;
  passed: boolean;
  detail: string;
}

export function auditRenderedThemeBundle(bundle: { html: string; css: string }): {
  passed: boolean;
  checks: ThemeAuditCheck[];
} {
  const combined = `${bundle.html}\n${bundle.css}`;
  const hasGradient = /(linear-gradient|radial-gradient|conic-gradient)\s*\(/i.test(combined);
  const usesTailwindCdn = /cdn\.tailwindcss\.com/i.test(bundle.html);
  const hasViewport = /<meta[^>]+name=["']viewport["'][^>]+width=device-width/i.test(bundle.html);
  const sub13pxMatches = bundle.css.match(/font-size:\s*(9|10|11|12)px/gi) || [];
  const hasBangSlots = /data-bang-slot=/i.test(bundle.html) && /data-bang-image-slot=/i.test(bundle.html);
  const imgTags = bundle.html.match(/<img\b[^>]*>/gi) || [];
  const imgsMissingAlt = imgTags.filter((tag) => !/\balt=["'][^"']+["']/i.test(tag));
  const hasBuzzwords = /\b(epistemic|monograph|strongbox|fts5|bm25|slop)\b|<Sparkles/i.test(bundle.html);
  const hasTapTargetFloor = /min-height:\s*44px/i.test(bundle.css);

  const checks: ThemeAuditCheck[] = [
    {
      id: 'no-gradients',
      label: 'Zero CSS gradients',
      passed: !hasGradient,
      detail: hasGradient ? 'Found banned gradient declaration.' : 'Pure solid flat Accént color surfaces.',
    },
    {
      id: 'zero-tailwind-cdn',
      label: 'Zero external runtime CDN bloat',
      passed: !usesTailwindCdn,
      detail: usesTailwindCdn ? 'Found cdn.tailwindcss.com script tag.' : 'Pure standalone compiled CSS.',
    },
    {
      id: 'font-floor',
      label: '13px minimum readable font floor',
      passed: sub13pxMatches.length === 0,
      detail: sub13pxMatches.length ? `Sub-13px matches: ${sub13pxMatches.join(', ')}` : 'All font-size rules >= 13px.',
    },
    {
      id: 'tap-targets',
      label: '44px minimum touch target floor',
      passed: hasTapTargetFloor,
      detail: hasTapTargetFloor ? 'Interactive links and buttons guarantee min-height: 44px.' : 'Missing 44px min-height rule.',
    },
    {
      id: 'mobile-viewport',
      label: '390x844 mobile viewport contract',
      passed: hasViewport,
      detail: hasViewport ? 'Responsive viewport meta present.' : 'Missing viewport meta tag.',
    },
    {
      id: 'bang-roundtrip',
      label: 'Extension live-edit slot coverage',
      passed: hasBangSlots,
      detail: hasBangSlots ? 'Text and image elements tagged for live Chromium Extension editing.' : 'Missing data-bang-slot tags.',
    },
    {
      id: 'image-alts',
      label: 'Accessible image alt attributes',
      passed: imgsMissingAlt.length === 0,
      detail: imgsMissingAlt.length ? `${imgsMissingAlt.length} <img> missing descriptive alt.` : 'All images carry descriptive alt text.',
    },
    {
      id: 'plain-english',
      label: 'Plain-English wording check',
      passed: !hasBuzzwords,
      detail: hasBuzzwords ? 'Found jargon or sparkle chrome.' : 'Clean everyday business prose.',
    },
  ];

  return {
    passed: checks.every((c) => c.passed),
    checks,
  };
}

export function renderStandaloneThemeBundle(
  rawContent: SiteContentContract,
  themeIdOverride?: WebsiteThemeId,
  options?: { assetPrefix?: string; includePreviewBridge?: boolean }
): {
  theme: WebsiteThemeSpec;
  html: string;
  css: string;
  js: string;
  proofOfWorkJson: string;
} {
  const theme = getWebsiteTheme(themeIdOverride || rawContent.themeId);
  const content: SiteContentContract = {
    ...rawContent,
    themeId: theme.id,
  };
  const assetPrefix = options?.assetPrefix || '';
  const { palette, typography, geometry, archetype } = theme;
  const telHref = `tel:${content.phone.replace(/[^0-9+]/g, '')}`;
  const isHeaderInverted = archetype === 'studio-casegrid';

  const css = `/* Accént Design System — Theme: ${theme.name} (${theme.id}) | Archetype: ${archetype} */
:root {
  --bg: ${palette.bg};
  --surface: ${palette.surface};
  --ink: ${palette.ink};
  --muted: ${palette.muted};
  --accent: ${palette.accent};
  --accent-ink: ${palette.accentInk};
  --border: ${palette.border};
  --focal: ${palette.focalSurface};
  --font-display: ${typography.display};
  --font-body: ${typography.body};
  --font-mono: ${typography.mono};
  --radius: ${geometry.radius};
  --container-max: ${geometry.maxWidthPx}px;
}

*, *::before, *::after {
  box-sizing: border-box;
}

@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}

html {
  -webkit-text-size-adjust: 100%;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}

body {
  margin: 0;
  background-color: var(--bg);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.65;
  overflow-x: hidden;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

a {
  color: inherit;
}

.wrap {
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding-left: clamp(16px, 4vw, 32px);
  padding-right: clamp(16px, 4vw, 32px);
}

.mono {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
  margin: 0 0 8px 0;
}

h1, h2, h3 {
  font-family: var(--font-display);
  letter-spacing: ${typography.tracking};
  line-height: 1.15;
  margin-top: 0;
}

h1 {
  font-size: ${typography.displayScale};
  margin-bottom: 14px;
}

h2 {
  font-size: clamp(1.5rem, 2.7vw, 2.15rem);
  margin-bottom: 12px;
}

p {
  margin-top: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 10px 20px;
  border-radius: var(--radius);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid var(--accent);
  background-color: var(--accent);
  color: var(--accent-ink);
  transition: opacity ${(theme.motion ?? DEFAULT_THEME_MOTION).entranceMs}ms ${(theme.motion ?? DEFAULT_THEME_MOTION).easing};
}

.btn:hover, .btn:focus-visible {
  opacity: 0.9;
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.btn-outline {
  background-color: transparent;
  color: var(--ink);
  border-color: var(--border);
}

.btn-outline:hover {
  border-color: var(--ink);
  background-color: var(--surface);
}

/* Header & Navigation */
.site-header {
  border-top: ${archetype === 'chambers-dossier' ? '4px solid var(--accent)' : '0'};
  border-bottom: ${archetype === 'parish-broadsheet' ? '3px double var(--ink)' : '1px solid var(--border)'};
  background-color: ${isHeaderInverted ? palette.focalSurface : 'var(--surface)'};
  color: ${isHeaderInverted ? '#F8FAFC' : 'var(--ink)'};
}

.site-header .wrap {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding-top: 14px;
  padding-bottom: 14px;
}

.brand-lockup {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.brand-name {
  font-family: var(--font-display);
  font-size: 21px;
  font-weight: 700;
  line-height: 1.2;
}

.brand-meta {
  font-size: 13px;
  opacity: 0.85;
}

.nav-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.nav-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 6px 10px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid transparent;
}

.nav-link:hover {
  border-bottom-color: currentColor;
}

/* Archetype-Specific Top Sections */
.hero-section {
  padding-top: clamp(28px, 4vw, 52px);
  padding-bottom: clamp(28px, 4vw, 52px);
  border-bottom: 1px solid var(--border);
}

.hero-terrace .hero-copy {
  max-width: 780px;
  margin-bottom: 24px;
}

.hero-frame {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  background-color: var(--surface);
}

.hero-frame img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.hero-split {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: clamp(20px, 3.5vw, 44px);
  align-items: center;
}

.hero-split-reverse {
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
}

.hero-split .hero-frame img {
  aspect-ratio: 4 / 3;
}

.hero-sanctuary {
  max-width: 720px;
  margin: 0 auto;
  text-align: left;
}

.sanctuary-callout {
  margin-top: 20px;
  padding: 18px 20px;
  background-color: var(--focal);
  border: 1px solid var(--border);
  border-left: 4px solid var(--accent);
  border-radius: var(--radius);
}

.chambers-brief {
  border-left: 4px solid var(--accent);
  padding-left: 20px;
}

.credentials-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background-color: var(--border);
  border: 1px solid var(--border);
  margin-top: 24px;
}

.credentials-strip > div {
  background-color: var(--surface);
  padding: 14px 16px;
}

.studio-dossier-band {
  border: 1px solid var(--border);
  border-left: 4px solid var(--accent);
  background-color: var(--surface);
  padding: 22px 24px;
}

.dispatch-bar {
  background-color: var(--focal);
  border-bottom: 1px solid var(--border);
  padding: 10px 0;
  font-size: 14px;
}

.dispatch-bar .wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.broadsheet-banner {
  border-top: 1px solid var(--ink);
  border-bottom: 2px solid var(--ink);
  padding: 8px 0;
  margin-bottom: 22px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 13px;
  text-transform: uppercase;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
}

/* Main Content Rhythm */
.section-band {
  padding-top: clamp(32px, 4.5vw, 56px);
  padding-bottom: clamp(32px, 4.5vw, 56px);
  border-bottom: 1px solid var(--border);
}

.split-story {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.85fr);
  gap: clamp(24px, 4vw, 48px);
  align-items: start;
}

.story-body p {
  max-width: 65ch;
  font-size: 17px;
  margin-bottom: 16px;
}

/* Native Definition List / Spec Ledger */
.spec-panel {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
}

.spec-list {
  margin: 0;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 11px 0;
  border-bottom: 1px solid var(--border);
}

.spec-row:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.spec-row dt {
  font-size: 14px;
  font-weight: 600;
  color: var(--muted);
}

.spec-row dd {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  text-align: right;
}

.spec-note {
  display: block;
  font-size: 13px;
  font-weight: 400;
  color: var(--muted);
}

/* Offerings Patterns */
.offerings-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.offering-item {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.offering-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
}

.offering-name {
  font-family: var(--font-display);
  font-size: 19px;
  font-weight: 700;
  margin: 0;
}

.offering-price {
  font-family: var(--font-mono);
  font-size: 15px;
  font-weight: 700;
  color: var(--accent);
  white-space: nowrap;
}

.offering-badge {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 13px;
  padding: 3px 9px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background-color: ${isHeaderInverted ? 'var(--surface)' : 'var(--focal)'};
  color: var(--ink);
  align-self: flex-start;
}

/* Native Ruled Table (Menu Ledger / Dispatch / Chambers / Catalog) */
.ledger-table-wrap {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow-x: auto;
}

.ledger-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.ledger-table th {
  font-family: var(--font-mono);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
  padding: 13px 18px;
  border-bottom: 1px solid var(--ink);
  background-color: var(--bg);
}

.ledger-table td {
  padding: 16px 18px;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
}

.ledger-table tr:last-child td {
  border-bottom: 0;
}

/* Broadsheet 3-Column Almanac */
.almanac-cols {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;
  border-top: 2px solid var(--ink);
  border-bottom: 2px solid var(--ink);
  background-color: var(--surface);
}

.almanac-col {
  padding: 20px;
  border-right: 1px solid var(--border);
}

.almanac-col:last-child {
  border-right: 0;
}

/* Dispatch Steps Strip */
.dispatch-steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 24px;
}

.dispatch-step {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-top: 3px solid var(--accent);
  padding: 16px;
}

/* Case Study Numbered Rows */
.case-row {
  display: grid;
  grid-template-columns: 72px minmax(0, 1.3fr) minmax(0, 0.7fr);
  gap: 18px;
  padding: 20px 0;
  border-bottom: 1px solid var(--border);
  align-items: start;
}

.case-num {
  font-family: var(--font-mono);
  font-size: 22px;
  font-weight: 700;
  color: var(--accent);
}

/* Gallery Strip */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.gallery-card {
  margin: 0;
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.gallery-card img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.gallery-card figcaption {
  padding: 12px 14px;
  font-size: 14px;
  color: var(--muted);
  border-top: 1px solid var(--border);
}

/* FAQ Accordion */
.faq-list details {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 10px;
}

.faq-list summary {
  list-style: none;
  cursor: pointer;
  padding: 14px 18px;
  min-height: 44px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.faq-list summary::after {
  content: '+';
  font-family: var(--font-mono);
  font-size: 18px;
  color: var(--accent);
}

.faq-list details[open] summary::after {
  content: '−';
}

.faq-answer {
  padding: 0 18px 16px 18px;
  font-size: 15px;
  color: var(--muted);
}

/* Contact Section */
.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(20px, 4vw, 44px);
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: clamp(20px, 3.5vw, 34px);
}

.form-field {
  margin-bottom: 14px;
}

.form-field label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
}

.form-field input,
.form-field textarea {
  width: 100%;
  min-height: 44px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background-color: var(--bg);
  color: var(--ink);
  font-family: inherit;
  font-size: 15px;
}

.site-footer {
  padding: 26px 0;
  font-size: 14px;
  color: var(--muted);
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
}

/* Responsive Reflow <= 860px / 390x844 */
@media (max-width: 860px) {
  .hero-split,
  .hero-split-reverse,
  .split-story,
  .offerings-grid,
  .dispatch-steps,
  .almanac-cols,
  .gallery-grid,
  .contact-grid,
  .credentials-strip,
  .case-row {
    grid-template-columns: 1fr;
  }

  .almanac-col {
    border-right: 0;
    border-bottom: 1px solid var(--border);
  }

  .almanac-col:last-child {
    border-bottom: 0;
  }

  .ledger-table th:nth-child(2),
  .ledger-table td:nth-child(2) {
    min-width: 190px;
  }
}
`;

  const heroImgSrc = resolveAssetUrl(content.heroImageUrl, assetPrefix);

  const renderHeroSection = () => {
    const ctaButtons = `<div class="cta-row">
      <a class="btn" href="${escapeHtml(content.ctaHref || '#contact')}" data-bang-slot="ctaLabel">${escapeHtml(content.ctaLabel)}</a>
      <a class="btn btn-outline" href="${escapeHtml(content.secondaryCtaHref || telHref)}" data-bang-slot="secondaryCtaLabel">${escapeHtml(content.secondaryCtaLabel || `Call ${content.phone}`)}</a>
    </div>`;

    if (archetype === 'terrace-editorial') {
      return `<section class="hero-section hero-terrace">
        <div class="wrap">
          <div class="hero-copy">
            <p class="eyebrow" data-bang-slot="cityState">${escapeHtml(content.cityState)} · Accént ${escapeHtml(theme.shortName)}</p>
            <h1 data-bang-slot="businessName">${escapeHtml(content.businessName)}</h1>
            <p data-bang-slot="tagline" style="font-size:18px;color:var(--muted);">${escapeHtml(content.tagline)}</p>
            ${ctaButtons}
          </div>
          <div class="hero-frame">
            <img src="${escapeHtml(heroImgSrc)}" alt="${escapeHtml(content.heroImageAlt)}" data-bang-image-slot="hero" loading="eager" decoding="async" />
          </div>
        </div>
      </section>`;
    }

    if (archetype === 'intake-guide') {
      return `<section class="hero-section">
        <div class="wrap hero-sanctuary">
          <p class="eyebrow" data-bang-slot="cityState">${escapeHtml(content.cityState)} · Independent Practice</p>
          <h1 data-bang-slot="businessName">${escapeHtml(content.businessName)}</h1>
          <p data-bang-slot="tagline" style="font-size:18px;color:var(--muted);">${escapeHtml(content.tagline)}</p>
          <div class="sanctuary-callout">
            <strong style="display:block;font-size:15px;margin-bottom:4px;">Current Practice Availability</strong>
            <span data-bang-slot="hours" style="font-size:15px;color:var(--muted);">${escapeHtml(content.hours)}</span>
          </div>
          ${ctaButtons}
          <div class="hero-frame" style="margin-top:24px;">
            <img src="${escapeHtml(heroImgSrc)}" alt="${escapeHtml(content.heroImageAlt)}" data-bang-image-slot="hero" loading="eager" decoding="async" />
          </div>
        </div>
      </section>`;
    }

    if (archetype === 'parish-broadsheet') {
      return `<section class="hero-section">
        <div class="wrap">
          <div class="broadsheet-banner">
            <span data-bang-slot="cityState">${escapeHtml(content.cityState)} Edition</span>
            <span data-bang-slot="hours">${escapeHtml(content.hours)}</span>
            <span class="mono">${escapeHtml(content.phone)}</span>
          </div>
          <div class="hero-split">
            <div>
              <p class="eyebrow">Featured Dispatch</p>
              <h1 data-bang-slot="storyHeading">${escapeHtml(content.storyHeading)}</h1>
              <p data-bang-slot="tagline" style="font-size:17px;color:var(--muted);">${escapeHtml(content.tagline)}</p>
              ${ctaButtons}
            </div>
            <div class="hero-frame">
              <img src="${escapeHtml(heroImgSrc)}" alt="${escapeHtml(content.heroImageAlt)}" data-bang-image-slot="hero" loading="eager" decoding="async" />
            </div>
          </div>
        </div>
      </section>`;
    }

    if (archetype === 'plate-catalog') {
      return `<section class="hero-section">
        <div class="wrap hero-split hero-split-reverse">
          <div class="hero-frame">
            <img src="${escapeHtml(heroImgSrc)}" alt="${escapeHtml(content.heroImageAlt)}" data-bang-image-slot="hero" loading="eager" decoding="async" />
          </div>
          <div>
            <p class="eyebrow" data-bang-slot="cityState">PLATE 00 · ${escapeHtml(content.cityState)}</p>
            <h1 data-bang-slot="businessName">${escapeHtml(content.businessName)}</h1>
            <p data-bang-slot="tagline" style="font-size:17px;color:var(--muted);">${escapeHtml(content.tagline)}</p>
            <p class="mono" style="font-size:14px;color:var(--muted);" data-bang-slot="hours">${escapeHtml(content.hours)}</p>
            ${ctaButtons}
          </div>
        </div>
      </section>`;
    }

    if (archetype === 'chambers-dossier') {
      const stripItems = content.scheduleOrSpecs.slice(0, 3);
      return `<section class="hero-section">
        <div class="wrap hero-split">
          <div class="chambers-brief">
            <p class="eyebrow" data-bang-slot="cityState">${escapeHtml(content.cityState)} · Fiduciary &amp; Advisory Brief</p>
            <h1 data-bang-slot="businessName">${escapeHtml(content.businessName)}</h1>
            <p data-bang-slot="tagline" style="font-size:18px;color:var(--muted);">${escapeHtml(content.tagline)}</p>
            ${ctaButtons}
          </div>
          <div class="hero-frame">
            <img src="${escapeHtml(heroImgSrc)}" alt="${escapeHtml(content.heroImageAlt)}" data-bang-image-slot="hero" loading="eager" decoding="async" />
          </div>
        </div>
        ${
          stripItems.length
            ? `<div class="wrap"><div class="credentials-strip">${stripItems
                .map(
                  (row) =>
                    `<div><div class="eyebrow" style="margin-bottom:4px;">${escapeHtml(row.label)}</div><strong style="font-size:15px;">${escapeHtml(row.value)}</strong></div>`
                )
                .join('')}</div></div>`
            : ''
        }
      </section>`;
    }

    if (archetype === 'studio-casegrid') {
      return `<section class="hero-section">
        <div class="wrap hero-split">
          <div class="studio-dossier-band">
            <p class="eyebrow" data-bang-slot="cityState">PRACTICE DOSSIER · ${escapeHtml(content.cityState)}</p>
            <h1 data-bang-slot="businessName">${escapeHtml(content.businessName)}</h1>
            <p data-bang-slot="tagline" style="font-size:17px;color:var(--muted);">${escapeHtml(content.tagline)}</p>
            <p class="mono" style="font-size:14px;color:var(--muted);border-top:1px solid var(--border);padding-top:12px;margin-top:12px;" data-bang-slot="hours">${escapeHtml(content.hours)}</p>
            ${ctaButtons}
          </div>
          <div class="hero-frame">
            <img src="${escapeHtml(heroImgSrc)}" alt="${escapeHtml(content.heroImageAlt)}" data-bang-image-slot="hero" loading="eager" decoding="async" />
          </div>
        </div>
      </section>`;
    }

    return `<section class="hero-section">
      <div class="wrap hero-split">
        <div>
          <p class="eyebrow" data-bang-slot="cityState">${escapeHtml(content.cityState)} · ${escapeHtml(theme.shortName)}</p>
          <h1 data-bang-slot="businessName">${escapeHtml(content.businessName)}</h1>
          <p data-bang-slot="tagline" style="font-size:18px;color:var(--muted);">${escapeHtml(content.tagline)}</p>
          <p class="mono" style="font-size:14px;color:var(--muted);" data-bang-slot="hours">${escapeHtml(content.hours)}</p>
          ${ctaButtons}
        </div>
        <div class="hero-frame">
          <img src="${escapeHtml(heroImgSrc)}" alt="${escapeHtml(content.heroImageAlt)}" data-bang-image-slot="hero" loading="eager" decoding="async" />
        </div>
      </div>
    </section>`;
  };

  const renderOfferingsSection = () => {
    if (archetype === 'menu-ledger' || archetype === 'chambers-dossier' || archetype === 'plate-catalog' || archetype === 'dispatch-split') {
      const dispatchStepsHtml =
        archetype === 'dispatch-split'
          ? `<div class="dispatch-steps">
              <div class="dispatch-step">
                <p class="eyebrow">Step 01</p>
                <strong>Live Phone Triage</strong>
                <p style="font-size:14px;color:var(--muted);margin:6px 0 0 0;">Speak directly with an experienced dispatcher on <span class="mono">${escapeHtml(content.phone)}</span>.</p>
              </div>
              <div class="dispatch-step">
                <p class="eyebrow">Step 02</p>
                <strong>Written Upfront Quote</strong>
                <p style="font-size:14px;color:var(--muted);margin:6px 0 0 0;">Inspect measurements and flat-rate price before any work starts.</p>
              </div>
              <div class="dispatch-step">
                <p class="eyebrow">Step 03</p>
                <strong>Backed Workmanship</strong>
                <p style="font-size:14px;color:var(--muted);margin:6px 0 0 0;">Verified test reading and clean workspace guaranteed.</p>
              </div>
            </div>`
          : '';

      return `<section id="offerings" class="section-band">
        <div class="wrap">
          <p class="eyebrow">Published Schedule &amp; Rates</p>
          <h2 data-bang-slot="offeringsTitle">${escapeHtml(content.offeringsTitle)}</h2>
          ${dispatchStepsHtml}
          <div class="ledger-table-wrap" tabindex="0" role="region" aria-label="Published schedule and rates">
            <table class="ledger-table">
              <thead>
                <tr>
                  <th>Offering / Scope</th>
                  <th>Specification &amp; Notes</th>
                  <th>Price / Lead Time</th>
                </tr>
              </thead>
              <tbody>
                ${content.offerings
                  .map(
                    (item, idx) => `<tr>
                      <td>
                        <strong data-bang-slot="offering-${idx}-name">${escapeHtml(item.name)}</strong>
                        ${item.badge ? `<div style="margin-top:4px;"><span class="offering-badge" data-bang-slot="offering-${idx}-badge">${escapeHtml(item.badge)}</span></div>` : ''}
                      </td>
                      <td data-bang-slot="offering-${idx}-detail" style="font-size:15px;color:var(--muted);">${escapeHtml(item.detail)}</td>
                      <td class="mono" style="font-weight:700;color:var(--accent);white-space:nowrap;" data-bang-slot="offering-${idx}-price">${escapeHtml(item.priceOrSpec)}</td>
                    </tr>`
                  )
                  .join('\n')}
              </tbody>
            </table>
          </div>
        </div>
      </section>`;
    }

    if (archetype === 'studio-casegrid') {
      return `<section id="offerings" class="section-band">
        <div class="wrap">
          <p class="eyebrow">Practice Matrix</p>
          <h2 data-bang-slot="offeringsTitle">${escapeHtml(content.offeringsTitle)}</h2>
          <div>
            ${content.offerings
              .map(
                (item, idx) => `<div class="case-row">
                  <div class="case-num">0${idx + 1}</div>
                  <div>
                    <h3 class="offering-name" data-bang-slot="offering-${idx}-name">${escapeHtml(item.name)}</h3>
                    <p data-bang-slot="offering-${idx}-detail" style="margin:6px 0 0 0;color:var(--muted);">${escapeHtml(item.detail)}</p>
                  </div>
                  <div style="text-align:left;">
                    <span class="offering-price" data-bang-slot="offering-${idx}-price">${escapeHtml(item.priceOrSpec)}</span>
                    ${item.badge ? `<div style="margin-top:6px;"><span class="offering-badge" data-bang-slot="offering-${idx}-badge">${escapeHtml(item.badge)}</span></div>` : ''}
                  </div>
                </div>`
              )
              .join('\n')}
          </div>
        </div>
      </section>`;
    }

    if (archetype === 'parish-broadsheet') {
      const cols = content.offerings.slice(0, 3);
      return `<section id="offerings" class="section-band">
        <div class="wrap">
          <p class="eyebrow">Weekly Notice Board</p>
          <h2 data-bang-slot="offeringsTitle">${escapeHtml(content.offeringsTitle)}</h2>
          <div class="almanac-cols">
            ${cols
              .map(
                (item, idx) => `<article class="almanac-col">
                  <span class="offering-badge" data-bang-slot="offering-${idx}-badge">${escapeHtml(item.badge || 'Weekly')}</span>
                  <h3 class="offering-name" style="margin-top:10px;" data-bang-slot="offering-${idx}-name">${escapeHtml(item.name)}</h3>
                  <p data-bang-slot="offering-${idx}-detail" style="font-size:15px;color:var(--muted);margin:8px 0;">${escapeHtml(item.detail)}</p>
                  <div class="offering-price" data-bang-slot="offering-${idx}-price">${escapeHtml(item.priceOrSpec)}</div>
                </article>`
              )
              .join('\n')}
          </div>
          ${
            content.offerings[3]
              ? `<div class="spec-panel" style="margin-top:14px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;">
                  <div>
                    <strong data-bang-slot="offering-3-name">${escapeHtml(content.offerings[3].name)}</strong>
                    <span style="display:block;font-size:14px;color:var(--muted);" data-bang-slot="offering-3-detail">${escapeHtml(content.offerings[3].detail)}</span>
                  </div>
                  <span class="offering-price" data-bang-slot="offering-3-price">${escapeHtml(content.offerings[3].priceOrSpec)}</span>
                </div>`
              : ''
          }
        </div>
      </section>`;
    }

    return `<section id="offerings" class="section-band">
      <div class="wrap">
        <p class="eyebrow">Offerings &amp; Rates</p>
        <h2 data-bang-slot="offeringsTitle">${escapeHtml(content.offeringsTitle)}</h2>
        <div class="offerings-grid">
          ${content.offerings
            .map(
              (item, idx) => `<article class="offering-item">
                <div>
                  ${item.badge ? `<span class="offering-badge" data-bang-slot="offering-${idx}-badge">${escapeHtml(item.badge)}</span>` : ''}
                  <div class="offering-head" style="margin-top:${item.badge ? '10px' : '0'};">
                    <h3 class="offering-name" data-bang-slot="offering-${idx}-name">${escapeHtml(item.name)}</h3>
                    <span class="offering-price" data-bang-slot="offering-${idx}-price">${escapeHtml(item.priceOrSpec)}</span>
                  </div>
                  <p data-bang-slot="offering-${idx}-detail" style="font-size:15px;color:var(--muted);margin:8px 0 0 0;">${escapeHtml(item.detail)}</p>
                </div>
              </article>`
            )
            .join('\n')}
        </div>
      </div>
    </section>`;
  };

  const renderGallerySection = () => `<section id="gallery" class="section-band">
    <div class="wrap">
      <p class="eyebrow">Photographic Plates</p>
      <h2>From the Grounds &amp; Workbench</h2>
      <div class="gallery-grid">
        ${content.galleryImages
          .map(
            (img, idx) => `<figure class="gallery-card">
              <img src="${escapeHtml(resolveAssetUrl(img.url, assetPrefix))}" alt="${escapeHtml(img.alt)}" data-bang-image-slot="gallery-${idx}" loading="eager" />
              <figcaption data-bang-slot="gallery-${idx}-caption">${escapeHtml(img.caption)}</figcaption>
            </figure>`
          )
          .join('\n')}
      </div>
    </div>
  </section>`;

  const renderStoryAndSpecs = () => `<section id="story" class="section-band">
    <div class="wrap split-story">
      <div class="story-body">
        <p class="eyebrow">Direct Origin &amp; Craft</p>
        <h2 data-bang-slot="storyHeading">${escapeHtml(content.storyHeading)}</h2>
        ${content.storyParagraphs
          .map((para, idx) => `<p data-bang-slot="story-p-${idx}">${escapeHtml(para)}</p>`)
          .join('\n')}
      </div>
      <aside class="spec-panel">
        <p class="eyebrow">Fact Sheet</p>
        <h3 data-bang-slot="scheduleOrSpecsTitle" style="font-size:20px;margin-bottom:8px;">${escapeHtml(content.scheduleOrSpecsTitle)}</h3>
        <dl class="spec-list">
          ${content.scheduleOrSpecs
            .map(
              (row, idx) => `<div class="spec-row">
                <dt data-bang-slot="spec-${idx}-label">${escapeHtml(row.label)}</dt>
                <dd>
                  <span data-bang-slot="spec-${idx}-value">${escapeHtml(row.value)}</span>
                  ${row.note ? `<span class="spec-note" data-bang-slot="spec-${idx}-note">${escapeHtml(row.note)}</span>` : ''}
                </dd>
              </div>`
            )
            .join('\n')}
        </dl>
      </aside>
    </div>
  </section>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(content.businessName)} — ${escapeHtml(content.cityState)}</title>
  <meta name="description" content="${escapeHtml(content.tagline)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="${escapeHtml(typography.googleFontsUrl)}" />
  ${options?.includePreviewBridge ? `<style>${css}</style>` : `<link rel="stylesheet" href="styles.css" />`}
</head>
<body data-bang-theme="${theme.id}" data-bang-archetype="${archetype}">
  ${
    archetype === 'dispatch-split'
      ? `<div class="dispatch-bar"><div class="wrap"><span><strong>Service Hours:</strong> <span data-bang-slot="hours">${escapeHtml(content.hours)}</span></span><a class="mono" href="${escapeHtml(telHref)}" data-bang-slot="phone" style="font-weight:700;">Call Now: ${escapeHtml(content.phone)}</a></div></div>`
      : archetype === 'menu-ledger'
        ? `<div class="dispatch-bar"><div class="wrap"><span><strong>Today’s Counter Hours:</strong> <span data-bang-slot="hours">${escapeHtml(content.hours)}</span></span><a class="mono" href="${escapeHtml(telHref)}" data-bang-slot="phone" style="font-weight:700;">Call Counter: ${escapeHtml(content.phone)}</a></div></div>`
        : ''
  }
  <header class="site-header">
    <div class="wrap">
      <div class="brand-lockup">
        <a href="#" class="brand-name" style="text-decoration:none;" data-bang-slot="businessName">${escapeHtml(content.businessName)}</a>
        <span class="brand-meta" data-bang-slot="address">${escapeHtml(content.address)}</span>
      </div>
      <nav class="nav-actions" aria-label="Primary">
        <a class="nav-link" href="#story">About</a>
        <a class="nav-link" href="#offerings">Offerings</a>
        <a class="nav-link" href="#faq">Questions</a>
        <a class="btn" href="${escapeHtml(content.ctaHref || '#contact')}">${escapeHtml(content.ctaLabel)}</a>
      </nav>
    </div>
  </header>

  <main>
    ${archetype === 'plate-catalog' ? `${renderHeroSection()}${renderGallerySection()}${renderOfferingsSection()}${renderStoryAndSpecs()}` : `${renderHeroSection()}${renderStoryAndSpecs()}${renderOfferingsSection()}${renderGallerySection()}`}

    <section id="faq" class="section-band">
      <div class="wrap" style="max-width:860px;">
        <p class="eyebrow">Plain Answers</p>
        <h2>Common Questions Before You Reach Out</h2>
        <div class="faq-list">
          ${content.notesOrFaq
            .map(
              (item, idx) => `<details${idx === 0 ? ' open' : ''}>
                <summary data-bang-slot="faq-${idx}-q">${escapeHtml(item.question)}</summary>
                <div class="faq-answer" data-bang-slot="faq-${idx}-a">${escapeHtml(item.answer)}</div>
              </details>`
            )
            .join('\n')}
        </div>
      </div>
    </section>

    <section id="contact" class="section-band">
      <div class="wrap">
        <div class="contact-grid">
          <div>
            <p class="eyebrow">Direct Connection</p>
            <h2>Reach <span data-bang-slot="businessName-contact">${escapeHtml(content.businessName)}</span></h2>
            <p style="color:var(--muted);">No third-party middleman or booking fee. Your inquiry travels directly to our inbox.</p>
            <dl class="spec-list" style="margin-top:18px;">
              <div class="spec-row"><dt>Telephone</dt><dd><a href="${escapeHtml(telHref)}" class="mono" data-bang-slot="phone">${escapeHtml(content.phone)}</a></dd></div>
              <div class="spec-row"><dt>Email</dt><dd><a href="mailto:${escapeHtml(content.email)}" data-bang-slot="email">${escapeHtml(content.email)}</a></dd></div>
              <div class="spec-row"><dt>Address</dt><dd data-bang-slot="address-contact">${escapeHtml(content.address)}</dd></div>
              <div class="spec-row"><dt>Hours</dt><dd data-bang-slot="hours-contact">${escapeHtml(content.hours)}</dd></div>
            </dl>
          </div>
          <form action="https://formsubmit.co/${escapeHtml(content.email)}" method="POST">
            <input type="hidden" name="_subject" value="Website Inquiry — ${escapeHtml(content.businessName)}" />
            <input type="hidden" name="_captcha" value="false" />
            <div class="form-field">
              <label for="inq-name">Your Name</label>
              <input id="inq-name" name="name" type="text" required placeholder="Alex Rivera" />
            </div>
            <div class="form-field">
              <label for="inq-reply">Phone or Email</label>
              <input id="inq-reply" name="contact" type="text" required placeholder="alex@example.com" />
            </div>
            <div class="form-field">
              <label for="inq-msg">How Can We Help?</label>
              <textarea id="inq-msg" name="message" rows="4" required placeholder="Tell us what you need or when you would like to visit..."></textarea>
            </div>
            <button type="submit" class="btn" style="width:100%;">Send Direct Message</button>
          </form>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="wrap footer-inner">
      <span>&copy; ${new Date().getFullYear()} ${escapeHtml(content.businessName)} · ${escapeHtml(content.cityState)}</span>
      <span class="mono">Accént Theme: ${escapeHtml(theme.id)} · Zero Tracking Cookies</span>
    </div>
  </footer>
</body>
</html>`;

  const js = `// Zero-bloat static enhancement script (${theme.id})
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const id = anchor.getAttribute('href');
    if (id && id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
    }
  });
});
`;

  const proofOfWorkJson = JSON.stringify(
    {
      schema: 'pipes-accent-site-v2',
      slug: content.slug,
      themeId: theme.id,
      archetype: theme.archetype,
      typography: {
        display: typography.displayLabel,
        body: typography.bodyLabel,
        mono: typography.monoLabel,
      },
      generatedAt: new Date().toISOString(),
    },
    null,
    2
  );

  return { theme, html, css, js, proofOfWorkJson };
}
