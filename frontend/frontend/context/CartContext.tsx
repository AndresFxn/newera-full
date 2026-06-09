/**
 * Cart Context Module - New Era Supermercado
 * 
 * Maneja el estado global del carrito de compras.
 * 
 * Características:
 * - Persistencia en localStorage
 * - Validación de stock
 * - Cálculos automáticos de totales
 * - Control del drawer lateral
 * 
 * @module context/CartContext
 */

'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { CART_STORAGE_KEY } from '@/lib/constants';
import type { CartContextType, CartItem, Product } from '@/lib/types';

/**
 * Contexto del carrito de compras.
 * @private
 */
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Provider del contexto del carrito.
 * 
 * Debe envolver toda la aplicación para proporcionar acceso al carrito.
 * 
 * @param {Object} props
 * @param {ReactNode} props.children - Componentes hijos
 * 
 * @example
 * <CartProvider>
 *   <App />
 * </CartProvider>
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // Datos corruptos o localStorage no disponible (modo privado)
    }
    setIsHydrated(true);
  }, []);

  // Persistir carrito en localStorage cuando cambie
  useEffect(() => {
    if (!isHydrated) return; // Evitar escribir antes de la hidratación inicial
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage no disponible (modo privado, cuota excedida, etc.)
    }
  }, [items, isHydrated]);

  /**
   * Agrega un producto al carrito.
   * Si ya existe, incrementa la cantidad en 1 (respetando el stock).
   */
  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        // No permitir agregar más allá del stock disponible
        if (existing.quantity >= product.stock) return prev;
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Agregar nuevo producto con cantidad inicial de 1
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  /**
   * Remueve completamente un producto del carrito.
   */
  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  /**
   * Actualiza la cantidad de un producto.
   * Si quantity <= 0, remueve el producto del carrito.
   * Respeta el stock máximo disponible.
   */
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      // Remover si la cantidad es 0 o negativa
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item
      )
    );
  }, []);

  /**
   * Vacía el carrito completamente.
   */
  const clearCart = useCallback(() => setItems([]), []);

  // Cálculo del total de unidades en el carrito
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  // Cálculo del precio total (subtotal sin envío)
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isOpen,
      setIsOpen,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Hook para acceder al contexto del carrito.
 * 
 * Debe usarse dentro de un componente envuelto por CartProvider.
 * 
 * @returns {CartContextType} Contexto del carrito
 * @throws {Error} Si se usa fuera de un CartProvider
 * 
 * @example
 * function ProductCard() {
 *   const { addItem, totalItems } = useCart();
 *   
 *   return (
 *     <button onClick={() => addItem(product)}>
 *       Agregar al carrito ({totalItems})
 *     </button>
 *   );
 * }
 */
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
}
