import React, { useState } from "react";
import { MOVER_RATES } from "@/lib/tipScenarios";
import { motion } from "framer-motion";

function fmt(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}

export default function MoversCalculator({ scenario }) {
  const [numMovers, setNumMovers] = useState(2);
  const [duration, setDuration] = useState("half");

  const rate = MOVER_RATES.find(r => r.id === duration) || MOVER_RATES[1];
  const totalTip = rate.perMover * numMovers;

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">Number of Movers</span>
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setNumMovers(m => Math.max(1, m - 1))}
              className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-lg font-medium hover:bg-secondary transition"
            >−</button>
            <span className="font-serif text-3xl tabular-nums w-8 text-center">{numMovers}</span>
            <button
              type="button"
              onClick={() => setNumMovers(m => Math.min(10, m + 1))}
              className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-lg font-medium hover:bg-secondary transition"
            >+</button>
          </div>
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">Job Duration</span>
          <select
            value={duration}
            onChange={e => setDuration(e.target.value)}
            className="mt-2 w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {MOVER_RATES.map(r => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Result */}
      <motion.div
        key={`${numMovers}-${duration}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-foreground text-background rounded-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.22em] text-background/60 font-medium">Suggested Tip</div>
          <div className="mt-3 flex items-baseline gap-3 flex-wrap">
            <div className="font-serif text-6xl tabular-nums leading-none">{fmt(totalTip)}</div>
            <div className="text-background/70 font-serif text-xl">total</div>
          </div>
          <div className="mt-4 text-sm text-background/70">
            {fmt(rate.perMover)} per mover · {numMovers} mover{numMovers !== 1 ? "s" : ""}
          </div>
          <div className="mt-6 pt-6 border-t border-background/15 text-sm text-background/70 leading-relaxed">
            {scenario?.note}
          </div>
        </div>
      </motion.div>
    </div>
  );
}