"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { useShop } from "@/context/shop-context";
import { products } from "@/data/products";

export function FavoritesPage() {
  const { favorites, hydrated } = useShop();
  const saved = products.filter((product) => favorites.includes(product.id));

  if (!hydrated) {
    return (
      <main id="main-content" className="section-shell py-16" aria-label="Carregando favoritos">
        <div className="skeleton h-20 max-w-xl" />
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">{[0,1,2,3].map((item) => <div key={item} className="skeleton aspect-[3/4]" />)}</div>
      </main>
    );
  }

  if (!saved.length) {
    return (
      <main id="main-content" className="section-shell grid min-h-[70svh] place-items-center py-20 text-center">
        <div className="max-w-xl">
          <Heart aria-hidden="true" className="mx-auto text-wine" size={44} strokeWidth={1.3} />
          <span className="eyebrow mt-7 block">Saved pieces / 00</span>
          <h1 className="mt-3 text-5xl font-semibold uppercase leading-[0.88] tracking-[-0.08em] sm:text-7xl">Nada salvo ainda.</h1>
          <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-muted">Marque o coração nas peças que merecem ficar no seu radar.</p>
          <Link href="/catalogo" className="mt-8 inline-flex min-h-13 items-center gap-3 bg-chalk px-7 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink hover:bg-wine hover:text-chalk">Encontrar peças <ArrowRight aria-hidden="true" size={16} /></Link>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="section-shell py-14 sm:py-20 lg:py-24">
      <div className="mb-12 flex flex-col gap-5 border-b border-dashed border-line pb-9 sm:flex-row sm:items-end sm:justify-between">
        <div><span className="eyebrow">Saved pieces / {String(saved.length).padStart(2, "0")}</span><h1 className="mt-2 text-5xl font-semibold uppercase tracking-[-0.08em] sm:text-7xl">Favoritos</h1></div>
        <p className="max-w-sm text-sm leading-6 text-muted">Sua seleção fica salva neste dispositivo para você continuar depois.</p>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-7">
        {saved.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </main>
  );
}
