"use client";

import { useSyncExternalStore } from "react";
import { getBanglaDate } from "@/lib/format";

const subscribe = () => () => {};

export default function LiveDate({ className = "" }: { className?: string }) {
  const date = useSyncExternalStore(
    subscribe,
    () => getBanglaDate(),
    () => ""
  );

  // min-height keeps the layout from jumping on hydration
  return <span className={`inline-block min-h-4 ${className}`}>{date}</span>;
}