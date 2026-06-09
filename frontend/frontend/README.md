# 🛒 New Era Supermercado - Frontend

Frontend moderno y profesional para supermercado online construido con Next.js 16, React 19 y Tailwind CSS 4.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.2.7-black)
![React](https://img.shields.io/badge/React-19.2.4-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Desarrollo](#-desarrollo)
- [Integración con Backend](#-integración-con-backend)
- [Variables de Entorno](#-variables-de-entorno)
- [Componentes Principales](#-componentes-principales)
- [Estilo y Diseño](#-estilo-y-diseño)
- [Scripts Disponibles](#-scripts-disponibles)
- [Build y Deploy](#-build-y-deploy)

## ✨ Características

### 🎨 Diseño y UX
- **Diseño profesional y minimalista** con coherencia visual en toda la aplicación
- **Color corporativo**: `#1c6554` (verde elegante) usado consistentemente
- **Responsive design** optimizado para móvil, tablet y desktop
- **Animaciones suaves** con CSS transitions y keyframes personalizados
- **Hero carousel** con cambio automático de slides cada 6 segundos
- **Categorías visuales** con iconos SVG profesionales

### 🛍️ Funcionalidades de E-commerce
- **Catálogo de productos** con búsqueda en tiempo real (debounced)
- **Filtros por categoría** con navegación visual
- **Carrito de compras persistente** (localStorage)
- **Validación de stock** en tiempo real
- **Cálculo automático** de subtotal, envío y total
- **Envío gratis** en compras mayores a $50.000 COP
- **Productos destacados** con límite inicial de 10 items

### 🔐 Autenticación
- **Flujo de login/registro** con diseño split-screen
- **Recuperación de contraseña** con interfaz coherente
- **Animaciones dinámicas** (logo que se mueve según el modo)
- **Validación de formularios** con feedback visual

### ♿ Accesibilidad
- **Etiquetas ARIA** en todos los elementos interactivos
- **Alt text** en todas las imágenes
- **Navegación por teclado** habilitada
- **Contraste de colores** optimizado

## 🚀 Tecnologías

### Core
- **[Next.js 16.2.7](https://nextjs.org/)** - Framework React con App Router
- **[React 19.2.4](https://react.dev/)** - Librería UI
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Tipado estático

### Styling
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[next-themes 0.4.6](https://github.com/pacocoursey/next-themes)** - Manejo de temas

### Desarrollo
- **[ESLint 9](https://eslint.org/)** - Linter de código
- **[PostCSS](https://postcss.org/)** - Procesador CSS

## 📁 Estructura del Proyecto

```
frontend/
├── app/                          # App Router de Next.js
│   ├── (shop)/                  # Grupo de rutas del shop
│   │   ├── ayuda/               # Página de ayuda (FAQ, envío, etc.)
│   │   ├── checkout/            # Página de checkout
│   │   ├── privacidad/          # Política de privacidad
│   │   ├── terminos/            # Términos y condiciones
│   │   ├── layout.tsx           # Layout del shop
│   │   └── page.tsx             # Home page (landing)
│   ├── auth/                    # Páginas de autenticación
│   │   ├── forgot-password/     # Recuperar contraseña
│   │   ├── login/               # Iniciar sesión
│   │   ├── register/            # Registro
│   │   └── layout.tsx           # Layout de auth
│   ├── layout.tsx               # Layout raíz
│   └── globals.css              # Estilos globales
│
├── components/                   # Componentes React
│   ├── admin/                   # Componentes del panel admin
│   │   ├── ImageUpload.tsx      # Subida de imágenes
│   │   └── ProtectedRoute.tsx   # Guard de rutas admin
│   ├── auth/                    # Componentes de autenticación
│   │   ├── AnimatedAuth.tsx     # Login/registro animado
│   │   ├── AuthField.tsx        # Campo de formulario
│   │   └── LoadingSpinner.tsx   # Spinner de carga
│   ├── CartDrawer.tsx           # Drawer lateral del carrito
│   ├── Categories.tsx           # Sección de categorías
│   ├── CategoryIcon.tsx         # Iconos SVG de categorías
│   ├── Footer.tsx               # Pie de página
│   ├── Header.tsx               # Encabezado con búsqueda
│   ├── Hero.tsx                 # Banner hero con carousel
│   ├── LegalPage.tsx            # Template para páginas legales
│   ├── Logo.tsx                 # Logo del supermercado
│   ├── ProductCard.tsx          # Tarjeta de producto
│   ├── ProductsGrid.tsx         # Grid de productos
│   ├── PromotionPopup.tsx       # Popup de promociones
│   └── Providers.tsx            # Providers (Context, Theme)
│
├── context/                      # Contextos de React
│   └── CartContext.tsx          # Estado global del carrito
│
├── hooks/                        # Custom hooks
│   └── useDebounce.ts           # Hook de debouncing
│
├── lib/                          # Utilidades y tipos
│   ├── data/
│   │   └── hero-slides.ts       # Slides del hero carousel
│   ├── api.ts                   # API pública (categorías, productos, promos)
│   ├── api-admin.ts             # API admin (requiere JWT)
│   ├── constants.ts             # Constantes de la app
│   ├── format.ts                # Funciones de formateo
│   └── types.ts                 # Definiciones de tipos
│
├── public/                       # Assets estáticos
│   ├── icons/                   # Iconos PWA
│   ├── logo.png                 # Logo del supermercado
│   └── manifest.json            # Manifiesto PWA
│
├── .env.example                 # Variables de entorno ejemplo
├── .gitignore                   # Archivos ignorados por Git
├── eslint.config.mjs            # Configuración ESLint
├── next.config.ts               # Configuración Next.js
├── package.json                 # Dependencias
├── postcss.config.mjs           # Configuración PostCSS
├── tsconfig.json                # Configuración TypeScript
└── README.md                    # Este archivo
```

## 📦 Instalación

### Prerrequisitos

- **Node.js 20+** y npm
- Git

### Pasos

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd frontend/frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Editar `.env.local` con tu configuración:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🔧 Desarrollo

### Modo de Desarrollo

```bash
npm run dev
```

- Hot reload habilitado
- Puerto: 5173
- URL: http://localhost:5173

### Linting

```bash
npm run lint
```

### Build de Producción

```bash
npm run build
npm run start
```

## 🔌 Integración con Backend

Actualmente el frontend usa **datos mock** para desarrollo. Para conectar con el backend real:

### 1. Configurar URL del API

En `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### 2. Descomentar código de integración

En `lib/api.ts`, reemplazar:


```typescript
// MOCK (actual)
export async function getProducts() {
  await simulateNetworkDelay(150);
  return MOCK_PRODUCTS.filter((product) => product.isActive);
}
```

Por:

```typescript
// REAL (producción)
export async function getProducts(search?: string, categoryId?: string) {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (categoryId) params.set('categoryId', categoryId);
  
  const res = await fetch(`${getApiBaseUrl()}/products?${params}`, { 
    next: { revalidate: 30 } 
  });
  
  if (!res.ok) throw new Error('Error al obtener productos');
  const { data } = await res.json();
  return data;
}
```

### 3. Endpoints del Backend Esperados

El frontend espera estos endpoints:

#### GET `/api/categories`
```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "createdAt": "ISO 8601 date"
    }
  ]
}
```

#### GET `/api/products?search={query}&categoryId={id}`
```json
{
  "data": [
    {
      "id": "string",
      "name": "string",
      "description": "string | null",
      "price": number,
      "stock": number,
      "imageUrl": "string | null",
      "isActive": boolean,
      "categoryId": "string",
      "category": {
        "id": "string",
        "name": "string"
      },
      "createdAt": "ISO 8601 date",
      "updatedAt": "ISO 8601 date"
    }
  ]
}
```

### 4. CORS

El backend debe permitir CORS desde `http://localhost:5173` (desarrollo) y tu dominio de producción.

## 🔐 Variables de Entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
# URL del backend API
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# Otras variables según necesidad
NEXT_PUBLIC_SITE_URL=http://localhost:5173
```

### Variables Disponibles

| Variable | Descripción | Requerida | Default |
|----------|-------------|-----------|---------|
| `NEXT_PUBLIC_API_URL` | URL base del API backend | No | `http://localhost:4000/api` |

## 🧩 Componentes Principales

### Header
Barra de navegación con:
- Logo con link a home
- Búsqueda con debounce (300ms)
- Carrito con contador de items
- Links de autenticación

### Hero
Banner principal con:
- Carousel automático (6 segundos)
- Imágenes de fondo con overlay
- CTAs principales
- Estadísticas (productos, tiempo entrega, calificación)

### Categories
Sección de categorías con:
- Scroll horizontal
- Iconos SVG profesionales
- Estado activo visual
- Controles de navegación

### ProductsGrid
Grid de productos con:
- Búsqueda y filtros
- Límite inicial de 10 destacados
- Botón "Ver catálogo completo"
- Estados de carga (skeleton) y vacío

### ProductCard
Tarjeta individual con:
- Información del producto
- Indicadores de stock
- Agregar al carrito
- Controles de cantidad

### CartDrawer
Drawer lateral con:
- Lista de items
- Controles de cantidad
- Cálculo de totales
- Indicador de envío gratis
- Botón de checkout

## 🎨 Estilo y Diseño

### Sistema de Colores

```css
/* Color principal */
--primary: #1c6554;        /* Verde elegante */

/* Colores secundarios */
--secondary: #0C447C;      /* Azul corporativo (solo en gradientes) */

/* Neutros */
--slate-50: #f8fafc;
--slate-100: #f1f5f9;
/* ... resto de la paleta slate */
--slate-900: #0f172a;
```

### Convenciones de Estilo

1. **Color primario único**: Todo usa `#1c6554` (no gradientes excepto decoraciones)
2. **Espaciado consistente**: Múltiplos de 4px (1 = 4px en Tailwind)
3. **Bordes**: Sin border-radius (estética moderna y limpia)
4. **Sombras**: Sutiles con `shadow-sm`, `shadow-md`, `shadow-lg`
5. **Transiciones**: `transition-all duration-300` para suavidad

### Animaciones Personalizadas

En `globals.css`:

```css
@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
```

## 📜 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo en puerto 5173 |
| `npm run build` | Construye la aplicación para producción |
| `npm run start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta ESLint para verificar código |

## 🏗️ Build y Deploy

### Build para Producción

```bash
npm run build
```

Genera carpeta `.next/` con la aplicación optimizada.

### Variables de Entorno en Producción

Asegúrate de configurar:

```env
NEXT_PUBLIC_API_URL=https://api.tusitioproduccion.com/api
NEXT_PUBLIC_SITE_URL=https://tusitioproduccion.com
```

### Deploy en Vercel (Recomendado)

1. Conectar repositorio en [Vercel](https://vercel.com)
2. Configurar variables de entorno
3. Deploy automático con cada push

### Deploy en Otro Hosting

1. Build: `npm run build`
2. Subir carpeta `.next/`, `public/`, `package.json`, `next.config.ts`
3. Instalar dependencias: `npm install --production`
4. Iniciar: `npm run start`

## 📱 PWA (Progressive Web App)

El proyecto incluye soporte básico para PWA:

- `public/manifest.json` - Manifiesto de la app
- `public/icons/` - Iconos para diferentes dispositivos
- Optimización para móviles

## 🔒 Seguridad

### Buenas Prácticas Implementadas

- ✅ TypeScript para type safety
- ✅ Validación de stock en frontend
- ✅ Sanitización de inputs de búsqueda
- ✅ HTTPS en producción (configurar en servidor)
- ✅ Variables de entorno para configuración sensible

### Pendiente para Producción

- [ ] Rate limiting en búsquedas
- [ ] Validación de formularios con librería (ej: Zod)
- [ ] Implementar CSP (Content Security Policy)
- [ ] Agregar autenticación JWT real

## 🧪 Testing

**Nota**: No se incluyeron tests en esta versión inicial. Para agregar:

```bash
# Instalar Jest y Testing Library
npm install -D jest @testing-library/react @testing-library/jest-dom

# Crear tests en __tests__/ o *.test.tsx
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Agregar nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

## 📄 Licencia

Proyecto privado - New Era Supermercado © 2026

## 👥 Equipo

- **Frontend Developer**: [Tu Nombre]
- **Designer**: [Nombre]
- **Backend Team**: [Nombres]

## 📞 Soporte

Para preguntas o problemas:
- Email: soporte@newera.com
- Issues: [GitHub Issues](tu-repo/issues)

## 🗺️ Roadmap

### v0.2.0 (Próxima)
- [ ] Integración completa con backend
- [ ] Autenticación real con JWT
- [ ] Página de perfil de usuario
- [ ] Historial de pedidos
- [ ] Sistema de reviews/calificaciones

### v0.3.0 (Futuro)
- [ ] Chat en vivo con soporte
- [ ] Recomendaciones personalizadas
- [ ] Lista de deseos
- [ ] Notificaciones push
- [ ] Modo offline con service workers

---

**Hecho con ❤️ en Colombia** 🇨🇴
