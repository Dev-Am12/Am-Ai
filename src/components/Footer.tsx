"use client";
import Icon from "./Icon";

const links = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap", "Status"],
  Developers: ["Docs", "API Reference", "SDKs", "Webhooks", "CLI"],
  Company: ["About", "Blog", "Careers", "Press", "Legal"],
};

export default function Footer() {
  return (
    <footer style={{ position: "relative", backgroundColor: "#172B36", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 64, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 56 }}>
          {/* Brand col */}
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Icon name="amai-logo" size={28} strokeColor="#FFC801" />
              <span className="font-mono" style={{ fontWeight: 700, color: "#FFC801", fontSize: 16 }}>AmAi</span>
            </div>
            <p className="font-sans" style={{ color: "rgba(241,246,244,0.45)", fontSize: 14, lineHeight: 1.6, marginBottom: 20, maxWidth: 300 }}>
              The AI-native data automation platform for modern engineering teams.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["Twitter", "GitHub", "LinkedIn"].map((s) => (
                <a key={s} href="#" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", color: "rgba(241,246,244,0.4)", textDecoration: "none", fontFamily: "var(--font-family-mono)", fontSize: 10, transition: "all 150ms" }} onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(241,246,244,0.8)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(241,246,244,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-mono" style={{ color: "rgba(241,246,244,0.5)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>{group}</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none", padding: 0 }}>
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="font-sans" style={{ fontSize: 14, color: "rgba(241,246,244,0.45)", textDecoration: "none", transition: "color 150ms" }} onMouseEnter={(e) => e.currentTarget.style.color = "rgba(241,246,244,0.8)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(241,246,244,0.45)"}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 28, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <p className="font-sans" style={{ color: "rgba(241,246,244,0.3)", fontSize: 12 }}>© 2026 AmAi Technologies. All rights reserved.</p>
          <div className="font-mono" style={{ display: "flex", alignItems: "center", gap: 4, color: "rgba(241,246,244,0.2)", fontSize: 12 }}>
            <Icon name="cog-8-tooth" size={11} strokeColor="rgba(255,200,1,0.3)" />
            Built for the Next-Gen AI Hackathon
          </div>
        </div>
      </div>
    </footer>
  );
}