import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export const inputClass =
  "w-full rounded-lg border border-[var(--border-soft)] bg-white px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--brand)]";

export const labelClass = "mb-1.5 block text-sm font-medium";

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-10 sm:py-14">
      <div className="text-center">
        <h1 className="text-xl font-bold sm:text-2xl">{title}</h1>
        <p className="mt-2 text-xs text-[var(--muted)] sm:text-sm">{subtitle}</p>
      </div>

      <div className="surface mt-6 bg-white px-5 py-6 sm:px-6">{children}</div>

      <p className="mt-5 text-center text-sm text-[var(--muted)]">{footer}</p>

      <p className="mt-4 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--brand)]"
        >
          <ArrowLeft size={15} aria-hidden />
          হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}