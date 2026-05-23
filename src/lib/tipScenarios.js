// Research-based tip percentages for common situations in the US.
// Sources: Emily Post Institute, Bankrate, NerdWallet, The Knot, AAA tipping guides.
// Each scenario has a recommended range and a "base" (typical/median) rate.
// Flat-rate tips (valet, bellhop, etc.) use type: "flat" with amount in dollars.
//
// venueAware: true  → the Venue Tier selector is shown and its multiplier is applied.
// Base values represent a "mid-range" establishment with average service (rating = 3).

export const TIP_SCENARIOS = [
  // ── Dining & Food ──────────────────────────────────────────────────────────
  // "Restaurant" now covers all sit-down dining; venue tier distinguishes casual→luxury.
  // Standard US sit-down tip is 18–20% at a mid-range spot. Casual diner = 15–16%.
  // Fine dining norm = 20–22%. Luxury tasting-menu = 22–25%.
  { id: "restaurant", label: "Restaurant (Sit-Down)", category: "Dining", type: "percent", min: 15, base: 18, max: 25, note: "Use Venue Setting above to adjust for casual vs. fine dining", venueAware: true },

  // Buffet: self-service; server only refills drinks/clears plates. 10% is the norm.
  { id: "restaurant_buffet", label: "Buffet Restaurant", category: "Dining", type: "percent", min: 5, base: 10, max: 15, note: "Server refills drinks & clears plates — limited table service" },

  // Bartender: $1–2 per drink OR 15–20% of tab. 18% base on a tab is accurate.
  { id: "bartender", label: "Bartender", category: "Dining", type: "percent", min: 15, base: 18, max: 25, note: "$1–2 per drink is also standard for simple orders", venueAware: true },

  // Coffee: counter service. 15% is now the post-pandemic expectation on tablets.
  { id: "barista", label: "Barista / Coffee Shop", category: "Dining", type: "percent", min: 0, base: 15, max: 20, note: "Optional but appreciated; ~$0.50–$1 per drink is common" },

  // Delivery: 15–20% or $3–5 minimum. 15% base is correct per Bankrate.
  { id: "food_delivery", label: "Food Delivery", category: "Dining", type: "percent", min: 10, base: 15, max: 20, note: "Minimum $3–5 regardless of order size; tip more in bad weather" },

  // Takeout: genuinely optional. 10% is generous; 0% is perfectly acceptable.
  { id: "takeout", label: "Takeout / Counter Service", category: "Dining", type: "percent", min: 0, base: 10, max: 15, note: "Truly optional — 10% is a nice gesture for large or complex orders" },

  // Catering: 15% if gratuity not already included in contract (check first).
  { id: "catering", label: "Catering Staff", category: "Dining", type: "percent", min: 10, base: 15, max: 20, note: "Check contract first — gratuity is often already included", venueAware: true },

  // ── Travel & Transport ─────────────────────────────────────────────────────
  // Taxi/Rideshare: Uber/Lyft default prompts are 15–20%; 15% is the median.
  { id: "taxi", label: "Taxi / Rideshare (Uber, Lyft)", category: "Travel", type: "percent", min: 10, base: 15, max: 20, note: "Round up on short rides; 20% for helpful drivers" },

  // Limo/Shuttle: 15–20% is standard per limousine industry norms.
  { id: "shuttle_driver", label: "Shuttle / Limo Driver", category: "Travel", type: "percent", min: 15, base: 18, max: 20, note: "On total fare; 20% for exceptional service", venueAware: true },

  // Valet: $2–5 on pickup is the widely cited standard; luxury hotels $5–10.
  { id: "valet", label: "Valet Parking", category: "Travel", type: "flat", min: 2, base: 5, max: 10, note: "Tip on pickup (not drop-off); use Venue Setting for hotel tier", venueAware: true },

  // Tour guide: $3–5/person for a half-day group tour; $10+/person for full-day private.
  { id: "tour_guide", label: "Tour Guide", category: "Travel", type: "percent", min: 10, base: 15, max: 20, note: "Per person for group tours; more for private/custom tours" },

  // Skycap: $2/bag is the stated standard from major airline guides.
  { id: "airport_skycap", label: "Airport Skycap / Porter", category: "Travel", type: "flat", min: 2, base: 2, max: 5, note: "$2 per bag is standard; $1 extra for heavy bags" },

  // ── Hotels & Lodging ───────────────────────────────────────────────────────
  // Housekeeping: $2–5/night budget, $5–10 upscale per AAA and American Hotel Association.
  { id: "hotel_housekeeping", label: "Hotel Housekeeping", category: "Hotel", type: "flat", min: 2, base: 5, max: 10, note: "Leave daily (staff rotates); $2–3 at budget hotels, $5+ at upscale", venueAware: true },

  // Bellhop: $1–2/bag is the industry standard; $2+ at luxury properties.
  { id: "hotel_bellhop", label: "Bellhop / Porter", category: "Hotel", type: "flat", min: 1, base: 2, max: 5, note: "$1–2 per bag; add $1–2 per bag at luxury properties", venueAware: true },

  // Concierge: $5–10 for dinner reservations; $20+ for hard-to-get tickets.
  { id: "hotel_concierge", label: "Concierge", category: "Hotel", type: "flat", min: 5, base: 10, max: 25, note: "$5–10 for basic requests; $20+ for special arrangements", venueAware: true },

  // Doorman: $1–2 per service (hailing a cab, loading bags).
  { id: "hotel_doorman", label: "Doorman", category: "Hotel", type: "flat", min: 1, base: 2, max: 5, note: "$1–2 per service (hailing cab, unloading bags)", venueAware: true },

  // Room service: 15–20% — but check if a delivery charge or gratuity is already on the bill.
  { id: "room_service", label: "Room Service", category: "Hotel", type: "percent", min: 15, base: 18, max: 20, note: "Check bill first — many hotels add a service charge automatically", venueAware: true },

  // ── Personal Care & Beauty ─────────────────────────────────────────────────
  { id: "hairdresser",       label: "Hairdresser / Stylist",              category: "Personal Care", type: "percent", min: 15, base: 20, max: 25, note: "20% is the current standard; cash is preferred so the stylist keeps it all", venueAware: true },
  { id: "barber",            label: "Barber",                             category: "Personal Care", type: "percent", min: 15, base: 20, max: 25, note: "Cash preferred; $3–5 on a typical cut is a solid baseline" },
  { id: "nail_tech",         label: "Nail Technician / Manicurist",       category: "Personal Care", type: "percent", min: 15, base: 20, max: 25, note: "20% is standard — one of those places people always panic about. Cash is best.", venueAware: true },
  { id: "nail_gel_acrylic",  label: "Gel / Acrylic / Nail Extensions",    category: "Personal Care", type: "percent", min: 15, base: 20, max: 25, note: "Same 20% rule applies even on higher-priced services — don't tip less because the bill is bigger" },
  { id: "massage",           label: "Massage Therapist",                  category: "Personal Care", type: "percent", min: 15, base: 20, max: 25, note: "Skip at medical/clinical settings; 20% at day spas and wellness studios", venueAware: true },
  { id: "esthetician",       label: "Esthetician (Facial)",               category: "Personal Care", type: "percent", min: 15, base: 20, max: 25, note: "20% is expected — always check if a service charge is already on the bill", venueAware: true },
  { id: "waxing",            label: "Waxing Specialist",                  category: "Personal Care", type: "percent", min: 15, base: 20, max: 25, note: "20% is the norm whether it's brows, legs, or a full wax — don't stiff them" },
  { id: "lash_tech",         label: "Lash Technician",                    category: "Personal Care", type: "percent", min: 15, base: 20, max: 25, note: "Precision work that takes 1–2 hours — 20% is absolutely expected" },
  { id: "brow_tech",         label: "Brow Technician (Threading/Tinting)", category: "Personal Care", type: "percent", min: 15, base: 20, max: 20, note: "Often a quick service but 20% is still the right move; $3–5 minimum" },
  { id: "tattoo_artist",     label: "Tattoo Artist",                      category: "Personal Care", type: "percent", min: 15, base: 20, max: 25, note: "20% minimum — more for large custom pieces. They spent serious time on your design." },
  { id: "piercing",          label: "Body Piercing",                      category: "Personal Care", type: "percent", min: 10, base: 15, max: 20, note: "15–20% — often overlooked but very much appreciated by piercers" },
  { id: "spa",               label: "Spa Services (General)",             category: "Personal Care", type: "percent", min: 15, base: 20, max: 25, note: "Check if gratuity is already included — many spas add it automatically", venueAware: true },
  { id: "spray_tan",         label: "Spray Tan",                          category: "Personal Care", type: "percent", min: 10, base: 15, max: 20, note: "15% is the norm; cash preferred. Many people forget to tip here." },
  { id: "hair_color",        label: "Hair Color / Highlights / Balayage", category: "Personal Care", type: "percent", min: 15, base: 20, max: 25, note: "Always tip on the full service price, not just the cut portion — it's all one service", venueAware: true },
  { id: "blowout",           label: "Blowout / Blowdry Bar",              category: "Personal Care", type: "percent", min: 15, base: 20, max: 20, note: "20% is standard even for a quick blowout — the time and skill still count" },

  // ── Home Services ──────────────────────────────────────────────────────────
  { id: "lawn_service",         label: "Lawn / Landscaping",                   category: "Home Services", type: "flat",    min: 10, base: 20, max: 50, note: "Not always expected; $20/visit or a seasonal bonus is common" },
  { id: "house_cleaner",        label: "House Cleaner",                        category: "Home Services", type: "percent", min: 10, base: 15, max: 20, note: "15–20% per visit; one session's pay as a holiday gift is also great" },
  { id: "mover",                label: "Movers",                               category: "Home Services", type: "flat",    min: 20, base: 40, max: 80, note: "$20–40 per mover for a half-day; $40–80 for a full day — cash is king" },
  { id: "furniture_delivery",   label: "Furniture / Appliance Delivery",       category: "Home Services", type: "flat",    min: 5,  base: 10, max: 20, note: "$5–20 per person; tip more for heavy items or tricky installs" },
  { id: "handyman",             label: "Handyman / Contractor",                category: "Home Services", type: "percent", min: 0,  base: 10, max: 15, note: "Not expected for licensed contractors; a tip is a kind gesture on small jobs" },
  { id: "pool_cleaner",         label: "Pool Cleaner",                         category: "Home Services", type: "flat",    min: 10, base: 20, max: 50, note: "Not standard per-visit; $20–50 as a seasonal or holiday thank-you is common" },
  { id: "pest_control",         label: "Pest Control",                         category: "Home Services", type: "percent", min: 0,  base: 10, max: 15, note: "Not expected — a small tip ($5–15) is appreciated for thorough work" },
  { id: "window_cleaner",       label: "Window Cleaner",                       category: "Home Services", type: "percent", min: 0,  base: 10, max: 15, note: "Optional; $5–15 per job or 10–15% for larger homes" },
  { id: "junk_removal",         label: "Junk Removal",                         category: "Home Services", type: "percent", min: 5,  base: 10, max: 20, note: "Not required but appreciated; $10–20 per worker for heavy lifting" },
  { id: "snow_removal",         label: "Snow Removal / Plowing",               category: "Home Services", type: "flat",    min: 5,  base: 15, max: 30, note: "$10–20 per visit for shoveling; $20–50 seasonal bonus for a regular plow guy" },
  { id: "painter_interior",     label: "Interior Painter",                     category: "Home Services", type: "percent", min: 0,  base: 10, max: 15, note: "Not expected for a big crew; $10–20 per painter for excellent work on smaller jobs" },

  // ── Pet Services ───────────────────────────────────────────────────────────
  { id: "dog_groomer",      label: "Dog Groomer",                    category: "Pet Services", type: "percent", min: 15, base: 20, max: 25, note: "20% is standard; tip more for large dogs, matted coats, or difficult behavior" },
  { id: "dog_walker",       label: "Dog Walker",                     category: "Pet Services", type: "percent", min: 10, base: 15, max: 20, note: "10–20% per walk; one week's pay at the holidays is the standard gift" },
  { id: "pet_sitter",       label: "Pet Sitter / Overnight Boarding", category: "Pet Services", type: "percent", min: 10, base: 15, max: 20, note: "15–20% for multi-day stays; a holiday bonus equal to one night's rate is kind" },
  { id: "vet_tech",         label: "Veterinary Technician",          category: "Pet Services", type: "percent", min: 0,  base: 0,  max: 10, note: "Generally not expected or accepted at vet clinics — a thank-you card or treats goes further" },
  { id: "mobile_vet",       label: "Mobile Vet / In-Home Vet",       category: "Pet Services", type: "percent", min: 0,  base: 10, max: 15, note: "They come to you — $10–20 is a nice gesture for a house-call visit" },
  { id: "dog_trainer",      label: "Dog Trainer",                    category: "Pet Services", type: "percent", min: 0,  base: 10, max: 15, note: "Not standard for group classes; 10–15% for private sessions or board-and-train programs" },

  // ── Other ──────────────────────────────────────────────────────────────────
  { id: "babysitter",          label: "Babysitter / Nanny",                  category: "Other", type: "percent", min: 10, base: 15, max: 20,  note: "On top of the hourly rate; holiday gift = one week's pay" },
  { id: "car_wash",            label: "Car Wash Attendant",                  category: "Other", type: "flat",    min: 2,  base: 5,  max: 10,  note: "For full-service hand washes only; not needed for tunnel/self-serve" },
  { id: "mobile_car_detailer", label: "Mobile Car Detailer",                 category: "Other", type: "percent", min: 10, base: 15, max: 20,  note: "They come to you — 15–20% is appreciated; tip more for heavy detail work" },
  { id: "golf_caddy",          label: "Golf Caddy",                          category: "Other", type: "percent", min: 30, base: 50, max: 100, note: "~50% of the caddy fee is the PGA standard; $50–100 per bag per round", venueAware: true },
  { id: "coat_check",          label: "Coat Check",                          category: "Other", type: "flat",    min: 1,  base: 2,  max: 3,   note: "$1–2 per coat; tip when you pick up", venueAware: true },
  { id: "restroom_attendant",  label: "Restroom Attendant",                  category: "Other", type: "flat",    min: 1,  base: 2,  max: 3,   note: "$1–2 if they hand you a towel or product; nothing required for self-service" },
  { id: "wedding_vendor",      label: "Wedding Vendor (DJ, Photographer…)",  category: "Other", type: "flat",    min: 50, base: 100, max: 200, note: "$50–200 per vendor; always check contracts for included gratuity" },
  { id: "sommelier",           label: "Sommelier / Wine Steward",            category: "Other", type: "percent", min: 10, base: 15, max: 20,  note: "Tip on the wine portion only — 15% on the bottle price is standard", venueAware: true },
  { id: "personal_trainer",    label: "Personal Trainer",                    category: "Other", type: "percent", min: 10, base: 15, max: 20,  note: "Not always expected but a nice gesture; holiday gift equivalent to one session" },
  { id: "music_lesson",        label: "Music / Dance / Art Instructor",      category: "Other", type: "percent", min: 0,  base: 10, max: 15,  note: "Not standard — a holiday gift card or one lesson's worth is common" },
  { id: "tailor_seamstress",   label: "Tailor / Seamstress / Alterations",   category: "Other", type: "percent", min: 0,  base: 10, max: 15,  note: "Not expected but appreciated for complex or rush work" },
  { id: "parking_attendant",   label: "Parking Attendant (Non-Valet)",       category: "Other", type: "flat",    min: 1,  base: 2,  max: 5,   note: "$1–2 when they direct you or assist; not required for unmanned lots" },
  { id: "furniture_assembler", label: "Furniture Assembler (e.g. IKEA)",     category: "Other", type: "flat",    min: 5,  base: 10, max: 20,  note: "Not expected but kind for a complex build; $10–20 per person" },
  { id: "casino_dealer",       label: "Casino Dealer",                       category: "Other", type: "flat",    min: 1,  base: 5,  max: 20,  note: "\"Toke\" the dealer $1–5 per session; more if you're on a winning streak" },
  { id: "holiday_letter_carrier", label: "Mail / Package Carrier (Holiday)", category: "Other", type: "flat",   min: 10, base: 20, max: 25,  note: "USPS allows up to $20 in gifts; UPS/FedEx $20–25; give at the holidays" },
  { id: "newspaper_carrier",   label: "Newspaper Carrier",                   category: "Other", type: "flat",   min: 10, base: 25, max: 50,  note: "Typically a seasonal holiday tip of $25–50 rather than per-delivery" },
];

