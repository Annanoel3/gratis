import React from "react";
import { Moon, Sun, Wallet, MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettings, STATES, getLocationNote } from "@/lib/SettingsContext";

export default function SettingsPanel({ open, onClose }) {
  const { darkMode, setDarkMode, budgetMode, setBudgetMode, stateId, setStateId, cityId, setCityId, notInUS, setNotInUS, country, setCountry } = useSettings();

  const selectedState = STATES.find((s) => s.id === stateId);
  const hasCities = !notInUS && selectedState?.cities?.length > 0;
  const note = !notInUS ? getLocationNote(stateId, cityId) : null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="fixed z-50 top-16 right-4 md:right-8 w-80 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <span className="font-serif text-lg">Settings</span>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-secondary transition">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Dark Mode */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="w-4 h-4 text-accent" /> : <Sun className="w-4 h-4 text-accent" />}
                  <div>
                    <div className="text-sm font-medium">Dark Mode</div>
                    <div className="text-xs text-muted-foreground">{darkMode ? "Easy on the eyes" : "Currently light mode"}</div>
                  </div>
                </div>
                <Toggle on={darkMode} onToggle={() => setDarkMode(!darkMode)} />
              </div>

              <div className="border-t border-border" />

              {/* Budget Mode */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Wallet className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <div>
                    <div className="text-sm font-medium">Budget Mode</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      Shifts suggestions toward the lower-but-still-polite end of each range.
                    </div>
                  </div>
                </div>
                <Toggle on={budgetMode} onToggle={() => setBudgetMode(!budgetMode)} />
              </div>

              {budgetMode && (
                <div className="bg-accent/10 text-accent rounded-lg px-3 py-2 text-xs leading-relaxed -mt-2">
                  Tips reflect the minimum considered polite — servers will notice, but won't be stiffed.
                </div>
              )}

              <div className="border-t border-border" />

              {/* Location — State */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-accent" />
                  <div>
                    <div className="text-sm font-medium">Location <span className="text-muted-foreground font-normal">(optional)</span></div>
                    <div className="text-xs text-muted-foreground">Tipping norms vary by state and city.</div>
                  </div>
                </div>

                {/* Not in the US checkbox */}
                <label className="flex items-center gap-2 mb-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={notInUS}
                    onChange={(e) => {
                      setNotInUS(e.target.checked);
                      if (!e.target.checked) setCountry("");
                    }}
                    className="w-4 h-4 rounded accent-foreground cursor-pointer"
                  />
                  <span className="text-sm">I'm not in the US</span>
                </label>

                {notInUS ? (
                  /* Country input */
                  <div>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. Japan, Germany, Australia…"
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    {country.trim() && (
                      <div className="mt-2 text-xs text-muted-foreground italic">
                        We'll share tipping customs and philosophy for {country.trim()}.
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {/* State picker */}
                    <select
                      value={stateId}
                      onChange={(e) => setStateId(e.target.value)}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      {STATES.filter(s => !s.cities || s.cities.length === 0 || s.id === "national").map((s) => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                      ))}
                      <optgroup label="States with city variation">
                        {STATES.filter(s => s.cities && s.cities.length > 0 && s.id !== "national").map((s) => (
                          <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                      </optgroup>
                    </select>

                    {/* City picker — only shown when state has city-level variation */}
                    {hasCities && (
                      <div className="mt-3">
                        <div className="text-xs text-muted-foreground mb-1.5">Which part of {selectedState.label}?</div>
                        <select
                          value={cityId}
                          onChange={(e) => setCityId(e.target.value)}
                          className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        >
                          <option value="">— Statewide average —</option>
                          {selectedState.cities.map((c) => (
                            <option key={c.id} value={c.id}>{c.label}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {note && (
                      <div className="mt-2 text-xs text-muted-foreground italic">{note}</div>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Toggle({ on, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative shrink-0 w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent ${on ? "bg-foreground" : "bg-border"}`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-background transition-transform duration-200 ${on ? "translate-x-4" : "translate-x-0"}`}
      />
    </button>
  );
}