import { createFileRoute } from "@tanstack/react-router";
import { Brain, Mic, BarChart2, Map, Sparkles, Activity } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/intelligence")({
  head: () => ({ meta: [{ title: "Intelligence · MedJarvis" }] }),
  component: Intelligence,
});

function Intelligence() {
  const [tab, setTab] = useState<"symptom" | "risk" | "heatmap">("symptom");
  return (
    <div className="max-w-[1280px] mx-auto p-4 md:p-8 space-y-6">
      <div>
        <div className="text-xs uppercase tracking-wider text-primary font-semibold">AI & Community</div>
        <h1 className="font-serif text-4xl mt-1">Health Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-1">From symptom to risk to community signals.</p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: "var(--color-secondary)" }}>
        {[{v:"symptom",l:"Symptom Checker",i:Brain},{v:"risk",l:"Risk Score",i:BarChart2},{v:"heatmap",l:"Village Heatmap",i:Map}].map(t => (
          <button key={t.v} onClick={() => setTab(t.v as any)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ background: tab === t.v ? "var(--color-card)" : "transparent" }}>
            <t.i size={14} /> {t.l}
          </button>
        ))}
      </div>

      {tab === "symptom" && <Symptom />}
      {tab === "risk" && <Risk />}
      {tab === "heatmap" && <Heatmap />}
    </div>
  );
}

function Symptom() {
  const [done, setDone] = useState(false);
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="glass rounded-2xl p-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider mb-6" style={{ background: "var(--color-primary-tint)", color: "var(--color-primary)" }}>
          <Activity size={10} /> Vitals included: SpO₂ 97% · HR 78 · 36.8°C
        </div>
        <button onClick={() => setDone(!done)} className="relative w-24 h-24 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform">
          <Mic size={32} />
          <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "var(--color-primary)", opacity: 0.3 }} />
        </button>
        <p className="mt-4 text-sm text-muted-foreground">{done ? "Analysing..." : "Tap to describe symptoms"}</p>
        <div className="mt-2 text-[11px] text-primary">Hindi detected</div>
      </div>
      {done && (
        <div className="glass rounded-2xl p-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ background: "var(--color-warning-tint)", color: "var(--color-warning)" }}>
            <Sparkles size={12} /> MEDIUM urgency — consult today
          </div>
          <h3 className="font-serif text-xl mb-3">Possible Conditions</h3>
          <div className="space-y-2 mb-5">
            {[{n:"Mild Dehydration",p:"Most Likely"},{n:"Heat Exhaustion",p:"Possible"},{n:"Viral Fever",p:"Less Likely"}].map(c => (
              <div key={c.n} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--color-card)" }}>
                <span className="text-sm font-medium">{c.n}</span>
                <span className="text-[10px] text-muted-foreground">{c.p}</span>
              </div>
            ))}
          </div>
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-2">Recommended Action</h4>
          <ol className="text-sm space-y-1.5 text-foreground/80 list-decimal list-inside">
            <li>Drink ORS solution every 15 minutes</li>
            <li>Rest in a cool, shaded area</li>
            <li>Visit clinic within 4 hours if no improvement</li>
          </ol>
          <p className="text-[10px] italic text-muted-foreground mt-4">AI suggestion to assist health workers. Not a diagnosis.</p>
        </div>
      )}
    </div>
  );
}

function Risk() {
  const [age] = useState(54);
  const [weight, setWeight] = useState(72);
  const [height, setHeight] = useState(160);
  const bmi = +(weight / Math.pow(height / 100, 2)).toFixed(1);
  const score = Math.min(100, Math.round(20 + Math.abs(bmi - 22) * 4 + (age - 30) * 0.8));

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <Slider label={`Weight: ${weight} kg`} value={weight} min={30} max={120} onChange={setWeight} />
        <Slider label={`Height: ${height} cm`} value={height} min={100} max={200} onChange={setHeight} />
        <div className="glass rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm">BMI</span>
          <span className="font-mono text-lg font-semibold text-primary">{bmi}</span>
        </div>
      </div>
      <div className="glass rounded-2xl p-8 flex flex-col items-center">
        <RiskGauge score={score} />
        <div className="mt-2 text-sm text-muted-foreground">Live Health Risk Score</div>
        <div className="grid grid-cols-2 gap-3 mt-6 w-full">
          <div className="text-center p-3 rounded-xl" style={{ background: "var(--color-warning-tint)" }}>
            <div className="text-[10px] uppercase text-warning">Diabetes (IDRS)</div>
            <div className="font-mono text-2xl text-warning">{Math.round(score * 0.6)}</div>
          </div>
          <div className="text-center p-3 rounded-xl" style={{ background: "var(--color-destructive-tint)" }}>
            <div className="text-[10px] uppercase text-destructive">Cardiac (10yr)</div>
            <div className="font-mono text-2xl text-destructive">{Math.round(score * 0.4)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, onChange }: any) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="text-sm font-medium mb-2">{label}</div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(+e.target.value)} className="w-full accent-primary" />
    </div>
  );
}

