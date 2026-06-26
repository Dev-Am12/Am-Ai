"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Icon from "./Icon";

const features = [
  { id: 0, icon: "chart-pie",         title: "Real-Time Analytics",     description: "Monitor pipeline health, throughput, and anomaly signals with sub-second dashboard refresh. Visual flame graphs surface bottlenecks instantly.", tag: "Observability",  accent: "#FFC801", span: "col-span-1 md:col-span-1 row-span-2" },
  { id: 1, icon: "cog-8-tooth",       title: "Visual Pipeline Builder", description: "Drag-and-drop DAG editor that compiles to optimized execution plans. No YAML, no ops tickets.", tag: "Engineering", accent: "#FF9932", span: "col-span-1 md:col-span-2" },
  { id: 2, icon: "cube-16-solid",     title: "Elastic Infrastructure",  description: "Auto-scaling compute that responds to load in <500ms. Pay only for what you process.", tag: "Infrastructure", accent: "#FFC801", span: "col-span-1" },
  { id: 3, icon: "arrow-path",        title: "Smart Sync Engine",       description: "Bidirectional sync with vector-based conflict resolution. Your data is always consistent.", tag: "Sync", accent: "#FF9932", span: "col-span-1" },
  { id: 4, icon: "link-solid",        title: "150+ Integrations",       description: "Native connectors for every warehouse, SaaS tool, and data source your team already uses.", tag: "Connectivity", accent: "#FFC801", span: "col-span-1" },
  { id: 5, icon: "arrow-trending-up", title: "Predictive Scaling",      description: "ML capacity forecasting that pre-provisions resources before traffic spikes arrive.", tag: "AI/ML", accent: "#FF9932", span: "col-span-1 md:col-span-1 row-span-2" },
];

