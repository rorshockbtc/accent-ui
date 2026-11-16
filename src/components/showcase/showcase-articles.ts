export interface StudioArticleTable {
  caption: string;
  columns: string[];
  rows: string[][];
}

export interface StudioArticleSpecItem {
  label: string;
  value: string;
}

export interface StudioArticle {
  id: string;
  eyebrow: string;
  category: string;
  title: string;
  dek: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  image?: string;
  imageAlt?: string;
  pullQuote?: string;
  bottomLine?: string;
  sections: { heading?: string; paragraphs: string[] }[];
  specBox?: { title: string; items: StudioArticleSpecItem[] };
  table?: StudioArticleTable;
  checklist?: { title: string; items: string[] };
  ctaLabel: string;
  ctaAction:
    | 'add-brisket'
    | 'salsa-habanero'
    | 'taco-order'
    | 'cd-75k'
    | 'loan-committee'
    | 'bank-concierge'
    | 'book-cut-maya'
    | 'book-highlights-elena'
    | 'salon-matcher'
    | 'scope-scorp'
    | 'scope-bookkeeping'
    | 'office-call'
    | 'sprint-2wk'
    | 'sprint-audit'
    | 'portfolio-call';
}

export interface StudioEditorialBundle {
  publicationTitle: string;
  publicationSubtitle: string;
  articles: StudioArticle[];
}

/* ============================================================================
 * 1 · TACO STUDIO EDITORIAL & SECONDARY DATA
 * ========================================================================== */
export const TACO_ITEM_BADGES: Record<string, string> = {
  'Bacon, egg & cheese': 'Flour tortilla · Crispy bacon',
  Migas: 'Corn or flour · Vegetarian',
  'Potato & bean': 'Corn masa · Vegetarian',
  'Smoked brisket': '12-hr Post Oak · Corn or flour',
  'Al pastor': 'Achiote pork · Charred pineapple',
  'Crispy fish': 'Wild cod · Corn tortilla',
  'Cold brew': 'Austin roast · 18-hr steep',
  Horchata: 'House rice milk · Zero dairy',
  'Fresh lime agua fresca': 'Pressed daily · Light cane sugar',
};

export const TACO_SALSA_SHU: Record<
  'Verde (Mild)' | 'Roja (Medium)' | 'Habanero (Hot)',
  string
> = {
  'Verde (Mild)': '1,500 SHU',
  'Roja (Medium)': '6,000 SHU',
  'Habanero (Hot)': '45,000 SHU',
};

export interface TacoGroupBox {
  id: string;
  name: string;
  serves: string;
  tacosIncluded: number;
  price: number;
  contents: string;
}

export const TACO_GROUP_BOXES: TacoGroupBox[] = [
  {
    id: 'standup',
    name: '12-Taco Standup Box',
    serves: '5–8 people',
    tacosIncluded: 12,
    price: 54,
    contents: '4 Bacon Egg & Cheese, 4 Migas, 4 Potato & Bean + 2 salsa pints',
  },
  {
    id: 'studio',
    name: '25-Taco Studio Pack',
    serves: '12–16 people',
    tacosIncluded: 25,
    price: 108,
    contents: '10 Bacon Egg & Cheese, 8 Migas, 7 Smoked Brisket + 4 salsa pints & napkins',
  },
  {
    id: 'jobsite',
    name: '40-Taco Jobsite Crate',
    serves: '20–26 people',
    tacosIncluded: 40,
    price: 172,
    contents: '16 Bacon Egg & Cheese, 12 Migas, 12 Smoked Brisket + insulated cambro & tongs',
  },
];

