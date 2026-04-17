// Research-based tip percentages for common situations in the US.
// Each scenario has a recommended range and a "base" (typical) rate.
// Flat-rate tips (valet, bellhop, etc.) use type: "flat" with amount in dollars.

export const TIP_SCENARIOS = [
  // Dining & Food
  { id: "restaurant_sitdown", label: "Sit-down Restaurant", category: "Dining", type: "percent", min: 15, base: 18, max: 25, note: "Standard for table service", venueAware: true },
  { id: "restaurant_buffet", label: "Buffet Restaurant", category: "Dining", type: "percent", min: 8, base: 10, max: 15, note: "Lower — limited service" },
  { id: "restaurant_fine", label: "Fine Dining", category: "Dining", type: "percent", min: 20, base: 22, max: 25, note: "Higher expectation of service", venueAware: true },
  { id: "bartender", label: "Bartender", category: "Dining", type: "percent", min: 15, base: 20, max: 25, note: "Or $1–2 per drink", venueAware: true },
  { id: "barista", label: "Barista / Coffee Shop", category: "Dining", type: "percent", min: 10, base: 15, max: 20, note: "Optional but appreciated" },
  { id: "food_delivery", label: "Food Delivery", category: "Dining", type: "percent", min: 10, base: 15, max: 20, note: "Min $3–5; more in bad weather" },
  { id: "takeout", label: "Takeout / To-Go", category: "Dining", type: "percent", min: 0, base: 10, max: 15, note: "Optional, 10% is generous" },
  { id: "catering", label: "Catering Staff", category: "Dining", type: "percent", min: 10, base: 15, max: 20, note: "On pre-tax total", venueAware: true },

  // Travel & Transport
  { id: "taxi", label: "Taxi / Rideshare (Uber, Lyft)", category: "Travel", type: "percent", min: 10, base: 15, max: 20, note: "Round up for short rides" },
  { id: "shuttle_driver", label: "Shuttle / Limo Driver", category: "Travel", type: "percent", min: 15, base: 18, max: 20, note: "On total fare", venueAware: true },
  { id: "valet", label: "Valet Parking", category: "Travel", type: "flat", min: 2, base: 5, max: 10, note: "Per car, on pickup", venueAware: true },
  { id: "tour_guide", label: "Tour Guide", category: "Travel", type: "percent", min: 10, base: 15, max: 20, note: "Per person for group tours" },
  { id: "airport_skycap", label: "Airport Skycap / Porter", category: "Travel", type: "flat", min: 2, base: 3, max: 5, note: "Per bag" },

  // Hotels & Lodging
  { id: "hotel_housekeeping", label: "Hotel Housekeeping", category: "Hotel", type: "flat", min: 2, base: 5, max: 10, note: "Per night, left daily", venueAware: true },
  { id: "hotel_bellhop", label: "Bellhop / Porter", category: "Hotel", type: "flat", min: 1, base: 2, max: 5, note: "Per bag", venueAware: true },
  { id: "hotel_concierge", label: "Concierge", category: "Hotel", type: "flat", min: 5, base: 10, max: 20, note: "For special requests", venueAware: true },
  { id: "hotel_doorman", label: "Doorman", category: "Hotel", type: "flat", min: 1, base: 2, max: 5, note: "For hailing cab or help", venueAware: true },
  { id: "room_service", label: "Room Service", category: "Hotel", type: "percent", min: 15, base: 18, max: 20, note: "Check if gratuity included", venueAware: true },

  // Personal Care & Beauty
  { id: "hairdresser", label: "Hairdresser / Stylist", category: "Personal Care", type: "percent", min: 15, base: 20, max: 25, note: "Standard for salon services", venueAware: true },
  { id: "barber", label: "Barber", category: "Personal Care", type: "percent", min: 15, base: 20, max: 25, note: "Cash preferred" },
  { id: "nail_tech", label: "Nail Technician / Manicurist", category: "Personal Care", type: "percent", min: 15, base: 20, max: 25, note: "For mani/pedi services", venueAware: true },
  { id: "massage", label: "Massage Therapist", category: "Personal Care", type: "percent", min: 15, base: 20, max: 25, note: "Unless in a medical setting", venueAware: true },
  { id: "esthetician", label: "Esthetician / Facials / Waxing", category: "Personal Care", type: "percent", min: 15, base: 20, max: 25, note: "Same as salon", venueAware: true },
  { id: "tattoo_artist", label: "Tattoo Artist", category: "Personal Care", type: "percent", min: 15, base: 20, max: 25, note: "Especially for custom work" },
  { id: "spa", label: "Spa Services", category: "Personal Care", type: "percent", min: 15, base: 20, max: 20, note: "Check if auto-added", venueAware: true },

  // Home Services
  { id: "lawn_service", label: "Lawn Mowing / Landscaper", category: "Home Services", type: "flat", min: 10, base: 20, max: 50, note: "$10–20 per visit; more for big jobs" },
  { id: "house_cleaner", label: "House Cleaner", category: "Home Services", type: "percent", min: 10, base: 15, max: 20, note: "Or 1 session's cost at holidays" },
  { id: "mover", label: "Movers", category: "Home Services", type: "flat", min: 20, base: 40, max: 60, note: "Per mover; $4–5/hr each" },
  { id: "furniture_delivery", label: "Furniture / Appliance Delivery", category: "Home Services", type: "flat", min: 5, base: 10, max: 20, note: "Per person" },
  { id: "handyman", label: "Handyman / Contractor", category: "Home Services", type: "percent", min: 0, base: 10, max: 15, note: "Optional for small jobs" },
  { id: "pest_control", label: "Pest Control Tech", category: "Home Services", type: "flat", min: 5, base: 10, max: 20, note: "Optional" },
  { id: "pool_cleaner", label: "Pool Cleaner", category: "Home Services", type: "flat", min: 5, base: 10, max: 20, note: "Per visit or holiday bonus" },

  // Pet Services
  { id: "dog_groomer", label: "Dog Groomer", category: "Pet Services", type: "percent", min: 15, base: 20, max: 25, note: "Standard grooming tip" },
  { id: "dog_walker", label: "Dog Walker", category: "Pet Services", type: "percent", min: 10, base: 15, max: 20, note: "Or week's pay at holidays" },
  { id: "pet_sitter", label: "Pet Sitter", category: "Pet Services", type: "percent", min: 10, base: 15, max: 20, note: "For multi-day stays" },

  // Other
  { id: "babysitter", label: "Babysitter / Nanny", category: "Other", type: "percent", min: 10, base: 15, max: 20, note: "Holiday: 1 week's pay" },
  { id: "tutor", label: "Private Tutor", category: "Other", type: "percent", min: 0, base: 10, max: 15, note: "Optional, end of term" },
  { id: "personal_trainer", label: "Personal Trainer", category: "Other", type: "percent", min: 0, base: 10, max: 20, note: "Holiday gift common" },
  { id: "car_wash", label: "Car Wash Attendant", category: "Other", type: "flat", min: 2, base: 5, max: 10, note: "For full-service wash" },
  { id: "golf_caddy", label: "Golf Caddy", category: "Other", type: "percent", min: 30, base: 40, max: 50, note: "On caddy fee", venueAware: true },
  { id: "ski_instructor", label: "Ski / Sports Instructor", category: "Other", type: "percent", min: 10, base: 15, max: 20, note: "Per lesson", venueAware: true },
  { id: "wedding_vendor", label: "Wedding Vendor (DJ, Photographer)", category: "Other", type: "flat", min: 50, base: 100, max: 200, note: "Per vendor, for great work" },
  { id: "coat_check", label: "Coat Check", category: "Other", type: "flat", min: 1, base: 2, max: 3, note: "Per coat", venueAware: true },
  { id: "restroom_attendant", label: "Restroom Attendant", category: "Other", type: "flat", min: 1, base: 2, max: 3, note: "If service provided" },
];

