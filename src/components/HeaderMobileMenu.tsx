'use client';

import Link from 'next/link';
import { useState } from 'react';

interface HeaderMobileMenuProps {
  businessName: string;
  whatsapp: string;
  links: { href: string; label: string }[];
}

export function HeaderMobileMenu({ whatsapp, links }: HeaderMobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        className="md:hidden text-platinum p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </button>

      {open && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-graphite border-t border-platinum/10 shadow-lg">
          <nav className="flex flex-col p-4 gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-platinum font-medium hover:text-alert"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hola, quiero más información sobre sus servicios.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-alert text-graphite px-4 py-2 rounded-md text-center font-semibold"
            >
              Contactar por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </>
  );
}