import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategories, getCategory, getProducts } from "@/lib/api";
import ProductGrid from "@/components/product/ProductGrid";

type Props = { params: Promise<{ slug: string }> };

// pre-renders the 8 known categories; unknown slugs still render on demand
export async function generateStaticParams() {
  const categories = await getCategories().catch(() => []);
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) return { title: "ক্যাটাগরি পাওয়া যায়নি | বাজার দর" };

  return {
    title: `${category.nameBn} — আজকের দাম | বাজার দর`,
    description: `${category.nameBn} ক্যাটাগরির পণ্যের আজকের বাজার দর ও দামের পরিবর্তন।`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategory(slug),
    getProducts(slug),
  ]);

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:py-8">
      {/* category banner */}
      <div className="surface flex items-center gap-4 px-5 py-5 sm:px-6">
        <span
          aria-hidden
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-soft)] text-2xl sm:h-16 sm:w-16 sm:text-3xl"
        >
          {category.icon}
        </span>
        <div className="min-w-0">
          <h1 className="text-xl font-bold sm:text-2xl">{category.nameBn}</h1>
          <p className="mt-1 text-xs text-[var(--muted)] sm:text-sm">
            এই ক্যাটাগরির আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}