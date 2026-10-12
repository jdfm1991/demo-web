'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ItemImage } from '@/types/api';

interface ItemGalleryProps {
  images: ItemImage[];
  itemName: string;
}

export function ItemGallery({ images, itemName }: ItemGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-platinum/30 rounded-lg flex items-center justify-center text-graphite/40">
        Sin imágenes disponibles
      </div>
    );
  }

  const active = images[activeIndex];

  return (
    <div>
      {/* Imagen principal */}
      <div className="aspect-square bg-platinum/30 rounded-lg overflow-hidden relative">
        <img
          src={active.url}
          alt={active.alt || itemName}
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`Ver imagen ${idx + 1} de ${itemName}`}
              aria-current={idx === activeIndex}
              className={`aspect-square rounded-md overflow-hidden border-2 transition-colors relative ${
                idx === activeIndex
                  ? 'border-cobalt'
                  : 'border-transparent hover:border-platinum'
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || `${itemName} - imagen ${idx + 1}`}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}