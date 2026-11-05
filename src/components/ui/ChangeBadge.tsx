import { formatPct } from "@/lib/format";
import type { PriceDir } from "@/types/type";

const STYLE: Record<PriceDir, { arrow: string; color: string; soft: string }> = {
  up: { arrow: "▲", color: "var(--up)", soft: "var(--up-soft)" },
  down: { arrow: "▼", color: "var(--down)", soft: "var(--down-soft)" },
  flat: { arrow: "—", color: "var(--flat)", soft: "var(--flat-soft)" },
};

export default function ChangeBadge({
  dir,
  pct,
  variant = "plain",
  className = "",
}: {
  dir: PriceDir;
  pct: number;
  /** "plain" = bare text (cards, ticker) · "soft" = tinted pill (detail header) */
  variant?: "plain" | "soft";
  className?: string;
}) {
  const s = STYLE[dir];
  const label = dir === "flat" ? formatPct(0) : formatPct(pct);

  return (
    <span
      style={{
        color: s.color,
        backgroundColor: variant === "soft" ? s.soft : undefined,
      }}
      className={`inline-flex items-center gap-1 whitespace-nowrap text-xs font-semibold tabular-nums sm:text-sm ${
        variant === "soft" ? "rounded-full px-2.5 py-1" : ""
      } ${className}`}
    >
      <span aria-hidden>{s.arrow}</span>
      {label}
      <span className="sr-only">
        {dir === "up" ? "দাম বেড়েছে" : dir === "down" ? "দাম কমেছে" : "দাম অপরিবর্তিত"}
      </span>
    </span>
  );
}