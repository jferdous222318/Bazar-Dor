import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";
import { getCategories, getProducts } from "@/lib/api";

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-bn",
  subsets: ["bengali", "latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর | আজকের বাজারের দাম এক নজরে",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলা।",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // never let an API failure break the whole layout
  const [categories, products] = await Promise.all([
    getCategories().catch(() => []),
    getProducts().catch(() => []),
  ]);

  const tickerItems = products.map((p) => ({
    id: p.id,
    nameBn: p.nameBn,
    image: p.image,
    unit: p.unit,
    today: p.today,
    dir: p.change.dir,
    pct: p.change.pct,
  }));

  return (
    <html lang="bn" className={notoBengali.variable}>
      <body className="flex min-h-screen flex-col">
        <Navbar categories={categories} />
        <PriceTicker items={tickerItems} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}