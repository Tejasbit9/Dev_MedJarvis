import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Heart, Activity, AlertTriangle, QrCode, Pill, Brain, Shield, Map, Mic, WifiOff,
  ArrowRight, Watch, Globe, Stethoscope, UserCog, Building2, Users, Sparkles,
  Thermometer, Droplets,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MedJarvis — Rural India's Health Guardian" },
      { name: "description", content: "IoT wristbands, encrypted health cards, and AI intelligence — bringing 24/7 health monitoring to every village in India." },
      { property: "og:title", content: "MedJarvis — Rural Health Intelligence" },
      { property: "og:description", content: "Every life deserves the right care. 28 features. 8 languages. Fully offline-first." },
    ],
  }),
  component: Landing,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".scroll-reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible"));
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScroll() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

const FEATURES = [
  { icon: Activity, cat: "IoT Monitoring", title: "Live Vital Signs", desc: "Real-time SpO2, heart rate and temperature streaming from wristband sensors with personal baselines." },
  { icon: AlertTriangle, cat: "Safety", title: "Fall Detection", desc: "Three-step intelligent detection prevents false alarms while never missing a real emergency." },
  { icon: QrCode, cat: "Identity", title: "Encrypted Health Card", desc: "Aadhaar-style QR identity that works offline and protects every patient's medical history." },
  { icon: Pill, cat: "Safety", title: "Drug Interaction Check", desc: "Zero dangerous prescriptions. Every medicine is checked against the patient's active list." },
  { icon: Brain, cat: "AI Intelligence", title: "AI Symptom Checker", desc: "Gemini-powered triage that listens in the patient's own language and explains in plain words." },
  { icon: Shield, cat: "Emergency", title: "Smart Emergency Routing", desc: "The right alert reaches the right person — family, ASHA, or ambulance — never one alert to all." },
  { icon: Map, cat: "Community", title: "Village Heatmap", desc: "Detect outbreaks early. Anonymous cluster intelligence across wards and villages." },
  { icon: Mic, cat: "Workflow", title: "Voice Prescriptions", desc: "The doctor speaks. MedJarvis writes. Voice-to-prescription extraction in 8 Indian languages." },
  { icon: WifiOff, cat: "Reliability", title: "Fully Offline-First", desc: "Designed for villages with no internet. Sync intelligently when a signal returns." },
];

const ROLES = [
  { icon: Users, name: "Health Worker", desc: "ASHA & ANM workers in the field" },
  { icon: Heart, name: "Patient", desc: "Elderly, chronic & at-risk villagers" },
  { icon: Stethoscope, name: "Doctor", desc: "Rural clinicians & PHC physicians" },
  { icon: Building2, name: "Hospital Manager", desc: "PHC & CHC administrators" },
  { icon: UserCog, name: "Community", desc: "Panchayat & district health officers" },
];

