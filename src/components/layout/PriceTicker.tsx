"use client";

import Marquee from "react-fast-marquee";
import { formatPct, formatPrice, unitName } from "@/lib/format";
import type { PriceDir } from "@/types/type";

export interface TickerItem {
  id: number;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  dir: PriceDir;
  pct: number;
}

function Change({ dir, pct }: { dir: PriceDir; pct: number }) {
  if (dir === "up")
    return (
      <span className="font-semibold text-[var(--up)]">▲ {formatPct(pct)}</span>
    );
  if (dir === "down")
    return (
      <span className="font-semibold text-[var(--down)]">▼ {formatPct(pct)}</span>
    );
  return <span className="font-semibold text-[var(--flat)]">— {formatPct(0)}</span>;
}

export default function PriceTicker({ items }: { items: TickerItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="border-b border-[var(--border-soft)] bg-[var(--card-bg)] py-2 text-sm">
      <Marquee speed={40} pauseOnHover gradient={false}>
        {items.map((item) => (
          <div
            key={item.id}
            className="mr-6 flex items-center gap-2 border-r border-[var(--border-soft)] pr-6"
          >
            <span>{item.image}</span>
            <span className="font-medium">{item.nameBn}</span>
            <span className="text-gray-600">
              {formatPrice(item.today)}/{unitName(item.unit)}
            </span>
            <Change dir={item.dir} pct={item.pct} />
          </div>
        ))}
      </Marquee>
    </div>
  );
}