// ── Venue tier multipliers ────────────────────────────────────────────────────
// Applied on top of service rating for venueAware scenarios.
// Calibrated so that a 3-star service rating at each tier produces:
//   Everyday  → ~16% (casual diner norm)
//   Mid-Range → ~18% (standard sit-down norm)
//   Upscale   → ~21% (white-tablecloth norm)
//   Luxury    → ~24% (top fine dining/hotel norm)
// Multipliers are intentionally modest — the bulk of variation should come from service rating.
export const VENUE_TIERS = [
  { id: "everyday",  label: "Everyday",   description: "Casual diner, fast-casual, neighborhood spot",  mult: 0.88 },
  { id: "mid",       label: "Mid-Range",  description: "Standard sit-down, solid service expected",      mult: 1.00 },
  { id: "upscale",   label: "Upscale",    description: "White-tablecloth, attentive staff",              mult: 1.15 },
  { id: "luxury",    label: "Luxury",     description: "Five-star, tasting menu, exceptional setting",   mult: 1.30 },
];

// ── Service rating multipliers ────────────────────────────────────────────────
// Applied to the base percent/flat amount.
// Calibrated to realistic US norms:
//   1 (Poor)        → still tip ~10–11% (US norm — withholding tip entirely is rare)
//   2 (Below Avg)   → ~14–15%
//   3 (Average)     → 18% base (unchanged)
//   4 (Great)       → ~20–21%
//   5 (Exceptional) → ~22–24%
export const RATING_MULTIPLIERS = {
  1: { mult: 0.60, label: "Poor",         description: "Significantly below expectations" },
  2: { mult: 0.80, label: "Below Average",description: "Could have been better" },
  3: { mult: 1.00, label: "Average",      description: "Met expectations" },
  4: { mult: 1.15, label: "Great",        description: "Above and beyond" },
  5: { mult: 1.28, label: "Exceptional",  description: "Truly outstanding service" },
};

