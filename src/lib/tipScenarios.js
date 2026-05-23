// Research-based tip service definitions.
// type: "percent" | "flat" | "hybrid_delivery" | "movers"
// venueAware: true → venue tier modifier applies
// discretionary: true → show "Optional — not expected per visit" label

export const TIP_SCENARIOS = [
  // ── Dining ─────────────────────────────────────────────────────────────────
  { id: "restaurant_sitdown",   label: "Restaurant (Sit-Down)",           category: "Dining",        type: "percent", base: 18, venueAware: true },
  { id: "buffet",               label: "Buffet Restaurant",               category: "Dining",        type: "percent", base: 10, venueAware: false },
  { id: "bartender",            label: "Bartender",                       category: "Dining",        type: "percent", base: 18, venueAware: true },
  { id: "barista",              label: "Barista / Coffee Shop",           category: "Dining",        type: "percent", base: 15, venueAware: false },
  { id: "food_delivery",        label: "Food Delivery",                   category: "Dining",        type: "percent", base: 15, venueAware: false },
  { id: "takeout",              label: "Takeout / Counter Service",       category: "Dining",        type: "percent", base: 10, venueAware: false },
  { id: "catering",             label: "Catering Staff",                  category: "Dining",        type: "percent", base: 15, venueAware: false },

  // ── Travel ─────────────────────────────────────────────────────────────────
  { id: "taxi",                 label: "Taxi / Rideshare (Uber, Lyft)",   category: "Travel",        type: "percent", base: 15, venueAware: false },
  { id: "shuttle",              label: "Shuttle / Limo Driver",           category: "Travel",        type: "percent", base: 18, venueAware: false },
  { id: "valet",                label: "Valet Parking",                   category: "Travel",        type: "flat",    flatMin: 2, flatMid: 5,  flatMax: 10, venueAware: true },
  { id: "tour_guide",           label: "Tour Guide",                      category: "Travel",        type: "percent", base: 15, venueAware: false },
  { id: "skycap",               label: "Airport Skycap / Porter",         category: "Travel",        type: "flat",    flatMin: 2, flatMid: 2,  flatMax: 5,  venueAware: false },

  // ── Hotel ──────────────────────────────────────────────────────────────────
  { id: "hotel_housekeeping",   label: "Hotel Housekeeping",              category: "Hotel",         type: "flat",    flatMin: 2, flatMid: 5,  flatMax: 10, venueAware: true },
  { id: "bellhop",              label: "Bellhop / Porter",                category: "Hotel",         type: "flat",    flatMin: 1, flatMid: 2,  flatMax: 5,  venueAware: false },
  { id: "concierge",            label: "Concierge",                       category: "Hotel",         type: "flat",    flatMin: 5, flatMid: 10, flatMax: 25, venueAware: false },
  { id: "doorman",              label: "Doorman",                         category: "Hotel",         type: "flat",    flatMin: 1, flatMid: 2,  flatMax: 5,  venueAware: false },
  { id: "room_service",         label: "Room Service",                    category: "Hotel",         type: "percent", base: 18, venueAware: true },

  // ── Personal Care ──────────────────────────────────────────────────────────
  { id: "hairdresser",          label: "Hairdresser / Stylist",           category: "Personal Care", type: "percent", base: 20, venueAware: true },
  { id: "barber",               label: "Barber",                          category: "Personal Care", type: "percent", base: 20, venueAware: false },
  { id: "nail_tech",            label: "Nail Technician / Manicurist",    category: "Personal Care", type: "percent", base: 20, venueAware: true },
  { id: "massage",              label: "Massage Therapist",               category: "Personal Care", type: "percent", base: 20, venueAware: true },
  { id: "esthetician",          label: "Esthetician (Facial / Waxing)",   category: "Personal Care", type: "percent", base: 20, venueAware: true },
  { id: "tattoo",               label: "Tattoo Artist",                   category: "Personal Care", type: "percent", base: 20, venueAware: false },
  { id: "spa",                  label: "Spa Services",                    category: "Personal Care", type: "percent", base: 20, venueAware: true },

  // ── Home Services ──────────────────────────────────────────────────────────
  { id: "lawn_care",            label: "Lawn / Landscaping",              category: "Home Services", type: "flat",    flatMin: 10, flatMid: 20, flatMax: 50, venueAware: false },
  { id: "house_cleaner",        label: "House Cleaner",                   category: "Home Services", type: "percent", base: 15, venueAware: false },
  { id: "movers",               label: "Movers",                          category: "Home Services", type: "movers",
    note: "Tip each mover individually in cash if possible. The amount should reflect the difficulty — stairs, heavy items, or tight spaces all warrant more." },
  { id: "furniture_delivery",   label: "Furniture / Appliance Delivery",  category: "Home Services", type: "flat",    flatMin: 5, flatMid: 10, flatMax: 20, venueAware: false },
  { id: "handyman",             label: "Handyman / Contractor",           category: "Home Services", type: "percent", base: 10, venueAware: false },

  // ── Pet Services ───────────────────────────────────────────────────────────
  { id: "dog_groomer",          label: "Dog Groomer",                     category: "Pet Services",  type: "percent", base: 20, venueAware: false },
  { id: "dog_walker",           label: "Dog Walker",                      category: "Pet Services",  type: "percent", base: 15, venueAware: false },
  { id: "pet_sitter",           label: "Pet Sitter",                      category: "Pet Services",  type: "percent", base: 15, venueAware: false },

  // ── Other ──────────────────────────────────────────────────────────────────
  { id: "babysitter",           label: "Babysitter / Nanny",              category: "Other",         type: "percent", base: 15, venueAware: false },
  { id: "car_wash",             label: "Car Wash Attendant",              category: "Other",         type: "flat",    flatMin: 2, flatMid: 5, flatMax: 10, venueAware: false },
  { id: "golf_caddy",           label: "Golf Caddy",                      category: "Other",         type: "percent", base: 50, venueAware: false },
  { id: "coat_check",           label: "Coat Check",                      category: "Other",         type: "flat",    flatMin: 1, flatMid: 2, flatMax: 3, venueAware: false },
  { id: "restroom_attendant",   label: "Restroom Attendant",              category: "Other",         type: "flat",    flatMin: 1, flatMid: 2, flatMax: 3, venueAware: false },
  { id: "wedding_vendor",       label: "Wedding Vendor (DJ, Photographer, etc.)", category: "Other", type: "flat",    flatMin: 50, flatMid: 100, flatMax: 200, venueAware: false },
];

