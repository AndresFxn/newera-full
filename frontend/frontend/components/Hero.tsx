/**
 * Hero Banner Component - New Era Supermercado
 * 
 * Banner principal de la landing page con:
 * - Carrusel automático de slides
 * - Imágenes de fondo con overlay gradient
 * - Indicadores de navegación
 * - Estadísticas (productos, tiempo de entrega, calificación)
 * - CTAs principales
 * 
 * @module components/Hero
 */

'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/constants';
import { HERO_SLIDES } from '@/lib/data/hero-slides';
import { formatPrice } from '@/lib/format';

/** Intervalo entre slides automáticos (en milisegundos) */
const SLIDE_INTERVAL_MS = 6000;

/** Duración de la transición entre slides (en milisegundos) */
const TRANSITION_MS = 500;

/**
 * Componente de banner hero con carrusel.
 * 
 * Muestra información destacada sobre el supermercado con cambio automático
 * de slides cada 6 segundos.
 * 
 * @returns {JSX.Element}
 */
export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /**
   * Navega a un slide específico con animación.
   */
  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), TRANSITION_MS);
    },
    [currentIndex, isTransitioning]
  );

  /**
   * Avanza al siguiente slide (con loop circular).
   */
  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % HERO_SLIDES.length);
  }, [currentIndex, goToSlide]);

  // Configurar avance automático de slides
  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = HERO_SLIDES[currentIndex];

  return (
    <section className="relative bg-slate-900 overflow-hidden">
      <div className="relative h-[400px] sm:h-[450px] lg:h-[550px]">
        <div className="absolute inset-0">
          <Image
            key={slide.id}
            src={slide.image}
            alt={slide.title}
            fill
            priority={currentIndex === 0}
            sizes="100vw"
            className="object-cover animate-fade-in"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-slide-up">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-white">
                Envío gratis en compras +{formatPrice(FREE_SHIPPING_THRESHOLD)}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 animate-slide-up">
              {slide.title}
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-3 animate-slide-up delay-75">
              {slide.subtitle}
            </p>
            <p className="text-lg text-white/80 mb-8 animate-slide-up delay-150">
              {slide.description}
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up delay-225">
              <a
                href="#productos"
                className="px-8 py-4 bg-[#1c6554] hover:bg-[#1c6554]/90 text-white font-semibold transition-all hover-lift shadow-lg hover:shadow-xl"
              >
                {slide.cta}
              </a>
              <a
                href="#categorias"
                className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white font-semibold transition-all"
              >
                Explorar categorías
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {HERO_SLIDES.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className={`h-1 transition-all ${
                      index === currentIndex
                        ? 'w-12 bg-white'
                        : 'w-8 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Ir al slide ${index + 1}`}
                    aria-current={index === currentIndex ? 'true' : undefined}
                  />
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-8 text-white">
                <Stat value="2500+" label="Productos" />
                <Stat value="30min" label="Entrega" />
                <Stat value="4.8★" label="Calificación" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />
    </section>
  );
}

/**
 * Componente de estadística para el hero.
 * 
 * @param {Object} props
 * @param {string} props.value - Valor a mostrar (ej: "2500+", "4.8★")
 * @param {string} props.label - Etiqueta descriptiva (ej: "Productos")
 * @returns {JSX.Element}
 */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  );
}
