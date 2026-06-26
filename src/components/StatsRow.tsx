"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "./Icon";

const features = [
  { id: 0, icon: "chart-pie", title: "Real-Time Analytics", description: "Monitor pipeline health, throughput, and anomaly signals with sub-second refresh. Visual flame graphs surface bottlenecks instantly.", tag: "Observability", accent: "#FFC801", colSpan: 1, rowSpan: 2 },
  { id: 1, icon: "cog-8-tooth", title: "Visual Pipeline Builder", description: "Drag-and-drop DAG editor that compiles to optimized execution plans. No YAML, no ops tickets, no waiting.", tag: "Engineering", accent: "#FF9932", colSpan: 2, rowSpan: 1 },
  { id: 2, icon: "cube-16-solid", title: "Elastic Infrastructure", description: "Auto-scaling compute responds to load in <500ms. Pay only for what you process.", tag: "Infrastructure", accent: "#FFC801", colSpan: 1, rowSpan: 1 },
  { id: 3, icon: "arrow-path", title: "Smart Sync Engine", description: "Bidirectional sync with vector-based conflict resolution. Your data stays consistent across every source.", tag: "Sync", accent: "#FF9932", colSpan: 1, rowSpan: 1 },
  { id: 4, icon: "link-solid", title: "150+ Integrations", description: "Native connectors for every warehouse, SaaS tool, and data source your team already uses.", tag: "Connectivity", accent: "#FFC801", colSpan: 1, rowSpan: 1 },
  { id: 5, icon: "arrow-trending-up", title: "Predictive Scaling", description: "ML-driven capacity forecasting pre-provisions resources before traffic spikes arrive.", tag: "AI/ML", accent: "#FF9932", colSpan: 1, rowSpan: 2 },
];

interface AccordionItemProps { feature: typeof features[0]; isOpen: boolean; onToggle: () => void; }

function AccordionItem({ feature, isOpen, onToggle }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.style.maxHeight = isOpen ? contentRef.current.scrollHeight + "px" : "0px";
  }, [isOpen]);

  return (
    <article style={{
      border: `1px solid ${isOpen ? "rgba(255,200,1,0.28)" : "rgba(255,255,255,0.08)"}`,
      borderRadius: 16, overflow: "hidden",
      background: isOpen ? "rgba(17,76,90,0.6)" : "rgba(255,255,255,0.02)",
      transition: "border-color 200ms, background 200ms",
    }}>
      <button
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "none", border: "none", cursor: "pointer", gap: 12, minHeight: 52, textAlign: "left" }}
        onClick={onToggle} aria-expanded={isOpen} aria-controls={`acc-${feature.id}`}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: isOpen ? "rgba(255,200,1,0.15)" : "rgba(255,255,255,0.06)", transition: "background 200ms", flexShrink: 0 }}>
            <Icon name={feature.icon} size={15} strokeColor={feature.accent} />
          </div>
          <span className="font-mono" style={{ fontSize: 14, fontWeight: 700, color: "#F1F6F4" }}>{feature.title}</span>
        </div>
        <span style={{ transition: "transform 200ms ease-out", transform: isOpen ? "rotate(180deg)" : "rotate(0)", flexShrink: 0 }}>
          <Icon name="chevron-down" size={16} strokeColor="#FFC801" />
        </span>
      </button>
      <div id={`acc-${feature.id}`} ref={contentRef} style={{ maxHeight: 0, overflow: "hidden", transition: "max-height 300ms ease-in-out" }}>
        <div style={{ padding: "0 20px 20px 64px" }}>
          <span className="font-mono" style={{ fontSize: 10, color: feature.accent, background: `${feature.accent}14`, padding: "2px 8px", borderRadius: 999, display: "inline-block", marginBottom: 8, letterSpacing: "0.08em" }}>
            {feature.tag}
          </span>
          <p className="font-sans" style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(241,246,244,0.6)", margin: 0 }}>{feature.description}</p>
        </div>
      </div>
    </article>
  );
}

