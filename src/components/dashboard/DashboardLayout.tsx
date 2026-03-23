import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  Star,
  Briefcase,
  CalendarDays,
  GitCompare,
  Search,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: TrendingUp, label: "Markets", path: "/markets" },
  { icon: Briefcase, label: "Portfolio", path: "/portfolio" },
  { icon: Star, label: "Watchlist", path: "/watchlist" },
  { icon: GitCompare, label: "Comparison", path: "/comparison" },
  { icon: CalendarDays, label: "Calendar", path: "/calendar" },
  { icon: BarChart3, label: "Stocks", path: "/stock/NVDA" },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { theme, toggle } = useTheme();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-background border-r border-border flex flex-col z-30 transition-all duration-300 ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        <div className="h-14 flex items-center px-5 border-b border-border">
          {!collapsed && (
            <span className="font-mono text-lg font-semibold tracking-tight text-foreground">
              MERIDIAN
            </span>
          )}
          {collapsed && (
            <span className="font-mono text-lg font-semibold text-foreground mx-auto">M</span>
          )}
        </div>

        <nav className="flex-1 py-4 space-y-0.5 px-3 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors relative group ${
                  active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r" />
                )}
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span className="font-sans">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Theme toggle + collapse */}
        <div className="border-t border-border">
          <button
            onClick={toggle}
            className="w-full h-10 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {!collapsed && <span className="text-xs font-sans">{theme === "dark" ? "Light mode" : "Dark mode"}</span>}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full h-10 flex items-center justify-center border-t border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className={`flex-1 min-w-0 transition-all duration-300 ${collapsed ? "ml-16" : "ml-60"}`}>
        {/* Top bar */}
        <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-3 bg-secondary rounded-md px-4 py-2 w-full max-w-md">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search tickers, companies…"
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full font-sans"
            />
            <kbd className="hidden sm:inline text-[10px] font-mono text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border">
              ⌘K
            </kbd>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-primary rounded-full" />
            </button>
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </header>

        <main className="p-6 max-w-[1400px]">
          {children}
        </main>
      </div>
    </div>
  );
}
