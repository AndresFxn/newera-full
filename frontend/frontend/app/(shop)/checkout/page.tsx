/**
 * Checkout Page — New Era Supermercado
 *
 * Formulario de finalización de compra con resumen del carrito.
 * Nota: el pedido aún es simulado (pendiente integración con POST /api/orders).
 *
 * @module app/(shop)/checkout/page
 */

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/Header';
import CategoryIcon from '@/components/CategoryIcon';
import { useCart } from '@/context/CartContext';
import { formatPrice, getOrderTotal, getShippingCost } from '@/lib/format';
import LoadingSpinner from '@/components/auth/LoadingSpinner';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shippingCost = getShippingCost(totalPrice);
  const orderTotal = getOrderTotal(totalPrice);

  async function handlePlaceOrder(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    clearCart();
    setIsSubmitting(false);
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <>
        <Header />
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            ¡Pedido confirmado!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Recibirás un correo con los detalles de tu entrega. Gracias por comprar en New Era.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-[#1c6554] hover:bg-[#1c6554]/90 text-white font-semibold transition-colors"
          >
            Volver a la tienda
          </Link>
        </div>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Tu carrito está vacío
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Agrega productos antes de proceder al pago.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-8 py-3 bg-[#1c6554] hover:bg-[#1c6554]/90 text-white font-semibold transition-colors"
          >
            Explorar productos
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-slate-50 dark:bg-slate-900 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
          <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Finalizar compra
            </h1>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <FormField id="fullName" label="Nombre completo" placeholder="Juan Pérez" />
              <FormField id="email" label="Correo electrónico" type="email" placeholder="tu@email.com" />
              <FormField id="phone" label="Teléfono" type="tel" placeholder="300 123 4567" />
              <FormField id="address" label="Dirección de entrega" placeholder="Calle 123 #45-67" />
              <FormField id="city" label="Ciudad" placeholder="Bogotá" />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 mt-4 bg-[#1c6554] hover:bg-[#1c6554]/90 text-white font-semibold transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoadingSpinner />
                    Procesando pedido...
                  </span>
                ) : (
                  `Confirmar pedido · ${formatPrice(orderTotal)}`
                )}
              </button>
            </form>
          </section>

          <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 h-fit">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Resumen del pedido
            </h2>

            <ul className="space-y-3 mb-6">
              {items.map((item) => (
                <li key={item.product.id} className="flex items-center gap-3 text-sm">
                  <CategoryIcon
                    name={item.product.category?.name || 'Todos los productos'}
                    className="w-10 h-10"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white line-clamp-1">
                      {item.product.name}
                    </p>
                    <p className="text-slate-500">Cantidad: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-[#1c6554]">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="space-y-2 text-sm border-t border-slate-200 dark:border-slate-700 pt-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Envío</span>
                <span className="font-medium text-green-600">
                  {shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Total</span>
                <span className="text-[#1c6554]">{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

interface FormFieldProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
}

function FormField({ id, label, placeholder, type = 'text' }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white input-focus"
      />
    </div>
  );
}
