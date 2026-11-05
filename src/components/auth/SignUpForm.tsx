"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import AuthCard, { inputClass, labelClass } from "./AuthCard";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);

  const callbackUrl = params.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirmPassword") || "");

    if (!name) return toast.error("আপনার নাম লিখুন");
    if (!email) return toast.error("ইমেইল ঠিকানা লিখুন");
    if (password.length < 8)
      return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm)
      return toast.error("দুটি পাসওয়ার্ড মিলছে না");

    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে");
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <AuthCard
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
      footer={
        <>
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-medium text-[var(--brand)] hover:underline">
            সাইন ইন করুন
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name" className={labelClass}>নাম</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="যেমন: রহিম উদ্দিন"
            className={inputClass}
          />
        </div>

        <div className="mt-4">
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
            autoComplete="new-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            className={inputClass}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="confirmPassword" className={labelClass}>
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="আবার লিখুন"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[var(--brand-dark)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Loader2 size={16} className="animate-spin" aria-hidden />}
          অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>

      <SocialButtons callbackUrl={callbackUrl} disabled={loading} />
    </AuthCard>
  );
}