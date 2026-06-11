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
 * - Restricción de acceso solo para usuarios autenticados
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
import Toast from '@/components/Toast';

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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning' | 'info'>('info');

  // Función helper para verificar autenticación
  const isAuthenticated = useCallback(() => {
    if (typeof window === 'undefined') return false;
    // Buscar en ambas claves por compatibilidad
    const token = localStorage.getItem('auth_token') || localStorage.getItem('token');
    return !!token;
  }, []);

  // Cargar carrito desde localStorage al montar SOLO si está autenticado
  useEffect(() => {
    if (!isAuthenticated()) {
      // No hay usuario logueado, limpiar todo
      try {
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch {}
      setIsHydrated(true);
      return;
    }

    // Usuario logueado, cargar carrito
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // Datos corruptos, limpiar
      localStorage.removeItem(CART_STORAGE_KEY);
    }
    setIsHydrated(true);
  }, [isAuthenticated]);

  // Limpiar carrito automáticamente si no hay autenticación
  useEffect(() => {
    if (!isHydrated) return;
    
    if (!isAuthenticated() && items.length > 0) {
      // No está autenticado pero tiene items, limpiar inmediatamente
      setItems([]);
      try {
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch {}
    }
  }, [isHydrated, isAuthenticated, items]);

  // Persistir carrito SOLO si está autenticado
  useEffect(() => {
    if (!isHydrated) return;
    
    if (!isAuthenticated()) {
      // No autenticado, asegurar que esté limpio
      if (items.length > 0) {
        setItems([]);
      }
      try {
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch {}
      return;
    }

    // Usuario autenticado, persistir normalmente
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, isHydrated, isAuthenticated]);

  /**
   * Agrega un producto al carrito.
   * Si ya existe, incrementa la cantidad en 1 (respetando el stock).
   * Solo permite agregar si el usuario está autenticado.
   */
  const addItem = useCallback((product: Product) => {
    // Verificar autenticación SIEMPRE - redirigir inmediatamente al login
    if (!isAuthenticated()) {
      window.location.href = '/auth/login';
      return;
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          setToastMessage('No hay más stock disponible');
          setToastType('warning');
          setShowToast(true);
          return prev;
        }
        
        setToastMessage('Producto agregado al carrito');
        setToastType('success');
        setShowToast(true);
        
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      setToastMessage('Producto agregado al carrito');
      setToastType('success');
      setShowToast(true);
      
      return [...prev, { product, quantity: 1 }];
    });
  }, [isAuthenticated]);

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

  return (
    <CartContext.Provider value={value}>
      {children}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </CartContext.Provider>
  );
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
