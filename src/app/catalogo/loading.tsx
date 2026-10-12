export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Encabezado */}
      <div className="mb-8">
        <div className="h-10 w-48 bg-platinum/50 rounded animate-pulse" />
        <div className="h-5 w-64 bg-platinum/40 rounded mt-3 animate-pulse" />
      </div>

      {/* Filtros */}
      <div className="bg-white border border-platinum rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <div className="h-4 w-20 bg-platinum/50 rounded mb-2 animate-pulse" />
              <div className="h-10 w-full bg-platinum/40 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Grid de tarjetas esqueleto */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg border border-platinum overflow-hidden"
          >
            <div className="aspect-[4/3] bg-platinum/50 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-3 w-24 bg-platinum/50 rounded animate-pulse" />
              <div className="h-5 w-3/4 bg-platinum/50 rounded animate-pulse" />
              <div className="h-4 w-full bg-platinum/40 rounded animate-pulse" />
              <div className="flex justify-between pt-3 border-t border-platinum">
                <div className="h-6 w-20 bg-platinum/50 rounded animate-pulse" />
                <div className="h-8 w-24 bg-platinum/50 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}