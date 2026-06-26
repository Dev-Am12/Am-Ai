"use client";
import { type Currency } from "@/lib/pricingConfig";
import Icon from "./Icon";

interface CurrencySwitcherProps {
    value: Currency;
    onChange: (value: Currency) => void;
}

export default function CurrencySwitcher({ value, onChange }: CurrencySwitcherProps) {
    return (
        <div className="relative flex items-center">
            <select
                id="currency-select"
                aria-label="Select currency"
                value={value}
                onChange={(e) => onChange(e.target.value as Currency)}
                className="appearance-none bg-nocturnal border border-nocturnal/60 text-arctic font-mono text-sm pl-4 pr-10 py-2 rounded-lg hover:border-forsythia/50 focus:border-forsythia focus:outline-none transition-colors duration-150 ease-out cursor-pointer min-h-[44px]"
            >
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Icon name="chevron-down" size={14} strokeColor="#FFC801" />
            </div>
        </div>
    );
}