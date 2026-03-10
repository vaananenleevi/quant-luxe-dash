import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { allStocks, sectorCategories, type StockData } from "@/data/stocks";

type MetricKey = keyof StockData;

interface MetricDef {
  key: MetricKey;
  label: string;
  format: "pct" | "num" | "str" | "ratio";
  group: string;
  higherBetter: boolean;
}

const metrics: MetricDef[] = [
  // Profitability
  { key: "ebitMargin", label: "EBIT Margin", format: "pct", group: "Profitability", higherBetter: true },
  { key: "ebitdaMargin", label: "EBITDA Margin", format: "pct", group: "Profitability", higherBetter: true },
  { key: "netMargin", label: "Net Margin", format: "pct", group: "Profitability", higherBetter: true },
  { key: "roe", label: "ROE", format: "pct", group: "Profitability", higherBetter: true },
  { key: "roic", label: "ROIC", format: "pct", group: "Profitability", higherBetter: true },
  // Growth
  { key: "revenueGrowth", label: "Revenue Growth", format: "pct", group: "Growth", higherBetter: true },
  { key: "earningsGrowth", label: "Earnings Growth", format: "pct", group: "Growth", higherBetter: true },
  { key: "fcfGrowth", label: "FCF Growth", format: "pct", group: "Growth", higherBetter: true },
  // Valuation
  { key: "pe", label: "P/E", format: "num", group: "Valuation", higherBetter: false },
  { key: "forwardPe", label: "Fwd P/E", format: "num", group: "Valuation", higherBetter: false },
  { key: "evEbitda", label: "EV/EBITDA", format: "num", group: "Valuation", higherBetter: false },
  { key: "ps", label: "P/S", format: "num", group: "Valuation", higherBetter: false },
  { key: "pb", label: "P/B", format: "num", group: "Valuation", higherBetter: false },
  // Financial Strength
  { key: "debtEquity", label: "Debt/Equity", format: "ratio", group: "Financial Strength", higherBetter: false },
  { key: "netDebtEbitda", label: "Net Debt/EBITDA", format: "ratio", group: "Financial Strength", higherBetter: false },
  { key: "currentRatio", label: "Current Ratio", format: "ratio", group: "Financial Strength", higherBetter: true },
  // Efficiency
  { key: "assetTurnover", label: "Asset Turnover", format: "ratio", group: "Efficiency", higherBetter: true },
  { key: "operatingMargin", label: "Op. Margin", format: "pct", group: "Efficiency", higherBetter: true },
  // Shareholder Returns
  { key: "dividendYield", label: "Div. Yield", format: "pct", group: "Shareholder Returns", higherBetter: true },
  { key: "buybackYield", label: "Buyback Yield", format: "pct", group: "Shareholder Returns", higherBetter: true },
  // Market
  { key: "marketCap", label: "Market Cap", format: "str", group: "Market", higherBetter: true },
  { key: "enterpriseValue", label: "Enterprise Value", format: "str", group: "Market", higherBetter: true },
  { key: "beta", label: "Beta", format: "ratio", group: "Market", higherBetter: false },
];

const defaultTickers = ["NVDA", "AMD", "AAPL", "MSFT", "TSLA", "NVO", "BABA", "TSM"];

export default function Comparison() {
  const [selected, setSelected] = useState<string[]>(defaultTickers);
  const [sectorFilter, setSectorFilter] = useState("All");
  const [sortMetric, setSortMetric] = useState<MetricKey | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const available = useMemo(() => {
    if (sectorFilter === "All") return allStocks;
    const tickers = sectorCategories[sectorFilter] || [];
    return allStocks.filter(s => tickers.includes(s.ticker));
  }, [sectorFilter]);

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

  const toggleStock = (ticker: string) => {
    setSelected(prev => prev.includes(ticker) ? prev.filter(t => t !== ticker) : [...prev, ticker]);
  };

  const handleSort = (key: MetricKey) => {
    if (sortMetric === key) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortMetric(key); setSortDir("desc"); }
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
    <div className="space-y-6">
      <h1 className="text-xl font-sans font-semibold text-foreground">Fundamental Comparison</h1>

      {/* Sector filter + stock selector */}
      <div className="space-y-3">
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

        <div className="flex flex-wrap gap-1.5">
          {available.map(s => (
            <button
              key={s.ticker}
              onClick={() => toggleStock(s.ticker)}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                selected.includes(s.ticker) ? "bg-primary/20 text-primary border border-primary/30" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {s.ticker}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      <div className="bg-card rounded-lg border border-border overflow-x-auto">
        <div style={{ minWidth: `${200 + companies.length * 120}px` }}>
          {/* Header */}
          <div className="flex border-b border-border sticky top-0 bg-card z-10">
            <div className="w-[200px] shrink-0 px-4 py-3 text-xs font-sans text-muted-foreground uppercase tracking-wider">Metric</div>
            {companies.map(c => (
              <Link key={c.ticker} to={`/stock/${c.ticker}`} className="w-[120px] shrink-0 px-3 py-3 text-center hover:bg-secondary/30 transition-colors">
                <div className="font-mono text-xs font-semibold text-foreground">{c.ticker}</div>
                <div className={`font-mono text-[10px] ${c.changePercent >= 0 ? "text-positive" : "text-negative"}`}>
                  {c.changePercent >= 0 ? "+" : ""}{c.changePercent.toFixed(2)}%
                </div>
              </Link>
            ))}
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
                      className={`w-[200px] shrink-0 px-4 py-2 text-left text-xs font-sans transition-colors ${sortMetric === m.key ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {m.label} {sortMetric === m.key && (sortDir === "desc" ? "↓" : "↑")}
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
    </div>
  );
}
