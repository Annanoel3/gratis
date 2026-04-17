import React, { useState, useMemo } from "react";
import { Settings } from "lucide-react";
import BillInput from "@/components/tip/BillInput";
import SituationSelect from "@/components/tip/SituationSelect";
import ServiceRating from "@/components/tip/ServiceRating";
import ModeToggle from "@/components/tip/ModeToggle";
import TipDisplay from "@/components/tip/TipDisplay";
import VenueTier from "@/components/tip/VenueTier";
import SettingsPanel from "@/components/tip/SettingsPanel";
import { computeTip } from "@/lib/tipScenarios";
import { useSettings, BUDGET_MODE_MULT, getLocationAdj, getLocationLabel } from "@/lib/SettingsContext";

export default function Home() {
  const [bill, setBill] = useState("");
  const [people, setPeople] = useState(1);
  const [scenario, setScenario] = useState(null);
  const [rating, setRating] = useState(3);
  const [mode, setMode] = useState("rating"); // "rating" | "custom"
  const [customPercent, setCustomPercent] = useState(18);
  const [venueTier, setVenueTier] = useState("mid");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { budgetMode, stateId, cityId } = useSettings();

  const billNum = parseFloat(bill) || 0;
  const locationAdj = getLocationAdj(stateId, cityId);
  const budgetMult = budgetMode ? BUDGET_MODE_MULT : 1;
  const locationLabel = getLocationLabel(stateId, cityId);

  const result = useMemo(
    () =>
      computeTip({
        scenario,
        bill: billNum,
        rating,
        mode,
        customPercent,
        people,
        venueTier,
        budgetMult,
        locationAdj,
      }),
    [scenario, billNum, rating, mode, customPercent, people, venueTier, budgetMult, locationAdj]
  );

  const showResult = billNum > 0 && (mode === "custom" || scenario);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-5 py-12 md:py-20">

        {/* Settings button */}
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setSettingsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition"
          >
            <Settings className="w-4 h-4" />
            Settings
            {(budgetMode || locationLabel) && (
              <span className="ml-1 w-2 h-2 rounded-full bg-accent inline-block" />
            )}
          </button>
        </div>

        <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />

        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block text-[10px] uppercase tracking-[0.3em] text-accent font-semibold mb-4">
            TipHelper
          </div>
          <h1 className="font-serif text-5xl md:text-6xl leading-[1.05] tracking-tight">
            How much
            <br />
            <span className="italic text-accent">should you tip?</span>
          </h1>
          <p className="mt-5 text-muted-foreground max-w-md mx-auto">
            Research-backed tipping guidance for every situation — from sit-down dinners to lawn care.
          </p>
          {(budgetMode || locationLabel) && (
            <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
              {budgetMode && (
                <span className="inline-flex items-center gap-1 text-xs bg-accent/15 text-accent rounded-full px-3 py-1 font-medium">
                  Budget Mode on
                </span>
              )}
              {locationLabel && (
                <span className="inline-flex items-center gap-1 text-xs bg-secondary text-muted-foreground rounded-full px-3 py-1">
                  📍 {locationLabel}
                </span>
              )}
            </div>
          )}
        </header>

        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-7 shadow-sm">
          <BillInput
            bill={bill}
            setBill={setBill}
            people={people}
            setPeople={setPeople}
          />

          <SituationSelect selected={scenario} onSelect={setScenario} />

          <ModeToggle
            mode={mode}
            setMode={setMode}
            customPercent={customPercent}
            setCustomPercent={setCustomPercent}
          />

          {mode === "rating" && scenario?.venueAware && (
            <VenueTier venueTier={venueTier} setVenueTier={setVenueTier} />
          )}

          {mode === "rating" && scenario && (
            <ServiceRating rating={rating} setRating={setRating} />
          )}
        </div>

        {/* Result */}
        <div className="mt-6">
          {showResult ? (
            <TipDisplay result={result} scenario={scenario} people={people} />
          ) : (
            <div className="text-center text-sm text-muted-foreground py-8">
              Enter a bill amount{mode === "rating" && " and pick a situation"} to see your tip.
            </div>
          )}
        </div>

        <footer className="mt-10 text-center text-xs text-muted-foreground">
          Guidelines based on standard US tipping customs. Adjust to taste.
        </footer>
      </div>
    </div>
  );
}