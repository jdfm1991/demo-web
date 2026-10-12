export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="mb-6 h-5 w-80 bg-platinum/40 rounded animate-pulse" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Galería */}
        <div>
          <div className="aspect-square bg-platinum/50 rounded-lg animate-pulse" />
          <div className="mt-4 grid grid-cols-5 gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-platinum/40 rounded-md animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Información */}
        <div className="space-y-4">
          <div className="h-4 w-40 bg-platinum/40 rounded animate-pulse" />
          <div className="h-10 w-3/4 bg-platinum/50 rounded animate-pulse" />
          <div className="h-5 w-full bg-platinum/40 rounded animate-pulse" />
          <div className="h-20 w-full bg-platinum/40 rounded animate-pulse" />
          <div className="h-12 w-full bg-platinum/50 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}