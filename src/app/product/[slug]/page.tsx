import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { getProductBySlug, getProducts } from "@/lib/api";
import { getPriceStats, priceDiff } from "@/lib/price";
import { formatPrice, unitLabel, unitName } from "@/lib/format";
import ChangeBadge from "@/components/ui/ChangeBadge";
import MarketTable from "@/components/product/MarketTable";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getProducts().catch(() => []);
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "পণ্য পাওয়া যায়নি | বাজার দর" };

  return {
    title: `${product.nameBn} — আজকের দাম ${formatPrice(product.today)} | বাজার দর`,
    description: `${product.nameBn}-এর আজকের বাজারভিত্তিক দাম, সর্বনিম্ন-সর্বাধিক ও গড় দাম।`,
  };
}

function StatCard({
  label,
  value,
  note,
  color,
}: {
  label: string;
  value: string;
  note: string;
  color?: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border-soft)] bg-white px-4 py-4">
      <p className="text-xs text-[var(--muted)]">{label}</p>
      <p
        style={{ color }}
        className="mt-1 text-xl font-bold tabular-nums sm:text-2xl"
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-[var(--muted)]">{note}</p>
    </div>
  );
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const stats = getPriceStats(product);
  const diff = priceDiff(product);

  const movement =
    product.change.dir === "up"
      ? "বেড়েছে"
      : product.change.dir === "down"
        ? "কমেছে"
        : "অপরিবর্তিত আছে";

  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:py-8">
      {/* breadcrumb */}
      <nav aria-label="ব্রেডক্রাম্ব">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-[var(--muted)] sm:text-sm">
          <li>
            <Link href="/" className="hover:text-[var(--brand)]">হোম</Link>
          </li>
          <li aria-hidden>›</li>
          <li>
            <Link
              href={`/category/${product.category}`}
              className="hover:text-[var(--brand)]"
            >
              {product.categoryNameBn}
            </Link>
          </li>
          <li aria-hidden>›</li>
          <li aria-current="page" className="font-medium text-[var(--ink)]">
            {product.nameBn}
          </li>
        </ol>
      </nav>
      <div className="surface flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--brand-soft)] text-2xl sm:h-16 sm:w-16 sm:text-3xl"
          >
            {product.image}
          </span>
          <div className="min-w-0">
            <h1 className="text-xl font-bold sm:text-2xl">{product.nameBn}</h1>
            <p className="mt-1 text-xs text-[var(--muted)] sm:text-sm">
              {unitLabel(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="mt-1 text-xs text-[var(--muted)] sm:text-sm">
              গতকালের তুলনায় আজ দাম {movement}
              {diff !== 0 && ` · ${formatPrice(Math.abs(diff))}`}
            </p>
          </div>
        </div>
        <div className="shrink-0 rounded-xl bg-[var(--brand-soft)] px-5 py-4 text-center sm:min-w-40">
          <p className="text-xs text-[var(--brand-dark)]">আজকের দাম</p>
          <p className="mt-0.5 text-2xl font-bold tabular-nums sm:text-3xl">
            {formatPrice(product.today)}
          </p>
          <p className="text-xs text-[var(--muted)]">
            প্রতি {unitName(product.unit)}
          </p>
          <ChangeBadge
            dir={product.change.dir}
            pct={product.change.pct}
            variant="soft"
            className="mt-2"
          />
        </div>
      </div>
      <section className="surface px-5 py-5 sm:px-6">
        <h2 className="text-base font-bold sm:text-lg">দামের সারসংক্ষেপ</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <StatCard
            label="সর্বনিম্ন দাম"
            value={formatPrice(stats.min)}
            note="সবচেয়ে কম দামের বাজারে"
            color="var(--down)"
          />
          <StatCard
            label="সর্বাধিক দাম"
            value={formatPrice(stats.max)}
            note="সবচেয়ে বেশি দামের বাজারে"
            color="var(--up)"
          />
          <StatCard
            label="গড় দাম"
            value={formatPrice(stats.avg)}
            note={`প্রতি ${unitName(product.unit)}-এর হিসাবে`}
          />
        </div>
      </section>

     
      <section className="surface px-5 py-5 sm:px-6">
        <h2 className="text-base font-bold sm:text-lg">দামের গতিপ্রকৃতি</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <StatCard label="গতকাল" value={formatPrice(product.yesterday)} note="একদিন আগের দাম" />
          <StatCard label="গত সপ্তাহ" value={formatPrice(product.lastWeek)} note="সাত দিন আগের দাম" />
          <StatCard label="গত মাস" value={formatPrice(product.lastMonth)} note="ত্রিশ দিন আগের দাম" />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold sm:text-lg">বাজারভিত্তিক আজকের দাম</h2>
        <MarketTable markets={product.markets} unit={product.unit} />
      </section>

      <div>
        <Link
          href={`/category/${product.category}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--brand)] hover:underline"
        >
          <ChevronLeft size={16} aria-hidden />
          {product.categoryNameBn} ক্যাটাগরির সব পণ্য
        </Link>
      </div>
    </div>
  );
}