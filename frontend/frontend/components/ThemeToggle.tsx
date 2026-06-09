/**
 * Theme Toggle Component - New Era Supermercado
 * 
 * Botón para cambiar entre modo claro y oscuro.
 * 
 * @module components/ThemeToggle
 */

'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Leer tema del localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark';
    setIsDark(prefersDark);
    
    // Aplicar clase inmediatamente
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    // Actualizar localStorage
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    
    // Aplicar clase al HTML
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      console.log('✅ Modo OSCURO activado');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('✅ Modo CLARO activado');
    }
  };

  if (!mounted) {
    return (
      <button
        className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700 rounded-lg transition-all"
      aria-label={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
      title={`Modo actual: ${isDark ? 'oscuro' : 'claro'}. Click para cambiar`}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}
