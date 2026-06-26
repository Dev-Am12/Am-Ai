"use client";
import { RefObject } from "react";
import { PRICING_TIERS } from "@/lib/pricingConfig";
import Icon from "./Icon";

interface PricingCardProps {
    tierId: string;
    priceRef: React.RefObject<HTMLSpanElement | null>;
    periodRef: React.RefObject<HTMLSpanElement | null>;
}

export default function PricingCard({ tierId, priceRef, periodRef }: PricingCardProps) {
    const tier = PRICING_TIERS.find((t) => t.id === tierId)!;

    return (
        <article
            className={`relative flex flex-col rounded-2xl p-8 border transition-transform duration-150 ease-out hover:-translate-y-1 ${tier.highlighted
                ? "bg-forsythia border-forsythia/50"
                : "bg-nocturnal border-nocturnal/60"
                }`}
            aria-label={`${tier.name} pricing plan`}
        >
            {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-oceanic text-forsythia font-mono text-xs font-bold px-3 py-1 rounded-full border border-forsythia/50 whitespace-nowrap">
                    MOST POPULAR
                </div>
            )}

            <header className="mb-6">
                <h3 className={`font-mono font-bold text-2xl mb-1 ${tier.highlighted ? "text-oceanic" : "text-arctic"}`}>
                    {tier.name}
                </h3>
                <p className={`font-sans text-sm ${tier.highlighted ? "text-oceanic/70" : "text-arctic/60"}`}>
                    {tier.description}
                </p>
            </header>

            <div className="mb-6">
                <div className="flex items-baseline gap-1">
                    <span
                        ref={priceRef}
                        className={`font-mono font-bold text-4xl ${tier.highlighted ? "text-oceanic" : "text-forsythia"}`}
                        aria-live="polite"
                        aria-atomic="true"
                    />
                    <span
                        ref={periodRef}
                        className={`font-sans text-sm ${tier.highlighted ? "text-oceanic/70" : "text-arctic/50"}`}
                    />
                </div>
                <p className={`font-sans text-xs mt-1 ${tier.highlighted ? "text-oceanic/60" : "text-arctic/40"}`}>
                    Billed as described. Cancel anytime.
                </p>
            </div>

            <ul className="flex flex-col gap-2 mb-8 flex-grow" aria-label={`${tier.name} plan features`}>
                {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 font-sans text-sm">
                        <Icon name="chevron-right" size={14} strokeColor={tier.highlighted ? "#172B36" : "#FFC801"} />
                        <span className={tier.highlighted ? "text-oceanic/90" : "text-arctic/80"}>{feature}</span>
                    </li>
                ))}
            </ul>

            <button
                className={`w-full py-3 rounded-lg font-semibold font-sans text-sm transition-colors duration-150 ease-out min-h-[44px] ${tier.highlighted
                    ? "bg-oceanic text-forsythia hover:bg-nocturnal"
                    : "bg-forsythia/10 text-forsythia border border-forsythia/30 hover:bg-forsythia hover:text-oceanic"
                    }`}
            >
                Get Started with {tier.name}
            </button>
        </article>
    );
}