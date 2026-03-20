import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { useLiveQuote } from "@/hooks/use-live-quotes";

const timeRanges = ["1D", "1W", "1M", "3M", "1Y", "5Y"] as const;

const generateChartData = (price: number) => {
  const pts: { date: string; price: number }[] = [];
  let p = price * 0.85;
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  for (const l of labels) {
    p = p * (1 + (Math.random() - 0.42) * 0.04);
    pts.push({ date: l, price: Math.round(p * 100) / 100 });
  }
  return pts;
};

const metrics = [
  { label: "Market Cap", value: "$3.67T" },
  { label: "P/E Ratio", value: "33.8" },
  { label: "Revenue Growth", value: "+4.9%" },
  { label: "Dividend Yield", value: "0.44%" },
  { label: "R&D Intensity", value: "7.2%" },
];

export function FeaturedStock() {
  const [activeRange, setActiveRange] = useState<string>("1Y");
  const { quote, fetchedAt } = useLiveQuote("AAPL");

  const price = quote && quote.price > 0 ? quote.price : 248.96;
  const changePct = quote && quote.price > 0 ? quote.changePercent : 0.54;
  const up = changePct >= 0;
  const chartData = generateChartData(price);

  return (
    <section className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="font-mono text-2xl font-bold text-foreground">AAPL</h2>
            <span className="text-sm font-sans text-muted-foreground">Apple Inc.</span>
            {fetchedAt && (
              <span className="text-[9px] font-mono text-positive bg-positive/10 px-1.5 py-0.5 rounded">
                LIVE · {new Date(fetchedAt).toLocaleTimeString()}
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-3xl font-bold text-foreground">${price.toFixed(2)}</span>
            <span className={`font-mono text-sm ${up ? "text-positive" : "text-negative"}`}>
              {up ? "+" : ""}{changePct.toFixed(2)}% today
            </span>
          </div>
        </div>

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
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
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
