"use client";

interface Props { value: "monthly" | "annual"; onChange: (v: "monthly" | "annual") => void; }

export default function BillingToggle({ value, onChange }: Props) {
  return (
    <div role="group" aria-label="Billing cycle" style={{ position: "relative", display: "inline-flex", alignItems: "center", backgroundColor: "#172B36", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, padding: 4 }}>
      {/* Sliding pill */}
      <div aria-hidden="true" style={{ position: "absolute", top: 4, height: "calc(100% - 8px)", width: "calc(50% - 4px)", borderRadius: 9999, backgroundColor: "#114C5A", border: "1px solid rgba(255,255,255,0.15)", transition: "transform 200ms ease-out", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", transform: value === "annual" ? "translateX(calc(100% + 8px))" : "translateX(0)" }} />
      {(["monthly", "annual"] as const).map((cycle) => (
        <button key={cycle} onClick={() => onChange(cycle)} aria-pressed={value === cycle} style={{ position: "relative", zIndex: 10, padding: "8px 20px", fontSize: 14, fontFamily: "var(--font-family-sans)", borderRadius: 9999, transition: "color 200ms", minHeight: 38, display: "flex", alignItems: "center", gap: 8, backgroundColor: "transparent", border: "none", cursor: "pointer", color: value === cycle ? "#F1F6F4" : "rgba(241,246,244,0.45)", fontWeight: value === cycle ? 600 : 400 }}>
          {cycle === "monthly" ? "Monthly" : "Annual"}
          {cycle === "annual" && value === "annual" && (
            <span className="font-mono animate-badge-in" style={{ fontSize: 10, backgroundColor: "#FFC801", color: "#172B36", fontWeight: 700, padding: "2px 6px", borderRadius: 9999 }}>
              −20%
            </span>
          )}
        </button>
      ))}
    </div>
  );
}