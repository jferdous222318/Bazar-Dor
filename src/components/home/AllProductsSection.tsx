import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatNumber } from "@/lib/format";
import type { IProduct } from "@/types/type";

export default function AllProductsSection({
  products,
}: {
  products: IProduct[];
}) {
  return (
    <section id="all-products" className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <SectionHeading
        title="সব পণ্য"
        subtitle={`সব ${formatNumber(products.length)}টি পণ্য দেখানো হচ্ছে`}
      />

      {products.length === 0 ? (
        <p className="surface px-4 py-10 text-center text-sm text-[var(--muted)]">
          এখন কোনো পণ্যের তথ্য পাওয়া যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}