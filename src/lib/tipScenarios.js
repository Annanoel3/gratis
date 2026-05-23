// Research-based tip service definitions.
// type: "percent" | "flat" | "hybrid_delivery" | "movers"
// venueAware: true → venue tier modifier applies
// discretionary: true → show "Optional — not expected per visit" label

export const TIP_SCENARIOS = [
  // ── Personal Care ──────────────────────────────────────────────────────────
  {
    id: "hair_stylist", label: "Hair Stylist / Colorist", category: "Personal Care",
    type: "percent", base: 20, venueAware: true,
    note: "Standard tip is 20%. Colorists and complex work like balayage or color corrections often warrant 20–22% due to the skill and chemical costs involved. If an assistant shampoos or rinses your color, tip them $3–5 separately.",
  },
  {
    id: "nail_tech", label: "Nail Technician", category: "Personal Care",
    type: "percent", base: 20, minTip: 5, venueAware: true,
    note: "Standard is 20%. Add an extra 5% for nail art or gel applications. Never tip less than $5 regardless of service cost.",
  },
  {
    id: "massage", label: "Massage Therapist", category: "Personal Care",
    type: "percent", base: 20, venueAware: true,
    note: "Standard is 20% for massage and spa treatments. Skip the tip if your provider is a licensed medical professional (nurse, PA, or doctor)—tipping is not expected for medical providers.",
  },
  {
    id: "esthetician", label: "Esthetician (Facial / Waxing)", category: "Personal Care",
    type: "percent", base: 20, venueAware: true,
    note: "Standard is 20% for facials and waxing. Cash tips are preferred as many spas can't add gratuity to cards.",
  },
  {
    id: "tattoo", label: "Tattoo Artist", category: "Personal Care",
    type: "percent", base: 20,
    note: "Industry standard is 20%. For custom designs or complex work, 25% is appropriate. For multi-session pieces, tip after each session—artists keep 100% of tips while a large portion of the service fee goes to the shop.",
  },
  {
    id: "barber", label: "Barber", category: "Personal Care",
    type: "percent", base: 20,
    note: "Standard is 20%. Hot towel shaves and straight razor finishes typically warrant 20–25% due to the added artistry and risk involved.",
  },
  {
    id: "makeup_artist", label: "Makeup Artist", category: "Personal Care",
    type: "percent", base: 20,
    note: "Standard is 20%. If multiple artists worked on your group, tip each artist individually based on their portion of the service.",
  },
  {
    id: "personal_trainer", label: "Personal Trainer", category: "Personal Care",
    type: "percent", base: 15, discretionary: true,
    note: "Tips are not expected after every session. Consider tipping 15–20% at the end of a package of sessions, after hitting a major goal, or as an annual holiday tip. Note: some corporate gyms prohibit staff from accepting cash tips—ask discreetly if unsure.",
  },

  // ── Pet Services ───────────────────────────────────────────────────────────
  {
    id: "dog_groomer", label: "Dog Groomer", category: "Pet Services",
    type: "percent", base: 20,
    note: "Standard is 20%, the same as you'd tip a hair stylist. Consider tipping more for dogs that require extra time or special handling.",
  },
  {
    id: "dog_walker", label: "Dog Walker", category: "Pet Services",
    type: "percent", base: 20,
    note: "Standard is 15–20% of the service cost. For regular walkers, a year-end bonus is also appreciated.",
  },
  {
    id: "pet_sitter", label: "Pet Sitter", category: "Pet Services",
    type: "percent", base: 20,
    note: "Standard is 15–20%. For extended stays of 5+ days, a flat $20–50 tip is common. Consider tipping more if your pet required extra care or your sitter dealt with difficult circumstances.",
  },

  // ── Childcare ──────────────────────────────────────────────────────────────
  {
    id: "nanny", label: "Nanny / Au Pair", category: "Childcare",
    type: "percent", base: 15, discretionary: true,
    note: "Per-visit tipping is not the norm for full-time nannies. The standard is a holiday bonus of 1–2 weeks' pay. For occasional or part-time help, 15–20% on top of the hourly rate is appreciated.",
  },
  {
    id: "babysitter", label: "Babysitter", category: "Childcare",
    type: "percent", base: 15,
    note: "A 15–20% tip on top of the agreed rate is appreciated for occasional sitters, especially for longer nights or multiple kids. Regular sitters typically receive a holiday bonus of $25–50 or a gift.",
  },
  {
    id: "tutor", label: "Tutor", category: "Childcare",
    type: "percent", base: 15, discretionary: true,
    note: "Tips are not expected per session. A $20–50 thank-you at the end of a course or semester is the norm. Cash or gift cards are both appreciated.",
  },

  // ── Home Services ──────────────────────────────────────────────────────────
  {
    id: "house_cleaner_onetime", label: "Housekeeper (One-Time / Deep Clean)", category: "Home Services",
    type: "percent", base: 20,
    note: "For one-time or deep cleans, tip 15–20% of the service cost or $10–25 per cleaner. These sessions are more labor-intensive than regular visits.",
  },
  {
    id: "house_cleaner_recurring", label: "Housekeeper (Recurring)", category: "Home Services",
    type: "percent", base: 15,
    note: "For recurring weekly or bi-weekly cleaners, tipping every visit is optional. Many clients tip monthly or give a holiday bonus equal to one full cleaning's cost.",
  },
  {
    id: "lawn_care", label: "Lawn Care / Landscaper", category: "Home Services",
    type: "percent", base: 10,
    note: "For one-time projects (spring cleanups, landscaping overhauls), 5–15% of the project cost or $20–50 per worker is typical. For regular mowing, $5–10 per visit or a $20–50 year-end bonus per crew member is the norm.",
  },
  {
    id: "photographer", label: "Photographer", category: "Home Services",
    type: "percent", base: 20, discretionary: true,
    note: "Tipping is not required if your photographer owns their business (they set their own rates). If tipping, 15–20% is standard. Many clients give a flat $100–200 for event photography. A glowing online review is also highly valued.",
  },

  // ── Travel & Parking ───────────────────────────────────────────────────────
  {
    id: "valet", label: "Valet Parking", category: "Travel",
    type: "flat", flatMin: 3, flatMid: 5, flatMax: 10, venueAware: true,
    note: "Tip when picking up your car. At a standard venue, $3–5 is appropriate. At a luxury hotel, $5–10. You can also leave $1–2 at drop-off since the person parking your car may be different from the one retrieving it.",
  },
  {
    id: "taxi", label: "Taxi / Rideshare (Uber/Lyft)", category: "Travel",
    type: "hybrid_delivery", base: 15, hybridMin: 2,
    note: "Standard is 15–20% of the fare. For very short trips, a minimum of $2–3 is appropriate even if that's a higher percentage. For airport rides with luggage, tip $5–10 regardless of fare.",
  },
  {
    id: "airport_shuttle", label: "Airport Shuttle", category: "Travel",
    type: "flat", flatMin: 5, flatMid: 7, flatMax: 10,
    note: "For shared shuttles, $5–10 per rider plus $2–4 per bag assisted. For private/booked car services, 15–20% of the fare is standard.",
  },

  // ── Hotel / Events ─────────────────────────────────────────────────────────
  {
    id: "hotel_housekeeping", label: "Hotel Housekeeping", category: "Hotel",
    type: "flat", flatMin: 3, flatMid: 4, flatMax: 5, venueAware: true,
    note: "Tip $3–5 per night in cash, left daily on the pillow (housekeeping staff rotates). Leaving it each morning ensures the right person gets it. A note that says 'For Housekeeping' removes any ambiguity.",
  },
  {
    id: "concierge", label: "Concierge", category: "Hotel",
    type: "flat", flatMin: 5, flatMid: 10, flatMax: 20,
    note: "Tip per task, not per day. $5 for simple requests (directions, cab, wake-up call), $10–20 for harder favors (dinner reservations, show tickets). If the concierge went well out of their way, $20+ is appropriate.",
  },
  {
    id: "coat_check", label: "Coat Check", category: "Hotel",
    type: "flat", flatMin: 1, flatMid: 1, flatMax: 2,
    note: "Leave $1–2 per coat or bag when you retrieve it. Cash only—coat check attendants rarely have card readers.",
  },
  {
    id: "bathroom_attendant", label: "Bathroom Attendant", category: "Hotel",
    type: "flat", flatMin: 1, flatMid: 2, flatMax: 3,
    note: "$1 is the minimum if the attendant actively helped you. $2–3 is appropriate if they handed you towels, sprayed cologne/perfume, or provided extras.",
  },

  // ── Delivery & Moving ──────────────────────────────────────────────────────
  {
    id: "food_delivery", label: "Food Delivery", category: "Delivery",
    type: "hybrid_delivery", base: 15, hybridMin: 4,
    note: "Tip at least $4–5 or 15% of the order total—whichever is more. On platforms like DoorDash, drivers can see tip amounts before accepting your order. Low tips often mean longer wait times as drivers skip the order.",
  },
  {
    id: "grocery_delivery", label: "Grocery Delivery (Instacart/etc.)", category: "Delivery",
    type: "hybrid_delivery", base: 13, hybridMin: 5,
    note: "Tip 12–15% of the order total with a $5 minimum. Consider tipping more for large or heavy orders, bad weather, or deliveries to multi-floor buildings.",
  },
  {
    id: "furniture_delivery", label: "Furniture Delivery", category: "Delivery",
    type: "flat", flatMin: 10, flatMid: 15, flatMax: 50,
    note: "Tip each delivery person individually. $10–20 per person for standard drops. Increase to $20–50 per person if they carried items up stairs, assembled furniture, or removed your old pieces.",
  },
  {
    id: "movers", label: "Movers", category: "Delivery",
    type: "movers",
    note: "Tip each mover individually in cash if possible. The amount should reflect the difficulty of the job—stairs, heavy items, or tight spaces all warrant a higher tip.",
  },
];

// ── Category list ─────────────────────────────────────────────────────────────
export const CATEGORIES = [
  "Personal Care",
  "Pet Services",
  "Childcare",
  "Home Services",
  "Travel",
  "Hotel",
  "Delivery",
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