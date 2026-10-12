import Link from 'next/link';
import Image from 'next/image';
import { getBusinessSettings, getCategories, getFeaturedItems } from '@/lib/api';
import { ItemCard } from '@/components/ItemCard';
import { buildWhatsAppLink } from '@/lib/whatsapp';

export default async function Home() {
  const [settings, categories, featured] = await Promise.all([
    getBusinessSettings(),
    getCategories(),
    getFeaturedItems(),
  ]);

  const heroWhatsApp = buildWhatsAppLink(
    settings.whatsapp,
    'Hola, quiero más información sobre sus servicios.'
  );

  return (
    <>
      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section className="bg-graphite text-platinum">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-alert font-semibold text-sm uppercase tracking-widest mb-4">
              Seguridad · Redes · Telecomunicaciones
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {settings.tagline || settings.business_name}
            </h1>
            {settings.description && (
              <p className="text-lg md:text-xl text-platinum/80 mb-8 leading-relaxed">
                {settings.description}
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              <a
                href={heroWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-alert text-graphite px-6 py-3 rounded-md font-semibold hover:bg-alert/90 transition-colors"
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
                Contactar por WhatsApp
              </a>
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 border border-platinum/30 text-platinum px-6 py-3 rounded-md font-semibold hover:bg-platinum/10 transition-colors"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────── CATEGORÍAS ────────────────────── */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-graphite">
              Explora por categoría
            </h2>
            <p className="text-graphite/60 mt-2">
              Encuentra rápidamente lo que necesitas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/catalogo?category=${category.slug}`}
                className="group bg-white border border-platinum rounded-lg p-6 text-center hover:border-cobalt hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-cobalt/10 flex items-center justify-center text-cobalt group-hover:bg-cobalt group-hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-graphite group-hover:text-cobalt transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ────────────────────── DESTACADOS ────────────────────── */}
      {featured.length > 0 && (
        <section className="bg-platinum/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-graphite">
                  Productos y servicios destacados
                </h2>
                <p className="text-graphite/60 mt-2">
                  Lo más solicitado por nuestros clientes
                </p>
              </div>
              <Link
                href="/catalogo"
                className="hidden sm:inline-block text-cobalt font-semibold hover:underline"
              >
                Ver todo →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  whatsapp={settings.whatsapp}
                />
              ))}
            </div>

            <div className="sm:hidden mt-6 text-center">
              <Link
                href="/catalogo"
                className="text-cobalt font-semibold hover:underline"
              >
                Ver todo el catálogo →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ────────────────────── CTA FINAL ────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-cobalt text-white rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Necesitas asesoría personalizada?
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Cuéntanos qué necesitas y te ayudamos a elegir la mejor solución.
          </p>
          <a
            href={heroWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-alert text-graphite px-6 py-3 rounded-md font-semibold hover:bg-alert/90 transition-colors"
          >
            Hablar con un asesor
          </a>
        </div>
      </section>
    </>
  );
}