interface AccordionItemProps {
  feature: typeof features[0];
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ feature, isOpen, onToggle }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.style.maxHeight = isOpen ? contentRef.current.scrollHeight + "px" : "0px";
  }, [isOpen]);

  return (
    <article className={`border rounded-2xl overflow-hidden transition-all duration-300 ease-out ${isOpen ? "border-forsythia/30 bg-nocturnal/80" : "border-white/8 bg-white/2 hover:border-white/15"}`}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left min-h-[52px] gap-3"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`acc-${feature.id}`}
      >
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-300 ${isOpen ? "bg-forsythia/15" : "bg-white/5"}`}>
            <Icon name={feature.icon} size={16} strokeColor={feature.accent} />
          </div>
          <span className="font-mono font-semibold text-arctic text-sm">{feature.title}</span>
        </div>
        <span className="transition-transform duration-300 ease-out shrink-0" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>
          <Icon name="chevron-down" size={16} strokeColor="#FFC801" />
        </span>
      </button>
      <div id={`acc-${feature.id}`} ref={contentRef}
        style={{ maxHeight: "0px", overflow: "hidden", transition: "max-height 300ms ease-in-out" }}>
        <div className="px-5 pb-5 pl-16">
          <span className="font-mono text-[10px] text-forsythia bg-forsythia/10 px-2 py-0.5 rounded-full mb-2 inline-block tracking-wider">{feature.tag}</span>
          <p className="font-sans text-arctic/60 text-sm leading-relaxed">{feature.description}</p>
        </div>
      </div>
    </article>
  );
}

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Context lock on breakpoint change
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches && activeIndex !== null) setActiveIndex((p) => p);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [activeIndex]);

  // Scroll entrance
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      section.animate(
        [{ opacity: "0", transform: "translateY(30px)" }, { opacity: "1", transform: "translateY(0)" }],
        { duration: 600, easing: "ease-out", fill: "forwards" }
      );
    }, { threshold: 0.08 });
    section.style.opacity = "0";
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  const handleMouseEnter = useCallback((id: number) => setActiveIndex(id), []);
  const handleMouseLeave = useCallback(() => setActiveIndex(null), []);

  return (
    <section id="features" ref={sectionRef} aria-labelledby="features-heading" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-oceanic via-[#0f2028] to-oceanic" />
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle, rgba(241,246,244,0.8) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 id="features-heading" className="font-mono font-bold text-4xl md:text-5xl text-arctic leading-tight">
            Everything you need.<br />
            <span className="text-arctic/40">Nothing you don&apos;t.</span>
          </h2>
          <p className="font-sans text-arctic/50 mt-4 leading-relaxed">
            Six core primitives. Infinite possibilities. Built for engineers who care about performance.
          </p>
        </div>

        {/* BENTO GRID — desktop */}
        <div className="hidden md:grid grid-cols-3 gap-4" style={{ gridAutoRows: "minmax(180px, auto)" }}>
          {features.map((f) => {
            const active = activeIndex === f.id;
            return (
              <article
                key={f.id}
                className={`${f.span} relative flex flex-col rounded-2xl p-6 cursor-pointer overflow-hidden border transition-all duration-300 ease-out`}
                style={{
                  background: active
                    ? "linear-gradient(135deg, rgba(17,76,90,0.85), rgba(23,43,54,0.95))"
                    : "linear-gradient(135deg, rgba(17,76,90,0.4), rgba(23,43,54,0.6))",
                  borderColor: active ? "rgba(255,200,1,0.35)" : "rgba(255,255,255,0.06)",
                  transform: active ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: active 
                    ? "0 24px 48px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,200,1,0.15)" 
                    : "0 4px 12px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={() => handleMouseEnter(f.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Tag pill & Icon */}
                <div className="flex justify-between items-start mb-auto">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ease-out ${active ? "bg-forsythia/20 scale-110 shadow-[0_0_15px_rgba(255,200,1,0.2)]" : "bg-white/5 scale-100"}`}>
                    <div style={{ transform: active ? "rotate(6deg)" : "rotate(0)", transition: "transform 300ms ease-out" }}>
                      <Icon name={f.icon} size={20} strokeColor={f.accent} />
                    </div>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border transition-all duration-300"
                    style={{ 
                      color: f.accent, 
                      borderColor: active ? `${f.accent}60` : `${f.accent}30`, 
                      background: active ? `${f.accent}20` : `${f.accent}10` 
                    }}>
                    {f.tag}
                  </span>
                </div>

                <div className="mt-5 relative z-10">
                  <h3 className="font-mono font-bold text-arctic text-base mb-2 leading-snug">{f.title}</h3>
                  <p className={`font-sans text-sm leading-relaxed transition-colors duration-300 ${active ? "text-arctic/80" : "text-arctic/45"}`}>
                    {f.description}
                  </p>
                </div>

                {/* Active: learn more link */}
                <div 
                  className="mt-4 flex items-center gap-1 text-xs font-mono text-forsythia relative z-10" 
                  style={{ 
                    opacity: active ? 1 : 0,
                    transform: active ? "translateY(0)" : "translateY(10px)",
                    transition: "opacity 300ms ease-out, transform 300ms ease-out" 
                  }}
                >
                  Learn more <Icon name="chevron-right" size={12} strokeColor="#FFC801" />
                </div>

                {/* Decorative corner gradient */}
                <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none transition-all duration-500 ease-out"
                  style={{ 
                    background: `radial-gradient(circle at bottom right, ${f.accent}${active ? '15' : '08'}, transparent)`, 
                    opacity: active ? 1 : 0.5,
                    transform: active ? "scale(1.5)" : "scale(1)"
                  }} />
              </article>
            );
          })}
        </div>

        {/* ACCORDION — mobile */}
        <div className="md:hidden flex flex-col gap-2.5">
          {features.map((f) => (
            <AccordionItem
              key={f.id}
              feature={f}
              isOpen={activeIndex === f.id}
              onToggle={() => setActiveIndex(activeIndex === f.id ? null : f.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}