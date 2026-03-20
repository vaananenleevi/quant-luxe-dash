import { TrendingUp, TrendingDown } from "lucide-react";
import { useLiveQuotes } from "@/hooks/use-live-quotes";

const indicatorDefs = [
  { name: "S&P 500", ticker: "SPY", fallbackValue: "5,234.18", fallbackChange: "+1.23%" },
  { name: "Nasdaq", ticker: "QQQ", fallbackValue: "16,742.39", fallbackChange: "+1.67%" },
  { name: "Dow Jones", ticker: "DIA", fallbackValue: "39,512.84", fallbackChange: "+0.56%" },
  { name: "Bitcoin", ticker: "IBIT", fallbackValue: "68,542", fallbackChange: "+2.45%" },
  { name: "Gold", ticker: "GLD", fallbackValue: "178.50", fallbackChange: "+0.42%" },
];

export function MarketIndicators() {
  const tickers = indicatorDefs.map(d => d.ticker);
  const { data: liveData } = useLiveQuotes(tickers);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-sans font-medium text-muted-foreground uppercase tracking-wider">
          Market Overview
        </h2>
        {liveData?.fetchedAt && (
          <span className="text-[9px] font-mono text-positive bg-positive/10 px-1.5 py-0.5 rounded">
            LIVE · {new Date(liveData.fetchedAt).toLocaleTimeString()}
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {indicatorDefs.map((ind, i) => {
          const live = liveData?.quotes?.[ind.ticker];
          const price = live && live.price > 0 ? live.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ind.fallbackValue;
          const changePct = live && live.price > 0 ? live.changePercent : parseFloat(ind.fallbackChange);
          const up = changePct >= 0;
          const changeStr = live && live.price > 0 ? `${up ? "+" : ""}${changePct.toFixed(2)}%` : ind.fallbackChange;

          return (
            <div
              key={ind.ticker}
              className="bg-card rounded-lg border border-border p-4 hover:border-primary/30 transition-colors cursor-pointer"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-sans text-muted-foreground">{ind.name}</span>
                {up ? (
                  <TrendingUp className="h-3.5 w-3.5 text-positive" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-negative" />
                )}
              </div>
              <div className="font-mono text-lg font-semibold text-foreground">${price}</div>
              <div
                className={`font-mono text-sm mt-1 ${up ? "text-positive" : "text-negative"}`}
              >
                {changeStr}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
