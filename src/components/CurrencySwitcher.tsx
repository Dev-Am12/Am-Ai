"use client";
import { type Currency } from "@/lib/pricingConfig";
import Icon from "./Icon";

interface Props { value: Currency; onChange: (v: Currency) => void; }

export default function CurrencySwitcher({ value, onChange }: Props) {
  return (
    <div style={{ position: "relative" }}>
      <select id="currency-select" aria-label="Select currency" value={value} onChange={(e) => onChange(e.target.value as Currency)} style={{ appearance: "none", backgroundColor: "#172B36", border: "1px solid rgba(255,255,255,0.1)", color: "#F1F6F4", fontFamily: "var(--font-family-mono)", fontSize: 14, padding: "10px 40px 10px 16px", borderRadius: 9999, cursor: "pointer", minHeight: 44, outline: "none", transition: "border-color 150ms" }} onFocus={(e) => e.target.style.borderColor = "rgba(255,200,1,0.5)"} onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}>
        <option value="INR">₹ INR</option>
        <option value="USD">$ USD</option>
        <option value="EUR">€ EUR</option>
      </select>
      <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
        <Icon name="chevron-down" size={13} strokeColor="#FFC801" />
      </div>
    </div>
  );
}