const TACO_ARTICLES: StudioArticle[] = [
  {
    id: 'taco-nixtamal',
    eyebrow: 'Comal Dispatch No. 01',
    category: 'Masa & Tortillas',
    title: 'Why We Nixtamalize Texas-Grown Corn Every Morning at 5:15 AM',
    dek: 'Bagged masa harina saves an hour of prep and costs half as much. It also smells flat the second it hits a hot plate.',
    author: 'Mateo Reyes',
    role: 'Head Comalero',
    date: 'Nov 12, 2026',
    readTime: '3 min read',
    image: '/showcase/taco/tortillas.webp',
    imageAlt: 'Freshly pressed corn tortillas steaming on a cast-iron comal at dawn',
    pullQuote: 'A corn tortilla should fold around heavy brisket without cracking at the seam two minutes later.',
    sections: [
      {
        heading: 'Yellow dent corn from Concho Valley',
        paragraphs: [
          'Every afternoon before lockup, we rinse 110 pounds of dried yellow dent corn harvested outside Eden, Texas, and simmer it gently with food-grade culinary lime (cal) for forty-two minutes. Overnight in its cooking liquor, the hull softens just enough to slip off cleanly without washing away the germ oil that gives real masa its toasted sweetness.',
          'At 5:15 AM, while East 6th is still quiet, our morning crew feeds the drained kernels through volcanic basalt stones we true with a dressing pick twice a season. Metal burr mills shear corn quickly, yet they warm the starch and bake out aromatics before the dough even reaches the press.',
        ],
      },
      {
        heading: 'Tuning hydration to Austin humidity',
        paragraphs: [
          'Central Texas swings from 82% Gulf mugginess on Tuesday to 30% dry north wind on Thursday, so a rigid water measurement makes brittle edges one morning and sticky pancakes the next. We mix in cool filtered water by hand feel until a pressed ball breaks cleanly around the rim without fissuring.',
          'Each 34-gram dough portion hits our 435-degree steel comal for fifteen seconds on the first face, thirty seconds on the belly, and a ten-second finish to lift that pocket of steam inside the crumb. You taste the puff immediately in our Migas and Potato & Bean orders.',
        ],
      },
    ],
    specBox: {
      title: 'Morning Comal Run Specs',
      items: [
        { label: 'Daily corn batch', value: '110 lb Concho Valley yellow dent' },
        { label: 'Cook & steep', value: '42 min simmer · 11 hr steep in nejayote' },
        { label: 'Comal surface', value: '435°F seasoned carbon steel' },
        { label: 'Daily press count', value: '1,200 tortillas before 2:00 PM' },
      ],
    },
    ctaLabel: 'Build Your Morning Pickup Bag',
    ctaAction: 'taco-order',
  },
  {
    id: 'taco-brisket',
    eyebrow: 'Comal Dispatch No. 02',
    category: 'Offset Smoker',
    title: 'Twelve Hours Over Post Oak: Smoking Brisket Specifically for a Tortilla',
    dek: 'Plate-cut barbecue leans thick and dramatic for butcher paper trays. Taco brisket needs smaller bark cubes and rendered cap fat that stays tender without soggy bottoms.',
    author: 'Carla Vance',
    role: 'Pit & Line Lead',
    date: 'Nov 08, 2026',
    readTime: '4 min read',
    image: '/showcase/taco/brisket.webp',
    imageAlt: 'Smoked brisket resting on butcher paper beside warm tortillas',
    pullQuote: 'If you have to tug a slice of brisket with your teeth, the tortilla falls apart in your lap.',
    sections: [
      {
        heading: 'Trimming for bite-sized foldability',
        paragraphs: [
          'Our offset pit burns split Bastrop post oak starting at 7:00 PM each evening. Before seasoning with 16-mesh black pepper and kosher salt, we trim every prime packer closer to a quarter-inch fat cap than classic tray BBQ uses, keeping only the soft deckle seam that renders completely overnight.',
          'At 168 degrees internal, once the bark sets a deep mahogany color, each brisket goes into unbleached peach butcher paper slick with rendered brisket tallow from the previous morning trimmings. That braise carries the flat past stall into clean tenderness by 6:45 AM.',
        ],
      },
      {
        heading: 'Chopping point and flat together to order',
        paragraphs: [
          'Instead of slicing long strips that pull out whole on the first bite, our line cooks chop warm point and moist flat together on an end-grain maple block as tickets print. Every scoop keeps salty bark, juicy muscle, and rich intramuscular fat distributed evenly from end to end.',
          'Topped with pickled red onion and bright tomatillo salsa verde, the acidity cuts right through twelve hours of oak smoke.',
        ],
      },
    ],
    specBox: {
      title: 'Pit & Holding Schedule',
      items: [
        { label: 'Fuelwood', value: 'Seasoned Bastrop post oak splits' },
        { label: 'Firebox load', value: '7:00 PM night prior · 260°F steady draft' },
        { label: 'Paper wrap', value: '168°F in beef-tallow butcher paper' },
        { label: 'Warm hold rest', value: '3 hrs in 148°F insulated cabinet' },
      ],
    },
    ctaLabel: 'Add Smoked Brisket Taco ($5.50)',
    ctaAction: 'add-brisket',
  },
  {
    id: 'taco-salsas',
    eyebrow: 'Comal Dispatch No. 03',
    category: 'Salsa Program',
    title: 'A Field Guide to Our Four Counter Salsas (And What Regulars Pair Them With)',
    dek: 'Why heat belongs after flavor, how 48-hour fermented carrots tame habanero fire, and which cup belongs on eggs vs. smoked meat.',
    author: 'Mateo Reyes',
    role: 'Head Comalero',
    date: 'Nov 02, 2026',
    readTime: '3 min read',
    image: '/showcase/taco/salsas.webp',
    imageAlt: 'Four house salsa bowls with fresh limes on a wood counter',
    sections: [
      {
        heading: 'Roasting and fermenting in two daily batches',
        paragraphs: [
          'Cold grocery salsa hides flat tomatoes behind raw vinegar. Every morning at 7:00 AM and again at noon, our prep station blackens whole tomatillos, plum tomatoes, and white onions directly over the flat-top until skins blister before blending coarse so seeds stay intact.',
          'Our Habanero Hot earns its cult following through patience rather than novelty sting: sweet yellow carrots, garlic cloves, and orange habaneros sit under a 2.5% salt brine for forty-eight hours first, rounding sharp capsaicin into bright citrus aroma.',
        ],
      },
      {
        heading: 'How Austin regulars mix cups',
        paragraphs: [
          'If you order Bacon, Egg & Cheese or Potato & Bean, bright Roja cuts rich melted cheddar without hiding smoky bacon. Smoked Brisket wants Verde’s raw cilantro snap, while Crispy Fish shines under a half-spoon of golden Habanero.',
          'Weekends add our smoky chipotle Morita, simmered slowly with charred pineapple cores and cider vinegar until sweet heat clings to pork al pastor or chopped oak brisket.',
          'Every pickup order includes your first two salsa cups free at the counter window—and half-pint glass jars travel straight into weekend cooler packs for breakfast tacos at home.',
        ],
      },
    ],
    table: {
      caption: 'Counter Salsa Heat & Pairing Reference',
      columns: ['Salsa', 'Heat Level', 'Primary Chiles & Base', 'Best Taco Pairing'],
      rows: [
        ['Verde', 'Mild · 1,500 SHU', 'Blistered tomatillo, serrano, cilantro', 'Smoked brisket, Migas'],
        ['Roja', 'Medium · 6,000 SHU', 'Toasted chile de árbol, garlic, tomato', 'Bacon, egg & cheese, Al pastor'],
        ['Habanero', 'Hot · 45,000 SHU', '48-hr fermented carrot & orange habanero', 'Crispy fish, Potato & bean'],
        ['Morita (Weekend)', 'Warm · 11,000 SHU', 'Chipotle morita, roasted pineapple', 'Al pastor, Brisket'],
      ],
    },
    ctaLabel: 'Switch Bag Salsa to Habanero',
    ctaAction: 'salsa-habanero',
  },
];

/* ============================================================================
 * 2 · BANK STUDIO EDITORIAL & SECONDARY DATA
 * ========================================================================== */
export interface BankOfficer {
  name: string;
  role: string;
  ext: string;
  specialty: string;
}

export const BANK_OFFICERS: BankOfficer[] = [
  { name: 'Hannah Mueller', role: 'SVP Treasury & Deposits', ext: 'Ext. 204', specialty: 'CD ladders & business reserves' },
  { name: 'Sarah Lindner', role: 'VP Commercial & Ag Lending', ext: 'Ext. 211', specialty: 'Equipment loans, ranch & SBA notes' },
  { name: 'David Koenig', role: 'Operations & Wire Security', ext: 'Ext. 218', specialty: 'Positive Pay, wire callbacks & fraud' },
];

export interface FdicCategory {
  id: string;
  label: string;
  coverageLimit: number;
  note: string;
}

export const FDIC_CATEGORIES: FdicCategory[] = [
  { id: 'single', label: 'Individual Checking / CD', coverageLimit: 250000, note: 'Separate $250,000 limit per sole owner' },
  { id: 'joint', label: 'Joint Family Account (2 owners)', coverageLimit: 500000, note: '$250,000 per co-owner in joint ownership' },
  { id: 'business', label: 'Incorporated Business (LLC / S-Corp)', coverageLimit: 250000, note: 'Distinct $250,000 coverage separate from personal accounts' },
  { id: 'ira', label: 'Certain Retirement Accounts (IRA CD)', coverageLimit: 250000, note: 'Separately insured up to $250,000 total' },
];

