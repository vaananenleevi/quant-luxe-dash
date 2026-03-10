import { TrendingUp, TrendingDown } from "lucide-react";

const indicators = [
  { name: "S&P 500", ticker: "SPX", value: "5,234.18", change: "+1.23%", up: true },
  { name: "Nasdaq", ticker: "IXIC", value: "16,742.39", change: "+1.67%", up: true },
  { name: "Dow Jones", ticker: "DJI", value: "39,512.84", change: "+0.56%", up: true },
  { name: "VIX", ticker: "VIX", value: "14.32", change: "-3.21%", up: false },
  { name: "10Y Treasury", ticker: "TNX", value: "4.218%", change: "+0.04%", up: true },
];

export function MarketIndicators() {
  return (
    <section>
      <h2 className="text-sm font-sans font-medium text-muted-foreground mb-4 uppercase tracking-wider">
        Market Overview
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {indicators.map((ind, i) => (
          <div
            key={ind.ticker}
            className="bg-card rounded-lg border border-border p-4 hover:border-primary/30 transition-colors cursor-pointer"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-sans text-muted-foreground">{ind.name}</span>
              {ind.up ? (
                <TrendingUp className="h-3.5 w-3.5 text-positive" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-negative" />
              )}
            </div>
            <div className="font-mono text-lg font-semibold text-foreground">{ind.value}</div>
            <div
              className={`font-mono text-sm mt-1 ${
                ind.up ? "text-positive" : "text-negative"
              }`}
            >
              {ind.change}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
