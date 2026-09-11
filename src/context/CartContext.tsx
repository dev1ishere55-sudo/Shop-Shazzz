"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { CartItem, Product } from "@/types";

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variantId?: string, variantLabel?: string) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "shop-shazzz-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (
      product: Product,
      quantity = 1,
      variantId?: string,
      variantLabel?: string
    ) => {
      setItems((prev) => {
        const idx = prev.findIndex(
          (i) =>
            i.product.id === product.id &&
            (i.variantId ?? null) === (variantId ?? null)
        );
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = {
            ...next[idx],
            quantity: next[idx].quantity + quantity,
          };
          return next;
        }
        return [
          ...prev,
          { product, quantity, variantId, variantLabel },
        ];
      });
    },
    []
  );

  const removeItem = useCallback((productId: string, variantId?: string) => {
    setItems((prev) =>
      prev.filter(
        (i) =>
          !(
            i.product.id === productId &&
            (i.variantId ?? null) === (variantId ?? null)
          )
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, variantId?: string) => {
      if (quantity <= 0) {
        removeItem(productId, variantId);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId &&
          (i.variantId ?? null) === (variantId ?? null)
            ? { ...i, quantity }
            : i
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce((sum, i) => sum + i.product.price_naira * i.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