const BANK_ARTICLES: StudioArticle[] = [
  {
    id: 'bank-cd-ladder',
    eyebrow: 'Treasury Bulletin · Issue 48',
    category: 'Treasury & Reserves',
    title: 'How Small Businesses Structure a 6-, 12-, and 24-Month CD Ladder Without Locking Up Payroll',
    dek: 'Keeping working reserves idle in a zero-interest megabank account quietly forfeits thousands a year. A split-maturity ladder puts idle cash to work while keeping quarterly tax reserves liquid.',
    author: 'Hannah Mueller',
    role: 'SVP Treasury · Ext. 204',
    date: 'Nov 11, 2026',
    readTime: '4 min read',
    image: '/showcase/bank/lobby.webp',
    imageAlt: 'Hill Country Community Bank lobby desk with treasury officer',
    pullQuote: 'A treasury plan should never force an owner to break a CD early just to make Friday payroll.',
    sections: [
      {
        heading: 'Match maturities to known tax and equipment dates',
        paragraphs: [
          'Most contractors, vineyards, and medical practices across Gillespie County keep two to four months of operating expense sitting untouched in business checking—often earning 0.01% to 0.45% APY at national chains. Locking the entire cushion into one two-year certificate feels risky whenever truck repairs or seasonal inventory bills land unexpectedly.',
          'Splitting a $75,000 reserve into three equal $25,000 rungs maturing at 6, 12, and 24 months solves both problems cleanly. Every six to twelve months, a tranche comes liquid at par with zero early-withdrawal penalty, ready for payroll swings or automatic renewal into whichever term pays the strongest curve.',
        ],
      },
      {
        heading: 'Local flexibility on early penalty waivers',
        paragraphs: [
          'Unlike out-of-state call centers governed by rigid scripts, our Fredericksburg branch tracks business seasonal cycles personally. If an unexpected storm repair requires tapping your 24-month rung early, you walk across Main Street and talk with the treasury officer on your signature card.',
          'Running the numbers takes ten seconds: a $75,000 ladder held one year at our posted rates earns roughly $3,025 compared with $337 at a 0.45% megabank sweep.',
        ],
      },
    ],
    table: {
      caption: 'Illustrative $75,000 Small-Business Reserve Ladder (Monday Posted Rates)',
      columns: ['Tranche', 'Principal', 'Posted Term Rate', 'Est. Annual Yield', 'Primary Purpose'],
      rows: [
        ['Rung 1 (6-Month)', '$25,000', '3.90% APY', '+$975 / yr equiv.', 'Quarterly IRS taxes & spring repair cushion'],
        ['Rung 2 (12-Month)', '$25,000', '4.15% APY', '+$1,038 / yr', 'Peak annual reserve anchor'],
        ['Rung 3 (24-Month)', '$25,000', '4.05% APY', '+$1,013 / yr', 'Rate protection & future truck replacement'],
      ],
    },
    ctaLabel: 'Load $75,000 Preset into CD Calculator',
    ctaAction: 'cd-75k',
  },
  {
    id: 'bank-loan-committee',
    eyebrow: 'Credit Desk · Issue 47',
    category: 'Local Underwriting',
    title: 'What Our Fredericksburg Loan Committee Actually Looks At on Equipment & Ranch Applications',
    dek: 'National SBA portals run rigid automated ratios and send rejection emails three weeks later. Here is what our local weekly committee actually reads around the table on Wednesday mornings.',
    author: 'Sarah Lindner',
    role: 'VP Commercial & Ag Lending · Ext. 211',
    date: 'Oct 29, 2026',
    readTime: '4 min read',
    image: '/showcase/bank/main-street.webp',
    imageAlt: 'Historic Texas Hill Country limestone storefronts along Main Street',
    pullQuote: 'We know what drought years and peach harvest timing look like on a cash-flow sheet because we live here too.',
    sections: [
      {
        heading: 'Real operating context beats automated credit scoring',
        paragraphs: [
          'Out-of-state underwriters routinely flag rural Hill Country businesses when fourth-quarter tax depreciation drops net taxable income below arbitrary formulas, even when actual cash receipts cover equipment payments three times over. Every Wednesday at 8:30 AM, five officers right here on West Main read the full story directly with your lender.',
          'Whether you are financing a skid steer, expanding a tasting room patio, or replacing delivery vans, our committee weighs three straight seasons of deposit stability alongside itemized equipment quotes rather than an algorithm trained on urban chain franchises.',
        ],
      },
      {
        heading: 'Why 24-hour committee turnarounds save equipment deals',
        paragraphs: [
          'Good auction lots and dealer inventory do not wait twenty-one business days for Dallas or Charlotte headquarters sign-off. Bring clean prior-year returns and the dealer bill of sale on Monday afternoon, and Sarah can typically issue a committed term sheet Thursday morning.',
        ],
      },
    ],
    checklist: {
      title: 'Bring These 4 Items to Your 20-Minute Loan Visit',
      items: [
        'Last 2 federal business & personal tax returns (complete schedules)',
        'Year-to-date profit & loss statement plus current balance sheet',
        'Itemized vendor quote, serial number, or auction bill of sale',
        '3 recent monthly bank statements (waived for existing depositors)',
      ],
    },
    ctaLabel: 'Switch Calculator to Equipment Loan Mode',
    ctaAction: 'loan-committee',
  },
  {
    id: 'bank-wire-fraud',
    eyebrow: 'Security Advisory · Issue 46',
    category: 'Wire & Fraud Defense',
    title: 'Spotting Contractor & Real-Estate Wire Fraud Before Money Leaves Your Account',
    dek: 'Spoofed title-company emails and altered PDF invoices hit local builders hardest on closing week. Our dual-control callback rule stops bogus transfers cold.',
    author: 'David Koenig',
    role: 'Operations & Wire Security · Ext. 218',
    date: 'Oct 14, 2026',
    readTime: '3 min read',
    image: '/showcase/bank/mobile.webp',
    imageAlt: 'Business owner reviewing verified account activity on mobile banking',
    sections: [
      {
        heading: 'How compromised vendor inbox attacks unfold',
        paragraphs: [
          'Nearly every wire loss across Central Texas starts identically: an attacker compromises an email thread between a title company or subcontractor, waits until 48 hours before a closing draw, and sends a reply updating routing instructions from a single-letter lookalike domain.',
          'Once an outgoing Fedwire clears, recovering funds from an offshore mule account is almost impossible. Treating last-minute instruction changes inside email as hostile until proven otherwise eliminates ninety-five percent of wire exposure.',
        ],
      },
      {
        heading: 'Mandatory 90-second voice callback & Positive Pay',
        paragraphs: [
          'Every outgoing domestic wire over $10,000 requested at Hill Country Community Bank receives a mandatory voice callback to a phone number independently recorded on your signature card—never a callback number typed inside an email signature.',
          'We also pair commercial checking accounts with automated Positive Pay check matching and ACH debit blocks so unauthorized vendor drafts bounce before clearing. Whenever an unfamiliar ACH batch hits overnight, our Fredericksburg operations desk pauses settlement and texts your authorized signers for morning confirmation before any cash leaves Gillespie County.',
        ],
      },
    ],
    ctaLabel: 'Book a Wire & Security Review with David',
    ctaAction: 'bank-concierge',
  },
];

/* ============================================================================
 * 3 · SALON STUDIO EDITORIAL & SECONDARY DATA
 * ========================================================================== */
export const SALON_GROWOUT_TAGS: Record<string, string> = {
  'Signature cut': '60 min · 8–10 wk grow-out',
  'Short cut & clean-up': '45 min · Neckline detail',
  'Kids (under 12)': '35 min · Gentle detangle',
  'All-over color': '105 min · Bond builder',
  'Lived-in highlights': '150 min · 12–16 wk blend',
  Gloss: '45 min · Ammonia-free shine',
  Blowout: '45 min · Round brush or diffuse',
  'Event styling': '60 min · Pin-safe prep',
  'Deep conditioning': '20 min · Steam wrap',
};

export interface SalonStylistProfile {
  name: string;
  matcherValue: string;
  role: string;
  specialty: string;
  bio: string;
  favoriteFormula: string;
  image: string;
  imageAlt: string;
}

