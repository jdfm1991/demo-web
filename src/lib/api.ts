import type {
  BusinessSettings,
  Category,
  ItemDetail,
  ItemSummary,
  PaginatedResponse,
} from '@/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetchApi<{ data: Category[] }>('/categories');
  return res.data;
}

export async function getFeaturedItems(): Promise<ItemSummary[]> {
  const res = await fetchApi<{ data: ItemSummary[] }>('/items/featured');
  return res.data;
}

export async function getItems(
  params: Record<string, string | number | undefined>
): Promise<PaginatedResponse<ItemSummary>> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      query.append(key, String(value));
    }
  });

  const qs = query.toString();

  return fetchApi<PaginatedResponse<ItemSummary>>(
    `/items${qs ? `?${qs}` : ''}`
  );
}

export async function getItemBySlug(slug: string): Promise<ItemDetail> {
  const res = await fetchApi<{ data: ItemDetail }>(`/items/${slug}`);
  return res.data;
}

export async function getBusinessSettings(): Promise<BusinessSettings> {
  const res = await fetchApi<{ data: BusinessSettings }>('/business-settings');
  return res.data;
}