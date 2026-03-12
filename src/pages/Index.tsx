import { MarketIndicators } from "@/components/dashboard/MarketIndicators";
import { Watchlist } from "@/components/dashboard/Watchlist";
import { FeaturedStock } from "@/components/dashboard/FeaturedStock";
import { PortfolioOverview } from "@/components/dashboard/PortfolioOverview";
import { SectorPerformance } from "@/components/dashboard/SectorPerformance";
import { MarketNews } from "@/components/dashboard/MarketNews";
import { MarketSentiment } from "@/components/dashboard/MarketSentiment";
import { TopMovers } from "@/components/dashboard/TopMovers";

const Index = () => {
  return (
    <div className="space-y-6">
      <MarketIndicators />
      <FeaturedStock />
      <Watchlist />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PortfolioOverview />
        </div>
        <div className="space-y-6">
          <MarketSentiment />
          <TopMovers />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SectorPerformance />
        </div>
        <div className="lg:col-span-2">
          <MarketNews />
        </div>
      </div>

      <footer className="border-t border-border pt-6 pb-8 flex items-center justify-between text-xs font-sans text-muted-foreground">
        <span>Meridian · Live market data powered by Finnhub</span>
        <span className="font-mono">v2.0.0</span>
      </footer>
    </div>
  );
};

export default Index;