function Landing() {
  useReveal();
  const y = useScroll();

  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center px-6 md:px-12">
        {/* Organic blobs */}
        <div
          className="absolute -right-32 top-10 w-[640px] h-[640px] blob"
          style={{
            background: "radial-gradient(circle at 30% 30%, var(--color-primary) 0%, transparent 70%)",
            opacity: 0.12,
            transform: `translateY(${y * -0.4}px) rotate(${y * 0.05}deg)`,
          }}
        />
        <div
          className="absolute -left-20 bottom-0 w-[420px] h-[420px] blob"
          style={{
            background: "radial-gradient(circle at 60% 50%, var(--color-warm) 0%, transparent 70%)",
            opacity: 0.08,
            transform: `translateY(${y * -0.25}px)`,
          }}
        />

        <div className="relative max-w-[1280px] mx-auto w-full grid lg:grid-cols-12 gap-12 items-center py-16">
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium uppercase tracking-[0.15em] text-primary scroll-reveal">
              <Sparkles size={12} strokeWidth={2} /> Rural India's Health Guardian
            </div>
            <h1 className="font-serif text-[44px] md:text-[64px] leading-[1.05] text-balance scroll-reveal">
              Every Life Deserves
              <br />
              <span className="text-primary italic">The Right Care.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed scroll-reveal">
              MedJarvis connects IoT wristbands, encrypted health cards, and AI intelligence —
              bringing 24/7 health monitoring to every village in India.
            </p>
            <div className="flex flex-wrap gap-3 scroll-reveal">
              <Link to="/login" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-all hover:shadow-warm-lg hover:-translate-y-0.5">
                Get Started
                <ArrowRight size={18} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#features" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all hover:bg-secondary"
                 style={{ border: "1.5px solid var(--color-primary)", color: "var(--color-primary)" }}>
                See How It Works
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-6 pt-4 scroll-reveal">
              {[{i:Shield,t:"Offline-First"},{i:Globe,t:"8 Languages"},{i:Watch,t:"IoT Powered"}].map((b,i)=>(
                <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                  <b.i size={14} strokeWidth={1.8} className="text-primary" />
                  {b.t}
                </div>
              ))}
            </div>
          </div>

          {/* Mockup */}
          <div className="lg:col-span-5 relative scroll-reveal" style={{ transform: `translateY(${y * -0.15}px)` }}>
            <div className="absolute inset-0 -m-8">
              {[0,1,2].map(i => (
                <div key={i} className="absolute inset-0 rounded-full border" style={{
                  borderColor: "var(--color-primary)",
                  opacity: 0.06,
                  transform: `scale(${1 + i * 0.15})`,
                }} />
              ))}
            </div>
            <div className="relative glass-strong rounded-3xl p-6 animate-float">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Live Vitals</div>
                  <div className="font-serif text-xl">Sunita Patil</div>
                  <div className="text-[11px] font-mono text-muted-foreground">MJ-2025-WD-00142</div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium" style={{ background: "var(--color-success-tint)", color: "var(--color-success)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" /> Wristband
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <VitalMini icon={Droplets} label="SpO₂" value="98" unit="%" tone="success" />
                <VitalMini icon={Heart} label="Heart" value="72" unit="bpm" tone="primary" pulse />
                <VitalMini icon={Thermometer} label="Temp" value="36.8" unit="°C" tone="primary" />
              </div>
              <div className="mt-4 p-4 rounded-xl" style={{ background: "var(--color-background)" }}>
                <div className="flex items-center justify-between mb-2 text-[11px] text-muted-foreground">
                  <span>PPG Waveform</span>
                  <span className="font-mono">60s</span>
                </div>
                <PPGMini />
              </div>
              <div className="mt-3 flex items-center gap-2 p-3 rounded-lg" style={{ background: "var(--color-success-tint)" }}>
                <Shield size={16} className="text-success" />
                <span className="text-xs font-medium" style={{ color: "var(--color-success)" }}>
                  All conditions stable · Watching
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM STATEMENT */}
      <section className="px-6 md:px-12 py-24" style={{ background: "var(--color-background-secondary)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-center mb-12 scroll-reveal">Raju's Story</h2>
          <div className="space-y-6 text-lg leading-[1.8] text-foreground/85">
            <p className="scroll-reveal">
              Raju Thorat, 68, lives in a village three hours from the nearest hospital.
              One evening, he collapsed in his courtyard. His daughter found him minutes later,
              but no one knew his blood group, his medications, or his last blood pressure reading.
            </p>
            <p className="scroll-reveal">
              By the time the ambulance arrived, by the time the doctor read his old paper file,
              by the time someone reached his son in the city — two hours had passed.
              Two hours that mattered.
            </p>
            <p className="scroll-reveal">
              Raju survived. Many do not. MedJarvis exists so the next Raju does not have to wait.
            </p>
          </div>
          <blockquote className="mt-12 pl-6 scroll-reveal" style={{ borderLeft: "4px solid var(--color-primary)" }}>
            <p className="font-serif text-2xl italic text-foreground/90 leading-snug">
              "The information existed. It was just not available at the right moment."
            </p>
          </blockquote>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 md:px-12 py-24">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16 scroll-reveal">
            <div className="inline-block text-xs uppercase tracking-[0.2em] text-primary mb-3 font-medium">28 Features. One System.</div>
            <h2 className="font-serif text-4xl md:text-5xl">Everything MedJarvis Does</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={f.title}
                className="group glass rounded-2xl p-6 scroll-reveal hover:-translate-y-1.5 transition-all duration-300 hover:shadow-warm-lg cursor-pointer"
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ background: "var(--color-primary-tint)" }}>
                    <f.icon size={22} strokeWidth={1.6} className="text-primary" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full font-medium"
                    style={{ background: "var(--color-gold-tint)", color: "var(--color-warning)" }}>
                    {f.cat}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 md:px-12 py-20" style={{ background: "var(--color-primary)" }}>
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {[
            { n: 28, l: "Features" },
            { n: 8, l: "Languages" },
            { n: 3, l: "Sensors" },
            { n: 100, l: "% Offline-First" },
          ].map((s, i) => (
            <Counter key={i} target={s.n} label={s.l} divider={i < 3} />
          ))}
        </div>
      </section>

      {/* ROLES */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="font-serif text-4xl md:text-5xl">Built For Everyone Who Cares</h2>
            <p className="mt-3 text-muted-foreground">Five roles. One mission.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {ROLES.map((r, i) => (
              <div key={r.name}
                className="group glass rounded-2xl p-6 text-center scroll-reveal cursor-pointer transition-all hover:bg-primary hover:text-primary-foreground"
                style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-colors"
                  style={{ background: "var(--color-primary-tint)" }}>
                  <r.icon size={26} strokeWidth={1.6} className="text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="font-semibold mb-1">{r.name}</div>
                <div className="text-xs text-muted-foreground group-hover:text-primary-foreground/80 transition-colors">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-4xl mx-auto glass-strong rounded-3xl p-12 md:p-16 text-center relative overflow-hidden scroll-reveal">
          <div className="absolute -top-20 -right-20 w-80 h-80 blob" style={{ background: "var(--color-primary)", opacity: 0.08 }} />
          <Heart size={32} className="text-warm mx-auto mb-4" fill="currentColor" />
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">Ready to bring care closer?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Join the workers, doctors, and communities already protecting lives with MedJarvis.
          </p>
          <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition-all hover:shadow-warm-lg">
            Open the Dashboard <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-12" style={{ background: "#1A1A1A", color: "rgba(255,255,255,0.75)" }}>
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Heart size={18} className="text-warm" fill="currentColor" />
              <span className="font-serif text-xl text-white">MedJarvis</span>
            </div>
            <p className="text-sm text-white/60">Built for rural India. Every village. Every life.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="text-white/40 uppercase text-[10px] tracking-wider mb-2">Product</div>
              <a href="#features" className="block hover:text-white">Features</a>
              <Link to="/dashboard" className="block hover:text-white">Dashboard</Link>
            </div>
            <div className="space-y-2">
              <div className="text-white/40 uppercase text-[10px] tracking-wider mb-2">Company</div>
              <a className="block hover:text-white">About</a>
              <a className="block hover:text-white">Contact</a>
            </div>
          </div>
          <div className="text-sm text-white/60">
            <p>MedJarvis 2025</p>
            <p className="mt-1">Saving lives through intelligent healthcare.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function VitalMini({ icon: Icon, label, value, unit, tone, pulse }: any) {
  return (
    <div className="rounded-xl p-3" style={{ background: tone === "success" ? "var(--color-success-tint)" : "var(--color-primary-tint)" }}>
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider mb-1" style={{ color: tone === "success" ? "var(--color-success)" : "var(--color-primary)" }}>
        <Icon size={11} strokeWidth={2} className={pulse ? "animate-pulse-soft" : ""} /> {label}
      </div>
      <div className="font-mono text-2xl font-medium leading-none" style={{ color: tone === "success" ? "var(--color-success)" : "var(--color-primary)" }}>
        {value}<span className="text-xs ml-0.5">{unit}</span>
      </div>
    </div>
  );
}

function PPGMini() {
  // Decorative SVG waveform
  return (
    <svg viewBox="0 0 300 60" className="w-full h-12">
      <path d="M0 30 L40 30 L48 20 L56 40 L64 5 L72 55 L80 30 L130 30 L138 20 L146 40 L154 5 L162 55 L170 30 L220 30 L228 22 L236 38 L244 8 L252 52 L260 30 L300 30"
        fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function Counter({ target, label, divider }: { target: number; label: string; divider?: boolean }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = Date.now();
        const dur = 1400;
        const tick = () => {
          const p = Math.min(1, (Date.now() - start) / dur);
          setN(Math.floor(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        tick();
        io.disconnect();
      }
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target]);
  return (
    <div ref={ref} className="text-center text-white relative">
      {divider && <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-white/20" />}
      <div className="font-serif text-5xl md:text-6xl">{n}</div>
      <div className="text-xs uppercase tracking-wider text-white/70 mt-2">{label}</div>
    </div>
  );
}
