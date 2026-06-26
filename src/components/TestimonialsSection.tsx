"use client";
import { useRef, useEffect } from "react";
import Icon from "./Icon";

const testimonials = [
  { quote: "AmAi cut our ETL pipeline build time from 3 weeks to 2 days. The visual builder is genuinely a step change.", author: "Priya Mehta", role: "Head of Data Engineering", company: "FinStack" },
  { quote: "We handle 40 million events per day and AmAi has never missed a beat. The 99.99% SLA is not marketing — it's real.", author: "James O'Connor", role: "VP of Infrastructure", company: "Tradeflo" },
  { quote: "Migrated from Airflow in a weekend. The smart sync engine alone is worth the price of admission.", author: "Ananya Krishnan", role: "CTO", company: "DataNest" },
];

export default function TestimonialsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      el.animate(
        [{ opacity: "0", transform: "translateY(30px)" }, { opacity: "1", transform: "translateY(0)" }],
        { duration: 600, easing: "ease-out", fill: "forwards" }
      );
    }, { threshold: 0.1 });
    el.style.opacity = "0";
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" style={{ position: "relative", padding: "112px 0", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #172B36, #0f1f2a, #172B36)" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 300, borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(ellipse, rgba(255,200,1,0.04) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: 9999, border: "1px solid rgba(255,200,1,0.2)", backgroundColor: "rgba(255,200,1,0.08)", marginBottom: 20 }}>
            <span className="font-mono" style={{ color: "#FFC801", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>Customer Stories</span>
          </div>
          <h2 id="testimonials-heading" className="font-mono" style={{ fontWeight: 700, fontSize: "clamp(36px, 5vw, 48px)", color: "#F1F6F4" }}>
            Don&apos;t take our word for it.
          </h2>
        </div>

        <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {testimonials.map((t, i) => (
            <figure key={i}
              className="card-hover"
              style={{ position: "relative", display: "flex", flexDirection: "column", borderRadius: 16, padding: 28, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", background: "linear-gradient(160deg, rgba(17,76,90,0.35), rgba(23,43,54,0.7))", transition: "all 200ms" }}
            >
              <div style={{ marginBottom: 20 }}>
                <Icon name="link-solid" size={20} strokeColor="#FFC801" className="opacity-60" />
              </div>
              <blockquote style={{ flexGrow: 1, margin: 0 }}>
                <p className="font-sans" style={{ color: "rgba(241,246,244,0.75)", fontSize: 14, lineHeight: 1.6 }}>&ldquo;{t.quote}&rdquo;</p>
              </blockquote>
              <figcaption style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(to bottom right, rgba(255,200,1,0.4), #114C5A)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="font-mono" style={{ fontSize: 12, fontWeight: 700, color: "#FFC801" }}>{t.author[0]}</span>
                </div>
                <div>
                  <p className="font-mono" style={{ fontWeight: 600, color: "#F1F6F4", fontSize: 14, lineHeight: 1.2 }}>{t.author}</p>
                  <p className="font-sans" style={{ color: "rgba(241,246,244,0.45)", fontSize: 12, marginTop: 2 }}>{t.role}, {t.company}</p>
                </div>
              </figcaption>
              <div style={{ position: "absolute", bottom: -16, right: -16, width: 80, height: 80, borderRadius: "50%", pointerEvents: "none", background: "radial-gradient(circle, rgba(255,200,1,0.06), transparent)" }} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}