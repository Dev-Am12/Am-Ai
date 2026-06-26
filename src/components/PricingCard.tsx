"use client";
import { RefObject } from "react";
import { PRICING_TIERS } from "@/lib/pricingConfig";
import Icon from "./Icon";

interface Props {
  tierId: string;
  priceRef: RefObject<HTMLSpanElement | null>;
  periodRef: RefObject<HTMLSpanElement | null>;
}

export default function PricingCard({ tierId, priceRef, periodRef }: Props) {
  const tier = PRICING_TIERS.find((t) => t.id === tierId)!;

  if (tier.highlighted) {
    return (
      <article
        className="relative flex flex-col rounded-2xl p-8 border border-forsythia/40 overflow-hidden"
        style={{ background: "linear-gradient(160deg, rgba(255,200,1,0.08) 0%, rgba(17,76,90,0.6) 100%)" }}
        aria-label={`${tier.name} pricing plan`}
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ boxShadow: "0 0 60px rgba(255,200,1,0.08), inset 0 1px 0 rgba(255,200,1,0.2)" }} />

        <div className="absolute -top-3 left-8">
          <span className="inline-flex items-center gap-1.5 bg-forsythia text-oceanic font-mono text-[11px] font-bold px-3 py-1 rounded-full shadow-lg shadow-forsythia/30">
            <Icon name="arrow-trending-up" size={10} strokeColor="#172B36" /> MOST POPULAR
          </span>
        </div>

        <header className="mb-6 mt-2">
          <h3 className="font-mono font-bold text-2xl text-arctic mb-1">{tier.name}</h3>
          <p className="font-sans text-sm text-arctic/55">{tier.description}</p>
        </header>

        <div className="mb-6">
          <div className="flex items-baseline gap-1.5">
            <span ref={priceRef} className="font-mono font-bold text-5xl text-forsythia tabular-nums" aria-live="polite" aria-atomic="true" />
            <span ref={periodRef} className="font-sans text-sm text-arctic/40" />
          </div>
          <p className="font-sans text-xs text-arctic/30 mt-1">Cancel anytime. No setup fees.</p>
        </div>

        <ul className="flex flex-col gap-2.5 mb-8 flex-grow">
          {tier.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 font-sans text-sm text-arctic/80">
              <div className="w-4 h-4 rounded-full bg-forsythia/20 flex items-center justify-center shrink-0">
                <Icon name="chevron-right" size={10} strokeColor="#FFC801" />
              </div>
              {f}
            </li>
          ))}
        </ul>

        <button className="w-full py-3.5 rounded-xl font-semibold font-sans text-sm bg-forsythia text-oceanic hover:bg-deep-saffron transition-colors duration-150 shadow-lg shadow-forsythia/25 min-h-[44px]">
          {tier.cta}
        </button>
      </article>
    );
  }

  return (
    <article
      className="relative flex flex-col rounded-2xl p-8 border border-white/8 hover:border-white/15 transition-all duration-200 overflow-hidden card-hover"
      style={{ background: "linear-gradient(160deg, rgba(17,76,90,0.35) 0%, rgba(23,43,54,0.7) 100%)" }}
      aria-label={`${tier.name} pricing plan`}
    >
      <header className="mb-6">
        <h3 className="font-mono font-bold text-2xl text-arctic mb-1">{tier.name}</h3>
        <p className="font-sans text-sm text-arctic/50">{tier.description}</p>
      </header>

      <div className="mb-6">
        <div className="flex items-baseline gap-1.5">
          <span ref={priceRef} className="font-mono font-bold text-5xl text-arctic tabular-nums" aria-live="polite" aria-atomic="true" />
          <span ref={periodRef} className="font-sans text-sm text-arctic/40" />
        </div>
        <p className="font-sans text-xs text-arctic/30 mt-1">Cancel anytime. No setup fees.</p>
      </div>

      <ul className="flex flex-col gap-2.5 mb-8 flex-grow">
        {tier.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 font-sans text-sm text-arctic/65">
            <Icon name="chevron-right" size={14} strokeColor="#FFC801" className="shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <button className="w-full py-3.5 rounded-xl font-semibold font-sans text-sm border border-white/15 text-arctic/80 hover:border-forsythia/40 hover:text-forsythia hover:bg-forsythia/5 transition-all duration-150 min-h-[44px]">
        {tier.cta}
      </button>
    </article>
  );
}
