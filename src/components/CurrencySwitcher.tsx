"use client";
import { type Currency } from "@/lib/pricingConfig";
import Icon from "./Icon";

interface Props { value: Currency; onChange: (v: Currency) => void; }

export default function CurrencySwitcher({ value, onChange }: Props) {
  return (
    <div className="relative">
      <select
        id="currency-select" aria-label="Select currency" value={value}
        onChange={(e) => onChange(e.target.value as Currency)}
        className="appearance-none bg-oceanic border border-white/10 hover:border-white/20 text-arctic font-mono text-sm pl-4 pr-10 py-2.5 rounded-full cursor-pointer focus:outline-none focus:border-forsythia/50 transition-colors duration-150 min-h-[44px]"
      >
        <option value="INR">₹ INR</option>
        <option value="USD">$ USD</option>
        <option value="EUR">€ EUR</option>
      </select>
      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
        <Icon name="chevron-down" size={13} strokeColor="#FFC801" />
      </div>
    </div>
  );
}
