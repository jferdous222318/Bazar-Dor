import type { ICategory, IProduct } from "@/types/type";

const BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];


async function request<T>(path: string): Promise<T | null> {
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
      if (res.status === 404) return null;
      if (res.ok) return (await res.json()) as T;
    } catch {
      
    }
  }
  throw new Error(`Failed to load ${path}`);
}

export async function getCategories(): Promise<ICategory[]> {
  return (await request<ICategory[]>("/categories")) ?? [];
}

export async function getCategory(slug: string): Promise<ICategory | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}

export async function getProducts(category?: string): Promise<IProduct[]> {
  const path = category
    ? `/products?category=${encodeURIComponent(category)}`
    : "/products";
  return (await request<IProduct[]>(path)) ?? [];
}


export async function getProductBySlug(slug: string): Promise<IProduct | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug || String(p.id) === slug) ?? null;
}