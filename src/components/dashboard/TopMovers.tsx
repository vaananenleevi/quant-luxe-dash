import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const movers = [
  { ticker: "SMCI", name: "Super Micro", change: "+12.4%", up: true },
  { ticker: "ARM", name: "ARM Holdings", change: "+8.7%", up: true },
  { ticker: "PLTR", name: "Palantir", change: "+6.2%", up: true },
  { ticker: "RIVN", name: "Rivian", change: "-7.8%", up: false },
  { ticker: "SNAP", name: "Snap Inc.", change: "-5.3%", up: false },
  { ticker: "COIN", name: "Coinbase", change: "-4.1%", up: false },
];

export function TopMovers() {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-sm font-sans font-medium text-muted-foreground uppercase tracking-wider mb-4">
        Top Movers
      </h2>
      <div className="space-y-3">
        {movers.map((m) => (
          <div key={m.ticker} className="flex items-center justify-between hover:bg-secondary/30 rounded px-2 py-1.5 -mx-2 transition-colors cursor-pointer">
            <div className="flex items-center gap-2">
              {m.up ? (
                <ArrowUpRight className="h-4 w-4 text-positive" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-negative" />
              )}
              <div>
                <span className="font-mono text-sm font-semibold text-foreground">{m.ticker}</span>
                <span className="text-xs font-sans text-muted-foreground ml-2">{m.name}</span>
              </div>
            </div>
            <span className={`font-mono text-sm font-medium ${m.up ? "text-positive" : "text-negative"}`}>
              {m.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
