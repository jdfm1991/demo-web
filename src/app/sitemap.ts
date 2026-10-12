import type { MetadataRoute } from 'next';
import { getCategories, getItems } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  try {
    const [categories, itemsResponse] = await Promise.all([
      getCategories(),
      getItems({ per_page: 48 }),
    ]);

    const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
      url: `${baseUrl}/catalogo?category=${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const itemRoutes: MetadataRoute.Sitemap = itemsResponse.data.map((item) => ({
      url: `${baseUrl}/catalogo/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    return [...staticRoutes, ...categoryRoutes, ...itemRoutes];
  } catch {
    // Si la API falla, devolvemos al menos las rutas estáticas
    return staticRoutes;
  }
}