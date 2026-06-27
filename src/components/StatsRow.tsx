"use client";
import { useRef, useEffect, useState } from "react";
import Icon from "./Icon";

const stats = [
  { icon: "arrow-trending-up", display: "10M+",  label: "Automations daily",   end: 10,    suffix: "M+" },
  { icon: "chart-pie",         display: "99.99%", label: "Uptime SLA",          end: 99.99, suffix: "%" },
  { icon: "cube-16-solid",     display: "150+",   label: "Native integrations", end: 150,   suffix: "+" },
  { icon: "cog-8-tooth",       display: "<3ms",   label: "Pipeline latency",    end: null,  suffix: "" },
];

export default function StatsRow() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = (e: MediaQueryListEvent | MediaQueryList) => setDesktop(e.matches);
    set(mq); mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    section.style.opacity = "0";
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      section.animate(
        [{ opacity: "0", transform: "translateY(18px)" }, { opacity: "1", transform: "translateY(0)" }],
        { duration: 500, easing: "ease-out", fill: "forwards" }
      );
      numRefs.current.forEach((el, i) => {
        const s = stats[i];
        if (!el || s.end === null) return;
        const dur = 1600, start = performance.now(), isFloat = (s.end % 1) !== 0;
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 4);
          el.textContent = (isFloat ? (ease * s.end).toFixed(2) : Math.floor(ease * s.end)) + s.suffix;
          if (t < 1) requestAnimationFrame(tick); else el.textContent = s.display;
        };
        setTimeout(() => requestAnimationFrame(tick), i * 120);
      });
    }, { threshold: 0.15 });
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stats" ref={sectionRef} aria-labelledby="stats-heading"
      style={{ position: "relative", padding: "64px 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(17,76,90,0.22)" }} />
      <div className="section-divider" style={{ position: "absolute", top: 0, left: 0, right: 0 }} />
      <div className="section-divider" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }} />
      <h2 id="stats-heading" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>Platform Statistics</h2>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <ul style={{
          display: "grid",
          gridTemplateColumns: desktop ? "repeat(4, 1fr)" : "repeat(2, 1fr)",
          gap: desktop ? 0 : "40px 0",
          listStyle: "none",
        }}>
          {stats.map((s, i) => (
            <li key={i} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              textAlign: "center", gap: 12, padding: "12px 24px",
              borderRight: desktop && i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 11, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(255,200,1,0.1)", border: "1px solid rgba(255,200,1,0.18)",
              }}>
                <Icon name={s.icon} size={19} strokeColor="#FFC801" />
              </div>
              <span
                ref={(el) => { numRefs.current[i] = el; }}
                className="font-mono"
                style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, color: "#FFC801", lineHeight: 1 }}
                aria-live="polite"
              >
                {s.display}
              </span>
              <p className="font-sans" style={{ fontSize: 12, color: "rgba(241,246,244,0.45)", letterSpacing: "0.01em" }}>
                {s.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
