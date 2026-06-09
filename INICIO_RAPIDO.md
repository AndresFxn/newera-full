# ⚡ Guía de Inicio Rápido - New Era Supermercado

Esta guía te llevará de 0 a tener el sistema funcionando en **5 minutos**.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- ✅ Node.js 18 o superior
- ✅ PostgreSQL 14 o superior
- ✅ Git

## 🚀 Pasos de Instalación

### Paso 1: Crear Base de Datos

Abre tu terminal de PostgreSQL y ejecuta:

```sql
CREATE DATABASE newera_db;
```

O desde la línea de comandos:

```bash
createdb newera_db
```

### Paso 2: Configurar Backend

```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
# Edita backend/.env y actualiza DATABASE_URL con tus credenciales
```

**Contenido mínimo de `backend/.env`:**
```env
PORT=4000
DATABASE_URL="postgresql://postgres:TU_PASSWORD@localhost:5432/newera_db"
JWT_SECRET="clave_secreta_aleatoria_muy_segura"
```

```bash
# Ejecutar migraciones
npx prisma migrate dev

# Poblar base de datos con datos de ejemplo
npm run seed

# Iniciar backend
npm start
```

✅ **Backend corriendo en:** http://localhost:4000

### Paso 3: Configurar Frontend

Abre una **nueva terminal**:

```bash
# Navegar al directorio frontend
cd frontend/frontend

# Instalar dependencias
npm install

# Iniciar frontend
npm run dev
```

✅ **Frontend corriendo en:** http://localhost:3000

## 🎉 ¡Listo!

Abre tu navegador en **http://localhost:3000**

### Credenciales de Acceso

**Panel Administrador:**
- Usuario: `admin@newera.com`
- Contraseña: `admin123`
- URL: http://localhost:3000/admin/dashboard

**Cliente:**
- Usuario: `cliente@test.com`
- Contraseña: `cliente123`
- URL: http://localhost:3000

## 🔧 Comandos Útiles

### Backend
```bash
# Ver logs en tiempo real
npm start

# Reiniciar base de datos
npx prisma migrate reset

# Ver base de datos en navegador
npx prisma studio
```

### Frontend
```bash
# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Iniciar producción
npm start
```

## ⚠️ Problemas Comunes

### "Error: P1001: Can't reach database server"
- Verifica que PostgreSQL esté corriendo
- Verifica el `DATABASE_URL` en backend/.env

### "Error: EADDRINUSE: port already in use"
- El puerto 4000 o 3000 ya está en uso
- Cierra otras aplicaciones o cambia el puerto

### Las imágenes no se cargan
- Verifica que el backend esté corriendo en puerto 4000
- Verifica el archivo frontend/frontend/.env.local

## 📚 Próximos Pasos

1. Explora el panel de administración
2. Crea nuevos productos con imágenes
3. Prueba el flujo de compra como cliente
4. Revisa la documentación completa en README.md

---

**¿Necesitas ayuda?** Revisa el archivo README.md para más detalles.