export const SALON_STYLIST_PROFILES: SalonStylistProfile[] = [
  {
    name: 'Maya Lin',
    matcherValue: 'Maya Lin · Cut & Texture',
    role: 'Founder & Principal Stylist · 12 yrs',
    specialty: 'Dry sculptural cuts, French bobs & architectural fringe',
    bio: 'Maya trained in Seattle and Denver cutting low-maintenance shapes tailored to how your hair dries naturally on chaotic Tuesday mornings.',
    favoriteFormula: 'Internal point-cutting + dry collarbone refinement',
    image: '/showcase/salon/consult.webp',
    imageAlt: 'Maya Lin consulting beside mirrors and green studio plants',
  },
  {
    name: 'Elena Rostova',
    matcherValue: 'Elena Rostova · Lived-In Color',
    role: 'Lead Colorist · 9 yrs',
    specialty: 'Sun-soft balayage, grey blending & root-shadowed blondes',
    bio: 'Elena paints fine ribbon placement three-quarters inch off the scalp so regrowth stays seamless past week fourteen without brassiness.',
    favoriteFormula: 'Custom demi-permanent gloss + Front Range chelating rinse',
    image: '/showcase/salon/chair.webp',
    imageAlt: 'Salon styling chair and round mirror bathed in afternoon light',
  },
  {
    name: 'Devon Brooks',
    matcherValue: 'First Available Senior Stylist',
    role: 'Curl & Texture Specialist · 8 yrs',
    specialty: 'Air-dried coils, layered shags & short tapered crops',
    bio: 'Devon works coil-by-coil on dry hair before a moisture-rich cleanse, teaching you how to style using two lightweight products you already own.',
    favoriteFormula: 'Mineral detox soak + leave-in hydration diffuse set',
    image: '/showcase/salon/finish.webp',
    imageAlt: 'Finished soft textured haircut photographed in natural daylight',
  },
];

const SALON_ARTICLES: StudioArticle[] = [
  {
    id: 'salon-denver-humidity',
    eyebrow: 'Chair Journal · Essay 01',
    category: 'Hair & Climate',
    title: 'Why Denver’s Mile-High Humidity Changes How Your Haircut Behaves at Week Six',
    dek: 'Techniques invented for sea-level salon floors puff outward or turn brittle in Colorado winters. Cutting for 22% relative humidity starts before a drop of water touches your hair.',
    author: 'Maya Lin',
    role: 'Founder & Senior Cutter',
    date: 'Nov 10, 2026',
    readTime: '4 min read',
    image: '/showcase/salon/hero.webp',
    imageAlt: 'Maple & Mirror Hair Studio interior filled with daylight and greenery',
    pullQuote: 'A good haircut passes the mirror test in the parking lot; a great one passes the mirror test six weeks later in January.',
    sections: [
      {
        heading: 'Cutting wet elasticity vs. dry natural silhouette',
        paragraphs: [
          'Wet hair stretches up to thirty percent longer than its resting state, especially around cowlick crowns and Highland winds. When stylists tension-cut everything sopping wet using coastal layer templates, ends spring unevenly once dry Colorado air draws out excess moisture two weeks later.',
          'At Maple & Mirror we map your natural fall, part habit, and cowlick bounce dry first, removing bulk through internal channel slicing with sharp Japanese shears rather than jagged thinning blades that fray cuticles under dry winter static.',
        ],
      },
      {
        heading: 'Solving Front Range hard-water mineral weight',
        paragraphs: [
          'Denver tap calcium gradually coats blondes and fine waves, creating stiff mid-shaft tangles that look split even right after a trim. Pairing a two-minute chelating rinse every fourth appointment restores elasticity without heavy silicones. After windy winter weekends in Summit County well water, emulsifying two drops of pure jojoba oil between damp palms shields the ends against single-digit cabin humidity before you step onto LoHi sidewalks.',
        ],
      },
    ],
    specBox: {
      title: 'Between-Visit Highlands Routine',
      items: [
        { label: 'Wash cadence', value: 'Every 3–4 days to preserve scalp barrier' },
        { label: 'Hard-water reset', value: 'Monthly gentle chelating shampoo' },
        { label: 'Heat rule', value: 'Never pass irons above 320°F in dry air' },
        { label: 'Included at chair', value: '60 full minutes, gratuity always built in' },
      ],
    },
    ctaLabel: 'Book Signature Cut with Maya ($85)',
    ctaAction: 'book-cut-maya',
  },
  {
    id: 'salon-lived-in-color',
    eyebrow: 'Chair Journal · Essay 02',
    category: 'Transparent Pricing',
    title: 'Lived-In Highlights vs. All-Over Color: An Honest 12-Month Cost & Upkeep Breakdown',
    dek: 'Clients frequently assume softer dimensional highlights cost more across a year than single-process touch-ups. Do the calendar math and the opposite is usually true.',
    author: 'Elena Rostova',
    role: 'Lead Colorist',
    date: 'Oct 27, 2026',
    readTime: '4 min read',
    image: '/showcase/salon/finish.webp',
    imageAlt: 'Soft blended waves showing natural dimension',
    pullQuote: 'Great color gives you back Saturday mornings instead of chaining your calendar to four-week root lines.',
    sections: [
      {
        heading: 'Counting chair visits across twelve months',
        paragraphs: [
          'Solid root-to-tip tint delivers crisp uniform richness, yet clear demarcation lines appear on the scalp right around day twenty-eight. Maintaining spotless coverage asks for nine to ten studio visits a year plus mid-year shine refreshes.',
          'Lived-in hand painting with a soft root melt leaves subtle natural depth at the crown so new growth melts invisibly outward. Two full lightening appointments plus two quick $60 tone glosses keep hair bright all four seasons while slashing total salon hours by more than half.',
        ],
      },
      {
        heading: 'Gratuity-free menu prices mean real budgeting',
        paragraphs: [
          'Every service number at Maple & Mirror is all-in with zero percentage tip calculations at the front desk, so $185 truly means $185 before you step into the Highlands. During each consultation, we map out your next three calendar visits upfront so neither your hair health nor your household budget takes a surprise hit.',
        ],
      },
    ],
    table: {
      caption: 'Honest 12-Month Denver Salon Calendar & Spend Comparison',
      columns: ['Service Path', 'Visits / Year', 'Upkeep Cadence', 'Estimated Annual Total'],
      rows: [
        ['Lived-In Highlights + 2 Glosses', '4 visits', 'Refresh every 14–16 wks', '$490 / yr ($185 × 2 + $60 × 2)'],
        ['Single-Process All-Over Color', '8–10 visits', 'Roots every 5–6 wks', '$960–$1,200 / yr ($120 × 8–10)'],
        ['Signature Cut + Gloss Combo', '5–6 visits', 'Shape every 8–10 wks', '$510 / yr cut + optional gloss'],
      ],
    },
    ctaLabel: 'Match Lived-In Highlights with Elena',
    ctaAction: 'book-highlights-elena',
  },
  {
    id: 'salon-consultation',
    eyebrow: 'Chair Journal · Essay 03',
    category: 'First Visit Guide',
    title: 'What to Bring (and Skip) for Your First Fifteen-Minute Consultation',
    dek: 'A clear reference photo saves half an hour of guesswork—and knowing whether to bring quiet conversation or work headphones makes the hour genuinely restorative.',
    author: 'Devon Brooks',
    role: 'Curl & Texture Specialist',
    date: 'Oct 15, 2026',
    readTime: '3 min read',
    image: '/showcase/salon/consult.webp',
    imageAlt: 'Client and stylist discussing length with reference notes',
    sections: [
      {
        heading: 'How to pick useful reference photos',
        paragraphs: [
          'Save two photos whose hair thickness and curl pattern resemble yours rather than polished studio wig campaigns: one cut shape you admire and one length you definitely want to avoid. That boundary tells a stylist far more than vague terms like “layers” or “not too short.”',
          'For curly or coily dry cuts, arrive with hair worn down and air-dried in your usual everyday cream so each curl cluster hangs honestly in its natural state before we touch a pair of shears. Pulling damp curls back into a morning elastic flattens crown volume and hides where your springiest bends naturally sit around the jawline.',
        ],
      },
      {
        heading: 'Quiet chairs are always welcome',
        paragraphs: [
          'After the first fifteen-minute plan check-in, let your stylist know anytime you prefer a Quiet Chair hour to read, answer messages, or decompress in silence while soothing warm towel compresses finish your wash. No awkwardness—just unhurried Highlands craft designed around how you actually recharge after a long work week.',
        ],
      },
    ],
    ctaLabel: 'Choose a Haircut & Chair Opening',
    ctaAction: 'salon-matcher',
  },
];

