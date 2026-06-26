"use client";
import { useRef, useEffect } from "react";
import Icon from "./Icon";

const statItems = [
    { icon: "arrow-trending-up", display: "10M+", label: "Automations Processed Daily", endVal: 10, prefix: "", suffix: "M+" },
    { icon: "chart-pie", display: "99.99%", label: "Uptime SLA Guaranteed", endVal: 99.99, prefix: "", suffix: "%" },
    { icon: "cube-16-solid", display: "150+", label: "Native Integrations", endVal: 150, prefix: "", suffix: "+" },
    { icon: "cog-8-tooth", display: "<3ms", label: "Average Pipeline Latency", endVal: null, prefix: "<", suffix: "ms" },
];

export default function StatsRow() {
    const sectionRef = useRef<HTMLElement>(null);
    const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Section entrance
        const sectionObs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                section.animate(
                    [{ opacity: "0", transform: "translateY(30px)" }, { opacity: "1", transform: "translateY(0)" }],
                    { duration: 400, easing: "ease-out", fill: "forwards" }
                );
                sectionObs.disconnect();
            }
        }, { threshold: 0.1 });
        section.style.opacity = "0";
        sectionObs.observe(section);

        // Counter animations
        const counterObs = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target as HTMLSpanElement;
                const idx = parseInt(el.dataset.idx || "0");
                const item = statItems[idx];
                counterObs.unobserve(el);

                if (item.endVal === null) {
                    el.textContent = item.display;
                    return;
                }

                const duration = 1500;
                const start = performance.now();
                const isDecimal = item.endVal % 1 !== 0;

                const tick = (now: number) => {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = eased * item.endVal;
                    el.textContent = item.prefix + (isDecimal ? current.toFixed(2) : Math.floor(current).toString()) + item.suffix;
                    if (progress < 1) requestAnimationFrame(tick);
                    else el.textContent = item.display;
                };
                requestAnimationFrame(tick);
            });
        }, { threshold: 0.2 });

        counterRefs.current.forEach((el) => { if (el) counterObs.observe(el); });

        return () => { sectionObs.disconnect(); counterObs.disconnect(); };
    }, []);

    return (
        <section
            id="stats"
            ref={sectionRef}
            aria-labelledby="stats-heading"
            className="bg-nocturnal py-16 border-y border-forsythia/10"
        >
            <h2 id="stats-heading" className="sr-only">Platform Statistics</h2>
            <div className="max-w-7xl mx-auto px-6">
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {statItems.map((item, i) => (
                        <li key={i} className="flex flex-col items-center text-center gap-3">
                            <Icon name={item.icon} size={28} strokeColor="#FFC801" />
                            <span
                                ref={(el) => { counterRefs.current[i] = el; }}
                                data-idx={i}
                                className="font-mono font-bold text-3xl md:text-5xl text-forsythia"
                                aria-live="polite"
                            >
                                {item.display}
                            </span>
                            <p className="font-sans text-arctic/70 text-sm">{item.label}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}