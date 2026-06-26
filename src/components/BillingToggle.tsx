"use client";

interface BillingToggleProps {
    value: "monthly" | "annual";
    onChange: (value: "monthly" | "annual") => void;
}

export default function BillingToggle({ value, onChange }: BillingToggleProps) {
    return (
        <div role="group" aria-label="Billing cycle" className="relative flex bg-nocturnal rounded-full p-1 border border-nocturnal/60">
            {/* Sliding pill */}
            <div
                aria-hidden="true"
                className="absolute top-1 h-[calc(100%-8px)] w-28 rounded-full bg-forsythia transition-transform duration-200 ease-out"
                style={{ transform: value === "annual" ? "translateX(112px)" : "translateX(0)" }}
            />
            <button
                className={`relative z-10 w-28 py-2 text-sm font-sans rounded-full transition-colors duration-200 ease-out min-h-[44px] ${value === "monthly" ? "text-oceanic font-semibold" : "text-arctic/60"
                    }`}
                onClick={() => onChange("monthly")}
                aria-pressed={value === "monthly"}
            >
                Monthly
            </button>
            <button
                className={`relative z-10 w-28 py-2 text-sm font-sans rounded-full transition-colors duration-200 ease-out min-h-[44px] flex items-center justify-center gap-1 ${value === "annual" ? "text-oceanic font-semibold" : "text-arctic/60"
                    }`}
                onClick={() => onChange("annual")}
                aria-pressed={value === "annual"}
            >
                Annual
                {value === "annual" && (
                    <span className="ml-1 text-xs font-mono bg-oceanic text-forsythia px-1.5 py-0.5 rounded-full animate-badge-in">
                        Save 20%
                    </span>
                )}
            </button>
        </div>
    );
}