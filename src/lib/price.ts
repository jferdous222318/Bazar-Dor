import type { IProduct, SortMode } from "@/types/type";
import { toNumber } from "@/lib/format";

export function getPriceStats(product: IProduct) {
  const { markets } = product;
  const avgs = markets.map((m) => (m.min + m.max) / 2);
  return {
    min: Math.min(...markets.map((m) => m.min)),
    max: Math.max(...markets.map((m) => m.max)),
    avg: avgs.reduce((sum, v) => sum + v, 0) / avgs.length,
  };
}

export const marketAvg = (m: { min: number; max: number }) => (m.min + m.max) / 2;

export function getTopRisers(products: IProduct[], count = 6): IProduct[] {
  return products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, count);
}

export function getTopFallers(products: IProduct[], count = 6): IProduct[] {
  return products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, count);
}

export function sortProducts(products: IProduct[], mode: SortMode): IProduct[] {
  if (mode === "default") return products;
  const sorted = [...products];
  sorted.sort((a, b) => toNumber(a.today) - toNumber(b.today));
  return mode === "desc" ? sorted.reverse() : sorted;
}

export const priceDiff = (p: IProduct) => p.today - p.yesterday;