"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { PRICING_TIERS, computePrice, type Currency, type BillingCycle } from "@/lib/pricingConfig";
import PricingCard from "./PricingCard";
import BillingToggle from "./BillingToggle";
import CurrencySwitcher from "./CurrencySwitcher";

export default function PricingSection() {
    const [currency, setCurrency] = useState<Currency>("INR");
    const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

    // Refs for each tier's price and period text nodes
    const priceRefs = {
        starter: useRef<HTMLSpanElement>(null),
        pro: useRef<HTMLSpanElement>(null),
        enterprise: useRef<HTMLSpanElement>(null),
    };
    const periodRefs = {
        starter: useRef<HTMLSpanElement>(null),
        pro: useRef<HTMLSpanElement>(null),
        enterprise: useRef<HTMLSpanElement>(null),
    };

    // Direct DOM mutation — no React re-render on PricingCard
    const updatePrices = useCallback((cur: Currency, cycle: BillingCycle) => {
        PRICING_TIERS.forEach((tier) => {
            const key = tier.id as keyof typeof priceRefs;
            const priceEl = priceRefs[key].current;
            const periodEl = periodRefs[key].current;
            if (priceEl) priceEl.textContent = computePrice(tier.id, cur, cycle);
            if (periodEl) periodEl.textContent = cycle === "monthly" ? "/ mo" : "/ yr";
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Initialize on mount
    useEffect(() => {
        updatePrices("INR", "monthly");
    }, [updatePrices]);

    const handleCurrencyChange = (cur: Currency) => {
        setCurrency(cur);
        updatePrices(cur, billingCycle);
    };

    const handleBillingChange = (cycle: BillingCycle) => {
        setBillingCycle(cycle);
        updatePrices(currency, cycle);
    };

    return (
        <section id="pricing" aria-labelledby="pricing-heading" className="bg-arctic py-24">
            <div className="max-w-7xl mx-auto px-6">
                <header className="text-center mb-12">
                    <p className="font-mono text-nocturnal/60 text-sm uppercase tracking-widest mb-3">Simple Pricing</p>
                    <h2 id="pricing-heading" className="font-mono font-bold text-4xl md:text-5xl text-oceanic mb-4">
                        Transparent. Scalable.<br />No surprises.
                    </h2>
                    <p className="font-sans text-oceanic/60 max-w-xl mx-auto">
                        Start free, scale as you grow. Every plan includes a 14-day trial with no credit card required.
                    </p>
                </header>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <BillingToggle value={billingCycle} onChange={handleBillingChange} />
                    <CurrencySwitcher value={currency} onChange={handleCurrencyChange} />
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {PRICING_TIERS.map((tier) => (
                        <PricingCard
                            key={tier.id}
                            tierId={tier.id}
                            priceRef={priceRefs[tier.id as keyof typeof priceRefs]}
                            periodRef={periodRefs[tier.id as keyof typeof periodRefs]}
                        />
                    ))}
                </div>

                <p className="font-sans text-oceanic/40 text-center text-xs mt-8">
                    All prices shown exclude applicable taxes.
                </p>
            </div>
        </section>
    );
}