import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Heart, Shield, WifiOff, Globe, Stethoscope, Users, Building2, UserCog, ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In · MedJarvis" }] }),
  component: Login,
});

const ROLES = [
  { v: "asha", icon: Users, label: "Health Worker (ASHA)" },
  { v: "doctor", icon: Stethoscope, label: "Doctor" },
  { v: "manager", icon: Building2, label: "Hospital Manager" },
  { v: "admin", icon: UserCog, label: "Super Admin" },
];

function Login() {
  const navigate = useNavigate();
  const [pin, setPin] = useState(["", "", "", ""]);
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const setDigit = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...pin]; next[i] = v; setPin(next);
    if (v && i < 3) refs[i + 1].current?.focus();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 900);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] grid lg:grid-cols-2"
      onMouseMove={(e) => setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 40, y: (e.clientY / window.innerHeight - 0.5) * 40 })}>
      {/* Left */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 overflow-hidden" style={{ background: "var(--color-primary)", color: "#fff" }}>
        <div className="absolute w-[500px] h-[500px] blob -top-20 -right-32" style={{ background: "rgba(255,255,255,0.08)", transform: `translate(${mouse.x}px, ${mouse.y}px)`, transition: "transform 0.4s ease-out" }} />
        <div className="absolute w-[400px] h-[400px] blob -bottom-32 -left-20" style={{ background: "rgba(255,255,255,0.05)", transform: `translate(${-mouse.x}px, ${-mouse.y}px)`, transition: "transform 0.4s ease-out" }} />

        <Link to="/" className="relative flex items-center gap-2 z-10">
          <Heart size={20} fill="#E76F51" stroke="#E76F51" />
          <span className="font-serif text-2xl">MedJarvis</span>
        </Link>

        <div className="relative z-10 space-y-6">
          <h1 className="font-serif text-5xl leading-tight">Welcome Back</h1>
          <p className="text-white/80 text-lg max-w-md">Your patients are waiting. Log in to continue.</p>
          <div className="flex flex-wrap gap-2 pt-4">
            {[{i:Shield,t:"Encrypted Data"},{i:WifiOff,t:"Offline Ready"},{i:Globe,t:"8 Languages"}].map((b,i)=>(
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}>
                <b.i size={14} strokeWidth={1.8} /> {b.t}
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-sm text-white/60">Don't have an account? Contact your hospital administrator.</p>
      </div>

      {/* Right */}
      <div className="flex items-center justify-center p-6 md:p-12">
        <form onSubmit={submit} className="w-full max-w-md glass-strong rounded-3xl p-8 md:p-10 space-y-6 animate-fade-up">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Heart size={18} className="text-warm" fill="currentColor" />
              <span className="font-serif text-xl">MedJarvis</span>
            </div>
            <h2 className="font-serif text-3xl">Sign In</h2>
            <p className="text-sm text-muted-foreground mt-1">Enter your credentials to continue</p>
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Phone Number</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ border: "1px solid var(--color-border)", background: "var(--color-card)" }}>
              <span className="text-sm">🇮🇳 +91</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98765 43210" maxLength={10}
                className="flex-1 bg-transparent outline-none text-[15px]" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">4-Digit PIN</label>
            <div className="mt-1.5 flex gap-2.5 justify-center">
              {pin.map((d, i) => (
                <input key={i} ref={refs[i]} value={d} onChange={(e) => setDigit(i, e.target.value)}
                  type="password" inputMode="numeric" maxLength={1}
                  className="w-12 h-12 text-center font-mono text-xl rounded-xl outline-none transition-all focus:scale-105"
                  style={{ border: "1.5px solid var(--color-border)", background: "var(--color-card)" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")} />
              ))}
            </div>
          </div>

          <div className="relative">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Role</label>
            <button type="button" onClick={() => setOpen(!open)}
              className="mt-1.5 w-full flex items-center justify-between rounded-xl px-3 py-2.5"
              style={{ border: "1px solid var(--color-border)", background: "var(--color-card)" }}>
              <span className="flex items-center gap-2 text-[15px]">
                <role.icon size={16} className="text-primary" /> {role.label}
              </span>
              <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <div className="absolute top-full mt-1.5 inset-x-0 glass-strong rounded-xl p-1.5 z-10 animate-scale-in">
                {ROLES.map((r) => (
                  <button key={r.v} type="button" onClick={() => { setRole(r); setOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary text-left text-sm">
                    <r.icon size={16} className="text-primary" /> {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold transition-all hover:bg-primary-hover hover:shadow-warm-lg flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : "Sign In"}
          </button>

          <button type="button" className="w-full text-xs text-muted-foreground flex items-center justify-center gap-1.5 hover:text-foreground">
            <Globe size={12} /> Switch Language
          </button>
        </form>
      </div>
    </div>
  );
}
