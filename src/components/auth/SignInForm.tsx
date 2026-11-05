"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import AuthCard, { inputClass, labelClass } from "./AuthCard";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);

  const callbackUrl = params.get("callbackUrl") || "/";
  const reason = params.get("reason");

  // toast once when proxy.ts bounced the user here from a protected route
  const warned = useRef(false);
  useEffect(() => {
    if (reason === "protected" && !warned.current) {
      warned.current = true;
      toast("এই পেজটি দেখতে আগে সাইন ইন করুন", { icon: "🔒" });
    }
  }, [reason]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দুটোই দিন");
      return;
    }
    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "ইমেইল বা পাসওয়ার্ড সঠিক নয়");
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <AuthCard
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
      footer={
        <>
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-medium text-[var(--brand)] hover:underline">
            সাইন আপ করুন
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email" className={labelClass}>ইমেইল</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className={labelClass}>পাসওয়ার্ড</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[var(--brand-dark)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Loader2 size={16} className="animate-spin" aria-hidden />}
          সাইন ইন
        </button>
      </form>

      <SocialButtons callbackUrl={callbackUrl} disabled={loading} />
    </AuthCard>
  );
}