export default function StatsRow() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const h = (e: MediaQueryListEvent) => { if (e.matches && activeIndex !== null) setActiveIndex((p) => p); };
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [activeIndex]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.opacity = "0";
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      el.animate([{ opacity: "0", transform: "translateY(28px)" }, { opacity: "1", transform: "translateY(0)" }], { duration: 600, easing: "ease-out", fill: "forwards" });
    }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onEnter = useCallback((id: number) => setActiveIndex(id), []);
  const onLeave = useCallback(() => setActiveIndex(null), []);

  return (
    <section id="features" ref={sectionRef} aria-labelledby="features-heading" style={{ position: "relative", padding: "112px 0", overflow: "hidden" }}>
      <style>{`
        .bento-grid { display: none; }
        .bento-accordion { display: flex; flex-direction: column; gap: 10px; }
        @media (min-width: 768px) {
          .bento-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: minmax(190px, auto); gap: 14px; }
          .bento-accordion { display: none; }
        }
      `}</style>

      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #172B36 0%, #0f2028 50%, #172B36 100%)" }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "radial-gradient(circle, rgba(241,246,244,0.9) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Header - Fixed Alignment */}
        <div style={{ textAlign: "center", marginBottom: 64, maxWidth: 600, margin: "0 auto 64px auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "4px 14px", borderRadius: 999, border: "1px solid rgba(255,200,1,0.22)", background: "rgba(255,200,1,0.07)", marginBottom: 20 }}>
            <span className="font-mono" style={{ color: "#FFC801", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>Platform Capabilities</span>
          </div>
          <h2 id="features-heading" className="font-mono" style={{ color: "#F1F6F4", fontWeight: 700, fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
            Everything you need.<br />
            <span style={{ color: "rgba(241,246,244,0.3)" }}>Nothing you don&apos;t.</span>
          </h2>
          <p className="font-sans" style={{ color: "rgba(241,246,244,0.5)", fontSize: 16, marginTop: 16, lineHeight: 1.6 }}>
            Six core primitives. Infinite possibilities. Built for engineers who care about performance.
          </p>
        </div>

        {/* BENTO — desktop */}
        <div className="bento-grid">
          {features.map((f) => {
            const active = activeIndex === f.id;
            return (
              <article
                key={f.id}
                style={{
                  gridColumn: `span ${f.colSpan}`,
                  gridRow: `span ${f.rowSpan}`,
                  position: "relative", display: "flex", flexDirection: "column",
                  borderRadius: 18, padding: "22px", cursor: "pointer", overflow: "hidden",
                  border: `1px solid ${active ? "rgba(255,200,1,0.35)" : "rgba(255,255,255,0.07)"}`,
                  background: active
                    ? "linear-gradient(145deg, rgba(17,76,90,0.85), rgba(23,43,54,0.95))"
                    : "linear-gradient(145deg, rgba(17,76,90,0.38), rgba(23,43,54,0.6))",
                  transform: active ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: active ? "0 24px 48px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,200,1,0.15)" : "0 2px 12px rgba(0,0,0,0.18)",
                  transition: "transform 300ms ease-out, box-shadow 300ms ease-out, border-color 300ms ease-out, background 300ms ease-out",
                }}
                onMouseEnter={() => onEnter(f.id)}
                onMouseLeave={onLeave}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: active ? `${f.accent}20` : "rgba(255,255,255,0.06)", transform: active ? "scale(1.1)" : "scale(1)", transition: "all 300ms ease-out", flexShrink: 0 }}>
                    <div style={{ transform: active ? "rotate(6deg)" : "rotate(0)", transition: "transform 300ms ease-out" }}>
                      <Icon name={f.icon} size={20} strokeColor={f.accent} />
                    </div>
                  </div>
                  <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: f.accent, background: active ? `${f.accent}20` : `${f.accent}10`, padding: "3px 8px", borderRadius: 999, border: `1px solid ${active ? f.accent+'60' : f.accent+'30'}`, transition: "all 300ms" }}>
                    {f.tag}
                  </span>
                </div>
                <div style={{ marginTop: "auto", paddingTop: 20, position: "relative", zIndex: 10 }}>
                  <h3 className="font-mono" style={{ color: "#F1F6F4", fontWeight: 700, fontSize: 15, marginBottom: 8, lineHeight: 1.3 }}>{f.title}</h3>
                  <p className="font-sans" style={{ fontSize: 13, lineHeight: 1.6, margin: 0, color: active ? "rgba(241,246,244,0.8)" : "rgba(241,246,244,0.45)", transition: "color 300ms" }}>
                    {f.description}
                  </p>
                </div>
                <div className="font-mono" style={{ display: "flex", alignItems: "center", gap: 4, color: "#FFC801", fontSize: 11, marginTop: 14, opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(10px)", transition: "all 300ms ease-out", position: "relative", zIndex: 10 }}>
                  Learn more <Icon name="chevron-right" size={11} strokeColor="#FFC801" />
                </div>
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at bottom right, ${f.accent}${active ? '15' : '08'}, transparent)`, pointerEvents: "none", opacity: active ? 1 : 0.5, transform: active ? "scale(1.5)" : "scale(1)", transition: "all 500ms ease-out" }} />
              </article>
            );
          })}
        </div>

        {/* ACCORDION — mobile */}
        <div className="bento-accordion">
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