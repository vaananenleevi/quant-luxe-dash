import { useMemo } from "react";
import { Link } from "react-router-dom";
import { MiniChart } from "./MiniChart";
import { useLiveQuotes } from "@/hooks/use-live-quotes";

const watchlistTickers = ["AAPL", "MSFT", "NVDA", "AMD", "TSLA", "AMZN", "TSM", "INTC"];

const fallbackData: Record<string, { name: string; price: string; change: string; up: boolean; data: number[] }> = {
  AAPL: { name: "Apple Inc.", price: "189.84", change: "+1.42%", up: true, data: [180, 183, 181, 185, 187, 184, 188, 189] },
  MSFT: { name: "Microsoft Corp.", price: "425.52", change: "+0.89%", up: true, data: [415, 418, 420, 417, 422, 424, 423, 425] },
  NVDA: { name: "NVIDIA Corp.", price: "878.36", change: "+3.21%", up: true, data: [830, 845, 852, 848, 860, 870, 865, 878] },
  AMD: { name: "AMD Inc.", price: "178.23", change: "-0.67%", up: false, data: [182, 180, 179, 181, 178, 177, 179, 178] },
  TSLA: { name: "Tesla Inc.", price: "175.21", change: "-2.14%", up: false, data: [185, 183, 180, 178, 176, 179, 177, 175] },
  AMZN: { name: "Amazon.com", price: "185.07", change: "+0.54%", up: true, data: [182, 183, 181, 184, 183, 185, 184, 185] },
  TSM: { name: "TSMC", price: "142.56", change: "+1.87%", up: true, data: [136, 137, 139, 138, 140, 141, 140, 142] },
  INTC: { name: "Intel Corp.", price: "31.42", change: "-1.23%", up: false, data: [33, 32, 33, 32, 31, 32, 31, 31] },
};

export function Watchlist() {
  const { data: liveData } = useLiveQuotes(watchlistTickers);

  const stocks = useMemo(() => {
    return watchlistTickers.map(ticker => {
      const fb = fallbackData[ticker];
      const live = liveData?.quotes?.[ticker];
      if (live && live.price > 0) {
        return {
          ticker,
          name: fb.name,
          price: live.price.toFixed(2),
          change: `${live.changePercent >= 0 ? "+" : ""}${live.changePercent.toFixed(2)}%`,
          up: live.changePercent >= 0,
          data: fb.data,
        };
      }
      return { ticker, ...fb };
    });
  }, [liveData]);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-sans font-medium text-muted-foreground uppercase tracking-wider">
            Watchlist
          </h2>
          {liveData?.fetchedAt && (
            <span className="text-[9px] font-mono text-positive bg-positive/10 px-1.5 py-0.5 rounded">LIVE</span>
          )}
        </div>
        <Link to="/watchlist" className="text-xs font-sans text-primary hover:underline">View All</Link>
      </div>
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2.5 border-b border-border text-xs font-sans text-muted-foreground uppercase tracking-wider">
          <span>Company</span>
          <span className="text-right">Price</span>
          <span className="text-right">Change</span>
          <span className="text-right">Trend</span>
        </div>
        {stocks.map((stock) => (
          <Link
            key={stock.ticker}
            to={`/stock/${stock.ticker}`}
            className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-4 py-3 border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors cursor-pointer"
          >
            <div>
              <span className="font-mono text-sm font-semibold text-foreground">{stock.ticker}</span>
              <span className="text-xs font-sans text-muted-foreground ml-2">{stock.name}</span>
            </div>
            <span className="font-mono text-sm text-foreground text-right">${stock.price}</span>
            <span
              className={`font-mono text-sm text-right ${
                stock.up ? "text-positive" : "text-negative"
              }`}
            >
              {stock.change}
            </span>
            <MiniChart data={stock.data} positive={stock.up} />
          </Link>
        ))}
      </div>
    </section>
  );
}
