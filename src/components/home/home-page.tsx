"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  CreditCard,
  RefreshCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { useRef } from "react";
import { ProductCard } from "@/components/product/product-card";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/ui/reveal";
import {
  ArrowDoodle,
  CrossDoodle,
  StarDoodle,
  WireDoodle,
} from "@/components/ui/street-doodles";
import { brandConfig } from "@/config/brand";
import { catalogImages, products } from "@/data/products";

const featuredCollections = [
  {
    index: "01",
    name: "Core essentials",
    subtitle: "A base da rotação",
    image: catalogImages.neutralTees,
    href: "/catalogo?colecao=core-essentials",
    position: "center 72%",
  },
  {
    index: "02",
    name: "Deep wine",
    subtitle: "Cor para ocupar espaço",
    image: catalogImages.ribbedTees,
    href: "/catalogo?colecao=deep-wine",
    position: "center 45%",
  },
  {
    index: "03",
    name: "Urban motion",
    subtitle: "Volume, ritmo e rua",
    image: catalogImages.navyStripe,
    href: "/catalogo?colecao=urban-motion",
    position: "center 28%",
  },
];

const benefits = [
  { icon: Truck, title: "Entrega nacional", text: "Rastreamento em todo o Brasil" },
  { icon: RefreshCcw, title: "Troca simples", text: "Primeira troca em até 30 dias" },
  { icon: CreditCard, title: "Até 10x", text: "Parcelamento demonstrativo" },
  { icon: ShieldCheck, title: "Compra segura", text: "Estrutura pronta para checkout" },
];

const lookbook = [
  { src: catalogImages.wineLook, alt: "Composição urbana vinho com tênis cinza", position: "center 58%" },
  { src: catalogImages.wineStripe, alt: "Look com camiseta listrada vinho e bermuda clara", position: "center 30%" },
  { src: catalogImages.whitePolo, alt: "Polo branca texturizada com calça escura", position: "center 28%" },
  { src: catalogImages.neutralTees, alt: "Camisetas neutras em preto, cinza e branco", position: "center 72%" },
];

