/**
 * Products Grid Component - New Era Supermercado
 * 
 * Grid de productos con:
 * - Carga de productos con loading skeleton
 * - Límite de productos destacados (primeros 10)
 * - Botón para ver catálogo completo
 * - Estados de carga y vacío
 * - Filtros por búsqueda y categoría
 * 
 * @module components/ProductsGrid
 */

'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/lib/api';
import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';

/**
 * Props del componente ProductsGrid.
 */
interface ProductsGridProps {
  /** Término de búsqueda activo */
  searchQuery: string;
  /** ID de categoría seleccionada (null = todas) */
  selectedCategory: string | null;
}

/** Número de skeletons a mostrar durante la carga */
const SKELETON_COUNT = 10;

/** Límite de productos destacados a mostrar inicialmente */
const FEATURED_LIMIT = 10;

/**
 * Grid de productos del catálogo.
 * 
 * Muestra productos con filtros de búsqueda y categoría.
 * Limita inicialmente a productos destacados con opción de ver todos.
 * 
 * @param {ProductsGridProps} props
 * @returns {JSX.Element}
 */
export default function ProductsGrid({ searchQuery, selectedCategory }: ProductsGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Cargar productos cuando cambien los filtros
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setShowAll(false); // Reset cuando cambian los filtros

    getProducts(searchQuery || undefined, selectedCategory || undefined)
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [searchQuery, selectedCategory]);

  // Lógica de filtrado y límite de productos
  const isFiltered = searchQuery || selectedCategory;
  const shouldLimit = !isFiltered && !showAll;
  const displayedProducts = shouldLimit ? products.slice(0, FEATURED_LIMIT) : products;
  const hasMoreProducts = products.length > FEATURED_LIMIT;

  // Títulos dinámicos según el estado de filtros
  const title = searchQuery
    ? `Resultados para "${searchQuery}"`
    : selectedCategory
    ? 'Productos de la categoría'
    : 'Productos destacados';

  const countLabel = isLoading
    ? 'Cargando...'
    : shouldLimit
    ? `Mostrando ${displayedProducts.length} de ${products.length} productos`
    : `${products.length} ${products.length === 1 ? 'producto' : 'productos'}`;

  return (
    <section className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-900" id="productos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{countLabel}</p>
        </header>

        {isLoading ? (
          <ProductSkeletonGrid />
        ) : products.length === 0 ? (
          <EmptyProducts />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Botón para ver catálogo completo */}
            {shouldLimit && hasMoreProducts && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setShowAll(true)}
                  className="group flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-[#0C447C] to-[#1c6554] text-white transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span className="font-semibold text-base">Ver catálogo completo</span>
                  <span className="px-3 py-1 bg-white/20 text-sm font-medium rounded-full">
                    +{products.length - FEATURED_LIMIT} productos
                  </span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            )}

            {/* Botón para volver a productos destacados */}
            {showAll && !isFiltered && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    setShowAll(false);
                    // Scroll suave a la sección de productos
                    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 text-slate-600 dark:text-slate-400 hover:text-[#1c6554] dark:hover:text-[#1c6554] font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                  Volver a productos destacados
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/**
 * Grid de skeletons de carga para productos.
 * 
 * Muestra placeholders animados mientras cargan los productos reales.
 * 
 * @returns {JSX.Element}
 */
function ProductSkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          <div className="aspect-square bg-slate-100 dark:bg-slate-700 animate-shimmer" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-slate-100 dark:bg-slate-700 animate-shimmer" />
            <div className="h-3 bg-slate-100 dark:bg-slate-700 w-2/3 animate-shimmer" />
            <div className="h-6 bg-slate-100 dark:bg-slate-700 w-1/2 animate-shimmer" />
            <div className="h-10 bg-slate-100 dark:bg-slate-700 animate-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Estado vacío cuando no hay productos que mostrar.
 * 
 * Se muestra cuando la búsqueda/filtros no arrojan resultados.
 * 
 * @returns {JSX.Element}
 */
function EmptyProducts() {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
        <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        No encontramos productos
      </h3>
      <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
        Intenta con otra búsqueda o explora nuestras categorías
      </p>
    </div>
  );
}
