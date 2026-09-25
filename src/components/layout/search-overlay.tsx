"use client";

import { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Clock3, Search, Trash2, X } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { useShop } from "@/context/shop-context";
import { products } from "@/data/products";
import { formatCurrency, normalizeText } from "@/lib/utils";

const popularTerms = ["Camiseta", "Vinho", "Listrada", "Essenciais", "Sale"];

export function SearchOverlay() {
  const router = useRouter();
  const {
    searchOpen,
    setSearchOpen,
    searchHistory,
    addSearchTerm,
    clearSearchHistory,
  } = useShop();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalized = normalizeText(query.trim());
    if (!normalized) return [];
    return products
      .filter((product) =>
        normalizeText(
          `${product.name} ${product.category} ${product.collection} ${product.tags.join(" ")}`,
        ).includes(normalized),
      )
      .slice(0, 6);
  }, [query]);

  const submit = (term: string) => {
    const cleaned = term.trim();
    if (!cleaned) return;
    addSearchTerm(cleaned);
    setSearchOpen(false);
    router.push(`/catalogo?busca=${encodeURIComponent(cleaned)}`);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit(query);
  };

  return (
    <Dialog
      open={searchOpen}
      onClose={() => setSearchOpen(false)}
      label="Buscar produtos"
      placement="full"
      panelClassName="h-full w-full overflow-y-auto bg-paper text-chalk"
    >
      <div className="mx-auto max-w-[1500px] px-5 py-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between border-b border-dashed border-line pb-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Search unit / 001</span>
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="grid size-11 place-items-center focus-visible:outline-2"
            aria-label="Fechar busca"
          >
            <X aria-hidden="true" size={22} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="relative border-b border-chalk py-5 sm:py-8">
          <label htmlFor="global-search" className="sr-only">Buscar produtos</label>
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" size={25} />
          <input
            id="global-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="O QUE VOCÊ PROCURA?"
            autoComplete="off"
            className="w-full bg-transparent py-4 pl-11 pr-14 text-2xl font-semibold uppercase tracking-[-0.05em] outline-none placeholder:text-muted sm:text-5xl lg:text-7xl"
          />
          <button
            type="submit"
            className="absolute right-0 top-1/2 grid size-11 -translate-y-1/2 place-items-center transition hover:text-wine focus-visible:outline-2"
            aria-label="Pesquisar"
          >
            <ArrowRight aria-hidden="true" size={24} />
          </button>
        </form>

        {query.trim() ? (
          <section className="py-8" aria-labelledby="search-results-title">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">Resultados instantâneos</span>
                <h2 id="search-results-title" className="mt-1 text-2xl font-semibold uppercase tracking-[-0.05em]">
                  {results.length} encontrado{results.length === 1 ? "" : "s"}
                </h2>
              </div>
              {results.length > 0 && (
                <button
                  type="button"
                  onClick={() => submit(query)}
                  className="font-mono text-[9px] uppercase tracking-[0.12em] underline underline-offset-4 hover:text-wine"
                >
                  Ver todos
                </button>
              )}
            </div>

            {results.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/produto/${product.slug}`}
                    onClick={() => {
                      addSearchTerm(query);
                      setSearchOpen(false);
                    }}
                    className="group grid grid-cols-[84px_1fr] gap-4 border border-line p-2 transition hover:border-chalk"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-graphite">
                      <Image
                        src={product.images[0]}
                        alt=""
                        fill
                        sizes="84px"
                        className="object-cover grayscale transition group-hover:grayscale-0"
                        style={{ objectPosition: product.imagePosition }}
                      />
                    </div>
                    <div className="flex min-w-0 flex-col justify-center">
                      <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">{product.code}</span>
                      <span className="mt-1 text-sm font-semibold uppercase leading-tight">{product.name}</span>
                      <span className="mt-2 text-xs text-muted">{formatCurrency(product.salePrice ?? product.price)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-line px-5 py-14 text-center">
                <p className="text-2xl font-semibold uppercase tracking-[-0.05em]">Nada por aqui</p>
                <p className="mt-2 text-sm text-muted">Tente “camiseta”, “vinho” ou “essenciais”.</p>
              </div>
            )}
          </section>
        ) : (
          <div className="grid gap-10 py-10 md:grid-cols-2">
            <section aria-labelledby="popular-title">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">Atalhos</span>
              <h2 id="popular-title" className="mt-1 text-2xl font-semibold uppercase tracking-[-0.05em]">Termos populares</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {popularTerms.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      submit(term);
                    }}
                    className="min-h-11 border border-line px-4 font-mono text-[9px] uppercase tracking-[0.12em] transition hover:border-chalk hover:bg-chalk hover:text-ink"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </section>

            <section aria-labelledby="history-title">
              <div className="flex items-end justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">Local history</span>
                  <h2 id="history-title" className="mt-1 text-2xl font-semibold uppercase tracking-[-0.05em]">Buscas recentes</h2>
                </div>
                {searchHistory.length > 0 && (
                  <button
                    type="button"
                    onClick={clearSearchHistory}
                    className="grid size-11 place-items-center text-muted transition hover:text-wine focus-visible:outline-2"
                    aria-label="Limpar histórico"
                  >
                    <Trash2 aria-hidden="true" size={17} />
                  </button>
                )}
              </div>
              {searchHistory.length ? (
                <div className="mt-4 divide-y divide-dashed divide-line">
                  {searchHistory.map((term) => (
                    <button
                      type="button"
                      key={term}
                      onClick={() => {
                        setQuery(term);
                        submit(term);
                      }}
                      className="flex min-h-12 w-full items-center gap-3 text-left text-sm uppercase transition hover:text-wine"
                    >
                      <Clock3 aria-hidden="true" size={15} className="text-muted" /> {term}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-5 text-sm text-muted">Seu histórico aparecerá aqui.</p>
              )}
            </section>
          </div>
        )}
      </div>
    </Dialog>
  );
}

