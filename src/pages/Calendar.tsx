import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { portfolioHoldings, coreHoldingTickers } from "@/data/stocks";
import { CalendarDays, Filter } from "lucide-react";

interface EarningsEvent {
  date: string;
  epsActual: number | null;
  epsEstimate: number | null;
  hour: string;
  quarter: number;
  revenueActual: number | null;
  revenueEstimate: number | null;
  symbol: string;
  year: number;
}

type RangeFilter = "week" | "30d" | "90d";

function getDateRange(filter: RangeFilter): { from: string; to: string } {
  const now = new Date();
  const from = now.toISOString().split("T")[0];
  const end = new Date(now);
  if (filter === "week") end.setDate(end.getDate() + 7);
  else if (filter === "30d") end.setDate(end.getDate() + 30);
  else end.setDate(end.getDate() + 90);
  return { from, to: end.toISOString().split("T")[0] };
}

async function fetchEarnings(from: string, to: string): Promise<EarningsEvent[]> {
  const { data, error } = await supabase.functions.invoke("earnings-calendar", {
    body: { from, to },
  });
  if (error) throw new Error(error.message);
  return data?.earningsCalendar || [];
}

const portfolioTickers = new Set(portfolioHoldings.map(h => h.ticker));

// Map Helsinki tickers to Finnhub format
const tickerAliases: Record<string, string> = {
  "QTCOM.HE": "QTCOM",
  "REG1V.HE": "REG1V",
  "TNOM.HE": "TNOM",
  "DETEC.HE": "DETEC",
  "CANATU.HE": "CANATU",
  "AIFORIA.HE": "AIFORIA",
  "EASOR.HE": "EASOR",
};

function isPortfolioStock(symbol: string): boolean {
  if (portfolioTickers.has(symbol)) return true;
  for (const [heTicker, base] of Object.entries(tickerAliases)) {
    if (symbol === base && portfolioTickers.has(heTicker)) return true;
  }
  return false;
}

function isWatchlistStock(symbol: string): boolean {
  return coreHoldingTickers.includes(symbol) || Object.values(tickerAliases).some(alias =>
    alias === symbol && coreHoldingTickers.includes(Object.keys(tickerAliases).find(k => tickerAliases[k] === alias) || "")
  );
}

function formatRevenue(val: number | null): string {
  if (!val) return "-";
  if (val >= 1e9) return `$${(val / 1e9).toFixed(1)}B`;
  if (val >= 1e6) return `$${(val / 1e6).toFixed(0)}M`;
  return `$${val.toLocaleString()}`;
}

export default function Calendar() {
  const [range, setRange] = useState<RangeFilter>("30d");
  const [showOnlyPortfolio, setShowOnlyPortfolio] = useState(false);

  const { from, to } = useMemo(() => getDateRange(range), [range]);
  const { data: earnings, isLoading, error } = useQuery({
    queryKey: ["earnings-calendar", from, to],
    queryFn: () => fetchEarnings(from, to),
    staleTime: 5 * 60_000,
  });

  const filtered = useMemo(() => {
    if (!earnings) return [];
    let list = earnings;
    if (showOnlyPortfolio) {
      list = list.filter(e => isPortfolioStock(e.symbol) || isWatchlistStock(e.symbol));
    }
    return list.sort((a, b) => a.date.localeCompare(b.date) || a.symbol.localeCompare(b.symbol));
  }, [earnings, showOnlyPortfolio]);

  // Group by date
  const grouped = useMemo(() => {
    const map = new Map<string, EarningsEvent[]>();
    filtered.forEach(e => {
      const list = map.get(e.date) || [];
      list.push(e);
      map.set(e.date, list);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const ranges: { label: string; value: RangeFilter }[] = [
    { label: "This Week", value: "week" },
    { label: "Next 30 Days", value: "30d" },
    { label: "Next 90 Days", value: "90d" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-sans font-semibold text-foreground">Earnings Calendar</h1>
        </div>
        <span className="text-xs font-mono text-muted-foreground">{filtered.length} reports</span>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-1 bg-secondary rounded-md p-1">
          {ranges.map(r => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`px-3 py-1.5 text-xs font-sans rounded transition-colors ${
                range === r.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowOnlyPortfolio(!showOnlyPortfolio)}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans rounded-md transition-colors ${
            showOnlyPortfolio ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          <Filter className="h-3 w-3" />
          My Holdings Only
        </button>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs font-sans text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
          Portfolio holding
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-muted-foreground/40" />
          Other stocks
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono bg-secondary px-1 py-0.5 rounded">BMO</span>
          Before market open
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono bg-secondary px-1 py-0.5 rounded">AMC</span>
          After market close
        </div>
      </div>

      {isLoading && (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <p className="text-sm text-muted-foreground animate-pulse">Loading earnings calendar...</p>
        </div>
      )}

      {error && (
        <div className="bg-card rounded-lg border border-border p-8 text-center">
          <p className="text-sm text-negative">Failed to load earnings data. Please try again.</p>
        </div>
      )}

      {!isLoading && grouped.length === 0 && (
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <p className="text-sm text-muted-foreground">No earnings reports found for this period.</p>
        </div>
      )}

      {/* Calendar list */}
      {grouped.map(([date, events]) => {
        const d = new Date(date + "T12:00:00");
        const dayName = d.toLocaleDateString("en-US", { weekday: "long" });
        const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        const isToday = date === new Date().toISOString().split("T")[0];

        return (
          <div key={date} className="space-y-2">
            <div className="flex items-center gap-3">
              <h3 className={`text-sm font-sans font-medium ${isToday ? "text-primary" : "text-foreground"}`}>
                {dayName}, {dateStr}
              </h3>
              {isToday && (
                <span className="text-[10px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">TODAY</span>
              )}
              <span className="text-[10px] font-mono text-muted-foreground">{events.length} reports</span>
            </div>

            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="grid grid-cols-[1.5fr_0.6fr_0.8fr_0.8fr_0.5fr] gap-2 px-4 py-2 border-b border-border text-[10px] font-sans text-muted-foreground uppercase tracking-wider">
                <span>Company</span>
                <span className="text-right">EPS Est.</span>
                <span className="text-right">Revenue Est.</span>
                <span className="text-right">Quarter</span>
                <span className="text-right">Time</span>
              </div>
              {events.map((e, i) => {
                const inPortfolio = isPortfolioStock(e.symbol);
                return (
                  <div
                    key={`${e.symbol}-${i}`}
                    className={`grid grid-cols-[1.5fr_0.6fr_0.8fr_0.8fr_0.5fr] gap-2 items-center px-4 py-2.5 border-b border-border last:border-b-0 transition-colors hover:bg-secondary/30 ${
                      inPortfolio ? "border-l-2 border-l-primary" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-sm font-semibold text-foreground">{e.symbol}</span>
                      {inPortfolio && (
                        <span className="text-[9px] font-sans text-primary bg-primary/10 px-1 py-0.5 rounded shrink-0">HELD</span>
                      )}
                    </div>
                    <span className="font-mono text-sm text-foreground text-right">
                      {e.epsEstimate !== null ? `$${e.epsEstimate.toFixed(2)}` : "-"}
                    </span>
                    <span className="font-mono text-sm text-foreground text-right">
                      {formatRevenue(e.revenueEstimate)}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground text-right">
                      Q{e.quarter} {e.year}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground text-right uppercase">
                      {e.hour === "bmo" ? "BMO" : e.hour === "amc" ? "AMC" : e.hour || "-"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