/* ============================================================================
 * 4 · OFFICE STUDIO EDITORIAL & SECONDARY DATA
 * ========================================================================== */
export interface TaxDeadlineRow {
  date: string;
  jurisdiction: 'Federal IRS' | 'Ohio IT 1040' | 'Columbus / RITA' | 'Employers';
  filing: string;
  whoNeedsIt: string;
}

export const OFFICE_2026_DEADLINES: TaxDeadlineRow[] = [
  { date: 'Feb 02, 2026', jurisdiction: 'Employers', filing: 'Forms 1099-NEC & W-2 to contractors/staff', whoNeedsIt: 'Any business paying contractors $600+ or W-2 staff' },
  { date: 'Mar 16, 2026', jurisdiction: 'Federal IRS', filing: 'Forms 1120-S & 1065 + K-1 distribution', whoNeedsIt: 'Ohio LLCs taxed as S-Corporations or Partnerships' },
  { date: 'Apr 15, 2026', jurisdiction: 'Federal IRS', filing: 'Form 1040, Schedule C & Q1 Estimated Voucher', whoNeedsIt: 'Individuals, sole proprietors & single-member LLCs' },
  { date: 'Apr 15, 2026', jurisdiction: 'Ohio IT 1040', filing: 'Ohio Individual & School District Return (SD 100)', whoNeedsIt: 'All Ohio residents & Columbus/suburb taxpayers' },
  { date: 'Apr 15, 2026', jurisdiction: 'Columbus / RITA', filing: 'Columbus Income Tax CR / RITA Form 37', whoNeedsIt: 'Residents & small firms in RITA or municipal zones' },
  { date: 'Jun 15 · Sep 15', jurisdiction: 'Federal IRS', filing: 'Q2 & Q3 Federal & Ohio Estimated Payments', whoNeedsIt: 'Owners with profit not covered by W-2 withholding' },
];

