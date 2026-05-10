import { createFileRoute } from "@tanstack/react-router";
import { FileText, Pill, Clock, AlertTriangle, CheckCircle, Mic, PlayCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/prescriptions")({
  head: () => ({ meta: [{ title: "Prescriptions · MedJarvis" }] }),
  component: Prescriptions,
});

const RX = [
  { med: "Metformin 500mg", dosage: "1 tablet", freq: "Twice daily after meals", doc: "Dr. Patel", date: "Apr 28, 2026", status: "active" },
  { med: "Amlodipine 5mg", dosage: "1 tablet", freq: "Once at night", doc: "Dr. Patel", date: "Apr 28, 2026", status: "active", warn: "Monitor with grapefruit" },
  { med: "Atorvastatin 10mg", dosage: "1 tablet", freq: "Once at night", doc: "Dr. Sharma", date: "Mar 10, 2026", status: "suspended" },
  { med: "Paracetamol 650mg", dosage: "1 tablet", freq: "As needed for fever", doc: "Dr. Patel", date: "Feb 15, 2026", status: "completed" },
];

function Prescriptions() {
  const [tab, setTab] = useState<"timeline" | "consultation">("timeline");

  return (
    <div className="max-w-[1280px] mx-auto p-4 md:p-8 space-y-6">
      <div>
        <div className="text-xs uppercase tracking-wider text-primary font-semibold">Patient Records</div>
        <h1 className="font-serif text-4xl mt-1">Prescriptions</h1>
        <p className="text-sm text-muted-foreground mt-1">Sunita Patil · MJ-2025-WD-00142</p>
      </div>

      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: "var(--color-secondary)" }}>
        {[{v:"timeline",l:"Timeline"},{v:"consultation",l:"Live Consultation"}].map(t => (
          <button key={t.v} onClick={() => setTab(t.v as any)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ background: tab === t.v ? "var(--color-card)" : "transparent" }}>{t.l}</button>
        ))}
      </div>

      {tab === "timeline" ? <Timeline /> : <Consultation />}
    </div>
  );
}

function Timeline() {
  return (
    <div className="relative pl-8">
      <div className="absolute left-3 top-0 bottom-0 w-px" style={{ background: "var(--color-border)" }} />
      <div className="space-y-4">
        {RX.map((r) => {
          const colors: any = {
            active: "var(--color-primary)",
            suspended: "var(--color-warning)",
            completed: "var(--color-muted-foreground)",
          };
          const c = colors[r.status];
          return (
            <div key={r.med} className="relative">
              <div className="absolute -left-[22px] top-5 w-3 h-3 rounded-full" style={{ background: c, boxShadow: "0 0 0 4px var(--color-background)" }} />
              <div className="glass rounded-2xl p-5" style={{ borderLeft: `3px solid ${c}` }}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <Pill size={16} className="text-primary" />
                      <span className="font-semibold">{r.med}</span>
                      {r.warn && <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full" style={{ background: "var(--color-warning-tint)", color: "var(--color-warning)" }}><AlertTriangle size={10} /> {r.warn}</span>}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{r.dosage} · {r.freq}</div>
                  </div>
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full" style={{ background: `color-mix(in oklab, ${c} 14%, transparent)`, color: c }}>{r.status}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3 pt-3" style={{ borderTop: "1px dashed var(--color-border)" }}>
                  <span>{r.doc}</span> · <span>{r.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Consultation() {
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 text-sm font-medium mb-3"><Mic size={14} className="text-warm animate-pulse-soft" /> Doctor's Speech</div>
        <div className="text-sm leading-relaxed space-y-2">
          <p>Patient has elevated blood pressure...</p>
          <p>Prescribe <span className="bg-gold-tint px-1 rounded text-warning font-medium">Amlodipine 5 milligrams</span></p>
          <p>One tablet at night for 30 days.</p>
          <p className="text-warning italic text-xs">[low confidence] verify dosage</p>
        </div>
      </div>
      <div className="glass rounded-2xl p-5">
        <div className="text-sm font-semibold mb-3">Auto-Extracted Prescription</div>
        <div className="space-y-3 text-sm">
          {[
            { l: "Medicine", v: "Amlodipine 5mg" },
            { l: "Dosage", v: "1 tablet" },
            { l: "Frequency", v: "Once daily, at night" },
            { l: "Duration", v: "30 days", warn: true },
          ].map(f => (
            <div key={f.l} className="flex items-center justify-between p-2 rounded-lg" style={{ background: "var(--color-card)", borderLeft: f.warn ? "3px solid var(--color-warning)" : "3px solid transparent" }}>
              <div><div className="text-[10px] uppercase text-muted-foreground">{f.l}</div><div className="font-medium">{f.v}</div></div>
            </div>
          ))}
        </div>
      </div>
      <div className="glass rounded-2xl p-5">
        <div className="text-sm font-semibold mb-3">Confirm to Save</div>
        <div className="p-3 rounded-lg flex items-center justify-between" style={{ background: "var(--color-card)" }}>
          <div className="text-sm">Amlodipine 5mg</div>
          <button className="text-success"><CheckCircle size={20} /></button>
        </div>
        <button className="w-full mt-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">Save All Confirmed</button>
      </div>
    </div>
  );
}
