import { useMemo } from "react";
import { portfolioHoldings } from "@/data/stocks";
import { useLiveQuotes } from "@/hooks/use-live-quotes";

const TOTAL_PORTFOLIO_EUR = 24_181;

export function PortfolioOverview() {
  const tickers = useMemo(() => portfolioHoldings.filter(h => h.ticker !== "CASH").map(h => h.ticker), []);
  const { data: liveData } = useLiveQuotes(tickers);

  const holdings = useMemo(() => {
    return portfolioHoldings.map(h => {
      const live = liveData?.quotes?.[h.ticker];
      const changePct = live && live.price > 0 ? live.changePercent : null;
      const positionValue = TOTAL_PORTFOLIO_EUR * (h.weight / 100);
      return { ...h, changePercent: changePct, positionValue };
    });
  }, [liveData]);

  // Sector allocation from weights
  const sectorMap = new Map<string, number>();
  holdings.forEach(h => sectorMap.set(h.sector, (sectorMap.get(h.sector) || 0) + h.weight));
  const allocations = Array.from(sectorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([label, pct]) => ({ label, pct }));

  const colors = [
    "bg-primary", "bg-positive", "bg-[hsl(38_92%_60%)]", "bg-negative",
    "bg-[hsl(280_60%_60%)]", "bg-[hsl(195_80%_55%)]", "bg-muted-foreground",
    "bg-[hsl(162_67%_48%)]", "bg-[hsl(320_65%_55%)]",
  ];

  // Daily movers – only show if we have live data
  const hasLiveData = holdings.some(h => h.changePercent !== null && h.ticker !== "CASH");
  const movers = holdings
    .filter(h => h.ticker !== "CASH" && h.changePercent !== null)
    .sort((a, b) => (b.changePercent ?? 0) - (a.changePercent ?? 0));
  const gainers = movers.filter(m => (m.changePercent ?? 0) > 0).slice(0, 3);
  const losers = movers.filter(m => (m.changePercent ?? 0) < 0).sort((a, b) => (a.changePercent ?? 0) - (b.changePercent ?? 0)).slice(0, 3);

  // Weighted daily change – show "--" if no live data
  const dailyChange = hasLiveData
    ? holdings.reduce((s, h) => s + h.weight * ((h.changePercent ?? 0) / 100), 0)
    : null;

  return (
    <section className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-sans font-medium text-muted-foreground uppercase tracking-wider">
          Portfolio Overview
        </h2>
        {liveData?.fetchedAt && (
          <span className="text-[9px] font-mono text-positive bg-positive/10 px-1.5 py-0.5 rounded">LIVE</span>
        )}
      </div>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div>
          <div className="text-xs font-sans text-muted-foreground mb-1">Total Value</div>
          <div className="font-mono text-xl font-bold text-foreground">
            €{TOTAL_PORTFOLIO_EUR.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-xs font-sans text-muted-foreground mb-1">Holdings</div>
          <div className="font-mono text-xl font-bold text-foreground">{holdings.length}</div>
        </div>
        <div>
          <div className="text-xs font-sans text-muted-foreground mb-1">Daily Δ (weighted)</div>
          <div className={`font-mono text-xl font-bold ${dailyChange === null ? "text-muted-foreground" : dailyChange >= 0 ? "text-positive" : "text-negative"}`}>
            {dailyChange === null ? "--" : `${dailyChange >= 0 ? "+" : ""}${dailyChange.toFixed(2)}%`}
          </div>
        </div>
        <div>
          <div className="text-xs font-sans text-muted-foreground mb-1">Total Return</div>
          <div className="font-mono text-xl font-bold text-muted-foreground">--</div>
        </div>
      </div>

      {/* Allocation bar */}
      <div className="mb-2">
        <div className="text-xs font-sans text-muted-foreground mb-2">Sector Allocation</div>
        <div className="flex h-3 rounded-sm overflow-hidden gap-0.5">
          {allocations.map((a, i) => (
            <div
              key={a.label}
              className={`${colors[i % colors.length]} transition-all`}
              style={{ width: `${a.pct}%` }}
              title={`${a.label}: ${a.pct.toFixed(1)}%`}
            />
          ))}
        </div>
        <div className="flex gap-4 mt-2 flex-wrap">
          {allocations.slice(0, 6).map((a, i) => (
            <div key={a.label} className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground">
              <div className={`h-2 w-2 rounded-sm ${colors[i % colors.length]}`} />
              <span>{a.label} {a.pct.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Holdings with EUR values */}
      <div className="mt-6 mb-4">
        <div className="text-xs font-sans text-muted-foreground mb-2 uppercase tracking-wider">Position Values</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {holdings.filter(h => h.ticker !== "CASH").slice(0, 9).map(h => (
            <div key={h.ticker} className="flex justify-between py-1">
              <span className="font-mono text-xs text-foreground">{h.ticker}</span>
              <span className="font-mono text-xs text-muted-foreground">€{Math.round(h.positionValue).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gainers / Losers */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <div className="text-xs font-sans text-muted-foreground mb-2 uppercase tracking-wider">Top Gainers</div>
          {!hasLiveData && <p className="text-xs text-muted-foreground">Waiting for live data...</p>}
          {gainers.map(m => (
            <div key={m.ticker} className="flex justify-between py-1.5">
              <span className="font-mono text-sm text-foreground">{m.ticker}</span>
              <span className="font-mono text-sm text-positive">+{(m.changePercent ?? 0).toFixed(2)}%</span>
            </div>
          ))}
        </div>
        <div>
          <div className="text-xs font-sans text-muted-foreground mb-2 uppercase tracking-wider">Top Losers</div>
          {!hasLiveData && <p className="text-xs text-muted-foreground">Waiting for live data...</p>}
          {losers.map(m => (
            <div key={m.ticker} className="flex justify-between py-1.5">
              <span className="font-mono text-sm text-foreground">{m.ticker}</span>
              <span className="font-mono text-sm text-negative">{(m.changePercent ?? 0).toFixed(2)}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