const OFFICE_ARTICLES: StudioArticle[] = [
  {
    id: 'office-scorp-election',
    eyebrow: 'MEMO 2026-01 · S-Corp & LLC',
    category: 'S-Corp & LLC',
    title: 'When Switching Your Ohio LLC to an S-Corp Actually Saves Money (And When Payroll Fees Eat It)',
    dek: 'Every business Facebook group repeats the S-Corp cliché around year two. Run the actual Form 1120-S and Gusto overhead math before filing Form 2553.',
    author: 'Rebecca Nair, CPA',
    role: 'Managing Partner · Permit #OH-44912',
    date: 'Nov 14, 2026',
    readTime: '4 min read',
    image: '/showcase/office/pricing.webp',
    imageAlt: 'Printed flat-fee CPA scope comparison sheet on a bright office desk',
    bottomLine: 'Bottom line: Keep a simple Schedule C LLC below $75,000 net profit; above ~$85,000, Form 2553 saves real cash even after payroll fees.',
    sections: [
      {
        heading: 'How 15.3% self-employment tax creates a gap',
        paragraphs: [
          'As a default single-member Ohio LLC, every dollar of net Schedule C profit incurs 15.3% federal self-employment tax on top of ordinary income and municipal taxes. Electing S-Corporation tax status via Form 2553 lets working owners split profit between a defensible W-2 reasonable salary (subject to payroll tax) and owner distributions (exempt from that 15.3% levy).',
          'However, S-Corp life introduces real compliance friction: running monthly payroll, state unemployment registrations, workers compensation minimums, and preparing Form 1120-S cleanly every March.',
        ],
      },
      {
        heading: 'Where Ohio numbers cross the true breakeven line',
        paragraphs: [
          'Below $75,000 net business income, software fees plus corporate return preparation routinely eat nearly all the payroll tax reduction. Once consistent annual net clears $90,000 or higher, splitting $52,000 W-2 salary with the remainder taken as distributions typically puts $3,800 to $8,400 back in the owner’s checking account every single year.',
          'At Brightline, we project exact W-2 salary defensibility in plain English during your Q3 check-in instead of charging surprise April amendment bills.',
        ],
      },
    ],
    table: {
      caption: 'Estimated Net Annual Impact After Payroll & Form 1120-S Overhead',
      columns: ['Annual Net Profit', 'Recommended Ohio Structure', 'Gross Tax Saved', 'Net Cash Kept After Fees'],
      rows: [
        ['$60,000 / yr', 'Keep Single-Member LLC (Sch. C)', '~$1,300', '-$400 net loss after overhead'],
        ['$95,000 / yr', 'Elect S-Corp (Form 2553)', '~$5,400', '+$3,600 net savings / yr'],
        ['$160,000 / yr', 'S-Corp + Solo 401(k) Match', '~$10,600', '+$8,400 net savings / yr'],
      ],
    },
    ctaLabel: 'Price This LLC / S-Corp Scope ($620/mo est.)',
    ctaAction: 'scope-scorp',
  },
  {
    id: 'office-columbus-rita',
    eyebrow: 'MEMO 2026-02 · Payroll',
    category: 'Payroll',
    title: 'Columbus, RITA, and Ohio School District Withholding: Avoiding Hybrid Payroll Penalties',
    dek: 'Central Ohio has one of the trickiest municipal tax patchworks in the Midwest. One wrong W-2 school district box triggers automated penalty letters eighteen months later.',
    author: 'Thomas Gallagher, CPA',
    role: 'Director of Payroll & Municipal Tax',
    date: 'Nov 03, 2026',
    readTime: '3 min read',
    image: '/showcase/office/call.webp',
    imageAlt: 'CPA reviewing municipal withholding setup on a video consultation',
    bottomLine: 'Bottom line: Verify employees’ home 4-digit Ohio school district codes and Columbus/RITA reciprocity credits every January.',
    sections: [
      {
        heading: 'Why Columbus workplace rate differs from suburban RITA residences',
        paragraphs: [
          'When an HVAC tech lives in Westerville or Grove City (administered by RITA) and works out of a Columbus dispatch yard (2.5% municipal rate), workplace withholding satisfies most obligations—except when residence municipalities cap reciprocity credits below 100%, or when remote staff log three days a week from home desks outside city limits.',
          'Adding insult to paperwork, Ohio public school districts use four-digit codes printed inside W-2 Box 20 that generic national payroll platforms regularly skip unless configured cleanly at onboarding.',
        ],
      },
      {
        heading: 'Our quarterly payroll sanity sweep',
        paragraphs: [
          'Included on our Books + Payroll plan, Thomas audits local tax jurisdictions against employee home street addresses and remote-work logs every quarter before Q1 W-2s go out—catching missing RITA registrations or courtesy-withholding gaps well before penalty notices and compounded municipal interest accrue. We also file annual Form RITA-17 workplace reconciliations by February 28 and issue updated courtesy-withholding election forms whenever a hybrid employee moves across Franklin or Delaware County lines.',
        ],
      },
    ],
    ctaLabel: 'Book 20-Min Payroll & Tax Call',
    ctaAction: 'office-call',
  },
  {
    id: 'office-monthly-close',
    eyebrow: 'MEMO 2026-03 · Bookkeeping',
    category: 'Bookkeeping',
    title: 'Five Monthly Bookkeeping Habits That Cut Year-End Tax Prep in Half',
    dek: 'Clean year-end tax returns are built in ten tidy minutes per month rather than one panicked shoebox Sunday every March.',
    author: 'Priya Deshmukh, EA',
    role: 'Client Accounting Manager',
    date: 'Oct 22, 2026',
    readTime: '3 min read',
    image: '/showcase/office/meeting.webp',
    imageAlt: 'Accounting team reviewing monthly clean reconciliation numbers',
    bottomLine: 'Bottom line: Collect contractor W-9s before issuing Check #1 and log Stripe gross sales separately from processing fees.',
    sections: [
      {
        heading: 'Four cleanup leaks that inflate accounting bills elsewhere',
        paragraphs: [
          'When solo owners pay a contractor $1,400 over Zelle in June and chase their W-9 in January, nobody wants to pick up the phone. Making a completed W-9 + ACH form the gatekeeper before sending invoice #1 turns January 1099-NEC filings into a 15-minute click.',
          'Similarly, booking raw Square or Stripe net deposits straight to Revenue hides merchant processing fees—and occasionally hides sales tax liability sitting inside gross ticket totals.',
        ],
      },
      {
        heading: 'Dedicated business plastic + 24-hr written answers',
        paragraphs: [
          'Keeping 100% of personal groceries off your business debit card lets our QuickBooks reconciliations lock by the 10th of each following month with clear profit-and-loss visibility. Whenever a confusing vehicle lease or contractor invoice lands mid-month, send a quick note and get a direct CPA/EA answer inside one business day rather than saving questions for next spring. Attaching PDF equipment bills over $2,500 straight to fixed-asset ledger lines at purchase time means Section 179 depreciation choices take minutes in February.',
        ],
      },
    ],
    checklist: {
      title: '10-Minute Monthly Owner Close Checklist',
      items: [
        'One business checking + one card (zero personal grocery swipes)',
        'Upload digital receipts over $75 straight from camera to QuickBooks',
        'Collect Form W-9 before cutting any contractor’s first check',
        'Record Square / Stripe gross sales & fee deductions separately',
        'Reply to Brightline’s 3-question monthly Slack/email recap by the 8th',
      ],
    },
    ctaLabel: 'Calculate Solo Bookkeeping Scope',
    ctaAction: 'scope-bookkeeping',
  },
  {
    id: 'office-irs-notices',
    eyebrow: 'MEMO 2026-04 · IRS Notices',
    category: 'IRS Notices',
    title: 'Opened an IRS CP2000 or Ohio Tax Notice? Check These Three Lines Before Paying',
    dek: 'Roughly two out of five automated under-reporter letters misread stock cost basis or split spousal estimated payments. Never write a knee-jerk check until you read Page 3.',
    author: 'Rebecca Nair, CPA',
    role: 'Managing Partner · Permit #OH-44912',
    date: 'Oct 08, 2026',
    readTime: '3 min read',
    image: '/showcase/office/hero.webp',
    imageAlt: 'Accountants seated calmly at Brightline Columbus conference table',
    bottomLine: 'Bottom line: Upload both front and back pages to our SOC-2 client portal within 10 days—never mail a check on an automated CP2000.',
    sections: [
      {
        heading: 'Automated matching computers omit context constantly',
        paragraphs: [
          'The IRS AUR computer system compares raw W-2, 1099-K, and brokerage totals against summary lines before reading your explanatory statements. That triggers scary multi-thousand-dollar CP2000 proposed assessments whenever payment apps report gross reimbursements or rollovers omit a checkbox.',
          'Ohio Department of Taxation computers generate similar mismatch letters when RITA municipal credits or estimated vouchers cross SSNs on married joint returns.',
        ],
      },
      {
        heading: 'Exact response cadence inside every flat-fee plan',
        paragraphs: [
          'Every Brightline monthly plan covers notice triage without surprise hourly retainer invoices: photograph every numbered page cleanly, upload once through our encrypted client portal within ten days of receipt, and let Rebecca’s team cross-check your original tax transcript against the IRS proposed lines before preparing a certified response packet well ahead of the thirty-day cutoff. With a limited Form 2848 Power of Attorney on file, we pull official Wage and Income transcripts ourselves instead of leaving you on hold with the IRS phone queue for three hours.',
        ],
      },
    ],
    ctaLabel: 'Schedule Notice Triage Call',
    ctaAction: 'office-call',
  },
];

/* ============================================================================
 * 5 · PORTFOLIO STUDIO CASE DEEP-DIVES, ESSAYS & COLOPHON
 * ========================================================================== */
