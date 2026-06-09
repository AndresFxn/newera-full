# Índice de Documentación — New Era Supermercado

## Empezar rápido

1. **[README.md](README.md)** — Introducción, arquitectura y stack
2. **[INICIO_RAPIDO.md](INICIO_RAPIDO.md)** — Instalación en 5 minutos
3. **[CONFIGURACION.md](CONFIGURACION.md)** — Variables de entorno, puertos, JWT, CORS

## Funcionalidades

- **[SISTEMA_PROMOCIONES.md](SISTEMA_PROMOCIONES.md)** — Promociones, popup, carrusel y panel admin

## Estructura del código

```
New-Era-main/
├── backend/                  # API REST (Express + Prisma + PostgreSQL)
│   ├── server.js             # Punto de entrada
│   └── src/
│       ├── config/           # DB y subida de archivos
│       ├── controllers/      # Handlers HTTP
│       ├── middlewares/      # Auth, validación, errores
│       ├── routes/           # Definición de rutas /api/*
│       ├── services/         # Lógica de negocio
│       └── validators/       # Esquemas Joi
│
└── frontend/frontend/        # Tienda + admin (Next.js 16)
    ├── app/
    │   ├── (shop)/           # Tienda pública
    │   ├── admin/            # Panel administrativo
    │   └── auth/             # Login y registro
    ├── components/           # UI reutilizable
    ├── context/              # Estado global (carrito)
    ├── hooks/                # Hooks personalizados
    └── lib/
        ├── api.ts            # API pública (sin auth)
        ├── api-admin.ts      # API admin (requiere JWT)
        ├── types.ts          # Tipos TypeScript
        └── data/             # Datos estáticos (hero slides)
```

## Guías por perfil

| Perfil | Archivos recomendados |
|--------|----------------------|
| Backend | README → INICIO_RAPIDO → `backend/src/` |
| Frontend | README → INICIO_RAPIDO → `frontend/frontend/` |
| DevOps | CONFIGURACION.md completo |

## Búsqueda rápida

| Pregunta | Documento |
|----------|-----------|
| ¿Cómo instalar? | [INICIO_RAPIDO.md](INICIO_RAPIDO.md) |
| ¿Qué puertos usa? | [CONFIGURACION.md](CONFIGURACION.md) |
| ¿Cómo funcionan las promociones? | [SISTEMA_PROMOCIONES.md](SISTEMA_PROMOCIONES.md) |
| ¿Usuarios de prueba? | [INICIO_RAPIDO.md](INICIO_RAPIDO.md) |

## Comandos esenciales

**Backend:**
```bash
cd backend
npm install
npx prisma migrate dev
npm run seed
npm start
```

**Frontend:**
```bash
cd frontend/frontend
npm install
npm run dev
```
