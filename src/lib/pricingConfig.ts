export type Currency = "INR" | "USD" | "EUR";
export type BillingCycle = "monthly" | "annual";

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  baseMonthlyINR: number;
  highlighted: boolean;
  features: string[];
  cta: string;
}

export const CURRENCY_RATES: Record<Currency, number> = { INR: 1, USD: 0.012, EUR: 0.011 };
export const CURRENCY_SYMBOLS: Record<Currency, string> = { INR: "₹", USD: "$", EUR: "€" };
export const ANNUAL_DISCOUNT = 0.8;

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter", name: "Starter", description: "For teams exploring AI automation.",
    baseMonthlyINR: 1999, highlighted: false, cta: "Start for free",
    features: ["5 Active Pipelines", "1M events / month", "3 Integrations", "Community support", "99.5% Uptime SLA", "Basic analytics"],
  },
  {
    id: "pro", name: "Pro", description: "For teams running production workloads.",
    baseMonthlyINR: 7499, highlighted: true, cta: "Get started",
    features: ["Unlimited pipelines", "50M events / month", "50+ Integrations", "Priority support", "99.99% Uptime SLA", "Custom transformations", "Advanced analytics"],
  },
  {
    id: "enterprise", name: "Enterprise", description: "For organizations at scale.",
    baseMonthlyINR: 24999, highlighted: false, cta: "Talk to sales",
    features: ["Unlimited everything", "Unlimited events", "150+ Integrations", "Dedicated support", "99.99% Uptime SLA", "Custom transformations", "SSO & RBAC", "Custom contracts"],
  },
];

export function computePrice(tierId: string, currency: Currency, cycle: BillingCycle): string {
  const tier = PRICING_TIERS.find((t) => t.id === tierId);
  if (!tier) return "—";
  const monthly = tier.baseMonthlyINR * CURRENCY_RATES[currency];
  const final = cycle === "annual" ? monthly * ANNUAL_DISCOUNT : monthly;
  const symbol = CURRENCY_SYMBOLS[currency];
  if (currency === "INR") return symbol + Math.round(final).toLocaleString("en-IN");
  return symbol + final.toFixed(2);
}
