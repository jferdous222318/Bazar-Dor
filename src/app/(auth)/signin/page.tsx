import { Suspense } from "react";
import type { Metadata } from "next";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = { title: "সাইন ইন | বাজার দর" };

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <SignInForm />
    </Suspense>
  );
}