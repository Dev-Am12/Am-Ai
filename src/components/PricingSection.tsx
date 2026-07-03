"use client";
import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { PRICING_TIERS, computePrice, type Currency, type BillingCycle } from "@/lib/pricingConfig";
import PricingCard from "./PricingCard";

export default function PricingSection() {
  const [currency, setCurrency]       = useState<Currency>("INR");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [desktop, setDesktop]          = useState(false);
  const [indicator, setIndicator]      = useState({ left: 0, width: 0 });

  const toggleGroupRef = useRef<HTMLDivElement>(null);
  const btnRefs = { monthly: useRef<HTMLButtonElement>(null), annual: useRef<HTMLButtonElement>(null) };

  const measureIndicator = useCallback(() => {
    const activeBtn = btnRefs[billingCycle].current;
    const group = toggleGroupRef.current;
    if (!activeBtn || !group) return;
    const groupRect = group.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    setIndicator({ left: btnRect.left - groupRect.left, width: btnRect.width });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billingCycle]);

  useLayoutEffect(() => { measureIndicator(); }, [measureIndicator, billingCycle]);

  useEffect(() => {
    window.addEventListener("resize", measureIndicator);
    return () => window.removeEventListener("resize", measureIndicator);
  }, [measureIndicator]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = (e: MediaQueryListEvent | MediaQueryList) => setDesktop(e.matches);
    set(mq); mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const priceRefs  = { starter: useRef<HTMLSpanElement>(null), pro: useRef<HTMLSpanElement>(null), enterprise: useRef<HTMLSpanElement>(null) };
  const periodRefs = { starter: useRef<HTMLSpanElement>(null), pro: useRef<HTMLSpanElement>(null), enterprise: useRef<HTMLSpanElement>(null) };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updatePrices = useCallback((cur: Currency, cycle: BillingCycle) => {
    PRICING_TIERS.forEach((tier) => {
      const k = tier.id as keyof typeof priceRefs;
      const pEl = priceRefs[k].current; const perEl = periodRefs[k].current;
      if (pEl)   pEl.textContent  = computePrice(tier.id, cur, cycle);
      if (perEl) perEl.textContent = cycle === "monthly" ? "/ mo" : "/ yr";
    });
  }, []);

  useEffect(() => { updatePrices("INR", "monthly"); }, [updatePrices]);

  const handleCurrency = (cur: Currency)     => { setCurrency(cur);     updatePrices(cur, billingCycle); };
  const handleBilling  = (cyc: BillingCycle) => { setBillingCycle(cyc); updatePrices(currency, cyc); };

  return (
    <section id="pricing" aria-labelledby="pricing-heading"
      style={{ position: "relative", padding: "108px 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #0f2028 0%, #172B36 100%)" }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "radial-gradient(circle, rgba(241,246,244,0.7) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        <div style={{ marginBottom: 48, maxWidth: 560 }}>
          <p className="font-mono" style={{ fontSize: 11, color: "rgba(255,200,1,0.65)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Simple Pricing
          </p>
          <h2 id="pricing-heading" className="font-mono"
            style={{ fontWeight: 700, fontSize: "clamp(30px, 4vw, 50px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#F1F6F4" }}>
            Transparent. Scalable.<br />No surprises.
          </h2>
          <p className="font-sans" style={{ fontSize: 15, color: "rgba(241,246,244,0.48)", marginTop: 14, lineHeight: 1.65 }}>
            Start free, scale as you grow. Every plan includes a 14-day trial — no card required.
          </p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginBottom: 40 }}>
          {/* Billing toggle sliding indicator */}
          <div ref={toggleGroupRef} role="group" aria-label="Billing cycle" style={{
            position: "relative",
            display: "inline-flex", background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: 4, gap: 2,
          }}>
            {/* Sliding indicator behind button labels*/}
            <div aria-hidden="true" style={{
              position: "absolute", top: 4, bottom: 4,
              left: indicator.left, width: indicator.width,
              background: "#FFC801", borderRadius: 7,
              transition: "left 260ms cubic-bezier(0.4, 0, 0.2, 1), width 260ms cubic-bezier(0.4, 0, 0.2, 1)",
              zIndex: 0,
            }} />

            {(["monthly", "annual"] as const).map((cycle) => (
              <button key={cycle} ref={btnRefs[cycle]} onClick={() => handleBilling(cycle)} aria-pressed={billingCycle === cycle}
                style={{
                  position: "relative", zIndex: 1,
                  padding: "8px 18px", borderRadius: 7, border: "none", cursor: "pointer",
                  fontFamily: '"Inter", sans-serif', fontSize: 13, fontWeight: billingCycle === cycle ? 600 : 400,
                  background: "transparent",
                  color: billingCycle === cycle ? "#172B36" : "rgba(241,246,244,0.45)",
                  transition: "color 200ms",
                  display: "flex", alignItems: "center", gap: 8, minHeight: 38,
                }}>
                {cycle === "monthly" ? "Monthly" : "Annual"}
                {cycle === "annual" && billingCycle === "annual" && (
                  <span className="font-mono animate-badge-in"
                    style={{ fontSize: 9, background: "rgba(23,43,54,0.8)", color: "#FFC801", padding: "2px 6px", borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em" }}>
                    −20%
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Currency selector */}
          <div style={{ position: "relative" }}>
            <select
              aria-label="Select currency" value={currency} onChange={(e) => handleCurrency(e.target.value as Currency)}
              style={{
                appearance: "none", WebkitAppearance: "none",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                color: "#F1F6F4", fontFamily: '"JetBrains Mono", monospace', fontSize: 12,
                padding: "9px 36px 9px 14px", borderRadius: 8, cursor: "pointer",
                outline: "none", transition: "border-color 150ms", minHeight: 38,
              }}
              onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,200,1,0.5)"; }}
              onBlur={(e)  => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
            >
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
            </select>
            <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="#FFC801" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: desktop ? "repeat(3, 1fr)" : "1fr",
          gap: 14, maxWidth: desktop ? "none" : 480,
        }}>
          {PRICING_TIERS.map((t) => (
            <PricingCard key={t.id} tierId={t.id}
              priceRef={priceRefs[t.id as keyof typeof priceRefs]}
              periodRef={periodRefs[t.id as keyof typeof periodRefs]}
            />
          ))}
        </div>

        <p className="font-sans" style={{ fontSize: 12, color: "rgba(241,246,244,0.28)", marginTop: 24, textAlign: "center" }}>
          All prices exclude applicable taxes. Enterprise plans available with custom invoicing.
        </p>
      </div>
    </section>
  );
}