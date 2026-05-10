import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon, Eye, EyeOff, Watch, Bell, Globe } from "lucide-react";
import { useState } from "react";
import { DarkModeToggle } from "@/components/dark-mode-toggle";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · MedJarvis" }] }),
  component: Settings,
});

function Settings() {
  return (
    <div className="max-w-[900px] mx-auto p-4 md:p-8 space-y-6">
      <div>
        <div className="text-xs uppercase tracking-wider text-primary font-semibold">Configuration</div>
        <h1 className="font-serif text-4xl mt-1">Settings</h1>
      </div>

      <Section title="Appearance" icon={SettingsIcon}>
        <Row label="Dark mode" desc="Reduces eye strain during night shifts."><DarkModeToggle /></Row>
      </Section>

      <Section title="API Keys" icon={SettingsIcon}>
        <Secret label="Google Gemini API Key" />
        <Secret label="Twilio Account SID" />
        <Secret label="Twilio Auth Token" />
        <Secret label="Fast2SMS Key" />
        <Row label="Daily AI query limit" desc="Currently using 12 of 20"><div className="w-32 h-2 rounded-full" style={{ background: "var(--color-secondary)" }}><div className="h-full rounded-full bg-primary" style={{ width: "60%" }} /></div></Row>
      </Section>

      <Section title="Wristband" icon={Watch}>
        <button className="w-full text-left p-4 rounded-xl glass hover:bg-secondary">
          <div className="font-medium">Calibrate Blood Pressure</div>
          <div className="text-xs text-muted-foreground">Last calibrated 3 days ago</div>
        </button>
        <button className="w-full text-left p-4 rounded-xl glass hover:bg-secondary">
          <div className="font-medium">Run Sensor Test</div>
          <div className="text-xs text-muted-foreground">SpO₂ · Heart Rate · Temperature</div>
        </button>
      </Section>

      <Section title="Language & Region" icon={Globe}>
        <Row label="Interface language" desc="Affects all UI text and AI responses">
          <select className="px-3 py-2 rounded-lg text-sm" style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}>
            <option>English</option><option>हिन्दी</option><option>मराठी</option><option>తెలుగు</option>
          </select>
        </Row>
      </Section>

      <Section title="Notifications" icon={Bell}>
        <Row label="Critical alerts" desc="Always on — cannot be disabled"><Toggle on disabled /></Row>
        <Row label="Daily summary"><Toggle on /></Row>
        <Row label="Community heatmap updates"><Toggle /></Row>
      </Section>
    </div>
  );
}

function Section({ title, icon: Icon, children }: any) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Icon size={16} className="text-primary" />
        <h2 className="font-semibold">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Row({ label, desc, children }: any) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {desc && <div className="text-xs text-muted-foreground">{desc}</div>}
      </div>
      {children}
    </div>
  );
}

function Secret({ label }: { label: string }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="mt-1 flex items-center gap-2 px-3 py-2 rounded-lg" style={{ border: "1px solid var(--color-border)", background: "var(--color-card)" }}>
        <input type={show ? "text" : "password"} defaultValue="sk_••••••••••••••••" className="flex-1 bg-transparent outline-none text-sm font-mono" />
        <button onClick={() => setShow(!show)} className="text-muted-foreground hover:text-foreground">{show ? <EyeOff size={14} /> : <Eye size={14} />}</button>
      </div>
    </div>
  );
}

function Toggle({ on: initial = false, disabled }: any) {
  const [on, setOn] = useState(initial);
  return (
    <button disabled={disabled} onClick={() => setOn(!on)}
      className="relative w-11 h-6 rounded-full transition-colors disabled:opacity-50"
      style={{ background: on ? "var(--color-primary)" : "var(--color-border)" }}>
      <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform" style={{ transform: on ? "translateX(22px)" : "translateX(2px)" }} />
    </button>
  );
}
