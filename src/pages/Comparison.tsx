import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, X, Users, ArrowUpDown } from "lucide-react";
import { allStocks, sectorCategories, type StockData } from "@/data/stocks";
import { MetricTooltip } from "@/components/MetricTooltip";
import { metricDefinitions } from "@/lib/metrics";
import { computeStockScore } from "@/lib/metrics";

type MetricKey = keyof StockData;

interface MetricDef {
  key: MetricKey;
  label: string;
  format: "pct" | "num" | "str" | "ratio";
  group: string;
  higherBetter: boolean;
  tooltip: string;
}

const metrics: MetricDef[] = metricDefinitions
  .filter(m => ["pct", "num", "str", "ratio"].includes(m.format))
  .map(m => ({
    key: m.key as MetricKey,
    label: m.shortLabel || m.label,
    format: m.format as "pct" | "num" | "str" | "ratio",
    group: m.group,
    higherBetter: m.higherBetter,
    tooltip: m.tooltip,
  }));

const defaultTickers = ["NVDA", "AMD", "AAPL", "MSFT", "TSLA", "NVO", "BABA", "TSM"];

export default function Comparison() {
  const [selected, setSelected] = useState<string[]>(defaultTickers);
  const [sectorFilter, setSectorFilter] = useState("All");
  const [sortMetric, setSortMetric] = useState<MetricKey | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const available = useMemo(() => {
    if (sectorFilter === "All") return allStocks;
    const tickers = sectorCategories[sectorFilter] || [];
    return allStocks.filter(s => tickers.includes(s.ticker));
  }, [sectorFilter]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allStocks
      .filter(s =>
        !selected.includes(s.ticker) &&
        (s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || s.sector.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [searchQuery, selected]);

  const companies = useMemo(() => {
    let list = allStocks.filter(s => selected.includes(s.ticker));
    if (sortMetric) {
      list = [...list].sort((a, b) => {
        const va = Number(a[sortMetric]) || 0;
        const vb = Number(b[sortMetric]) || 0;
        return sortDir === "desc" ? vb - va : va - vb;
      });
    }
    return list;
  }, [selected, sortMetric, sortDir]);

  const addOrRemoveStock = (ticker: string) => {
    setSelected(prev => prev.includes(ticker) ? prev.filter(t => t !== ticker) : [...prev, ticker]);
  };

  const addStock = (ticker: string) => {
    if (!selected.includes(ticker)) {
      setSelected(prev => [...prev, ticker]);
    }
    setSearchQuery("");
    setSearchOpen(false);
  };

  const removeStock = (ticker: string) => {
    setSelected(prev => prev.filter(t => t !== ticker));
  };

  const handleSort = (key: MetricKey) => {
    if (sortMetric === key) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortMetric(key); setSortDir("desc"); }
  };

  // Add peers from same sector
  const addSectorPeers = (ticker: string) => {
    const stock = allStocks.find(s => s.ticker === ticker);
    if (!stock) return;
    const peers = allStocks.filter(s => s.sector === stock.sector && !selected.includes(s.ticker)).map(s => s.ticker).slice(0, 5);
    setSelected(prev => [...prev, ...peers]);
  };

  const getMinMax = (key: MetricKey) => {
    const vals = companies.map(c => Number(c[key])).filter(v => v > 0 && isFinite(v));
    return { min: Math.min(...vals), max: Math.max(...vals) };
  };

  const formatVal = (val: any, format: string) => {
    if (val === -1 || val === undefined) return "N/A";
    if (format === "str") return val;
    if (format === "pct") return `${Number(val).toFixed(1)}%`;
    if (format === "ratio") return Number(val).toFixed(2);
    return Number(val).toFixed(1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-sans font-semibold text-foreground">Fundamental Comparison</h1>
        <span className="text-xs font-sans text-muted-foreground">{companies.length} stocks selected</span>
      </div>

      {/* Search bar */}
      <div className="relative">
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true); }}
            onFocus={() => setSearchOpen(true)}
            placeholder="Search stocks to add (ticker, name, or sector)…"
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full font-sans"
          />
          {searchQuery && (
            <button onClick={() => { setSearchQuery(""); setSearchOpen(false); }}>
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        {searchOpen && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-20 overflow-hidden">
            {searchResults.map(s => (
              <button
                key={s.ticker}
                onClick={() => addStock(s.ticker)}
                className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-secondary/50 transition-colors text-left"
              >
                <div>
                  <span className="font-mono text-sm font-semibold text-foreground">{s.ticker}</span>
                  <span className="text-xs font-sans text-muted-foreground ml-2">{s.name}</span>
                </div>
                <span className="text-[10px] font-sans text-muted-foreground bg-secondary px-2 py-0.5 rounded">{s.sector}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected stocks with remove buttons */}
      <div className="flex flex-wrap gap-1.5">
        {companies.map(c => (
          <div key={c.ticker} className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded bg-primary/15 text-primary border border-primary/25">
            <Link to={`/stock/${c.ticker}`} className="hover:underline">{c.ticker}</Link>
            <button onClick={() => removeStock(c.ticker)} className="ml-0.5 text-primary/50 hover:text-primary">
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {companies.length > 0 && (
          <button
            onClick={() => addSectorPeers(companies[0].ticker)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-sans rounded border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
          >
            <Users className="h-3 w-3" /> Add peers
          </button>
        )}
      </div>

      {/* Sector filter */}
      <div className="flex flex-wrap gap-2">
        {["All", ...Object.keys(sectorCategories)].map(s => (
          <button
            key={s}
            onClick={() => setSectorFilter(s)}
            className={`px-3 py-1.5 text-xs font-sans rounded-md transition-colors ${
              sectorFilter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Quick-add from sector filter */}
      {sectorFilter !== "All" && (
        <div className="flex flex-wrap gap-1.5">
          {available.filter(s => !selected.includes(s.ticker)).map(s => (
            <button
              key={s.ticker}
              onClick={() => addStock(s.ticker)}
              className="px-2.5 py-1 text-xs font-mono rounded bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            >
              + {s.ticker}
            </button>
          ))}
        </div>
      )}

      {/* Comparison table */}
      {companies.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <p className="text-muted-foreground font-sans text-sm">Search and add stocks above to compare</p>
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border overflow-x-auto">
          <div style={{ minWidth: `${200 + companies.length * 120}px` }}>
            {/* Header */}
            <div className="flex border-b border-border sticky top-0 bg-card z-10">
              <div className="w-[200px] shrink-0 px-4 py-3 text-xs font-sans text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <ArrowUpDown className="h-3 w-3" /> Metric
              </div>
              {companies.map(c => {
                const score = computeStockScore(c);
                return (
                  <Link key={c.ticker} to={`/stock/${c.ticker}`} className="w-[120px] shrink-0 px-3 py-3 text-center hover:bg-secondary/30 transition-colors">
                    <div className="font-mono text-xs font-semibold text-foreground">{c.ticker}</div>
                    <div className={`font-mono text-[10px] ${c.changePercent >= 0 ? "text-positive" : "text-negative"}`}>
                      {c.changePercent >= 0 ? "+" : ""}{c.changePercent.toFixed(2)}%
                    </div>
                    <div className="font-mono text-[9px] text-muted-foreground mt-0.5">Score: {score.overall}</div>
                  </Link>
                );
              })}
            </div>

            {/* Metric rows grouped */}
            {(() => {
              let currentGroup = "";
              return metrics.map(m => {
                const { min, max } = getMinMax(m.key);
                const showGroup = m.group !== currentGroup;
                currentGroup = m.group;
                return (
                  <div key={m.key}>
                    {showGroup && (
                      <div className="flex border-b border-border bg-secondary/30">
                        <div className="px-4 py-2 text-[10px] font-sans font-semibold text-primary uppercase tracking-widest">{m.group}</div>
                      </div>
                    )}
                    <div className="flex border-b border-border hover:bg-secondary/20 transition-colors">
                      <button
                        onClick={() => handleSort(m.key)}
                        className={`w-[200px] shrink-0 px-4 py-2 text-left text-xs font-sans transition-colors flex items-center gap-1 ${sortMetric === m.key ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <MetricTooltip label={m.label} tooltip={m.tooltip}>
                          <span>{m.label}</span>
                        </MetricTooltip>
                        {sortMetric === m.key && <span className="text-primary">{sortDir === "desc" ? "↓" : "↑"}</span>}
                      </button>
                      {companies.map(c => {
                        const val = c[m.key];
                        const numVal = Number(val);
                        const isHighest = numVal > 0 && numVal === max && m.higherBetter;
                        const isLowest = numVal > 0 && numVal === min && !m.higherBetter && min !== max;
                        const isWorst = (numVal > 0 && numVal === max && !m.higherBetter) || (numVal > 0 && numVal === min && m.higherBetter && min !== max);
                        return (
                          <div key={c.ticker} className={`w-[120px] shrink-0 px-3 py-2 text-center font-mono text-xs ${
                            isHighest || isLowest ? "text-positive font-semibold" : isWorst ? "text-negative" : "text-foreground"
                          }`}>
                            {formatVal(val, m.format)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
