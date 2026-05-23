import React, { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

// ── Location data ─────────────────────────────────────────────────────────────
// Each state has an `adj` (additive % points on the base tip) that applies when
// no city override is selected. States with notable intra-state variation also
// list `cities` — an array of {id, label, adj, note?}.
// Adjustment scale: +2.5 = very high COL city, 0 = national avg, -2 = rural/low-norm.
export const STATES = [
  { id: "national", label: "— No preference —", adj: 0, cities: [] },

  // States with significant city-level variation
  // State adj = state_avg - 18 (so 3-star tip matches real average)
  // City adj = city_expected_avg - 18 (replaces state adj, not additive)
  {
    id: "ny", label: "New York", adj: 0.7,  // 18.7% state avg
    cities: [
      // NYC is a well-known outlier — 20%+ is the floor, power users tip 22-25%
      { id: "ny_nyc",     label: "New York City",    adj: 3.0,  note: "21%+ is the norm here; 20% is considered low" },
      // Upstate cities track close to state average
      { id: "ny_buffalo", label: "Buffalo",          adj: 0.5  },
      { id: "ny_albany",  label: "Albany",           adj: 0.5  },
      { id: "ny_other",   label: "Rest of New York", adj: 0.5  },
    ],
  },
  {
    id: "ca", label: "California", adj: -0.7,  // 17.3% state avg → adj = 17.3 - 18 = -0.7
    cities: [
      // SF tech culture tips well despite low state avg
      { id: "ca_sf",    label: "San Francisco / Bay Area", adj: 2.0,  note: "20% is the baseline expectation; many tip 20–22%" },
      // LA is slightly above state avg but below SF
      { id: "ca_la",    label: "Los Angeles",              adj: 0.5  },
      { id: "ca_sd",    label: "San Diego",                adj: -0.5 },
      { id: "ca_sac",   label: "Sacramento",               adj: -0.5 },
      { id: "ca_other", label: "Rest of California",       adj: -1.0 },
    ],
  },
  {
    id: "tx", label: "Texas", adj: -0.7,  // 18.7% state avg → adj = 18.7 - 18 = -0.7 (but wait: actually state-level adj = -0.7)
    // However we set state adj = -0.7 but when a city is selected it replaces that entirely
    cities: [
      // Austin: vibrant food culture, higher incomes, tech scene → 20%+ common, 25% at 5-star
      // Target: 5-star mid = 18 * 1.28 + adj = 25 → adj = 1.96 ≈ 2.0
      { id: "tx_austin",  label: "Austin",              adj: 2.0,  note: "Generous tipping city — 20%+ is common; 25% for exceptional service" },
      // DFW tracks roughly at state avg or slightly above
      { id: "tx_dallas",  label: "Dallas / Fort Worth", adj: 0.0  },
      // Houston similar to DFW
      { id: "tx_houston", label: "Houston",             adj: -0.3 },
      // SA slightly below state avg
      { id: "tx_sa",      label: "San Antonio",         adj: -0.7 },
      // Rural TX tips around 15–16%
      { id: "tx_other",   label: "Rest of Texas",       adj: -2.0, note: "15% is the common baseline outside major cities" },
    ],
  },
  {
    id: "il", label: "Illinois", adj: 1.0,  // 19.0% state avg → adj = 1.0
    cities: [
      // Chicago is a well-known strong tipping city — 20% is standard
      { id: "il_chicago", label: "Chicago",          adj: 2.0,  note: "20% is the standard in Chicago; 18% reads as low" },
      { id: "il_other",   label: "Rest of Illinois", adj: 0.0  },
    ],
  },
  {
    id: "fl", label: "Florida", adj: 0.2,  // 18.2% state avg → adj = 0.2
    cities: [
      // Miami tips well relative to FL avg (tourism, Latin culture)
      { id: "fl_miami",   label: "Miami",           adj: 1.5,  note: "Tourism hub; 20% is widely expected" },
      // Orlando and Tampa near state avg
      { id: "fl_orlando", label: "Orlando",         adj: 0.2  },
      { id: "fl_tampa",   label: "Tampa",           adj: 0.2  },
      { id: "fl_other",   label: "Rest of Florida", adj: -0.5 },
    ],
  },
  {
    id: "ma", label: "Massachusetts", adj: 1.3,  // 19.3% state avg → adj = 1.3
    cities: [
      // Boston tips above state avg — professional city
      { id: "ma_boston", label: "Boston",                adj: 2.0,  note: "20%+ is standard in Boston" },
      { id: "ma_other",  label: "Rest of Massachusetts", adj: 1.0  },
    ],
  },
  {
    id: "wa", label: "Washington", adj: -0.2,  // 17.8% state avg → adj = -0.2
    cities: [
      // Seattle is above state avg despite low state number (rural WA drags it down)
      { id: "wa_seattle", label: "Seattle",            adj: 1.5,  note: "High COL; 19–20% is standard in the city" },
      { id: "wa_other",   label: "Rest of Washington", adj: -1.5 },
    ],
  },
  {
    id: "co", label: "Colorado", adj: 1.5,  // 19.5% state avg → adj = 1.5
    cities: [
      // Denver/Boulder tip well — active, affluent population
      { id: "co_denver", label: "Denver / Boulder", adj: 2.0,  note: "20%+ is common in Denver and Boulder" },
      { id: "co_other",  label: "Rest of Colorado", adj: 0.5  },
    ],
  },

  // States where tips are fairly uniform — no city drill-down needed
  // adj = state_avg - 18 (OysterLink data, rounded to 1 decimal)
  { id: "ak", label: "Alaska",          adj: 0.8  },                                                              // 18.8%
  { id: "az", label: "Arizona",         adj: 1.1,  cities: [] },                                                  // 19.1%
  { id: "ar", label: "Arkansas",        adj: 0.5,  note: "18–19% is the local norm" },                            // 18.5%
  { id: "ct", label: "Connecticut",     adj: 1.1  },                                                              // 19.1%
  { id: "dc", label: "Washington D.C.", adj: 3.0,  note: "21%+ is common in DC — high COL, professional crowd" }, // well above avg
  { id: "de", label: "Delaware",        adj: 3.5,  note: "Delaware tips the most of any state — 21.5% average" }, // 21.5%
  { id: "ga", label: "Georgia",         adj: 0.8  },                                                              // 18.8%
  { id: "hi", label: "Hawaii",          adj: 0.5,  note: "18–19% is standard; resort service often included" },   // 18.5%
  { id: "id", label: "Idaho",           adj: 1.5  },                                                              // 19.5%
  { id: "in", label: "Indiana",         adj: 2.4,  note: "Indiana averages 20.4% — one of the highest in the US" }, // 20.4%
  { id: "ia", label: "Iowa",            adj: 1.8  },                                                              // 19.8%
  { id: "ks", label: "Kansas",          adj: 1.8  },                                                              // 19.8%
  { id: "ky", label: "Kentucky",        adj: 2.3,  note: "Kentucky averages 20.3% — tip generously" },            // 20.3%
  { id: "la", label: "Louisiana",       adj: 0.4  },                                                              // 18.4%
  { id: "me", label: "Maine",           adj: 1.7  },                                                              // 19.7%
  { id: "md", label: "Maryland",        adj: 1.3  },                                                              // 19.3%
  { id: "mi", label: "Michigan",        adj: 1.9  },                                                              // 19.9%
  { id: "mn", label: "Minnesota",       adj: 1.0  },                                                              // 19.0%
  { id: "ms", label: "Mississippi",     adj: 0.7,  note: "18–19% is the norm here" },                             // 18.7%
  { id: "mo", label: "Missouri",        adj: 1.9  },                                                              // 19.9%
  { id: "mt", label: "Montana",         adj: 1.9  },                                                              // 19.9%
  { id: "ne", label: "Nebraska",        adj: 1.7  },                                                              // 19.7%
  { id: "nv", label: "Nevada",          adj: 0.1  },                                                              // 18.1%
  { id: "nh", label: "New Hampshire",   adj: 2.4,  note: "NH averages 20.4% — tip generously" },                  // 20.4%
  { id: "nj", label: "New Jersey",      adj: 0.7  },                                                              // 18.7%
  { id: "nm", label: "New Mexico",      adj: 0.9  },                                                              // 18.9%
  { id: "nc", label: "North Carolina",  adj: 1.4  },                                                              // 19.4%
  { id: "nd", label: "North Dakota",    adj: 1.3  },                                                              // 19.3%
  { id: "oh", label: "Ohio",            adj: 2.3  },                                                              // 20.3%
  { id: "ok", label: "Oklahoma",        adj: 1.0  },                                                              // 19.0%
  { id: "or", label: "Oregon",          adj: 1.0  },                                                              // 19.0%
  { id: "pa", label: "Pennsylvania",    adj: 1.8  },                                                              // 19.8%
  { id: "ri", label: "Rhode Island",    adj: 2.0  },                                                              // 20.0%
  { id: "sc", label: "South Carolina",  adj: 2.0  },                                                              // 20.0%
  { id: "sd", label: "South Dakota",    adj: 1.4  },                                                              // 19.4%
  { id: "tn", label: "Tennessee",       adj: 1.2  },                                                              // 19.2%
  { id: "ut", label: "Utah",            adj: 0.7  },                                                              // 18.7%
  { id: "vt", label: "Vermont",         adj: 1.4  },                                                              // 19.4%
  { id: "va", label: "Virginia",        adj: 1.1  },                                                              // 19.1%
  { id: "wv", label: "West Virginia",   adj: 2.5,  note: "WV averages 20.5% — one of the highest in the US" },    // 20.5%
  { id: "wi", label: "Wisconsin",       adj: 2.0  },                                                              // 20.0%
  { id: "wy", label: "Wyoming",         adj: 2.3  },                                                              // 20.3%
];

// Returns the effective adjustment for a given state + optional city selection.
export function getLocationAdj(stateId, cityId) {
  if (!stateId || stateId === "national") return 0;
  const state = STATES.find((s) => s.id === stateId);
  if (!state) return 0;
  if (cityId && state.cities?.length) {
    const city = state.cities.find((c) => c.id === cityId);
    if (city) return city.adj;
  }
  return state.adj;
}

export function getLocationLabel(stateId, cityId) {
  if (!stateId || stateId === "national") return null;
  const state = STATES.find((s) => s.id === stateId);
  if (!state) return null;
  if (cityId && state.cities?.length) {
    const city = state.cities.find((c) => c.id === cityId);
    if (city) return `${city.label}, ${state.label}`;
  }
  return state.label;
}

export function getLocationNote(stateId, cityId) {
  if (!stateId || stateId === "national") return null;
  const state = STATES.find((s) => s.id === stateId);
  if (!state) return null;
  if (cityId && state.cities?.length) {
    const city = state.cities.find((c) => c.id === cityId);
    if (city?.note) return city.note;
  }
  return state.note || null;
}

// Country-level tip adjustments (additive % points on the base).
// Calibrated from the Hawaiian Islands infographic (TripAdvisor data, 162 countries).
// All values are mid-point of each country's range minus the US 18% base.
// e.g. UK "10%" → mid = 10 → adj = 10 - 18 = -8
const COUNTRY_ADJUSTMENTS = {

  // ── North America ─────────────────────────────────────────────────────────
  "united states": 2,   "usa": 2,   "us": 2,                         // 20%
  "canada": -0.5,                                                      // 15–20% → mid ~17.5%
  "mexico": -3,         "méxico": -3,                                  // 15%
  "cuba": -5.5,                                                        // 10–15% → mid ~12.5%
  "bahamas": -0.5,                                                     // 15–20% → mid ~17.5%
  "dominican republic": -0.5,                                          // 10–20% → mid ~15% → -3
  "belize": -3,                                                        // 15%
  "guatemala": -8,                                                     // 10%
  "honduras": -5.5,                                                    // 10–15% → mid ~12.5%
  "el salvador": -18,                                                  // No tip (service included)
  "nicaragua": -8,                                                     // 10%
  "costa rica": -8,                                                    // 10%
  "panama": -8,                                                        // 10%

  // ── Caribbean ─────────────────────────────────────────────────────────────
  "antigua and barbuda": -5.5,                                         // 10–15%
  "dominica": -8,                                                      // 10%
  "saint kitts and nevis": -18,                                        // Service included
  "saint lucia": -8,                                                   // 10%
  "barbados": -8,                                                      // 10%
  "grenada": -8,                                                       // 10%
  "trinidad and tobago": -18,                                          // Service included
  "saint vincent and the grenadines": -5.5,                            // 10–15%
  "jamaica": -5.5,                                                     // 10–18% → mid ~14%

  // ── South America ─────────────────────────────────────────────────────────
  "colombia": -8,                                                      // 10%
  "venezuela": -10.5,                                                  // 5–10% → mid ~7.5%
  "guyana": -5.5,                                                      // 10–15%
  "ecuador": -18,                                                      // Service included
  "peru": -8,                                                          // 10%
  "bolivia": -8,                                                       // 10%
  "brazil": -8,                                                        // 10%
  "paraguay": -8,                                                      // 10%
  "uruguay": -5.5,                                                     // 10–15%
  "argentina": -5.5,                                                   // 10–15%
  "chile": -8,                                                         // 10%

  // ── Europe ────────────────────────────────────────────────────────────────
  "united kingdom": -8, "uk": -8, "england": -8, "britain": -8,       // 10%
  "ireland": -8,        "ireland (republic of)": -8,                   // 10%
  "france": -8,                                                        // 10%
  "spain": -8,                                                         // 10%
  "portugal": -8,                                                      // 10%
  "luxembourg": -18,                                                   // Service included
  "belgium": -10.5,                                                    // 5–10% (service often included)
  "netherlands": -10.5, "holland": -10.5,                              // 5–10%
  "germany": -10.5,                                                    // 5–10%
  "switzerland": -10.5,                                                // 5–10%
  "liechtenstein": -10.5,                                              // 5–10%
  "austria": -10.5,                                                    // 5–15% → mid ~10%
  "denmark": -10.5,                                                    // 5–10%
  "sweden": -18,                                                       // No tip expected
  "norway": -10.5,                                                     // 5–10% (rare)
  "finland": -18,                                                      // No tip expected
  "iceland": -8,                                                       // 10%
  "italy": -8,                                                         // 10%
  "san marino": -5.5,                                                  // 5–15% → mid ~10%
  "monaco": -5.5,                                                      // 5–10%
  "andorra": -10.5,                                                    // 5–10%
  "greece": -8,                                                        // 10%
  "malta": -8,                                                         // 10%
  "croatia": -8,                                                       // 10%
  "slovenia": -8,                                                      // 10%
  "bosnia and herzegovina": -8,                                        // 10%
  "bosnia": -8,
  "montenegro": -8,                                                    // 10%
  "albania": -8,                                                       // 10%
  "north macedonia": -8,  "macedonia": -8,                             // 10%
  "serbia": -5.5,                                                      // 10–20% → mid ~15%
  "kosovo": -8,                                                        // 10%
  "bulgaria": -8,                                                      // 10%
  "romania": -8,                                                       // 10%
  "hungary": -8,                                                       // 10%
  "slovakia": -8,                                                      // 10%
  "czech republic": -8, "czechia": -8,                                 // 10%
  "poland": -5.5,                                                      // 10–15%
  "ukraine": -8,                                                       // 10%
  "moldova": -8,                                                       // 10%
  "belarus": -10.5,                                                    // 5–10%
  "estonia": -8,                                                       // 10%
  "latvia": -8,                                                        // 10%
  "lithuania": -5.5,                                                   // 5–15% → mid ~10%
  "russia": -5.5,                                                      // 10–15%
  "cyprus": -8,                                                        // 10%

  // ── Middle East ───────────────────────────────────────────────────────────
  "uae": -3.5,  "united arab emirates": -3.5,  "dubai": -3.5,         // 10–15%
  "oman": -8,                                                          // 10%
  "qatar": -3.5,                                                       // 10–15%
  "bahrain": -8,                                                       // 10%
  "kuwait": -5.5,                                                      // 10–15%
  "saudi arabia": -5.5,                                                // 10–15%
  "israel": -8,                                                        // 12% (Palestine 12%)
  "palestine": -8,                                                     // 12%
  "jordan": -10.5,                                                     // 5–10%
  "lebanon": -8,                                                       // 12%
  "turkey": -8,                                                        // 10%
  "iran": -18,                                                         // No tip (not shown)
  "iraq": -18,

  // ── Africa ────────────────────────────────────────────────────────────────
  "egypt": -8,                                                         // 10%
  "tunisia": -8,                                                       // 10%
  "morocco": -8,                                                       // 10%
  "algeria": -5.5,                                                     // 10–15%
  "mauritania": -5.5,                                                  // 12–15%
  "senegal": -8,                                                       // 10%
  "the gambia": -10.5,                                                 // 7.5% → mid ~7.5%
  "gambia": -10.5,
  "cape verde": -10.5,                                                 // 5–10%
  "mali": -8,                                                          // 10%
  "niger": -8,
  "nigeria": -8,                                                       // 10%
  "ghana": -10.5,                                                      // 5–10%
  "côte d'ivoire": -8, "ivory coast": -8, "cote d'ivoire": -8,        // 10%
  "cameroon": -5.5,                                                    // 10–15%
  "equatorial guinea": -8,                                             // 10%
  "gabon": -8,                                                         // 10%
  "angola": -8,                                                        // 10%
  "congo": -8,   "republic of the congo": -8,  "drc": -8,             // 10%
  "namibia": -8,                                                       // 10%
  "botswana": -8,                                                      // 10%
  "south africa": -8,                                                  // 10%
  "ethiopia": -10.5,                                                   // 5–10%
  "kenya": -8,                                                         // 10%
  "tanzania": -8,                                                      // 10%
  "seychelles": -8,                                                    // 10%
  "madagascar": -10.5,                                                 // 5–10%
  "zimbabwe": -8,                                                      // 10%
  "eswatini": -8,  "swaziland": -8,                                   // 10%
  "mauritius": -5.5,                                                   // 10–15%
  "djibouti": -18,                                                     // No tip
  "eritrea": -18,

  // ── South & Central Asia ──────────────────────────────────────────────────
  "india": -11,                                                        // 7–10% → mid ~8.5%
  "nepal": -8,                                                         // 10%
  "bhutan": -18,                                                       // No tipping custom
  "sri lanka": -8,                                                     // 10%
  "bangladesh": -13.5,                                                 // 2–10% → mid ~6%
  "maldives": -5.5,                                                    // 10–15%
  "pakistan": -18,                                                     // No tipping norm
  "afghanistan": -18,
  "uzbekistan": -18,  "tajikistan": -18,  "turkmenistan": -10.5,       // 5–10%
  "kazakhstan": -18,
  "georgia": -5.5,                                                     // 10–20%
  "armenia": -8,                                                       // 10–20%
  "azerbaijan": -18,                                                   // No tip common

  // ── East & Southeast Asia ─────────────────────────────────────────────────
  "china": -18,                                                        // No tip (can be rude)
  "mongolia": -8,                                                      // 10%
  "japan": -18,                                                        // No tipping — considered rude
  "south korea": -18,  "korea": -18,                                   // No tipping
  "taiwan": -18,                                                       // No tipping
  "thailand": -8,                                                      // 10%
  "myanmar": -8,                                                       // 10%
  "laos": -18,
  "cambodia": -18,                                                     // No tip norm shown
  "vietnam": -10.5,                                                    // 5–10%
  "malaysia": -18,                                                     // Service charge included
  "singapore": -18,                                                    // Service charge included (10% auto-added)
  "indonesia": -10.5,                                                  // 5–10%
  "philippines": -8,                                                   // 10%
  "hong kong": -18,                                                    // Service charge included
  "brunei": -18,

  // ── Oceania ───────────────────────────────────────────────────────────────
  "australia": -18,                                                    // No standard tipping
  "new zealand": -18,                                                  // No standard tipping
  "fiji": -18,
  "samoa": -18,
  "vanuatu": -8,                                                       // 10%
  "marshall islands": -10.5,                                           // 5–10%
};

export function getCountryAdj(country) {
  if (!country) return 0;
  const key = country.trim().toLowerCase();
  return COUNTRY_ADJUSTMENTS[key] ?? -8; // default: ~10% is the most common international norm
}

// Budget mode multiplier — brings percentages down to the lower end of acceptable norms.
export const BUDGET_MODE_MULT = 0.78;

export function SettingsProvider({ children }) {
  // theme: "light" | "dark" | "system"
  const [theme, setTheme] = useState(() => localStorage.getItem("tiphelper_theme") || "system");
  const [budgetMode, setBudgetMode] = useState(() => localStorage.getItem("tiphelper_budget") === "true");
  const [stateId, setStateId] = useState(() => localStorage.getItem("tiphelper_state") || "national");
  const [cityId, setCityId] = useState(() => localStorage.getItem("tiphelper_city") || "");
  const [notInUS, setNotInUS] = useState(() => localStorage.getItem("tiphelper_notinus") === "true");
  const [country, setCountry] = useState(() => localStorage.getItem("tiphelper_country") || "");

  // Resolve effective dark mode from theme setting
  const systemDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const darkMode = theme === "dark" || (theme === "system" && systemDark);
  const setDarkMode = (val) => setTheme(val ? "dark" : "light");

  useEffect(() => {
    localStorage.setItem("tiphelper_theme", theme);
    let effective = theme === "dark";
    if (theme === "system") {
      effective = window.matchMedia("(prefers-color-scheme: dark)").matches;
      // Also listen for system changes
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e) => document.documentElement.classList.toggle("dark", e.matches);
      mq.addEventListener("change", handler);
      document.documentElement.classList.toggle("dark", effective);
      return () => mq.removeEventListener("change", handler);
    }
    document.documentElement.classList.toggle("dark", effective);
  }, [theme]);

  useEffect(() => { localStorage.setItem("tiphelper_budget", budgetMode); }, [budgetMode]);
  useEffect(() => { localStorage.setItem("tiphelper_state", stateId); }, [stateId]);
  useEffect(() => { localStorage.setItem("tiphelper_city", cityId); }, [cityId]);
  useEffect(() => { localStorage.setItem("tiphelper_notinus", notInUS); }, [notInUS]);
  useEffect(() => { localStorage.setItem("tiphelper_country", country); }, [country]);

  const handleSetStateId = (id) => {
    setStateId(id);
    setCityId(""); // reset city when state changes
  };

  return (
    <SettingsContext.Provider value={{
      theme, setTheme,
      darkMode, setDarkMode,
      budgetMode, setBudgetMode,
      stateId, setStateId: handleSetStateId,
      cityId, setCityId,
      notInUS, setNotInUS,
      country, setCountry,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}