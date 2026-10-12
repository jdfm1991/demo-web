import Link from 'next/link';
import { getBusinessSettings, getCategories, getItems } from '@/lib/api';
import { ItemCard } from '@/components/ItemCard';
import { FiltersBar } from '@/components/FiltersBar';

interface CatalogoPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata = {
  title: 'Catálogo',
  description:
    'Explora nuestro catálogo completo de productos y servicios: cámaras de seguridad, redes informáticas, telefonía, radios y más.',
};

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const category = typeof params.category === 'string' ? params.category : undefined;
  const type =
    params.type === 'product' || params.type === 'service' ? params.type : undefined;
  const search = typeof params.search === 'string' ? params.search : undefined;

  const [settings, categories, response] = await Promise.all([
    getBusinessSettings(),
    getCategories(),
    getItems({
      page,
      per_page: 12,
      category,
      type,
      search,
    }),
  ]);

  const { data: items, meta } = response;

  // Preserva los filtros en la paginación
  function buildPageUrl(targetPage: number): string {
    const qp = new URLSearchParams();
    if (category) qp.set('category', category);
    if (type) qp.set('type', type);
    if (search) qp.set('search', search);
    if (targetPage > 1) qp.set('page', String(targetPage));
    const qs = qp.toString();
    return `/catalogo${qs ? `?${qs}` : ''}`;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-graphite">Catálogo</h1>
        <p className="text-graphite/60 mt-2">
          {meta.total === 0
            ? 'No hay productos ni servicios que coincidan con tu búsqueda.'
            : `${meta.total} ${meta.total === 1 ? 'resultado' : 'resultados'}`}
        </p>
      </div>

      <FiltersBar categories={categories} />

      {items.length === 0 ? (
        <div className="text-center py-16 bg-platinum/30 rounded-lg">
          <p className="text-graphite/60 text-lg">
            No encontramos resultados con esos filtros.
          </p>
          <p className="text-graphite/40 mt-2 text-sm">
            Prueba con otros criterios o limpia los filtros.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} whatsapp={settings.whatsapp} />
            ))}
          </div>

          {meta.last_page > 1 && (
            <nav
              className="mt-12 flex items-center justify-center gap-2"
              aria-label="Paginación del catálogo"
            >
              {meta.current_page > 1 && (
                <Link
                  href={buildPageUrl(meta.current_page - 1)}
                  className="px-4 py-2 border border-platinum rounded-md text-sm font-medium text-graphite hover:border-cobalt hover:text-cobalt transition-colors"
                >
                  ← Anterior
                </Link>
              )}

              <span className="px-4 py-2 text-sm text-graphite/60">
                Página {meta.current_page} de {meta.last_page}
              </span>

              {meta.current_page < meta.last_page && (
                <Link
                  href={buildPageUrl(meta.current_page + 1)}
                  className="px-4 py-2 border border-platinum rounded-md text-sm font-medium text-graphite hover:border-cobalt hover:text-cobalt transition-colors"
                >
                  Siguiente →
                </Link>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}