"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "./Icon";

const features = [
  { id: 0, icon: "chart-pie",         title: "Real-Time Analytics",     description: "Sub-second pipeline health dashboards with flame graphs, anomaly signals, and auto-correlated traces across every stage of your data flow.", tag: "Observability",  accent: "#FFC801", col: 1, row: 2 },
  { id: 1, icon: "cog-8-tooth",       title: "Visual Pipeline Builder", description: "Drag-and-drop DAG editor that compiles directly to optimized execution plans. No YAML, no ops tickets. Just build.",                        tag: "Engineering",    accent: "#FF9932", col: 2, row: 1 },
  { id: 2, icon: "cube-16-solid",     title: "Elastic Infrastructure",  description: "Auto-scaling compute responds to load in <500ms. Burst to 100× capacity without pre-provisioning or cold starts.",                            tag: "Infrastructure", accent: "#FFC801", col: 1, row: 1 },
  { id: 3, icon: "arrow-path",        title: "Smart Sync Engine",       description: "Bidirectional sync with vector-based conflict resolution. Data stays consistent across every source, warehouse, and downstream consumer.",      tag: "Sync",           accent: "#FF9932", col: 1, row: 1 },
  { id: 4, icon: "link-solid",        title: "150+ Integrations",       description: "Native connectors for Snowflake, BigQuery, Kafka, Postgres, Salesforce, and 145 more — all with schema evolution built in.",                   tag: "Connectivity",   accent: "#FFC801", col: 1, row: 1 },
  { id: 5, icon: "arrow-trending-up", title: "Predictive Scaling",      description: "ML-driven capacity forecasting pre-provisions resources before spikes arrive. Eliminate cold-start latency for good.",                         tag: "AI/ML",          accent: "#FF9932", col: 1, row: 2 },
];

function AccordionItem({ feature, isOpen, onToggle }: { feature: typeof features[0]; isOpen: boolean; onToggle: () => void }) {
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
      <button onClick={onToggle} aria-expanded={isOpen}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 18px", background: "none", border: "none", cursor: "pointer", gap: 12, minHeight: 54, textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", background: isOpen ? `${feature.accent}20` : "rgba(255,255,255,0.07)", flexShrink: 0, transition: "background 200ms" }}>
            <Icon name={feature.icon} size={16} strokeColor={feature.accent} />
          </div>
          <span className="font-mono" style={{ fontSize: 14, fontWeight: 700, color: "#F1F6F4", letterSpacing: "-0.01em" }}>{feature.title}</span>
        </div>
        <span style={{ flexShrink: 0, transition: "transform 200ms ease-out", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
          <Icon name="chevron-down" size={16} strokeColor="#FFC801" />
        </span>
      </button>
      <div ref={ref} style={{ maxHeight: 0, overflow: "hidden", transition: "max-height 300ms ease-in-out" }}>
        <div style={{ padding: "0 18px 18px 64px" }}>
          <p className="font-sans" style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(241,246,244,0.58)" }}>{feature.description}</p>
        </div>
      </div>
    </article>
  );
}

