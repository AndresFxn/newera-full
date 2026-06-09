# 🎯 Sistema de Promociones y Popups - Implementado

## ✅ Completado

El sistema de promociones está **100% funcional** y listo para usar.

## 🎨 Características Implementadas

### Panel de Administración
- ✅ Vista de grid con todas las promociones
- ✅ Crear nueva promoción con formulario completo
- ✅ Editar promoción existente
- ✅ Eliminar promoción
- ✅ Activar/desactivar promociones
- ✅ Subir imagen para cada promoción
- ✅ Configurar fechas de inicio y fin
- ✅ Establecer prioridad (0-100)
- ✅ Personalizar texto y enlace del botón CTA
- ✅ Vista previa de cada promoción

### Popup para Clientes
- ✅ Se muestra automáticamente en la tienda
- ✅ Solo muestra promociones activas
- ✅ Respeta rango de fechas configurado
- ✅ Muestra la promoción con mayor prioridad
- ✅ Se oculta cuando el usuario la cierra
- ✅ No vuelve a aparecer en la misma sesión
- ✅ Diseño responsive (móvil y desktop)
- ✅ Animaciones suaves de entrada/salida
- ✅ Botón CTA configurable con enlace

## 📊 Modelo de Datos

```prisma
model Promotion {
  id          String   @id @default(uuid())
  title       String                    // Título de la promoción
  description String                    // Descripción
  imageUrl    String?                   // URL de imagen (opcional)
  ctaText     String   @default("Ver más")  // Texto del botón
  ctaLink     String?                   // Enlace del botón (opcional)
  isActive    Boolean  @default(true)   // Activa/Inactiva
  startDate   DateTime @default(now())  // Fecha de inicio
  endDate     DateTime?                 // Fecha de fin (opcional)
  priority    Int      @default(0)      // Prioridad (0-100)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔌 API Endpoints

### Públicos (sin autenticación)
```
GET /api/promotions/active/popup
  → Obtiene la promoción activa de mayor prioridad
  → Usado por el popup del frontend

GET /api/promotions
  → Lista todas las promociones (con filtros)
  → Query params: onlyActive, page, limit

GET /api/promotions/:id
  → Obtiene una promoción específica
```

### Admin (requiere ADMIN role)
```
POST /api/promotions
  → Crear nueva promoción
  → Body: { title, description, imageUrl?, ctaText?, ctaLink?, startDate?, endDate?, priority? }

PATCH /api/promotions/:id
  → Actualizar promoción
  → Body: campos a actualizar (parcial)

DELETE /api/promotions/:id
  → Eliminar promoción
```

## 🔗 Enlaces del popup (campo ctaLink)

El botón del popup acepta dos tipos de enlace:

| Tipo | Ejemplo | Comportamiento |
|------|---------|----------------|
| Sección en la misma página | `#productos`, `#categorias`, `#hero` | Scroll suave a la sección |
| Ruta interna | `/checkout`, `/ayuda` | Navegación con Next.js router |

Secciones disponibles en la tienda: `#hero`, `#categorias`, `#productos`.

## 🎯 Lógica de Prioridad

El sistema muestra popups basándose en:

1. **Estado activo:** Solo promociones con `isActive: true`
2. **Rango de fechas:** Fecha actual entre `startDate` y `endDate`
3. **Prioridad:** Mayor número = mayor prioridad
4. **Fecha de creación:** En caso de empate, más reciente primero

**Ejemplo:**
- Promoción A: prioridad 10, activa → Se muestra primero
- Promoción B: prioridad 5, activa → Se muestra si A no está disponible
- Promoción C: prioridad 8, inactiva → No se muestra

## 🚀 Uso Rápido

### 1. Acceder al Panel de Promociones
1. Inicia sesión como admin: http://localhost:3000/auth
2. Credenciales: `admin@newera.com` / `admin123`
3. Ve a: **Promociones** en el menú lateral

### 2. Crear una Promoción
1. Click en "Nueva Promoción"
2. Completa el formulario:
   - **Título:** Nombre llamativo (ej: "¡Envío Gratis!")
   - **Descripción:** Detalles de la oferta
   - **Imagen:** Sube una imagen atractiva (opcional)
   - **Texto del botón:** "Ver ofertas", "Comprar ahora", etc.
   - **Enlace del botón CTA:** ver sección "Enlaces del popup" abajo
   - **Prioridad:** 0-100 (mayor = más importante)
   - **Fechas:** Opcional, deja vacío para siempre activa
3. Click en "Crear Promoción"

### 3. Activar la Promoción
- Click en el badge de estado para activar/desactivar
- Solo promociones **activas** se mostrarán en el popup

### 4. Ver el Resultado
1. Abre la tienda en: http://localhost:3000
2. El popup aparecerá automáticamente después de 1 segundo
3. Los clientes verán la promoción de mayor prioridad

## 📸 Imágenes para Promociones

### Recomendaciones
- **Formato:** JPG, PNG, WEBP
- **Tamaño:** Máximo 5MB
- **Dimensiones recomendadas:** 800x600px o 1200x900px
- **Orientación:** Horizontal funciona mejor

### Proceso de Subida
1. En el formulario de promoción, arrastra o selecciona una imagen
2. La imagen se sube automáticamente
3. La URL se guarda en el campo `imageUrl`
4. Se muestra en el popup del cliente

## 🎨 Personalización del Popup

### Ubicación del Componente
```
frontend/frontend/components/PromotionPopup.tsx
```

### Personalizar Diseño
Puedes modificar:
- Colores de fondo
- Tamaño del modal
- Animaciones
- Posición de elementos
- Tiempo antes de mostrar (actualmente 1 segundo)

