export default function Loading() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-graphite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl space-y-4">
            <div className="h-4 w-64 bg-platinum/20 rounded animate-pulse" />
            <div className="h-16 w-3/4 bg-platinum/20 rounded animate-pulse" />
            <div className="h-6 w-full bg-platinum/20 rounded animate-pulse" />
            <div className="h-6 w-5/6 bg-platinum/20 rounded animate-pulse" />
            <div className="flex gap-3 pt-4">
              <div className="h-12 w-48 bg-platinum/20 rounded animate-pulse" />
              <div className="h-12 w-36 bg-platinum/20 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Categorías */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="h-8 w-72 bg-platinum/50 rounded mb-8 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-platinum rounded-lg p-6"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-platinum/50 animate-pulse" />
              <div className="h-4 w-20 mx-auto bg-platinum/50 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>

      {/* Destacados */}
      <div className="bg-platinum/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="h-8 w-80 bg-platinum/50 rounded mb-8 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-platinum overflow-hidden"
              >
                <div className="aspect-[4/3] bg-platinum/50 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-3/4 bg-platinum/50 rounded animate-pulse" />
                  <div className="h-4 w-full bg-platinum/40 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}