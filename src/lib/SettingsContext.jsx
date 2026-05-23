import React, { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

// ── Location data ─────────────────────────────────────────────────────────────
// Each state has an `adj` (additive % points on the base tip) that applies when
// no city override is selected. States with notable intra-state variation also
// list `cities` — an array of {id, label, adj, note?}.
// Adjustment scale: +2.5 = very high COL city, 0 = national avg, -2 = rural/low-norm.
export const STATES = [
  { id: "national", label: "No preference", adj: 0, cities: [] },
  { id: "al", label: "Alabama", adj: 1, cities: [] },
  { id: "ak", label: "Alaska", adj: 1, cities: [] },
  { id: "az", label: "Arizona", adj: 1,
    cities: [
      { id: "az_phoenix", label: "Phoenix", adj: 1 },
      { id: "az_scottsdale", label: "Scottsdale", adj: 2 },
      { id: "az_tucson", label: "Tucson", adj: 0 },
      { id: "az_other", label: "Rest of Arizona", adj: 1 },
    ]
  },
  { id: "ar", label: "Arkansas", adj: 0, cities: [] },
  { id: "ca", label: "California", adj: -1,
    note: "CA requires full minimum wage for tipped workers, reducing tip pressure vs. other states.",
    cities: [
      { id: "ca_sf", label: "San Francisco / Bay Area", adj: 1 },
      { id: "ca_la", label: "Los Angeles", adj: 0 },
      { id: "ca_sd", label: "San Diego", adj: 0 },
      { id: "ca_sac", label: "Sacramento", adj: -1 },
      { id: "ca_other", label: "Rest of California", adj: -1 },
    ]
  },
  { id: "co", label: "Colorado", adj: 2,
    cities: [
      { id: "co_denver", label: "Denver", adj: 2 },
      { id: "co_boulder", label: "Boulder", adj: 2 },
      { id: "co_springs", label: "Colorado Springs", adj: 0 },
      { id: "co_other", label: "Rest of Colorado", adj: 2 },
    ]
  },
  { id: "ct", label: "Connecticut", adj: 1, cities: [] },
  { id: "de", label: "Delaware", adj: 4, note: "Highest average tipping state in the US per 2025 data.", cities: [] },
  { id: "fl", label: "Florida", adj: 0,
    cities: [
      { id: "fl_miami", label: "Miami", adj: 2 },
      { id: "fl_orlando", label: "Orlando", adj: 0 },
      { id: "fl_tampa", label: "Tampa", adj: 0 },
      { id: "fl_jax", label: "Jacksonville", adj: -1 },
      { id: "fl_ftl", label: "Fort Lauderdale", adj: 1 },
      { id: "fl_other", label: "Rest of Florida", adj: 0 },
    ]
  },
  { id: "ga", label: "Georgia", adj: 1,
    cities: [
      { id: "ga_atlanta", label: "Atlanta", adj: 2 },
      { id: "ga_savannah", label: "Savannah", adj: 0 },
      { id: "ga_other", label: "Rest of Georgia", adj: 1 },
    ]
  },
  { id: "hi", label: "Hawaii", adj: 0, cities: [] },
  { id: "id", label: "Idaho", adj: 2, cities: [] },
  { id: "il", label: "Illinois", adj: 1,
    cities: [
      { id: "il_chicago", label: "Chicago", adj: 2 },
      { id: "il_springfield", label: "Springfield", adj: 0 },
      { id: "il_other", label: "Rest of Illinois", adj: 1 },
    ]
  },
  { id: "in", label: "Indiana", adj: 2,
    note: "Tip credit state — workers depend heavily on tips.",
    cities: [
      { id: "in_indy", label: "Indianapolis", adj: 2 },
      { id: "in_other", label: "Rest of Indiana", adj: 2 },
    ]
  },
  { id: "ia", label: "Iowa", adj: 2, cities: [] },
  { id: "ks", label: "Kansas", adj: 2, cities: [] },
  { id: "ky", label: "Kentucky", adj: 2,
    note: "Strong tipping culture reinforced by tip credit wage laws.",
    cities: [
      { id: "ky_louisville", label: "Louisville", adj: 2 },
      { id: "ky_lexington", label: "Lexington", adj: 2 },
      { id: "ky_other", label: "Rest of Kentucky", adj: 2 },
    ]
  },
  { id: "la", label: "Louisiana", adj: 0,
    cities: [
      { id: "la_nola", label: "New Orleans", adj: 2, note: "Strong hospitality culture; 20% is the baseline at sit-down restaurants." },
      { id: "la_baton", label: "Baton Rouge", adj: 0 },
      { id: "la_other", label: "Rest of Louisiana", adj: 0 },
    ]
  },
  { id: "me", label: "Maine", adj: 2, cities: [] },
  { id: "md", label: "Maryland", adj: 1,
    cities: [
      { id: "md_baltimore", label: "Baltimore", adj: 1 },
      { id: "md_annapolis", label: "Annapolis", adj: 2 },
      { id: "md_other", label: "Rest of Maryland", adj: 1 },
    ]
  },
  { id: "ma", label: "Massachusetts", adj: 1,
    cities: [
      { id: "ma_boston", label: "Boston", adj: 2 },
      { id: "ma_cambridge", label: "Cambridge", adj: 2 },
      { id: "ma_worcester", label: "Worcester", adj: 0 },
      { id: "ma_other", label: "Rest of Massachusetts", adj: 1 },
    ]
  },
  { id: "mi", label: "Michigan", adj: 2,
    cities: [
      { id: "mi_detroit", label: "Detroit", adj: 1 },
      { id: "mi_annarbor", label: "Ann Arbor", adj: 2 },
      { id: "mi_gr", label: "Grand Rapids", adj: 1 },
      { id: "mi_other", label: "Rest of Michigan", adj: 2 },
    ]
  },
  { id: "mn", label: "Minnesota", adj: 1,
    cities: [
      { id: "mn_mpls", label: "Minneapolis", adj: 1 },
      { id: "mn_stpaul", label: "St. Paul", adj: 1 },
      { id: "mn_other", label: "Rest of Minnesota", adj: 1 },
    ]
  },
  { id: "ms", label: "Mississippi", adj: 1, cities: [] },
  { id: "mo", label: "Missouri", adj: 2,
    cities: [
      { id: "mo_kc", label: "Kansas City", adj: 2 },
      { id: "mo_stl", label: "St. Louis", adj: 1 },
      { id: "mo_other", label: "Rest of Missouri", adj: 2 },
    ]
  },
  { id: "mt", label: "Montana", adj: 2, cities: [] },
  { id: "ne", label: "Nebraska", adj: 2, cities: [] },
  { id: "nv", label: "Nevada", adj: 0,
    note: "Tourism-heavy; inconsistent tipping from visitors unfamiliar with local customs.",
    cities: [
      { id: "nv_vegas", label: "Las Vegas", adj: 2, note: "Hospitality capital — 20% expected, especially at casino restaurants." },
      { id: "nv_reno", label: "Reno", adj: 0 },
      { id: "nv_other", label: "Rest of Nevada", adj: 0 },
    ]
  },
  { id: "nh", label: "New Hampshire", adj: 2, note: "Tip credit state with strong tipping culture.", cities: [] },
  { id: "nj", label: "New Jersey", adj: 1, cities: [] },
  { id: "nm", label: "New Mexico", adj: 1, cities: [] },
  { id: "ny", label: "New York", adj: 1,
    note: "State average ~19%; NYC culture pushes 20-22% as the social norm.",
    cities: [
      { id: "ny_nyc", label: "New York City", adj: 4, note: "20-22% is the baseline expectation. 15% is considered low by many NYC servers." },
      { id: "ny_brooklyn", label: "Brooklyn", adj: 3 },
      { id: "ny_buffalo", label: "Buffalo", adj: 0 },
      { id: "ny_albany", label: "Albany", adj: 0 },
      { id: "ny_other", label: "Rest of New York", adj: 1 },
    ]
  },
  { id: "nc", label: "North Carolina", adj: 1,
    cities: [
      { id: "nc_charlotte", label: "Charlotte", adj: 2 },
      { id: "nc_raleigh", label: "Raleigh", adj: 1 },
      { id: "nc_asheville", label: "Asheville", adj: 2 },
      { id: "nc_other", label: "Rest of North Carolina", adj: 1 },
    ]
  },
  { id: "nd", label: "North Dakota", adj: 1, cities: [] },
  { id: "oh", label: "Ohio", adj: 2,
    cities: [
      { id: "oh_columbus", label: "Columbus", adj: 2 },
      { id: "oh_cleveland", label: "Cleveland", adj: 1 },
      { id: "oh_cincy", label: "Cincinnati", adj: 2 },
      { id: "oh_other", label: "Rest of Ohio", adj: 2 },
    ]
  },
  { id: "ok", label: "Oklahoma", adj: 1, cities: [] },
  { id: "or", label: "Oregon", adj: 1,
    note: "Oregon requires full minimum wage for tipped workers, reducing tip pressure.",
    cities: [
      { id: "or_portland", label: "Portland", adj: 1, note: "Workers benefit from Oregon's full minimum wage; tips still expected." },
      { id: "or_eugene", label: "Eugene", adj: 0 },
      { id: "or_other", label: "Rest of Oregon", adj: 1 },
    ]
  },
  { id: "pa", label: "Pennsylvania", adj: 2,
    cities: [
      { id: "pa_philly", label: "Philadelphia", adj: 2 },
      { id: "pa_pittsburgh", label: "Pittsburgh", adj: 1 },
      { id: "pa_other", label: "Rest of Pennsylvania", adj: 2 },
    ]
  },
  { id: "ri", label: "Rhode Island", adj: 2, cities: [] },
  { id: "sc", label: "South Carolina", adj: 2, cities: [] },
  { id: "sd", label: "South Dakota", adj: 1, cities: [] },
  { id: "tn", label: "Tennessee", adj: 1,
    cities: [
      { id: "tn_nashville", label: "Nashville", adj: 2, note: "Strong tourism and hospitality scene; 20% is the norm." },
      { id: "tn_memphis", label: "Memphis", adj: 0 },
      { id: "tn_other", label: "Rest of Tennessee", adj: 1 },
    ]
  },
  { id: "tx", label: "Texas", adj: 1,
    note: "State average ~19%; Austin and tech-hub areas trend higher. DFW historically lower.",
    cities: [
      { id: "tx_austin", label: "Austin", adj: 2, note: "Tech-heavy, younger demographic. 20% is the comfortable norm; under 15% is noticed." },
      { id: "tx_dallas", label: "Dallas", adj: 0, note: "DFW is the lowest-tipping major metro in Texas. 18% is typical; 15% is not unusual here." },
      { id: "tx_fortworth", label: "Fort Worth", adj: 0 },
      { id: "tx_houston", label: "Houston", adj: 1, note: "Diverse city, strong restaurant culture, close to national average." },
      { id: "tx_antonio", label: "San Antonio", adj: 2, note: "Slightly above Texas average per Square data. Strong local culture of generosity." },
      { id: "tx_elpaso", label: "El Paso", adj: -1 },
      { id: "tx_other", label: "Rest of Texas", adj: 1 },
    ]
  },
  { id: "ut", label: "Utah", adj: 1, cities: [] },
  { id: "vt", label: "Vermont", adj: 1, cities: [] },
  { id: "va", label: "Virginia", adj: 1,
    cities: [
      { id: "va_richmond", label: "Richmond", adj: 1 },
      { id: "va_vb", label: "Virginia Beach", adj: 1 },
      { id: "va_arlington", label: "Arlington", adj: 2 },
      { id: "va_other", label: "Rest of Virginia", adj: 1 },
    ]
  },
  { id: "wa", label: "Washington", adj: 0,
    note: "WA requires full minimum wage for tipped workers, contributing to lower average tip percentages.",
    cities: [
      { id: "wa_seattle", label: "Seattle", adj: 0, note: "Workers benefit from Seattle's high minimum wage ($19+/hr). Tips still standard but less pressure than tip-credit states." },
      { id: "wa_spokane", label: "Spokane", adj: -1 },
      { id: "wa_other", label: "Rest of Washington", adj: 0 },
    ]
  },
  { id: "wv", label: "West Virginia", adj: 3, note: "Tip credit state — workers highly dependent on tips. Strong community tipping culture.", cities: [] },
  { id: "wi", label: "Wisconsin", adj: 2, cities: [] },
  { id: "wy", label: "Wyoming", adj: 2, cities: [] },
  { id: "dc", label: "Washington D.C.", adj: 2, note: "Affluent diner base and professional service industry. 20% is the baseline.", cities: [] },
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
  // ---- NORTH AMERICA ----
  "united states": 2, "usa": 2, "us": 2,
  "canada": 0,
  "mexico": -3, "méxico": -3,

  // ---- WESTERN EUROPE ----
  "united kingdom": -6, "uk": -6, "great britain": -6, "england": -6, "scotland": -6, "wales": -6,
  "ireland": -6,
  "france": -13,
  "germany": -10, "deutschland": -10,
  "italy": -11, "italia": -11,
  "spain": -11, "españa": -11,
  "portugal": -12,
  "netherlands": -10, "holland": -10,
  "belgium": -10,
  "switzerland": -13,
  "austria": -10,
  "luxembourg": -10,

  // ---- SCANDINAVIA ----
  "sweden": -13, "sverige": -13,
  "norway": -13, "norge": -13,
  "denmark": -13, "danmark": -13,
  "finland": -13, "suomi": -13,
  "iceland": -13,

  // ---- SOUTHERN / EASTERN EUROPE ----
  "greece": -8, "hellas": -8,
  "czech republic": -8, "czechia": -8,
  "poland": -6, "polska": -6,
  "hungary": -8,
  "romania": -8,
  "bulgaria": -8,
  "croatia": -8,
  "serbia": -8,
  "russia": -8, "russian federation": -8,
  "ukraine": -8,
  "slovakia": -8,

  // ---- EAST ASIA (no-tip cultures) ----
  "japan": -25, "nippon": -25,
  "south korea": -25, "korea": -25,
  "china": -25, "prc": -25,

  // ---- SOUTHEAST ASIA ----
  "thailand": -8,
  "vietnam": -10, "viet nam": -10,
  "indonesia": -8, "bali": -8,
  "singapore": -13,
  "malaysia": -10,
  "philippines": -8,
  "taiwan": -13,
  "hong kong": -8,

  // ---- SOUTH ASIA ----
  "india": -8,
  "sri lanka": -8,
  "nepal": -8,

  // ---- MIDDLE EAST ----
  "uae": -3, "united arab emirates": -3, "dubai": -3, "abu dhabi": -3,
  "israel": -5,
  "turkey": -10, "türkiye": -10,
  "egypt": -6,
  "jordan": -8,
  "saudi arabia": -8,
  "qatar": -3,
  "bahrain": -3,

  // ---- AFRICA ----
  "south africa": -5,
  "morocco": -8,
  "kenya": -8,
  "nigeria": -8,
  "tanzania": -8,
  "ghana": -8,
  "ethiopia": -8,

  // ---- OCEANIA ----
  "australia": -8,
  "new zealand": -10,

  // ---- LATIN AMERICA ----
  "brazil": -8, "brasil": -8,
  "argentina": -8,
  "colombia": -8,
  "peru": -8,
  "chile": -8,
  "ecuador": -8,
  "venezuela": -8,
  "bolivia": -8,
  "paraguay": -8,
  "uruguay": -8,
  "costa rica": -8,
  "panama": -5,
  "cuba": -8,
  "dominican republic": -5,
  "puerto rico": 0,
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