// ── Category list ─────────────────────────────────────────────────────────────
export const CATEGORIES = [
  "Dining",
  "Travel",
  "Hotel",
  "Personal Care",
  "Home Services",
  "Pet Services",
  "Other",
];

// ── Venue tiers ───────────────────────────────────────────────────────────────
export const VENUE_TIERS = [
  { id: "budget",   label: "Budget / Chain", description: "Fast-casual, chain, budget hotel", mult: 0.85 },
  { id: "everyday", label: "Everyday",       description: "Standard neighborhood spot",        mult: 1.0  },
  { id: "upscale",  label: "Upscale",        description: "White-tablecloth, upscale service", mult: 1.1  },
  { id: "luxury",   label: "Luxury",         description: "Five-star, tasting menu, luxury",   mult: 1.2  },
];

// ── Rating multipliers ────────────────────────────────────────────────────────
export const RATING_MULTIPLIERS = {
  1: { mult: 0.50, label: "Poor",          description: "Significantly below expectations" },
  2: { mult: 0.75, label: "Below Average", description: "Could have been better" },
  3: { mult: 1.00, label: "Average",       description: "Met expectations" },
  4: { mult: 1.15, label: "Great",         description: "Above and beyond" },
  5: { mult: 1.25, label: "Exceptional",   description: "Truly outstanding service" },
};

