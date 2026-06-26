"use client";

interface Props { value: "monthly" | "annual"; onChange: (v: "monthly" | "annual") => void; }

export default function BillingToggle({ value, onChange }: Props) {
  return (
    <div role="group" aria-label="Billing cycle"
      className="relative inline-flex items-center bg-oceanic border border-white/10 rounded-full p-1">
      {/* Sliding pill */}
      <div aria-hidden="true"
        className="absolute top-1 h-[calc(100%-8px)] w-[calc(50%-4px)] rounded-full bg-nocturnal border border-white/15 transition-transform duration-200 ease-out shadow-lg"
        style={{ transform: value === "annual" ? "translateX(calc(100% + 8px))" : "translateX(0)" }}
      />
      {(["monthly", "annual"] as const).map((cycle) => (
        <button key={cycle}
          className={`relative z-10 px-5 py-2 text-sm font-sans rounded-full transition-colors duration-200 min-h-[38px] flex items-center gap-2 ${value === cycle ? "text-arctic font-semibold" : "text-arctic/45 hover:text-arctic/70"}`}
          onClick={() => onChange(cycle)}
          aria-pressed={value === cycle}
        >
          {cycle === "monthly" ? "Monthly" : "Annual"}
          {cycle === "annual" && value === "annual" && (
            <span className="text-[10px] font-mono bg-forsythia text-oceanic font-bold px-1.5 py-0.5 rounded-full animate-badge-in">
              −20%
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
