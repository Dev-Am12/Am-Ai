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

  const base: React.CSSProperties = {
    position: "relative", display: "flex", flexDirection: "column",
    borderRadius: 16, padding: "28px 26px", overflow: "hidden",
    transition: "transform 160ms ease-out, box-shadow 160ms ease-out, border-color 160ms ease-out",
  };

  if (tier.highlighted) {
    return (
      <article
        className="glow-card"
        style={{
          ...base,
          border: "1px solid rgba(255,200,1,0.35)",
          background: "linear-gradient(160deg, rgba(17,76,90,0.7) 0%, rgba(13,27,36,0.95) 100%)",
          boxShadow: "0 0 0 1px rgba(255,200,1,0.08), inset 0 1px 0 rgba(255,200,1,0.12)",
        }}
        onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,200,1,0.2)"; }}
        onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 0 0 1px rgba(255,200,1,0.08), inset 0 1px 0 rgba(255,200,1,0.12)"; }}
        onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mouse-x", `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty("--mouse-y", `${((e.clientY - r.top) / r.height) * 100}%`); }}
        aria-label={`${tier.name} pricing plan`}
      >
        {/* Top badge */}
        <div style={{ position: "absolute", top: -1, left: 28 }}>
          <span className="font-mono" style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#FFC801", color: "#172B36", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: "0 0 8px 8px", letterSpacing: "0.06em" }}>
            <Icon name="arrow-trending-up" size={10} strokeColor="#172B36" /> MOST POPULAR
          </span>
        </div>

        <header style={{ marginBottom: 20, marginTop: 14 }}>
          <h3 className="font-mono" style={{ fontWeight: 700, fontSize: 22, color: "#F1F6F4", marginBottom: 5, letterSpacing: "-0.01em" }}>{tier.name}</h3>
          <p className="font-sans" style={{ fontSize: 13, color: "rgba(241,246,244,0.5)" }}>{tier.description}</p>
        </header>

        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span ref={priceRef} className="font-mono" style={{ fontWeight: 700, fontSize: 44, color: "#FFC801", lineHeight: 1, letterSpacing: "-0.02em" }} aria-live="polite" aria-atomic="true" />
            <span ref={periodRef} className="font-sans" style={{ fontSize: 13, color: "rgba(241,246,244,0.38)" }} />
          </div>
          <p className="font-sans" style={{ fontSize: 11, color: "rgba(241,246,244,0.28)", marginTop: 4 }}>Cancel anytime. No setup fees.</p>
        </div>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9, marginBottom: 24, flex: 1 }}>
          {tier.features.map((f) => (
            <li key={f} style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,200,1,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name="chevron-right" size={9} strokeColor="#FFC801" />
              </div>
              <span className="font-sans" style={{ fontSize: 13, color: "rgba(241,246,244,0.78)" }}>{f}</span>
            </li>
          ))}
        </ul>

        <button className="font-sans" style={{
          width: "100%", padding: "13px 0", borderRadius: 10, border: "none", cursor: "pointer",
          background: "#FFC801", color: "#172B36", fontWeight: 600, fontSize: 14,
          boxShadow: "0 4px 20px rgba(255,200,1,0.3)",
          transition: "background 150ms, transform 150ms", minHeight: 46,
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FF9932"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFC801"; }}
        >{tier.cta}</button>

        <div style={{ position: "absolute", bottom: 0, right: 0, width: 160, height: 160, background: "radial-gradient(circle at bottom right, rgba(255,200,1,0.06), transparent)", pointerEvents: "none" }} />
      </article>
    );
  }

  return (
    <article
      className="glow-card"
      style={{
        ...base,
        border: "1px solid rgba(255,255,255,0.08)",
        background: "linear-gradient(145deg, rgba(17,76,90,0.38) 0%, rgba(23,43,54,0.65) 100%)",
      }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,200,1,0.1)"; el.style.borderColor = "rgba(255,200,1,0.2)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; el.style.borderColor = "rgba(255,255,255,0.08)"; }}
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mouse-x", `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty("--mouse-y", `${((e.clientY - r.top) / r.height) * 100}%`); }}
      aria-label={`${tier.name} pricing plan`}
    >
      <header style={{ marginBottom: 20 }}>
        <h3 className="font-mono" style={{ fontWeight: 700, fontSize: 22, color: "#F1F6F4", marginBottom: 5, letterSpacing: "-0.01em" }}>{tier.name}</h3>
        <p className="font-sans" style={{ fontSize: 13, color: "rgba(241,246,244,0.44)" }}>{tier.description}</p>
      </header>

      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span ref={priceRef} className="font-mono" style={{ fontWeight: 700, fontSize: 44, color: "#F1F6F4", lineHeight: 1, letterSpacing: "-0.02em" }} aria-live="polite" aria-atomic="true" />
          <span ref={periodRef} className="font-sans" style={{ fontSize: 13, color: "rgba(241,246,244,0.35)" }} />
        </div>
        <p className="font-sans" style={{ fontSize: 11, color: "rgba(241,246,244,0.26)", marginTop: 4 }}>Cancel anytime. No setup fees.</p>
      </div>

      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9, marginBottom: 24, flex: 1 }}>
        {tier.features.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <Icon name="chevron-right" size={13} strokeColor="rgba(255,200,1,0.6)" className="shrink-0" />
            <span className="font-sans" style={{ fontSize: 13, color: "rgba(241,246,244,0.6)" }}>{f}</span>
          </li>
        ))}
      </ul>

      <button className="font-sans" style={{
        width: "100%", padding: "13px 0", borderRadius: 10, cursor: "pointer",
        background: "transparent", border: "1px solid rgba(255,255,255,0.14)",
        color: "rgba(241,246,244,0.72)", fontWeight: 500, fontSize: 14,
        transition: "border-color 150ms, color 150ms, background 150ms", minHeight: 46,
      }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,200,1,0.4)"; el.style.color = "#FFC801"; el.style.background = "rgba(255,200,1,0.05)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.14)"; el.style.color = "rgba(241,246,244,0.72)"; el.style.background = "transparent"; }}
      >{tier.cta}</button>
    </article>
  );
}