function RiskGauge({ score }: { score: number }) {
  const pct = score / 100;
  const angle = -90 + pct * 180;
  const color = pct < 0.4 ? "var(--color-success)" : pct < 0.7 ? "var(--color-warning)" : "var(--color-destructive)";
  return (
    <div className="relative w-[260px]">
      <svg viewBox="0 0 200 130" className="w-full">
        <defs>
          <linearGradient id="r-arc" x1="0" x2="1">
            <stop offset="0" stopColor="var(--color-success)" />
            <stop offset="0.5" stopColor="var(--color-warning)" />
            <stop offset="1" stopColor="var(--color-destructive)" />
          </linearGradient>
        </defs>
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--color-border)" strokeWidth="16" strokeLinecap="round" />
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#r-arc)" strokeWidth="16" strokeLinecap="round"
          strokeDasharray="251" strokeDashoffset={251 - 251 * pct} style={{ transition: "stroke-dashoffset 500ms ease-out" }} />
        <line x1="100" y1="100" x2="100" y2="35" stroke={color} strokeWidth="3.5" strokeLinecap="round"
          transform={`rotate(${angle} 100 100)`} style={{ transition: "transform 500ms ease-out" }} />
        <circle cx="100" cy="100" r="7" fill={color} />
      </svg>
      <div className="text-center -mt-8">
        <div className="font-serif text-5xl" style={{ color }}>{score}</div>
      </div>
    </div>
  );
}

function Heatmap() {
  const wards = [
    { x: 30, y: 25, r: 50, c: "var(--color-success)", n: "Ward 1" },
    { x: 60, y: 35, r: 60, c: "var(--color-warning)", n: "Ward 2" },
    { x: 45, y: 60, r: 70, c: "var(--color-destructive)", n: "Ward 3" },
    { x: 75, y: 70, r: 55, c: "var(--color-success)", n: "Ward 4" },
  ];
  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
      <div className="glass rounded-2xl p-6 aspect-video relative overflow-hidden" style={{ background: "var(--color-background-secondary)" }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {wards.map((w, i) => (
            <g key={i}>
              <circle cx={w.x} cy={w.y} r={w.r / 8} fill={w.c} opacity="0.4" />
              <circle cx={w.x} cy={w.y} r="1.5" fill={w.c}>
                <animate attributeName="r" values="1.5;3;1.5" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x={w.x} y={w.y + 12} fontSize="3" textAnchor="middle" fill="currentColor" opacity="0.6">{w.n}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="space-y-3">
        <div className="glass rounded-2xl p-5">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Ward 3 Overview</div>
          <h3 className="font-serif text-2xl mt-1">Wadgaon · Ward 3</h3>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <Stat l="Patients" v="142" />
            <Stat l="Alerts" v="7" c="warning" />
            <Stat l="Cluster" v="Yes" c="destructive" />
          </div>
        </div>
        <div className="rounded-2xl p-5" style={{ background: "var(--color-destructive-tint)", borderLeft: "3px solid var(--color-destructive)" }}>
          <div className="text-xs font-semibold uppercase tracking-wider text-destructive mb-1">Possible Cluster</div>
          <p className="text-sm">7 patients reporting fever + diarrhoea in 48 hours.</p>
          <button className="mt-3 px-3 py-1.5 rounded-lg bg-destructive text-destructive-foreground text-xs font-semibold">Confirm & Alert</button>
        </div>
      </div>
    </div>
  );
}

function Stat({ l, v, c = "primary" }: any) {
  return (
    <div>
      <div className="font-mono text-xl font-semibold" style={{ color: `var(--color-${c})` }}>{v}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
    </div>
  );
}
