"use client";
import Icon from "./Icon";

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      {/* ── Background layers ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        {/* Base */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #172B36 0%, #0d2330 50%, #0a1a22 100%)" }} />
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.035,
          backgroundImage: "radial-gradient(circle, rgba(241,246,244,0.9) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
        {/* Glow orbs */}
        <div className="hero-glow-1" style={{
          position: "absolute", top: -120, left: -120, width: 560, height: 560, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,200,1,0.09) 0%, transparent 65%)",
          filter: "blur(70px)",
        }} />
        <div className="hero-glow-2" style={{
          position: "absolute", top: "20%", right: -60, width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(17,76,90,0.7) 0%, transparent 65%)",
          filter: "blur(80px)",
        }} />
        <div className="hero-glow-3" style={{
          position: "absolute", bottom: "5%", left: "35%", width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,153,50,0.055) 0%, transparent 65%)",
          filter: "blur(60px)",
        }} />
      </div>

      {/* ── Main content ── */}
      <div style={{
        position: "relative", zIndex: 10, flex: 1,
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center",
        padding: "128px 24px 40px", maxWidth: 1280, margin: "0 auto", width: "100%",
      }}>

        {/* Transparent Interactive Button (Replaced Pill) */}
        <a
          href="#features"
          style={{
            animation: "fadeSlideUp 0.5s ease-out 0ms both",
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "8px 18px", borderRadius: 9999,
            background: "transparent", border: "1px solid rgba(255,255,255,0.08)",
            textDecoration: "none", color: "rgba(241,246,244,0.6)",
            transition: "all 200ms ease",
            marginBottom: 32, cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(255,255,255,0.03)";
            el.style.borderColor = "rgba(255,255,255,0.2)";
            el.style.color = "rgba(241,246,244,0.9)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "transparent";
            el.style.borderColor = "rgba(255,255,255,0.08)";
            el.style.color = "rgba(241,246,244,0.6)";
          }}
        >
          {/* Pulsing online indicator */}
          {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 8, height: 8, borderRadius: "50%", background: "#28C840", boxShadow: "0 0 8px rgba(40,200,64,0.6)" }} className="animate-pulse" /> */}
          <span className="font-mono" style={{ fontSize: 12, letterSpacing: "0.02em" }}>Real-time AI pipelines active</span>
          <Icon name="chevron-right" size={12} strokeColor="currentColor" />
        </a>

        {/* Headline */}
        <h1
          id="hero-heading"
          className="font-mono font-bold"
          style={{ fontSize: "clamp(40px, 7vw, 82px)", lineHeight: 1.06, letterSpacing: "-0.02em", maxWidth: 900 }}
        >
          <span className="text-arctic block" style={{ animation: "fadeSlideUp 0.6s ease-out 80ms both" }}>
            Automate Everything.
          </span>
          <span className="shimmer-text block" style={{ animation: "fadeSlideUp 0.6s ease-out 180ms both" }}>
            Scale Infinitely.
          </span>
        </h1>

        {/* Sub copy */}
        <p
          className="font-sans text-arctic/55"
          style={{ fontSize: 18, lineHeight: 1.65, maxWidth: 560, marginTop: 24, animation: "fadeSlideUp 0.6s ease-out 280ms both" }}
        >
          AmAi ingests, transforms, and routes your data in milliseconds.
          The AI-native pipeline platform built for teams that ship.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center",
            marginTop: 40, animation: "fadeSlideUp 0.6s ease-out 380ms both",
          }}
        >
          <a
            href="#pricing"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#FFC801", color: "#172B36",
              fontFamily: "var(--font-family-sans)", fontWeight: 600, fontSize: 14,
              padding: "14px 28px", borderRadius: 9999,
              boxShadow: "0 4px 24px rgba(255,200,1,0.28)",
              transition: "background 150ms ease-out, transform 150ms ease-out",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FF9932"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFC801"; }}
          >
            Start building free
            <Icon name="arrow-trending-up" size={15} strokeColor="#172B36" />
          </a>
          <a
            href="#features"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "1px solid rgba(241,246,244,0.14)", color: "rgba(241,246,244,0.72)",
              fontFamily: "var(--font-family-sans)", fontWeight: 500, fontSize: 14,
              padding: "14px 28px", borderRadius: 9999,
              transition: "border-color 150ms, color 150ms, background 150ms",
              textDecoration: "none",
              background: "transparent",
            }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(241,246,244,0.28)"; el.style.color = "#F1F6F4"; el.style.background = "rgba(255,255,255,0.04)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(241,246,244,0.14)"; el.style.color = "rgba(241,246,244,0.72)"; el.style.background = "transparent"; }}
          >
            See how it works
            <Icon name="chevron-right" size={14} strokeColor="currentColor" />
          </a>
        </div>

        {/* Trust ticker */}
        <div style={{ marginTop: 64, width: "100%", animation: "fadeSlideUp 0.6s ease-out 500ms both" }}>
          <p className="font-mono text-arctic/30 uppercase" style={{ fontSize: 10, letterSpacing: "0.12em", marginBottom: 20 }}>
            Trusted by teams at
          </p>
          <div style={{
            overflow: "hidden", position: "relative",
            maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          }}>
            <div className="animate-ticker ticker-track" style={{ display: "flex", gap: 56, alignItems: "center", whiteSpace: "nowrap", width: "max-content" }}>
              {["Anthropic", "Vercel", "Linear", "Notion", "Figma", "Stripe", "Raycast", "Framer",
                "Anthropic", "Vercel", "Linear", "Notion", "Figma", "Stripe", "Raycast", "Framer"].map((name, i) => (
                  <span key={i} className="font-mono font-semibold text-arctic/20" style={{ fontSize: 13, flexShrink: 0 }}>{name}</span>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Dashboard mockup ── */}
      <div
        style={{
          position: "relative", zIndex: 10,
          padding: "0 24px", maxWidth: 1000, margin: "0 auto", width: "100%",
          animation: "fadeSlideUp 0.8s ease-out 560ms both",
        }}
      >
        <div style={{
          borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)",
          overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.55)",
          background: "linear-gradient(160deg, rgba(17,76,90,0.55) 0%, rgba(23,43,54,0.92) 100%)",
        }}>
          {/* Window bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.03)",
          }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FF5F57", display: "block" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FEBC2E", display: "block" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28C840", display: "block" }} />
            <span className="font-mono text-arctic/30" style={{ marginLeft: 12, fontSize: 11 }}>amai — pipeline console</span>
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(255,255,255,0.04)" }}>
            {[
              { label: "ACTIVE PIPELINES", value: "1,284", delta: "+12 this hour", icon: "arrow-trending-up", color: "#FFC801" },
              { label: "EVENTS / SEC", value: "94.3K", delta: "+5.2% this hour", icon: "chart-pie", color: "#FF9932" },
              { label: "AVG LATENCY", value: "1.8ms", delta: "↓0.3ms this hour", icon: "cog-8-tooth", color: "#FFC801" },
            ].map((stat) => (
              <div key={stat.label} style={{
                padding: "18px 20px",
                background: "rgba(23,43,54,0.85)",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span className="font-mono text-arctic/40" style={{ fontSize: 10, letterSpacing: "0.1em" }}>{stat.label}</span>
                  <Icon name={stat.icon} size={14} strokeColor={stat.color} />
                </div>
                <div className="font-mono font-bold text-arctic" style={{ fontSize: 26 }}>{stat.value}</div>
                <div className="font-mono" style={{ fontSize: 10, marginTop: 4, color: stat.color }}>{stat.delta}</div>
              </div>
            ))}
          </div>

          {/* Log stream */}
          <div style={{ padding: "14px 18px", background: "rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { time: "14:32:01", msg: "Pipeline [customer-events] → 12,400 events flushed to warehouse", ok: true },
              { time: "14:32:00", msg: "AutoScale triggered — allocated 3 additional compute nodes", ok: true },
              { time: "14:31:58", msg: "Anomaly detector flagged spike in error_rate for [payments-ingest]", ok: false },
            ].map((log, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span className="font-mono text-arctic/25" style={{ fontSize: 11, flexShrink: 0 }}>{log.time}</span>
                <span className="font-mono" style={{ fontSize: 11, color: log.ok ? "rgba(241,246,244,0.48)" : "rgba(255,153,50,0.85)" }}>{log.msg}</span>
              </div>
            ))}
            
            {/* Active working cursor log */}
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginTop: 4 }}>
              <span className="font-mono text-arctic/25" style={{ fontSize: 11, flexShrink: 0 }}>14:32:02</span>
              <span className="font-mono" style={{ fontSize: 11, color: "rgba(241,246,244,0.6)", display: "flex", alignItems: "center" }}>
                Listening for incoming events
                <span className="animate-pulse" style={{ letterSpacing: "2px", margin: "0 4px" }}>...</span>
                {/* Blinking terminal cursor block */}
                <span style={{ display: "inline-block", width: 6, height: 12, background: "#FFC801", marginLeft: 6 }} className="animate-pulse" />
              </span>
            </div>
          </div>
        </div>
        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 24, right: 24, height: 60,
          background: "linear-gradient(to top, #172B36, transparent)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Scroll cue */}
      <a
        href="#stats"
        style={{
          position: "relative", zIndex: 10,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          padding: "24px 0 32px", color: "rgba(241,246,244,0.2)",
          textDecoration: "none", transition: "color 200ms",
          animation: "fadeSlideUp 0.5s ease-out 900ms both",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(241,246,244,0.45)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(241,246,244,0.2)"; }}
      >
        <span className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: "0.14em" }}>Scroll</span>
        <Icon name="chevron-down" size={16} strokeColor="currentColor" />
      </a>
    </section>
  );
}