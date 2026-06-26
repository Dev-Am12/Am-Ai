"use client";
import Icon from "./Icon";

export default function CTASection() {
  return (
    <section aria-label="Get started with AmAi" style={{ position: "relative", padding: "104px 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "#114C5A" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,200,1,0.08) 0%, transparent 100%)" }} />
      <div className="section-divider" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div className="section-divider" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 960, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <p className="font-mono" style={{ fontSize: 11, color: "rgba(255,200,1,0.65)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
          Ready to ship faster?
        </p>
        <h2 className="font-mono" style={{ fontWeight: 700, fontSize: "clamp(32px, 5.5vw, 62px)", lineHeight: 1.06, letterSpacing: "-0.025em", color: "#F1F6F4", marginBottom: 20 }}>
          Your data pipeline.<br />
          <span className="shimmer-text">Built in minutes.</span>
        </h2>
        <p className="font-sans" style={{ fontSize: 16, color: "rgba(241,246,244,0.52)", maxWidth: 460, margin: "0 auto 36px", lineHeight: 1.65 }}>
          Join thousands of engineering teams who automated their data workflows with AmAi. Free to start, scales with you.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <a href="#pricing" className="font-sans" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#FFC801", color: "#172B36",
            fontWeight: 600, fontSize: 14,
            padding: "14px 30px", borderRadius: 9999,
            boxShadow: "0 4px 28px rgba(255,200,1,0.3)",
            textDecoration: "none", transition: "background 150ms, transform 150ms",
          }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#FF9932"; el.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#FFC801"; el.style.transform = "translateY(0)"; }}
          >
            Start building for free
            <Icon name="arrow-trending-up" size={15} strokeColor="#172B36" />
          </a>
          <a href="#features" className="font-sans" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid rgba(241,246,244,0.2)", color: "rgba(241,246,244,0.7)",
            fontWeight: 500, fontSize: 14,
            padding: "14px 30px", borderRadius: 9999,
            textDecoration: "none", background: "transparent",
            transition: "border-color 150ms, color 150ms, background 150ms",
          }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(241,246,244,0.35)"; el.style.color = "#F1F6F4"; el.style.background = "rgba(255,255,255,0.05)"; }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(241,246,244,0.2)"; el.style.color = "rgba(241,246,244,0.7)"; el.style.background = "transparent"; }}
          >
            See all features
            <Icon name="chevron-right" size={14} strokeColor="currentColor" />
          </a>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "10px 24px", marginTop: 28 }}>
          {["No credit card required", "14-day free trial", "Cancel anytime", "SOC 2 Type II"].map((t) => (
            <span key={t} className="font-sans" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(241,246,244,0.32)" }}>
              <Icon name="chevron-right" size={10} strokeColor="rgba(255,200,1,0.45)" />{t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
