import { Search, Bell, User } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Search */}
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

      {/* Right side */}
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
  );
}
