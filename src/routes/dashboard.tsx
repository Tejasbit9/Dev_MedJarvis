import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, Users, Activity, FileText, Pill, Bell, Brain, Settings,
  Watch, Heart, Droplets, Thermometer, ChevronDown, ChevronRight,
  AlertTriangle, Sun, Zap, Dumbbell, Waves, Shield,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · MedJarvis" }] }),
  component: Dashboard,
});

const SIDE = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/patients", label: "Patients", icon: Users },
  { to: "/vitals", label: "Vitals Monitor", icon: Activity },
  { to: "/prescriptions", label: "Prescriptions", icon: FileText },
  { to: "/drug-checker", label: "Drug Checker", icon: Pill },
  { to: "/emergency", label: "Emergency", icon: Bell },
  { to: "/intelligence", label: "Intelligence", icon: Brain },
  { to: "/settings", label: "Settings", icon: Settings },
];

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className={`hidden md:flex flex-col transition-all duration-300 sticky top-16 h-[calc(100vh-64px)]`}
        style={{ width: collapsed ? 64 : 240, borderRight: "1px solid var(--color-border)", background: "var(--color-card)" }}>
        <nav className="flex-1 p-3 space-y-1">
          {SIDE.map((s) => {
            const active = path === s.to;
            return (
              <Link key={s.to} to={s.to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: active ? "var(--color-primary)" : "transparent",
                  color: active ? "var(--color-primary-foreground)" : "var(--color-foreground)",
                }}>
                <s.icon size={18} strokeWidth={1.8} />
                {!collapsed && <span>{s.label}</span>}
              </Link>
            );
          })}
        </nav>
        <button onClick={() => setCollapsed(!collapsed)}
          className="m-3 p-2 rounded-lg hover:bg-secondary text-xs text-muted-foreground flex items-center justify-center gap-1.5">
          <ChevronRight size={14} className={`transition-transform ${collapsed ? "" : "rotate-180"}`} />
          {!collapsed && "Collapse"}
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 p-4 md:p-8 space-y-6 max-w-full overflow-x-hidden">
        {/* Context mode banner */}
        <div className="flex items-center justify-between gap-4 px-5 py-3 rounded-2xl"
          style={{ background: "var(--color-primary-tint)", border: "1px solid var(--color-primary)" }}>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <div>
              <div className="text-[10px] uppercase tracking-wider text-primary font-semibold">Resting Mode</div>
              <div className="text-sm">Vitals monitoring active · Personal baselines applied</div>
            </div>
          </div>
          <button className="text-xs flex items-center gap-1 text-primary font-medium hover:underline">
            Change Mode <ChevronDown size={12} />
          </button>
        </div>

        {/* Wristband card */}
        <div className="glass-strong rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "var(--color-success-tint)" }}>
              <Watch size={22} className="text-success" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-success">
                <span className="absolute inset-0 rounded-full bg-success animate-ping opacity-75" />
              </span>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Wristband Connected</div>
              <div className="font-semibold">Sunita Patil <span className="font-mono text-xs text-muted-foreground">· MJ-2025-WD-00142</span></div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-hover transition-colors hover:shadow-warm">
            <Heart size={16} /> Take Reading
          </button>
        </div>

        {/* Vitals row */}
        <div className="grid md:grid-cols-3 gap-4">
          <VitalsCard icon={Droplets} label="Blood Oxygen" value="98" unit="%" status="normal" baseline="Your normal: 97–98%" />
          <VitalsCard icon={Heart} label="Heart Rate" value="72" unit="bpm" status="normal" baseline="Your normal: 68–80 bpm" pulse waveform />
          <VitalsCard icon={Thermometer} label="Temperature" value="36.8" unit="°C" status="normal" baseline="Your normal: 36.5–37.0°C" />
        </div>

        {/* PPG full waveform */}
        <div className="rounded-2xl p-5" style={{ background: "#0D1117", color: "#3FB27A" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Activity size={16} /> Live PPG Waveform
            </div>
            <button className="text-xs px-3 py-1.5 rounded-lg" style={{ background: "rgba(63,178,122,0.15)", color: "#52D99B" }}>Record Snapshot</button>
          </div>
          <FullPPG />
          <div className="flex justify-between text-[10px] mt-2 font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
            <span>-60s</span><span>-30s</span><span>now</span>
          </div>
        </div>

        {/* Condition detectors */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Condition Detectors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: Sun, name: "Heatstroke", status: "watching" },
              { icon: Zap, name: "Seizure", status: "watching" },
              { icon: Activity, name: "Presyncope", status: "alert" },
              { icon: Brain, name: "Panic", status: "watching" },
              { icon: Dumbbell, name: "Overexertion", status: "watching" },
              { icon: Waves, name: "Tremor", status: "suppressed" },
            ].map((c) => <ConditionCard key={c.name} {...c} />)}
          </div>
        </div>

        {/* BP gauge */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="glass rounded-2xl p-6 md:col-span-1">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-4">Estimated Blood Pressure</div>
            <BPGauge systolic={118} diastolic={76} />
            <p className="text-[10px] text-muted-foreground italic mt-3 text-center">Trend monitoring only · Not a diagnostic device</p>
          </div>
          <div className="glass rounded-2xl p-6 md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Recent Activity</div>
                <h3 className="font-serif text-xl mt-1">Today's Patients</h3>
              </div>
              <Link to="/patients" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                View all <ChevronRight size={12} />
              </Link>
            </div>
            <div className="space-y-2">
              {[
                { name: "Raju Thorat", id: "MJ-2025-WD-00128", vitals: "98% · 72bpm · 36.8°C", time: "12 min ago", tone: "success" },
                { name: "Meena Devi", id: "MJ-2025-WD-00131", vitals: "94% · 88bpm · 37.1°C", time: "28 min ago", tone: "warning" },
                { name: "Ramesh Kumar", id: "MJ-2025-WD-00134", vitals: "97% · 70bpm · 36.7°C", time: "1 hr ago", tone: "success" },
              ].map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-secondary transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0"
                      style={{ background: "var(--color-primary-tint)", color: "var(--color-primary)" }}>
                      {p.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate">{p.name}</div>
                      <div className="text-[11px] font-mono text-muted-foreground">{p.id}</div>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-mono">{p.vitals}</div>
                    <div className="text-[10px] text-muted-foreground">{p.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function VitalsCard({ icon: Icon, label, value, unit, status, baseline, pulse, waveform }: any) {
  const tones: any = {
    normal: { bg: "var(--color-success-tint)", color: "var(--color-success)", text: "Normal" },
    warning: { bg: "var(--color-warning-tint)", color: "var(--color-warning)", text: "Low" },
    critical: { bg: "var(--color-destructive-tint)", color: "var(--color-destructive)", text: "Critical" },
  };
  const t = tones[status];
  return (
    <div className="glass rounded-2xl p-5" style={{ borderTop: `3px solid ${t.color}` }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <Icon size={14} className={pulse ? "animate-pulse-soft text-warm" : "text-primary"} /> {label}
        </div>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: t.bg, color: t.color }}>
          {t.text}
        </span>
      </div>
      <div className="font-mono font-medium leading-none flex items-baseline gap-1">
        <span className="text-5xl">{value}</span>
        <span className="text-base text-muted-foreground">{unit}</span>
      </div>
      {waveform && (
        <svg viewBox="0 0 200 30" className="w-full h-8 mt-3">
          <path d="M0 15 L40 15 L48 8 L56 22 L64 3 L72 27 L80 15 L130 15 L138 10 L146 20 L154 5 L162 25 L170 15 L200 15"
            fill="none" stroke="var(--color-warm)" strokeWidth="1.5" />
        </svg>
      )}
      <div className="text-[11px] text-muted-foreground mt-3 pt-3" style={{ borderTop: "1px dashed var(--color-border)" }}>
        {baseline}
      </div>
    </div>
  );
}

function ConditionCard({ icon: Icon, name, status }: any) {
  const tones: any = {
    watching: { bg: "var(--color-success-tint)", color: "var(--color-success)", label: "Watching" },
    alert: { bg: "var(--color-destructive-tint)", color: "var(--color-destructive)", label: "Alert!" },
    suppressed: { bg: "var(--color-muted)", color: "var(--color-muted-foreground)", label: "Suppressed" },
  };
  const t = tones[status];
  return (
    <div className="glass rounded-xl p-3" style={{ borderLeft: `3px solid ${t.color}` }}>
      <div className="flex items-center justify-between mb-2">
        <Icon size={16} strokeWidth={1.6} style={{ color: t.color }} className={status === "alert" ? "animate-pulse-soft" : ""} />
        <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded" style={{ background: t.bg, color: t.color }}>
          {t.label}
        </span>
      </div>
      <div className="text-xs font-medium">{name}</div>
    </div>
  );
}

function FullPPG() {
  // Generate a longer PPG-like path
  const points: string[] = [];
  for (let i = 0; i < 60; i++) {
    const x = i * 20;
    const beatPhase = i % 6;
    const y = beatPhase === 1 ? 25 : beatPhase === 2 ? 60 : beatPhase === 3 ? 5 : beatPhase === 4 ? 75 : 40;
    points.push(`${i === 0 ? "M" : "L"} ${x} ${y}`);
  }
  return (
    <svg viewBox="0 0 1200 80" className="w-full h-24">
      <defs>
        <linearGradient id="ppg-grad" x1="0" x2="1">
          <stop offset="0" stopColor="rgba(63,178,122,0)" />
          <stop offset="0.2" stopColor="rgba(63,178,122,1)" />
          <stop offset="1" stopColor="rgba(82,217,155,1)" />
        </linearGradient>
      </defs>
      <path d={points.join(" ")} fill="none" stroke="url(#ppg-grad)" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function BPGauge({ systolic, diastolic }: { systolic: number; diastolic: number }) {
  // Arc gauge
  const pct = Math.min(1, Math.max(0, (systolic - 80) / (180 - 80)));
  const angle = -90 + pct * 180;
  const color = pct < 0.4 ? "var(--color-success)" : pct < 0.7 ? "var(--color-warning)" : "var(--color-destructive)";
  return (
    <div className="relative w-full max-w-[220px] mx-auto">
      <svg viewBox="0 0 200 120" className="w-full">
        <defs>
          <linearGradient id="bp-arc" x1="0" x2="1">
            <stop offset="0" stopColor="var(--color-success)" />
            <stop offset="0.5" stopColor="var(--color-warning)" />
            <stop offset="1" stopColor="var(--color-destructive)" />
          </linearGradient>
        </defs>
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--color-border)" strokeWidth="14" strokeLinecap="round" />
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#bp-arc)" strokeWidth="14" strokeLinecap="round"
          strokeDasharray="251" strokeDashoffset={251 - 251 * pct} style={{ transition: "stroke-dashoffset 600ms ease-out" }} />
        <line x1="100" y1="100" x2="100" y2="40" stroke={color} strokeWidth="3" strokeLinecap="round"
          transform={`rotate(${angle} 100 100)`} style={{ transition: "transform 600ms ease-out" }} />
        <circle cx="100" cy="100" r="6" fill={color} />
      </svg>
      <div className="text-center -mt-6">
        <div className="font-mono text-3xl font-medium">{systolic}/{diastolic}</div>
        <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">mmHg · Systolic / Diastolic</div>
      </div>
    </div>
  );
}