export const PORTFOLIO_CASE_STUDIES: StudioArticle[] = [
  {
    id: 'case-fieldnote',
    eyebrow: 'Case Deep-Dive · 01',
    category: 'iOS & Field Product',
    title: 'Fieldnote: Designing One-Thumb Crop Logging for Muddy Gloves and Zero Cell Bars',
    dek: 'Four days shadowing hazelnut and berry growers in Oregon’s Willamette Valley revealed why 74% of farm trials abandoned setup before recording their first acre.',
    author: 'Jordan Lee',
    role: 'Principal Product Designer',
    date: '2026 · AgTech Mobile',
    readTime: '4 min read',
    image: '/showcase/portfolio/fieldnote.webp',
    imageAlt: 'Fieldnote iOS crop logging app held in a sunlit farm field',
    pullQuote: 'If a grower has to take off work gloves to type into nine small dropdowns beside a running tractor, they go back to a pocket notebook.',
    sections: [
      {
        heading: 'The hidden friction: forcing desktop farm setup on day one',
        paragraphs: [
          'Fieldnote’s original trial forced every farmer through a nine-screen web wizard importing shapefile parcel boundaries, soil lab IDs, and staff roles before letting anyone snap a single field photo. Growers downloaded the app while standing outside a barn with one bar of LTE, hit Screen 3, and never returned.',
          'Spending Tuesday through Friday riding shotgun in dusty pickups gave us an unmistakable constraint: zero typing in bright sunlight, 56px minimum thumb controls, and immediate local capture even forty miles outside Verizon coverage.',
        ],
      },
      {
        heading: 'Rebuilding onboarding around instant GPS plot detection',
        paragraphs: [
          'We compressed setup to three taps: snap or dictate a two-second field note right from launch, auto-detect plot boundaries silently using background Oregon county GIS tiles, and sync deferred voice transcriptions only once the truck drives back within barn Wi-Fi range.',
          'Within sixty days of shipping the redesigned iOS + Swift builds, first-plot completion dropped from twelve minutes to under three minutes, boosting paid season retention by 38%.',
        ],
      },
    ],
    specBox: {
      title: 'Fieldnote Shipped Outcomes',
      items: [
        { label: 'Setup drop', value: '12 min → 3 min (-75% time to log)' },
        { label: 'Retention lift', value: '+38% 60-day paid farm retention' },
        { label: 'Tap floor', value: '56px gloves-on primary action bar' },
        { label: 'Delivered', value: 'Offline Swift specs, Figma tokens & QA' },
      ],
    },
    ctaLabel: 'Scope a 2-Week Product Sprint ($9,000)',
    ctaAction: 'sprint-2wk',
  },
  {
    id: 'case-ledgerly',
    eyebrow: 'Case Deep-Dive · 02',
    category: 'FinTech Web App',
    title: 'Ledgerly: From Blank Repo to Paying Freelancers in Fourteen Weeks with Four Engineers',
    dek: 'Early invoicing tools drown solo contractors in ERP settings before their first dollar lands. Here is how cutting sixty percent of initial scope shipped a calmer product on time.',
    author: 'Jordan Lee',
    role: 'Principal Product Designer',
    date: '2026 · FinTech Web',
    readTime: '4 min read',
    image: '/showcase/portfolio/ledgerly.webp',
    imageAlt: 'Ledgerly minimal dark-mode invoicing workspace on a laptop',
    pullQuote: 'Most independent contractors send eight invoices a month—they want to preview the exact PDF email their client sees, not configure chart-of-accounts trees.',
    sections: [
      {
        heading: 'Cutting premature multi-currency & tax engine scope in Week 2',
        paragraphs: [
          'When Ledgerly’s founding CTO brought an eighteen-tab spreadsheet spec for V1, three engineers were slated to spend six weeks building multi-org tax rulesets for five hundred solo designers and photographers who only billed US ACH clients.',
          'Running rapid customer tests in Week 1 proved users cared deeply about two moments: editing line items live beside what the client receives, and knowing instantly when ACH funds cleared.',
        ],
      },
      {
        heading: 'Shipping an accessible split-pane composer directly in PRs',
        paragraphs: [
          'We built the core invoice composer as a side-by-side live document editor where keyboard Tab movement updates the preview instantaneously with zero modal detours. I shipped React + Tailwind token PRs alongside the engineers every Thursday.',
          'Result: closed beta launched cleanly in fourteen weeks on budget, reaching 1,400 paid invoices in month two.',
        ],
      },
    ],
    specBox: {
      title: 'Ledgerly Shipped Outcomes',
      items: [
        { label: '0 → Launch', value: '14 weeks from initial kickoff' },
        { label: 'Scope trimmed', value: '18 planned admin screens → 4 focused views' },
        { label: 'Stack shipped', value: 'React, Tailwind tokens & keyboard ledger' },
        { label: 'Engineering team', value: '1 embedded designer + 4 full-stack engineers' },
      ],
    },
    ctaLabel: 'Scope a Full MVP Build (From $28,000)',
    ctaAction: 'sprint-2wk',
  },
  {
    id: 'case-parkside',
    eyebrow: 'Case Deep-Dive · 03',
    category: 'Civic & Maps UX',
    title: 'Parkside: Offline Trail Maps and WCAG AAA Sunlight Contrast for 200,000 Portlanders',
    dek: 'Designing civic outdoor tools means testing contrast ratios on scratched glass at noon under alder shade—and making every trailhead readable with zero signal.',
    author: 'Jordan Lee',
    role: 'Principal Product Designer',
    date: '2025 · Civic Mobile',
    readTime: '3 min read',
    image: '/showcase/portfolio/parkside.webp',
    imageAlt: 'Parkside mobile parks map held in front of a lush Portland trailhead',
    pullQuote: 'Low-contrast sage green map labels look refined on a studio Pro Display XDR and disappear completely on a wet trail.',
    sections: [
      {
        heading: '18 MB offline vector packs & daylight legibility',
        paragraphs: [
          'Deep canyons inside Forest Park lose LTE reception within a quarter mile of major trailheads, precisely where visitors check mud closures, accessible restroom pins, and stroller-grade loops. Storing raster imagery bloated the app past 240 MB and still timed out offline.',
          'Collaborating directly with two iOS map engineers, we trimmed custom OpenStreetMap vector styles down to an 18 MB whole-metro bundle while enforcing 7.2:1 text-on-paper contrast across trail grade badges and colorblind-safe dashed elevation markers.',
        ],
      },
      {
        heading: 'Trailhead safety pins with VoiceOver landmarks',
        paragraphs: [
          'Every parking kiosk, water fountain, steep grade warning, and emergency ranger milepost carried verified VoiceOver landmark announcements and clear high-contrast labels. When hikers open a map at sunset on wet phone screens, primary return paths stand out cleanly in black ink on warm paper—helping Parkside serve over 200,000 Portland residents offline.',
        ],
      },
    ],
    ctaLabel: 'Book a Written Product Design Audit ($2,500)',
    ctaAction: 'sprint-audit',
  },
];

