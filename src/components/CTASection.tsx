"use client";
import Icon from "./Icon";

export default function CTASection() {
  return (
    <section aria-label="Get started with AmAi" style={{ position: "relative", padding: "112px 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#114C5A" }} />
      {/* Glow */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,200,1,0.07) 0%, transparent 100%)" }} />
      <div className="section-divider" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 896, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: 9999, border: "1px solid rgba(255,200,1,0.25)", backgroundColor: "rgba(255,200,1,0.1)", marginBottom: 28 }}>
          <Icon name="arrow-trending-up" size={13} strokeColor="#FFC801" />
          <span className="font-mono" style={{ color: "#FFC801", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>Ready to ship faster?</span>
        </div>
        <h2 className="font-mono" style={{ fontWeight: 700, fontSize: "clamp(36px, 5vw, 60px)", color: "#F1F6F4", lineHeight: 1.1, marginBottom: 24 }}>
          Your data pipeline.<br />
          <span className="shimmer-text">Built in minutes.</span>
        </h2>
        <p className="font-sans" style={{ color: "rgba(241,246,244,0.55)", fontSize: 18, maxWidth: 576, margin: "0 auto 40px", lineHeight: 1.6 }}>
          Join thousands of engineering teams who automated their data workflows with AmAi. Free to start, scales with you.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <a href="#pricing" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#FFC801", color: "#172B36", fontWeight: 600, fontFamily: "var(--font-family-sans)", padding: "16px 32px", borderRadius: 9999, textDecoration: "none", boxShadow: "0 20px 25px -5px rgba(255,200,1,0.25)", fontSize: 14, transition: "background-color 150ms" }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#FF9932"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#FFC801"}>
            Start building for free
            <Icon name="arrow-trending-up" size={15} strokeColor="#172B36" />
          </a>
          <a href="#features" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, border: "1px solid rgba(255,255,255,0.12)", color: "rgba(241,246,244,0.7)", fontWeight: 500, fontFamily: "var(--font-family-sans)", padding: "16px 32px", borderRadius: 9999, textDecoration: "none", fontSize: 14, transition: "all 150ms" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "#F1F6F4"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(241,246,244,0.7)"; e.currentTarget.style.backgroundColor = "transparent"; }}>
            See all features
            <Icon name="chevron-right" size={14} strokeColor="currentColor" />
          </a>
        </div>
        {/* Trust signals */}
        <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 24, color: "rgba(241,246,244,0.3)", fontFamily: "var(--font-family-sans)", fontSize: 12 }}>
          {["No credit card required", "14-day free trial", "Cancel anytime", "SOC 2 Type II"].map((t) => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Icon name="chevron-right" size={10} strokeColor="rgba(255,200,1,0.4)" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}