"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { PRICING_TIERS, computePrice, type Currency, type BillingCycle } from "@/lib/pricingConfig";
import PricingCard from "./PricingCard";
import BillingToggle from "./BillingToggle";
import CurrencySwitcher from "./CurrencySwitcher";

export default function PricingSection() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const priceRefs = {
    starter:    useRef<HTMLSpanElement>(null),
    pro:        useRef<HTMLSpanElement>(null),
    enterprise: useRef<HTMLSpanElement>(null),
  };
  const periodRefs = {
    starter:    useRef<HTMLSpanElement>(null),
    pro:        useRef<HTMLSpanElement>(null),
    enterprise: useRef<HTMLSpanElement>(null),
  };

  const updatePrices = useCallback((cur: Currency, cycle: BillingCycle) => {
    PRICING_TIERS.forEach((tier) => {
      const k = tier.id as keyof typeof priceRefs;
      const pEl = priceRefs[k].current;
      const perEl = periodRefs[k].current;
      if (pEl) pEl.textContent = computePrice(tier.id, cur, cycle);
      if (perEl) perEl.textContent = cycle === "monthly" ? "/ mo" : "/ yr";
    });
  }, []);

  useEffect(() => { updatePrices("INR", "monthly"); }, [updatePrices]);

  const handleCurrency = (cur: Currency) => { setCurrency(cur); updatePrices(cur, billingCycle); };
  const handleBilling  = (cyc: BillingCycle) => { setBillingCycle(cyc); updatePrices(currency, cyc); };

  return (
    <section id="pricing" aria-labelledby="pricing-heading" style={{ position: "relative", padding: "112px 0", overflow: "hidden" }}>
      <style>{`
        .pricing-controls { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; margin-bottom: 56px; }
        .pricing-grid { display: flex; flex-direction: column; gap: 20px; max-width: 1024px; margin: 0 auto; }
        @media (min-width: 640px) { .pricing-controls { flex-direction: row; } }
        @media (min-width: 768px) { .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); } }
      `}</style>

      {/* Light section background */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#F1F6F4" }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "radial-gradient(circle, rgba(23,43,54,1) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        
        {/* Header - Fixed Centering */}
        <div style={{ textAlign: "center", marginBottom: 56, maxWidth: 672, margin: "0 auto 56px auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: 9999, border: "1px solid rgba(17,76,90,0.2)", backgroundColor: "rgba(17,76,90,0.08)", marginBottom: 20 }}>
            <span className="font-mono" style={{ color: "rgba(17,76,90,0.7)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>Simple Pricing</span>
          </div>
          <h2 id="pricing-heading" className="font-mono" style={{ fontWeight: 700, fontSize: "clamp(36px, 5vw, 48px)", color: "#172B36", lineHeight: 1.2, margin: 0 }}>
            Transparent. Scalable.<br />No surprises.
          </h2>
          <p className="font-sans" style={{ color: "rgba(23,43,54,0.55)", marginTop: 16, lineHeight: 1.6, margin: "16px 0 0 0" }}>
            Start free, scale as you grow. Every plan includes a 14-day trial — no card required.
          </p>
        </div>

        {/* Controls */}
        <div className="pricing-controls">
          <BillingToggle value={billingCycle} onChange={handleBilling} />
          <CurrencySwitcher value={currency} onChange={handleCurrency} />
        </div>

        {/* Cards */}
        <div className="pricing-grid">
          {PRICING_TIERS.map((t) => (
            <PricingCard
              key={t.id}
              tierId={t.id}
              priceRef={priceRefs[t.id as keyof typeof priceRefs]}
              periodRef={periodRefs[t.id as keyof typeof periodRefs]}
            />
          ))}
        </div>

        <p className="font-sans" style={{ color: "rgba(23,43,54,0.35)", textAlign: "center", fontSize: 12, marginTop: 40, margin: "40px auto 0 auto" }}>
          All prices exclude applicable taxes. Enterprise plans available with custom invoicing.
        </p>
      </div>
    </section>
  );
}