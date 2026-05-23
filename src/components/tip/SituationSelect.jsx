import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Check, X } from "lucide-react";
import { TIP_SCENARIOS, CATEGORIES } from "@/lib/tipScenarios";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const CATEGORY_ICONS = {
  "Dining":        "🍽️",
  "Travel":        "✈️",
  "Hotel":         "🏨",
  "Personal Care": "💅",
  "Home Services": "🏠",
  "Pet Services":  "🐾",
  "Other":         "✨",
};

export default function SituationSelect({ selected, onSelect, locationAdj = 0 }) {
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const openInUrl = searchParams.get("picker") === "situation";

  useEffect(() => {
    if (open && !openInUrl) {
      setSearchParams((p) => { const n = new URLSearchParams(p); n.set("picker", "situation"); return n; }, { replace: true });
    } else if (!open && openInUrl) {
      setSearchParams((p) => { const n = new URLSearchParams(p); n.delete("picker"); return n; }, { replace: true });
    }
  }, [open]);

  useEffect(() => {
    if (!openInUrl && open) setOpen(false);
  }, [openInUrl]);

  const handleOpen = () => {
    // Pre-select the category of the currently selected scenario
    if (selected) setActiveCategory(selected.category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveCategory(null);
  };

  const scenariosForCategory = activeCategory
    ? TIP_SCENARIOS.filter((s) => s.category === activeCategory)
    : [];

  return (
    <div className="relative">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">
        Situation
      </span>
      <button
        type="button"
        onClick={handleOpen}
        className="mt-2 w-full flex items-center justify-between px-4 py-4 bg-card border border-border rounded-xl hover:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent transition text-left"
      >
        <span className={selected ? "font-serif text-xl" : "text-muted-foreground text-lg"}>
          {selected ? selected.label : "Choose a situation…"}
        </span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={handleClose} />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute z-50 left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                {activeCategory ? (
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    <span>{CATEGORY_ICONS[activeCategory]} {activeCategory}</span>
                  </button>
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">Pick a category</span>
                )}
                <button onClick={handleClose} className="p-1 rounded-full hover:bg-secondary transition">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {!activeCategory ? (
                  /* Category list */
                  <motion.div
                    key="categories"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.15 }}
                    className="divide-y divide-border"
                  >
                    {CATEGORIES.map((cat) => {
                      const count = TIP_SCENARIOS.filter((s) => s.category === cat).length;
                      const isSelectedCat = selected?.category === cat;
                      return (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-secondary active:bg-secondary transition text-left"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{CATEGORY_ICONS[cat]}</span>
                            <div>
                              <div className={`text-sm font-medium ${isSelectedCat ? "text-accent" : ""}`}>{cat}</div>
                              <div className="text-xs text-muted-foreground">{count} situations</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {isSelectedCat && <span className="w-2 h-2 rounded-full bg-accent" />}
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                ) : (
                  /* Situations list */
                  <motion.div
                    key="situations"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.15 }}
                    className="max-h-72 overflow-y-auto divide-y divide-border"
                  >
                    {scenariosForCategory.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { onSelect(s); handleClose(); }}
                        className="w-full text-left px-4 py-3 hover:bg-secondary active:bg-secondary flex items-center justify-between transition"
                      >
                        <div>
                          <div className={`text-sm font-medium ${selected?.id === s.id ? "text-accent" : ""}`}>
                            {s.label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {s.type === "flat"
                              ? `$${s.flatMin}–$${s.flatMax} typical`
                              : s.type === "movers"
                              ? "Calculated by crew & hours"
                              : s.type === "hybrid_delivery"
                              ? `${s.base}% or $${s.hybridMin} min`
                              : `${s.base}% base`}
                          </div>
                        </div>
                        {selected?.id === s.id && <Check className="w-4 h-4 text-accent shrink-0" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}