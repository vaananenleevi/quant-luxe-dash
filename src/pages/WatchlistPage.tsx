import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { allStocks, sectorCategories } from "@/data/stocks";
import { MiniChart } from "@/components/dashboard/MiniChart";

const sectors = ["All", ...Object.keys(sectorCategories)];

export default function WatchlistPage() {
  const [activeSector, setActiveSector] = useState("All");

  const filtered = useMemo(() => {
    if (activeSector === "All") return allStocks;
    const tickers = sectorCategories[activeSector] || [];
    return allStocks.filter(s => tickers.includes(s.ticker));
  }, [activeSector]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-sans font-semibold text-foreground">Watchlist</h1>
        <span className="text-xs font-mono text-muted-foreground">{filtered.length} companies</span>
      </div>

      {/* Sector filters */}
      <div className="flex flex-wrap gap-2">
        {sectors.map(s => (
          <button
            key={s}
            onClick={() => setActiveSector(s)}
            className={`px-3 py-1.5 text-xs font-sans rounded-md transition-colors ${
              activeSector === s
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] gap-3 px-4 py-2.5 border-b border-border items-center">
            <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider">Company</span>
            <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider text-right">Price</span>
            <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider text-right">Change</span>
            <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider text-right">Mkt Cap</span>
            <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider text-right">P/E</span>
            <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider text-right">Trend</span>
          </div>
          {filtered.map(stock => (
            <Link
              key={stock.ticker}
              to={`/stock/${stock.ticker}`}
              className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] gap-3 items-center px-4 py-3 border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors"
            >
              <div>
                <span className="font-mono text-sm font-semibold text-foreground">{stock.ticker}</span>
                <span className="text-xs font-sans text-muted-foreground ml-2">{stock.name}</span>
                <span className="text-[10px] font-sans text-muted-foreground ml-2 bg-secondary px-1.5 py-0.5 rounded">{stock.sector}</span>
              </div>
              <span className="font-mono text-sm text-foreground text-right">${stock.price.toFixed(2)}</span>
              <span className={`font-mono text-sm text-right ${stock.changePercent >= 0 ? "text-positive" : "text-negative"}`}>
                {stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
              </span>
              <span className="font-mono text-xs text-muted-foreground text-right">{stock.marketCap}</span>
              <span className="font-mono text-sm text-foreground text-right">{stock.pe > 0 ? stock.pe.toFixed(1) : "N/A"}</span>
              <div className="flex justify-end">
                <MiniChart data={stock.sparkline} positive={stock.changePercent >= 0} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
