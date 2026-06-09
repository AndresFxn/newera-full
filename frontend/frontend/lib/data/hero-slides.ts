/**
 * Hero Slides Data - New Era Supermercado
 * 
 * Configuración de slides para el carousel del hero banner.
 * 
 * @module lib/data/hero-slides
 */

/**
 * Estructura de un slide del hero carousel.
 */
export interface HeroSlide {
  /** ID único del slide */
  id: number;
  /** Título principal (grande y bold) */
  title: string;
  /** Subtítulo secundario */
  subtitle: string;
  /** Descripción complementaria */
  description: string;
  /** Texto del botón CTA */
  cta: string;
  /** URL de la imagen de fondo (Unsplash) */
  image: string;
  /** Clases de gradient overlay (Tailwind) */
  gradient: string;
}

/**
 * Array de slides para el hero carousel.
 * 
 * Se rotan automáticamente cada 6 segundos.
 * Las imágenes provienen de Unsplash (placeholder).
 * 
 * @example
 * // Usar en Hero component
 * import { HERO_SLIDES } from '@/lib/data/hero-slides';
 * 
 * function Hero() {
 *   const [currentIndex, setCurrentIndex] = useState(0);
 *   const slide = HERO_SLIDES[currentIndex];
 *   return <div>{slide.title}</div>;
 * }
 */
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: 'Productos Frescos',
    subtitle: 'Directamente del campo a tu mesa',
    description: 'La mejor calidad en frutas, verduras y productos frescos',
    cta: 'Ver productos',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=600&fit=crop&q=80',
    gradient: 'from-green-900/80 via-green-800/60 to-transparent',
  },
  {
    id: 2,
    title: 'Entrega Rápida',
    subtitle: 'En 30 minutos o menos',
    description: 'Recibe tus productos en tiempo récord',
    cta: 'Pedir ahora',
    image:
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=1200&h=600&fit=crop&q=80',
    gradient: 'from-blue-900/80 via-blue-800/60 to-transparent',
  },
  {
    id: 3,
    title: 'Ofertas Especiales',
    subtitle: 'Ahorra hasta 40% en productos seleccionados',
    description: 'Descuentos exclusivos para ti',
    cta: 'Ver ofertas',
    image:
      'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=1200&h=600&fit=crop&q=80',
    gradient: 'from-orange-900/80 via-orange-800/60 to-transparent',
  },
];
