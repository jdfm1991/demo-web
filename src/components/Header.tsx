import Link from 'next/link';
import type { BusinessSettings } from '@/types/api';
import { HeaderMobileMenu } from './HeaderMobileMenu';

interface HeaderProps {
  settings: BusinessSettings;
}

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
];

export function Header({ settings }: HeaderProps) {
  return (
    <header className="bg-graphite text-platinum sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Nombre */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            {settings.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={settings.logo_url}
                alt={settings.business_name}
                className="h-10 w-auto"
              />
            ) : null}
            <span className="text-lg font-semibold tracking-tight">
              {settings.business_name}
            </span>
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-alert"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent('Hola, quiero más información sobre sus servicios.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-alert text-graphite px-4 py-2 rounded-md text-sm font-semibold hover:bg-alert/90"
            >
              Contactar por WhatsApp
            </a>
          </nav>

          {/* Menú móvil */}
          <HeaderMobileMenu
            businessName={settings.business_name}
            whatsapp={settings.whatsapp}
            links={navLinks}
          />
        </div>
      </div>
    </header>
  );
}