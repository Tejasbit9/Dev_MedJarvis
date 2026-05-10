import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, UserPlus, QrCode, Filter, Heart, Phone, MapPin, Droplet, Camera, Mic, Printer, Share2, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/patients")({
  head: () => ({ meta: [{ title: "Patients · MedJarvis" }] }),
  component: Patients,
});

const PATIENTS = [
  { name: "Raju Thorat", id: "MJ-2025-WD-00128", age: 68, blood: "B+", phone: "+91 98765 43210", ward: "Ward 4 · Wadgaon", status: "stable" },
  { name: "Sunita Patil", id: "MJ-2025-WD-00142", age: 54, blood: "O+", phone: "+91 99887 12233", ward: "Ward 2 · Wadgaon", status: "monitoring" },
  { name: "Ramesh Kumar", id: "MJ-2025-WD-00134", age: 71, blood: "A+", phone: "+91 95234 87766", ward: "Ward 7 · Khedgaon", status: "stable" },
  { name: "Meena Devi", id: "MJ-2025-WD-00131", age: 62, blood: "AB+", phone: "+91 90123 45678", ward: "Ward 3 · Wadgaon", status: "alert" },
  { name: "Kiran Joshi", id: "MJ-2025-WD-00138", age: 45, blood: "O-", phone: "+91 96789 01234", ward: "Ward 5 · Khedgaon", status: "stable" },
  { name: "Lakshmi Bai", id: "MJ-2025-WD-00145", age: 73, blood: "A-", phone: "+91 98123 33445", ward: "Ward 1 · Wadgaon", status: "monitoring" },
];

function Patients() {
  const [showRegister, setShowRegister] = useState(false);
  const [q, setQ] = useState("");
  const filtered = PATIENTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.id.includes(q));

  if (showRegister) return <Register onBack={() => setShowRegister(false)} />;

  return (
    <div className="max-w-[1280px] mx-auto p-4 md:p-8 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-primary font-semibold">Roster</div>
          <h1 className="font-serif text-4xl mt-1">Patients</h1>
          <p className="text-sm text-muted-foreground mt-1">{PATIENTS.length} active · {PATIENTS.filter(p => p.status === "alert").length} requiring attention</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm font-medium hover:-translate-y-0.5 transition-all">
            <QrCode size={16} /> Scan QR
          </button>
          <button onClick={() => setShowRegister(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-hover transition-colors">
            <UserPlus size={16} /> Register Patient
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ border: "1px solid var(--color-border)", background: "var(--color-card)" }}>
          <Search size={16} className="text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or MedJarvis ID..." className="flex-1 bg-transparent outline-none text-sm" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass text-sm">
          <Filter size={16} /> Filter
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <Link key={p.id} to="/patients" className="glass rounded-2xl p-5 hover:-translate-y-1 transition-all hover:shadow-warm-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-semibold" style={{ background: "var(--color-primary-tint)", color: "var(--color-primary)" }}>
                  {p.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-[11px] font-mono text-muted-foreground">{p.id}</div>
                </div>
              </div>
              <StatusDot s={p.status} />
            </div>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Heart size={12} /> {p.age} years · <span className="inline-flex items-center gap-1 ml-1 px-1.5 py-0.5 rounded font-mono text-[10px]" style={{ background: "var(--color-warm-tint)", color: "var(--color-warm)" }}><Droplet size={10} />{p.blood}</span></div>
              <div className="flex items-center gap-2"><Phone size={12} /> {p.phone}</div>
              <div className="flex items-center gap-2"><MapPin size={12} /> {p.ward}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatusDot({ s }: { s: string }) {
  const tones: any = {
    stable: { c: "var(--color-success)", l: "Stable" },
    monitoring: { c: "var(--color-warning)", l: "Monitoring" },
    alert: { c: "var(--color-destructive)", l: "Alert" },
  };
  const t = tones[s];
  return (
    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: `color-mix(in oklab, ${t.c} 12%, transparent)`, color: t.c }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.c }} />
      {t.l}
    </span>
  );
}

