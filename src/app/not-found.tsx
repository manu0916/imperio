import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="grid min-h-[70svh] place-items-center overflow-hidden px-5 py-20 text-center">
      <div className="relative max-w-3xl">
        <span className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-[34vw] font-semibold tracking-[-0.12em] text-chalk opacity-[0.035] sm:text-[18rem]">404</span>
        <span className="eyebrow">Dead end / 404</span>
        <h1 className="mt-4 text-6xl font-semibold uppercase leading-[0.82] tracking-[-0.09em] sm:text-8xl">Essa rota saiu do mapa.</h1>
        <p className="mx-auto mt-7 max-w-md text-sm leading-6 text-muted">A página não existe ou a peça já mudou de endereço.</p>
        <Link href="/" className="mt-8 inline-flex min-h-13 items-center gap-3 bg-chalk px-7 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink hover:bg-wine hover:text-chalk"><ArrowLeft aria-hidden="true" size={16} /> Voltar ao início</Link>
      </div>
    </main>
  );
}
