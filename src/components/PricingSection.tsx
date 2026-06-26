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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <section id="pricing" aria-labelledby="pricing-heading" className="relative py-28 overflow-hidden">
      {/* Light section background — Stripe contrast flip */}
      <div className="absolute inset-0 bg-arctic" />
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(23,43,54,1) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-nocturnal/20 bg-nocturnal/8 mb-5">
            <span className="font-mono text-nocturnal/70 text-xs uppercase tracking-widest">Simple Pricing</span>
          </div>
          <h2 id="pricing-heading" className="font-mono font-bold text-4xl md:text-5xl text-oceanic leading-tight">
            Transparent. Scalable.<br />No surprises.
          </h2>
          <p className="font-sans text-oceanic/55 mt-4 leading-relaxed">
            Start free, scale as you grow. Every plan includes a 14-day trial — no card required.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <BillingToggle value={billingCycle} onChange={handleBilling} />
          <CurrencySwitcher value={currency} onChange={handleCurrency} />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {PRICING_TIERS.map((t) => (
            <PricingCard
              key={t.id}
              tierId={t.id}
              priceRef={priceRefs[t.id as keyof typeof priceRefs]}
              periodRef={periodRefs[t.id as keyof typeof periodRefs]}
            />
          ))}
        </div>

        <p className="font-sans text-oceanic/35 text-center text-xs mt-10">
          All prices exclude applicable taxes. Enterprise plans available with custom invoicing.
        </p>
      </div>
    </section>
  );
}
