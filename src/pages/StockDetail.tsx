import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { ArrowLeft, Building2, Users, MapPin, Globe, TrendingUp, TrendingDown, Activity } from "lucide-react";
import { getStockByTicker } from "@/data/stocks";
import { useLiveQuote } from "@/hooks/use-live-quotes";
import { MetricTooltip } from "@/components/MetricTooltip";
import { computeStockScore } from "@/lib/metrics";
import { Skeleton } from "@/components/ui/skeleton";

const timeRanges = ["1D", "1W", "1M", "3M", "1Y", "5Y"] as const;

const generatePriceData = (price: number, range: string) => {
  const points = range === "1D" ? 78 : range === "1W" ? 5 : range === "1M" ? 22 : range === "3M" ? 63 : range === "1Y" ? 252 : 1260;
  const volatility = range === "1D" ? 0.003 : range === "1W" ? 0.008 : range === "1M" ? 0.02 : range === "3M" ? 0.04 : range === "1Y" ? 0.12 : 0.35;
  const now = new Date();
  let p = price * (1 - volatility * 0.5);
  const data: { date: string; price: number; dateObj: Date }[] = [];

  for (let i = 0; i < points; i++) {
    p = p * (1 + (Math.random() - 0.47) * volatility * 0.15);
    const d = new Date(now);
    if (range === "1D") d.setMinutes(d.getMinutes() - (points - i) * 5);
    else d.setDate(d.getDate() - (points - i));
    const label = range === "1D"
      ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : d.toLocaleDateString([], { month: "short", day: "numeric", year: range === "5Y" || range === "1Y" ? "2-digit" : undefined });
    data.push({ date: label, price: Math.round(p * 100) / 100, dateObj: d });
  }
  // Ensure last point equals current price
  if (data.length > 0) data[data.length - 1].price = price;
  return data;
};

const generateRevenueData = () => [
  { year: "2020", revenue: 274, earnings: 57 },
  { year: "2021", revenue: 366, earnings: 95 },
  { year: "2022", revenue: 394, earnings: 100 },
  { year: "2023", revenue: 383, earnings: 97 },
  { year: "2024", revenue: 412, earnings: 108 },
];