// ── Per-mover tip rates by duration ──────────────────────────────────────────
export const MOVER_RATES = [
  { id: "short",    label: "1–2 hours",         perMover: 20 },
  { id: "half",     label: "Half day (3–4 hrs)", perMover: 35 },
  { id: "full",     label: "Full day (6–8 hrs)", perMover: 55 },
  { id: "multiday", label: "Multi-day",          perMover: 80 },
];

// ── Compute tip ───────────────────────────────────────────────────────────────
export function computeTip({
  scenario,
  bill,
  rating = 3,
  mode = "rating",
  customPercent = 18,
  people = 1,
  venueTier = "everyday",
  budgetMult = 1,
  locationAdj = 0,
}) {
  const empty = { tipAmount: 0, totalAmount: bill || 0, perPerson: 0, effectivePercent: 0, isFlat: false };
  if (!scenario) return empty;

  const billNum = parseFloat(bill) || 0;

  // --- Custom mode ---
  if (mode === "custom") {
    const pct = Math.max(0, Number(customPercent) || 0);
    const tip = (billNum * pct) / 100;
    const minTip = scenario.minTip || 0;
    const tipAmount = Math.max(tip, minTip > 0 && billNum > 0 ? minTip : 0);
    const total = billNum + tipAmount;
    return { tipAmount, totalAmount: total, perPerson: total / Math.max(1, people), effectivePercent: pct, isFlat: false };
  }

  const ratingMult = RATING_MULTIPLIERS[rating]?.mult ?? 1;
  const tierMult = scenario.venueAware
    ? (VENUE_TIERS.find(t => t.id === venueTier)?.mult ?? 1)
    : 1;

  // --- Percentage-based ---
  if (scenario.type === "percent") {
    if (billNum <= 0) return empty;
    let pct = Math.max(0, (scenario.base * ratingMult * tierMult * budgetMult) + locationAdj);
    pct = Math.min(25, pct); // hard cap at 25%
    const rawTip = (billNum * pct) / 100;
    const minTip = scenario.minTip || 0;
    const tipAmount = Math.max(rawTip, minTip > 0 ? minTip : 0);
    const effectivePercent = billNum > 0 ? (tipAmount / billNum) * 100 : pct;
    const total = billNum + tipAmount;
    return { tipAmount, totalAmount: total, perPerson: total / Math.max(1, people), effectivePercent, isFlat: false };
  }

  // --- Flat-rate ---
  if (scenario.type === "flat") {
    const { flatMin, flatMid, flatMax } = scenario;
    // Map rating 1→min, 3→mid, 5→max (linear)
    let flatBase;
    if (rating <= 1) flatBase = flatMin;
    else if (rating <= 3) flatBase = flatMin + ((flatMid - flatMin) * (rating - 1) / 2);
    else flatBase = flatMid + ((flatMax - flatMid) * (rating - 3) / 2);
    const tierMultFlat = scenario.venueAware
      ? (VENUE_TIERS.find(t => t.id === venueTier)?.mult ?? 1)
      : 1;
    const tipAmount = Math.round(flatBase * tierMultFlat * budgetMult * 2) / 2; // round to nearest $0.50
    const effectivePercent = billNum > 0 ? (tipAmount / billNum) * 100 : 0;
    const total = billNum > 0 ? billNum + tipAmount : tipAmount;
    return { tipAmount, totalAmount: total, perPerson: total / Math.max(1, people), effectivePercent, isFlat: true };
  }

  // --- Hybrid delivery (% or flat min, whichever is higher) ---
  if (scenario.type === "hybrid_delivery") {
    if (billNum <= 0) return empty;
    const pctTip = (billNum * (scenario.base / 100)) * ratingMult * budgetMult;
    const tipAmount = Math.max(pctTip, scenario.hybridMin || 0);
    const effectivePercent = (tipAmount / billNum) * 100;
    const total = billNum + tipAmount;
    return { tipAmount, totalAmount: total, perPerson: total / Math.max(1, people), effectivePercent, isFlat: false };
  }

  // --- Movers (handled by MoversCalculator component) ---
  return empty;
}