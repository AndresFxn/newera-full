# 🛒 New Era Supermercado - Plataforma E-Commerce

<div align="center">

![New Era Supermercado](https://img.shields.io/badge/New%20Era-Supermercado-1c6554?style=for-the-badge)
![Version](https://img.shields.io/badge/version-2.1.0-0C447C?style=for-the-badge)
![Status](https://img.shields.io/badge/status-Active-success?style=for-the-badge)


**Plataforma moderna de comercio electrónico para supermercado con entregas rápidas**

[Características](#-características) • [Instalación](#-instalación) • [Uso](#-uso) • [Documentación](#-documentación)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos](#-requisitos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Roles y Permisos](#-roles-y-permisos)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Documentación](#-documentación)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

---

## 📖 Descripción

**New Era Supermercado** es una plataforma completa de comercio electrónico diseñada específicamente para supermercados que ofrecen entregas a domicilio. El sistema incluye gestión de inventario, procesamiento de pedidos, seguimiento de entregas y múltiples roles de usuario.

### 🎯 Objetivo
Proporcionar una experiencia de compra en línea fluida y moderna, con entregas rápidas (menos de 30 minutos) y gestión eficiente para el personal del supermercado.

---

## ✨ Características

### 🛍️ Para Clientes
- ✅ **Catálogo de Productos** - Navegación intuitiva con categorías y filtros
- ✅ **Carrito de Compras** - Gestión en tiempo real con localStorage
- ✅ **Gestión de Direcciones** - CRUD completo de direcciones de entrega
- ✅ **Historial de Pedidos** - Seguimiento completo de todos los pedidos
- ✅ **Perfil de Usuario** - Editar información personal y cambiar contraseña
- ✅ **Promociones y Ofertas** - Sistema de descuentos y promociones
- ✅ **Búsqueda Avanzada** - Filtros por categoría, precio y disponibilidad
- ✅ **Responsive Design** - Optimizado para móvil, tablet y desktop
- ✅ **Pasarela Wompi** - Pagos seguros con tarjeta y Nequi integrados
- ✅ **Pago Posterior** - Pagar pedidos pendientes desde el historial


### 👨‍💼 Para Administradores
- ✅ **Dashboard Completo** - Estadísticas y métricas en tiempo real
- ✅ **Gestión de Productos** - CRUD completo con imágenes
- ✅ **Gestión de Categorías** - Organización del catálogo
- ✅ **Gestión de Pedidos** - Actualización de estados y seguimiento
- ✅ **Gestión de Usuarios** - Control de roles y permisos
- ✅ **Gestión de Promociones** - Crear y administrar ofertas
- ✅ **Alertas en Tiempo Real** - Notificaciones sonoras de nuevos pedidos
- ✅ **Reportes** - Análisis de ventas y performance


### 💰 Para Cajeros
- ✅ **Dashboard de Caja** - Vista simplificada de pedidos
- ✅ **Gestión de Pedidos** - Confirmar y procesar pagos
- ✅ **Consulta de Productos** - Verificar disponibilidad y precios

### 🚚 Para Repartidores
- ✅ **Dashboard de Entregas** - Pedidos asignados en tiempo real
- ✅ **Historial de Entregas** - Registro completo de entregas realizadas
- ✅ **Estado de Pedidos** - Actualización de estado de entrega

### 🌓 Características Generales
- ✅ **Modo Claro/Oscuro** - Switch completo en toda la aplicación
- ✅ **Autenticación JWT** - Sistema seguro de login y registro
- ✅ **Validaciones** - Frontend y backend completas
- ✅ **Manejo de Errores** - Feedback claro al usuario
- ✅ **Optimización de Performance** - Carga rápida y eficiente
- ✅ **Accesibilidad** - WCAG AA compliant
- ✅ **Responsive Design** - Optimizado para móvil, tablet y desktop
- ✅ **PWA Ready** - Instalable como app nativa

---

## 🚀 Tecnologías

### Frontend
- **Framework:** Next.js 15.1.4 (React 19)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS 4.0
- **Estado:** React Hooks + Context API
- **Cliente HTTP:** Fetch API nativo
- **Almacenamiento:** localStorage

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Base de Datos:** PostgreSQL
- **ORM:** Prisma
- **Autenticación:** JWT (jsonwebtoken)
- **Encriptación:** bcryptjs
- **Validación:** express-validator
- **Upload:** Multer

---

## 📋 Requisitos

### Software Necesario
- **Node.js** v18 o superior
- **PostgreSQL** v14 o superior
- **npm** o **yarn**
- **Git**

### Recomendado
- **Visual Studio Code** con extensiones:
  - ESLint
  - Prettier
  - Prisma
  - Tailwind CSS IntelliSense

---

## 🔧 Instalación

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/new-era-supermercado.git
cd new-era-supermercado
```

### 2. Instalar Dependencias del Backend
```bash
cd backend
npm install
```

### 3. Instalar Dependencias del Frontend
```bash
cd ../frontend/frontend
npm install
```

### 4. Configurar Base de Datos
```bash
cd ../../backend

# Crear base de datos PostgreSQL
createdb newera

# Configurar archivo .env (ver sección de Configuración)

# Ejecutar migraciones
npx prisma migrate dev

# Sembrar datos de prueba (opcional)
node prisma/seed.js
```

---

## ⚙️ Configuración

### Backend (.env)
Crear archivo `.env` en la carpeta `backend`:

```env
# Base de Datos
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/newera"

# JWT
JWT_SECRET="tu_secreto_jwt_super_seguro_aqui"
JWT_EXPIRES_IN="7d"

# Servidor
PORT=3001
NODE_ENV=development

# Uploads
UPLOAD_PATH="./uploads"
```

### Frontend (.env)
Crear archivo `.env` en la carpeta `frontend/frontend`:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Opcionales
NEXT_PUBLIC_APP_NAME="New Era Supermercado"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🎮 Uso

### Iniciar el Backend
```bash
cd backend
npm start
```
El servidor estará disponible en: `http://localhost:3001`

### Iniciar el Frontend
```bash
cd frontend/frontend
npm run dev
```
La aplicación estará disponible en: `http://localhost:3000`

### Usuarios de Prueba

**Administrador:**
- Email: `admin@newera.com`
- Password: `Admin123`

**Cliente:**
- Email: `cliente@ejemplo.com`
- Password: `Cliente123`

**Cajero:**
- Email: `cajero@newera.com`
- Password: `Cajero123`

**Repartidor:**
- Email: `repartidor@newera.com`
- Password: `Repartidor123`

---

## 📁 Estructura del Proyecto

```
new-era-supermercado/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Esquema de base de datos
│   │   ├── seed.js                # Datos de prueba
│   │   └── migrations/            # Migraciones
│   ├── src/
│   │   ├── config/                # Configuraciones
│   │   ├── controllers/           # Controladores
│   │   ├── middlewares/           # Middlewares
│   │   ├── routes/                # Rutas de API
│   │   ├── services/              # Lógica de negocio
│   │   └── validators/            # Validaciones
│   ├── uploads/                   # Archivos subidos
│   ├── server.js                  # Punto de entrada
│   └── package.json
│
├── frontend/
│   └── frontend/
│       ├── app/                   # Páginas de Next.js
│       │   ├── (shop)/           # Rutas de tienda
│       │   ├── admin/            # Dashboard admin
│       │   ├── cashier/          # Dashboard cajero
│       │   ├── deliverer/        # Dashboard repartidor
│       │   ├── my-orders/        # Pedidos del cliente
│       │   ├── my-addresses/     # Direcciones del cliente
│       │   └── my-profile/       # Perfil del cliente
│       ├── components/           # Componentes reutilizables
│       │   ├── auth/            # Componentes de autenticación
│       │   ├── admin/           # Componentes de admin
│       │   └── ...
│       ├── lib/                 # Utilidades y helpers
│       │   ├── api-admin.ts    # Cliente API admin
│       │   ├── api-customer.ts # Cliente API cliente
│       │   └── ...
│       ├── hooks/              # React Hooks personalizados
│       ├── types/              # Definiciones TypeScript
│       ├── public/             # Archivos estáticos
│       └── package.json
│
├── docs/                       # Documentación adicional
├── CHANGELOG.md               # Registro de cambios
├── CONFIGURACION.md           # Guía de configuración
└── README.md                  # Este archivo
```

---

## 🔌 API Endpoints

### Autenticación
```
POST   /api/auth/register       # Registrar nuevo usuario
POST   /api/auth/login          # Iniciar sesión
PUT    /api/auth/profile        # Actualizar perfil
PUT    /api/auth/change-password # Cambiar contraseña
```

### Productos
```
GET    /api/products            # Listar productos
GET    /api/products/:id        # Ver producto
POST   /api/products            # Crear producto (Admin)
PUT    /api/products/:id        # Actualizar producto (Admin)
DELETE /api/products/:id        # Eliminar producto (Admin)
```

### Categorías
```
GET    /api/categories          # Listar categorías
POST   /api/categories          # Crear categoría (Admin)
PUT    /api/categories/:id      # Actualizar categoría (Admin)
DELETE /api/categories/:id      # Eliminar categoría (Admin)
```

### Pedidos
```
GET    /api/orders              # Listar pedidos (Admin)
GET    /api/orders/my-orders    # Mis pedidos (Cliente)
GET    /api/orders/:id          # Ver pedido
POST   /api/orders              # Crear pedido
PUT    /api/orders/:id          # Actualizar pedido (Admin)
```

### Direcciones
```
GET    /api/addresses           # Mis direcciones
POST   /api/addresses           # Crear dirección
PUT    /api/addresses/:id       # Actualizar dirección
PUT    /api/addresses/:id/default # Establecer por defecto
DELETE /api/addresses/:id       # Eliminar dirección
```

### Promociones
```
GET    /api/promotions          # Listar promociones
POST   /api/promotions          # Crear promoción (Admin)
PUT    /api/promotions/:id      # Actualizar promoción (Admin)
DELETE /api/promotions/:id      # Eliminar promoción (Admin)
```

### Uploads
```
POST   /api/upload              # Subir imagen
```

---

## 👥 Roles y Permisos

| Funcionalidad | Cliente | Cajero | Repartidor | Admin |
|--------------|---------|--------|------------|-------|
| Ver productos | ✅ | ✅ | ❌ | ✅ |
| Crear pedido | ✅ | ❌ | ❌ | ✅ |
| Ver mis pedidos | ✅ | ❌ | ❌ | ❌ |
| Gestionar direcciones | ✅ | ❌ | ❌ | ❌ |
| Procesar pagos | ❌ | ✅ | ❌ | ✅ |
| Ver pedidos asignados | ❌ | ❌ | ✅ | ✅ |
| Actualizar entrega | ❌ | ❌ | ✅ | ✅ |
| Gestionar productos | ❌ | ❌ | ❌ | ✅ |
| Gestionar usuarios | ❌ | ❌ | ❌ | ✅ |
| Ver reportes | ❌ | ❌ | ❌ | ✅ |

---

## 📸 Capturas de Pantalla

> ⚠️ Las capturas de pantalla se añadirán próximamente

---

## 📚 Documentación

### Documentación Adicional
- [CHANGELOG.md](./CHANGELOG.md) - Registro completo de cambios
- [CONFIGURACION.md](./CONFIGURACION.md) - Guía detallada de configuración
- [docs/architecture/](./docs/architecture/) - Arquitectura del sistema

### Guías
1. **Configuración Inicial** - Ver [CONFIGURACION.md](./CONFIGURACION.md)
2. **Agregar Nuevo Rol** - Ver documentación de Prisma
3. **Crear Nuevo Endpoint** - Seguir patrón MVC del proyecto
4. **Personalizar Tema** - Editar `globals.css` y Tailwind config

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convenciones
- Usar TypeScript en frontend
- Seguir ESLint rules del proyecto
- Escribir comentarios descriptivos
- Mantener estructura de carpetas existente

---

## 🐛 Reportar Bugs

Si encuentras un bug, por favor abre un issue con:
- Descripción del bug
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots (si aplica)
- Versión del navegador/OS

---

## 📞 Soporte

- **Email:** soporte@newerasupermercado.com
- **Teléfono:** +57 300 123 4567
- **Horario:** Lunes a Viernes, 8am - 6pm COT

---

## 🔐 Seguridad

Si descubres una vulnerabilidad de seguridad, por favor envía un email a:
**security@newerasupermercado.com**

**NO** abras un issue público para vulnerabilidades de seguridad.

---

## 📄 Licencia

Este proyecto es propietario y pertenece a **New Era Supermercado**.

© 2026 New Era Supermercado. Todos los derechos reservados.

---

## 🙏 Agradecimientos

- Next.js Team - Por el increíble framework
- Tailwind Labs - Por Tailwind CSS
- Prisma Team - Por el mejor ORM
- Vercel - Por el hosting

---

## � Notas de Versión

### Versión 2.0.1 (Junio 2026) - Hotfix
- 🐛 Corregido responsive en login/register para móviles
- ✅ Logo oculto en móvil para evitar bloqueo
- ✅ Botón "Volver" optimizado para pantallas pequeñas
- ✅ Formularios con scroll vertical completo
- ✅ Bloque diagonal verde oculto en móvil
- ✅ Cards centradas con ancho máximo apropiado
- ✅ Mejoras en legibilidad con backgrounds más opacos

### Versión 2.0 (Junio 2026) - Major Release
- ✨ Sistema completo de modo claro/oscuro
- ✨ Rediseño visual de login y register
- ✨ Funcionalidades completas para clientes
- ✨ Validación robusta de contraseñas
- ✨ Documentación completa del proyecto

---

## �🗺️ Roadmap

### Versión 2.1 (Completado)
- [x] Integración con pasarelas de pago (Wompi)
- [x] Notificaciones de pedidos en tiempo real (Polling + Sound)

### Versión 2.2 (Q4 2026)
- [ ] Seguimiento GPS de repartidores

- [ ] Chat de soporte en vivo
- [ ] Reseñas y valoraciones de productos
- [ ] Sistema de recomendaciones con IA

### Versión 3.0 (2027)
- [ ] Multi-tienda
- [ ] Marketplace de vendedores
- [ ] Suscripciones mensuales
- [ ] Integración con Alexa/Google Home

---

<div align="center">

**⭐ Si este proyecto te ha sido útil, por favor dale una estrella ⭐**

Hecho con ❤️ por el equipo de New Era Supermercado

</div>
