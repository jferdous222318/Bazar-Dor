"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import SortDropdown from "./SortDropdown";
import { sortProducts } from "@/lib/price";
import { formatNumber } from "@/lib/format";
import type { IProduct, SortMode } from "@/types/type";

export default function ProductGrid({
  products,
  emptyText = "এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।",
}: {
  products: IProduct[];
  emptyText?: string;
}) {
  const [sort, setSort] = useState<SortMode>("default");
  const items = sortProducts(products, sort);

  return (
    <div className="space-y-4">
      <div className="surface flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <p className="text-xs text-[var(--muted)] sm:text-sm">
          মোট {formatNumber(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {items.length === 0 ? (
        <p className="surface px-4 py-10 text-center text-sm text-[var(--muted)]">
          {emptyText}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}