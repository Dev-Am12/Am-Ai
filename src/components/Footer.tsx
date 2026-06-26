"use client";
import Icon from "./Icon";

const links = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap", "Status"],
  Developers: ["Docs", "API Reference", "SDKs", "Webhooks", "CLI"],
  Company: ["About", "Blog", "Careers", "Press", "Legal"],
};

export default function Footer() {
  return (
    <footer style={{ position: "relative", background: "#172B36", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 56, paddingBottom: 32 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40 }} className="md:grid-cols-4">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <Icon name="amai-logo" size={28} strokeColor="#FFC801" />
              <span className="font-mono" style={{ fontWeight: 700, fontSize: 16, color: "#FFC801" }}>AmAi</span>
            </div>
            <p className="font-sans" style={{ fontSize: 13, color: "rgba(241,246,244,0.4)", lineHeight: 1.65, maxWidth: 200, marginBottom: 20 }}>
              The AI-native data automation platform for modern engineering teams.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["T", "G", "L"].map((s, i) => (
                <a key={i} href="#" style={{
                  width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(255,255,255,0.09)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(241,246,244,0.35)", fontFamily: '"JetBrains Mono", monospace', fontSize: 11, fontWeight: 700,
                  textDecoration: "none", transition: "border-color 150ms, color 150ms",
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,200,1,0.4)"; el.style.color = "#FFC801"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.09)"; el.style.color = "rgba(241,246,244,0.35)"; }}
                >{s}</a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="font-mono" style={{ fontSize: 10, color: "rgba(241,246,244,0.35)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>{group}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="font-sans" style={{ fontSize: 13, color: "rgba(241,246,244,0.42)", textDecoration: "none", transition: "color 150ms" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F1F6F4"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(241,246,244,0.42)"; }}
                    >{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 48, paddingTop: 24, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <p className="font-sans" style={{ fontSize: 12, color: "rgba(241,246,244,0.26)" }}>© 2026 AmAi Technologies. All rights reserved.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Icon name="cog-8-tooth" size={11} strokeColor="rgba(255,200,1,0.3)" />
            <span className="font-mono" style={{ fontSize: 11, color: "rgba(241,246,244,0.2)" }}>Built for the Next-Gen AI Hackathon</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
