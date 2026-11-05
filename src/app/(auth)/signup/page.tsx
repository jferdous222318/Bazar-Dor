import { Suspense } from "react";
import type { Metadata } from "next";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = { title: "সাইন আপ | বাজার দর" };

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <SignUpForm />
    </Suspense>
  );
}