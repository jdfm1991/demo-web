import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBusinessSettings, getItemBySlug } from '@/lib/api';
import { ItemGallery } from '@/components/ItemGallery';
import { formatPrice } from '@/lib/format';
import { buildWhatsAppLink, buildItemMessage } from '@/lib/whatsapp';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const item = await getItemBySlug(slug);
    return {
      title: item.name,
      description:
        item.short_description ??
        item.description?.slice(0, 160) ??
        `${item.name} en Servicios Integrales Tomás`,
      openGraph: item.images[0]
        ? {
            images: [{ url: item.images[0].url, alt: item.images[0].alt }],
          }
        : undefined,
    };
  } catch {
    return { title: 'Producto no encontrado' };
  }
}

export default async function ItemDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [settings, item] = await Promise.all([
    getBusinessSettings(),
    getItemBySlug(slug).catch(() => null),
  ]);

  if (!item) {
    notFound();
  }

  const typeLabel = item.type === 'product' ? 'Producto' : 'Servicio';
  const whatsappLink = buildWhatsAppLink(
    settings.whatsapp,
    buildItemMessage(item.name)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-graphite/60" aria-label="Ruta de navegación">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link href="/" className="hover:text-cobalt">
              Inicio
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/catalogo" className="hover:text-cobalt">
              Catálogo
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/catalogo?category=${item.category.slug}`}
              className="hover:text-cobalt"
            >
              {item.category.name}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-graphite font-medium truncate max-w-[200px]" aria-current="page">
            {item.name}
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Columna izquierda: galería */}
        <ItemGallery images={item.images} itemName={item.name} />

        {/* Columna derecha: información */}
        <div>
          {/* Categoría y tipo */}
          <div className="flex items-center gap-2 mb-3">
            <Link
              href={`/catalogo?category=${item.category.slug}`}
              className="text-xs font-semibold text-cobalt uppercase tracking-wide hover:underline"
            >
              {item.category.name}
            </Link>
            <span className="text-xs text-graphite/40">·</span>
            <span className="text-xs text-graphite/60">{typeLabel}</span>
            {item.is_featured && (
              <>
                <span className="text-xs text-graphite/40">·</span>
                <span className="text-xs font-semibold text-alert">
                  Destacado
                </span>
              </>
            )}
          </div>

          {/* Nombre */}
          <h1 className="text-3xl md:text-4xl font-bold text-graphite mb-4">
            {item.name}
          </h1>

          {/* Descripción corta */}
          {item.short_description && (
            <p className="text-lg text-graphite/70 mb-6">
              {item.short_description}
            </p>
          )}

          {/* Precio */}
          <div className="bg-platinum/30 rounded-lg p-4 mb-6">
            <p className="text-xs font-medium text-graphite/60 uppercase tracking-wide mb-1">
              Precio
            </p>
            <p className="text-2xl font-bold text-graphite">
              {formatPrice(item.price)}
            </p>
          </div>

          {/* CTA WhatsApp */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-alert text-graphite px-6 py-4 rounded-md font-semibold hover:bg-alert/90 transition-colors mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Consultar por WhatsApp
          </a>

          {/* Nota informativa */}
          <p className="text-xs text-graphite/50 text-center">
            Se abrirá WhatsApp con un mensaje pre-cargado sobre este {typeLabel.toLowerCase()}.
          </p>

          {/* Descripción completa */}
          {item.description && (
            <div className="mt-8 pt-8 border-t border-platinum">
              <h2 className="text-lg font-semibold text-graphite mb-3">
                Descripción
              </h2>
              <div className="text-graphite/70 whitespace-pre-line leading-relaxed">
                {item.description}
              </div>
            </div>
          )}

          {/* Info de la categoría */}
          {item.category.description && (
            <div className="mt-8 pt-8 border-t border-platinum">
              <h2 className="text-lg font-semibold text-graphite mb-3">
                Sobre {item.category.name}
              </h2>
              <p className="text-graphite/70 leading-relaxed">
                {item.category.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}