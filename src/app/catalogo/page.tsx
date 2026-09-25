import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogClient } from "@/components/catalog/catalog-client";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Explore o Drop 01, essenciais urbanos e peças em edição limitada.",
};

export default function CatalogPage() {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <CatalogClient />
    </Suspense>
  );
}

function CatalogFallback() {
  return (
    <main id="main-content" className="section-shell py-16" aria-label="Carregando catálogo">
      <div className="skeleton h-4 w-32" />
      <div className="skeleton mt-5 h-24 max-w-3xl" />
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((item) => <div key={item} className="skeleton aspect-[3/4]" />)}
      </div>
    </main>
  );
}
