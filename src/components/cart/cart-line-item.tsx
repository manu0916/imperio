"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useShop } from "@/context/shop-context";
import { productById } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import type { CartItem } from "@/types/product";

export function CartLineItem({ item, compact = false }: { item: CartItem; compact?: boolean }) {
  const { removeFromCart, updateCartItem, setCartOpen } = useShop();
  const product = productById(item.productId);
  if (!product) return null;

  return (
    <article className={`grid gap-4 border-b border-dashed border-line py-5 ${compact ? "grid-cols-[88px_1fr]" : "grid-cols-[112px_1fr] sm:grid-cols-[140px_1fr]"}`}>
      <Link
        href={`/produto/${product.slug}`}
        onClick={() => setCartOpen(false)}
        className="rough-frame relative aspect-[3/4] overflow-hidden bg-graphite"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes={compact ? "88px" : "140px"}
          className="object-cover"
          style={{ objectPosition: product.imagePosition }}
        />
      </Link>

      <div className="flex min-w-0 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">{product.code}</span>
            <Link
              href={`/produto/${product.slug}`}
              onClick={() => setCartOpen(false)}
              className="mt-1 block text-sm font-semibold uppercase leading-tight hover:text-wine"
            >
              {product.name}
            </Link>
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(item)}
            className="grid size-10 shrink-0 place-items-center text-muted transition hover:text-wine focus-visible:outline-2"
            aria-label={`Remover ${product.name}`}
          >
            <Trash2 aria-hidden="true" size={16} />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <label className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
            Cor
            <select
              value={item.color}
              onChange={(event) => updateCartItem(item, { color: event.target.value })}
              className="mt-1 h-10 w-full border border-line bg-transparent px-2 text-xs text-chalk focus:border-chalk focus:outline-none"
            >
              {product.colors.map((color) => (
                <option key={color.name} value={color.name} className="bg-ink">
                  {color.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
            Tamanho
            <select
              value={item.size}
              onChange={(event) => updateCartItem(item, { size: event.target.value })}
              className="mt-1 h-10 w-full border border-line bg-transparent px-2 text-xs text-chalk focus:border-chalk focus:outline-none"
            >
              {product.sizes.map((size) => (
                <option
                  key={size.label}
                  value={size.label}
                  disabled={size.stock === 0}
                  className="bg-ink"
                >
                  {size.label}{size.stock === 0 ? " — esgotado" : ""}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="flex h-10 items-center border border-line">
            <button
              type="button"
              onClick={() => updateCartItem(item, { quantity: item.quantity - 1 })}
              className="grid size-10 place-items-center hover:bg-graphite focus-visible:outline-2"
              aria-label="Diminuir quantidade"
            >
              <Minus aria-hidden="true" size={14} />
            </button>
            <span className="w-8 text-center font-mono text-xs" aria-label={`Quantidade ${item.quantity}`}>
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateCartItem(item, { quantity: item.quantity + 1 })}
              className="grid size-10 place-items-center hover:bg-graphite focus-visible:outline-2"
              aria-label="Aumentar quantidade"
            >
              <Plus aria-hidden="true" size={14} />
            </button>
          </div>
          <span className="text-sm font-semibold">
            {formatCurrency((product.salePrice ?? product.price) * item.quantity)}
          </span>
        </div>
      </div>
    </article>
  );
}

