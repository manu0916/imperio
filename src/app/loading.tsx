export default function Loading() {
  return (
    <main id="main-content" className="section-shell py-16" aria-label="Carregando página">
      <div className="skeleton h-4 w-32" />
      <div className="skeleton mt-5 h-24 max-w-3xl" />
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((item) => <div key={item} className="skeleton aspect-[3/4]" />)}
      </div>
    </main>
  );
}