export const PORTFOLIO_ESSAYS: StudioArticle[] = [
  {
    id: 'essay-two-week-sprints',
    eyebrow: 'Essay 01 · Process',
    category: 'Product Craft',
    title: 'Why Two-Week Product Sprints Beat Three-Month Discovery Decks',
    dek: 'Slide decks politely defer hard decisions until engineering money runs low. Getting clickable software into five customers’ hands by Week 1 forces honest clarity fast.',
    author: 'Jordan Lee',
    role: 'Principal Product Designer',
    date: 'Nov 2026',
    readTime: '3 min read',
    pullQuote: 'Users forgive rough edges in an early prototype immediately; they cannot critique an abstract flowchart.',
    sections: [
      {
        heading: 'Show real flows by Day 4, never Wireframe Museum Week 6',
        paragraphs: [
          'Founders frequently hire agencies for six weeks of stakeholder sticky notes and end up holding an eighty-slide deck that still leaves open what screen #1 actually does when someone signs up empty. Working one-on-one in dedicated two-week sprints replaces ceremony with concrete daily builds.',
          'Monday through Wednesday focuses tightly on narrowing the trickiest workflow inside your product—whether onboarding, pricing calculator, or core ledger—and putting working interactive screens in front of real users by Thursday afternoon.',
        ],
      },
      {
        heading: 'Week 2 freezes edge cases into clean React specs',
        paragraphs: [
          'Once real customer sessions reveal which buttons or wording confused first-time users, Week 2 locks down every awkward boundary before engineering writes boilerplate: empty inbox states, keyboard tab flows, inline form validation, dark-mode contrast tokens, and 390px phone screen behavior. Recording a ten-minute walkthrough beside clean Tailwind and token specs on Day 10 lets your engineering team merge production components Monday morning without sitting through three alignment calls.',
        ],
      },
    ],
    ctaLabel: 'Check Availability for a 2-Week Sprint',
    ctaAction: 'sprint-2wk',
  },
  {
    id: 'essay-handoff',
    eyebrow: 'Essay 02 · Engineering',
    category: 'Design Systems',
    title: 'Handoff Is Where Good Interfaces Quietly Break',
    dek: 'Pixel-perfect Figma files still ship clunky when nobody checks keyboard focus, loading skeletons, or narrow tablet breakpoints inside the real codebase.',
    author: 'Jordan Lee',
    role: 'Principal Product Designer',
    date: 'Oct 2026',
    readTime: '3 min read',
    sections: [
      {
        heading: 'Bridging Figma frames with real CSS and DOM constraints',
        paragraphs: [
          'Most visual decay happens inside tiny undocumented moments between static mockups: what happens when an organization name runs thirty-eight characters long, how pill controls reflow beside narrow 768px tablets, why a translucent sticky header ghosts scrolling table headers underneath, or how focus rings look inside high-contrast OS preferences.',
          'Rather than exporting passive redline specs and disappearing, I join engineering pull requests directly alongside your team, dialing fluid spacing variables, tabular numeral alignment, semantic disclosure markup, and reduced-motion states right inside React and Tailwind before merge.',
        ],
      },
      {
        heading: 'Practical Design Audits in 5 business days',
        paragraphs: [
          'Already have engineers shipping weekly yet notice the live application drifting apart across screens? A $2,500 five-day Design Audit delivers narrated Loom click-throughs plus concrete PR-ready fixes prioritized strictly by user confusion and conversion drop-off.',
          'Rather than handing your CTO a vague slide deck blaming typography consistency, I fork the branch or file clean itemized GitHub issues covering contrast fixes, sticky header overlap, keyboard navigation traps, and mobile tap-target spacing so developers knock them out in one afternoon.',
        ],
      },
    ],
    ctaLabel: 'Request a 5-Day Design Audit ($2,500)',
    ctaAction: 'sprint-audit',
  },
  {
    id: 'essay-calm-tools',
    eyebrow: 'Essay 03 · Craft',
    category: 'Interface Philosophy',
    title: 'Designing Calm Software for People Who Have Real Jobs to Get Back To',
    dek: 'Confetti bursts and nagging modals treat work tools like arcade cabinets. Respecting your users means helping them finish cleanly in two minutes and close the tab.',
    author: 'Jordan Lee',
    role: 'Principal Product Designer',
    date: 'Sep 2026',
    readTime: '3 min read',
    sections: [
      {
        heading: 'Restraint as measurable product speed',
        paragraphs: [
          'Accountants, clinic coordinators, and logistics leads stare at software six hours a day. Every decorative gradient card, pointless slide-in toast, and micro-font label steals attention from the actual numbers they need to verify.',
          'Calm interfaces stay fiercely plain wherever plain clarity wins—generous tabular type, unambiguous 1px hairlines, and crisp 150ms state confirmation—while saving color and motion exclusively for actions that alter money, schedules, or state.',
        ],
      },
      {
        heading: 'Respect starts with legible contrast and fast keyboard paths',
        paragraphs: [
          'Every product I launch begins with WCAG AA/AAA text legibility across sunlight and low-light monitors, clean 44px touch targets for hurried mobile taps, logical keyboard navigation order, and plain-spoken empty states so first-time operators feel oriented inside ten seconds without hiring an onboarding concierge.',
          'When field teams or solo founders finish their core task cleanly without hunting hidden menus or dismissing marketing banners, retention climbs naturally—not through growth hacks, simply because using the software feels lighter than opening a spreadsheet.',
        ],
      },
    ],
    ctaLabel: 'Book a 30-Min Founder Intro Call',
    ctaAction: 'portfolio-call',
  },
];

export const PORTFOLIO_SPRINT_DAYS: { day: string; milestone: string; output: string }[] = [
  { day: 'Days 01–02', milestone: 'Shadowing & Scope Lock', output: 'Audits, key workflow selection & real user interviews' },
  { day: 'Days 03–04', milestone: 'First Interactive Build', output: 'Live clickable prototype across core desktop + 390px flows' },
  { day: 'Day 05', milestone: '5-Customer Usability Test', output: 'Recorded customer sessions & friction log' },
  { day: 'Days 06–08', milestone: 'Edge Cases & Tokens', output: 'Empty/error states, WCAG contrast, semantic DOM specs' },
  { day: 'Days 09–10', milestone: 'Engineering Handoff & QA', output: 'Clean React/Tailwind components & final launch review' },
];

export const PORTFOLIO_COLOPHON = [
  { label: 'Typography Pairing', value: 'Newsreader display · Inter UI · JetBrains Mono' },
  { label: 'Design Stack', value: 'Figma Variables · React / TypeScript · Tailwind v4' },
  { label: 'Verification Bar', value: 'Playwright 390×844 reflow + axe/keyboard audits' },
  { label: 'Direct Collab', value: 'Shared Slack channel · Async Loom + live PR reviews' },
];

export const STUDIO_EDITORIAL_BY_ID: Record<'taco' | 'bank' | 'salon' | 'office' | 'portfolio', StudioEditorialBundle> = {
  taco: {
    publicationTitle: 'From the 5 AM Comal',
    publicationSubtitle: 'Kitchen notes on Texas corn nixtamalization, twelve-hour Bastrop post oak brisket, and small-batch counter salsas.',
    articles: TACO_ARTICLES,
  },
  bank: {
    publicationTitle: 'Gillespie County Treasury & Ag Notes',
    publicationSubtitle: 'Practical briefings on local CD ladders, weekly Fredericksburg loan underwriting, and wire-transfer protection.',
    articles: BANK_ARTICLES,
  },
  salon: {
    publicationTitle: 'The Chair Journal',
    publicationSubtitle: 'Honest guides on Front Range dry-climate cutting, 12-month color budgets, and unhurried Highland consultations.',
    articles: SALON_ARTICLES,
  },
  office: {
    publicationTitle: 'Plain-English Client Tax Memos',
    publicationSubtitle: 'Clear Ohio & Federal advisories written for owners who want exact breakeven math without accounting jargon.',
    articles: OFFICE_ARTICLES,
  },
  portfolio: {
    publicationTitle: 'Shipped Case Deep-Dives & Product Essays',
    publicationSubtitle: 'Long-form engineering & field research breakdowns alongside notes on fast, calm small-team product design.',
    articles: [...PORTFOLIO_CASE_STUDIES, ...PORTFOLIO_ESSAYS],
  },
};
