# 📘 Guía de Integración - Nuevas Funcionalidades

Este documento explica cómo integrar las nuevas funcionalidades implementadas en el ecosistema New Era.

---

## 🔐 TAREA 1: Módulo de Recuperación de Contraseña por Email

### Backend - Cambios Implementados

#### 1. **Schema de Prisma Actualizado**
Se agregaron dos campos al modelo `User`:
```prisma
resetToken        String?   @unique
resetTokenExpiry  DateTime?
```

**Migración ejecutada:** `20260610212514_add_password_reset_fields`

#### 2. **Nuevas Rutas de API**

Las siguientes rutas están disponibles en el backend:

**POST `/api/auth/forgot-password`**
- Solicita la recuperación de contraseña
- Body: `{ "email": "usuario@email.com" }`
- Genera un token seguro y lo guarda en la base de datos
- Simula el envío de email (usa Ethereal en desarrollo)

**POST `/api/auth/reset-password`**
- Restablece la contraseña con el token válido
- Body: `{ "token": "token_de_64_caracteres", "password": "NuevaContraseña123" }`
- Valida el token y verifica que no haya expirado
- Encripta la nueva contraseña con bcrypt

#### 3. **Archivos Creados/Modificados**

**Backend:**
```
backend/
├── prisma/schema.prisma                    ✅ MODIFICADO (campos de resetToken)
├── src/
│   ├── services/auth.service.js            ✅ MODIFICADO (+requestPasswordReset, +resetPassword)
│   ├── controllers/auth.controller.js      ✅ MODIFICADO (+forgotPassword, +resetPassword)
│   ├── validators/auth.validator.js        ✅ MODIFICADO (+forgotPasswordSchema, +resetPasswordSchema)
│   ├── routes/auth.routes.js               ✅ MODIFICADO (nuevas rutas)
│   └── utils/
│       └── email.js                        ✅ NUEVO (configuración de Nodemailer)
```

#### 4. **Configuración de Email**

En `.env` del backend, se agregaron las siguientes variables:

```env
# EMAIL CONFIGURATION (Para producción, reemplazar con tu proveedor real)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-app-password
EMAIL_FROM=noreply@newera.com
```