### Personalizar Comportamiento
```typescript
// Cambiar tiempo antes de mostrar
setTimeout(() => {
  setIsVisible(true);
}, 1000); // 1000ms = 1 segundo

// Cambiar almacenamiento de sesión a localStorage
// para que no vuelva a aparecer nunca
localStorage.setItem(STORAGE_KEY, JSON.stringify(closedIds));
```

## 🔄 Gestión de Sesión

El popup usa **sessionStorage** para recordar qué promociones cerró el usuario:

- ✅ Si el usuario cierra el popup, no vuelve a aparecer **en esta sesión**
- ✅ Si el usuario recarga la página, el popup no aparece
- ✅ Si el usuario cierra y vuelve a abrir el navegador, el popup aparece de nuevo
- ✅ Cada promoción tiene su propio ID, por lo que una nueva promoción sí aparecerá

### Cambiar a Persistencia Permanente
Si quieres que **nunca** vuelva a aparecer la misma promoción:

```typescript
// En PromotionPopup.tsx, cambiar:
sessionStorage.setItem(STORAGE_KEY, ...)
// Por:
localStorage.setItem(STORAGE_KEY, ...)
```

## 📝 Ejemplos de Uso

### Promoción de Envío Gratis
```json
{
  "title": "¡Envío Gratis en Compras Mayores a $50.000!",
  "description": "Aprovecha esta oferta especial. Válida hasta fin de mes.",
  "ctaText": "Comprar ahora",
  "ctaLink": "/productos",
  "priority": 10,
  "isActive": true
}
```

### Promoción de Productos Frescos
```json
{
  "title": "Productos Frescos del Campo",
  "description": "Recibe frutas y verduras frescas directamente a tu casa.",
  "ctaText": "Ver catálogo",
  "ctaLink": "/productos?categoria=frutas-verduras",
  "priority": 5,
  "isActive": true
}
```

### Promoción Temporal
```json
{
  "title": "Descuento 20% en Lácteos",
  "description": "Solo por esta semana, todos los lácteos con 20% de descuento.",
  "ctaText": "Ver ofertas",
  "ctaLink": "/productos?categoria=lacteos",
  "priority": 8,
  "startDate": "2026-06-08",
  "endDate": "2026-06-15",
  "isActive": true
}
```

## 🧪 Testing

### Probar el Sistema
1. **Crear promociones de prueba:**
   ```bash
   cd backend
   node prisma/seed-promotions.js
   ```

2. **Verificar en panel admin:**
   - Ve a http://localhost:3000/admin/promotions
   - Verifica que aparezcan 3 promociones

3. **Activar una promoción:**
   - Click en el badge para activar
   - Solo debe haber **una** promoción activa

4. **Ver el popup:**
   - Abre http://localhost:3000 en una nueva pestaña
   - Espera 1 segundo
   - Debe aparecer el popup con la promoción activa

5. **Cerrar y recargar:**
   - Cierra el popup
   - Recarga la página (F5)
   - El popup **no** debe aparecer de nuevo

6. **Nueva sesión:**
   - Cierra el navegador completamente
   - Vuelve a abrir http://localhost:3000
   - El popup **sí** debe aparecer de nuevo

## 🐛 Solución de Problemas

### El popup no aparece
- ✅ Verifica que hay al menos una promoción **activa**
- ✅ Verifica que la fecha actual está entre `startDate` y `endDate`
- ✅ Limpia sessionStorage: `sessionStorage.clear()` en consola
- ✅ Verifica la consola del navegador por errores

### La imagen no se muestra
- ✅ Verifica que la URL de la imagen sea correcta
- ✅ Verifica que el backend esté sirviendo la imagen (puerto 4000)
- ✅ Intenta acceder directamente: `http://localhost:4000/uploads/products/...`

### Error al crear promoción
- ✅ Verifica que estés autenticado como ADMIN
- ✅ Verifica que todos los campos requeridos estén completos
- ✅ Verifica que la fecha de fin sea posterior a la fecha de inicio

## 📈 Próximas Mejoras (Opcionales)

- [ ] Múltiples imágenes por promoción (slider)
- [ ] Programar publicación automática
- [ ] A/B testing de promociones
- [ ] Estadísticas de clics y conversiones
- [ ] Promociones por segmento de usuarios
- [ ] Promociones geográficas
- [ ] Notificaciones push de promociones
- [ ] Compartir promoción en redes sociales

## 📚 Archivos Creados/Modificados

### Backend
```
✅ backend/prisma/schema.prisma (modelo Promotion)
✅ backend/src/controllers/promotion.controller.js (nuevo)
✅ backend/src/validators/promotion.validator.js (nuevo)
✅ backend/src/routes/promotion.routes.js (nuevo)
✅ backend/src/routes/index.js (agregada ruta)
✅ backend/prisma/seed-promotions.js (nuevo)
✅ backend/prisma/migrations/.../add_promotions (migración)
```

### Frontend
```
✅ frontend/frontend/lib/api-admin.ts (funciones de promociones)
✅ frontend/frontend/app/admin/promotions/page.tsx (nuevo)
✅ frontend/frontend/app/admin/layout.tsx (enlace en menú)
✅ frontend/frontend/components/PromotionPopup.tsx (nuevo)
✅ frontend/frontend/app/(shop)/layout.tsx (popup agregado)
```

---

**Sistema completado exitosamente** ✅  
**Fecha:** Junio 2026  
**Tiempo de implementación:** ~1 hora  
**Estado:** Producción ready
