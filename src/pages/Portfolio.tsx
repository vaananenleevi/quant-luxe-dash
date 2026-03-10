import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { portfolioHoldings, allStocks, portfolioETFs, getStockByTicker } from "@/data/stocks";
import { MiniChart } from "@/components/dashboard/MiniChart";

const CHART_COLORS = [
  "hsl(225 100% 64%)", "hsl(162 67% 48%)", "hsl(354 72% 60%)",
  "hsl(38 92% 60%)", "hsl(280 60% 60%)", "hsl(195 80% 55%)",
  "hsl(145 60% 45%)", "hsl(0 72% 55%)", "hsl(210 70% 50%)",
  "hsl(320 65% 55%)",
];

function getPrice(ticker: string) {
  const stock = getStockByTicker(ticker);
  if (stock) return stock;
  const etf = portfolioETFs.find(e => e.ticker === ticker);
  if (etf) return etf;
  return null;
}

export default function Portfolio() {
  const [sortKey, setSortKey] = useState<string>("weight");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const holdings = useMemo(() => {
    const enriched = portfolioHoldings.map(h => {
      const data = getPrice(h.ticker);
      const price = data?.price ?? 0;
      const changePercent = data?.changePercent ?? 0;
      const sparkline = data?.sparkline ?? [];
      const value = h.shares * price;
      const costBasis = h.shares * h.avgCost;
      const totalReturn = costBasis > 0 ? ((value - costBasis) / costBasis) * 100 : 0;
      const mktCap = (data && 'marketCap' in data) ? (data as any).marketCap : "-";
      return { ...h, price, changePercent, sparkline, value, totalReturn, marketCap: mktCap };
    });

    enriched.sort((a, b) => {
      let va: number, vb: number;
      switch (sortKey) {
        case "weight": va = a.weight; vb = b.weight; break;
        case "change": va = a.changePercent; vb = b.changePercent; break;
        case "return": va = a.totalReturn; vb = b.totalReturn; break;
        case "value": va = a.value; vb = b.value; break;
        default: va = a.weight; vb = b.weight;
      }
      return sortDir === "desc" ? vb - va : va - vb;
    });

    return enriched;
  }, [sortKey, sortDir]);

  const totalValue = holdings.reduce((s, h) => s + h.value, 0);
  const totalCost = holdings.reduce((s, h) => s + h.shares * h.avgCost, 0);
  const totalReturn = ((totalValue - totalCost) / totalCost) * 100;
  const dailyChange = holdings.reduce((s, h) => s + h.value * (h.changePercent / 100), 0);
  const dailyChangePct = (dailyChange / totalValue) * 100;

  // Sector allocation
  const sectorMap = new Map<string, number>();
  holdings.forEach(h => sectorMap.set(h.sector, (sectorMap.get(h.sector) || 0) + h.weight));
  const sectorData = Array.from(sectorMap.entries()).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  // Country allocation
  const countryMap = new Map<string, number>();
  holdings.forEach(h => countryMap.set(h.country, (countryMap.get(h.country) || 0) + h.weight));
  const countryData = Array.from(countryMap.entries()).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  // Asset type allocation
  const typeMap = new Map<string, number>();
  holdings.forEach(h => typeMap.set(h.assetType, (typeMap.get(h.assetType) || 0) + h.weight));
  const typeData = Array.from(typeMap.entries()).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const SortHeader = ({ label, k }: { label: string; k: string }) => (
    <button onClick={() => handleSort(k)} className={`text-right text-xs font-sans uppercase tracking-wider transition-colors ${sortKey === k ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
      {label} {sortKey === k && (sortDir === "desc" ? "↓" : "↑")}
    </button>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-sans font-semibold text-foreground">My Portfolio</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard label="Total Value" value={`$${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
        <SummaryCard label="Daily Change" value={`${dailyChange >= 0 ? "+" : ""}$${dailyChange.toFixed(0)}`} sub={`${dailyChangePct >= 0 ? "+" : ""}${dailyChangePct.toFixed(2)}%`} positive={dailyChange >= 0} />
        <SummaryCard label="Total Return" value={`${totalReturn >= 0 ? "+" : ""}${totalReturn.toFixed(1)}%`} sub={`$${(totalValue - totalCost).toFixed(0)}`} positive={totalReturn >= 0} />
        <SummaryCard label="Holdings" value={`${holdings.length}`} sub="positions" />
      </div>

      {/* Allocation charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <AllocationChart title="By Sector" data={sectorData} />
        <AllocationChart title="By Geography" data={countryData} />
        <AllocationChart title="By Asset Type" data={typeData} />
      </div>

      {/* Holdings table */}
      <section>
        <h2 className="text-sm font-sans font-medium text-muted-foreground uppercase tracking-wider mb-4">Holdings</h2>
        <div className="bg-card rounded-lg border border-border overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_80px] gap-3 px-4 py-2.5 border-b border-border items-center">
              <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider">Company</span>
              <SortHeader label="Weight" k="weight" />
              <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider text-right">Price</span>
              <SortHeader label="Daily" k="change" />
              <SortHeader label="Return" k="return" />
              <SortHeader label="Value" k="value" />
              <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider text-right">Mkt Cap</span>
              <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider text-right">Trend</span>
            </div>
            {holdings.map(h => (
              <Link
                key={h.ticker}
                to={`/stock/${h.ticker}`}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_80px] gap-3 items-center px-4 py-3 border-b border-border last:border-b-0 hover:bg-secondary/30 transition-colors"
              >
                <div>
                  <span className="font-mono text-sm font-semibold text-foreground">{h.ticker}</span>
                  <span className="text-xs font-sans text-muted-foreground ml-2">{h.name}</span>
                  <span className="text-[10px] font-sans text-muted-foreground ml-2 bg-secondary px-1.5 py-0.5 rounded">{h.sector}</span>
                </div>
                <span className="font-mono text-sm text-foreground text-right">{h.weight.toFixed(1)}%</span>
                <span className="font-mono text-sm text-foreground text-right">${h.price.toFixed(2)}</span>
                <span className={`font-mono text-sm text-right ${h.changePercent >= 0 ? "text-positive" : "text-negative"}`}>
                  {h.changePercent >= 0 ? "+" : ""}{h.changePercent.toFixed(2)}%
                </span>
                <span className={`font-mono text-sm text-right ${h.totalReturn >= 0 ? "text-positive" : "text-negative"}`}>
                  {h.totalReturn >= 0 ? "+" : ""}{h.totalReturn.toFixed(1)}%
                </span>
                <span className="font-mono text-sm text-foreground text-right">${h.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                <span className="font-mono text-xs text-muted-foreground text-right">{h.marketCap}</span>
                <div className="flex justify-end">
                  <MiniChart data={h.sparkline} positive={h.changePercent >= 0} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SummaryCard({ label, value, sub, positive }: { label: string; value: string; sub?: string; positive?: boolean }) {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="text-xs font-sans text-muted-foreground mb-1">{label}</div>
      <div className={`font-mono text-xl font-bold ${positive !== undefined ? (positive ? "text-positive" : "text-negative") : "text-foreground"}`}>{value}</div>
      {sub && <div className={`text-xs font-mono mt-0.5 ${positive !== undefined ? (positive ? "text-positive" : "text-negative") : "text-muted-foreground"}`}>{sub}</div>}
    </div>
  );
}

function AllocationChart({ title, data }: { title: string; data: { name: string; value: number }[] }) {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="text-xs font-sans text-muted-foreground uppercase tracking-wider mb-3">{title}</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={40} strokeWidth={0}>
              {data.map((_, i) => (
                <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222 16% 12%)",
                border: "1px solid hsl(218 14% 25%)",
                borderRadius: "6px",
                fontFamily: "IBM Plex Mono",
                fontSize: "12px",
                color: "hsl(216 14% 89%)",
              }}
              formatter={(value: number) => [`${value.toFixed(1)}%`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-1 mt-2">
        {data.slice(0, 5).map((d, i) => (
          <div key={d.name} className="flex items-center justify-between text-xs font-sans">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
              <span className="text-muted-foreground">{d.name}</span>
            </div>
            <span className="font-mono text-foreground">{d.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
