import { Outlet, Link } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono p-4 md:p-8 selection:bg-primary selection:text-primary-foreground">
      <div className="max-w-4xl mx-auto border border-border p-6 rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.1)] flex flex-col">
        <header className="flex justify-between items-center border-b border-border pb-4 mb-6">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tighter hover:text-primary transition-colors font-mono"
          >
            <span className="text-primary mr-2">█</span>
            WALLACE_BLOG
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex gap-4 text-sm">
              <Link
                to="/articles"
                className="hover:text-primary transition-colors"
              >
                [ARTICLES]
              </Link>
              <Link
                to="/about"
                className="hover:text-primary transition-colors"
              >
                [ABOUT]
              </Link>
            </nav>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <footer className="mt-8 pt-4 border-t border-border flex justify-between items-center text-xs text-muted-foreground font-mono">
          <span>SYSTEM_ID: W-NEXUS-v2.0</span>
          <span>// SECURE_CONNECTION</span>
        </footer>
      </div>
    </div>
  );
}
