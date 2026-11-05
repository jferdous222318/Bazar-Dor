import { getCategories, getProducts } from "@/lib/api";
import { formatPrice, getBanglaDate, unitLabel } from "@/lib/format";
import { getPriceStats, getTopRisers } from "@/lib/price";

export default async function Home() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const stats = getPriceStats(products[3]); // বাটাম সাইজ চাল

  return (
    <pre style={{ padding: 20 }}>
      {getBanglaDate()}
      {"\n"}categories: {categories.length} | products: {products.length}
      {"\n"}ইলিশ: {formatPrice(products[18].today)} {unitLabel(products[18].unit)}
      {"\n"}বাটাম min/max/avg: {formatPrice(stats.min)} / {formatPrice(stats.max)} / {formatPrice(stats.avg)}
      {"\n"}risers: {getTopRisers(products).map((p) => p.nameBn).join(", ")}
    </pre>
  );
}