function Register({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [blood, setBlood] = useState("");
  const [phone, setPhone] = useState("");
  const [ec, setEc] = useState("");
  const [addr, setAddr] = useState("");
  const id = "MJ-2025-WD-" + String(150 + Math.floor(Math.random() * 50)).padStart(5, "0");

  return (
    <div className="max-w-[1280px] mx-auto p-4 md:p-8">
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground mb-4">← Back to patients</button>
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h1 className="font-serif text-3xl">Register New Patient</h1>
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--color-gold-tint)", color: "var(--color-warning)" }}>Estimated 60s</span>
          </div>
          <p className="text-sm text-muted-foreground mb-8">Voice input is available on every field.</p>

          <div className="space-y-5">
            <Field label="Full Name" voice><input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Anita Sharma" className="form-input" /></Field>
            <Field label="Date of Birth"><input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="form-input" /></Field>
            <Field label="Blood Group">
              <div className="grid grid-cols-4 gap-2">
                {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(b => (
                  <button key={b} type="button" onClick={() => setBlood(b)}
                    className="py-2.5 rounded-lg text-sm font-mono font-medium transition-all"
                    style={{
                      background: blood === b ? "var(--color-primary)" : "var(--color-card)",
                      color: blood === b ? "var(--color-primary-foreground)" : "var(--color-foreground)",
                      border: "1px solid var(--color-border)",
                    }}>{b}</button>
                ))}
              </div>
            </Field>
            <Field label="Contact Number" voice>
              <div className="flex items-center gap-2 form-input">
                <span className="text-sm">🇮🇳 +91</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={10} className="flex-1 bg-transparent outline-none" />
              </div>
            </Field>
            <Field label="Emergency Contact" voice><input value={ec} onChange={(e) => setEc(e.target.value)} placeholder="Name and number" className="form-input" /></Field>
            <Field label="Home Address / Ward" voice><textarea value={addr} onChange={(e) => setAddr(e.target.value)} rows={2} placeholder="Ward 3, Wadgaon" className="form-input" /></Field>
          </div>

          <div className="mt-6 flex items-center justify-between p-4 rounded-xl" style={{ background: "var(--color-primary-tint)" }}>
            <span className="text-xs uppercase tracking-wider text-primary">Your MedJarvis ID</span>
            <span className="font-mono font-medium text-primary">{id}</span>
          </div>

          <button className="mt-6 w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary-hover transition-colors">
            <QrCode size={18} /> <UserPlus size={18} /> Register Patient + Generate Health Card
          </button>
        </div>

        {/* Card preview */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Live Health Card Preview</div>
          <div className="aspect-[85/54] rounded-2xl p-5 flex flex-col relative overflow-hidden shadow-warm-lg"
            style={{ background: "linear-gradient(135deg, var(--color-background) 0%, var(--color-background-secondary) 100%)", border: "1px solid var(--color-border-medium)" }}>
            <div className="absolute top-0 inset-x-0 h-9 px-5 flex items-center justify-between" style={{ background: "var(--color-primary)", color: "#fff" }}>
              <div className="flex items-center gap-1.5"><Heart size={12} fill="currentColor" /><span className="font-serif text-sm">MedJarvis Health Card</span></div>
              <span className="text-[10px] font-mono opacity-80">v1.0</span>
            </div>
            <div className="mt-12 flex gap-4 flex-1">
              <div className="w-20 h-24 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--color-muted)" }}>
                <Camera size={20} className="text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1.5 text-xs">
                <div className="font-serif text-base text-foreground">{name || "—"}</div>
                <div className="font-mono text-[10px] text-primary">{id}</div>
                <div className="flex gap-3 pt-1">
                  <span><span className="text-muted-foreground">DOB</span> · {dob || "—"}</span>
                  <span><span className="text-muted-foreground">BG</span> · <span className="font-mono">{blood || "—"}</span></span>
                </div>
                <div className="text-muted-foreground">{phone ? `+91 ${phone}` : "—"}</div>
                <div className="text-muted-foreground text-[10px] line-clamp-2">{addr || "—"}</div>
              </div>
              <div className="w-16 h-16 rounded-lg flex items-center justify-center self-end" style={{ background: "var(--color-foreground)" }}>
                <QrCode size={36} style={{ color: "var(--color-background)" }} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button disabled className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium opacity-50" style={{ border: "1px solid var(--color-border)" }}><Printer size={14} /> Print</button>
            <button disabled className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium opacity-50" style={{ background: "#25D366", color: "#fff" }}><Share2 size={14} /> WhatsApp</button>
          </div>
        </div>
      </div>
      <style>{`.form-input { width: 100%; padding: 10px 12px; border-radius: 10px; border: 1px solid var(--color-border); background: var(--color-card); font-size: 14px; outline: none; transition: border-color 0.2s; }
      .form-input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-tint); }`}</style>
    </div>
  );
}

function Field({ label, voice, children }: any) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
        {voice && <button type="button" className="text-xs text-primary flex items-center gap-1 hover:underline"><Mic size={12} /> Voice</button>}
      </div>
      {children}
    </div>
  );
}
