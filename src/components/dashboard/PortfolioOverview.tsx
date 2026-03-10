const allocations = [
  { label: "Technology", pct: 42, color: "bg-primary" },
  { label: "Healthcare", pct: 18, color: "bg-positive" },
  { label: "Finance", pct: 15, color: "bg-[hsl(38_92%_60%)]" },
  { label: "Energy", pct: 12, color: "bg-negative" },
  { label: "Other", pct: 13, color: "bg-muted-foreground" },
];

const movers = [
  { ticker: "NVDA", change: "+3.21%", up: true },
  { ticker: "AAPL", change: "+1.42%", up: true },
  { ticker: "TSM", change: "+1.87%", up: true },
  { ticker: "TSLA", change: "-2.14%", up: false },
  { ticker: "INTC", change: "-1.23%", up: false },
  { ticker: "AMD", change: "-0.67%", up: false },
];

export function PortfolioOverview() {
  return (
    <section className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-sm font-sans font-medium text-muted-foreground uppercase tracking-wider mb-4">
        Portfolio Overview
      </h2>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div>
          <div className="text-xs font-sans text-muted-foreground mb-1">Total Value</div>
          <div className="font-mono text-xl font-bold text-foreground">$128,432.51</div>
        </div>
        <div>
          <div className="text-xs font-sans text-muted-foreground mb-1">Daily Change</div>
          <div className="font-mono text-xl font-bold text-positive">+$1,247.83</div>
        </div>
        <div>
          <div className="text-xs font-sans text-muted-foreground mb-1">Total Return</div>
          <div className="font-mono text-xl font-bold text-positive">+18.42%</div>
        </div>
      </div>

      {/* Allocation bar */}
      <div className="mb-2">
        <div className="text-xs font-sans text-muted-foreground mb-2">Asset Allocation</div>
        <div className="flex h-3 rounded-sm overflow-hidden gap-0.5">
          {allocations.map((a) => (
            <div
              key={a.label}
              className={`${a.color} transition-all`}
              style={{ width: `${a.pct}%` }}
              title={`${a.label}: ${a.pct}%`}
            />
          ))}
        </div>
        <div className="flex gap-4 mt-2 flex-wrap">
          {allocations.map((a) => (
            <div key={a.label} className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground">
              <div className={`h-2 w-2 rounded-sm ${a.color}`} />
              <span>{a.label} {a.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gainers / Losers */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <div className="text-xs font-sans text-muted-foreground mb-2 uppercase tracking-wider">Top Gainers</div>
          {movers.filter(m => m.up).map(m => (
            <div key={m.ticker} className="flex justify-between py-1.5">
              <span className="font-mono text-sm text-foreground">{m.ticker}</span>
              <span className="font-mono text-sm text-positive">{m.change}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="text-xs font-sans text-muted-foreground mb-2 uppercase tracking-wider">Top Losers</div>
          {movers.filter(m => !m.up).map(m => (
            <div key={m.ticker} className="flex justify-between py-1.5">
              <span className="font-mono text-sm text-foreground">{m.ticker}</span>
              <span className="font-mono text-sm text-negative">{m.change}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
