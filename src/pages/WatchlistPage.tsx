import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { allStocks, themeCategories, coreHoldingTickers } from "@/data/stocks";
import { useLiveQuotes } from "@/hooks/use-live-quotes";
import { MiniChart } from "@/components/dashboard/MiniChart";

type FilterType = "theme" | "geography" | "marketCap";
type SortKey = "ticker" | "price" | "changePercent" | "weeklyPercent" | "ytdPercent" | "yearPercent" | "marketCap";
type SortDir = "asc" | "desc";

const themes = ["All", "My Core Holdings", ...Object.keys(themeCategories)];

const mcapBuckets: Record<string, (s: typeof allStocks[0]) => boolean> = {
  "Mega (>$200B)": s => parseMcap(s.marketCap) > 200_000,
  "Large ($10B–$200B)": s => { const v = parseMcap(s.marketCap); return v >= 10_000 && v <= 200_000; },
  "Mid ($2B–$10B)": s => { const v = parseMcap(s.marketCap); return v >= 2_000 && v < 10_000; },
  "Small (<$2B)": s => parseMcap(s.marketCap) < 2_000,
};

function parseMcap(str: string): number {
  const clean = str.replace(/[^0-9.TMB]/g, "");
  const num = parseFloat(clean);
  if (str.includes("T")) return num * 1_000_000;
  if (str.includes("B")) return num * 1_000;
  if (str.includes("M")) return num;
  return num;
}

function mcapSort(str: string): number {
  return parseMcap(str);
}

export default function WatchlistPage() {
  const [activeTheme, setActiveTheme] = useState("All");
  const [activeMcap, setActiveMcap] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("marketCap");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const filtered = useMemo(() => {
    let list = allStocks;
    if (activeTheme === "My Core Holdings") {
      list = list.filter(s => coreHoldingTickers.includes(s.ticker));
    } else if (activeTheme !== "All") {
      const tickers = themeCategories[activeTheme] || [];
      list = list.filter(s => tickers.includes(s.ticker));
    }
    if (activeMcap !== "All") {
      const fn = mcapBuckets[activeMcap];
      if (fn) list = list.filter(fn);
    }
    // sort
    const sorted = [...list].sort((a, b) => {
      let av: number, bv: number;
      if (sortKey === "ticker") {
        return sortDir === "asc" ? a.ticker.localeCompare(b.ticker) : b.ticker.localeCompare(a.ticker);
      } else if (sortKey === "marketCap") {
        av = mcapSort(a.marketCap); bv = mcapSort(b.marketCap);
      } else {
        av = a[sortKey]; bv = b[sortKey];
      }
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return sorted;
  }, [activeTheme, activeMcap, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  }

  const arrow = (key: SortKey) => sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : "";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-sans font-semibold text-foreground">Extended Watchlist</h1>
        <span className="text-xs font-mono text-muted-foreground">{filtered.length} companies</span>
      </div>

      {/* Theme filters */}
      <div className="space-y-2">
        <span className="text-[10px] font-sans text-muted-foreground uppercase tracking-widest">Theme / Sector</span>
        <div className="flex flex-wrap gap-1.5">
          {themes.map(t => (
            <button
              key={t}
              onClick={() => setActiveTheme(t)}
              className={`px-2.5 py-1 text-[11px] font-sans rounded-md transition-colors ${
                activeTheme === t
                  ? t === "My Core Holdings"
                    ? "bg-primary text-primary-foreground ring-1 ring-primary/50"
                    : "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Market cap filters */}
      <div className="space-y-2">
        <span className="text-[10px] font-sans text-muted-foreground uppercase tracking-widest">Market Cap</span>
        <div className="flex flex-wrap gap-1.5">
          {["All", ...Object.keys(mcapBuckets)].map(m => (
            <button
              key={m}
              onClick={() => setActiveMcap(m)}
              className={`px-2.5 py-1 text-[11px] font-sans rounded-md transition-colors ${
                activeMcap === m
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-x-auto">
        <div className="min-w-[1100px]">
          {/* Header */}
          <div className="grid grid-cols-[2fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr_1fr_0.6fr_80px] gap-2 px-4 py-2.5 border-b border-border items-center">
            <HeaderCell label="Company" sortKey="ticker" onClick={toggleSort} arrow={arrow} />
            <HeaderCell label="Price" sortKey="price" onClick={toggleSort} arrow={arrow} right />
            <HeaderCell label="Daily" sortKey="changePercent" onClick={toggleSort} arrow={arrow} right />
            <HeaderCell label="Weekly" sortKey="weeklyPercent" onClick={toggleSort} arrow={arrow} right />
            <HeaderCell label="YTD" sortKey="ytdPercent" onClick={toggleSort} arrow={arrow} right />
            <HeaderCell label="1Y" sortKey="yearPercent" onClick={toggleSort} arrow={arrow} right />
            <HeaderCell label="Mkt Cap" sortKey="marketCap" onClick={toggleSort} arrow={arrow} right />
            <span className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider text-right">Sector</span>
            <span className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider text-right">Trend</span>
          </div>

          {/* Rows */}
          {filtered.map(stock => {
            const isHolding = coreHoldingTickers.includes(stock.ticker);
            return (
              <Link
                key={stock.ticker}
                to={`/stock/${stock.ticker}`}
                className={`grid grid-cols-[2fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr_1fr_0.6fr_80px] gap-2 items-center px-4 py-2.5 border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors ${
                  isHolding ? "border-l-2 border-l-primary/40" : ""
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="min-w-0">
                    <span className="font-mono text-sm font-semibold text-foreground">{stock.ticker}</span>
                    <span className="text-xs font-sans text-muted-foreground ml-1.5 truncate">{stock.name}</span>
                    {isHolding && (
                      <span className="text-[9px] font-sans text-primary ml-1.5 bg-primary/10 px-1 py-0.5 rounded">HELD</span>
                    )}
                  </div>
                </div>
                <span className="font-mono text-sm text-foreground text-right">${stock.price.toFixed(2)}</span>
                <PctCell value={stock.changePercent} />
                <PctCell value={stock.weeklyPercent} />
                <PctCell value={stock.ytdPercent} />
                <PctCell value={stock.yearPercent} />
                <span className="font-mono text-xs text-muted-foreground text-right">{stock.marketCap}</span>
                <span className="text-[10px] font-sans text-muted-foreground text-right truncate">{stock.sector}</span>
                <div className="flex justify-end">
                  <MiniChart data={stock.sparkline} positive={stock.changePercent >= 0} />
                </div>
              </Link>
            );
          })}

          {filtered.length === 0 && (
            <div className="px-4 py-12 text-center text-sm text-muted-foreground">
              No stocks match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HeaderCell({ label, sortKey, onClick, arrow, right }: {
  label: string; sortKey: SortKey; onClick: (k: SortKey) => void; arrow: (k: SortKey) => string; right?: boolean;
}) {
  return (
    <button
      onClick={() => onClick(sortKey)}
      className={`text-[10px] font-sans text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors ${right ? "text-right" : "text-left"}`}
    >
      {label}{arrow(sortKey)}
    </button>
  );
}

function PctCell({ value }: { value: number }) {
  return (
    <span className={`font-mono text-sm text-right ${value >= 0 ? "text-positive" : "text-negative"}`}>
      {value >= 0 ? "+" : ""}{value.toFixed(2)}%
    </span>
  );
}
