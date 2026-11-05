import type { ReactNode } from "react";

export default function SectionHeading({
  title,
  subtitle,
  marker,
  markerColor,
  action,
}: {
  title: string;
  subtitle?: string;
  marker?: string;
  markerColor?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="flex items-center gap-2 text-lg font-bold sm:text-xl">
          {marker && (
            <span aria-hidden style={{ color: markerColor }} className="text-base sm:text-lg">
              {marker}
            </span>
          )}
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-xs text-[var(--muted)] sm:text-sm">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}