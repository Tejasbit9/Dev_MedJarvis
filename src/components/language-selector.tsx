import { Globe, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const LANGUAGES = [
  { code: "EN", name: "English" },
  { code: "HI", name: "हिन्दी (Hindi)" },
  { code: "MR", name: "मराठी (Marathi)" },
  { code: "TE", name: "తెలుగు (Telugu)" },
  { code: "TA", name: "தமிழ் (Tamil)" },
  { code: "BN", name: "বাংলা (Bengali)" },
  { code: "GU", name: "ગુજરાતી (Gujarati)" },
  { code: "KN", name: "ಕನ್ನಡ (Kannada)" },
];

export function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("EN");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-secondary transition-colors"
        style={{ border: "1px solid var(--color-border)" }}
      >
        <Globe size={14} strokeWidth={1.8} />
        {lang}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl glass-strong p-1.5 z-50 animate-scale-in">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-secondary transition-colors text-left"
            >
              <span>{l.name}</span>
              {lang === l.code && <Check size={14} className="text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
