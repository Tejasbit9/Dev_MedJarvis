import { useEffect, useState } from "react";

export function OfflineIndicator() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
      style={{ background: online ? "var(--color-success-tint)" : "var(--color-warning-tint)", color: online ? "var(--color-success)" : "var(--color-warning)" }}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 rounded-full animate-ping opacity-60" style={{ background: "currentColor" }} />
        <span className="relative h-2 w-2 rounded-full" style={{ background: "currentColor" }} />
      </span>
      {online ? "Online" : "Offline"}
    </div>
  );
}
