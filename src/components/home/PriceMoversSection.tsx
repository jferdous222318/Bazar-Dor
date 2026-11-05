import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { getTopFallers, getTopRisers } from "@/lib/price";
import { formatNumber } from "@/lib/format";
import type { IProduct } from "@/types/type";

const CONFIG = {
  up: {
    title: "আজ দাম বেড়েছে",
    marker: "▲",
    color: "var(--up)",
    subtitle: "গতকালের তুলনায় যে পণ্যগুলোর দাম সবচেয়ে বেশি বেড়েছে",
    empty: "আজ কোনো পণ্যের দাম বাড়েনি।",
    pick: getTopRisers,
  },
  down: {
    title: "আজ দাম কমেছে",
    marker: "▼",
    color: "var(--down)",
    subtitle: "গতকালের তুলনায় যে পণ্যগুলোর দাম সবচেয়ে বেশি কমেছে",
    empty: "আজ কোনো পণ্যের দাম কমেনি।",
    pick: getTopFallers,
  },
} as const;

export default function PriceMoversSection({
  variant,
  products,
  count = 6,
}: {
  variant: "up" | "down";
  products: IProduct[];
  count?: number;
}) {
  const cfg = CONFIG[variant];
  const items = cfg.pick(products, count);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <SectionHeading
        title={cfg.title}
        subtitle={cfg.subtitle}
        marker={cfg.marker}
        markerColor={cfg.color}
        action={
          items.length > 0 ? (
            <span className="text-xs text-[var(--muted)] sm:text-sm">
              {formatNumber(items.length)}টি পণ্য
            </span>
          ) : null
        }
      />

      {items.length === 0 ? (
        <p className="surface px-4 py-8 text-center text-sm text-[var(--muted)]">
          {cfg.empty}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}