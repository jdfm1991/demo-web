'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';
import type { Category } from '@/types/api';

interface FiltersBarProps {
  categories: Category[];
}

export function FiltersBar({ categories }: FiltersBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentCategory = searchParams.get('category') ?? '';
  const currentType = searchParams.get('type') ?? '';
  const currentSearch = searchParams.get('search') ?? '';

  const [searchInput, setSearchInput] = useState(currentSearch);

  // Sincroniza el input cuando cambia la URL (ej: volver atrás en el navegador)
  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  // Debounce del campo de búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== currentSearch) {
        updateParams({ search: searchInput || null });
      }
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Resetear a página 1 al cambiar cualquier filtro
    params.delete('page');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  function clearFilters() {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
    setSearchInput('');
  }

  const hasActiveFilters =
    currentCategory !== '' || currentType !== '' || currentSearch !== '';

  return (
    <div className="bg-white border border-platinum rounded-lg p-4 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Búsqueda */}
        <div>
          <label
            htmlFor="search"
            className="block text-xs font-medium text-graphite/60 uppercase tracking-wide mb-1"
          >
            Buscar
          </label>
          <input
            id="search"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Nombre del producto o servicio"
            className="w-full min-h-[44px] px-3 py-2 border border-platinum rounded-md text-sm text-graphite placeholder:text-graphite/40 focus:outline-none focus:border-cobalt focus:ring-1 focus:ring-cobalt"
          />
        </div>

        {/* Categoría */}
        <div>
          <label
            htmlFor="category"
            className="block text-xs font-medium text-graphite/60 uppercase tracking-wide mb-1"
          >
            Categoría
          </label>
          <select
            id="category"
            value={currentCategory}
            onChange={(e) => updateParams({ category: e.target.value || null })}
            className="w-full min-h-[44px] px-3 py-2 border border-platinum rounded-md text-sm text-graphite focus:outline-none focus:border-cobalt focus:ring-1 focus:ring-cobalt bg-white"
          >
            <option value="">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tipo */}
        <div>
          <label
            htmlFor="type"
            className="block text-xs font-medium text-graphite/60 uppercase tracking-wide mb-1"
          >
            Tipo
          </label>
          <select
            id="type"
            value={currentType}
            onChange={(e) => updateParams({ type: e.target.value || null })}
            className="w-full min-h-[44px] px-3 py-2 border border-platinum rounded-md text-sm text-graphite focus:outline-none focus:border-cobalt focus:ring-1 focus:ring-cobalt bg-white"
          >
            <option value="">Todos</option>
            <option value="product">Productos</option>
            <option value="service">Servicios</option>
          </select>
        </div>
      </div>

      {/* Barra inferior con estado y reset */}
      {(hasActiveFilters || isPending) && (
        <div className="mt-4 pt-4 border-t border-platinum flex items-center justify-between">
          <span className="text-xs text-graphite/60">
            {isPending ? 'Aplicando filtros...' : 'Filtros aplicados'}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-medium text-cobalt hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}