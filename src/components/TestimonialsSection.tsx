"use client";
import { useRef, useEffect, useState } from "react";
import Icon from "./Icon";

const testimonials = [
  { quote: "AmAi cut our ETL pipeline build time from 3 weeks to 2 days. The visual builder is genuinely a step change for every data engineer on our team.", author: "Priya Mehta",    role: "Head of Data Engineering", company: "FinStack",  initial: "P" },
  { quote: "We handle 40 million events per day and AmAi has never missed a beat. The 99.99% SLA is not marketing copy — it's real, and it shows in our dashboards.", author: "James O'Connor", role: "VP of Infrastructure",    company: "Tradeflo",  initial: "J" },
  { quote: "Migrated off Airflow in a weekend. The smart sync engine and zero-config Snowflake integration sealed the deal. Best decision we made this year.", author: "Ananya Krishnan", role: "CTO",                       company: "DataNest",  initial: "A" },
];

export default function TestimonialsSection() {
  const gridRef  = useRef<HTMLDivElement>(null);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = (e: MediaQueryListEvent | MediaQueryList) => setDesktop(e.matches);
    set(mq); mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    el.style.opacity = "0";
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      el.animate([{ opacity: "0", transform: "translateY(28px)" }, { opacity: "1", transform: "translateY(0)" }], { duration: 600, easing: "ease-out", fill: "forwards" });
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading"
      style={{ position: "relative", padding: "108px 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #172B36 0%, #0f1f2a 50%, #172B36 100%)" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 320, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,200,1,0.04) 0%, transparent 70%)", filter: "blur(50px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Header — no pill */}
        <div style={{ marginBottom: 52, maxWidth: 540 }}>
          <p className="font-mono" style={{ fontSize: 11, color: "rgba(255,200,1,0.65)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Customer Stories
          </p>
          <h2 id="testimonials-heading" className="font-mono"
            style={{ fontWeight: 700, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#F1F6F4" }}>
            Don&apos;t take our word for it.
          </h2>
        </div>

        <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: desktop ? "repeat(3, 1fr)" : "1fr", gap: 14 }}>
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="glow-card"
              style={{
                borderRadius: 16, padding: "26px 24px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "linear-gradient(145deg, rgba(17,76,90,0.38), rgba(23,43,54,0.7))",
                display: "flex", flexDirection: "column", overflow: "hidden", position: "relative",
                transition: "transform 160ms ease-out, box-shadow 160ms ease-out, border-color 160ms ease-out",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 20px 56px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,200,1,0.12)"; el.style.borderColor = "rgba(255,200,1,0.2)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; el.style.borderColor = "rgba(255,255,255,0.08)"; }}
              onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mouse-x", `${((e.clientX - r.left) / r.width) * 100}%`); e.currentTarget.style.setProperty("--mouse-y", `${((e.clientY - r.top) / r.height) * 100}%`); }}
            >
              <div style={{ marginBottom: 18, opacity: 0.55 }}>
                <Icon name="link-solid" size={18} strokeColor="#FFC801" />
              </div>
              <blockquote style={{ flex: 1 }}>
                <p className="font-sans" style={{ fontSize: 14, color: "rgba(241,246,244,0.7)", lineHeight: 1.72 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, rgba(255,200,1,0.38), rgba(17,76,90,0.9))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="font-mono" style={{ fontSize: 13, fontWeight: 700, color: "#FFC801" }}>{t.initial}</span>
                </div>
                <div>
                  <p className="font-mono" style={{ fontSize: 13, fontWeight: 600, color: "#F1F6F4", lineHeight: 1.3 }}>{t.author}</p>
                  <p className="font-sans" style={{ fontSize: 11, color: "rgba(241,246,244,0.38)", marginTop: 2 }}>{t.role}, {t.company}</p>
                </div>
              </figcaption>
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 100, height: 100, background: "radial-gradient(circle at bottom right, rgba(255,200,1,0.05), transparent)", pointerEvents: "none" }} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
