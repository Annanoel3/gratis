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

// Country tip norms — the absolute typical tip % for restaurants in each country.
// Source: Hawaiian Islands / TripAdvisor infographic (162 countries).
// 0 = no tipping, mid-point used for ranges (e.g. "10–15%" → 12.5)
const COUNTRY_NORMS = {

  // ── North America ─────────────────────────────────────────────────────────
  "united states": 20,  "usa": 20,  "us": 20,
  "canada": 17.5,                                                      // 15–20%
  "mexico": 15,
  "cuba": 12.5,                                                        // 10–15%
  "bahamas": 17.5,                                                     // 15–20%
  "dominican republic": 15,                                            // 10–20%
  "belize": 15,
  "guatemala": 10,
  "honduras": 12.5,                                                    // 10–15%
  "el salvador": 0,                                                    // Service included
  "nicaragua": 10,
  "costa rica": 10,
  "panama": 10,

  // ── Caribbean ─────────────────────────────────────────────────────────────
  "antigua and barbuda": 12.5,                                         // 10–15%
  "dominica": 10,
  "saint kitts and nevis": 0,                                          // Service included
  "saint lucia": 10,
  "barbados": 10,
  "grenada": 10,
  "trinidad and tobago": 0,                                            // Service included
  "saint vincent and the grenadines": 12.5,                            // 10–15%
  "jamaica": 14,                                                       // 10–18%

  // ── South America ─────────────────────────────────────────────────────────
  "colombia": 10,
  "venezuela": 7.5,                                                    // 5–10%
  "guyana": 12.5,                                                      // 10–15%
  "ecuador": 0,                                                        // Service included
  "peru": 10,
  "bolivia": 10,
  "brazil": 10,
  "paraguay": 10,
  "uruguay": 12.5,                                                     // 10–15%
  "argentina": 12.5,                                                   // 10–15%
  "chile": 10,

  // ── Europe ────────────────────────────────────────────────────────────────
  "united kingdom": 10, "uk": 10, "england": 10, "britain": 10,
  "ireland": 10,        "ireland (republic of)": 10,
  "france": 10,
  "spain": 10,
  "portugal": 10,
  "luxembourg": 0,                                                     // Service included
  "belgium": 7.5,                                                      // 5–10%
  "netherlands": 7.5,   "holland": 7.5,
  "germany": 7.5,                                                      // 5–10%
  "switzerland": 7.5,
  "liechtenstein": 7.5,
  "austria": 10,                                                       // 5–15%
  "denmark": 7.5,                                                      // 5–10%
  "sweden": 0,                                                         // Not expected
  "norway": 7.5,
  "finland": 0,                                                        // Not expected
  "iceland": 10,
  "italy": 10,
  "san marino": 10,
  "monaco": 7.5,
  "andorra": 7.5,
  "greece": 10,
  "malta": 10,
  "croatia": 10,
  "slovenia": 10,
  "bosnia and herzegovina": 10,  "bosnia": 10,
  "montenegro": 10,
  "albania": 10,
  "north macedonia": 10,  "macedonia": 10,
  "serbia": 15,                                                        // 10–20%
  "kosovo": 10,
  "bulgaria": 10,
  "romania": 10,
  "hungary": 10,
  "slovakia": 10,
  "czech republic": 10, "czechia": 10,
  "poland": 12.5,                                                      // 10–15%
  "ukraine": 10,
  "moldova": 10,
  "belarus": 7.5,                                                      // 5–10%
  "estonia": 10,
  "latvia": 10,
  "lithuania": 10,
  "russia": 12.5,                                                      // 10–15%
  "cyprus": 10,

  // ── Middle East ───────────────────────────────────────────────────────────
  "uae": 12.5,  "united arab emirates": 12.5,  "dubai": 12.5,         // 10–15%
  "oman": 10,
  "qatar": 12.5,                                                       // 10–15%
  "bahrain": 10,
  "kuwait": 12.5,                                                      // 10–15%
  "saudi arabia": 12.5,                                                // 10–15%
  "israel": 12,
  "palestine": 12,
  "jordan": 7.5,                                                       // 5–10%
  "lebanon": 12,
  "turkey": 10,
  "iran": 0,
  "iraq": 0,

  // ── Africa ────────────────────────────────────────────────────────────────
  "egypt": 10,
  "tunisia": 10,
  "morocco": 10,
  "algeria": 12.5,                                                     // 10–15%
  "mauritania": 13.5,                                                  // 12–15%
  "senegal": 10,
  "the gambia": 7.5,   "gambia": 7.5,
  "cape verde": 7.5,                                                   // 5–10%
  "mali": 10,
  "niger": 10,
  "nigeria": 10,
  "ghana": 7.5,                                                        // 5–10%
  "côte d'ivoire": 10, "ivory coast": 10, "cote d'ivoire": 10,
  "cameroon": 12.5,                                                    // 10–15%
  "equatorial guinea": 10,
  "gabon": 10,
  "angola": 10,
  "congo": 10,  "republic of the congo": 10,  "drc": 10,
  "namibia": 10,
  "botswana": 10,
  "south africa": 10,
  "ethiopia": 7.5,                                                     // 5–10%
  "kenya": 10,
  "tanzania": 10,
  "seychelles": 10,
  "madagascar": 7.5,                                                   // 5–10%
  "zimbabwe": 10,
  "eswatini": 10,  "swaziland": 10,
  "mauritius": 12.5,                                                   // 10–15%
  "djibouti": 0,
  "eritrea": 0,

  // ── South & Central Asia ──────────────────────────────────────────────────
  "india": 8.5,                                                        // 7–10%
  "nepal": 10,
  "bhutan": 0,
  "sri lanka": 10,
  "bangladesh": 6,                                                     // 2–10%
  "maldives": 12.5,                                                    // 10–15%
  "pakistan": 0,
  "afghanistan": 0,
  "uzbekistan": 0,  "tajikistan": 0,  "turkmenistan": 7.5,
  "kazakhstan": 0,
  "georgia": 15,                                                       // 10–20%
  "armenia": 15,                                                       // 10–20%
  "azerbaijan": 0,

  // ── East & Southeast Asia ─────────────────────────────────────────────────
  "china": 0,                                                          // Can be rude
  "mongolia": 10,
  "japan": 0,                                                          // Considered rude
  "south korea": 0,  "korea": 0,
  "taiwan": 0,
  "thailand": 10,
  "myanmar": 10,
  "laos": 0,
  "cambodia": 0,
  "vietnam": 7.5,                                                      // 5–10%
  "malaysia": 0,                                                       // Service charge included
  "singapore": 0,                                                      // Service charge included
  "indonesia": 7.5,                                                    // 5–10%
  "philippines": 10,
  "hong kong": 0,                                                      // Service charge included
  "brunei": 0,

  // ── Oceania ───────────────────────────────────────────────────────────────
  "australia": 0,                                                      // Not standard
  "new zealand": 0,
  "fiji": 0,
  "samoa": 0,
  "vanuatu": 10,
  "marshall islands": 7.5,                                             // 5–10%
};

// Returns the absolute typical tip % for a country (0 = no tipping expected)
// Default 10 = most common global norm for unknown countries
export function getCountryAdj(country) {
  if (!country) return 0;
  const key = country.trim().toLowerCase();
  return COUNTRY_NORMS[key] ?? 10;
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