import React, { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

// City cost-of-living tip adjustments (additive percentage points on the base tip)
// Sources: Bureau of Labor Statistics cost indices, regional tipping surveys
// NYC/SF/Seattle are notably higher-tip markets; rural Midwest/South are lower.
export const LOCATIONS = [
  { id: "national", label: "National Average", adj: 0 },
  { id: "nyc",      label: "New York City",    adj: 2.5,  note: "Higher cost of living; 20%+ is the norm" },
  { id: "sf",       label: "San Francisco / Bay Area", adj: 2, note: "Tech-driven high COL; 20% expected" },
  { id: "la",       label: "Los Angeles",      adj: 1.5 },
  { id: "chicago",  label: "Chicago",          adj: 1.5 },
  { id: "miami",    label: "Miami",            adj: 1 },
  { id: "seattle",  label: "Seattle",          adj: 1.5 },
  { id: "boston",   label: "Boston",           adj: 1.5 },
  { id: "dc",       label: "Washington D.C.",  adj: 1.5 },
  { id: "austin",   label: "Austin",           adj: 0.5 },
  { id: "denver",   label: "Denver",           adj: 0.5 },
  { id: "midwest",  label: "Midwest (general)", adj: -1, note: "15–18% is the local norm" },
  { id: "south",    label: "South (general)",  adj: -1,  note: "15–18% is the local norm" },
  { id: "rural",    label: "Rural / Small Town", adj: -1.5, note: "15% is widely considered generous" },
];

// Budget mode multiplier — brings percentages down to the lower end of acceptable norms.
// 15% for sit-down restaurants is the minimum considered polite by etiquette guides.
export const BUDGET_MODE_MULT = 0.78; // e.g. 18% base → ~14%; 20% → ~15.6%

export function SettingsProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("tiphelper_dark") === "true";
  });
  const [budgetMode, setBudgetMode] = useState(() => {
    return localStorage.getItem("tiphelper_budget") === "true";
  });
  const [location, setLocation] = useState(() => {
    return localStorage.getItem("tiphelper_location") || "national";
  });

  useEffect(() => {
    localStorage.setItem("tiphelper_dark", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("tiphelper_budget", budgetMode);
  }, [budgetMode]);

  useEffect(() => {
    localStorage.setItem("tiphelper_location", location);
  }, [location]);

  return (
    <SettingsContext.Provider value={{ darkMode, setDarkMode, budgetMode, setBudgetMode, location, setLocation }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}