import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

const chartStyle = {
  backgroundColor: "hsl(222 16% 12%)",
  border: "1px solid hsl(218 14% 25%)",
  borderRadius: "6px",
  fontFamily: "IBM Plex Mono",
  fontSize: "12px",
  color: "hsl(216 14% 89%)",
};

const indices = [
  { name: "S&P 500", value: "5,234.18", change: "+0.82%", up: true },
  { name: "Nasdaq", value: "16,428.82", change: "+1.24%", up: true },
  { name: "Dow Jones", value: "39,512.84", change: "+0.34%", up: true },
  { name: "Russell 2000", value: "2,048.62", change: "-0.42%", up: false },
  { name: "Euro Stoxx 50", value: "5,068.42", change: "+0.65%", up: true },
];

const commodities = [
  { name: "Gold", value: "$2,178.50", change: "+0.42%", up: true },
  { name: "Oil (WTI)", value: "$78.42", change: "-1.25%", up: false },
  { name: "Copper", value: "$4.28", change: "+0.85%", up: true },
];

const crypto = [
  { name: "Bitcoin", value: "$68,542", change: "+2.45%", up: true },
  { name: "Ethereum", value: "$3,842", change: "+1.82%", up: true },
];

const rates = [
  { name: "US 10Y Treasury", value: "4.28%", change: "+0.02", up: true },
  { name: "US 2Y Treasury", value: "4.68%", change: "-0.01", up: false },
];

const vix = { name: "VIX", value: "14.82", change: "-3.42%", up: false };

const sectorPerf = [
  { sector: "Technology", perf: 2.85 },
  { sector: "Healthcare", perf: 1.42 },
  { sector: "Financials", perf: 0.95 },
  { sector: "Energy", perf: -0.82 },
  { sector: "Consumer", perf: 0.65 },
  { sector: "Industrials", perf: 0.42 },
  { sector: "Materials", perf: -0.25 },
  { sector: "Real Estate", perf: -1.15 },
  { sector: "Utilities", perf: 0.18 },
  { sector: "Comm. Services", perf: 1.82 },
];

const topGainers = [
  { ticker: "SMCI", name: "Super Micro", change: "+12.5%" },
  { ticker: "PLTR", name: "Palantir", change: "+3.98%" },
  { ticker: "BABA", name: "Alibaba", change: "+3.33%" },
  { ticker: "MSTR", name: "Strategy", change: "+3.23%" },
  { ticker: "NVDA", name: "NVIDIA", change: "+3.21%" },
];

const topLosers = [
  { ticker: "AIFORIA", name: "Aiforia", change: "-5.33%" },
  { ticker: "TSLA", name: "Tesla", change: "-2.14%" },
  { ticker: "NVO", name: "Novo Nordisk", change: "-1.40%" },
  { ticker: "SNOW", name: "Snowflake", change: "-1.32%" },
  { ticker: "INTC", name: "Intel", change: "-1.23%" },
];

export default function Markets() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-sans font-semibold text-foreground">Markets Overview</h1>

      {/* Indices */}
      <Section title="Indices">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {indices.map(i => <MarketCard key={i.name} {...i} />)}
        </div>
      </Section>

      {/* VIX */}
      <div className="bg-card rounded-lg border border-border p-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider">{vix.name}</span>
          <span className="text-xs font-sans text-muted-foreground ml-2">· Volatility Index</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-lg font-bold text-foreground">{vix.value}</span>
          <span className="font-mono text-sm text-positive">{vix.change}</span>
        </div>
      </div>

      {/* Commodities + Crypto + Rates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Commodities">
          <div className="space-y-0">
            {commodities.map(c => <ListItem key={c.name} {...c} />)}
          </div>
        </Section>
        <Section title="Crypto">
          <div className="space-y-0">
            {crypto.map(c => <ListItem key={c.name} {...c} />)}
          </div>
        </Section>
        <Section title="Rates">
          <div className="space-y-0">
            {rates.map(r => <ListItem key={r.name} {...r} />)}
          </div>
        </Section>
      </div>

      {/* Sector Performance */}
      <div className="bg-card rounded-lg border border-border p-5">
        <h3 className="text-xs font-sans text-muted-foreground uppercase tracking-wider mb-4">Sector Performance</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectorPerf} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(218 14% 20%)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "hsl(218 14% 38%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <YAxis type="category" dataKey="sector" tick={{ fill: "hsl(218 14% 38%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} width={110} />
              <Tooltip contentStyle={chartStyle} formatter={(v: number) => [`${v.toFixed(2)}%`, "Performance"]} />
              {sectorPerf.map((entry, i) => (
                <Bar key={i} dataKey="perf" fill={entry.perf >= 0 ? "hsl(162 67% 48%)" : "hsl(354 72% 60%)"} radius={[0, 4, 4, 0]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Gainers + Losers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-xs font-sans text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <TrendingUp className="h-3.5 w-3.5 text-positive" /> Top Gainers
          </h3>
          <div className="space-y-2">
            {topGainers.map(g => (
              <div key={g.ticker} className="flex items-center justify-between py-1.5">
                <div>
                  <span className="font-mono text-sm font-semibold text-foreground">{g.ticker}</span>
                  <span className="text-xs font-sans text-muted-foreground ml-2">{g.name}</span>
                </div>
                <span className="font-mono text-sm text-positive">{g.change}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-xs font-sans text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <TrendingDown className="h-3.5 w-3.5 text-negative" /> Top Losers
          </h3>
          <div className="space-y-2">
            {topLosers.map(l => (
              <div key={l.ticker} className="flex items-center justify-between py-1.5">
                <div>
                  <span className="font-mono text-sm font-semibold text-foreground">{l.ticker}</span>
                  <span className="text-xs font-sans text-muted-foreground ml-2">{l.name}</span>
                </div>
                <span className="font-mono text-sm text-negative">{l.change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-sans font-medium text-muted-foreground uppercase tracking-wider mb-3">{title}</h2>
      {children}
    </section>
  );
}

function MarketCard({ name, value, change, up }: { name: string; value: string; change: string; up: boolean }) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:bg-secondary/30 transition-colors cursor-pointer">
      <div className="text-xs font-sans text-muted-foreground mb-2">{name}</div>
      <div className="font-mono text-lg font-bold text-foreground">{value}</div>
      <div className={`font-mono text-sm mt-1 ${up ? "text-positive" : "text-negative"}`}>{change}</div>
    </div>
  );
}

function ListItem({ name, value, change, up }: { name: string; value: string; change: string; up: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
      <span className="text-sm font-sans text-foreground">{name}</span>
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-foreground">{value}</span>
        <span className={`font-mono text-sm ${up ? "text-positive" : "text-negative"}`}>{change}</span>
      </div>
    </div>
  );
}
