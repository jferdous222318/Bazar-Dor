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
  const products = await getProducts();

  return (
    <>
      <Hero />

      <PriceMoversSection variant="up" products={products} />

      <PriceMoversSection variant="down" products={products} />
      <AllProductsSection products={products} />
    </>
  );
}