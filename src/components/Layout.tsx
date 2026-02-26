import { Outlet, Link } from "react-router-dom";
import layoutConfig from "@/config/layout.json";

export function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono p-4 md:p-8 selection:bg-primary selection:text-primary-foreground">
      <div className="max-w-4xl mx-auto border border-border p-6 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.1)] flex flex-col">
        <header className="border-b border-border pb-4 mb-6">
          <div className="flex justify-between items-center gap-4">
            <Link
              to="/"
              className="text-2xl font-bold tracking-tighter hover:text-primary transition-colors font-mono"
            >
              <span className="text-primary mr-2">
                {layoutConfig.header.logo.prefix}
              </span>
              {layoutConfig.header.logo.text}
            </Link>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
            </div>
          </div>
          <nav className="mt-3 flex gap-3 text-xs md:text-sm justify-start md:justify-end">
            <Link to="/articles" className="hover:text-primary transition-colors">
              {layoutConfig.header.nav.articles}
            </Link>
            <Link to="/about" className="hover:text-primary transition-colors">
              {layoutConfig.header.nav.about}
            </Link>
          </nav>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <footer className="mt-8 pt-4 border-t border-border flex flex-col sm:flex-row gap-1 sm:gap-0 sm:justify-between sm:items-center text-[10px] sm:text-xs text-muted-foreground font-mono text-center sm:text-left">
          <span className="whitespace-nowrap">{layoutConfig.footer.left}</span>
          <span className="whitespace-nowrap">{layoutConfig.footer.right}</span>
        </footer>
      </div>
    </div>
  );
}
