export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

export interface ItemImage {
  url: string;
  alt: string;
}

export interface ItemSummary {
  id: number;
  name: string;
  slug: string;
  short_description: string | null;
  type: 'product' | 'service';
  price: number | null;
  is_featured: boolean;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  primary_image: ItemImage | null;
}

export interface ItemDetail {
  id: number;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  type: 'product' | 'service';
  price: number | null;
  is_featured: boolean;
  category: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
  };
  images: ItemImage[];
}

export interface BusinessSettings {
  business_name: string;
  tagline: string | null;
  description: string | null;
  logo_url: string | null;
  phone: string | null;
  whatsapp: string;
  email: string | null;
  address: string | null;
  social: {
    facebook: string | null;
    instagram: string | null;
    tiktok: string | null;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: {
    next: string | null;
    prev: string | null;
  };
}