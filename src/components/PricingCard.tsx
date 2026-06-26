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
        style={{ position: "relative", display: "flex", flexDirection: "column", textAlign: "left", borderRadius: 16, padding: 32, border: "1px solid rgba(255,200,1,0.4)", overflow: "hidden", background: "linear-gradient(160deg, rgba(255,200,1,0.08) 0%, rgba(17,76,90,0.6) 100%)" }}
        aria-label={`${tier.name} pricing plan`}
      >
        <div style={{ position: "absolute", inset: 0, borderRadius: 16, pointerEvents: "none", boxShadow: "0 0 60px rgba(255,200,1,0.08), inset 0 1px 0 rgba(255,200,1,0.2)" }} />

        <div style={{ position: "absolute", top: -12, left: 32 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: "#FFC801", color: "#172B36", fontFamily: "var(--font-family-mono)", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 9999, boxShadow: "0 10px 15px -3px rgba(255,200,1,0.3)" }}>
            <Icon name="arrow-trending-up" size={10} strokeColor="#172B36" /> MOST POPULAR
          </span>
        </div>

        <header style={{ marginBottom: 24, marginTop: 8 }}>
          <h3 className="font-mono" style={{ fontWeight: 700, fontSize: 24, color: "#F1F6F4", margin: "0 0 4px 0" }}>{tier.name}</h3>
          <p className="font-sans" style={{ fontSize: 14, color: "rgba(241,246,244,0.55)", margin: 0 }}>{tier.description}</p>
        </header>

        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span ref={priceRef} className="font-mono" style={{ fontWeight: 700, fontSize: 48, color: "#FFC801", fontVariantNumeric: "tabular-nums" }} aria-live="polite" aria-atomic="true" />
            <span ref={periodRef} className="font-sans" style={{ fontSize: 14, color: "rgba(241,246,244,0.4)" }} />
          </div>
          <p className="font-sans" style={{ fontSize: 12, color: "rgba(241,246,244,0.3)", margin: "4px 0 0 0" }}>Cancel anytime. No setup fees.</p>
        </div>

        <ul style={{ display: "flex", flexDirection: "column", gap: 10, margin: "0 0 32px 0", flexGrow: 1, listStyle: "none", padding: 0 }}>
          {tier.features.map((f) => (
            <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-family-sans)", fontSize: 14, color: "rgba(241,246,244,0.8)" }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "rgba(255,200,1,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name="chevron-right" size={10} strokeColor="#FFC801" />
              </div>
              {f}
            </li>
          ))}
        </ul>

        <button style={{ width: "100%", padding: "14px 0", borderRadius: 12, fontWeight: 600, fontFamily: "var(--font-family-sans)", fontSize: 14, backgroundColor: "#FFC801", color: "#172B36", border: "none", cursor: "pointer", boxShadow: "0 10px 15px -3px rgba(255,200,1,0.25)", minHeight: 44, transition: "background-color 150ms" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FF9932")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFC801")}>
          {tier.cta}
        </button>
      </article>
    );
  }

  return (
    <article
      style={{ position: "relative", display: "flex", flexDirection: "column", textAlign: "left", borderRadius: 16, padding: 32, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", background: "linear-gradient(160deg, rgba(17,76,90,0.35) 0%, rgba(23,43,54,0.7) 100%)", transition: "all 200ms" }}
      aria-label={`${tier.name} pricing plan`}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,200,1,0.12)"; e.currentTarget.style.borderColor = "rgba(255,200,1,0.22)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
    >
      <header style={{ marginBottom: 24 }}>
        <h3 className="font-mono" style={{ fontWeight: 700, fontSize: 24, color: "#F1F6F4", margin: "0 0 4px 0" }}>{tier.name}</h3>
        <p className="font-sans" style={{ fontSize: 14, color: "rgba(241,246,244,0.5)", margin: 0 }}>{tier.description}</p>
      </header>

      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span ref={priceRef} className="font-mono" style={{ fontWeight: 700, fontSize: 48, color: "#F1F6F4", fontVariantNumeric: "tabular-nums" }} aria-live="polite" aria-atomic="true" />
          <span ref={periodRef} className="font-sans" style={{ fontSize: 14, color: "rgba(241,246,244,0.4)" }} />
        </div>
        <p className="font-sans" style={{ fontSize: 12, color: "rgba(241,246,244,0.3)", margin: "4px 0 0 0" }}>Cancel anytime. No setup fees.</p>
      </div>

      <ul style={{ display: "flex", flexDirection: "column", gap: 10, margin: "0 0 32px 0", flexGrow: 1, listStyle: "none", padding: 0 }}>
        {tier.features.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--font-family-sans)", fontSize: 14, color: "rgba(241,246,244,0.65)" }}>
            <Icon name="chevron-right" size={14} strokeColor="#FFC801" className="shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      <button style={{ width: "100%", padding: "14px 0", borderRadius: 12, fontWeight: 600, fontFamily: "var(--font-family-sans)", fontSize: 14, backgroundColor: "transparent", color: "rgba(241,246,244,0.8)", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", minHeight: 44, transition: "all 150ms" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,200,1,0.4)"; e.currentTarget.style.color = "#FFC801"; e.currentTarget.style.backgroundColor = "rgba(255,200,1,0.05)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(241,246,244,0.8)"; e.currentTarget.style.backgroundColor = "transparent"; }}>
        {tier.cta}
      </button>
    </article>
  );
}