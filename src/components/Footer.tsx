import type { BusinessSettings } from '@/types/api';

interface FooterProps {
  settings: BusinessSettings;
}

export function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-graphite text-platinum mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Nombre y tagline */}
          <div>
            <h3 className="text-lg font-semibold mb-2">{settings.business_name}</h3>
            {settings.tagline && (
              <p className="text-sm text-platinum/70">{settings.tagline}</p>
            )}
          </div>

          {/* Columna 2: Contacto */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 text-alert">
              Contacto
            </h4>
            <ul className="space-y-2 text-sm text-platinum/80">
              {settings.phone && (
                <li>Teléfono: {settings.phone}</li>
              )}
              {settings.email && (
                <li>
                  Email:{' '}
                  <a href={`mailto:${settings.email}`} className="hover:text-alert">
                    {settings.email}
                  </a>
                </li>
              )}
              {settings.address && <li>{settings.address}</li>}
            </ul>
          </div>

          {/* Columna 3: Redes y WhatsApp */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 text-alert">
              Síguenos
            </h4>
            <ul className="space-y-2 text-sm text-platinum/80">
              {settings.social.instagram && (
                <li>
                  <a
                    href={settings.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-alert"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {settings.social.facebook && (
                <li>
                  <a
                    href={settings.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-alert"
                  >
                    Facebook
                  </a>
                </li>
              )}
              {settings.social.tiktok && (
                <li>
                  <a
                    href={settings.social.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-alert"
                  >
                    TikTok
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-platinum/10 mt-8 pt-6 text-xs text-platinum/60 text-center">
          © {year} {settings.business_name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}