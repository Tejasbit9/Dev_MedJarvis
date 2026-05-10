import { createFileRoute } from "@tanstack/react-router";
import { Activity, Heart, Droplets, Thermometer, Calendar } from "lucide-react";

export const Route = createFileRoute("/vitals")({
  head: () => ({ meta: [{ title: "Vitals Monitor · MedJarvis" }] }),
  component: Vitals,
});

function Vitals() {
  // Generate sample data
  const points = Array.from({ length: 30 }, (_, i) => ({
    spo2: 96 + Math.sin(i * 0.4) * 2 + Math.random(),
    hr: 72 + Math.sin(i * 0.6) * 8 + Math.random() * 3,
    temp: 36.7 + Math.sin(i * 0.3) * 0.4 + Math.random() * 0.1,
  }));

  return (
    <div className="max-w-[1280px] mx-auto p-4 md:p-8 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-primary font-semibold">Live Sensor Stream</div>
          <h1 className="font-serif text-4xl mt-1">Vitals Monitor</h1>
          <p className="text-sm text-muted-foreground mt-1">Sunita Patil · MJ-2025-WD-00142 · last 30 minutes</p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--color-secondary)" }}>
          {["7 days", "30 days", "All time"].map((t, i) => (
            <button key={t} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: i === 0 ? "var(--color-card)" : "transparent" }}>
              <Calendar size={12} className="inline mr-1" /> {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <BigStat icon={Droplets} label="Avg SpO₂" value="97.2" unit="%" color="success" />
        <BigStat icon={Heart} label="Avg Heart Rate" value="74" unit="bpm" color="warm" />
        <BigStat icon={Thermometer} label="Avg Temperature" value="36.8" unit="°C" color="primary" />
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-xl">Trends</h3>
          <div className="flex gap-3 text-xs">
            <Legend color="var(--color-success)" label="SpO₂" />
            <Legend color="var(--color-warm)" label="Heart Rate" />
            <Legend color="var(--color-primary)" label="Temp" />
          </div>
        </div>
        <TrendChart points={points} />
        <div className="text-[11px] text-muted-foreground mt-3 text-center">Personal baseline shown as a shaded band</div>
      </div>
    </div>
  );
}

function BigStat({ icon: Icon, label, value, unit, color }: any) {
  const c = `var(--color-${color})`;
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-medium">
        <Icon size={14} style={{ color: c }} /> {label}
      </div>
      <div className="font-mono text-4xl font-medium mt-2" style={{ color: c }}>
        {value}<span className="text-base text-muted-foreground ml-1">{unit}</span>
      </div>
    </div>
  );
}

function Legend({ color, label }: any) {
  return <div className="flex items-center gap-1.5"><span className="w-3 h-0.5" style={{ background: color }} />{label}</div>;
}

function TrendChart({ points }: any) {
  const w = 800, h = 200;
  const path = (key: string, scale: number, offset: number) =>
    points.map((p: any, i: number) => `${i === 0 ? "M" : "L"} ${(i / (points.length - 1)) * w} ${h - (p[key] - offset) * scale}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-56">
      <rect x="0" y="40" width={w} height="60" fill="var(--color-primary-tint)" opacity="0.3" />
      <path d={path("spo2", 4, 90)} fill="none" stroke="var(--color-success)" strokeWidth="2" />
      <path d={path("hr", 1.2, 50)} fill="none" stroke="var(--color-warm)" strokeWidth="2" />
      <path d={path("temp", 80, 35.5)} fill="none" stroke="var(--color-primary)" strokeWidth="2" />
    </svg>
  );
}
