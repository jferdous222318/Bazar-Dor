import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:py-24">
      <span aria-hidden className="text-5xl sm:text-6xl">
        🧺
      </span>

      <p className="mt-6 text-5xl font-bold text-[var(--brand)] sm:text-6xl">
        ৪০৪
      </p>

      <h1 className="mt-3 text-xl font-bold sm:text-2xl">
        পেজটি খুঁজে পাওয়া যায়নি
      </h1>

      <p className="mt-2 max-w-md text-sm text-[var(--muted)] sm:text-base">
        আপনি যে পণ্য বা ক্যাটাগরিটি খুঁজছেন সেটি সরিয়ে ফেলা হয়েছে, অথবা
        ঠিকানাটি সঠিক নয়।
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[var(--brand-dark)]"
        >
          <Home size={16} aria-hidden />
          হোম পেজে ফিরে যান
        </Link>

        <Link
          href="/#all-products"
          className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-soft)] bg-white px-5 py-2.5 text-sm font-medium transition-colors hover:bg-black/5"
        >
          <Search size={16} aria-hidden />
          সব পণ্য দেখুন
        </Link>
      </div>
    </div>
  );
}