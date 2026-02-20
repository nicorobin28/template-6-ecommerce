export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  category: string;
  tags: string[];
  stock: number;
  features?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export type SortOption = "price-asc" | "price-desc" | "newest" | "rating";
