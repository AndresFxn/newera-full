/**
 * Categories Section Component - New Era Supermercado
 * 
 * Sección de categorías de productos con:
 * - Grid de tarjetas de categorías
 * - Scroll horizontal con controles
 * - Iconos profesionales SVG para cada categoría
 * - Estado activo visual
 * - Filtro "Todos los productos"
 * 
 * @module components/Categories
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { getCategories } from '@/lib/api';
import CategoryIcon from '@/components/CategoryIcon';
import type { Category } from '@/lib/types';

/**
 * Props del componente Categories.
 */
interface CategoriesProps {
  /** ID de la categoría actualmente seleccionada (null = todas) */
  selectedCategory: string | null;
  /** Callback cuando se selecciona una categoría */
  onSelectCategory: (categoryId: string | null) => void;
}

/**
 * Componente de sección de categorías.
 * 
 * Muestra todas las categorías disponibles en un scroll horizontal.
 * Permite filtrar productos por categoría.
 * 
 * @param {CategoriesProps} props
 * @returns {JSX.Element}
 */
export default function Categories({ selectedCategory, onSelectCategory }: CategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Cargar categorías al montar
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  /**
   * Actualiza el estado de los botones de scroll según la posición actual.
   */
  function updateScrollState() {
    const element = scrollRef.current;
    if (!element) return;
    setCanScrollLeft(element.scrollLeft > 0);
    setCanScrollRight(element.scrollLeft < element.scrollWidth - element.clientWidth - 1);
  }

  // Actualizar estado de scroll al montar y al redimensionar
  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [categories]);

  /**
   * Desplaza el contenedor horizontal.
   */
  function scroll(direction: 'left' | 'right') {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950" id="categorias">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header con línea decorativa */}
        <div className="text-center mb-10">
          <div className="inline-block">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Explora por Categorías
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#0C447C] to-[#1c6554] mx-auto"></div>
          </div>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Encuentra lo que necesitas navegando por nuestras categorías de productos frescos y de calidad
          </p>
        </div>

        {/* Controles de scroll - solo desktop */}
        <div className="relative">
          {canScrollLeft && (
            <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10">
              <ScrollButton direction="left" onClick={() => scroll('left')} />
            </div>
          )}
          
          {canScrollRight && (
            <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10">
              <ScrollButton direction="right" onClick={() => scroll('right')} />
            </div>
          )}

          {/* Grid de categorías con scroll horizontal */}
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 scroll-smooth"
          >
            <CategoryCard
              label="Todos los productos"
              isActive={selectedCategory === null}
              onClick={() => onSelectCategory(null)}
            />

            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                label={category.name}
                isActive={selectedCategory === category.id}
                onClick={() =>
                  onSelectCategory(selectedCategory === category.id ? null : category.id)
                }
              />
            ))}
          </div>
        </div>

        {/* Indicador de scroll en móvil */}
        <div className="flex justify-center gap-2 mt-6 lg:hidden">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1"
            >
              Siguiente
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Props del componente CategoryCard.
 */
interface CategoryCardProps {
  /** Nombre de la categoría */
  label: string;
  /** Si está actualmente seleccionada */
  isActive: boolean;
  /** Callback al hacer clic */
  onClick: () => void;
}

/**
 * Tarjeta individual de categoría.
 * 
 * Muestra el icono y nombre de la categoría con estado visual activo/inactivo.
 * 
 * @param {CategoryCardProps} props
 * @returns {JSX.Element}
 */
function CategoryCard({ label, isActive, onClick }: CategoryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex-shrink-0 relative overflow-hidden transition-all duration-300 ${
        isActive
          ? 'w-36 sm:w-40'
          : 'w-32 sm:w-36 hover:scale-105'
      }`}
    >
      {/* Card container */}
      <div
        className={`relative h-32 sm:h-36 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-br from-[#0C447C] to-[#1c6554] shadow-lg shadow-[#1c6554]/20'
            : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-[#1c6554] dark:hover:border-[#1c6554] shadow-md hover:shadow-lg'
        }`}
      >
        {/* Icon */}
        <div
          className={`transition-transform duration-300 ${
            isActive 
              ? 'scale-110 text-white' 
              : 'group-hover:scale-110 text-slate-700 dark:text-slate-300'
          }`}
        >
          <CategoryIcon name={label} className="w-14 h-14 sm:w-16 sm:h-16" />
        </div>

        {/* Label */}
        <div
          className={`text-center px-2 font-semibold text-sm transition-colors ${
            isActive
              ? 'text-white'
              : 'text-slate-700 dark:text-slate-300 group-hover:text-[#1c6554] dark:group-hover:text-[#1c6554]'
          }`}
        >
          {label}
        </div>

        {/* Active indicator */}
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/40"></div>
        )}

        {/* Hover effect overlay */}
        {!isActive && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0C447C]/0 to-[#1c6554]/0 group-hover:from-[#0C447C]/5 group-hover:to-[#1c6554]/5 transition-all duration-300"></div>
        )}
      </div>
    </button>
  );
}

/**
 * Botón de scroll circular para navegación de categorías.
 * 
 * @param {Object} props
 * @param {'left' | 'right'} props.direction - Dirección del scroll
 * @param {() => void} props.onClick - Callback al hacer clic
 * @returns {JSX.Element}
 */
function ScrollButton({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-[#1c6554] dark:hover:border-[#1c6554] flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-[#1c6554] dark:hover:text-[#1c6554] hover:bg-gradient-to-br hover:from-[#0C447C]/10 hover:to-[#1c6554]/10 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 group"
      aria-label={direction === 'left' ? 'Categorías anteriores' : 'Siguientes categorías'}
    >
      <svg 
        className="w-6 h-6 transition-transform group-hover:scale-110" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2.5} 
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
        />
      </svg>
    </button>
  );
}
