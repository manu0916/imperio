import { brandConfig } from "@/config/brand";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat(brandConfig.locale, {
    style: "currency",
    currency: brandConfig.currency,
  }).format(value);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function unique<T>(values: T[]) {
  return Array.from(new Set(values));
}

