import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart,
} from "recharts";
import { ArrowLeft, Building2, Users, MapPin, Globe } from "lucide-react";
import { getStockByTicker, allStocks } from "@/data/stocks";
import { useLiveQuote } from "@/hooks/use-live-quotes";

const timeRanges = ["1D", "1W", "1M", "1Y", "5Y"] as const;

const chartStyle = {
  backgroundColor: "hsl(222 16% 12%)",
  border: "1px solid hsl(218 14% 25%)",
  borderRadius: "6px",
  fontFamily: "IBM Plex Mono",
  fontSize: "12px",
  color: "hsl(216 14% 89%)",
};

const generatePriceData = (price: number, range: string) => {
  const points = range === "1D" ? 24 : range === "1W" ? 7 : range === "1M" ? 30 : range === "1Y" ? 12 : 60;
  const labels = range === "1Y" ? ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] :
    range === "5Y" ? Array.from({ length: 60 }, (_, i) => `${2021 + Math.floor(i / 12)}`) :
    Array.from({ length: points }, (_, i) => `${i + 1}`);
  const volatility = range === "1D" ? 0.005 : range === "1W" ? 0.015 : range === "1M" ? 0.05 : range === "1Y" ? 0.15 : 0.4;
  let p = price * (1 - volatility * 0.5);
  return labels.map(l => {
    p = p * (1 + (Math.random() - 0.45) * volatility * 0.3);
    return { date: l, price: Math.round(p * 100) / 100 };
  });
};

const generateRevenueData = () => {
  return [
    { year: "2020", revenue: 274, earnings: 57 },
    { year: "2021", revenue: 366, earnings: 95 },
    { year: "2022", revenue: 394, earnings: 100 },
    { year: "2023", revenue: 383, earnings: 97 },
    { year: "2024", revenue: 412, earnings: 108 },
  ];
};

const generateMarginData = () => {
  return [
    { year: "2020", gross: 38.2, operating: 24.1, net: 20.9 },
    { year: "2021", gross: 41.8, operating: 29.8, net: 25.9 },
    { year: "2022", gross: 43.3, operating: 30.3, net: 25.3 },
    { year: "2023", gross: 44.1, operating: 30.7, net: 25.3 },
    { year: "2024", gross: 45.2, operating: 31.5, net: 26.8 },
  ];
};

