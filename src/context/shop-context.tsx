"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { productById } from "@/data/products";
import type { CartItem } from "@/types/product";

type AddCartOptions = {
  size: string;
  color: string;
  quantity?: number;
};

type UpdateCartOptions = Partial<Pick<CartItem, "quantity" | "size" | "color">>;

type ShopContextValue = {
  cart: CartItem[];
  favorites: string[];
  searchHistory: string[];
  cartCount: number;
  subtotal: number;
  hydrated: boolean;
  cartOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  addToCart: (productId: string, options: AddCartOptions) => void;
  removeFromCart: (item: CartItem) => void;
  updateCartItem: (item: CartItem, updates: UpdateCartOptions) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  addSearchTerm: (term: string) => void;
  clearSearchHistory: () => void;
  notify: (message: string) => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

const CART_KEY = "imperio-store-cart";
const FAVORITES_KEY = "imperio-store-favorites";
const SEARCH_KEY = "imperio-store-search-history";

function parseStored<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function sameItem(a: CartItem, b: CartItem) {
  return (
    a.productId === b.productId && a.size === b.size && a.color === b.color
  );
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setCart(parseStored<CartItem[]>(CART_KEY, []));
      setFavorites(parseStored<string[]>(FAVORITES_KEY, []));
      setSearchHistory(parseStored<string[]>(SEARCH_KEY, []));
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  }, [favorites, hydrated]);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(SEARCH_KEY, JSON.stringify(searchHistory));
    }
  }, [searchHistory, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const notify = useCallback((message: string) => setToast(message), []);

  const addToCart = useCallback(
    (productId: string, options: AddCartOptions) => {
      const nextItem: CartItem = {
        productId,
        size: options.size,
        color: options.color,
        quantity: options.quantity ?? 1,
      };

      setCart((current) => {
        const existing = current.find((item) => sameItem(item, nextItem));
        if (!existing) return [...current, nextItem];
        return current.map((item) =>
          sameItem(item, nextItem)
            ? { ...item, quantity: Math.min(item.quantity + nextItem.quantity, 10) }
            : item,
        );
      });
      setCartOpen(true);
      notify("Item adicionado à sacola");
    },
    [notify],
  );

  const removeFromCart = useCallback(
    (target: CartItem) => {
      setCart((current) => current.filter((item) => !sameItem(item, target)));
      notify("Item removido da sacola");
    },
    [notify],
  );

  const updateCartItem = useCallback(
    (target: CartItem, updates: UpdateCartOptions) => {
      setCart((current) => {
        const updated = current.map((item) =>
          sameItem(item, target)
            ? {
                ...item,
                ...updates,
                quantity: Math.max(1, Math.min(updates.quantity ?? item.quantity, 10)),
              }
            : item,
        );

        return updated.reduce<CartItem[]>((result, item) => {
          const duplicate = result.find((saved) => sameItem(saved, item));
          if (duplicate) duplicate.quantity = Math.min(duplicate.quantity + item.quantity, 10);
          else result.push({ ...item });
          return result;
        }, []);
      });
    },
    [],
  );

  const toggleFavorite = useCallback(
    (productId: string) => {
      setFavorites((current) => {
        const active = current.includes(productId);
        notify(active ? "Removido dos favoritos" : "Salvo nos favoritos");
        return active
          ? current.filter((id) => id !== productId)
          : [...current, productId];
      });
    },
    [notify],
  );

  const isFavorite = useCallback(
    (productId: string) => favorites.includes(productId),
    [favorites],
  );

  const addSearchTerm = useCallback((term: string) => {
    const cleaned = term.trim();
    if (!cleaned) return;
    setSearchHistory((current) => [
      cleaned,
      ...current.filter((item) => item.toLowerCase() !== cleaned.toLowerCase()),
    ].slice(0, 6));
  }, []);

  const clearSearchHistory = useCallback(() => setSearchHistory([]), []);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const subtotal = useMemo(
    () =>
      cart.reduce((total, item) => {
        const product = productById(item.productId);
        return total + (product?.salePrice ?? product?.price ?? 0) * item.quantity;
      }, 0),
    [cart],
  );

  const value = useMemo<ShopContextValue>(
    () => ({
      cart,
      favorites,
      searchHistory,
      cartCount,
      subtotal,
      hydrated,
      cartOpen,
      searchOpen,
      mobileMenuOpen,
      setCartOpen,
      setSearchOpen,
      setMobileMenuOpen,
      addToCart,
      removeFromCart,
      updateCartItem,
      toggleFavorite,
      isFavorite,
      addSearchTerm,
      clearSearchHistory,
      notify,
    }),
    [
      addSearchTerm,
      addToCart,
      cart,
      cartCount,
      cartOpen,
      clearSearchHistory,
      favorites,
      hydrated,
      isFavorite,
      mobileMenuOpen,
      notify,
      removeFromCart,
      searchHistory,
      searchOpen,
      subtotal,
      toggleFavorite,
      updateCartItem,
    ],
  );

  return (
    <ShopContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed inset-x-0 bottom-5 z-[100] flex justify-center px-4"
      >
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="pointer-events-auto flex min-h-12 items-center gap-3 border border-chalk/20 bg-chalk px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-ink shadow-[6px_6px_0_#8f1f3f]"
            >
              <Check aria-hidden="true" size={16} />
              <span>{toast}</span>
              <button
                type="button"
                onClick={() => setToast(null)}
                className="ml-2 grid size-7 place-items-center focus-visible:outline-2 focus-visible:outline-offset-2"
                aria-label="Fechar aviso"
              >
                <X aria-hidden="true" size={15} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop deve ser usado dentro de ShopProvider");
  return context;
}
