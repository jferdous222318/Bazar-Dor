"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";

type Provider = "google" | "github";

export default function SocialButtons({
  callbackUrl = "/",
  disabled = false,
}: {
  callbackUrl?: string;
  disabled?: boolean;
}) {
  const [pending, setPending] = useState<Provider | null>(null);

  const handle = async (provider: Provider) => {
    setPending(provider);
    const { error } = await signIn.social({ provider, callbackURL: callbackUrl });

    // on success the browser leaves for the provider, so we only land here on failure
    if (error) {
      toast.error(error.message ?? "সাইন ইন করা যায়নি, আবার চেষ্টা করুন");
      setPending(null);
    }
  };

  const btn =
    "flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border-soft)] bg-white px-3 py-2.5 text-sm font-medium transition-colors hover:bg-black/[0.03] disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <>
      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-[var(--border-soft)]" />
        <span className="text-xs text-[var(--muted)]">অথবা</span>
        <span className="h-px flex-1 bg-[var(--border-soft)]" />
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <button
          type="button"
          onClick={() => handle("google")}
          disabled={disabled || pending !== null}
          className={btn}
        >
          {pending === "google" ? (
            <Loader2 size={17} className="animate-spin" aria-hidden />
          ) : (
            <FcGoogle size={17} aria-hidden />
          )}
          Google দিয়ে চালিয়ে যান
        </button>

        <button
          type="button"
          onClick={() => handle("github")}
          disabled={disabled || pending !== null}
          className={btn}
        >
          {pending === "github" ? (
            <Loader2 size={17} className="animate-spin" aria-hidden />
          ) : (
            <FaGithub size={17} aria-hidden />
          )}
          GitHub দিয়ে চালিয়ে যান
        </button>
      </div>
    </>
  );
}