function BentoCard({ feature, isActive, onEnter, onLeave }: { feature: typeof features[0]; isActive: boolean; onEnter: () => void; onLeave: () => void }) {
  const cardRef = useRef<HTMLElement>(null);
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--mouse-y", `${((e.clientY - r.top) / r.height) * 100}%`);
  }, []);

  return (
    <article ref={cardRef} className="glow-card"
      onMouseEnter={onEnter} onMouseLeave={onLeave} onMouseMove={onMouseMove}
      style={{
        gridColumn: `span ${feature.col}`,
        gridRow: `span ${feature.row}`,
        display: "flex", flexDirection: "column",
        borderRadius: 16, padding: "22px",
        overflow: "hidden", cursor: "default",
        border: `1px solid ${isActive ? "rgba(255,200,1,0.28)" : "rgba(255,255,255,0.075)"}`,
        background: isActive
          ? "linear-gradient(145deg, rgba(17,76,90,0.92) 0%, rgba(13,31,40,0.97) 100%)"
          : "linear-gradient(145deg, rgba(17,76,90,0.42) 0%, rgba(23,43,54,0.68) 100%)",
        transform: isActive ? "translateY(-4px) scale(1.006)" : "translateY(0) scale(1)",
        boxShadow: isActive
          ? "0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,200,1,0.12), inset 0 1px 0 rgba(255,200,1,0.06)"
          : "0 2px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)",
        transition: "transform 160ms ease-out, box-shadow 160ms ease-out, border-color 160ms ease-out, background 160ms ease-out",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{
          width: 42, height: 42, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          background: isActive ? `${feature.accent}1e` : "rgba(255,255,255,0.06)",
          border: `1px solid ${isActive ? `${feature.accent}32` : "rgba(255,255,255,0.06)"}`,
          transition: "background 160ms, border-color 160ms",
        }}>
          <Icon name={feature.icon} size={19} strokeColor={feature.accent} />
        </div>
        {/* Tag — text only, no pill border */}
        <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.07em", textTransform: "uppercase", color: `${feature.accent}cc` }}>
          {feature.tag}
        </span>
      </div>

      <div style={{ marginTop: "auto", paddingTop: 20 }}>
        <h3 className="font-mono" style={{ fontSize: 15, fontWeight: 700, color: "#F1F6F4", marginBottom: 10, lineHeight: 1.3, letterSpacing: "-0.01em" }}>
          {feature.title}
        </h3>
        <p className="font-sans" style={{ fontSize: 13, lineHeight: 1.65, color: isActive ? "rgba(241,246,244,0.65)" : "rgba(241,246,244,0.38)", transition: "color 160ms" }}>
          {feature.description}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 16, opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(6px)", transition: "opacity 200ms, transform 200ms" }}>
        <span className="font-mono" style={{ fontSize: 11, color: "#FFC801" }}>Learn more</span>
        <Icon name="chevron-right" size={11} strokeColor="#FFC801" />
      </div>

      <div style={{ position: "absolute", bottom: 0, right: 0, width: 120, height: 120, pointerEvents: "none", background: `radial-gradient(circle at bottom right, ${feature.accent}0a, transparent)`, opacity: isActive ? 1 : 0.5, transition: "opacity 160ms" }} />
    </article>
  );
}

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [desktop, setDesktop] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // JS-based responsive detection (no Tailwind classes)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = (e: MediaQueryListEvent | MediaQueryList) => setDesktop(e.matches);
    set(mq); mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // Context lock
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
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

  const onEnter = useCallback((id: number) => setActiveIndex(id), []);
  const onLeave = useCallback(() => setActiveIndex(null), []);

  return (
    <section id="features" ref={sectionRef} aria-labelledby="features-heading"
      style={{ position: "relative", padding: "108px 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #172B36 0%, #0f2028 50%, #172B36 100%)" }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.028, backgroundImage: "radial-gradient(circle, rgba(241,246,244,0.85) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Section header — no pill, clean label */}
        <div style={{ marginBottom: 56, maxWidth: 600 }}>
          <p className="font-mono" style={{ fontSize: 11, color: "rgba(255,200,1,0.65)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Platform Capabilities
          </p>
          <h2 id="features-heading" className="font-mono"
            style={{ fontWeight: 700, fontSize: "clamp(30px, 4vw, 50px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#F1F6F4" }}>
            Everything you need.{" "}
            <span style={{ color: "rgba(241,246,244,0.3)" }}>Nothing you don&apos;t.</span>
          </h2>
          <p className="font-sans" style={{ fontSize: 15, color: "rgba(241,246,244,0.48)", marginTop: 14, lineHeight: 1.65 }}>
            Six core primitives. Infinite possibilities. Built for engineers who care about performance.
          </p>
        </div>

        {/* BENTO — only rendered on desktop via JS state, not hidden Tailwind class */}
        {desktop && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "minmax(195px, auto)", gap: 12 }}>
            {features.map((f) => (
              <BentoCard key={f.id} feature={f} isActive={activeIndex === f.id} onEnter={() => onEnter(f.id)} onLeave={onLeave} />
            ))}
          </div>
        )}

        {/* ACCORDION — only rendered on mobile via JS state */}
        {!desktop && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {features.map((f) => (
              <AccordionItem key={f.id} feature={f} isOpen={activeIndex === f.id} onToggle={() => setActiveIndex(activeIndex === f.id ? null : f.id)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
