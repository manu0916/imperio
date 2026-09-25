export default function ProductLoading() {
  return (
    <main id="main-content" className="section-shell py-12" aria-label="Carregando produto">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr]">
        <div className="skeleton aspect-[4/3]" />
        <div className="space-y-5">
          <div className="skeleton h-3 w-32" />
          <div className="skeleton h-24 w-full" />
          <div className="skeleton h-7 w-40" />
          <div className="skeleton h-20 w-full" />
          <div className="skeleton h-14 w-full" />
        </div>
      </div>
    </main>
  );
}
