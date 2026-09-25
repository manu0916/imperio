export type ProductAudience = "Feminino" | "Masculino" | "Unissex";

export type ProductColor = {
  name: string;
  value: string;
};

export type ProductSize = {
  label: string;
  stock: number;
};

export type Product = {
  id: string;
  code: string;
  slug: string;
  name: string;
  category: string;
  audience: ProductAudience;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  imagePosition?: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  tags: string[];
  collection: string;
  materials: string[];
  care: string[];
  featured: boolean;
  isNew: boolean;
  available: boolean;
};

export type CartItem = {
  productId: string;
  color: string;
  size: string;
  quantity: number;
};

