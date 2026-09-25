"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, LockKeyhole, ShoppingBag, Tag, Truck } from "lucide-react";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { brandConfig } from "@/config/brand";
import { useShop } from "@/context/shop-context";
import { formatCurrency } from "@/lib/utils";

export function CartPage() {
  const { cart, subtotal, hydrated, notify } = useShop();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal >= brandConfig.freeShippingThreshold ? 0 : 24.9;
  const total = Math.max(0, subtotal - discount + shipping);
  const remaining = Math.max(0, brandConfig.freeShippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / brandConfig.freeShippingThreshold) * 100);

  const applyCoupon = (event: FormEvent) => {
    event.preventDefault();
    if (coupon.trim().toUpperCase() === "UNDER10") {
      setCouponApplied(true);
      setCouponMessage("UNDER10 aplicado: 10% de desconto.");
    } else {
      setCouponApplied(false);
      setCouponMessage("Cupom inválido. Experimente UNDER10.");
    }
  };

  if (!hydrated) {
    return (
      <main id="main-content" className="section-shell py-14 sm:py-20" aria-label="Carregando sacola">
        <div className="skeleton h-16 max-w-md" />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_400px]">
          <div className="skeleton h-[420px]" />
          <div className="skeleton h-[360px]" />
        </div>
      </main>
    );
  }

  if (!cart.length) {
    return (
      <main id="main-content" className="section-shell grid min-h-[70svh] place-items-center py-20 text-center">
        <div className="max-w-xl">
          <ShoppingBag aria-hidden="true" className="mx-auto text-wine" size={42} strokeWidth={1.4} />
          <span className="eyebrow mt-7 block">Bag status / empty</span>
          <h1 className="mt-3 text-5xl font-semibold uppercase leading-[0.88] tracking-[-0.08em] sm:text-7xl">Sua sacola está vazia.</h1>
          <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-muted">O próximo look ainda está no catálogo. Encontre uma peça e volte quando quiser.</p>
          <Link href="/catalogo" className="mt-8 inline-flex min-h-13 items-center gap-3 bg-chalk px-7 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink hover:bg-wine hover:text-chalk">
            Explorar catálogo <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="section-shell py-12 sm:py-16 lg:py-20">
      <div className="border-b border-dashed border-line pb-8">
        <span className="eyebrow">Order draft / {String(cart.length).padStart(2, "0")}</span>
        <h1 className="mt-2 text-5xl font-semibold uppercase tracking-[-0.08em] sm:text-7xl">Sua sacola</h1>
      </div>

      <div className="grid gap-12 py-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
        <section aria-labelledby="bag-items-title">
          <h2 id="bag-items-title" className="sr-only">Itens da sacola</h2>
          {cart.map((item) => (
            <CartLineItem key={`${item.productId}-${item.color}-${item.size}`} item={item} />
          ))}
          <Link href="/catalogo" className="mt-7 inline-flex min-h-11 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] underline underline-offset-4 hover:text-wine">
            Continuar comprando <ArrowRight aria-hidden="true" size={14} />
          </Link>
        </section>

        <aside className="lg:sticky lg:top-32 lg:self-start" aria-labelledby="summary-title">
          <div className="border border-line bg-ink p-6 sm:p-8">
            <span className="eyebrow">Checkout / demo</span>
            <h2 id="summary-title" className="mt-2 text-2xl font-semibold uppercase tracking-[-0.05em]">Resumo do pedido</h2>

            <div className="mt-7 border border-dashed border-line p-4">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em]"><Truck aria-hidden="true" size={15} /> Frete grátis</div>
              <div className="mt-4 h-1.5 overflow-hidden bg-graphite"><div className="h-full bg-wine transition-all" style={{ width: `${progress}%` }} /></div>
              <p className="mt-3 text-xs text-muted">{remaining > 0 ? `Faltam ${formatCurrency(remaining)} para liberar o frete.` : "Frete grátis liberado para este pedido."}</p>
            </div>

            <form onSubmit={applyCoupon} className="mt-6" noValidate>
              <label htmlFor="coupon" className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.1em]"><Tag aria-hidden="true" size={14} /> Cupom</label>
              <div className="mt-2 flex border-b border-line">
                <input id="coupon" value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="CÓDIGO" className="min-h-12 min-w-0 flex-1 bg-transparent px-1 text-sm uppercase outline-none placeholder:text-muted" />
                <button type="submit" className="px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] hover:text-wine">Aplicar</button>
              </div>
              <p className="mt-2 min-h-5 text-xs text-muted" aria-live="polite">{couponMessage || "Use UNDER10 para testar."}</p>
            </form>

            <dl className="mt-6 space-y-3 border-y border-dashed border-line py-6 text-sm">
              <div className="flex justify-between gap-5"><dt className="text-muted">Subtotal</dt><dd>{formatCurrency(subtotal)}</dd></div>
              {couponApplied && <div className="flex justify-between gap-5 text-success"><dt>Desconto</dt><dd>− {formatCurrency(discount)}</dd></div>}
              <div className="flex justify-between gap-5"><dt className="text-muted">Entrega</dt><dd>{shipping === 0 ? "Grátis" : formatCurrency(shipping)}</dd></div>
              <div className="flex items-end justify-between gap-5 pt-3 text-lg font-semibold"><dt>Total</dt><dd className="text-2xl">{formatCurrency(total)}</dd></div>
            </dl>

            <button type="button" onClick={() => notify("Checkout demonstrativo: integração pronta para próxima etapa")} className="mt-7 flex min-h-14 w-full items-center justify-center gap-3 bg-chalk px-6 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink transition hover:bg-wine hover:text-chalk">
              Finalizar pedido <ArrowRight aria-hidden="true" size={16} />
            </button>
            <p className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-muted"><LockKeyhole aria-hidden="true" size={14} className="mt-0.5 shrink-0" /> Ambiente demonstrativo. Nenhum pagamento será cobrado.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
