"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ICategory } from "@/types/type";

export default function CategoryNav({ categories }: { categories: ICategory[] }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="border-t border-[var(--border-soft)]"
    >
      <div className="no-scrollbar mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2">
        {categories.map((cat) => {
          const href = `/category/${cat.slug}`;
          const active = pathname === href;
          return (
            <Link
              key={cat.id}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors ${
                active
                  ? "bg-[var(--brand)] font-medium text-white shadow-sm"
                  : "text-gray-700 hover:bg-black/5"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.nameBn}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}