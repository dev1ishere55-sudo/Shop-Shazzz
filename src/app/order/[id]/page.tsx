"use client";

import { use } from "react";
import Link from "next/link";

const STEPS = [
  { key: "placed", label: "Placed" },
  { key: "sourcing", label: "Sourcing / Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "delivered", label: "Delivered" },
];

export default function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const currentStep = 0;

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-navy/10">
        <span className="text-2xl">✓</span>
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-navy">
        Order confirmed
      </h1>
      <p className="mt-2 text-sm text-muted">
        Order <span className="font-mono font-medium text-foreground">{id}</span>
      </p>
      <p className="mt-4 text-sm text-foreground/80">
        We’ve got it. You’ll get updates on Telegram (or WhatsApp if that’s how
        you reached us).
      </p>

      <div className="mt-10 text-left">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
          Status
        </p>
        <ol className="space-y-4">
          {STEPS.map((step, i) => {
            const done = i <= currentStep;
            const active = i === currentStep;
            return (
              <li key={step.key} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    done
                      ? "bg-navy text-white"
                      : "border border-border text-muted"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </span>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      active ? "text-navy" : done ? "text-foreground" : "text-muted"
                    }`}
                  >
                    {step.label}
                  </p>
                  {active && (
                    <p className="text-xs text-muted">Just now</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-10 flex flex-col gap-3">
        <Link
          href="/shop"
          className="rounded-full bg-navy py-3 text-sm font-semibold text-white"
        >
          Keep shopping
        </Link>
        <a
          href="https://instagram.com/shopshazzz"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-plum hover:underline"
        >
          DM us on Instagram
        </a>
      </div>
    </div>
  );
}
