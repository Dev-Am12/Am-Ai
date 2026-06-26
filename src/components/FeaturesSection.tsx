"use client";
import { useState, useEffect, useRef } from "react";
import Icon from "./Icon";

const features = [
    { id: 0, icon: "chart-pie", title: "Real-Time Analytics", description: "Monitor pipeline health, throughput, and anomaly signals with sub-second dashboard refresh rates.", tag: "Observability", accent: "#FFC801" },
    { id: 1, icon: "cog-8-tooth", title: "Visual Pipeline Builder", description: "Drag-and-drop DAG editor that compiles to optimized execution plans. No YAML required.", tag: "Engineering", accent: "#FF9932" },
    { id: 2, icon: "cube-16-solid", title: "Elastic Infrastructure", description: "Auto-scaling compute that responds to load in <500ms. Pay only for what you process.", tag: "Infrastructure", accent: "#FFC801" },
    { id: 3, icon: "arrow-path", title: "Smart Sync Engine", description: "Bidirectional data sync with conflict resolution powered by vector-based reconciliation.", tag: "Sync", accent: "#FF9932" },
    { id: 4, icon: "link-solid", title: "150+ Integrations", description: "Native connectors for every major data source, warehouse, and SaaS tool your team uses.", tag: "Connectivity", accent: "#FFC801" },
    { id: 5, icon: "arrow-trending-up", title: "Predictive Scaling", description: "ML-driven capacity forecasting that pre-provisions resources before your traffic spikes.", tag: "AI/ML", accent: "#FF9932" },
];

// Bento layout spans
const bentoSpans: { col: string; row: string }[] = [
    { col: "col-span-1", row: "row-span-2" },
    { col: "col-span-2", row: "row-span-1" },
    { col: "col-span-1", row: "row-span-1" },
    { col: "col-span-1", row: "row-span-1" },
    { col: "col-span-1", row: "row-span-1" },
    { col: "col-span-1", row: "row-span-2" },
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
        <article className="border border-nocturnal/60 rounded-xl overflow-hidden bg-nocturnal">
            <button
                className="w-full flex items-center justify-between px-5 py-4 text-left min-h-[44px]"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${feature.id}`}
            >
                <div className="flex items-center gap-3">
                    <Icon name={feature.icon} size={20} strokeColor={feature.accent} />
                    <span className="font-mono font-semibold text-arctic text-base">{feature.title}</span>
                </div>
                <span
                    className="shrink-0 transition-transform duration-200 ease-out"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                    <Icon name="chevron-down" size={16} strokeColor="#FFC801" />
                </span>
            </button>
            <div
                id={`accordion-content-${feature.id}`}
                ref={contentRef}
                style={{ maxHeight: "0px", overflow: "hidden", transition: "max-height 300ms ease-in-out" }}
            >
                <div className="px-5 pb-5">
                    <span className="font-mono text-xs text-forsythia bg-forsythia/10 px-2 py-0.5 rounded-full mb-3 inline-block">
                        {feature.tag}
                    </span>
                    <p className="font-sans text-arctic/70 text-sm leading-relaxed">{feature.description}</p>
                </div>
            </div>
        </article>
    );
}

export default function FeaturesSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Context Lock: sync state on breakpoint change
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");
        const handler = (e: MediaQueryListEvent) => {
            if (e.matches && activeIndex !== null) {
                setActiveIndex(null);
            }
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [activeIndex]);

    return (
        <section id="features" aria-labelledby="features-heading" className="bg-oceanic py-24">
            <div className="max-w-7xl mx-auto px-6">
                <header className="text-center mb-16">
                    <p className="font-mono text-forsythia text-sm uppercase tracking-widest mb-3">Platform Capabilities</p>
                    <h2 id="features-heading" className="font-mono font-bold text-4xl md:text-5xl text-arctic">
                        Everything you need.<br />Nothing you don&apos;t.
                    </h2>
                </header>

                {/* BENTO GRID — desktop */}
                <div
                    className="hidden md:grid gap-6"
                    style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
                >
                    {features.map((feature) => {
                        const span = bentoSpans[feature.id];
                        const isActive = activeIndex === feature.id;
                        return (
                            <article
                                key={feature.id}
                                className={`${span.col} ${span.row} relative flex flex-col rounded-2xl p-6 border cursor-pointer overflow-hidden bg-nocturnal`}
                                style={{
                                    borderColor: isActive ? "rgba(255,200,1,0.3)" : "rgba(17,76,90,0.5)",
                                    transform: isActive ? "translateY(-4px)" : "translateY(0)",
                                    boxShadow: isActive ? "0 8px 32px rgba(255,200,1,0.15)" : "none",
                                    transition: "transform 150ms ease-out, box-shadow 150ms ease-out, border-color 150ms ease-out",
                                }}
                                onMouseEnter={() => setActiveIndex(feature.id)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                <div className="flex justify-between items-start">
                                    <Icon name={feature.icon} size={24} strokeColor={feature.accent} />
                                    <span className="font-mono text-xs bg-forsythia/10 text-forsythia px-2 py-0.5 rounded-full">
                                        {feature.tag}
                                    </span>
                                </div>
                                <h3 className="font-mono font-bold text-arctic text-lg mt-4 mb-2">{feature.title}</h3>
                                <p className="font-sans text-arctic/60 text-sm leading-relaxed">{feature.description}</p>
                                {/* Decorative corner */}
                                <div
                                    aria-hidden="true"
                                    style={{
                                        position: "absolute", bottom: 0, right: 0, width: 80, height: 80,
                                        background: "radial-gradient(circle at bottom right, rgba(255,200,1,0.06), transparent)",
                                    }}
                                />
                            </article>
                        );
                    })}
                </div>

                {/* ACCORDION — mobile */}
                <div className="md:hidden flex flex-col gap-3">
                    {features.map((feature) => (
                        <AccordionItem
                            key={feature.id}
                            feature={feature}
                            isOpen={activeIndex === feature.id}
                            onToggle={() => setActiveIndex(activeIndex === feature.id ? null : feature.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}