const generateMarginData = () => [
  { year: "2020", gross: 38.2, operating: 24.1, net: 20.9 },
  { year: "2021", gross: 41.8, operating: 29.8, net: 25.9 },
  { year: "2022", gross: 43.3, operating: 30.3, net: 25.3 },
  { year: "2023", gross: 44.1, operating: 30.7, net: 25.3 },
  { year: "2024", gross: 45.2, operating: 31.5, net: 26.8 },
];

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-sans">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-semibold text-foreground">{score}/100</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default function StockDetail() {
  const { ticker } = useParams<{ ticker: string }>();
  const [activeRange, setActiveRange] = useState<string>("1Y");
  const [chartMode, setChartMode] = useState<"price" | "return">("price");
  const [showMA, setShowMA] = useState(false);
  const { quote: liveQuote, fetchedAt, isLoading } = useLiveQuote(ticker || "");

  const stock = getStockByTicker(ticker || "");

  const displayPrice = liveQuote && liveQuote.price > 0 ? liveQuote.price : (stock?.price ?? 0);
  const displayChange = liveQuote && liveQuote.price > 0 ? liveQuote.changePercent : (stock?.changePercent ?? 0);

  const rawPriceData = useMemo(() => generatePriceData(displayPrice, activeRange), [displayPrice, activeRange]);

  // Transform data based on chart mode
  const chartData = useMemo(() => {
    if (chartMode === "return") {
      const base = rawPriceData[0]?.price || 1;
      return rawPriceData.map(d => ({
        ...d,
        value: ((d.price / base) - 1) * 100,
        normalized: (d.price / base) * 100,
      }));
    }
    return rawPriceData.map(d => ({ ...d, value: d.price }));
  }, [rawPriceData, chartMode]);

  // 50-day moving average
  const chartWithMA = useMemo(() => {
    if (!showMA) return chartData;
    const window = Math.min(50, Math.floor(chartData.length / 3));
    return chartData.map((d, i) => {
      if (i < window - 1) return { ...d, ma50: undefined };
      const slice = chartData.slice(i - window + 1, i + 1);
      const avg = slice.reduce((s, v) => s + v.value, 0) / window;
      return { ...d, ma50: Math.round(avg * 100) / 100 };
    });
  }, [chartData, showMA]);

  // Period return
  const periodReturn = rawPriceData.length > 1
    ? ((rawPriceData[rawPriceData.length - 1].price / rawPriceData[0].price) - 1) * 100
    : 0;

  const revenueData = generateRevenueData();

  // Investment insight scores
  const scores = useMemo(() => stock ? computeStockScore(stock) : { growth: 0, profitability: 0, valuation: 0, overall: 0, conclusion: "", strengths: [], risks: [] }, [stock]);

  if (!stock) {
    return (
      <div className="space-y-4">
        <Link to="/watchlist" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Watchlist
        </Link>
        <div className="bg-card rounded-lg border border-border p-12 text-center">
          <p className="text-muted-foreground font-sans">Stock not found: {ticker}</p>
        </div>
      </div>
    );
  }

  const financialMetrics = [
    { key: "revenue", label: "Revenue", value: stock.revenue },
    { key: "ebit", label: "EBIT", value: stock.ebit },
    { key: "netIncome", label: "Net Income", value: stock.netIncome },
    { key: "fcf", label: "Free Cash Flow", value: stock.fcf },
    { key: "eps", label: "EPS (TTM)", value: `$${stock.eps.toFixed(2)}` },
    { key: "roe", label: "ROE (TTM)", value: `${stock.roe.toFixed(1)}%`, tooltip: "Return on Equity — Net Income ÷ Equity" },
    { key: "roic", label: "ROIC (TTM)", value: `${stock.roic.toFixed(1)}%`, tooltip: "Return on Invested Capital — the gold standard profitability metric" },
  ];

  const valuationMetrics = [
    { key: "pe", label: "P/E (TTM)", value: stock.pe > 0 ? stock.pe.toFixed(1) : "N/A", tooltip: "Trailing 12-month Price-to-Earnings ratio" },
    { key: "forwardPe", label: "Fwd P/E (NTM)", value: stock.forwardPe > 0 ? stock.forwardPe.toFixed(1) : "N/A", tooltip: "Next 12-month estimated P/E" },
    { key: "evEbitda", label: "EV/EBITDA (TTM)", value: stock.evEbitda > 0 ? stock.evEbitda.toFixed(1) : "N/A", tooltip: "Enterprise Value ÷ EBITDA" },
    { key: "ps", label: "P/S (TTM)", value: stock.ps.toFixed(1), tooltip: "Price-to-Sales ratio" },
    { key: "pb", label: "P/B", value: stock.pb.toFixed(1), tooltip: "Price-to-Book ratio" },
    { key: "beta", label: "Beta (5Y)", value: stock.beta.toFixed(2), tooltip: "Stock volatility vs market" },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.[0]) return null;
    const val = payload[0].value;
    const basePrice = rawPriceData[0]?.price || displayPrice;
    const pctFromBase = chartMode === "price" ? ((val / basePrice - 1) * 100) : val;
    return (
      <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
        <p className="text-xs font-sans text-muted-foreground mb-1">{label}</p>
        <p className="font-mono text-sm font-semibold text-foreground">
          {chartMode === "price" ? `$${val.toFixed(2)}` : `${val >= 0 ? "+" : ""}${val.toFixed(2)}%`}
        </p>
        {chartMode === "price" && (
          <p className={`font-mono text-[10px] ${pctFromBase >= 0 ? "text-positive" : "text-negative"}`}>
            {pctFromBase >= 0 ? "+" : ""}{pctFromBase.toFixed(2)}% from start
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Link to="/watchlist" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-mono text-2xl font-bold text-foreground">{stock.ticker}</h1>
            <span className="text-sm font-sans text-muted-foreground">{stock.name}</span>
            <span className="text-[10px] font-sans text-muted-foreground bg-secondary px-2 py-0.5 rounded">{stock.sector}</span>
            {fetchedAt && (
              <span className="text-[9px] font-mono text-positive bg-positive/10 px-1.5 py-0.5 rounded">
                LIVE · {new Date(fetchedAt).toLocaleTimeString()}
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-3">
            {isLoading ? (
              <Skeleton className="h-9 w-32" />
            ) : (
              <>
                <span className="font-mono text-3xl font-bold text-foreground">${displayPrice.toFixed(2)}</span>
                <span className={`font-mono text-sm ${displayChange >= 0 ? "text-positive" : "text-negative"}`}>
                  {displayChange >= 0 ? "+" : ""}{displayChange.toFixed(2)}% today
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Chart controls */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1 bg-secondary rounded-md p-0.5">
              {(["price", "return"] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setChartMode(mode)}
                  className={`px-3 py-1 text-xs font-sans rounded transition-colors ${
                    chartMode === mode ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {mode === "price" ? "Price" : "% Return"}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowMA(!showMA)}
              className={`px-3 py-1 text-xs font-sans rounded border transition-colors ${
                showMA ? "border-primary text-primary bg-primary/10" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <Activity className="h-3 w-3 inline mr-1" />MA50
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-mono text-sm font-semibold ${periodReturn >= 0 ? "text-positive" : "text-negative"}`}>
              {periodReturn >= 0 ? "+" : ""}{periodReturn.toFixed(2)}% ({activeRange})
            </span>
            <div className="flex gap-1 bg-secondary rounded-md p-0.5">
              {timeRanges.map(r => (
                <button
                  key={r}
                  onClick={() => setActiveRange(r)}
                  className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                    activeRange === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartWithMA}>
              <defs>
                <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis
                dataKey="date"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontFamily: "IBM Plex Mono" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
                interval={Math.max(0, Math.floor(chartWithMA.length / 8))}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontFamily: "IBM Plex Mono" }}
                axisLine={false}
                tickLine={false}
                domain={["auto", "auto"]}
                tickFormatter={v => chartMode === "return" ? `${v.toFixed(0)}%` : `$${v.toFixed(0)}`}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#priceGrad)"
                dot={false}
                animationDuration={500}
              />
              {showMA && (
                <Line
                  type="monotone"
                  dataKey="ma50"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={1.5}
                  dot={false}
                  strokeDasharray="4 2"
                  connectNulls={false}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Investment Insights */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-xs font-sans text-muted-foreground uppercase tracking-wider mb-4">Investment Insight</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <ScoreBar label="Growth" score={scores.growth} color="bg-primary" />
            <ScoreBar label="Profitability" score={scores.profitability} color="bg-positive" />
            <ScoreBar label="Valuation" score={scores.valuation} color="bg-[hsl(var(--chart-4))]" />
            <div className="pt-2 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm font-sans text-muted-foreground">Overall Score</span>
                <span className={`font-mono text-lg font-bold ${
                  scores.overall >= 70 ? "text-positive" : scores.overall >= 45 ? "text-foreground" : "text-negative"
                }`}>
                  {scores.overall}/100
                </span>
              </div>
              <p className="text-xs font-sans text-muted-foreground mt-1 italic">{scores.conclusion}</p>
            </div>
          </div>
          <div className="space-y-4">
            {scores.strengths.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <TrendingUp className="h-3.5 w-3.5 text-positive" />
                  <span className="text-xs font-sans font-semibold text-positive uppercase">Strengths</span>
                </div>
                <ul className="space-y-1">
                  {scores.strengths.map((s, i) => (
                    <li key={i} className="text-xs font-sans text-foreground/80 flex items-start gap-1.5">
                      <span className="text-positive mt-0.5">+</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {scores.risks.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <TrendingDown className="h-3.5 w-3.5 text-negative" />
                  <span className="text-xs font-sans font-semibold text-negative uppercase">Risks</span>
                </div>
                <ul className="space-y-1">
                  {scores.risks.map((r, i) => (
                    <li key={i} className="text-xs font-sans text-foreground/80 flex items-start gap-1.5">
                      <span className="text-negative mt-0.5">−</span>{r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Company info + Financials + Valuation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-5 space-y-4">
          <h3 className="text-xs font-sans text-muted-foreground uppercase tracking-wider">About</h3>
          <p className="text-sm font-sans text-foreground/80 leading-relaxed">{stock.description}</p>
          <div className="space-y-2.5 pt-2">
            <InfoRow icon={Building2} label="Industry" value={stock.industry} />
            <InfoRow icon={Globe} label="Country" value={stock.country} />
            <InfoRow icon={MapPin} label="HQ" value={stock.headquarters} />
            <InfoRow icon={Users} label="Employees" value={stock.employees} />
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-xs font-sans text-muted-foreground uppercase tracking-wider mb-4">Financials (TTM)</h3>
          <div className="space-y-3">
            {financialMetrics.map(f => (
              <div key={f.key} className="flex items-center justify-between">
                {f.tooltip ? (
                  <MetricTooltip label={f.label} tooltip={f.tooltip}>
                    <span className="text-xs font-sans text-muted-foreground">{f.label}</span>
                  </MetricTooltip>
                ) : (
                  <span className="text-xs font-sans text-muted-foreground">{f.label}</span>
                )}
                <span className="font-mono text-sm font-semibold text-foreground">{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-xs font-sans text-muted-foreground uppercase tracking-wider mb-4">Valuation</h3>
          <div className="space-y-3">
            {valuationMetrics.map(v => (
              <div key={v.key} className="flex items-center justify-between">
                <MetricTooltip label={v.label} tooltip={v.tooltip}>
                  <span className="text-xs font-sans text-muted-foreground">{v.label}</span>
                </MetricTooltip>
                <span className="font-mono text-sm font-semibold text-foreground">{v.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans text-muted-foreground">Market Cap</span>
              <span className="font-mono text-sm font-semibold text-foreground">{stock.marketCap}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans text-muted-foreground">EV</span>
              <span className="font-mono text-sm font-semibold text-foreground">{stock.enterpriseValue}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-sans text-muted-foreground">Div. Yield</span>
              <span className="font-mono text-sm font-semibold text-foreground">{stock.dividendYield.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue & Margins */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-xs font-sans text-muted-foreground uppercase tracking-wider mb-4">Revenue & Earnings Trend</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} />
                <RechartsTooltip contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "6px", fontFamily: "IBM Plex Mono", fontSize: "12px", color: "hsl(var(--foreground))" }} />
                <Bar dataKey="revenue" name="Revenue ($B)" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
                <Bar dataKey="earnings" name="Earnings ($B)" fill="hsl(var(--positive))" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-xs font-sans text-muted-foreground uppercase tracking-wider mb-4">Margin Evolution</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generateMarginData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} />
                <RechartsTooltip contentStyle={{ backgroundColor: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "6px", fontFamily: "IBM Plex Mono", fontSize: "12px" }} formatter={(v: number) => [`${v.toFixed(1)}%`, ""]} />
                <Line type="monotone" dataKey="gross" name="Gross" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="operating" name="Operating" stroke="hsl(var(--positive))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="net" name="Net" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Key metrics cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Revenue Growth (YoY TTM)", value: `${stock.revenueGrowth >= 0 ? "+" : ""}${stock.revenueGrowth.toFixed(1)}%`, positive: stock.revenueGrowth >= 0, tooltip: "Year-over-year revenue growth, trailing 12 months" },
          { label: "Net Margin (TTM)", value: `${stock.netMargin.toFixed(1)}%`, positive: stock.netMargin > 0, tooltip: "Net Income as % of Revenue" },
          { label: "Debt/Equity", value: stock.debtEquity.toFixed(2), positive: stock.debtEquity < 1, tooltip: "Total Debt ÷ Equity. Lower = safer" },
          { label: "Current Ratio", value: stock.currentRatio.toFixed(1), positive: stock.currentRatio >= 1, tooltip: "Current Assets ÷ Current Liabilities" },
        ].map(m => (
          <div key={m.label} className="bg-card rounded-lg border border-border p-4 hover:border-primary/30 transition-colors">
            <MetricTooltip label={m.label} tooltip={m.tooltip}>
              <span className="text-xs font-sans text-muted-foreground">{m.label}</span>
            </MetricTooltip>
            <div className={`font-mono text-lg font-bold mt-1 ${m.positive ? "text-positive" : "text-negative"}`}>{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-xs font-sans text-muted-foreground w-16">{label}</span>
      <span className="text-xs font-sans text-foreground">{value}</span>
    </div>
  );
}
