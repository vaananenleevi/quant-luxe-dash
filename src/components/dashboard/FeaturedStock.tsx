import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const timeRanges = ["1D", "1W", "1M", "3M", "1Y", "5Y"] as const;

const chartData = [
  { date: "Jan", price: 142 },
  { date: "Feb", price: 155 },
  { date: "Mar", price: 148 },
  { date: "Apr", price: 162 },
  { date: "May", price: 171 },
  { date: "Jun", price: 178 },
  { date: "Jul", price: 185 },
  { date: "Aug", price: 176 },
  { date: "Sep", price: 182 },
  { date: "Oct", price: 189 },
  { date: "Nov", price: 194 },
  { date: "Dec", price: 189 },
];

const metrics = [
  { label: "Market Cap", value: "$2.94T" },
  { label: "P/E Ratio", value: "31.24" },
  { label: "Revenue Growth", value: "+8.1%" },
  { label: "Dividend Yield", value: "0.52%" },
  { label: "R&D Intensity", value: "6.8%" },
];

export function FeaturedStock() {
  const [activeRange, setActiveRange] = useState<string>("1Y");

  return (
    <section className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="font-mono text-2xl font-bold text-foreground">AAPL</h2>
            <span className="text-sm font-sans text-muted-foreground">Apple Inc.</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-3xl font-bold text-foreground">$189.84</span>
            <span className="font-mono text-sm text-positive">+1.42% today</span>
          </div>
        </div>

        {/* Time range buttons */}
        <div className="flex gap-1 bg-secondary rounded-md p-1">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                activeRange === range
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(218 14% 20%)" />
            <XAxis
              dataKey="date"
              tick={{ fill: "hsl(218 14% 38%)", fontSize: 11, fontFamily: "IBM Plex Mono" }}
              axisLine={{ stroke: "hsl(218 14% 20%)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(218 14% 38%)", fontSize: 11, fontFamily: "IBM Plex Mono" }}
              axisLine={false}
              tickLine={false}
              domain={["dataMin - 10", "dataMax + 10"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222 16% 12%)",
                border: "1px solid hsl(218 14% 25%)",
                borderRadius: "6px",
                fontFamily: "IBM Plex Mono",
                fontSize: "12px",
                color: "hsl(216 14% 89%)",
              }}
              formatter={(value: number) => [`$${value}`, "Price"]}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="hsl(225 100% 64%)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "hsl(225 100% 64%)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="group cursor-pointer">
            <div className="text-xs font-sans text-muted-foreground mb-1 group-hover:text-primary transition-colors">
              {m.label}
            </div>
            <div className="font-mono text-sm font-semibold text-foreground">{m.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
