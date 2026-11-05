import { formatPrice, unitName } from "@/lib/format";
import { marketAvg } from "@/lib/price";
import type { IMarketPrice } from "@/types/type";

export default function MarketTable({
  markets,
  unit,
}: {
  markets: IMarketPrice[];
  unit: string;
}) {
  // cheapest market first
  const rows = [...markets].sort((a, b) => marketAvg(a) - marketAvg(b));

  if (rows.length === 0) {
    return (
      <p className="surface px-4 py-10 text-center text-sm text-[var(--muted)]">
        এই পণ্যের বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
      </p>
    );
  }

  return (
    <div className="surface overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          <caption className="sr-only">
            বাজার অনুযায়ী আজকের সর্বনিম্ন, সর্বাধিক ও গড় দাম
          </caption>

          <thead>
            <tr className="border-b border-[var(--border-soft)] bg-black/[0.02] text-xs text-[var(--muted)]">
              <th scope="col" className="px-4 py-3 font-medium">বাজার</th>
              <th scope="col" className="px-4 py-3 font-medium">বিভাগ</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">সর্বাধিক</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">গড়</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border-soft)]">
            {rows.map((m) => (
              <tr key={`${m.market}-${m.division}`} className="hover:bg-black/[0.02]">
                <th scope="row" className="px-4 py-3 font-medium">
                  {m.market}
                </th>
                <td className="px-4 py-3 text-[var(--muted)]">{m.division}</td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {formatPrice(m.min)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  {formatPrice(m.max)}
                </td>
                <td className="px-4 py-3 text-right font-semibold tabular-nums">
                  {formatPrice(marketAvg(m))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="border-t border-[var(--border-soft)] px-4 py-3 text-xs text-[var(--muted)]">
        সব দাম প্রতি {unitName(unit)} হিসাবে · কম দামের বাজার আগে দেখানো হয়েছে
      </p>
    </div>
  );
}