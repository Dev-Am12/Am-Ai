"use client";
import { useState, useEffect } from "react";
import Icon from "./Icon";

const links = {
  Product:    ["Features", "Pricing", "Changelog", "Roadmap", "Status"],
  Developers: ["Docs", "API Reference", "SDKs", "Webhooks", "CLI"],
  Company:    ["About", "Blog", "Careers", "Press", "Legal"],
};

export default function Footer() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = (e: MediaQueryListEvent | MediaQueryList) => setDesktop(e.matches);
    set(mq); mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  return (
    <footer style={{ position: "relative", background: "#0f1e27", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 56, paddingBottom: 32 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: desktop ? "1.4fr 1fr 1fr 1fr" : "1fr",
          gap: desktop ? "0 40px" : 40,
          marginBottom: 48,
        }}>
          {/* Brand col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <Icon name="amai-logo" size={28} strokeColor="#FFC801" />
              <span className="font-mono" style={{ fontWeight: 700, fontSize: 16, color: "#FFC801", letterSpacing: "-0.01em" }}>AmAi</span>
            </div>
            <p className="font-sans" style={{ fontSize: 13, color: "rgba(241,246,244,0.38)", lineHeight: 1.7, maxWidth: 210, marginBottom: 22 }}>
              The AI-native data automation platform for modern engineering teams.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "Twitter", char: "𝕏" },
                { label: "GitHub",  char: "⌥" },
                { label: "LinkedIn",char: "in" },
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label} style={{
                  width: 32, height: 32, borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.09)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(241,246,244,0.32)", textDecoration: "none",
                  fontFamily: "system-ui", fontSize: 12, fontWeight: 600,
                  transition: "border-color 150ms, color 150ms, background 150ms",
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,200,1,0.4)"; el.style.color = "#FFC801"; el.style.background = "rgba(255,200,1,0.06)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.09)"; el.style.color = "rgba(241,246,244,0.32)"; el.style.background = "transparent"; }}
                >{s.char}</a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-mono" style={{ fontSize: 10, color: "rgba(241,246,244,0.3)", textTransform: "uppercase", letterSpacing: "0.11em", marginBottom: 18 }}>
                {group}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11 }}>
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="font-sans" style={{
                      fontSize: 13, color: "rgba(241,246,244,0.4)", textDecoration: "none",
                      transition: "color 150ms",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F1F6F4"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(241,246,244,0.4)"; }}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 22,
          display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10,
        }}>
          <p className="font-sans" style={{ fontSize: 12, color: "rgba(241,246,244,0.22)" }}>
            © 2026 AmAi Technologies. All rights reserved.
          </p>
          <p className="font-mono" style={{ fontSize: 11, color: "rgba(241,246,244,0.2)", display: "flex", alignItems: "center", gap: 5 }}>
            <Icon name="cog-8-tooth" size={11} strokeColor="rgba(255,200,1,0.3)" />
            Built by AM
          </p>
        </div>
      </div>
    </footer>
  );
}
