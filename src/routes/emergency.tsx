import { createFileRoute } from "@tanstack/react-router";
import { Bell, MapPin, Phone, Truck, User, Users, PlayCircle, Shield, CheckCircle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/emergency")({
  head: () => ({ meta: [{ title: "Emergency · MedJarvis" }] }),
  component: Emergency,
});

const HISTORY = [
  { type: "Fall Detected", patient: "Ramesh Kumar", time: "2 hr ago", severity: "high", resolved: "Resolved · 4 min response" },
  { type: "SpO₂ Drop", patient: "Meena Devi", time: "5 hr ago", severity: "medium", resolved: "Resolved · 12 min response" },
  { type: "Heatstroke Warning", patient: "Lakshmi Bai", time: "Yesterday", severity: "medium", resolved: "Resolved · false alarm" },
];

function Emergency() {
  const [active, setActive] = useState(false);

  if (active) return <ActiveEmergency onResolve={() => setActive(false)} />;

  return (
    <div className="max-w-[1280px] mx-auto p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-primary font-semibold">Alerts & Routing</div>
          <h1 className="font-serif text-4xl mt-1">Emergency</h1>
          <p className="text-sm text-muted-foreground mt-1">No active emergencies · 3 resolved today</p>
        </div>
        <button onClick={() => setActive(true)} className="px-4 py-2.5 rounded-xl bg-destructive text-destructive-foreground font-semibold text-sm">
          Simulate Emergency
        </button>
      </div>

      <div className="glass rounded-2xl p-6 text-center" style={{ background: "var(--color-success-tint)" }}>
        <Shield size={32} className="text-success mx-auto mb-2" />
        <div className="font-serif text-2xl text-success">All Clear</div>
        <p className="text-sm text-muted-foreground mt-1">All monitored patients are stable.</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Recent History</h3>
        <div className="space-y-2">
          {HISTORY.map((h, i) => {
            const c = h.severity === "high" ? "var(--color-destructive)" : "var(--color-warning)";
            return (
              <div key={i} className="glass rounded-xl p-4 flex items-center justify-between gap-3 flex-wrap" style={{ borderLeft: `3px solid ${c}` }}>
                <div className="flex items-center gap-3">
                  <Bell size={18} style={{ color: c }} />
                  <div>
                    <div className="font-medium text-sm">{h.type}</div>
                    <div className="text-xs text-muted-foreground">{h.patient} · {h.time}</div>
                  </div>
                </div>
                <div className="text-xs flex items-center gap-1 text-success"><CheckCircle size={12} />{h.resolved}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ActiveEmergency({ onResolve }: { onResolve: () => void }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center p-4" style={{ background: "rgba(192, 57, 43, 0.92)" }}>
      <div className="max-w-2xl w-full glass-strong rounded-3xl p-8 animate-scale-in">
        <div className="flex items-center gap-3 mb-1">
          <Bell size={24} className="text-destructive animate-pulse-soft" />
          <span className="text-xs uppercase tracking-wider font-semibold text-destructive">High Severity</span>
        </div>
        <h2 className="font-serif text-4xl text-destructive">Seizure Detected</h2>
        <div className="mt-2 text-sm">Sunita Patil · <span className="font-mono">MJ-2025-WD-00142</span></div>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin size={12} /> 18.5204° N, 73.8567° E · <a className="text-primary underline">Open in Maps</a></div>

        <div className="mt-5 grid grid-cols-3 gap-2 text-xs">
          {[{l:"SpO₂",v:"89%"},{l:"HR",v:"118 bpm"},{l:"Temp",v:"37.4°C"}].map(s => (
            <div key={s.l} className="rounded-lg p-2 text-center" style={{ background: "var(--color-destructive-tint)", color: "var(--color-destructive)" }}>
              <div className="text-[10px] uppercase">{s.l}</div>
              <div className="font-mono text-lg font-semibold">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-2">
          <Routing icon={Users} label="Family · Ravi (son)" status="ok" detail="SMS sent · Calling..." />
          <Routing icon={User} label="ASHA · Sangeeta" status="ok" detail="Notified at 14:32" />
          <Routing icon={Truck} label="Ambulance 108" status="alert" detail="ETA 22 min" />
        </div>

        <div className="mt-6 p-4 rounded-xl" style={{ background: "var(--color-warning-tint)" }}>
          <div className="text-xs uppercase tracking-wider font-semibold text-warning mb-2">First Aid · Step 2 of 5</div>
          <div className="font-medium">Turn the patient onto their side. Do not restrain.</div>
          <button className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold">
            <PlayCircle size={14} /> Play in Hindi
          </button>
        </div>

        <div className="mt-6 flex justify-between gap-3">
          <button className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">Done — Next Step</button>
          <button onClick={onResolve} className="px-4 py-2.5 rounded-xl text-sm font-medium" style={{ border: "1px solid var(--color-border)" }}>Mark Resolved</button>
        </div>
      </div>
    </div>
  );
}

function Routing({ icon: Icon, label, status, detail }: any) {
  const c = status === "ok" ? "var(--color-success)" : "var(--color-destructive)";
  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-xl" style={{ background: "var(--color-card)" }}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `color-mix(in oklab, ${c} 14%, transparent)`, color: c }}><Icon size={16} /></div>
        <div>
          <div className="font-medium text-sm">{label}</div>
          <div className="text-xs text-muted-foreground">{detail}</div>
        </div>
      </div>
      <CheckCircle size={18} style={{ color: c }} />
    </div>
  );
}
