# APIJWTSEQ — API didáctica (Express + Sequelize + JWT)

Proyecto de ejemplo para **Programación Web**: API REST con autenticación JWT, **sesiones múltiples** (varios dispositivos), entidad aislada (**Marca**) y entidad relacionada (**Auto**).

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

La API queda en `http://localhost:3000`.

### Usuario de demostración (seeder)

| Campo    | Valor                 |
|----------|-----------------------|
| Email    | `profesor@ejemplo.cl` |
| Password | `demo1234`            |

## Variables de entorno

Ver [`.env.example`](.env.example). En producción, cambia `JWT_ACCESS_SECRET` y `JWT_REFRESH_SECRET` por valores largos y aleatorios.

## Documentación

- [JWT — conceptos y flujo](docs/jwt.md)
- [ORM con Sequelize](docs/orm-sequelize.md)
- [Actividad final: Cliente y Arriendo](actividades/actividad-final-cliente-arriendo.md)
- Colección Postman: [`postman/APIJWTSEQ.postman_collection.json`](postman/APIJWTSEQ.postman_collection.json)

## Flujo recomendado en Postman

1. `POST /auth/register` (opcional si usas el usuario demo)
2. `POST /auth/login` — guarda `accessToken` y `refreshToken`
3. `GET /auth/me` con Bearer
4. CRUD de `/marcas` y `/autos`
5. Segundo `POST /auth/login` (simula otro dispositivo)
6. `GET /auth/sesiones` — ver sesiones activas
7. `DELETE /auth/sesiones/:id` — revocar una sesión
8. `POST /auth/refresh` cuando el access token expire

## Endpoints

### Salud

| Método | Ruta      | Auth |
|--------|-----------|------|
| GET    | `/`       | No   |
| GET    | `/health` | No   |

### Autenticación (`/auth`)

| Método | Ruta                 | Auth   |
|--------|----------------------|--------|
| POST   | `/auth/register`     | No     |
| POST   | `/auth/login`        | No     |
| POST   | `/auth/refresh`      | No     |
| POST   | `/auth/logout`       | Bearer |
| GET    | `/auth/me`           | Bearer |
| PATCH  | `/auth/me`           | Bearer |
| GET    | `/auth/sesiones`     | Bearer |
| DELETE | `/auth/sesiones/:id` | Bearer |
| DELETE | `/auth/sesiones`     | Bearer |

### Marcas (`/marcas`)

| Método | Ruta            | Auth   |
|--------|-----------------|--------|
| GET    | `/marcas`       | Bearer |
| GET    | `/marcas/:id`   | Bearer |
| POST   | `/marcas`       | Bearer |
| PUT    | `/marcas/:id`   | Bearer |
| PATCH  | `/marcas/:id`   | Bearer |
| DELETE | `/marcas/:id`   | Bearer |

### Autos (`/autos`)

| Método | Ruta           | Auth   |
|--------|----------------|--------|
| GET    | `/autos`       | Bearer |
| GET    | `/autos/:id`   | Bearer |
| POST   | `/autos`       | Bearer |
| PUT    | `/autos/:id`   | Bearer |
| PATCH  | `/autos/:id`   | Bearer |
| DELETE | `/autos/:id`   | Bearer |

### Rutas anidadas

| Método | Ruta                      | Auth   |
|--------|---------------------------|--------|
| GET    | `/marcas/:marcaId/autos`  | Bearer |
| POST   | `/marcas/:marcaId/autos`  | Bearer |

Query común de listados: `?page=1&limit=10&search=texto`

## Scripts npm

| Script          | Descripción              |
|-----------------|--------------------------|
| `npm run dev`   | Servidor con nodemon     |
| `npm start`     | Servidor en producción   |
| `npm run db:migrate` | Ejecutar migraciones |
| `npm run db:seed`    | Datos de ejemplo     |
| `npm run db:reset`   | Undo + migrate + seed |

## Estructura

```
src/
  config/       # variables y Sequelize
  models/       # Usuario, RefreshToken, Marca, Auto
  migrations/
  seeders/
  controllers/
  routes/
  middlewares/
  services/
  validators/
docs/
postman/
actividades/
```

## Licencia

MIT — uso educativo libre.