export function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 65]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reducedMotion ? 1 : 1.04]);
  const newest = products.filter((product) => product.isNew).slice(0, 4);
  const bestSellers = products.filter((product) => product.featured).slice(2, 6);

  return (
    <main id="main-content">
      <section
        ref={heroRef}
        className="grid min-h-[calc(100svh-104px)] border-b border-line bg-paper lg:grid-cols-[44%_56%]"
        aria-labelledby="hero-title"
      >
        <div className="grid-noise relative z-10 flex min-h-[620px] flex-col justify-center overflow-hidden px-5 py-16 sm:px-8 lg:min-h-0 lg:px-[7vw]">
          <div className="pointer-events-none absolute -bottom-3 -left-3 text-[24vw] font-semibold uppercase leading-[0.68] tracking-[-0.12em] text-chalk opacity-[0.028] lg:text-[11vw]">
            Under<br />ground
          </div>
          <ArrowDoodle className="absolute -left-4 top-10 w-40 rotate-[132deg] text-wine sm:w-52" />

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="mb-8 flex items-center gap-5">
              <span className="marker-circle font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-wine">
                Drop 01 / 26
              </span>
              <span className="h-px w-10 bg-line" />
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                {brandConfig.slogan}
              </span>
            </div>

            <h1
              id="hero-title"
              className="max-w-[8ch] text-[clamp(4.2rem,9.2vw,10rem)] font-semibold uppercase leading-[0.76] tracking-[-0.1em]"
            >
              O essencial,<br />
              <span className="relative inline-block">
                elevado.
                <span className="absolute left-[-3%] top-[53%] h-[7px] w-[106%] -rotate-2 bg-wine mix-blend-multiply" aria-hidden="true" />
              </span>
            </h1>
            <p className="mt-8 max-w-md text-sm leading-6 text-muted sm:text-base">
              Peças para ocupar a cidade. Formas diretas, texturas reais e combinações sem manual.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/catalogo?colecao=drop-01"
                className="flex min-h-13 items-center justify-center gap-3 bg-chalk px-7 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink transition hover:bg-wine hover:text-chalk"
              >
                Explorar o drop <ArrowRight aria-hidden="true" size={16} />
              </Link>
              <Link
                href="/catalogo"
                className="flex min-h-13 items-center justify-center border border-line px-7 font-mono text-[10px] uppercase tracking-[0.12em] transition hover:border-chalk"
              >
                Ver tudo
              </Link>
            </div>
          </motion.div>

          <div className="relative mt-14 flex items-center justify-between border-t border-dashed border-line pt-5 font-mono text-[8px] uppercase tracking-[0.13em] text-muted">
            <span>Curadoria urbana</span>
            <span>CG · BR</span>
            <ArrowDown aria-hidden="true" size={14} />
          </div>
        </div>

        <div className="relative min-h-[72svh] overflow-hidden bg-graphite lg:min-h-0">
          <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
            <Image
              src={catalogImages.wineLook}
              alt="Composição streetwear vinho com tênis cinza"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 56vw"
              className="xerox-image object-cover"
              style={{ objectPosition: "center 58%" }}
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
          <StarDoodle className="absolute right-5 top-5 w-28 text-chalk mix-blend-difference sm:right-10 sm:top-9 sm:w-40" />
          <ArrowDoodle className="absolute bottom-8 left-5 w-40 text-chalk mix-blend-difference sm:left-10 sm:w-52" />
          <span className="tape-label absolute left-7 top-[48%] sm:left-12">No rules / just form</span>
          <span className="absolute bottom-6 right-6 border border-chalk/30 bg-ink/85 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.12em] sm:bottom-10 sm:right-10">
            Street unit / 001
          </span>
        </div>
      </section>

      <Marquee />

      <div className="relative h-28 overflow-hidden border-b border-dashed border-line bg-ink" aria-hidden="true">
        <WireDoodle className="absolute inset-x-0 top-1/2 h-20 w-full -translate-y-1/2 text-chalk/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="tape-label rotate-1">Local / Raw / Limited / 2026</span>
        </div>
      </div>

      <section className="section-shell py-20 sm:py-28 lg:py-36" aria-labelledby="collections-title">
        <Reveal className="mb-10 flex items-end justify-between gap-6 sm:mb-16">
          <div>
            <span className="eyebrow">Selection / 003</span>
            <h2 id="collections-title" className="mt-2 text-4xl font-semibold uppercase tracking-[-0.07em] sm:text-6xl">
              Três estados<br />de rua.
            </h2>
          </div>
          <CrossDoodle className="hidden w-20 text-wine sm:block" />
        </Reveal>

        <StaggerGrid className="grid gap-10 md:grid-cols-3 md:gap-5 lg:gap-8">
          {featuredCollections.map((collection, index) => (
            <StaggerItem key={collection.index} className={index === 1 ? "md:mt-20" : ""}>
              <Link href={collection.href} className="group block">
                <div className="mb-4 flex items-end justify-between border-b border-dashed border-line pb-4">
                  <span className="text-6xl font-semibold tracking-[-0.09em] sm:text-7xl">{collection.index}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">Capsule / {collection.index}</span>
                </div>
                <div className="rough-frame overflow-hidden bg-graphite">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="xerox-image object-cover transition duration-700 group-hover:scale-[1.035]"
                      style={{ objectPosition: collection.position }}
                    />
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold uppercase tracking-[-0.05em]">{collection.name}</h3>
                    <p className="mt-1 text-sm text-muted">{collection.subtitle}</p>
                  </div>
                  <ArrowRight className="mt-1 transition-transform group-hover:translate-x-1" aria-hidden="true" size={18} />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      <section className="border-y border-line bg-[#121212] py-20 sm:py-28 lg:py-36" aria-labelledby="new-title">
        <div className="section-shell">
          <Reveal className="mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">New entries / Drop 01</span>
              <h2 id="new-title" className="mt-2 text-4xl font-semibold uppercase tracking-[-0.07em] sm:text-6xl">
                Recém-chegados
              </h2>
            </div>
            <Link href="/catalogo?ordem=novidades" className="inline-flex min-h-11 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] underline underline-offset-4 hover:text-wine">
              Ver todas as novidades <ArrowRight aria-hidden="true" size={14} />
            </Link>
          </Reveal>
          <StaggerGrid className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-7">
            {newest.map((product, index) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} priority={index < 2} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="section-shell py-20 sm:py-28 lg:py-40" aria-labelledby="manifesto-title">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="relative lg:col-span-7">
            <div className="rough-frame overflow-hidden bg-graphite">
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/10]">
                <Image
                  src={catalogImages.storefront}
                  alt="Entrada da loja física e sua curadoria de peças"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="xerox-image object-cover"
                  style={{ objectPosition: "center 45%" }}
                />
              </div>
            </div>
            <div className="absolute -bottom-8 right-3 max-w-xs border border-line bg-navy p-6 sm:-right-6 sm:p-8">
              <span className="eyebrow">Physical roots</span>
              <p className="mt-3 font-serif text-2xl italic leading-tight sm:text-3xl">Da arara para a rua. Sem intermediários visuais.</p>
            </div>
          </Reveal>

          <Reveal className="relative pt-8 lg:col-span-5 lg:pl-10" delay={0.08}>
            <CrossDoodle className="absolute right-0 top-0 w-20 text-wine" />
            <span className="eyebrow">Manifesto / 00</span>
            <h2 id="manifesto-title" className="mt-5 text-5xl font-semibold uppercase leading-[0.86] tracking-[-0.08em] sm:text-7xl">
              Feito para o agora.
              <span className="mt-2 block font-serif text-4xl font-normal normal-case tracking-normal text-wine italic sm:text-6xl">
                Pensado para durar.
              </span>
            </h2>
            <p className="mt-8 max-w-lg text-sm leading-7 text-muted sm:text-base">
              Não seguimos um uniforme. Criamos uma rotação: peças honestas, combinações abertas e cor usada como atitude.
            </p>
            <Link href="/catalogo" className="mt-8 inline-flex min-h-12 items-center gap-3 border border-line px-5 font-mono text-[9px] uppercase tracking-[0.12em] transition hover:border-chalk">
              Conhecer a seleção <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-dashed border-line bg-ink py-20 sm:py-28 lg:py-36" aria-labelledby="campaign-title">
        <div className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 text-[24vw] font-semibold uppercase tracking-[-0.12em] text-wine opacity-20">
          Wine
        </div>
        <div className="section-shell relative z-10 grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Capsule 02 / 26 · Limited</span>
            <h2 id="campaign-title" className="mt-5 text-6xl font-semibold uppercase leading-[0.78] tracking-[-0.1em] sm:text-8xl lg:text-9xl">
              Deep wine<br />drop
            </h2>
            <p className="mt-6 font-serif text-3xl italic sm:text-4xl">Cor para ocupar espaço.</p>
            <p className="mt-6 max-w-md text-sm leading-6 text-muted">
              Vinho profundo, areia e preto. Uma cápsula curta para looks de impacto direto.
            </p>
            <Link href="/catalogo?colecao=deep-wine" className="mt-8 inline-flex min-h-13 items-center gap-3 bg-chalk px-7 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ink hover:bg-wine hover:text-chalk">
              Explorar cápsula <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </Reveal>

          <Reveal className="flex justify-center lg:justify-end" delay={0.08}>
            <div className="relative flex w-full max-w-[590px] items-start justify-end py-8">
              <div className="rough-frame relative z-10 aspect-[3/4] w-[58%] rotate-3 overflow-hidden bg-graphite">
                <Image src={catalogImages.ribbedTees} alt="Camisetas caneladas em cores neutras e vinho" fill sizes="35vw" className="xerox-image object-cover" style={{ objectPosition: "center 43%" }} />
              </div>
              <div className="rough-frame relative z-20 -ml-[18%] mt-20 aspect-[3/4] w-[54%] -rotate-2 overflow-hidden bg-graphite">
                <Image src={catalogImages.wineLook} alt="Look urbano em vinho" fill sizes="35vw" className="xerox-image object-cover" style={{ objectPosition: "center 58%" }} />
              </div>
              <StarDoodle className="absolute -right-3 -top-2 z-30 w-28 text-chalk" />
              <span className="tape-label absolute -bottom-1 left-3 z-30">Only a few / no restock</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-20 sm:py-28 lg:py-36" aria-labelledby="bestsellers-title">
        <Reveal className="mb-10 sm:mb-14">
          <span className="eyebrow">Rotation / Best sellers</span>
          <h2 id="bestsellers-title" className="mt-2 text-4xl font-semibold uppercase tracking-[-0.07em] sm:text-6xl">
            Os mais vistos
          </h2>
        </Reveal>
        <StaggerGrid className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-7">
          {bestSellers.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </section>

      <section className="border-y border-line bg-[#111]" aria-label="Benefícios da loja">
        <div className="mx-auto grid max-w-[1680px] sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="border-b border-dashed border-line px-6 py-8 last:border-b-0 sm:border-r lg:border-b-0">
              <Icon aria-hidden="true" size={22} strokeWidth={1.5} />
              <h3 className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em]">{title}</h3>
              <p className="mt-2 text-xs text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-28 lg:py-36" aria-labelledby="lookbook-title">
        <div className="section-shell mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <span className="eyebrow">Lookbook / arquivos locais</span>
            <h2 id="lookbook-title" className="mt-2 text-4xl font-semibold uppercase tracking-[-0.07em] sm:text-6xl">
              Visto na rua
            </h2>
          </Reveal>
          <a
            href={brandConfig.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] underline underline-offset-4 hover:text-wine"
          >
            Acompanhar no Instagram <ArrowRight aria-hidden="true" size={14} />
          </a>
        </div>
        <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-5 sm:px-8 lg:grid lg:grid-cols-4 lg:gap-3 lg:overflow-visible lg:px-0">
          {lookbook.map((image, index) => (
            <motion.div
              key={image.src}
              whileHover={reducedMotion ? undefined : { y: -6 }}
              className={`rough-frame relative min-w-[78vw] snap-center overflow-hidden bg-graphite sm:min-w-[45vw] lg:min-w-0 ${index % 2 ? "lg:mt-16" : ""}`}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 78vw, 25vw" className="xerox-image object-cover" style={{ objectPosition: image.position }} />
              </div>
              <span className="absolute bottom-3 left-3 bg-ink/90 px-3 py-2 font-mono text-[8px] uppercase tracking-[0.12em]">
                Frame / 0{index + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Marquee() {
  const items = ["Novo drop", "Formas urbanas", "Peças para o agora", "Limited run"];
  const repeated = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-wine bg-wine py-4 text-chalk" aria-label="Destaques da coleção">
      <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap pr-12">
        {repeated.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-12">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em]">{item}</span>
            <span className="size-1.5 bg-chalk" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}

