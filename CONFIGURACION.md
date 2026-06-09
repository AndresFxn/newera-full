# ⚙️ Configuración del Sistema - New Era Supermercado

Este documento detalla todas las configuraciones importantes del sistema.

## 🔧 Puertos Configurados

| Servicio | Puerto | URL |
|----------|--------|-----|
| **Backend API** | 4000 | http://localhost:4000 |
| **Frontend** | 3000 | http://localhost:3000 |
| **PostgreSQL** | 5432 | localhost:5432 |

**⚠️ IMPORTANTE:** No cambiar estos puertos sin actualizar todas las configuraciones relacionadas.

## 📁 Estructura de Archivos de Configuración

```
New-Era/
├── backend/
│   ├── .env                    # Variables de entorno del backend
│   ├── prisma/schema.prisma    # Esquema de base de datos
│   └── src/config/
│       ├── database.js         # Configuración de Prisma
│       └── upload.js           # Configuración de subida de imágenes
│
└── frontend/frontend/
    ├── .env.local              # Variables de entorno del frontend
    ├── next.config.ts          # Configuración de Next.js
    └── tailwind.config.ts      # Configuración de Tailwind CSS
```

## 🗄️ Configuración de Base de Datos

### Cadena de Conexión (DATABASE_URL)

```env
postgresql://[USUARIO]:[CONTRASEÑA]@[HOST]:[PUERTO]/[BASE_DE_DATOS]
```

**Ejemplo local:**
```env
DATABASE_URL="postgresql://postgres:micontraseña@localhost:5432/newera_db"
```

**Ejemplo producción:**
```env
DATABASE_URL="postgresql://user:pass@db.ejemplo.com:5432/newera_prod"
```

### Modelos de Datos

El sistema usa los siguientes modelos principales:

- **User** - Usuarios (clientes, admin, repartidores, cajeros)
- **Product** - Productos del catálogo
- **Category** - Categorías de productos
- **Order** - Pedidos
- **OrderItem** - Ítems de pedidos
- **Address** - Direcciones de entrega

Ver `backend/prisma/schema.prisma` para el esquema completo.

## 🔐 Configuración de Seguridad

### JWT (JSON Web Tokens)

```env
# Generar nuevo secret:
# node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET="tu_secret_muy_largo_y_aleatorio_aqui"
JWT_EXPIRES_IN="8h"
```

**Recomendaciones:**
- ✅ Usar secrets de al menos 64 caracteres
- ✅ Cambiar el secret en producción
- ✅ No compartir el secret en repositorios públicos
- ✅ Configurar expiración apropiada (8h desarrollo, 1h producción)

### CORS (Cross-Origin Resource Sharing)

El backend está configurado para aceptar peticiones desde:
- `http://localhost:3000` (Frontend local)
- URL configurada en `FRONTEND_URL`

Para agregar más orígenes, edita `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://tudominio.com',
    // Agregar más URLs aquí
  ],
  credentials: true,
}));
```

### Rate Limiting

Por defecto:
- **100 peticiones** por **15 minutos** por IP
- Aplicado a todas las rutas `/api/*`

Para ajustar, edita `backend/server.js`:

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,                  // 100 peticiones
});
```

## 📸 Configuración de Imágenes

### Almacenamiento

- **Directorio:** `backend/uploads/products/`
- **Acceso público:** `http://localhost:4000/uploads/products/[filename]`

### Límites de Subida

```javascript
// backend/src/config/upload.js
const limits = {
  fileSize: 5 * 1024 * 1024,  // 5MB máximo
};

const allowedTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp'
];
```

### Formato de Nombres

Las imágenes se guardan con el formato:
```
product-[timestamp]-[random].jpg
```

Ejemplo: `product-1780877050806-478074711.jpg`

## 🎨 Configuración de Frontend

### Variables de Entorno

```env
# URL del backend API
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Configuración de Next.js

El frontend usa:
- **App Router** (Next.js 16)
- **Turbopack** (compilador rápido)
- **React 19**
- **TypeScript**

### Tailwind CSS

Colores corporativos configurados:

```javascript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: '#1c6554',   // Verde New Era
      secondary: '#0C447C', // Azul New Era
    }
  }
}
```

## 🔄 Cache y Revalidación

### Backend
- Sin cache por defecto
- Headers de cache pueden configurarse por endpoint

### Frontend (Next.js)
```typescript
// Revalidar cada 30 segundos
fetch(url, { next: { revalidate: 30 } })

// No cachear
fetch(url, { cache: 'no-store' })
```

## 📊 Límites y Validaciones

### Órdenes
- **Mínimo:** 1 producto por orden
- **Máximo:** 50 productos distintos por orden
- **Cantidad por producto:** 1-99 unidades
- **Distancia máxima de entrega:** 15 km

### Productos
- **Nombre:** Requerido, máximo 200 caracteres
- **Precio:** Requerido, mínimo $1
- **Stock:** Requerido, mínimo 0
- **Descripción:** Opcional, máximo 1000 caracteres

### Usuarios
- **Nombre:** Requerido, 2-100 caracteres
- **Email:** Requerido, formato válido, único
- **Contraseña:** Requerido, mínimo 6 caracteres
- **Teléfono:** Requerido, 10 dígitos

## 🌍 Configuración de Producción

### Variables de Entorno Recomendadas

**Backend:**
```env
NODE_ENV=production
PORT=4000
DATABASE_URL="postgresql://[PRODUCCION]"
JWT_SECRET="[NUEVO_SECRET_SEGURO]"
JWT_EXPIRES_IN="1h"
FRONTEND_URL="https://tudominio.com"
```

**Frontend:**
```env
NEXT_PUBLIC_API_URL=https://api.tudominio.com/api
```

### Checklist de Producción

- [ ] Cambiar `JWT_SECRET` a un valor nuevo y seguro
- [ ] Configurar `NODE_ENV=production`
- [ ] Actualizar `DATABASE_URL` con credenciales de producción
- [ ] Configurar HTTPS/SSL
- [ ] Configurar CORS con dominio de producción
- [ ] Configurar backup automático de base de datos
- [ ] Configurar logs y monitoreo
- [ ] Configurar CDN para imágenes (opcional)
- [ ] Habilitar compresión gzip
- [ ] Configurar certificado SSL

## 📝 Logs

### Backend
Los logs se muestran en consola con:
- **Peticiones HTTP** (morgan)
- **Queries de Prisma** (opcional con `DEBUG=prisma:query`)
- **Errores** del servidor

### Frontend
- Logs de desarrollo en consola del navegador
- Errores de compilación en terminal

## 🔧 Comandos de Mantenimiento

```bash
# Reiniciar base de datos (CUIDADO: borra todo)
npx prisma migrate reset

# Ver base de datos en navegador
npx prisma studio

# Generar cliente Prisma después de cambios
npx prisma generate

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy
```

---

**Última actualización:** Junio 2026
