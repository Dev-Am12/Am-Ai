"use client";
import { useState, useEffect } from "react";
import Icon from "./Icon";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  const navStyle: React.CSSProperties = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
    transition: "background 300ms ease-out, border-color 300ms ease-out, backdrop-filter 300ms ease-out, box-shadow 300ms ease-out",
    background: scrolled ? "rgba(23,43,54,0.82)" : "transparent",
    backdropFilter: scrolled ? "blur(28px) saturate(160%)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(28px) saturate(160%)" : "none",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
    boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.28)" : "0 0 0 rgba(0,0,0,0)",
  };

  return (
    <header style={navStyle}>
      <nav style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: scrolled ? 56:64, transition: "height 300ms ease-out", display: "flex", alignItems: "center", justifyContent: "space-between" }} aria-label="Main navigation">
        {/* Logo */}
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }} aria-label="AmAi home">
          <Icon name="amai-logo" size={30} strokeColor="#FFC801" />
          <span className="font-mono font-bold text-forsythia" style={{ fontSize: 17, letterSpacing: "-0.01em" }}>AmAi</span>
        </a>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden md:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="font-sans text-arctic/60 hover:text-arctic"
              style={{ padding: "8px 16px", fontSize: 14, borderRadius: 8, textDecoration: "none", transition: "color 150ms, background 150ms" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }} className="hidden md:flex">
          <button aria-label="Search" style={{ background: "none", border: "none", cursor: "pointer", padding: 8, borderRadius: 8, color: "rgba(241,246,244,0.35)", transition: "color 150ms" }}>
            <Icon name="search" size={16} strokeColor="currentColor" />
          </button>
          <a href="#pricing" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#FFC801", color: "#172B36",
            fontFamily: "var(--font-family-sans)", fontWeight: 600, fontSize: 13,
            padding: "9px 18px", borderRadius: 8, textDecoration: "none",
            boxShadow: "0 2px 12px rgba(255,200,1,0.22)",
            transition: "background 150ms",
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#FF9932"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFC801"; }}
          >
            Get Started <Icon name="chevron-right" size={13} strokeColor="#172B36" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, borderRadius: 8, display: "none" }}
          className="flex md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen
            ? <Icon name="x-mark" size={22} strokeColor="#F1F6F4" />
            : <div style={{ display: "flex", flexDirection: "column", gap: 5, width: 20 }}>
              <span style={{ height: 1.5, background: "rgba(241,246,244,0.7)", borderRadius: 2, display: "block" }} />
              <span style={{ height: 1.5, background: "rgba(241,246,244,0.7)", borderRadius: 2, display: "block", width: "75%" }} />
              <span style={{ height: 1.5, background: "rgba(241,246,244,0.7)", borderRadius: 2, display: "block" }} />
            </div>
          }
        </button>
      </nav>

      {/* Mobile drawer */}
      <div style={{
        background: "rgba(23,43,54,0.98)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden", maxHeight: menuOpen ? 280 : 0, opacity: menuOpen ? 1 : 0,
        transition: "max-height 300ms ease-in-out, opacity 250ms ease-out",
      }} className="md:hidden">
        <div style={{ padding: "8px 24px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              className="font-sans text-arctic/70"
              style={{ padding: "12px 12px", fontSize: 15, borderRadius: 8, textDecoration: "none", display: "flex", alignItems: "center", gap: 8, transition: "color 150ms, background 150ms" }}>
              <Icon name="chevron-right" size={11} strokeColor="#FFC801" />
              {l.label}
            </a>
          ))}
          <a href="#pricing" onClick={() => setMenuOpen(false)} style={{
            marginTop: 8, background: "#FFC801", color: "#172B36",
            fontFamily: "var(--font-family-sans)", fontWeight: 600, fontSize: 14,
            padding: "13px 20px", borderRadius: 10, textDecoration: "none", textAlign: "center",
          }}>
            Get Started Free
          </a>
        </div>
      </div>
    </header>
  );
}
