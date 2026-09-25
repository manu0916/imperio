"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Grid2X2,
  Grid3X3,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { Dialog } from "@/components/ui/dialog";
import { categories, products } from "@/data/products";
import { normalizeText, unique } from "@/lib/utils";

type InitialParams = {
  busca?: string;
  publico?: string;
  colecao?: string;
  sale?: string;
  ordem?: string;
};

type SortOption = "relevancia" | "novidades" | "menor-preco" | "maior-preco";

const allSizes = ["PP", "P", "M", "G", "GG"];
const allColors = unique(products.flatMap((product) => product.colors.map((color) => color.name)));

export function CatalogClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialParams = useMemo<InitialParams>(
    () => ({
      busca: searchParams.get("busca") ?? undefined,
      publico: searchParams.get("publico") ?? undefined,
      colecao: searchParams.get("colecao") ?? undefined,
      sale: searchParams.get("sale") ?? undefined,
      ordem: searchParams.get("ordem") ?? undefined,
    }),
    [searchParams],
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(500);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sort, setSort] = useState<SortOption>(
    initialParams.ordem === "novidades" ? "novidades" : "relevancia",
  );
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [visibleCount, setVisibleCount] = useState(8);
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    maxPrice < 500 ||
    onlyAvailable ||
    Boolean(initialParams.busca || initialParams.publico || initialParams.colecao || initialParams.sale);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setLoading(true));
    const timer = window.setTimeout(() => setLoading(false), 320);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [maxPrice, onlyAvailable, selectedCategories, selectedColors, selectedSizes, sort]);

  const filtered = useMemo(() => {
    const query = normalizeText(initialParams.busca ?? "");
    const audience = normalizeText(initialParams.publico ?? "");
    const collection = normalizeText((initialParams.colecao ?? "").replaceAll("-", " "));

    const result = products.filter((product) => {
      const price = product.salePrice ?? product.price;
      const matchesQuery =
        !query ||
        normalizeText(
          `${product.name} ${product.category} ${product.collection} ${product.tags.join(" ")}`,
        ).includes(query);
      const matchesAudience = !audience || normalizeText(product.audience) === audience;
      const matchesCollection =
        !collection || normalizeText(product.collection).includes(collection.replace("drop 01", "drop 01"));
      const matchesSale = initialParams.sale !== "true" || Boolean(product.salePrice);
      const matchesCategory =
        !selectedCategories.length || selectedCategories.includes(product.category);
      const matchesSize =
        !selectedSizes.length ||
        selectedSizes.some((size) => product.sizes.some((item) => item.label === size && item.stock > 0));
      const matchesColor =
        !selectedColors.length ||
        selectedColors.some((color) => product.colors.some((item) => item.name === color));
      const matchesPrice = price <= maxPrice;
      const matchesAvailability = !onlyAvailable || product.available;
      return (
        matchesQuery &&
        matchesAudience &&
        matchesCollection &&
        matchesSale &&
        matchesCategory &&
        matchesSize &&
        matchesColor &&
        matchesPrice &&
        matchesAvailability
      );
    });

    return [...result].sort((a, b) => {
      if (sort === "novidades") return Number(b.isNew) - Number(a.isNew);
      if (sort === "menor-preco") return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
      if (sort === "maior-preco") return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
      return Number(b.featured) - Number(a.featured);
    });
  }, [initialParams, maxPrice, onlyAvailable, selectedCategories, selectedColors, selectedSizes, sort]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(500);
    setOnlyAvailable(false);
    setVisibleCount(8);
    if (initialParams.busca || initialParams.publico || initialParams.colecao || initialParams.sale || initialParams.ordem) {
      router.push("/catalogo");
    }
  };

  const toggle = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => setter((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]));

  const filterPanel = (
    <Filters
      selectedCategories={selectedCategories}
      selectedSizes={selectedSizes}
      selectedColors={selectedColors}
      maxPrice={maxPrice}
      onlyAvailable={onlyAvailable}
      onCategory={(value) => toggle(value, setSelectedCategories)}
      onSize={(value) => toggle(value, setSelectedSizes)}
      onColor={(value) => toggle(value, setSelectedColors)}
      onMaxPrice={setMaxPrice}
      onAvailability={setOnlyAvailable}
      onClear={clearFilters}
      hasActiveFilters={hasActiveFilters}
    />
  );

  return (
    <main id="main-content" className="min-h-screen">
      <header className="grid-noise border-b border-line py-16 sm:py-20 lg:py-28">
        <div className="section-shell">
          <nav aria-label="Breadcrumb" className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
            <Link href="/" className="hover:text-chalk">Home</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Catálogo</span>
          </nav>
          <div className="mt-7 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <span className="eyebrow">All units / 012</span>
              <h1 className="mt-2 text-6xl font-semibold uppercase leading-[0.8] tracking-[-0.09em] sm:text-8xl lg:text-9xl">
                {initialParams.busca ? `Busca: ${initialParams.busca}` : "Catálogo"}
              </h1>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted">
              Uma rotação de essenciais, cor e textura. Cada peça foi organizada para receber dados reais de API ou CMS no próximo passo.
            </p>
          </div>
        </div>
      </header>

      <div className="section-shell py-8 sm:py-12">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-line pb-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className="flex min-h-11 items-center gap-2 border border-line px-4 font-mono text-[9px] uppercase tracking-[0.12em] hover:border-chalk lg:hidden"
            >
              <SlidersHorizontal aria-hidden="true" size={15} /> Filtros
            </button>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
              {filtered.length} resultado{filtered.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2 sm:flex-none">
            <div className="hidden border border-line sm:flex" aria-label="Densidade da grade">
              <button
                type="button"
                onClick={() => setDensity("comfortable")}
                aria-pressed={density === "comfortable"}
                className={`grid size-11 place-items-center ${density === "comfortable" ? "bg-chalk text-ink" : "hover:bg-graphite"}`}
                aria-label="Grade confortável"
              >
                <Grid2X2 aria-hidden="true" size={16} />
              </button>
              <button
                type="button"
                onClick={() => setDensity("compact")}
                aria-pressed={density === "compact"}
                className={`grid size-11 place-items-center ${density === "compact" ? "bg-chalk text-ink" : "hover:bg-graphite"}`}
                aria-label="Grade compacta"
              >
                <Grid3X3 aria-hidden="true" size={16} />
              </button>
            </div>
            <label className="relative min-w-0 sm:min-w-52">
              <span className="sr-only">Ordenar produtos</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                className="h-11 w-full appearance-none border border-line bg-paper pl-4 pr-10 font-mono text-[9px] uppercase tracking-[0.1em] outline-none focus:border-chalk"
              >
                <option value="relevancia">Relevância</option>
                <option value="novidades">Novidades</option>
                <option value="menor-preco">Menor preço</option>
                <option value="maior-preco">Maior preço</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" aria-hidden="true" size={14} />
            </label>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[250px_1fr] xl:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block" aria-label="Filtros de catálogo">
            <div className="sticky top-28">{filterPanel}</div>
          </aside>

          <div>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-5 ${
                    density === "compact" ? "xl:grid-cols-4" : "xl:grid-cols-3"
                  }`}
                  aria-label="Carregando produtos"
                  aria-busy="true"
                >
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index}>
                      <div className="skeleton aspect-[3/4]" />
                      <div className="skeleton mt-4 h-3 w-2/3" />
                      <div className="skeleton mt-2 h-3 w-1/3" />
                    </div>
                  ))}
                </motion.div>
              ) : filtered.length ? (
                <motion.div
                  key="results"
                  layout
                  className={`grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-14 ${
                    density === "compact" ? "xl:grid-cols-4" : "xl:grid-cols-3"
                  }`}
                >
                  {filtered.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product.id} product={product} compact={density === "compact"} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex min-h-[480px] flex-col items-center justify-center border border-dashed border-line px-6 text-center"
                >
                  <div className="grid size-16 place-items-center border border-line font-mono text-xl">Ø</div>
                  <h2 className="mt-6 text-3xl font-semibold uppercase tracking-[-0.06em]">Nenhum produto encontrado</h2>
                  <p className="mt-3 max-w-md text-sm text-muted">Ajuste a combinação de tamanho, cor ou faixa de preço para ampliar os resultados.</p>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-7 min-h-12 bg-chalk px-6 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ink hover:bg-wine hover:text-chalk"
                  >
                    Limpar filtros
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {!loading && filtered.length > visibleCount && (
              <div className="mt-16 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + 4)}
                  className="min-h-13 border border-line px-8 font-mono text-[9px] uppercase tracking-[0.12em] transition hover:border-chalk hover:bg-chalk hover:text-ink"
                >
                  Carregar mais · {filtered.length - visibleCount} restantes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        label="Filtros do catálogo"
        placement="right"
        panelClassName="h-full w-full max-w-md overflow-y-auto border-l border-line bg-paper p-5 text-chalk"
      >
        <div className="mb-6 flex items-center justify-between border-b border-dashed border-line pb-4">
          <h2 className="text-2xl font-semibold uppercase tracking-[-0.05em]">Filtros</h2>
          <button type="button" onClick={() => setFilterOpen(false)} className="grid size-11 place-items-center" aria-label="Fechar filtros">
            <X aria-hidden="true" size={20} />
          </button>
        </div>
        {filterPanel}
        <button
          type="button"
          onClick={() => setFilterOpen(false)}
          className="sticky bottom-0 mt-8 min-h-13 w-full bg-chalk px-6 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ink"
        >
          Ver {filtered.length} resultado{filtered.length === 1 ? "" : "s"}
        </button>
      </Dialog>
    </main>
  );
}

type FiltersProps = {
  selectedCategories: string[];
  selectedSizes: string[];
  selectedColors: string[];
  maxPrice: number;
  onlyAvailable: boolean;
  onCategory: (value: string) => void;
  onSize: (value: string) => void;
  onColor: (value: string) => void;
  onMaxPrice: (value: number) => void;
  onAvailability: (value: boolean) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
};

function Filters({
  selectedCategories,
  selectedSizes,
  selectedColors,
  maxPrice,
  onlyAvailable,
  onCategory,
  onSize,
  onColor,
  onMaxPrice,
  onAvailability,
  onClear,
  hasActiveFilters,
}: FiltersProps) {
  return (
    <div className="space-y-8">
      <FilterSection title="Categoria">
        {categories.map((category) => (
          <FilterCheckbox key={category} label={category} checked={selectedCategories.includes(category)} onChange={() => onCategory(category)} />
        ))}
      </FilterSection>

      <FilterSection title="Tamanho">
        <div className="grid grid-cols-5 gap-2">
          {allSizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onSize(size)}
              aria-pressed={selectedSizes.includes(size)}
              className={`grid min-h-11 place-items-center border font-mono text-[9px] transition ${
                selectedSizes.includes(size)
                  ? "border-chalk bg-chalk text-ink"
                  : "border-line hover:border-chalk"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Cor">
        <div className="space-y-1">
          {allColors.map((color) => (
            <FilterCheckbox key={color} label={color} checked={selectedColors.includes(color)} onChange={() => onColor(color)} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Faixa de preço">
        <label className="block">
          <span className="mb-3 flex justify-between font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
            <span>Até</span><span>R$ {maxPrice}</span>
          </span>
          <input
            type="range"
            min="100"
            max="500"
            step="25"
            value={maxPrice}
            onChange={(event) => onMaxPrice(Number(event.target.value))}
            className="w-full accent-[#8f1f3f]"
          />
        </label>
      </FilterSection>

      <FilterSection title="Disponibilidade">
        <FilterCheckbox label="Somente disponíveis" checked={onlyAvailable} onChange={() => onAvailability(!onlyAvailable)} />
      </FilterSection>

      <button
        type="button"
        onClick={onClear}
        disabled={!hasActiveFilters}
        className="min-h-11 w-full border border-line font-mono text-[9px] uppercase tracking-[0.12em] transition hover:border-chalk disabled:cursor-not-allowed disabled:opacity-35"
      >
        Limpar filtros
      </button>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-b border-dashed border-line pb-7">
      <legend className="mb-4 font-mono text-[9px] font-semibold uppercase tracking-[0.13em]">{title}</legend>
      <div className="space-y-1">{children}</div>
    </fieldset>
  );
}

function FilterCheckbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex min-h-10 cursor-pointer items-center justify-between gap-3 text-sm">
      <span>{label}</span>
      <span className={`grid size-5 place-items-center border ${checked ? "border-chalk bg-chalk text-ink" : "border-line"}`}>
        {checked && <Check aria-hidden="true" size={13} />}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    </label>
  );
}
