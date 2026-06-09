/**
 * My Addresses Page - New Era Supermercado
 * 
 * Página donde el cliente puede gestionar sus direcciones de entrega.
 * Permite crear, editar, eliminar y establecer dirección por defecto.
 * 
 * @module app/my-addresses/page
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  getMyAddresses,
  createAddress,
  updateAddress,
  setDefaultAddress,
  deleteAddress,
} from '@/lib/api-customer';
import { getCurrentUser } from '@/lib/api-admin';

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  label?: string;
  isDefault: boolean;
}

export default function MyAddressesPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  useEffect(() => {
    // Verificar autenticación
    const user = getCurrentUser();
    if (!user || user.role !== 'CUSTOMER') {
      router.push('/auth');
      return;
    }

    loadAddresses();
  }, [router]);

  const loadAddresses = async () => {
    try {
      setLoading(true);
      const data = await getMyAddresses();
      setAddresses(data);
    } catch (error: any) {
      console.error('Error al cargar direcciones:', error);
      alert(error.message || 'Error al cargar direcciones');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleSetDefault = async (id: string) => {
    try {
      await setDefaultAddress(id);
      loadAddresses();
    } catch (error: any) {
      alert(error.message || 'Error al establecer dirección por defecto');
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta dirección?')) return;

    try {
      await deleteAddress(id);
      loadAddresses();
    } catch (error: any) {
      alert(error.message || 'Error al eliminar dirección');
    }
  };

  const handleSaveAddress = async (data: any) => {
    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id, data);
      } else {
        await createAddress(data);
      }
      setIsModalOpen(false);
      loadAddresses();
    } catch (error: any) {
      alert(error.message || 'Error al guardar dirección');
    }
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Mis Direcciones
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Gestiona tus direcciones de entrega
              </p>
            </div>
            <button
              onClick={handleAddAddress}
              className="px-6 py-3 bg-gradient-to-r from-[#1c6554] to-[#0C447C] dark:from-green-600 dark:to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
            >
              <PlusIcon />
              Nueva Dirección
            </button>
          </div>
        </div>

        {/* Addresses Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#1c6554] dark:border-green-400"></div>
          </div>
        ) : addresses.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-12 text-center shadow-sm">
            <LocationIcon className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-600 mb-4" />
            <p className="text-slate-600 dark:text-slate-300 text-lg font-medium mb-2">
              No tienes direcciones guardadas
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              Agrega una dirección para facilitar tus pedidos
            </p>
            <button
              onClick={handleAddAddress}
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#1c6554] to-[#0C447C] dark:from-green-600 dark:to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              Agregar primera dirección
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`bg-white dark:bg-slate-900 border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-300 relative ${
                  address.isDefault
                    ? 'border-[#1c6554] dark:border-green-500'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                {/* Default badge */}
                {address.isDefault && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#1c6554] dark:bg-green-600 text-white text-xs font-bold rounded-full">
                    Por defecto
                  </div>
                )}

                {/* Label */}
                {address.label && (
                  <div className="mb-3">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold rounded-lg">
                      {address.label}
                    </span>
                  </div>
                )}

                {/* Address details */}
                <div className="space-y-2 mb-4 mt-2">
                  <p className="text-slate-900 dark:text-white font-medium">{address.street}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {address.city}, {address.state}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    CP: {address.zipCode}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="flex-1 px-3 py-2 text-sm font-medium text-[#1c6554] dark:text-green-400 hover:bg-[#1c6554]/10 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                    >
                      Hacer principal
                    </button>
                  )}
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-[#1c6554] dark:hover:text-green-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address.id)}
                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <AddressModal
            address={editingAddress}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveAddress}
          />
        )}
      </div>
    </div>
  );
}

// Modal Component
interface AddressModalProps {
  address: Address | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

function AddressModal({ address, onClose, onSave }: AddressModalProps) {
  const [formData, setFormData] = useState({
    street: address?.street || '',
    city: address?.city || '',
    state: address?.state || '',
    zipCode: address?.zipCode || '',
    label: address?.label || '',
    isDefault: address?.isDefault || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
        <div className="sticky top-0 bg-gradient-to-r from-[#1c6554] to-[#0C447C] dark:from-green-600 dark:to-blue-600 text-white px-6 py-5 rounded-t-2xl flex justify-between items-start">
          <h3 className="text-2xl font-bold">
            {address ? 'Editar Dirección' : 'Nueva Dirección'}
          </h3>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Etiqueta (opcional)
            </label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:border-[#1c6554] dark:focus:border-green-500 focus:ring-4 focus:ring-[#1c6554]/10 dark:focus:ring-green-500/20 transition-all text-slate-900 dark:text-white"
              placeholder="Ej: Casa, Oficina, Apartamento..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Dirección completa *
            </label>
            <input
              type="text"
              required
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:border-[#1c6554] dark:focus:border-green-500 focus:ring-4 focus:ring-[#1c6554]/10 dark:focus:ring-green-500/20 transition-all text-slate-900 dark:text-white"
              placeholder="Calle 123 #45-67"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Ciudad *
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:border-[#1c6554] dark:focus:border-green-500 focus:ring-4 focus:ring-[#1c6554]/10 dark:focus:ring-green-500/20 transition-all text-slate-900 dark:text-white"
                placeholder="Bogotá"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Departamento *
              </label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:border-[#1c6554] dark:focus:border-green-500 focus:ring-4 focus:ring-[#1c6554]/10 dark:focus:ring-green-500/20 transition-all text-slate-900 dark:text-white"
                placeholder="Cundinamarca"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Código Postal *
            </label>
            <input
              type="text"
              required
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:border-[#1c6554] dark:focus:border-green-500 focus:ring-4 focus:ring-[#1c6554]/10 dark:focus:ring-green-500/20 transition-all text-slate-900 dark:text-white"
              placeholder="110111"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={formData.isDefault}
              onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              className="w-5 h-5 accent-[#1c6554] dark:accent-green-500 cursor-pointer rounded"
            />
            <label
              htmlFor="isDefault"
              className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer font-medium"
            >
              Establecer como dirección principal
            </label>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-[#1c6554] to-[#0C447C] dark:from-green-600 dark:to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              {address ? 'Guardar Cambios' : 'Crear Dirección'}
            </button>
          </div>
        </form>
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

function PlusIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
