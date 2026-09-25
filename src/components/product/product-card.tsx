"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useShop } from "@/context/shop-context";
import type { Product } from "@/types/product";

export function ProductCard({
  product,
  priority = false,
  compact = false,
}: {
  product: Product;
  priority?: boolean;
  compact?: boolean;
}) {
  const { addToCart, isFavorite, toggleFavorite, notify } = useShop();
  const reducedMotion = useReducedMotion();
  const favorite = isFavorite(product.id);
  const firstSize = product.sizes.find((size) => size.stock > 0);
  const currentPrice = product.salePrice ?? product.price;
  const discount = product.salePrice
    ? Math.round((1 - product.salePrice / product.price) * 100)
    : 0;

  const quickAdd = () => {
    if (!product.available || !firstSize) {
      notify("Produto indisponível no momento");
      return;
    }
    addToCart(product.id, {
      size: firstSize.label,
      color: product.colors[0].name,
    });
  };

  return (
    <motion.article
      layout={!reducedMotion}
      className="product-card group min-w-0"
      whileHover={reducedMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.24 }}
    >
      <div className="rough-frame relative overflow-hidden bg-graphite">
        <Link
          href={`/produto/${product.slug}`}
          className={`relative block overflow-hidden bg-graphite ${
            compact ? "aspect-[4/5]" : "aspect-[3/4]"
          }`}
          aria-label={`Ver ${product.name}`}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes={compact ? "(max-width: 768px) 50vw, 25vw" : "(max-width: 768px) 50vw, 33vw"}
            className="xerox-image object-cover transition duration-700 ease-out group-hover:scale-[1.035] group-hover:opacity-0"
            style={{ objectPosition: product.imagePosition }}
          />
          <Image
            src={product.images[1] ?? product.images[0]}
            alt=""
            fill
            sizes={compact ? "(max-width: 768px) 50vw, 25vw" : "(max-width: 768px) 50vw, 33vw"}
            className="object-cover opacity-0 transition duration-700 ease-out group-hover:scale-[1.035] group-hover:opacity-100"
            style={{ objectPosition: product.imagePosition }}
          />
        </Link>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0 sm:block">
          <button
            type="button"
            onClick={quickAdd}
            disabled={!product.available}
            className="pointer-events-auto flex min-h-11 w-full items-center justify-center gap-2 bg-chalk px-4 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink transition hover:bg-wine hover:text-chalk disabled:cursor-not-allowed disabled:bg-graphite disabled:text-muted"
          >
            <Plus aria-hidden="true" size={15} />
            {product.available ? `Adicionar · ${firstSize?.label}` : "Esgotado"}
          </button>
        </div>

        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className={`px-2.5 py-1 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] ${
                tag === "Sale" || tag.startsWith("-")
                  ? "bg-wine text-chalk"
                  : "bg-ink/90 text-chalk"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-label={favorite ? `Remover ${product.name} dos favoritos` : `Salvar ${product.name} nos favoritos`}
          aria-pressed={favorite}
          className="absolute right-3 top-3 grid size-11 place-items-center border border-chalk/20 bg-ink/80 text-chalk transition hover:border-wine hover:text-wine focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chalk"
        >
          <Heart aria-hidden="true" size={18} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="border-b border-dashed border-line py-4">
        <div className="mb-2 flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
          <span>{product.code} / {product.collection}</span>
          <span>{product.audience}</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              href={`/produto/${product.slug}`}
              className="text-sm font-semibold uppercase leading-tight tracking-[-0.03em] transition hover:text-wine focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-xs text-muted">{product.category}</p>
          </div>
          <div className="shrink-0 text-right text-sm">
            {product.salePrice && (
              <span className="block text-[10px] text-muted line-through">
                {formatCurrency(product.price)}
              </span>
            )}
            <span className={product.salePrice ? "font-semibold text-wine" : "font-semibold"}>
              {formatCurrency(currentPrice)}
            </span>
            {discount > 0 && <span className="ml-1 font-mono text-[9px] text-wine">-{discount}%</span>}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex gap-2" aria-label="Cores disponíveis">
            {product.colors.map((color) => (
              <span
                key={color.name}
                className="size-3.5 rounded-full border border-chalk/30"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={quickAdd}
            disabled={!product.available}
            className="flex min-h-11 items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted transition hover:text-chalk disabled:cursor-not-allowed disabled:opacity-50 sm:hidden"
          >
            <Plus aria-hidden="true" size={14} />
            {product.available ? "Adicionar" : "Esgotado"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