**⚠️ IMPORTANTE para Producción:**
- En **desarrollo**, el sistema usa [Ethereal Email](https://ethereal.email/) (emails de prueba)
- En **producción**, configura un proveedor real (Gmail, SendGrid, AWS SES, etc.)
- Para Gmail, necesitas generar una [App Password](https://myaccount.google.com/apppasswords)

#### 5. **Dependencias Instaladas**
```bash
npm install nodemailer
```

---

### Frontend - Cambios Implementados

#### 1. **Nuevas Páginas Creadas**

**Forgot Password: `/forgot-password`**
```
frontend/frontend/app/(auth)/forgot-password/page.tsx
```
- Formulario para ingresar el email
- Validación en tiempo real
- Mensajes de éxito/error
- Diseño responsivo con gradientes

**Reset Password: `/reset-password?token=XXXX`**
```
frontend/frontend/app/(auth)/reset-password/page.tsx
```
- Captura el token desde la URL
- Formulario para nueva contraseña con confirmación
- Indicador de fortaleza de contraseña
- Validaciones de seguridad en tiempo real
- Redirige a `/login` después de 3 segundos si es exitoso

#### 2. **Características de la UI**
- ✅ Diseño moderno con gradientes y sombras
- ✅ Iconos SVG inline
- ✅ Animaciones suaves
- ✅ Estados de carga (loading spinners)
- ✅ Indicador de fortaleza de contraseña
- ✅ Mostrar/ocultar contraseña
- ✅ Responsive (mobile-first)
- ✅ Mensajes de éxito/error con iconos

---

### Integración en tu Proyecto

#### Paso 1: Ejecutar Migraciones
```bash
cd backend
npx prisma migrate deploy
npx prisma generate
```

#### Paso 2: Configurar Variables de Entorno
Actualiza `backend/.env` con tus credenciales de email (opcional para desarrollo).

#### Paso 3: Agregar Enlaces en tu UI de Login
En tu página de login, agrega un enlace a la recuperación:

```tsx
<Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-500">
  ¿Olvidaste tu contraseña?
</Link>
```

#### Paso 4: Probar el Flujo Completo
1. Ve a `/forgot-password`
2. Ingresa un email registrado
3. En desarrollo, busca en los logs del backend la URL de Ethereal
4. Abre el email de prueba y copia el enlace
5. Pega el enlace en el navegador
6. Ingresa la nueva contraseña
7. Inicia sesión con la nueva contraseña

---

## 🎨 TAREA 2: Refactorización del Header con Flexbox

### Cambios Implementados

El componente `Header.tsx` fue refactorizado con un diseño **Flexbox** estricto:

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]           [Barra de Búsqueda]         [Botones]     │
│  Izquierda        Centro Absoluto              Derecha       │
└─────────────────────────────────────────────────────────────┘
```

**Estructura:**
```tsx
<div className="relative flex items-center justify-between h-16 gap-4">
  {/* Extremo izquierdo */}
  <div className="flex-shrink-0">
    <Logo />
  </div>

  {/* Centro absoluto */}
  <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-md">
    <input type="search" ... />
  </div>

  {/* Extremo derecho */}
  <div className="flex items-center gap-3 flex-shrink-0">
    <ThemeToggle />
    {/* Botones de sesión/perfil */}
    {/* Carrito */}
  </div>
</div>
```

**Clases Clave de Tailwind:**
- `relative` + `flex` + `justify-between`: Contenedor principal
- `flex-shrink-0`: Evita que logo y botones se compriman
- `absolute left-1/2 -translate-x-1/2`: Centra la barra de búsqueda
- `max-w-md`: Limita el ancho de la barra de búsqueda

---

## 👤 TAREA 3: Lógica de Roles en el Botón de Perfil

### Comportamiento Implementado

#### ROL: ADMIN
- Al hacer clic en el botón de perfil → Redirige directamente a `/dashboard`
- **NO** muestra menú desplegable
- **NO** muestra el icono chevron (flecha)

#### ROL: CUSTOMER (o cualquier otro rol)
- Al hacer clic en el botón de perfil → Abre menú contextual
- Opciones del menú:
  - 🧑 **Mi Perfil** → `/my-profile`
  - 📦 **Mis Pedidos** → `/my-orders`
  - 📍 **Mis Órdenes** → `/my-addresses`
  - 🚪 **Cerrar Sesión** → Logout

### Código Implementado

```tsx
// Función que maneja el clic en el botón de perfil
const handleUserClick = () => {
  if (user?.role === 'ADMIN') {
    router.push('/dashboard');
  } else {
    setIsUserMenuOpen(!isUserMenuOpen);
  }
};

// Renderizado condicional del chevron
{user.role !== 'ADMIN' && (
  <ChevronIcon className={...} />
)}

// Renderizado condicional del menú
{isUserMenuOpen && user.role !== 'ADMIN' && (
  <div className="dropdown-menu">
    {/* Opciones del menú */}
  </div>
)}
```

### Tipos de Usuario en Prisma
```prisma
enum Role {
  CUSTOMER
  ADMIN
  DELIVERER
  CASHIER
}
```

---

## 🚀 Pasos para Levantar el Proyecto

### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```
El backend estará en: `http://localhost:4000`

### Frontend
```bash
cd frontend/frontend
npm install
npm run dev
```
El frontend estará en: `http://localhost:3000` o similar

---

## 🧪 Pruebas Recomendadas

### Recuperación de Contraseña
1. ✅ Solicitar recuperación con email existente
2. ✅ Solicitar recuperación con email no existente (debe ser seguro)
3. ✅ Intentar usar un token expirado
4. ✅ Intentar usar un token inválido
5. ✅ Restablecer contraseña exitosamente
6. ✅ Verificar que el token se limpie después de usarse

### Header y Roles
1. ✅ Ver header sin sesión iniciada
2. ✅ Iniciar sesión como CUSTOMER → Ver menú desplegable
3. ✅ Iniciar sesión como ADMIN → Clic debe ir a /dashboard
4. ✅ Verificar responsive en móvil
5. ✅ Verificar barra de búsqueda en centro absoluto

---

## 📝 Notas Adicionales

### Seguridad
- Los tokens de recuperación se hashean con SHA-256 antes de guardarse en la BD
- Los tokens expiran en 1 hora
- Las contraseñas se encriptan con bcrypt (12 rounds)
- Se valida la fortaleza de contraseña en backend y frontend

### Mantenimiento
- Los emails de prueba se pueden ver en: logs del backend o [Ethereal](https://ethereal.email/)
- Para producción, cambia `NODE_ENV=production` y configura un proveedor real de email
- Los tokens expirados se pueden limpiar con un cron job (opcional)

### Próximas Mejoras Sugeridas
- [ ] Rate limiting para evitar spam en forgot-password
- [ ] Logs de intentos de recuperación
- [ ] Notificación por SMS como alternativa al email
- [ ] Auditoría de cambios de contraseña
- [ ] Dashboard admin con estadísticas de usuarios

---

## ❓ Preguntas Frecuentes

**P: ¿Por qué los emails no llegan en desarrollo?**
R: En desarrollo, usamos Ethereal (emails de prueba). Busca en los logs del backend la URL de previsualización.

**P: ¿Cómo configuro Gmail para producción?**
R: Genera una [App Password](https://myaccount.google.com/apppasswords) y úsala en `EMAIL_PASSWORD`.

**P: ¿Puedo cambiar el tiempo de expiración del token?**
R: Sí, modifica `RESET_TOKEN_EXPIRY_HOURS` en `auth.service.js`.

**P: ¿Cómo agrego más roles?**
R: Edita el enum `Role` en `schema.prisma` y ejecuta una migración.

---

¡Listo! 🎉 Todas las funcionalidades están implementadas y documentadas.
