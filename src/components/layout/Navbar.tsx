"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { getBanglaDate } from "@/lib/format";
import type { ICategory } from "@/types/type";
import CategoryNav from "./CategoryNav";
function useBanglaDate() {
  return useSyncExternalStore(
    () => () => {},
    () => getBanglaDate(),
    () => ""
  );
}

function Avatar({ name, image }: { name: string; image?: string | null }) {
  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={32}
        height={32}
        className="h-8 w-8 rounded-full object-cover"
      />
    );
  }
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-semibold text-white">
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

function UserMenu({
  user,
}: {
  user: { name: string; email: string; image?: string | null };
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-black/5"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Avatar name={user.name} image={user.image} />
        <span className="hidden max-w-28 truncate text-sm font-medium sm:block">
          {user.name}
        </span>
        <ChevronDown size={14} className="text-gray-500" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-60 rounded-xl border border-[var(--border-soft)] bg-white p-3 shadow-lg"
        >
          <p className="truncate text-sm font-semibold">{user.name}</p>
          <p className="truncate text-xs text-gray-500">{user.email}</p>
          <hr className="my-2 border-[var(--border-soft)]" />
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-gray-100"
          >
            <UserIcon size={15} /> আমার প্রোফাইল
          </Link>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-[var(--down)] hover:bg-red-50"
          >
            <LogOut size={15} /> সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar({ categories }: { categories: ICategory[] }) {
  const { data: session, isPending } = useSession();
  const date = useBanglaDate();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-soft)] bg-[var(--card-bg)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand)] text-lg">
            🛒
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold">বাজার দর</span>
            <span className="block min-h-4 text-[11px] text-gray-500">{date}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {isPending ? (
            <div className="h-9 w-28 animate-pulse rounded-lg bg-gray-200" />
          ) : session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-black/5"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[var(--brand-dark)]"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>
      <CategoryNav categories={categories} />
    </header>
  );
}