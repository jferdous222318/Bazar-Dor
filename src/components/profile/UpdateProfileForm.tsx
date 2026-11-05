"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Check, Loader2 } from "lucide-react";
import { updateUser } from "@/lib/auth-client";
import { inputClass, labelClass } from "@/components/auth/AuthCard";

export default function UpdateProfileForm({
  currentName,
  email,
}: {
  currentName: string;
  email: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = name.trim();

    if (!trimmed) return toast.error("নাম খালি রাখা যাবে না");
    if (trimmed.length < 2) return toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
    if (trimmed === currentName) return toast("নামে কোনো পরিবর্তন নেই", { icon: "ℹ️" });

    setLoading(true);
    const { error } = await updateUser({ name: trimmed });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "তথ্য আপডেট করা যায়নি");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="email" className={labelClass}>
          ইমেইল (পরিবর্তনযোগ্য নয়)
        </label>
        <input
          id="email"
          type="email"
          value={email}
          readOnly
          disabled
          className={`${inputClass} cursor-not-allowed bg-black/[0.03] text-[var(--muted)]`}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="name" className={labelClass}>নাম</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার পূর্ণ নাম লিখুন"
          className={inputClass}
        />
        <p className="mt-1.5 text-xs text-[var(--muted)]">
          এই নামটি নেভিগেশন বার ও প্রোফাইলে দেখা যাবে।
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[var(--brand-dark)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" aria-hidden />
        ) : (
          <Check size={16} aria-hidden />
        )}
        আপডেট ইনফরমেশন
      </button>
    </form>
  );
}