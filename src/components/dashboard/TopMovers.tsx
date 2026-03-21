import { useMemo } from "react";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { portfolioHoldings } from "@/data/stocks";
import { useLiveQuotes } from "@/hooks/use-live-quotes";

export function TopMovers() {
  const tickers = useMemo(() => portfolioHoldings.filter(h => h.ticker !== "CASH").map(h => h.ticker), []);
  const { data: liveData } = useLiveQuotes(tickers);

  const movers = useMemo(() => {
    return portfolioHoldings
      .filter(h => h.ticker !== "CASH")
      .map(h => {
        const live = liveData?.quotes?.[h.ticker];
        const changePct = live && live.price > 0 ? live.changePercent : null;
        return { ticker: h.ticker, name: h.name, change: changePct };
      })
      .sort((a, b) => Math.abs(b.change ?? 0) - Math.abs(a.change ?? 0))
      .slice(0, 6);
  }, [liveData]);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-sans font-medium text-muted-foreground uppercase tracking-wider">
          Top Movers
        </h2>
        {liveData?.fetchedAt && (
          <span className="text-[9px] font-mono text-positive bg-positive/10 px-1.5 py-0.5 rounded">LIVE</span>
        )}
      </div>
      <div className="space-y-3">
        {movers.map((m) => {
          const hasData = m.change !== null;
          const up = (m.change ?? 0) >= 0;
          return (
            <div key={m.ticker} className="flex items-center justify-between hover:bg-secondary/30 rounded px-2 py-1.5 -mx-2 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                {!hasData ? (
                  <Minus className="h-4 w-4 text-muted-foreground" />
                ) : up ? (
                  <ArrowUpRight className="h-4 w-4 text-positive" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-negative" />
                )}
                <div>
                  <span className="font-mono text-sm font-semibold text-foreground">{m.ticker}</span>
                  <span className="text-xs font-sans text-muted-foreground ml-2 hidden sm:inline">{m.name}</span>
                </div>
              </div>
              <span className={`font-mono text-sm font-medium ${!hasData ? "text-muted-foreground" : up ? "text-positive" : "text-negative"}`}>
                {!hasData ? "--" : `${up ? "+" : ""}${m.change!.toFixed(2)}%`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
