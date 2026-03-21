import { TrendingUp, TrendingDown } from "lucide-react";
import { useLiveQuotes } from "@/hooks/use-live-quotes";

// Each indicator maps to a Finnhub-compatible symbol.
// displayMultiplier converts ETF share price → approximate index value where needed.
const indicatorDefs = [
  { name: "S&P 500", ticker: "SPY", displayMultiplier: 10, prefix: "", fallbackValue: "5,580", fallbackChange: "+0.45%" },
  { name: "Nasdaq", ticker: "QQQ", displayMultiplier: 30, prefix: "", fallbackValue: "17,400", fallbackChange: "+0.62%" },
  { name: "Dow Jones", ticker: "DIA", displayMultiplier: 100, prefix: "", fallbackValue: "41,500", fallbackChange: "+0.33%" },
  { name: "Bitcoin", ticker: "BINANCE:BTCUSDT", displayMultiplier: 1, prefix: "$", fallbackValue: "70,000", fallbackChange: "+1.2%" },
  { name: "Gold", ticker: "OANDA:XAU_USD", displayMultiplier: 1, prefix: "$", fallbackValue: "3,050", fallbackChange: "+0.3%" },
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
          const hasLive = live && live.price > 0;
          const rawPrice = hasLive ? live.price * ind.displayMultiplier : null;
          const price = rawPrice
            ? rawPrice.toLocaleString(undefined, { minimumFractionDigits: rawPrice > 1000 ? 0 : 2, maximumFractionDigits: rawPrice > 1000 ? 0 : 2 })
            : ind.fallbackValue;
          const changePct = hasLive ? live.changePercent : parseFloat(ind.fallbackChange);
          const up = changePct >= 0;
          const changeStr = hasLive ? `${up ? "+" : ""}${changePct.toFixed(2)}%` : ind.fallbackChange;

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
              <div className="font-mono text-lg font-semibold text-foreground">
                {ind.prefix}{price}
              </div>
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