export const CATEGORIES = [
  "Dining",
  "Travel",
  "Hotel",
  "Personal Care",
  "Home Services",
  "Pet Services",
  "Other",
];

// locationAdj meaning:
//   US mode  → additive % points nudge on top of the scenario base (e.g. NYC +3)
//   Intl mode → pass isIntl=true; locationAdj is then used as the ABSOLUTE base %
//               (e.g. UK = 10, Japan = 0), replacing the US-centric scenario base.
export function computeTip({ scenario, bill, rating, mode, customPercent, people = 1, venueTier = "mid", budgetMult = 1, locationAdj = 0, isIntl = false }) {
  if (!scenario || !bill || bill <= 0) {
    return { tipAmount: 0, totalAmount: 0, perPerson: 0, effectivePercent: 0, isFlat: false };
  }

  let tipAmount = 0;
  let isFlat = false;
  let effectivePercent = 0;

  if (mode === "custom") {
    const pct = Number(customPercent) || 0;
    tipAmount = (bill * pct) / 100;
    effectivePercent = pct;
  } else {
    const ratingMult = RATING_MULTIPLIERS[rating]?.mult ?? 1;
    const tierMult = scenario.venueAware
      ? (VENUE_TIERS.find((t) => t.id === venueTier)?.mult ?? 1)
      : 1;
    const combinedMult = ratingMult * tierMult;

    if (scenario.type === "flat") {
      // For flat tips in international mode, scale by the intl norm ratio
      const intlScale = isIntl ? Math.max(0, locationAdj) / 18 : 1;
      const scale = isIntl ? intlScale : budgetMult;
      tipAmount = scenario.base * combinedMult * (isIntl ? Math.max(0.1, intlScale) : budgetMult);
      isFlat = true;
      effectivePercent = (tipAmount / bill) * 100;
    } else {
      let basePct;
      if (isIntl) {
        // Use the country's norm as the base; rating still adjusts proportionally
        basePct = Math.max(0, locationAdj) * combinedMult * budgetMult;
      } else {
        basePct = (scenario.base * combinedMult * budgetMult) + locationAdj;
      }
      tipAmount = (bill * basePct) / 100;
      effectivePercent = basePct;
    }
  }

  const totalAmount = Number(bill) + tipAmount;
  const perPerson = totalAmount / Math.max(1, people);

  return {
    tipAmount,
    totalAmount,
    perPerson,
    effectivePercent,
    isFlat,
  };
}