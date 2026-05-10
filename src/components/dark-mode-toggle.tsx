import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function DarkModeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="relative h-8 w-16 rounded-full transition-colors duration-300 flex items-center px-1"
      style={{
        background: isDark ? "var(--color-primary-tint)" : "var(--color-gold-tint)",
        border: "1px solid var(--color-border)",
      }}
    >
      <Sun size={14} strokeWidth={1.8} className="absolute left-2 text-gold" style={{ opacity: isDark ? 0.4 : 1 }} />
      <Moon size={14} strokeWidth={1.8} className="absolute right-2 text-primary" style={{ opacity: isDark ? 1 : 0.4 }} />
      <span
        className="h-6 w-6 rounded-full bg-card shadow-md transition-transform duration-300 ease-out z-10"
        style={{
          transform: isDark ? "translateX(32px)" : "translateX(0)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      />
    </button>
  );
}
