/**
 * My Orders Page - New Era Supermercado
 * 
 * Página donde el cliente puede ver el historial de sus pedidos.
 * Muestra estado, fecha, productos y total de cada orden.
 * 
 * @module app/my-orders/page
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getMyOrders } from '@/lib/api-customer';
import { getCurrentUser } from '@/lib/api-admin';
import { formatPrice } from '@/lib/format';

interface Order {
  id: string;
  status: string;
  total: number;
  address: string;
  createdAt: string;
  items: Array<{
    id: string;
    quantity: number;
    unitPrice: number;
    product: {
      name: string;
      imageUrl?: string;
    };
  }>;
}

export default function MyOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Verificar autenticación
    const user = getCurrentUser();
    if (!user || user.role !== 'CUSTOMER') {
      router.push('/auth');
      return;
    }

    loadOrders();
  }, [filter, router]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const { data } = await getMyOrders({
        status: filter === 'ALL' ? undefined : filter,
      });
      setOrders(data);
    } catch (error: any) {
      console.error('Error al cargar órdenes:', error);
      alert(error.message || 'Error al cargar órdenes');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PENDING: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400',
      PAID: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
      PREPARING: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400',
      DISPATCHED: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400',
      DELIVERED: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400',
      CANCELLED: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400',
    };
    return styles[status] || 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      PENDING: 'Pendiente',
      PAID: 'Pagado',
      PREPARING: 'Preparando',
      DISPATCHED: 'En camino',
      DELIVERED: 'Entregado',
      CANCELLED: 'Cancelado',
    };
    return labels[status] || status;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-[#1c6554] dark:hover:text-green-400 mb-4 transition-colors"
          >
            <BackIcon />
            Volver a la tienda
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Mis Pedidos</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Revisa el estado y detalles de tus pedidos
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-6">
          {['ALL', 'PENDING', 'PREPARING', 'DISPATCHED', 'DELIVERED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                filter === status
                  ? 'bg-gradient-to-r from-[#1c6554] to-[#0C447C] dark:from-green-600 dark:to-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700'
              }`}
            >
              {status === 'ALL' ? 'Todos' : getStatusLabel(status)}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#1c6554] dark:border-green-400"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-12 text-center shadow-sm">
            <OrderIcon className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-600 mb-4" />
            <p className="text-slate-600 dark:text-slate-300 text-lg font-medium">
              No tienes pedidos aún
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 mb-6">
              {filter === 'ALL'
                ? 'Empieza a comprar en nuestra tienda'
                : `No hay pedidos con estado ${getStatusLabel(filter)}`}
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#1c6554] to-[#0C447C] dark:from-green-600 dark:to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Ir a la tienda
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Pedido #{order.id.substring(0, 8).toUpperCase()}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                          order.status
                        )}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#1c6554] dark:text-green-400">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="mb-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Dirección de entrega:
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    📍 {order.address}
                  </p>
                </div>

                {/* Products */}
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Productos ({order.items.length}):
                  </p>
                  {order.items.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800/50 p-2 rounded border border-slate-200 dark:border-slate-700"
                    >
                      <span>
                        {item.quantity}x {item.product.name}
                      </span>
                      <span className="font-semibold text-[#1c6554] dark:text-green-400">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      +{order.items.length - 3} productos más
                    </p>
                  )}
                </div>

                {/* Actions */}
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="w-full py-2.5 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-semibold hover:border-[#1c6554] dark:hover:border-green-400 hover:text-[#1c6554] dark:hover:text-green-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  Ver detalles completos
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Modal de detalles */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
              <div className="sticky top-0 bg-gradient-to-r from-[#1c6554] to-[#0C447C] dark:from-green-600 dark:to-blue-600 text-white px-6 py-5 rounded-t-2xl flex justify-between items-start">
                <h3 className="text-2xl font-bold">Detalles del Pedido</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mb-1">
                    ID de Pedido
                  </p>
                  <p className="font-mono text-lg text-slate-900 dark:text-white">
                    {selectedOrder.id}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mb-1">Estado</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(
                      selectedOrder.status
                    )}`}
                  >
                    {getStatusLabel(selectedOrder.status)}
                  </span>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-1">
                    Dirección de Entrega
                  </p>
                  <p className="text-lg text-blue-900 dark:text-blue-300">{selectedOrder.address}</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-semibold mb-3">
                    Productos
                  </p>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700"
                      >
                        <span className="text-slate-900 dark:text-white">
                          {item.quantity}x {item.product.name}
                        </span>
                        <span className="font-semibold text-[#1c6554] dark:text-green-400">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border-2 border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-600 dark:text-green-400 font-semibold mb-1">Total</p>
                  <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                    {formatPrice(selectedOrder.total)}
                  </p>
                </div>
              </div>

              <div className="sticky bottom-0 bg-slate-50 dark:bg-slate-800 px-6 py-4 rounded-b-2xl border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full bg-slate-900 dark:bg-slate-700 text-white px-4 py-3 rounded-xl font-semibold hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Icons
function BackIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function OrderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
