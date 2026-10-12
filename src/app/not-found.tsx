import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-bold text-cobalt mb-4">404</p>
      <h1 className="text-2xl md:text-3xl font-bold text-graphite mb-4">
        Página no encontrada
      </h1>
      <p className="text-graphite/60 mb-8">
        El producto o servicio que buscas no existe o ya no está disponible.
      </p>
      <div className="flex justify-center gap-3 flex-wrap">
        <Link
          href="/catalogo"
          className="bg-cobalt text-white px-5 py-2.5 rounded-md font-semibold hover:bg-cobalt/90 transition-colors"
        >
          Ver catálogo
        </Link>
        <Link
          href="/"
          className="border border-platinum text-graphite px-5 py-2.5 rounded-md font-semibold hover:border-cobalt hover:text-cobalt transition-colors"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}