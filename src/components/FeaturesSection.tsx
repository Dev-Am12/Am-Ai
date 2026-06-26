"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "./Icon";

const features = [
  {
    id: 0, icon: "chart-pie", title: "Real-Time Analytics",
    description: "Sub-second pipeline health dashboards with flame graphs, anomaly signals, and auto-correlated traces across every stage of your data flow.",
    tag: "Observability", accent: "#FFC801", col: 1, row: 2,
  },
  {
    id: 1, icon: "cog-8-tooth", title: "Visual Pipeline Builder",
    description: "Drag-and-drop DAG editor that compiles directly to optimized execution plans. No YAML, no ops tickets. Just build.",
    tag: "Engineering", accent: "#FF9932", col: 2, row: 1,
  },
  {
    id: 2, icon: "cube-16-solid", title: "Elastic Infrastructure",
    description: "Auto-scaling compute responds to load in <500ms. Burst to 100× capacity without pre-provisioning or cold starts.",
    tag: "Infrastructure", accent: "#FFC801", col: 1, row: 1,
  },
  {
    id: 3, icon: "arrow-path", title: "Smart Sync Engine",
    description: "Bidirectional sync with vector-based conflict resolution. Data stays consistent across every source, warehouse, and downstream consumer.",
    tag: "Sync", accent: "#FF9932", col: 1, row: 1,
  },
  {
    id: 4, icon: "link-solid", title: "150+ Integrations",
    description: "Native connectors for Snowflake, BigQuery, Kafka, Postgres, Salesforce, and 145 more — all with schema evolution built in.",
    tag: "Connectivity", accent: "#FFC801", col: 1, row: 1,
  },
  {
    id: 5, icon: "arrow-trending-up", title: "Predictive Scaling",
    description: "ML-driven capacity forecasting pre-provisions resources before spikes arrive. Eliminate cold-start latency for good.",
    tag: "AI/ML", accent: "#FF9932", col: 1, row: 2,
  },
];

// Accordion for mobile
function AccordionItem({ feature, isOpen, onToggle }: { feature: typeof features[0]; isOpen: boolean; onToggle: () => void; }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.maxHeight = isOpen ? ref.current.scrollHeight + "px" : "0px";
  }, [isOpen]);

  return (
    <article style={{
      border: `1px solid ${isOpen ? "rgba(255,200,1,0.3)" : "rgba(255,255,255,0.08)"}`,
      borderRadius: 14, overflow: "hidden",
      background: isOpen ? "rgba(17,76,90,0.55)" : "rgba(255,255,255,0.025)",
      transition: "border-color 200ms, background 200ms",
    }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "none", border: "none", cursor: "pointer", gap: 12, minHeight: 52, textAlign: "left" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: isOpen ? `${feature.accent}20` : "rgba(255,255,255,0.06)", flexShrink: 0, transition: "background 200ms" }}>
            <Icon name={feature.icon} size={15} strokeColor={feature.accent} />
          </div>
          <span className="font-mono" style={{ fontSize: 13, fontWeight: 700, color: "#F1F6F4" }}>{feature.title}</span>
        </div>
        <span style={{ flexShrink: 0, transition: "transform 200ms ease-out", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
          <Icon name="chevron-down" size={16} strokeColor="#FFC801" />
        </span>
      </button>
      <div ref={ref} style={{ maxHeight: 0, overflow: "hidden", transition: "max-height 300ms ease-in-out" }}>
        <div style={{ padding: "0 18px 18px 62px" }}>
          <span className="font-mono" style={{ fontSize: 10, color: feature.accent, background: `${feature.accent}14`, padding: "2px 8px", borderRadius: 999, display: "inline-block", marginBottom: 8, letterSpacing: "0.07em" }}>{feature.tag}</span>
          <p className="font-sans" style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(241,246,244,0.58)" }}>{feature.description}</p>
        </div>
      </div>
    </article>
  );
}

