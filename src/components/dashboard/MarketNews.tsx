const news = [
  {
    headline: "Fed Signals Potential Rate Cuts in Coming Months",
    source: "Reuters",
    time: "2h ago",
    preview: "Federal Reserve officials hinted at possible interest rate reductions as inflation data shows signs of cooling toward the 2% target.",
  },
  {
    headline: "NVIDIA Surpasses $2T Market Cap on AI Demand",
    source: "Bloomberg",
    time: "4h ago",
    preview: "The chipmaker's valuation continues to climb as data center revenue surges, driven by unprecedented demand for AI training hardware.",
  },
  {
    headline: "Treasury Yields Rise on Strong Jobs Report",
    source: "WSJ",
    time: "6h ago",
    preview: "The 10-year yield climbed to 4.22% after the Labor Department reported 275,000 new jobs added in the latest monthly report.",
  },
  {
    headline: "European Markets Rally on ECB Policy Outlook",
    source: "Financial Times",
    time: "8h ago",
    preview: "European equities posted broad gains as investors grew more confident that the European Central Bank would begin easing monetary policy.",
  },
];

export function MarketNews() {
  return (
    <section>
      <h2 className="text-sm font-sans font-medium text-muted-foreground uppercase tracking-wider mb-4">
        Market News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.map((item, i) => (
          <article
            key={i}
            className="bg-card rounded-lg border border-border p-5 hover:border-primary/30 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-primary">{item.source}</span>
              <span className="text-xs font-sans text-muted-foreground">· {item.time}</span>
            </div>
            <h3 className="font-sans text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
              {item.headline}
            </h3>
            <p className="text-xs font-sans text-muted-foreground leading-relaxed line-clamp-2">
              {item.preview}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
