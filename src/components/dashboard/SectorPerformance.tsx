import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const sectors = [
  { name: "Technology", value: 2.4 },
  { name: "Healthcare", value: 1.1 },
  { name: "Finance", value: 0.8 },
  { name: "Energy", value: -0.5 },
  { name: "Consumer", value: 1.3 },
  { name: "Industrial", value: -0.2 },
  { name: "Materials", value: 0.6 },
  { name: "Utilities", value: -0.9 },
];

export function SectorPerformance() {
  return (
    <section className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-sm font-sans font-medium text-muted-foreground uppercase tracking-wider mb-4">
        Sector Performance
      </h2>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sectors} layout="vertical" margin={{ left: 0 }}>
            <XAxis
              type="number"
              tick={{ fill: "hsl(218 14% 38%)", fontSize: 10, fontFamily: "IBM Plex Mono" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "hsl(218 14% 38%)", fontSize: 11, fontFamily: "Inter" }}
              axisLine={false}
              tickLine={false}
              width={80}
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
              formatter={(value: number) => [`${value}%`, "Change"]}
            />
            <Bar dataKey="value" radius={[0, 3, 3, 0]}>
              {sectors.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.value >= 0 ? "hsl(162 67% 48%)" : "hsl(354 72% 60%)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
