"use client";

import { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ChevronDown,
  Heart,
  Maximize2,
  Minus,
  Plus,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { Dialog } from "@/components/ui/dialog";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/ui/reveal";
import { ArrowDoodle, CrossDoodle, StarDoodle } from "@/components/ui/street-doodles";
import { brandConfig } from "@/config/brand";
import { useShop } from "@/context/shop-context";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product";

type ProductDetailsProps = {
  product: Product;
  related: Product[];
  completeTheLook: Product[];
};

export function ProductDetails({ product, related, completeTheLook }: ProductDetailsProps) {
  const firstSize = product.sizes.find((size) => size.stock > 0)?.label ?? "";
  const [selectedSize, setSelectedSize] = useState(firstSize);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [shippingMessage, setShippingMessage] = useState("");
  const { addToCart, isFavorite, toggleFavorite, notify } = useShop();
  const reducedMotion = useReducedMotion();
  const favorite = isFavorite(product.id);
  const currentPrice = product.salePrice ?? product.price;
  const installment = currentPrice / brandConfig.installmentCount;
  const selectedStock = useMemo(
    () => product.sizes.find((size) => size.label === selectedSize)?.stock ?? 0,
    [product.sizes, selectedSize],
  );

  const submitShipping = (event: FormEvent) => {
    event.preventDefault();
    const digits = postcode.replace(/\D/g, "");
    if (digits.length !== 8) {
      setShippingMessage("Digite um CEP válido com 8 números.");
      return;
    }
    setShippingMessage("Entrega estimada: 4–8 dias úteis · cálculo demonstrativo.");
  };

  const addItem = () => {
    if (!product.available || !selectedSize || selectedStock === 0) {
      notify("Escolha um tamanho disponível");
      return;
    }
    addToCart(product.id, {
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };

  return (
    <main id="main-content">
      <div className="section-shell border-b border-dashed border-line py-5">
        <nav aria-label="Navegação estrutural" className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
          <Link href="/" className="hover:text-chalk">Início</Link>
          <span aria-hidden="true">/</span>
          <Link href="/catalogo" className="hover:text-chalk">Catálogo</Link>
          <span aria-hidden="true">/</span>
          <span className="text-chalk">{product.name}</span>
        </nav>
      </div>

      <section className="section-shell py-8 sm:py-12 lg:py-16" aria-labelledby="product-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,.8fr)] lg:gap-14 xl:gap-20">
          <div>
            <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto lg:grid lg:grid-cols-2 lg:overflow-visible">
              {product.images.map((image, index) => (
                <motion.button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => {
                    setActiveImage(index);
                    setZoomOpen(true);
                  }}
                  whileHover={reducedMotion ? undefined : { y: -3 }}
                  className={`rough-frame group relative aspect-[3/4] min-w-[86%] snap-center overflow-hidden bg-graphite sm:min-w-[65%] lg:min-w-0 ${index === 0 ? "lg:col-span-2 lg:aspect-[16/11]" : ""}`}
                  aria-label={`Ampliar imagem ${index + 1} de ${product.images.length}`}
                >
                  <Image
                    src={image}
                    alt={`${product.name}, visual ${index + 1}`}
                    fill
                    priority={index === 0}
                    sizes={index === 0 ? "(max-width: 1024px) 86vw, 56vw" : "(max-width: 1024px) 86vw, 28vw"}
                    className="xerox-image object-cover transition duration-700 group-hover:scale-[1.025]"
                    style={{ objectPosition: product.imagePosition }}
                  />
                  <span className="absolute bottom-3 right-3 grid size-11 place-items-center border border-chalk/25 bg-ink/85 text-chalk">
                    <Maximize2 aria-hidden="true" size={16} />
                  </span>
                </motion.button>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                Arraste para ver mais · toque para ampliar
              </p>
              <div className="flex gap-2" aria-label="Miniaturas do produto">
                {product.images.map((image, index) => (
                  <button
                    key={`thumb-${image}-${index}`}
                    type="button"
                    onClick={() => {
                      setActiveImage(index);
                      setZoomOpen(true);
                    }}
                    aria-label={`Abrir visual ${index + 1}`}
                    aria-pressed={activeImage === index}
                    className={`rough-frame relative size-14 overflow-hidden bg-graphite ${activeImage === index ? "border-chalk" : "opacity-60 hover:opacity-100"}`}
                  >
                    <Image src={image} alt="" fill sizes="56px" className="object-cover" style={{ objectPosition: product.imagePosition }} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative lg:sticky lg:top-32 lg:self-start">
            <CrossDoodle className="pointer-events-none absolute right-0 top-0 w-16 text-wine" />
            <span className="eyebrow">{product.code} / {product.collection}</span>
            <div className="mt-4 flex items-start justify-between gap-8">
              <h1 id="product-title" className="max-w-[12ch] text-4xl font-semibold uppercase leading-[0.9] tracking-[-0.07em] sm:text-5xl xl:text-6xl">
                {product.name}
              </h1>
              <button
                type="button"
                onClick={() => toggleFavorite(product.id)}
                className="grid size-12 shrink-0 place-items-center border border-line transition hover:border-wine hover:text-wine"
                aria-label={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                aria-pressed={favorite}
              >
                <Heart aria-hidden="true" size={19} fill={favorite ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              {product.salePrice && <span className="text-sm text-muted line-through">{formatCurrency(product.price)}</span>}
              <span className={`text-2xl font-semibold ${product.salePrice ? "text-wine" : ""}`}>{formatCurrency(currentPrice)}</span>
              <span className="w-full text-xs text-muted">ou {brandConfig.installmentCount}x de {formatCurrency(installment)} sem juros</span>
            </div>

            <p className="mt-7 border-y border-dashed border-line py-6 text-sm leading-7 text-muted">
              {product.description}
            </p>

            <fieldset className="mt-7">
              <legend className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em]">
                Cor <span className="ml-2 text-muted">{selectedColor}</span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    className={`flex min-h-12 items-center gap-2.5 border px-4 font-mono text-[9px] uppercase tracking-[0.1em] transition ${selectedColor === color.name ? "border-chalk bg-chalk text-ink" : "border-line hover:border-chalk"}`}
                    aria-pressed={selectedColor === color.name}
                  >
                    <span className="size-3 rounded-full border border-current/30" style={{ backgroundColor: color.value }} aria-hidden="true" />
                    {color.name}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-7">
              <div className="flex items-center justify-between gap-4">
                <legend className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em]">Tamanho</legend>
                <button type="button" onClick={() => setSizeGuideOpen(true)} className="inline-flex min-h-11 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.1em] text-muted underline underline-offset-4 hover:text-chalk">
                  <Ruler aria-hidden="true" size={14} /> Guia de medidas
                </button>
              </div>
              <div className="mt-2 grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.label}
                    type="button"
                    disabled={size.stock === 0}
                    onClick={() => setSelectedSize(size.label)}
                    className={`relative grid min-h-12 place-items-center border font-mono text-[10px] font-semibold transition ${selectedSize === size.label ? "border-chalk bg-chalk text-ink" : "border-line hover:border-chalk"} disabled:cursor-not-allowed disabled:text-muted disabled:opacity-50`}
                    aria-pressed={selectedSize === size.label}
                  >
                    {size.label}
                    {size.stock === 0 && <span className="absolute h-px w-8 -rotate-45 bg-muted" aria-hidden="true" />}
                  </button>
                ))}
              </div>
              {selectedStock > 0 && selectedStock <= 3 && (
                <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-wine">Só {selectedStock} unidades neste tamanho</p>
              )}
            </fieldset>

            <div className="mt-7 grid grid-cols-[112px_1fr] gap-2">
              <div className="flex min-h-14 items-center border border-line">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="grid size-12 place-items-center hover:bg-graphite" aria-label="Diminuir quantidade">
                  <Minus aria-hidden="true" size={15} />
                </button>
                <span className="flex-1 text-center font-mono text-xs" aria-label={`Quantidade ${quantity}`}>{quantity}</span>
                <button type="button" onClick={() => setQuantity((value) => Math.min(10, value + 1))} className="grid size-12 place-items-center hover:bg-graphite" aria-label="Aumentar quantidade">
                  <Plus aria-hidden="true" size={15} />
                </button>
              </div>
              <button
                type="button"
                onClick={addItem}
                disabled={!product.available || !selectedSize}
                className="flex min-h-14 items-center justify-center gap-3 bg-chalk px-5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink transition hover:bg-wine hover:text-chalk disabled:cursor-not-allowed disabled:bg-graphite disabled:text-muted"
              >
                <ShoppingBag aria-hidden="true" size={17} />
                {product.available ? "Adicionar à sacola" : "Produto esgotado"}
              </button>
            </div>

            <form onSubmit={submitShipping} className="mt-7 border border-dashed border-line p-5" noValidate>
              <label htmlFor="postcode" className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]">
                <Truck aria-hidden="true" size={16} /> Calcular entrega
              </label>
              <div className="mt-3 flex border-b border-line">
                <input
                  id="postcode"
                  inputMode="numeric"
                  maxLength={9}
                  value={postcode}
                  onChange={(event) => setPostcode(event.target.value)}
                  placeholder="00000-000"
                  className="min-h-12 min-w-0 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted"
                />
                <button type="submit" className="px-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] hover:text-wine">Calcular</button>
              </div>
              <p className="mt-3 min-h-5 text-xs text-muted" aria-live="polite">{shippingMessage || `Frete grátis acima de ${formatCurrency(brandConfig.freeShippingThreshold)}.`}</p>
            </form>

            <div className="mt-5 divide-y divide-dashed divide-line border-y border-dashed border-line">
              <ProductInfo title="Detalhes">
                <p>{product.description}</p>
                <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">Categoria: {product.category} · Público: {product.audience}</p>
              </ProductInfo>
              <ProductInfo title="Composição e cuidado">
                <ul className="space-y-2">
                  {[...product.materials, ...product.care].map((item) => <li key={item}>— {item}</li>)}
                </ul>
              </ProductInfo>
              <ProductInfo title="Entrega e trocas">
                <p>Envio para todo o Brasil. Primeira troca gratuita em até 30 dias após o recebimento.</p>
              </ProductInfo>
            </div>

            <div className="mt-6 flex items-start gap-3 text-xs leading-5 text-muted">
              <ShieldCheck aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-chalk" />
              <span>Compra demonstrativa protegida. Nenhum pagamento real será processado neste protótipo.</span>
            </div>
          </div>
        </div>
      </section>

      {completeTheLook.length > 0 && (
        <section className="border-y border-line bg-ink py-20 sm:py-28" aria-labelledby="complete-title">
          <div className="section-shell">
            <Reveal className="mb-10 flex items-end justify-between gap-5">
              <div>
                <span className="eyebrow">Styling notes / 01</span>
                <h2 id="complete-title" className="mt-2 text-4xl font-semibold uppercase tracking-[-0.07em] sm:text-6xl">Complete o look</h2>
              </div>
              <ArrowDoodle className="hidden w-36 text-wine sm:block" />
            </Reveal>
            <StaggerGrid className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-3 lg:gap-7">
              {completeTheLook.map((item) => <StaggerItem key={item.id}><ProductCard product={item} /></StaggerItem>)}
            </StaggerGrid>
          </div>
        </section>
      )}

      <section className="section-shell py-20 sm:py-28" aria-labelledby="related-title">
        <Reveal className="mb-10 flex items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Same frequency / 04</span>
            <h2 id="related-title" className="mt-2 text-4xl font-semibold uppercase tracking-[-0.07em] sm:text-6xl">Você também pode curtir</h2>
          </div>
          <StarDoodle className="hidden w-20 text-wine sm:block" />
        </Reveal>
        <StaggerGrid className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-7">
          {related.map((item) => <StaggerItem key={item.id}><ProductCard product={item} compact /></StaggerItem>)}
        </StaggerGrid>
        <Link href="/catalogo" className="mt-12 inline-flex min-h-12 items-center gap-2 border border-line px-5 font-mono text-[9px] uppercase tracking-[0.12em] hover:border-chalk">
          <ArrowLeft aria-hidden="true" size={15} /> Voltar ao catálogo
        </Link>
      </section>

      <Dialog open={zoomOpen} onClose={() => setZoomOpen(false)} label={`Imagem ampliada de ${product.name}`} placement="full" panelClassName="relative h-full w-full bg-ink p-4 sm:p-8">
        <button type="button" onClick={() => setZoomOpen(false)} className="absolute right-5 top-5 z-10 grid size-12 place-items-center border border-chalk/30 bg-ink/80" aria-label="Fechar imagem ampliada"><X aria-hidden="true" size={20} /></button>
        <div className="relative h-full w-full">
          <Image src={product.images[activeImage]} alt={`${product.name} ampliado`} fill sizes="100vw" className="object-contain" />
        </div>
      </Dialog>

      <Dialog open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} label="Guia de medidas" placement="center" panelClassName="w-full max-w-2xl border border-line bg-paper p-6 shadow-2xl sm:p-9">
        <div className="flex items-start justify-between gap-5">
          <div><span className="eyebrow">Fit reference / CM</span><h2 className="mt-2 text-3xl font-semibold uppercase tracking-[-0.05em]">Guia de medidas</h2></div>
          <button type="button" onClick={() => setSizeGuideOpen(false)} className="grid size-11 place-items-center border border-line" aria-label="Fechar guia"><X aria-hidden="true" size={18} /></button>
        </div>
        <div className="mt-7 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <thead className="font-mono text-[9px] uppercase tracking-[0.11em] text-muted"><tr><th className="border-b border-line py-3">Tamanho</th><th className="border-b border-line py-3">Tórax</th><th className="border-b border-line py-3">Cintura</th><th className="border-b border-line py-3">Quadril</th></tr></thead>
            <tbody>{[["PP","82–86","64–68","88–92"],["P","87–92","69–74","93–98"],["M","93–100","75–82","99–106"],["G","101–108","83–90","107–114"],["GG","109–116","91–98","115–122"]].map((row) => <tr key={row[0]}>{row.map((value) => <td key={value} className="border-b border-dashed border-line py-3">{value}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className="mt-5 text-xs leading-5 text-muted">Medidas corporais aproximadas em centímetros. Para modelagem ampla, escolha seu tamanho usual.</p>
      </Dialog>
    </main>
  );
}

function ProductInfo({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group py-5">
      <summary className="flex min-h-11 list-none items-center justify-between gap-4 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] [&::-webkit-details-marker]:hidden">
        {title}<ChevronDown aria-hidden="true" size={16} className="transition-transform group-open:rotate-180" />
      </summary>
      <div className="pb-2 pr-8 text-sm leading-6 text-muted">{children}</div>
    </details>
  );
}
