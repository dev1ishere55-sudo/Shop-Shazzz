import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-plum">
        THE BRAND
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-navy">
        Shop Shazzz
      </h1>
      <p className="mt-1 text-lg tracking-wide text-foreground/70">
        Curated retail. For the cool kids.
      </p>

      <div className="mt-10 space-y-6 text-sm leading-relaxed text-foreground/85">
        <p>
          We’re based around Keffi, Abuja, Kaduna and Jos — and we ship further
          when it makes sense.
        </p>
        <p>
          Two ways we work: pieces we already hold (ready to go), and curated
          finds we source on demand from other stores and sellers. You order
          through us; we handle the rest.
        </p>
        <p>
          No corporate fluff. Just good pieces, clear communication, and
          delivery that actually shows up.
        </p>
      </div>

      <div className="mt-12 space-y-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-navy">
          Contact
        </h2>
        <div className="space-y-3 text-sm">
          <a
            href="https://instagram.com/shopshazzz"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-plum hover:underline"
          >
            Instagram → @shopshazzz
          </a>
          <a
            href="https://wa.me/2340000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-plum hover:underline"
          >
            WhatsApp → Chat with us
          </a>
          <p className="text-muted">
            Delivery zones: Keffi · Abuja · Kaduna · Jos (+ other on request)
          </p>
        </div>
      </div>

      <div className="mt-10">
        <Link
          href="/shop"
          className="inline-block rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white"
        >
          Shop now
        </Link>
      </div>
    </div>
  );
}
