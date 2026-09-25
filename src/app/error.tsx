"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" className="section-shell grid min-h-[68svh] place-items-center py-20 text-center">
      <div className="max-w-2xl">
        <span className="eyebrow text-wine">System noise / error</span>
        <h1 className="mt-4 text-5xl font-semibold uppercase leading-[0.86] tracking-[-0.08em] sm:text-7xl">Algo saiu da rota.</h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-muted">A página encontrou um erro inesperado. Tente carregar este trecho novamente.</p>
        <button type="button" onClick={reset} className="mt-8 inline-flex min-h-13 items-center gap-3 bg-chalk px-7 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ink hover:bg-wine hover:text-chalk"><RotateCcw aria-hidden="true" size={16} /> Tentar novamente</button>
      </div>
    </main>
  );
}
