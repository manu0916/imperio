"use client";

import Link from "next/link";
import { ShoppingBag, X } from "lucide-react";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { Dialog } from "@/components/ui/dialog";
import { brandConfig } from "@/config/brand";
import { useShop } from "@/context/shop-context";
import { clamp, formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const {
    cart,
    cartCount,
    cartOpen,
    setCartOpen,
    subtotal,
    notify,
  } = useShop();
  const remaining = Math.max(brandConfig.freeShippingThreshold - subtotal, 0);
  const progress = clamp((subtotal / brandConfig.freeShippingThreshold) * 100, 0, 100);

  return (
    <Dialog
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      label="Sacola de compras"
      placement="right"
      panelClassName="flex h-full w-full max-w-[520px] flex-col border-l border-line bg-paper text-chalk"
    >
      <div className="flex items-center justify-between border-b border-dashed border-line px-5 py-4 sm:px-7">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">Bag / {String(cartCount).padStart(2, "0")}</span>
          <h2 className="text-2xl font-semibold uppercase tracking-[-0.05em]">Sua sacola</h2>
        </div>
        <button
          type="button"
          onClick={() => setCartOpen(false)}
          className="grid size-11 place-items-center focus-visible:outline-2"
          aria-label="Fechar sacola"
        >
          <X aria-hidden="true" size={21} />
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="mb-6 grid size-20 place-items-center border border-dashed border-line">
            <ShoppingBag aria-hidden="true" size={30} strokeWidth={1.3} />
          </div>
          <h3 className="text-3xl font-semibold uppercase tracking-[-0.06em]">Sacola vazia</h3>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
            O Drop 01 já está no ar. Encontre uma peça para começar sua rotação.
          </p>
          <Link
            href="/catalogo"
            onClick={() => setCartOpen(false)}
            className="mt-7 flex min-h-12 items-center justify-center bg-chalk px-7 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink hover:bg-wine hover:text-chalk"
          >
            Explorar catálogo
          </Link>
        </div>
      ) : (
        <>
          <div className="border-b border-line px-5 py-4 sm:px-7">
            <div className="mb-2 flex justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
              <span>
                {remaining > 0
                  ? `Faltam ${formatCurrency(remaining)} para frete grátis`
                  : "Frete grátis desbloqueado"}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-graphite" aria-hidden="true">
              <div className="h-full bg-wine transition-[width] duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 sm:px-7">
            {cart.map((item) => (
              <CartLineItem key={`${item.productId}-${item.size}-${item.color}`} item={item} compact />
            ))}
          </div>

          <div className="border-t border-line bg-[#111] px-5 py-5 sm:px-7">
            <div className="mb-5 flex items-end justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Subtotal</span>
              <span className="text-2xl font-semibold">{formatCurrency(subtotal)}</span>
            </div>
            <p className="mb-4 text-xs text-muted">Frete e descontos calculados na próxima etapa.</p>
            <button
              type="button"
              onClick={() => notify("Checkout demonstrativo — integração futura")}
              className="flex min-h-13 w-full items-center justify-center bg-chalk px-6 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink transition hover:bg-wine hover:text-chalk"
            >
              Finalizar compra
            </button>
            <Link
              href="/sacola"
              onClick={() => setCartOpen(false)}
              className="mt-3 flex min-h-11 items-center justify-center border border-line font-mono text-[9px] uppercase tracking-[0.12em] hover:border-chalk"
            >
              Ver sacola completa
            </Link>
          </div>
        </>
      )}
    </Dialog>
  );
}
