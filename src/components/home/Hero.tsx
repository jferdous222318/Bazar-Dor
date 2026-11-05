import Link from "next/link";
import { ArrowDown } from "lucide-react";
import LiveDate from "@/components/ui/LiveDate";

function BasketArt() {
  return (
    <svg
      viewBox="0 0 260 200"
      role="img"
      aria-label="বাজারের ঝুড়িতে সবজি ও ফল"
      className="h-auto w-full max-w-[260px]"
    >
      {/* ground shadow */}
      <ellipse cx="130" cy="183" rx="86" ry="11" fill="#000" opacity="0.07" />

      {/* greens behind the produce */}
      <path
        d="M96 86c-14-10-30-8-38 2 10 10 27 12 38-2Z"
        fill="#2f9e44"
      />
      <path
        d="M170 84c13-11 30-10 38 0-9 11-26 13-38 0Z"
        fill="#37b24d"
      />

      {/* produce */}
      <circle cx="96" cy="96" r="21" fill="#7048e8" />
      <circle cx="130" cy="84" r="27" fill="#51cf66" />
      <circle cx="166" cy="97" r="20" fill="#f76707" />
      <circle cx="113" cy="110" r="15" fill="#f03e3e" />
      <circle cx="150" cy="112" r="14" fill="#fcc419" />

      {/* little stem on the big green one */}
      <path
        d="M130 58c0-8 5-13 12-14-1 8-5 13-12 14Z"
        fill="#2b8a3e"
      />

      {/* basket body */}
      <path
        d="M62 118h136l-14 56a10 10 0 0 1-10 8H86a10 10 0 0 1-10-8l-14-56Z"
        fill="#c2703a"
      />
      {/* weave */}
      <g stroke="#a85a2a" strokeWidth="3" strokeLinecap="round" opacity="0.8">
        <path d="M86 122v58M106 122v58M126 122v58M146 122v58M166 122v58" />
        <path d="M68 140h124M72 158h116" />
      </g>
      {/* rim */}
      <rect x="54" y="110" width="152" height="16" rx="8" fill="#e8a06a" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6 sm:pt-8">
      <div className="surface overflow-hidden px-5 py-8 sm:px-8 sm:py-10">
        <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
          {/* copy */}
          <div>
            <span className="inline-flex items-center rounded-full bg-[var(--brand-soft)] px-3 py-1 text-xs font-medium text-[var(--brand-dark)]">
              <LiveDate />
            </span>

            <h1 className="mt-4 text-2xl font-bold leading-snug sm:text-3xl lg:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="#all-products"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--brand)] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[var(--brand-dark)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] sm:text-base"
            >
              সব পণ্য দেখুন
              <ArrowDown size={16} aria-hidden />
            </Link>
          </div>

          {/* illustration */}
          <div className="flex justify-center md:justify-end">
            <BasketArt />
          </div>
        </div>
      </div>
    </section>
  );
}