/**
 * Shop Home Page - New Era Supermercado
 * 
 * Landing page principal de la tienda con:
 * - Banner de promociones activas
 * - Header con búsqueda
 * - Hero carousel
 * - Categorías
 * - Grid de productos
 * 
 * @module app/(shop)/page
 */

'use client';

import { useCallback, useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import ProductsGrid from '@/components/ProductsGrid';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategorySelect = useCallback((categoryId: string | null) => {
    setSelectedCategory(categoryId);
  }, []);

  return (
    <>
      <Header onSearch={handleSearch} />
      
      {/* Banner de envíos gratis */}
      <div className="bg-gradient-to-r from-[#1c6554] to-[#0C447C] dark:from-[#1c6554]/90 dark:to-[#0C447C]/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-2 text-sm">
            <TruckIcon />
            <span className="font-medium">Envíos gratis en compras mayores a $50.000</span>
          </div>
        </div>
      </div>

      <section id="hero">
        <Hero />
      </section>
      <section id="categorias">
        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      </section>
      <section id="productos">
        <ProductsGrid searchQuery={searchQuery} selectedCategory={selectedCategory} />
      </section>
    </>
  );
}

// Icono de camión
function TruckIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
      />
    </svg>
  );
}
