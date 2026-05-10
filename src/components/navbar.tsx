import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, LayoutDashboard, Users, Activity, FileText, Bell, Brain, Menu, X, LogIn } from "lucide-react";
import { useState } from "react";
import { DarkModeToggle } from "./dark-mode-toggle";
import { OfflineIndicator } from "./offline-indicator";
import { LanguageSelector } from "./language-selector";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/patients", label: "Patients", icon: Users },
  { to: "/vitals", label: "Vitals", icon: Activity },
  { to: "/prescriptions", label: "Prescriptions", icon: FileText },
  { to: "/emergency", label: "Emergency", icon: Bell },
  { to: "/intelligence", label: "Intelligence", icon: Brain },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isLanding = path === "/" || path === "/login";

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-40 h-16 glass-strong" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="h-full max-w-[1400px] mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Heart size={18} strokeWidth={2} className="text-warm" fill="currentColor" />
              <span className="absolute inset-0 animate-pulse-soft" style={{ filter: "blur(8px)", background: "var(--color-warm)", borderRadius: "50%", opacity: 0.3 }} />
            </div>
            <div className="leading-tight">
              <div className="font-serif text-[22px] text-primary">MedJarvis</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground -mt-0.5">Rural Health Intelligence</div>
            </div>
          </Link>

          {!isLanding && (
            <nav className="hidden lg:flex items-center gap-1">
              {NAV.map((n) => {
                const active = path.startsWith(n.to);
                return (
                  <Link key={n.to} to={n.to}
                    className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all hover:bg-secondary"
                    style={{ color: active ? "var(--color-primary)" : "var(--color-foreground)" }}>
                    <n.icon size={16} strokeWidth={1.8} />
                    {n.label}
                    {active && <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" />}
                  </Link>
                );
              })}
            </nav>
          )}

          <div className="flex items-center gap-2">
            {!isLanding && <div className="hidden md:block"><OfflineIndicator /></div>}
            <div className="hidden md:block"><LanguageSelector /></div>
            <DarkModeToggle />
            {isLanding ? (
              <Link to="/login" className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary-hover transition-colors">
                <LogIn size={16} strokeWidth={1.8} />
                Sign In
              </Link>
            ) : (
              <button onClick={() => setOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-secondary">
                <Menu size={20} strokeWidth={1.8} />
              </button>
            )}
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 glass-strong p-6 animate-fade-up">
            <div className="flex items-center justify-between mb-8">
              <div className="font-serif text-xl text-primary">MedJarvis</div>
              <button onClick={() => setOpen(false)}><X size={20} /></button>
            </div>
            <nav className="space-y-1">
              {NAV.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-secondary text-sm font-medium">
                  <n.icon size={18} strokeWidth={1.8} />
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
              <LanguageSelector />
              <OfflineIndicator />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
