import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import type { CartProductItem } from "@/hooks/useProducts";

type CartItem = CartProductItem & { quantity: number };

type CartContextType = {
  products: CartItem[];
  total: number;
  addItem: (item: CartProductItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products]);

  const addItem = (item: CartProductItem) => {
    setProducts((prev) => {
      const existing = prev.find((product) => product.id === item.id);

      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const increaseQuantity = (id: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity - 1) }
          : product
      )
    );
  };

  const clearCart = () => setProducts([]);

  const total = useMemo(
    () =>
      products.reduce((sum, product) => {
        const amountStr = product.price?.amount ?? "0";
        const amountNum = parseFloat(amountStr.replace(",", "."));

        return sum + (amountNum || 0) * product.quantity;
      }, 0),
    [products]
  );

  const value = useMemo(
    () => ({
      products,
      total,
      addItem,
      removeItem,
      clearCart,
      increaseQuantity,
      decreaseQuantity,
    }),
    [products, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
