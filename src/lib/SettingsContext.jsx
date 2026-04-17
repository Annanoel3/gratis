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
    id: "ny", label: "New York", adj: 1,
    cities: [
      { id: "ny_nyc",     label: "New York City",    adj: 2.5, note: "20%+ is widely considered the floor here" },
      { id: "ny_buffalo", label: "Buffalo",          adj: 0 },
      { id: "ny_albany",  label: "Albany",           adj: 0 },
      { id: "ny_other",   label: "Rest of New York", adj: 0.5 },
    ],
  },
  {
    id: "ca", label: "California", adj: 1,
    cities: [
      { id: "ca_sf",   label: "San Francisco / Bay Area", adj: 2,   note: "20% is the standard expectation" },
      { id: "ca_la",   label: "Los Angeles",              adj: 1.5 },
      { id: "ca_sd",   label: "San Diego",                adj: 1 },
      { id: "ca_sac",  label: "Sacramento",               adj: 0.5 },
      { id: "ca_other",label: "Rest of California",       adj: 0.5 },
    ],
  },
  {
    id: "tx", label: "Texas", adj: -0.5,
    cities: [
      { id: "tx_austin",  label: "Austin",          adj: 0.5, note: "Tech-boom city; 18–20% is common" },
      { id: "tx_dallas",  label: "Dallas / Fort Worth", adj: 0 },
      { id: "tx_houston", label: "Houston",         adj: 0 },
      { id: "tx_sa",      label: "San Antonio",     adj: -0.5 },
      { id: "tx_other",   label: "Rest of Texas",   adj: -1,  note: "15% is the most common baseline" },
    ],
  },
  {
    id: "il", label: "Illinois", adj: 0,
    cities: [
      { id: "il_chicago", label: "Chicago",          adj: 1.5, note: "18–20% is the norm in the city" },
      { id: "il_other",   label: "Rest of Illinois", adj: -0.5 },
    ],
  },
  {
    id: "fl", label: "Florida", adj: 0,
    cities: [
      { id: "fl_miami",   label: "Miami",            adj: 1 },
      { id: "fl_orlando", label: "Orlando",          adj: 0 },
      { id: "fl_tampa",   label: "Tampa",            adj: 0 },
      { id: "fl_other",   label: "Rest of Florida",  adj: -0.5 },
    ],
  },
  {
    id: "ma", label: "Massachusetts", adj: 1,
    cities: [
      { id: "ma_boston", label: "Boston",                    adj: 1.5 },
      { id: "ma_other",  label: "Rest of Massachusetts",     adj: 0.5 },
    ],
  },
  {
    id: "wa", label: "Washington", adj: 0.5,
    cities: [
      { id: "wa_seattle", label: "Seattle",            adj: 1.5, note: "High COL; 18–20% expected" },
      { id: "wa_other",   label: "Rest of Washington", adj: 0 },
    ],
  },
  {
    id: "co", label: "Colorado", adj: 0,
    cities: [
      { id: "co_denver", label: "Denver / Boulder", adj: 0.5 },
      { id: "co_other",  label: "Rest of Colorado", adj: -0.5 },
    ],
  },

  // States where tips are fairly uniform — no city drill-down needed
  { id: "ak", label: "Alaska",        adj: 1,    note: "Higher COL; 18–20% is standard" },
  { id: "az", label: "Arizona",       adj: -0.5, cities: [] },
  { id: "ar", label: "Arkansas",      adj: -1.5, note: "15% is generous here" },
  { id: "ct", label: "Connecticut",   adj: 1 },
  { id: "dc", label: "Washington D.C.", adj: 1.5 },
  { id: "de", label: "Delaware",      adj: 0 },
  { id: "ga", label: "Georgia",       adj: -0.5 },
  { id: "hi", label: "Hawaii",        adj: 1.5,  note: "Very high COL; 20% is the norm" },
  { id: "id", label: "Idaho",         adj: -1 },
  { id: "in", label: "Indiana",       adj: -1 },
  { id: "ia", label: "Iowa",          adj: -1.5, note: "15% is generous here" },
  { id: "ks", label: "Kansas",        adj: -1 },
  { id: "ky", label: "Kentucky",      adj: -1 },
  { id: "la", label: "Louisiana",     adj: -0.5 },
  { id: "me", label: "Maine",         adj: 0 },
  { id: "md", label: "Maryland",      adj: 0.5 },
  { id: "mi", label: "Michigan",      adj: -0.5 },
  { id: "mn", label: "Minnesota",     adj: -0.5 },
  { id: "ms", label: "Mississippi",   adj: -1.5, note: "15% is generous here" },
  { id: "mo", label: "Missouri",      adj: -1 },
  { id: "mt", label: "Montana",       adj: -1 },
  { id: "ne", label: "Nebraska",      adj: -1 },
  { id: "nv", label: "Nevada",        adj: 0.5 },
  { id: "nh", label: "New Hampshire", adj: 0 },
  { id: "nj", label: "New Jersey",    adj: 1 },
  { id: "nm", label: "New Mexico",    adj: -1 },
  { id: "nc", label: "North Carolina", adj: -0.5 },
  { id: "nd", label: "North Dakota",  adj: -1.5 },
  { id: "oh", label: "Ohio",          adj: -0.5 },
  { id: "ok", label: "Oklahoma",      adj: -1 },
  { id: "or", label: "Oregon",        adj: 0.5 },
  { id: "pa", label: "Pennsylvania",  adj: 0 },
  { id: "ri", label: "Rhode Island",  adj: 0.5 },
  { id: "sc", label: "South Carolina", adj: -1 },
  { id: "sd", label: "South Dakota",  adj: -1.5 },
  { id: "tn", label: "Tennessee",     adj: -0.5 },
  { id: "ut", label: "Utah",          adj: -0.5 },
  { id: "vt", label: "Vermont",       adj: 0 },
  { id: "va", label: "Virginia",      adj: 0 },
  { id: "wv", label: "West Virginia", adj: -1.5 },
  { id: "wi", label: "Wisconsin",     adj: -1 },
  { id: "wy", label: "Wyoming",       adj: -1 },
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

// Budget mode multiplier — brings percentages down to the lower end of acceptable norms.
export const BUDGET_MODE_MULT = 0.78;

export function SettingsProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("tiphelper_dark") === "true");
  const [budgetMode, setBudgetMode] = useState(() => localStorage.getItem("tiphelper_budget") === "true");
  const [stateId, setStateId] = useState(() => localStorage.getItem("tiphelper_state") || "national");
  const [cityId, setCityId] = useState(() => localStorage.getItem("tiphelper_city") || "");
  const [notInUS, setNotInUS] = useState(() => localStorage.getItem("tiphelper_notinus") === "true");
  const [country, setCountry] = useState(() => localStorage.getItem("tiphelper_country") || "");

  useEffect(() => {
    localStorage.setItem("tiphelper_dark", darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

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