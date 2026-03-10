import { useState } from "react";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { TopBar } from "@/components/dashboard/TopBar";
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
    <div className="min-h-screen bg-background flex">
      <AppSidebar />

      {/* Main area — offset by sidebar */}
      <div className="flex-1 ml-60 min-w-0">
        <TopBar />

        <main className="p-6 space-y-6 max-w-[1400px]">
          {/* Market indicators hero */}
          <MarketIndicators />

          {/* Featured stock — spans full width */}
          <FeaturedStock />

          {/* Watchlist */}
          <Watchlist />

          {/* Two-column row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PortfolioOverview />
            </div>
            <div className="space-y-6">
              <MarketSentiment />
              <TopMovers />
            </div>
          </div>

          {/* Sector + News */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <SectorPerformance />
            </div>
            <div className="lg:col-span-2">
              <MarketNews />
            </div>
          </div>

          {/* Footer */}
          <footer className="border-t border-border pt-6 pb-8 flex items-center justify-between text-xs font-sans text-muted-foreground">
            <span>Meridian · Market data is simulated for educational purposes</span>
            <span className="font-mono">v1.0.0</span>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
