import Link from "next/link";
import { formatPrice, unitLabel } from "@/lib/format";
import type { IProduct } from "@/types/type";
import ChangeBadge from "@/components/ui/ChangeBadge";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="surface group block p-4 transition-[box-shadow,border-color,transform] hover:-translate-y-0.5 hover:border-[var(--brand)]/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] sm:p-5"
    >
      {/* icon + name */}
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-soft)] text-xl"
        >
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold group-hover:text-[var(--brand)] sm:text-base">
            {product.nameBn}
          </h3>
          <p className="mt-0.5 text-xs text-[var(--muted)]">
            {unitLabel(product.unit)}
          </p>
        </div>
      </div>

      {/* today's price + change */}
      <div className="mt-4 border-t border-[var(--border-soft)] pt-4">
        <p className="text-xs text-[var(--muted)]">আজকের দাম</p>
        <div className="mt-1 flex items-end justify-between gap-2">
          <p className="text-lg font-bold tabular-nums sm:text-xl">
            {formatPrice(product.today)}
          </p>
          <ChangeBadge dir={product.change.dir} pct={product.change.pct} />
        </div>
      </div>
    </Link>
  );
}