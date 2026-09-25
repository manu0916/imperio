"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { brandConfig, mainNavigation } from "@/config/brand";
import { useShop } from "@/context/shop-context";
import { Dialog } from "@/components/ui/dialog";
import { ArrowDoodle, StarDoodle } from "@/components/ui/street-doodles";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const {
    cartCount,
    favorites,
    setCartOpen,
    setSearchOpen,
    mobileMenuOpen,
    setMobileMenuOpen,
    notify,
  } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileMenuOpen(false), [pathname, setMobileMenuOpen]);

  return (
    <>
      <div className="border-b border-line bg-chalk px-4 py-2.5 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-ink sm:text-[10px]">
        Drop 01 / 26 · Frete grátis acima de R$ 399 · Troca em até 30 dias
      </div>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-line bg-paper/90 shadow-[0_10px_30px_rgba(0,0,0,.18)] backdrop-blur-xl"
            : "border-transparent bg-paper"
        }`}
      >
        <div className="mx-auto grid h-16 max-w-[1680px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:h-[76px] lg:px-10">
          <nav className="hidden items-center gap-6 xl:flex" aria-label="Navegação principal">
            {mainNavigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-mono text-[10px] font-semibold uppercase tracking-[0.11em] transition hover:text-wine focus-visible:outline-2 focus-visible:outline-offset-4 ${
                  item.accent ? "text-wine" : "text-chalk"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="grid size-11 place-items-center justify-self-start focus-visible:outline-2 focus-visible:outline-offset-2 xl:hidden"
            aria-label="Abrir menu"
          >
            <Menu aria-hidden="true" size={21} />
          </button>

          <Link
            href="/"
            className="max-w-[44vw] truncate text-center text-base font-semibold uppercase tracking-[-0.07em] sm:text-xl"
          >
            {brandConfig.name}
          </Link>

          <div className="flex items-center justify-end gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="grid size-11 place-items-center transition hover:text-wine focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-label="Abrir busca"
            >
              <Search aria-hidden="true" size={19} />
            </button>
            <button
              type="button"
              onClick={() => notify("Conta disponível em uma próxima etapa")}
              className="hidden size-11 place-items-center transition hover:text-wine focus-visible:outline-2 focus-visible:outline-offset-2 sm:grid"
              aria-label="Minha conta"
            >
              <User aria-hidden="true" size={19} />
            </button>
            <Link
              href="/favoritos"
              className="relative hidden size-11 place-items-center transition hover:text-wine focus-visible:outline-2 focus-visible:outline-offset-2 sm:grid"
              aria-label={`Favoritos, ${favorites.length} itens`}
            >
              <Heart aria-hidden="true" size={19} />
              {favorites.length > 0 && <CountBadge value={favorites.length} />}
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative grid size-11 place-items-center transition hover:text-wine focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-label={`Abrir sacola, ${cartCount} itens`}
            >
              <ShoppingBag aria-hidden="true" size={19} />
              {cartCount > 0 && <CountBadge value={cartCount} />}
            </button>
          </div>
        </div>
      </header>

      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        label="Menu de navegação"
        placement="right"
        panelClassName="relative h-full w-full max-w-md overflow-y-auto border-l border-line bg-paper p-6 text-chalk"
      >
        <div className="flex items-center justify-between border-b border-dashed border-line pb-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">Menu / 001</span>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="grid size-11 place-items-center focus-visible:outline-2"
            aria-label="Fechar menu"
          >
            <X aria-hidden="true" size={21} />
          </button>
        </div>

        <nav className="py-8" aria-label="Navegação mobile">
          {mainNavigation.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex min-h-16 items-center justify-between border-b border-dashed border-line text-3xl font-semibold uppercase tracking-[-0.06em] transition hover:bg-chalk hover:px-3 hover:text-ink"
            >
              <span>{item.label}</span>
              <span className="font-mono text-[9px] tracking-[0.12em] text-muted">0{index + 1}</span>
            </Link>
          ))}
        </nav>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/favoritos"
            className="flex min-h-12 items-center justify-center gap-2 border border-line font-mono text-[10px] uppercase tracking-[0.1em] hover:border-chalk"
          >
            <Heart aria-hidden="true" size={16} /> Favoritos
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              notify("Conta disponível em uma próxima etapa");
            }}
            className="flex min-h-12 items-center justify-center gap-2 border border-line font-mono text-[10px] uppercase tracking-[0.1em] hover:border-chalk"
          >
            <User aria-hidden="true" size={16} /> Conta
          </button>
        </div>
        <StarDoodle className="absolute bottom-12 right-6 w-28 text-wine" />
        <ArrowDoodle className="absolute bottom-20 left-8 w-32 text-chalk/30" />
      </Dialog>
    </>
  );
}

function CountBadge({ value }: { value: number }) {
  return (
    <span className="absolute right-0 top-0 grid size-[18px] place-items-center rounded-full bg-wine font-mono text-[8px] font-semibold text-chalk">
      {value > 9 ? "9+" : value}
    </span>
  );
}

