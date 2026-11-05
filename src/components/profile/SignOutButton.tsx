"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[var(--up)]/40 px-4 py-2 text-sm font-medium text-[var(--up)] transition-colors hover:bg-[var(--up-soft)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <Loader2 size={15} className="animate-spin" aria-hidden />
      ) : (
        <LogOut size={15} aria-hidden />
      )}
      সাইন আউট
    </button>
  );
}