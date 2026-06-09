/**
 * Logo Component - New Era Supermercado
 * 
 * Componente de logo con diferentes tamaños y modo solo-icono.
 * Incluye link a la página principal y efecto hover.
 * 
 * Usa etiqueta <img> nativa en lugar de next/image para evitar 
 * problemas de compatibilidad con Turbopack en Next.js 16.
 * 
 * @module components/Logo
 */

import Link from 'next/link';

/**
 * Props del componente Logo.
 * 
 * @interface LogoProps
 * @property {string} [size='md'] - Tamaño del logo: 'sm' | 'md' | 'lg' | 'xl'
 * @property {boolean} [iconOnly=false] - Mostrar solo el icono sin texto
 * @property {string} [className=''] - Clases CSS adicionales para personalización
 */
interface LogoProps {
  /** Tamaño del logo: pequeño, mediano, grande o extra grande */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Mostrar solo el icono (sin texto) */
  iconOnly?: boolean;
  /** Clases CSS adicionales para el contenedor */
  className?: string;
}

/**
 * Mapeo de tamaños a clases de Tailwind CSS.
 * Define la altura del logo según el tamaño seleccionado.
 * 
 * @constant
 * @type {Object}
 */
const SIZE_CLASSES = {
  sm: 'h-9',        // 36px - Para uso en espacios reducidos
  md: 'h-[52px]',   // 52px - Tamaño estándar en header
  lg: 'h-[72px]',   // 72px - Para secciones destacadas
  xl: 'h-[90px]',   // 90px - Para hero sections o landing
} as const;

/**
 * Componente de logo de la marca New Era Domicilios.
 * 
 * Renderiza el logo de la empresa con las siguientes características:
 * - Link clickeable a la página principal
 * - Efecto de escala (scale) en hover
 * - Tamaños configurables mediante prop 'size'
 * - Modo solo-icono para espacios reducidos
 * - Optimizado para rendimiento con carga eager
 * 
 * Implementación Técnica:
 * - Usa <img> nativo en lugar de next/image debido a problemas de compatibilidad
 *   con Turbopack en Next.js 16 al procesar imágenes PNG estáticas
 * - El logo se sirve desde /public/logo.png
 * - Mantiene aspect ratio original con object-contain
 * 
 * @param {LogoProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente de logo con link a home
 * 
 * @example
 * // Logo tamaño mediano (por defecto)
 * <Logo />
 * 
 * @example
 * // Logo grande con clase personalizada
 * <Logo size="lg" className="mb-4" />
 * 
 * @example
 * // Solo icono pequeño para menú mobile
 * <Logo size="sm" iconOnly />
 */
export default function Logo({ size = 'md', iconOnly = false, className = '' }: LogoProps) {
  // Obtener la clase de altura según el tamaño seleccionado
  // Si es iconOnly, siempre usa tamaño pequeño
  const heightClass = iconOnly ? SIZE_CLASSES.sm : SIZE_CLASSES[size];

  return (
    <Link 
      href="/" 
      className={`inline-flex items-center group ${className}`}
      aria-label="Ir a la página principal de New Era Domicilios"
    >
      {/* 
        Logo PNG de New Era Domicilios
        
        Se usa <img> nativo en lugar de next/image por compatibilidad
        con Turbopack en Next.js 16 al servir archivos PNG estáticos.
        
        Propiedades:
        - src: Ruta al logo en carpeta public
        - alt: Descripción accesible del logo
        - loading: eager para priorizar carga del logo
        - className: Estilos de Tailwind para tamaño, transiciones y hover
      */}
      <img
        src="/logo.png"
        alt="New Era Domicilios - Logo del supermercado con carrito de compras verde y casa azul"
        className={`
          ${heightClass} 
          w-auto 
          object-contain 
          transition-transform 
          duration-200 
          group-hover:scale-105
        `}
        loading="eager"
      />
    </Link>
  );
}
