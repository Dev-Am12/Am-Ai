"use client";
import PipelineConsole from "./PipelineConsole";
import Icon from "./Icon";

export default function HeroSection() {
  const S: Record<string, React.CSSProperties> = {
    section: {
      position: "relative", minHeight: "100vh",
      display: "flex", flexDirection: "column", overflow: "hidden",
    },
    bg: { position: "absolute", inset: 0, zIndex: 0 },
    baseBg: {
      position: "absolute", inset: 0,
      background: "linear-gradient(145deg, #172B36 0%, #0e2230 45%, #091820 100%)",
    },
    dotGrid: {
      position: "absolute", inset: 0, opacity: 0.038,
      backgroundImage: "radial-gradient(circle, rgba(241,246,244,0.85) 1px, transparent 1px)",
      backgroundSize: "44px 44px",
    },
    glow1: {
      position: "absolute", top: -80, left: -100, width: 600, height: 600,
      borderRadius: "50%", filter: "blur(80px)",
      background: "radial-gradient(circle, rgba(255,200,1,0.1) 0%, transparent 65%)",
    },
    glow2: {
      position: "absolute", top: "15%", right: -80, width: 500, height: 500,
      borderRadius: "50%", filter: "blur(90px)",
      background: "radial-gradient(circle, rgba(17,76,90,0.75) 0%, transparent 65%)",
    },
    glow3: {
      position: "absolute", bottom: "10%", left: "30%", width: 420, height: 420,
      borderRadius: "50%", filter: "blur(70px)",
      background: "radial-gradient(circle, rgba(255,153,50,0.06) 0%, transparent 65%)",
    },
    content: {
      position: "relative", zIndex: 10, flex: 1,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", textAlign: "center",
      padding: "120px 24px 32px",
      maxWidth: 1280, margin: "0 auto", width: "100%",
    },
  };

  return (
    <section id="hero" aria-labelledby="hero-heading" style={S.section}>
      {/* Background */}
      <div aria-hidden="true" style={S.bg}>
        <div style={S.baseBg} />
        <div style={S.dotGrid} />
        <div className="hero-glow-1" style={S.glow1} />
        <div className="hero-glow-2" style={S.glow2} />
        <div className="hero-glow-3" style={S.glow3} />
      </div>

      {/* Content */}
      <div style={S.content}>
        {/* Headline — Stripe-style: huge, editorial, no pill */}
        <h1
          id="hero-heading"
          className="font-mono"
          style={{
            fontWeight: 700,
            fontSize: "clamp(42px, 7.5vw, 88px)",
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            maxWidth: 860,
            marginBottom: 0,
          }}
        >
          <span
            style={{ display: "block", color: "#F1F6F4", animation: "fadeSlideUp 0.6s ease-out 0ms both" }}
          >
            Automate Everything.
          </span>
          <span
            className="shimmer-text"
            style={{ display: "block", animation: "fadeSlideUp 0.6s ease-out 100ms both" }}
          >
            Scale Infinitely.
          </span>
        </h1>

        {/* Sub copy */}
        <p
          className="font-sans"
          style={{
            fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: 1.7,
            color: "rgba(241,246,244,0.52)", maxWidth: 520, marginTop: 24,
            animation: "fadeSlideUp 0.6s ease-out 200ms both",
          }}
        >
          AmAi ingests, transforms, and routes your data in milliseconds.
          The AI-native pipeline platform built for teams that ship.
        </p>

        {/* CTA row */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center",
          marginTop: 36, animation: "fadeSlideUp 0.6s ease-out 300ms both",
        }}>
          <a
            href="#pricing"
            className="font-sans"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#FFC801", color: "#172B36",
              fontWeight: 600, fontSize: 14,
              padding: "13px 26px", borderRadius: 9999,
              boxShadow: "0 4px 28px rgba(255,200,1,0.3)",
              transition: "background 150ms, transform 150ms, box-shadow 150ms",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#FF9932"; el.style.transform = "translateY(-1px)"; el.style.boxShadow = "0 8px 36px rgba(255,153,50,0.35)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#FFC801"; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 4px 28px rgba(255,200,1,0.3)"; }}
          >
            Start building free
            <Icon name="arrow-trending-up" size={15} strokeColor="#172B36" />
          </a>
          <a
            href="#features"
            className="font-sans"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "1px solid rgba(241,246,244,0.16)", color: "rgba(241,246,244,0.68)",
              fontWeight: 500, fontSize: 14,
              padding: "13px 26px", borderRadius: 9999,
              transition: "border-color 150ms, color 150ms, background 150ms, transform 150ms",
              textDecoration: "none", background: "transparent",
            }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(241,246,244,0.32)"; el.style.color = "#F1F6F4"; el.style.background = "rgba(255,255,255,0.05)"; el.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(241,246,244,0.16)"; el.style.color = "rgba(241,246,244,0.68)"; el.style.background = "transparent"; el.style.transform = "translateY(0)"; }}
          >
            See how it works
            <Icon name="chevron-right" size={14} strokeColor="currentColor" />
          </a>
        </div>

        {/* Trust ticker */}
        <div style={{ marginTop: 52, width: "100%", animation: "fadeSlideUp 0.6s ease-out 420ms both" }}>
          <p className="font-mono" style={{ fontSize: 10, color: "rgba(241,246,244,0.28)", letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: 18 }}>
            Trusted by teams at
          </p>
          <div style={{
            overflow: "hidden", position: "relative",
            maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          }}>
            <div className="animate-ticker ticker-track" style={{ display: "flex", gap: 52, alignItems: "center", whiteSpace: "nowrap", width: "max-content" }}>
              {["Anthropic","Vercel","Linear","Notion","Figma","Stripe","Raycast","Framer",
                "Anthropic","Vercel","Linear","Notion","Figma","Stripe","Raycast","Framer"].map((name, i) => (
                <span key={i} className="font-mono" style={{ fontSize: 12, fontWeight: 600, color: "rgba(241,246,244,0.18)", flexShrink: 0 }}>{name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Console */}
      <div style={{
        position: "relative", zIndex: 10,
        padding: "0 24px 0", maxWidth: 980, margin: "0 auto", width: "100%",
        animation: "fadeSlideUp 0.9s ease-out 500ms both",
      }}>
        <PipelineConsole />
        {/* Gradient fade at bottom so it bleeds into next section */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
          background: "linear-gradient(to bottom, transparent, #172B36)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Scroll cue */}
      <a
        href="#stats"
        style={{
          position: "relative", zIndex: 10,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
          padding: "20px 0 28px", color: "rgba(241,246,244,0.18)",
          textDecoration: "none", transition: "color 200ms",
          animation: "fadeSlideUp 0.5s ease-out 800ms both",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(241,246,244,0.45)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(241,246,244,0.18)"; }}
      >
        <span className="font-mono" style={{ fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase" }}>Scroll</span>
        <Icon name="chevron-down" size={15} strokeColor="currentColor" />
      </a>
    </section>
  );
}
