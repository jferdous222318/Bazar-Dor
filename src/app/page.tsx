import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import PriceMoversSection from "@/components/home/PriceMoversSection";
import AllProductsSection from "@/components/home/AllProductsSection";
import { getProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "বাজার দর | আজকের বাজারের দাম এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।",
};

export default async function Home() {
  // one fetch, shared by all three sections.
  // layout.tsx already calls getProducts() for the ticker — Next dedupes it,
  // so this does not cause a second network request.
  const products = await getProducts();

  return (
    <>
      <Hero />

      {/* ▲ আজ দাম বেড়েছে — top 6 risers */}
      <PriceMoversSection variant="up" products={products} />

      {/* ▼ আজ দাম কমেছে — top 6 fallers */}
      <PriceMoversSection variant="down" products={products} />

      {/* সব পণ্য — the #all-products anchor the hero button scrolls to */}
      <AllProductsSection products={products} />
    </>
  );
}