import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "@/components/profile/UpdateProfileForm";

export const metadata: Metadata = { title: "তথ্য আপডেট | বাজার দর" };

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) redirect("/signin?callbackUrl=/profile/update-profile");

  const user = session.user;

  return (
    <div className="mx-auto max-w-md px-4 py-8 sm:py-12">
      <Link
        href="/profile"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--brand)]"
      >
        <ArrowLeft size={15} aria-hidden />
        প্রোফাইলে ফিরে যান
      </Link>

      <div className="mt-6 text-center">
        <h1 className="text-xl font-bold sm:text-2xl">তথ্য আপডেট করুন</h1>
        <p className="mt-2 text-xs text-[var(--muted)] sm:text-sm">
          আপনার প্রোফাইলের নাম পরিবর্তন করুন।
        </p>
      </div>

      <div className="surface mt-6 bg-white px-5 py-6 sm:px-6">
        <UpdateProfileForm currentName={user.name} email={user.email} />
      </div>
    </div>
  );
}