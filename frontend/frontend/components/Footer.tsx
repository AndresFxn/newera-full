/**
 * Footer Component - New Era Supermercado
 * 
 * Pie de página con:
 * - Logo y descripción
 * - Links de navegación
 * - Links de ayuda
 * - Links legales
 * - Redes sociales
 * - Copyright
 * 
 * @module components/Footer
 */

import Link from 'next/link';
import Logo from '@/components/Logo';

/** Enlaces de navegación principal */
const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/#productos' },
  { label: 'Categorías', href: '/#categorias' },
  { label: 'Checkout', href: '/checkout' },
] as const;

/** Enlaces de ayuda y soporte */
const HELP_LINKS = [
  { label: 'Preguntas frecuentes', href: '/ayuda#faq' },
  { label: 'Política de envío', href: '/ayuda#envio' },
  { label: 'Devoluciones', href: '/ayuda#devoluciones' },
  { label: 'Contáctanos', href: '/ayuda#contacto' },
] as const;

/** Enlaces legales y políticas */
const LEGAL_LINKS = [
  { label: 'Términos y condiciones', href: '/terminos' },
  { label: 'Política de privacidad', href: '/privacidad' },
] as const;

/**
 * Componente de pie de página principal.
 * 
 * @returns {JSX.Element}
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-300 dark:text-slate-400 border-t border-slate-700/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Columna del Logo y Redes */}
          <div className="lg:col-span-1">
            <div className="mb-4 transform transition-transform hover:scale-105">
              <Logo size="md" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Tu supermercado de confianza. Productos frescos y de calidad directo a tu hogar.
            </p>
            <div className="flex gap-3">
              {[
                { name: 'facebook', url: 'https://facebook.com' },
                { name: 'instagram', url: 'https://instagram.com' },
                { name: 'twitter', url: 'https://twitter.com' }
              ].map((network) => (
                <a
                  key={network.name}
                  href={network.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800/80 hover:bg-gradient-to-br hover:from-[#0C447C] hover:to-[#1c6554] flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  aria-label={network.name}
                >
                  <SocialIcon name={network.name} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Navegación" links={NAV_LINKS} />
          <FooterColumn title="Ayuda" links={HELP_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400 text-center sm:text-left">
            © {currentYear} <span className="font-semibold text-white">New Era Supermercado</span>. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
            </svg>
            <span>Hecho con ❤️ en Colombia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Columna de enlaces en el footer.
 * 
 * @param {Object} props
 * @param {string} props.title - Título de la columna
 * @param {ReadonlyArray<{label: string; href: string}>} props.links - Lista de enlaces
 * @returns {JSX.Element}
 */
function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider relative inline-block">
        {title}
        <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[#0C447C] to-[#1c6554] -mb-2"></span>
      </h3>
      <ul className="space-y-3 mt-6">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-slate-400 hover:text-[#1c6554] transition-colors inline-flex items-center gap-2 group"
            >
              <span className="w-0 group-hover:w-2 h-0.5 bg-[#1c6554] transition-all duration-300"></span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Icono de red social.
 * 
 * @param {Object} props
 * @param {string} props.name - Nombre de la red social (facebook, instagram, twitter)
 * @returns {JSX.Element | null}
 */
function SocialIcon({ name }: { name: string }) {
  const iconClass = "w-5 h-5 text-slate-400 group-hover:text-white transition-colors";
  
  switch (name) {
    case 'facebook':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    default:
      return null;
  }
}
