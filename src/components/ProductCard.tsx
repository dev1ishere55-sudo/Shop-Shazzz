import Link from "next/link";
import { Product } from "@/types";
import { formatNaira } from "@/data/products";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const isCurated = product.type === "curated_find";

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-border/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-2.5 top-2.5">
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide ${
              isCurated
                ? "bg-plum/90 text-white"
                : "bg-navy/90 text-white"
            }`}
          >
            {isCurated ? "Curated Find" : "In Stock"}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground">
          {product.name}
        </h3>
        <div className="mt-auto flex flex-col gap-0.5">
          <span className="price-pill w-fit">{formatNaira(product.price_naira)}</span>
          <span className="store-badge">Shop Shazzz</span>
        </div>
      </div>
    </Link>
  );
}
