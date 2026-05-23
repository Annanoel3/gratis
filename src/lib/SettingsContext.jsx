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
  {
    id: "ny", label: "New York", adj: -0.7,  // 18.7% avg
    cities: [
      { id: "ny_nyc",     label: "New York City",    adj: 2.5, note: "20%+ is widely considered the floor here" },
      { id: "ny_buffalo", label: "Buffalo",          adj: -0.5 },
      { id: "ny_albany",  label: "Albany",           adj: -0.5 },
      { id: "ny_other",   label: "Rest of New York", adj: -0.5 },
    ],
  },
  {
    id: "ca", label: "California", adj: -2.1,  // 17.3% avg — lowest in the nation
    cities: [
      { id: "ca_sf",   label: "San Francisco / Bay Area", adj: 0,    note: "20% is the standard expectation" },
      { id: "ca_la",   label: "Los Angeles",              adj: -0.5 },
      { id: "ca_sd",   label: "San Diego",                adj: -1 },
      { id: "ca_sac",  label: "Sacramento",               adj: -1.5 },
      { id: "ca_other",label: "Rest of California",       adj: -2 },
    ],
  },
  {
    id: "tx", label: "Texas", adj: -0.7,  // 18.7% avg
    cities: [
      { id: "tx_austin",  label: "Austin",              adj: 1.5,  note: "Vibrant food scene; 20–25% is common for great service" },
      { id: "tx_dallas",  label: "Dallas / Fort Worth", adj: -0.5 },
      { id: "tx_houston", label: "Houston",             adj: -0.5 },
      { id: "tx_sa",      label: "San Antonio",         adj: -1 },
      { id: "tx_other",   label: "Rest of Texas",       adj: -1.5, note: "15% is the most common baseline" },
    ],
  },
  {
    id: "il", label: "Illinois", adj: -0.4,  // 19.0% avg
    cities: [
      { id: "il_chicago", label: "Chicago",          adj: 1.5, note: "18–20% is the norm in the city" },
      { id: "il_other",   label: "Rest of Illinois", adj: -1 },
    ],
  },
  {
    id: "fl", label: "Florida", adj: -1.2,  // 18.2% avg
    cities: [
      { id: "fl_miami",   label: "Miami",            adj: 0.5 },
      { id: "fl_orlando", label: "Orlando",          adj: -1 },
      { id: "fl_tampa",   label: "Tampa",            adj: -1 },
      { id: "fl_other",   label: "Rest of Florida",  adj: -1.5 },
    ],
  },
  {
    id: "ma", label: "Massachusetts", adj: -0.1,  // 19.3% avg
    cities: [
      { id: "ma_boston", label: "Boston",                adj: 1 },
      { id: "ma_other",  label: "Rest of Massachusetts", adj: -0.5 },
    ],
  },
  {
    id: "wa", label: "Washington", adj: -1.6,  // 17.8% avg
    cities: [
      { id: "wa_seattle", label: "Seattle",            adj: 0.5, note: "High COL; 18–20% expected" },
      { id: "wa_other",   label: "Rest of Washington", adj: -2 },
    ],
  },
  {
    id: "co", label: "Colorado", adj: 0.1,  // 19.5% avg
    cities: [
      { id: "co_denver", label: "Denver / Boulder", adj: 0.5 },
      { id: "co_other",  label: "Rest of Colorado", adj: -0.5 },
    ],
  },

  // States where tips are fairly uniform — no city drill-down needed
  { id: "ak", label: "Alaska",          adj: -0.6  },                                         // 18.8%
  { id: "az", label: "Arizona",         adj: -0.3, cities: [] },                              // 19.1%
  { id: "ar", label: "Arkansas",        adj: -0.9, note: "15–18% is the norm here" },         // 18.5%
  { id: "ct", label: "Connecticut",     adj: -0.3 },                                          // 19.1%
  { id: "dc", label: "Washington D.C.", adj: 1.5  },                                          // high COL, above avg
  { id: "de", label: "Delaware",        adj: 2.1,  note: "Highest average tipping state at 21.5%" }, // 21.5%
  { id: "ga", label: "Georgia",         adj: -0.6 },                                          // 18.8%
  { id: "hi", label: "Hawaii",          adj: -0.9, note: "18–19% is typical; tipping norms are relaxed here" }, // 18.5%
  { id: "id", label: "Idaho",           adj: 0.1  },                                          // 19.5%
  { id: "in", label: "Indiana",         adj: 1.0,  note: "Indiana tips well at ~20.4% average" }, // 20.4%
  { id: "ia", label: "Iowa",            adj: 0.4  },                                          // 19.8%
  { id: "ks", label: "Kansas",          adj: 0.4  },                                          // 19.8%
  { id: "ky", label: "Kentucky",        adj: 0.9,  note: "Kentucky averages ~20.3% — tip well" }, // 20.3%
  { id: "la", label: "Louisiana",       adj: -1.0 },                                          // 18.4%
  { id: "me", label: "Maine",           adj: 0.3  },                                          // 19.7%
  { id: "md", label: "Maryland",        adj: -0.1 },                                          // 19.3%
  { id: "mi", label: "Michigan",        adj: 0.5  },                                          // 19.9%
  { id: "mn", label: "Minnesota",       adj: -0.4 },                                          // 19.0%
  { id: "ms", label: "Mississippi",     adj: -0.7, note: "15–18% is the norm here" },         // 18.7%
  { id: "mo", label: "Missouri",        adj: 0.5  },                                          // 19.9%
  { id: "mt", label: "Montana",         adj: 0.5  },                                          // 19.9%
  { id: "ne", label: "Nebraska",        adj: 0.3  },                                          // 19.7%
  { id: "nv", label: "Nevada",          adj: -1.3 },                                          // 18.1%
  { id: "nh", label: "New Hampshire",   adj: 1.0,  note: "NH averages ~20.4% — tip generously" }, // 20.4%
  { id: "nj", label: "New Jersey",      adj: -0.7 },                                          // 18.7%
  { id: "nm", label: "New Mexico",      adj: -0.5 },                                          // 18.9%
  { id: "nc", label: "North Carolina",  adj: 0.0  },                                          // 19.4%
  { id: "nd", label: "North Dakota",    adj: -0.1 },                                          // 19.3%
  { id: "oh", label: "Ohio",            adj: 0.9  },                                          // 20.3%
  { id: "ok", label: "Oklahoma",        adj: -0.4 },                                          // 19.0%
  { id: "or", label: "Oregon",          adj: -0.4 },                                          // 19.0%
  { id: "pa", label: "Pennsylvania",    adj: 0.4  },                                          // 19.8%
  { id: "ri", label: "Rhode Island",    adj: 0.6  },                                          // 20.0%
  { id: "sc", label: "South Carolina",  adj: 0.6  },                                          // 20.0%
  { id: "sd", label: "South Dakota",    adj: 0.0  },                                          // 19.4%
  { id: "tn", label: "Tennessee",       adj: -0.2 },                                          // 19.2%
  { id: "ut", label: "Utah",            adj: -0.7 },                                          // 18.7%
  { id: "vt", label: "Vermont",         adj: 0.0  },                                          // 19.4%
  { id: "va", label: "Virginia",        adj: -0.3 },                                          // 19.1%
  { id: "wv", label: "West Virginia",   adj: 1.1,  note: "WV averages ~20.5% — one of the highest in the US" }, // 20.5%
  { id: "wi", label: "Wisconsin",       adj: 0.6  },                                          // 20.0%
  { id: "wy", label: "Wyoming",         adj: 0.9  },                                          // 20.3%
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
// Positive = tip more, negative = tip less, relative to the US 18% base.
// "none" countries won't show the calculator at all; these cover optional/expected cases.
const COUNTRY_ADJUSTMENTS = {
  // Europe — generally lower than US norms
  "united kingdom": -3,  "uk": -3,  "england": -3,  "britain": -3,
  "france": -4,
  "germany": -4,
  "italy": -2,
  "spain": -4,
  "portugal": -3,
  "netherlands": -4,  "holland": -4,
  "belgium": -4,
  "switzerland": -2,
  "austria": -3,
  "sweden": -5,
  "norway": -5,
  "denmark": -5,
  "finland": -5,
  "ireland": -2,
  "greece": -3,
  "poland": -3,
  "czech republic": -3,  "czechia": -3,
  // Americas
  "canada": -1,
  "mexico": -2,
  "brazil": -2,
  "argentina": -3,
  "colombia": -2,
  // Asia-Pacific — optional/low when tipping is done at all
  "australia": -4,
  "new zealand": -4,
  "singapore": -3,
  "hong kong": -2,
  "india": -2,
  "thailand": -2,
  "indonesia": -3,
  "malaysia": -3,
  "philippines": -2,
  "vietnam": -3,
  // Middle East
  "uae": -1,  "united arab emirates": -1,  "dubai": -1,
  "israel": -2,
  "turkey": -2,
  // Africa
  "south africa": -2,
  "egypt": -2,
  "kenya": -2,
};

export function getCountryAdj(country) {
  if (!country) return 0;
  const key = country.trim().toLowerCase();
  return COUNTRY_ADJUSTMENTS[key] ?? -2; // default: slight reduction for unknown international destinations
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