// Venue tier multipliers — applied on top of service rating
// These adjust the base tip upward for fancier establishments
export const VENUE_TIERS = [
  { id: "everyday",  label: "Everyday",   description: "Casual, neighborhood spot",        mult: 0.90 },
  { id: "mid",       label: "Mid-Range",  description: "Solid, polished service",           mult: 1.00 },
  { id: "upscale",   label: "Upscale",    description: "White-tablecloth, attentive staff", mult: 1.18 },
  { id: "luxury",    label: "Luxury",     description: "Five-star, exceptional setting",    mult: 1.35 },
];

// Rating multipliers applied to the BASE percent/amount
// 1 = poor, 5 = exceptional
export const RATING_MULTIPLIERS = {
  1: { mult: 0.55, label: "Poor", description: "Below expectations" },
  2: { mult: 0.80, label: "Below Average", description: "Could be better" },
  3: { mult: 1.00, label: "Average", description: "Met expectations" },
  4: { mult: 1.15, label: "Great", description: "Above expectations" },
  5: { mult: 1.30, label: "Exceptional", description: "Truly outstanding" },
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

export function computeTip({ scenario, bill, rating, mode, customPercent, people = 1, venueTier = "mid" }) {
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
      tipAmount = scenario.base * combinedMult;
      isFlat = true;
      effectivePercent = (tipAmount / bill) * 100;
    } else {
      const pct = scenario.base * combinedMult;
      tipAmount = (bill * pct) / 100;
      effectivePercent = pct;
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