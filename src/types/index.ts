export type ProductType = "in_stock" | "curated_find";

export type Category =
  | "Clothing"
  | "Bags"
  | "Jewelry & Nails"
  | "Accessories"
  | "Food & Drops";

export interface ProductVariant {
  id: string;
  label: string;
  stock?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price_naira: number;
  category: Category;
  type: ProductType;
  source_name?: string | null;
  source_url?: string | null;
  images: string[];
  stock_qty?: number | null;
  variants?: ProductVariant[];
  featured?: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  variantId?: string;
  variantLabel?: string;
}

export type OrderStatus =
  | "placed"
  | "sourcing"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed";

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  delivery_address: string;
  delivery_zone: string;
  items: CartItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  telegram_user_id?: string | null;
  notes?: string;
  created_at: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  fee: number;
  note?: string;
}
