export function MarketSentiment() {
  const sentiment = 68; // 0-100, 50 = neutral

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-sm font-sans font-medium text-muted-foreground uppercase tracking-wider mb-4">
        Market Sentiment
      </h2>
      <div className="flex items-center gap-4 mb-3">
        <div className="font-mono text-3xl font-bold text-foreground">{sentiment}</div>
        <div className="text-sm font-sans text-positive font-medium">Greed</div>
      </div>
      {/* Sentiment bar */}
      <div className="h-2 rounded-full bg-secondary overflow-hidden mb-3">
        <div
          className="h-full rounded-full bg-positive transition-all duration-500"
          style={{ width: `${sentiment}%` }}
        />
      </div>
      <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
        <span>Extreme Fear</span>
        <span>Neutral</span>
        <span>Extreme Greed</span>
      </div>
    </div>
  );
}
