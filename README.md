# 🛒 New Era Supermercado - Sistema de E-commerce

Sistema completo de comercio electrónico para supermercado con gestión de inventario, pedidos y entregas en tiempo real.

## 📋 Características Principales

### 👥 Para Clientes
- ✅ Registro e inicio de sesión seguro
- 🛍️ Catálogo de productos con búsqueda y filtros
- 🛒 Carrito de compras persistente
- 📍 Gestión de direcciones de entrega
- 📦 Seguimiento de pedidos en tiempo real
- 💳 Sistema de pago integrado

### 👨‍💼 Para Administradores
- 📊 Dashboard con estadísticas y métricas
- 📦 Gestión completa de productos (CRUD)
- 🗂️ Gestión de categorías
- 📝 Administración de órdenes
- 👥 Gestión de usuarios
- 📸 Sistema de carga de imágenes

### 🚚 Para Repartidores
- 📋 Lista de pedidos asignados
- 🗺️ Información de entrega
- ✅ Actualización de estado de entregas

## 🏗️ Arquitectura del Sistema

```
New-Era/
├── backend/           # API REST con Node.js + Express
│   ├── prisma/       # ORM y modelos de base de datos
│   ├── src/
│   │   ├── config/   # Configuraciones (DB, upload)
│   │   ├── controllers/  # Lógica de negocio
│   │   ├── middlewares/  # Auth, validación, errores
│   │   ├── routes/   # Endpoints de la API
│   │   ├── services/ # Servicios de negocio
│   │   └── validators/  # Validación de datos con Joi
│   └── uploads/      # Almacenamiento de imágenes
│
└── frontend/         # Aplicación web con Next.js 16
    ├── app/          # App Router de Next.js
    │   ├── (shop)/   # Tienda pública
    │   ├── admin/    # Panel administrativo
    │   └── auth/     # Autenticación
    ├── components/   # Componentes React reutilizables
    └── lib/          # Utilidades y API client
```

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** 18+ 
- **PostgreSQL** 14+
- **npm** o **yarn**

### 1. Configuración de la Base de Datos

```bash
# Crear base de datos en PostgreSQL
createdb newera_db

# O desde psql:
# CREATE DATABASE newera_db;
```

### 2. Configuración del Backend

```bash
# Navegar al directorio del backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
# Edita el archivo .env con tus credenciales
```

**Archivo `backend/.env`:**
```env
PORT=4000
NODE_ENV=development
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/newera_db"
JWT_SECRET="tu_secret_aleatorio_seguro"
JWT_EXPIRES_IN="8h"
FRONTEND_URL="http://localhost:3000"
```

```bash
# Ejecutar migraciones de Prisma
npx prisma migrate dev

# Poblar base de datos con datos iniciales
npm run seed

# Iniciar servidor backend
npm start
```

El backend estará corriendo en: **http://localhost:4000**

### 3. Configuración del Frontend

```bash
# Navegar al directorio del frontend
cd frontend/frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
# Edita el archivo .env.local
```

**Archivo `frontend/frontend/.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

```bash
# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará corriendo en: **http://localhost:3000**

## 👤 Usuarios de Prueba

### Administrador
- **Email:** `admin@newera.com`
- **Contraseña:** `admin123`
- **Acceso:** Panel admin completo

### Cliente
- **Email:** `cliente@test.com`
- **Contraseña:** `cliente123`
- **Acceso:** Tienda y pedidos

### Repartidor
- **Email:** `repartidor@newera.com`
- **Contraseña:** `repartidor123`
- **Acceso:** Panel de entregas

## 🛠️ Stack Tecnológico

### Backend
- **Framework:** Express.js 4.21
- **ORM:** Prisma 6.2
- **Base de Datos:** PostgreSQL 14+
- **Autenticación:** JWT (jsonwebtoken)
- **Validación:** Joi
- **Seguridad:** Helmet, CORS, Rate Limiting
- **Upload:** Multer

### Frontend
- **Framework:** Next.js 16 (App Router + Turbopack)
- **UI:** React 19 + TypeScript
- **Estilos:** Tailwind CSS 4
- **State Management:** React Hooks
- **HTTP Client:** Fetch API nativo

## 📁 Estructura de la Base de Datos

### Tablas Principales
- **User** - Usuarios del sistema (clientes, admin, repartidores)
- **Product** - Productos del catálogo
- **Category** - Categorías de productos
- **Order** - Pedidos realizados
- **OrderItem** - Ítems de cada pedido
- **Address** - Direcciones de entrega de usuarios

### Relaciones
- Un usuario puede tener múltiples direcciones
- Un usuario puede tener múltiples órdenes
- Una orden pertenece a un usuario (cliente)
- Una orden puede tener un repartidor asignado
- Una orden contiene múltiples ítems (productos)

## 🔐 Seguridad

- ✅ Contraseñas encriptadas con bcrypt
- ✅ Autenticación con JWT
- ✅ Rate limiting en endpoints de API
- ✅ Validación de entrada con Joi
- ✅ Headers de seguridad con Helmet
- ✅ CORS configurado
- ✅ SQL injection prevention con Prisma

## 📸 Sistema de Imágenes

Las imágenes de productos se almacenan en:
- **Directorio:** `backend/uploads/products/`
- **Formatos permitidos:** JPG, PNG, GIF, WEBP
- **Tamaño máximo:** 5MB
- **Acceso público:** `http://localhost:4000/uploads/products/{filename}`

## 🧪 Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend/frontend
npm test
```

## 📝 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión

### Productos (Público)
- `GET /api/products` - Listar productos activos
- `GET /api/products/:id` - Obtener un producto
- `GET /api/categories` - Listar categorías

### Productos (Admin)
- `POST /api/products` - Crear producto
- `PATCH /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### Órdenes
- `GET /api/orders` - Listar órdenes (filtros opcionales)
- `GET /api/orders/:id` - Obtener orden específica
- `POST /api/orders` - Crear nueva orden
- `PATCH /api/orders/:id/status` - Actualizar estado

### Upload
- `POST /api/upload/product-image` - Subir imagen de producto

## 🐛 Solución de Problemas

### Backend no conecta con la DB
- Verifica que PostgreSQL esté corriendo
- Verifica las credenciales en `DATABASE_URL`
- Ejecuta `npx prisma migrate dev`

### Frontend no puede conectar con Backend
- Verifica que el backend esté corriendo en puerto 4000
- Verifica `NEXT_PUBLIC_API_URL` en `.env.local`
- Reinicia el servidor de desarrollo

### Las imágenes no se muestran
- Verifica que el backend esté sirviendo archivos estáticos
- Verifica que las URLs de imágenes apunten al puerto correcto (4000)
- Verifica permisos del directorio `uploads/`

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Contribución

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para problemas o preguntas, por favor abre un issue en GitHub.

---

**Desarrollado con ❤️ para New Era Supermercado**
