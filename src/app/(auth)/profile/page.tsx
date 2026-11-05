import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Mail, Pencil, User as UserIcon } from "lucide-react";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/profile/SignOutButton";

export const metadata: Metadata = { title: "আমার প্রোফাইল | বাজার দর" };

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  // proxy.ts already guards this route; this is just a safety net
  if (!session?.user) redirect("/signin?callbackUrl=/profile");

  const user = session.user;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
      <div className="text-center">
        <h1 className="text-xl font-bold sm:text-2xl">আমার প্রোফাইল</h1>
        <p className="mt-2 text-xs text-[var(--muted)] sm:text-sm">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* identity card */}
      <div className="surface mt-6 flex flex-col gap-4 bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex min-w-0 items-center gap-4">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={56}
              height={56}
              className="h-14 w-14 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--brand)] text-xl font-semibold text-white">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}

          <div className="min-w-0">
            <p className="truncate text-base font-bold sm:text-lg">{user.name}</p>
            <p className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-[var(--muted)] sm:text-sm">
              <Mail size={14} aria-hidden />
              {user.email}
            </p>
          </div>
        </div>

        <SignOutButton />
      </div>

      {/* account details */}
      <div className="surface mt-4 bg-white px-5 py-5 sm:px-6">
        <h2 className="text-base font-bold sm:text-lg">তথ্য</h2>

        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-[var(--border-soft)] px-4 py-3">
            <dt className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
              <UserIcon size={13} aria-hidden />
              নাম
            </dt>
            <dd className="mt-1 truncate text-sm font-semibold">{user.name}</dd>
          </div>

          <div className="rounded-xl border border-[var(--border-soft)] px-4 py-3">
            <dt className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
              <Mail size={13} aria-hidden />
              ইমেইল (পরিবর্তনযোগ্য নয়)
            </dt>
            <dd className="mt-1 truncate text-sm font-semibold">{user.email}</dd>
          </div>
        </dl>

        <Link
          href="/profile/update-profile"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[var(--brand-dark)]"
        >
          <Pencil size={15} aria-hidden />
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}