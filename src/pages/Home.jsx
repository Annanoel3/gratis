import React, { useState, useMemo } from "react";
import BillInput from "@/components/tip/BillInput";
import SituationSelect from "@/components/tip/SituationSelect";
import ServiceRating from "@/components/tip/ServiceRating";
import ModeToggle from "@/components/tip/ModeToggle";
import TipDisplay from "@/components/tip/TipDisplay";
import VenueTier from "@/components/tip/VenueTier";
import { computeTip } from "@/lib/tipScenarios";

export default function Home() {
  const [bill, setBill] = useState("");
  const [people, setPeople] = useState(1);
  const [scenario, setScenario] = useState(null);
  const [rating, setRating] = useState(3);
  const [mode, setMode] = useState("rating"); // "rating" | "custom"
  const [customPercent, setCustomPercent] = useState(18);
  const [venueTier, setVenueTier] = useState("mid");

  const billNum = parseFloat(bill) || 0;

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
      }),
    [scenario, billNum, rating, mode, customPercent, people, venueTier]
  );

  const showResult = billNum > 0 && (mode === "custom" || scenario);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-5 py-12 md:py-20">
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