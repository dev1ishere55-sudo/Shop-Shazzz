"use client";

import { products } from "@/data/products";
import { formatNaira } from "@/data/products";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold text-navy">Admin</h1>
      <p className="mt-1 text-sm text-muted">
        Lightweight product & order overview. Protect this route in production
        (Supabase Auth or simple password).
      </p>

      <section className="mt-10">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted">
          Products ({products.length})
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-card">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-card/50">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        p.type === "in_stock"
                          ? "bg-navy/10 text-navy"
                          : "bg-plum/10 text-plum"
                      }`}
                    >
                      {p.type === "in_stock" ? "In Stock" : "Curated"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{formatNaira(p.price_naira)}</td>
                  <td className="px-4 py-3 text-muted">
                    {p.stock_qty ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-8 text-xs text-muted">
        Next: wire Supabase for real CRUD, order status updates, and Telegram
        bot notifications.
      </p>
    </div>
  );
}