// Stripe-style interactive bento card with cursor glow
function BentoCard({ feature, isActive, onEnter, onLeave }: {
  feature: typeof features[0];
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const cardRef = useRef<HTMLElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mouse-x", `${x}%`);
    el.style.setProperty("--mouse-y", `${y}%`);
  }, []);

  return (
    <article
      ref={cardRef}
      className="glow-card"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMouseMove}
      style={{
        gridColumn: `span ${feature.col}`,
        gridRow: `span ${feature.row}`,
        display: "flex", flexDirection: "column",
        borderRadius: 16, padding: "22px 22px",
        cursor: "default", overflow: "hidden",
        border: `1px solid ${isActive ? "rgba(255,200,1,0.25)" : "rgba(255,255,255,0.07)"}`,
        background: isActive
          ? "linear-gradient(145deg, rgba(17,76,90,0.9) 0%, rgba(13,31,40,0.95) 100%)"
          : "linear-gradient(145deg, rgba(17,76,90,0.4) 0%, rgba(23,43,54,0.65) 100%)",
        transform: isActive ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isActive
          ? "0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,200,1,0.1)"
          : "0 2px 16px rgba(0,0,0,0.2)",
        transition: "transform 160ms ease-out, box-shadow 160ms ease-out, border-color 160ms ease-out, background 160ms ease-out",
      }}
    >
      {/* Top row: icon + tag */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: 40, height: 40, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          background: isActive ? `${feature.accent}1e` : "rgba(255,255,255,0.06)",
          border: `1px solid ${isActive ? `${feature.accent}30` : "rgba(255,255,255,0.06)"}`,
          transition: "background 160ms, border-color 160ms",
        }}>
          <Icon name={feature.icon} size={18} strokeColor={feature.accent} />
        </div>
        <span className="font-mono" style={{
          fontSize: 10, letterSpacing: "0.07em", textTransform: "uppercase",
          color: feature.accent, background: `${feature.accent}12`,
          padding: "3px 9px", borderRadius: 999,
          border: `1px solid ${feature.accent}28`,
        }}>
          {feature.tag}
        </span>
      </div>

      {/* Text */}
      <div style={{ marginTop: "auto", paddingTop: 18 }}>
        <h3 className="font-mono" style={{ fontSize: 15, fontWeight: 700, color: "#F1F6F4", marginBottom: 9, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
          {feature.title}
        </h3>
        <p className="font-sans" style={{
          fontSize: 13, lineHeight: 1.65,
          color: isActive ? "rgba(241,246,244,0.65)" : "rgba(241,246,244,0.38)",
          transition: "color 160ms",
        }}>
          {feature.description}
        </p>
      </div>

      {/* Hover CTA */}
      <div style={{
        display: "flex", alignItems: "center", gap: 5, marginTop: 14,
        opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 200ms, transform 200ms",
      }}>
        <span className="font-mono" style={{ fontSize: 11, color: "#FFC801" }}>Learn more</span>
        <Icon name="chevron-right" size={11} strokeColor="#FFC801" />
      </div>

      {/* Decorative corner */}
      <div style={{
        position: "absolute", bottom: 0, right: 0, width: 100, height: 100, pointerEvents: "none",
        background: `radial-gradient(circle at bottom right, ${feature.accent}09, transparent)`,
        opacity: isActive ? 1 : 0.4, transition: "opacity 160ms",
      }} />
    </article>
  );
}

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Context lock
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const h = (e: MediaQueryListEvent) => { if (e.matches && activeIndex !== null) setActiveIndex((p) => p); };
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [activeIndex]);

  // Scroll entrance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.opacity = "0";
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      el.animate([{ opacity: "0", transform: "translateY(30px)" }, { opacity: "1", transform: "translateY(0)" }], { duration: 600, easing: "ease-out", fill: "forwards" });
    }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} aria-labelledby="features-heading" style={{ position: "relative", padding: "104px 0", overflow: "hidden" }}>
      {/* bg */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #172B36 0%, #0f2028 50%, #172B36 100%)" }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.028, backgroundImage: "radial-gradient(circle, rgba(241,246,244,0.9) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Section header — clean, no pill */}
        <div style={{ marginBottom: 56, maxWidth: 580 }}>
          <p className="font-mono" style={{ fontSize: 12, color: "rgba(255,200,1,0.7)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
            Platform Capabilities
          </p>
          <h2 id="features-heading" className="font-mono" style={{ fontWeight: 700, fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#F1F6F4" }}>
            Everything you need.{" "}
            <span style={{ color: "rgba(241,246,244,0.32)" }}>Nothing you don&apos;t.</span>
          </h2>
          <p className="font-sans" style={{ fontSize: 15, color: "rgba(241,246,244,0.48)", marginTop: 14, lineHeight: 1.65 }}>
            Six core primitives. Infinite possibilities. Built for engineers who care about performance.
          </p>
        </div>

        {/* BENTO — desktop, CSS grid handles spans */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "minmax(190px, auto)",
            gap: 12,
          }}
          className="hidden md:grid"
        >
          {features.map((f) => (
            <BentoCard
              key={f.id}
              feature={f}
              isActive={activeIndex === f.id}
              onEnter={() => setActiveIndex(f.id)}
              onLeave={() => setActiveIndex(null)}
            />
          ))}
        </div>

        {/* ACCORDION — mobile */}
        <div className="md:hidden" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {features.map((f) => (
            <AccordionItem key={f.id} feature={f}
              isOpen={activeIndex === f.id}
              onToggle={() => setActiveIndex(activeIndex === f.id ? null : f.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
