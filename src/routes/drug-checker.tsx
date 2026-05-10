import { createFileRoute } from "@tanstack/react-router";
import { Pill, X, Plus, AlertTriangle, CheckCircle, XCircle, RefreshCw, Mic } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/drug-checker")({
  head: () => ({ meta: [{ title: "Drug Interaction Checker · MedJarvis" }] }),
  component: Checker,
});

function Checker() {
  const [meds, setMeds] = useState(["Metformin 500mg", "Amlodipine 5mg", "Atorvastatin 10mg"]);
  const [input, setInput] = useState("");

  const add = () => {
    if (input.trim()) { setMeds([...meds, input.trim()]); setInput(""); }
  };

  return (
    <div className="max-w-[1280px] mx-auto p-4 md:p-8 space-y-6">
      <div>
        <div className="text-xs uppercase tracking-wider text-primary font-semibold">Safety</div>
        <h1 className="font-serif text-4xl mt-1">Drug Interaction Checker</h1>
        <p className="text-sm text-muted-foreground mt-1">Zero dangerous prescriptions. Every medicine, checked.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Pill size={16} className="text-primary" /> Current Medications</h3>
          <div className="flex flex-wrap gap-2">
            {meds.map((m, i) => (
              <span key={i} className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full text-sm" style={{ background: "var(--color-primary-tint)", color: "var(--color-primary)" }}>
                {m}
                <button onClick={() => setMeds(meds.filter((_, j) => j !== i))}><X size={12} /></button>
              </span>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ border: "1px solid var(--color-border)", background: "var(--color-card)" }}>
              <Pill size={16} className="text-muted-foreground" />
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="Add medicine to check..." className="flex-1 bg-transparent outline-none text-sm" />
              <button className="text-primary"><Mic size={14} /></button>
            </div>
            <button onClick={add} className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium"><Plus size={16} /></button>
          </div>
        </div>

        <div className="space-y-3">
          <Severity level="major" title="MAJOR INTERACTION" desc="Combining Atorvastatin with Erythromycin can significantly increase muscle damage risk (rhabdomyolysis)." action="Do not proceed without doctor instruction." />
          <Severity level="moderate" title="Moderate Interaction" desc="Amlodipine + Simvastatin: simvastatin levels may rise. Consider lower dose." action="Inform Doctor" />
          <Severity level="minor" title="Minor Interaction Detected" desc="Metformin + Vitamin B12: long-term use may reduce B12 absorption." action="Proceed — log in notes." />
        </div>
      </div>

      <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Drug database last updated: <span className="font-medium text-foreground">May 5, 2026</span></span>
        <button className="flex items-center gap-1.5 text-primary font-medium"><RefreshCw size={12} /> Check for updates</button>
      </div>
    </div>
  );
}

function Severity({ level, title, desc, action }: any) {
  const map: any = {
    minor: { bg: "var(--color-success-tint)", color: "var(--color-success)", icon: CheckCircle },
    moderate: { bg: "var(--color-warning-tint)", color: "var(--color-warning)", icon: AlertTriangle },
    major: { bg: "var(--color-destructive-tint)", color: "var(--color-destructive)", icon: XCircle },
  };
  const t = map[level];
  return (
    <div className="rounded-2xl p-5" style={{ background: t.bg, borderLeft: `4px solid ${t.color}` }}>
      <div className="flex items-start gap-3">
        <t.icon size={22} style={{ color: t.color }} className="flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="font-semibold" style={{ color: t.color }}>{title}</div>
          <p className="text-sm mt-1 text-foreground/80">{desc}</p>
          <button className="mt-3 text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ background: t.color, color: "#fff" }}>{action}</button>
        </div>
      </div>
    </div>
  );
}
