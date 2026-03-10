import { useState } from "react";
import {
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  Star,
  Briefcase,
  Newspaper,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: TrendingUp, label: "Markets" },
  { icon: BarChart3, label: "Stocks" },
  { icon: Star, label: "Watchlist" },
  { icon: Briefcase, label: "Portfolio" },
  { icon: Newspaper, label: "News" },
  { icon: Settings, label: "Settings" },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-background border-r border-border flex flex-col z-30 transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-border">
        {!collapsed && (
          <span className="font-mono text-lg font-semibold tracking-tight text-foreground">
            MERIDIAN
          </span>
        )}
        {collapsed && (
          <span className="font-mono text-lg font-semibold text-foreground mx-auto">M</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 space-y-1 px-3">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors relative group ${
              item.active
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            }`}
          >
            {item.active && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r" />
            )}
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="font-sans">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-12 flex items-center justify-center border-t border-border text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
}