export default function StockDetail() {
  const { ticker } = useParams<{ ticker: string }>();
  const [activeRange, setActiveRange] = useState<string>("1Y");
  const { quote: liveQuote, fetchedAt } = useLiveQuote(ticker || "");

  const stock = getStockByTicker(ticker || "");

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

  // Use live data if available
  const displayPrice = liveQuote && liveQuote.price > 0 ? liveQuote.price : stock.price;
  const displayChange = liveQuote && liveQuote.price > 0 ? liveQuote.changePercent : stock.changePercent;

  const priceData = generatePriceData(displayPrice, activeRange);
  const revenueData = generateRevenueData();
  const marginData = generateMarginData();

  const financials = [
    { label: "Revenue", value: stock.revenue },
    { label: "EBIT", value: stock.ebit },
    { label: "Net Income", value: stock.netIncome },
    { label: "Free Cash Flow", value: stock.fcf },
    { label: "EPS", value: `$${stock.eps.toFixed(2)}` },
    { label: "ROE", value: `${stock.roe.toFixed(1)}%` },
    { label: "ROIC", value: `${stock.roic.toFixed(1)}%` },
  ];

  const valuationMetrics = [
    { label: "P/E", value: stock.pe > 0 ? stock.pe.toFixed(1) : "N/A" },
    { label: "Forward P/E", value: stock.forwardPe > 0 ? stock.forwardPe.toFixed(1) : "N/A" },
    { label: "EV/EBITDA", value: stock.evEbitda > 0 ? stock.evEbitda.toFixed(1) : "N/A" },
    { label: "P/S", value: stock.ps.toFixed(1) },
    { label: "P/B", value: stock.pb.toFixed(1) },
    { label: "Beta", value: stock.beta.toFixed(2) },
  ];

  return (
    <div className="space-y-6">
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
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-3xl font-bold text-foreground">${stock.price.toFixed(2)}</span>
            <span className={`font-mono text-sm ${stock.changePercent >= 0 ? "text-positive" : "text-negative"}`}>
              {stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}% today
            </span>
          </div>
        </div>
        <div className="flex gap-1 bg-secondary rounded-md p-1">
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

      {/* Price chart */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={priceData}>
              <defs>
                <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(225 100% 64%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(225 100% 64%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(218 14% 20%)" />
              <XAxis dataKey="date" tick={{ fill: "hsl(218 14% 38%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={{ stroke: "hsl(218 14% 20%)" }} tickLine={false} />
              <YAxis tick={{ fill: "hsl(218 14% 38%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} domain={["dataMin * 0.98", "dataMax * 1.02"]} />
              <Tooltip contentStyle={chartStyle} formatter={(v: number) => [`$${v.toFixed(2)}`, "Price"]} />
              <Area type="monotone" dataKey="price" stroke="hsl(225 100% 64%)" strokeWidth={2} fill="url(#priceGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Company info + Financials */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Company info */}
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

        {/* Financial summary */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-xs font-sans text-muted-foreground uppercase tracking-wider mb-4">Financials</h3>
          <div className="space-y-3">
            {financials.map(f => (
              <div key={f.label} className="flex items-center justify-between">
                <span className="text-xs font-sans text-muted-foreground">{f.label}</span>
                <span className="font-mono text-sm font-semibold text-foreground">{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Valuation */}
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-xs font-sans text-muted-foreground uppercase tracking-wider mb-4">Valuation</h3>
          <div className="space-y-3">
            {valuationMetrics.map(v => (
              <div key={v.label} className="flex items-center justify-between">
                <span className="text-xs font-sans text-muted-foreground">{v.label}</span>
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

      {/* Revenue & Margins charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-xs font-sans text-muted-foreground uppercase tracking-wider mb-4">Revenue & Earnings Trend</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(218 14% 20%)" />
                <XAxis dataKey="year" tick={{ fill: "hsl(218 14% 38%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(218 14% 38%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartStyle} />
                <Bar dataKey="revenue" name="Revenue ($B)" fill="hsl(225 100% 64%)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="earnings" name="Earnings ($B)" fill="hsl(162 67% 48%)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-5">
          <h3 className="text-xs font-sans text-muted-foreground uppercase tracking-wider mb-4">Margin Evolution</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marginData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(218 14% 20%)" />
                <XAxis dataKey="year" tick={{ fill: "hsl(218 14% 38%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(218 14% 38%)", fontSize: 11, fontFamily: "IBM Plex Mono" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartStyle} formatter={(v: number) => [`${v.toFixed(1)}%`, ""]} />
                <Line type="monotone" dataKey="gross" name="Gross" stroke="hsl(225 100% 64%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="operating" name="Operating" stroke="hsl(162 67% 48%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="net" name="Net" stroke="hsl(38 92% 60%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Profitability & Strength */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Revenue Growth", value: `${stock.revenueGrowth >= 0 ? "+" : ""}${stock.revenueGrowth.toFixed(1)}%`, positive: stock.revenueGrowth >= 0 },
          { label: "Net Margin", value: `${stock.netMargin.toFixed(1)}%`, positive: stock.netMargin > 0 },
          { label: "Debt/Equity", value: stock.debtEquity.toFixed(2), positive: stock.debtEquity < 1 },
          { label: "Current Ratio", value: stock.currentRatio.toFixed(1), positive: stock.currentRatio >= 1 },
        ].map(m => (
          <div key={m.label} className="bg-card rounded-lg border border-border p-4">
            <div className="text-xs font-sans text-muted-foreground mb-1">{m.label}</div>
            <div className={`font-mono text-lg font-bold ${m.positive ? "text-positive" : "text-negative"}`}>{m.value}</div>
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
