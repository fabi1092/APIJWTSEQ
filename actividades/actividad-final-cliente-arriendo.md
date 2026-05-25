# Actividad final — Cliente y Arriendo

**Asignatura:** Programación Web  
**Proyecto base:** APIJWTSEQ (Express + Sequelize + JWT)

## Objetivo

Extender la API agregando dos entidades nuevas y sus relaciones, siguiendo los mismos patrones que **Marca** y **Auto**, con rutas protegidas por JWT.

## Parte 1 — Modelo Cliente

Crear tabla `clientes` con campos:

| Campo     | Tipo        | Reglas                    |
|-----------|-------------|---------------------------|
| id        | INTEGER PK  | autoincrement             |
| nombre    | STRING      | obligatorio               |
| rut       | STRING      | obligatorio, **único**    |
| email     | STRING      | obligatorio, formato email|
| telefono  | STRING      | opcional                  |

## Parte 2 — Modelo Arriendo

Crear tabla `arriendos`:

| Campo       | Tipo     | Reglas                          |
|-------------|----------|---------------------------------|
| id          | INTEGER  | PK                              |
| fechaInicio | DATE     | obligatorio                     |
| fechaFin    | DATE     | nullable hasta devolución       |
| precioDia   | DECIMAL  | obligatorio, > 0                |
| clienteId   | INTEGER  | FK → clientes                   |
| autoId      | INTEGER  | FK → autos                      |
| estado      | STRING   | `activo` \| `finalizado` (default `activo`) |

### Relaciones Sequelize

- `Cliente.hasMany(Arriendo, { foreignKey: 'clienteId', as: 'arriendos' })`
- `Auto.hasMany(Arriendo, { foreignKey: 'autoId', as: 'arriendos' })`
- `Arriendo.belongsTo(Cliente, …)` y `Arriendo.belongsTo(Auto, …)`

## Parte 3 — Endpoints mínimos

Todos requieren **Bearer token** (salvo que indiques lo contrario en tu README).

### Clientes

| Método | Ruta              | Descripción        |
|--------|-------------------|--------------------|
| GET    | `/clientes`       | Listado paginado   |
| GET    | `/clientes/:id`   | Detalle            |
| POST   | `/clientes`       | Crear              |
| PATCH  | `/clientes/:id`   | Actualizar parcial |
| DELETE | `/clientes/:id`   | Eliminar           |

### Arriendos

| Método | Ruta                        | Descripción                          |
|--------|-----------------------------|--------------------------------------|
| GET    | `/arriendos`                | Listado (filtro `?estado=activo`)    |
| GET    | `/arriendos/:id`            | Detalle con Cliente y Auto           |
| POST   | `/arriendos`                | Crear arriendo activo                |
| PATCH  | `/arriendos/:id`            | Actualizar (solo si no finalizado)   |
| POST   | `/arriendos/:id/devolver`   | Set `fechaFin`, `estado=finalizado`  |

### Rutas anidadas

| Método | Ruta                           |
|--------|--------------------------------|
| GET    | `/clientes/:id/arriendos`      |
| GET    | `/autos/:id/arriendos`         |

## Parte 4 — Reglas de negocio

Implementa validaciones en controlador o servicio:

1. **No arrendar** un auto que ya tenga un arriendo con `estado = activo`.
2. `fechaInicio` no puede ser posterior a `fechaFin` (cuando exista `fechaFin`).
3. `precioDia` debe ser mayor que cero.
4. Al **devolver**, registrar `fechaFin` (fecha actual o la enviada en body) y cambiar estado a `finalizado`.
5. No eliminar un cliente con arriendos activos (responder **409**).

## Parte 5 — Entregables

1. Migraciones y modelos Sequelize.
2. Rutas, controladores y validadores (`express-validator`).
3. Carpeta **Postman** nueva en tu fork con las peticiones de Cliente y Arriendo.
4. Sección en tu README con instrucciones y ejemplo de flujo: crear cliente → crear arriendo → devolver auto.
5. (Opcional) Transacción Sequelize al crear arriendo.

## Rúbrica sugerida (100 pts)

| Criterio                         | Puntos |
|----------------------------------|--------|
| Modelos y asociaciones correctas | 25     |
| Endpoints funcionales + JWT      | 25     |
| Reglas de negocio                | 25     |
| Validaciones y códigos HTTP      | 15     |
| Postman + README                 | 10     |

## Pistas

- Revisa `src/controllers/autoController.js` para `include` de relaciones.
- Revisa `src/controllers/marcaController.js` para el patrón 409 al eliminar.
- Usa `findAndCountAll` como en los listados existentes.

**No publiques solución completa en el mismo repositorio del profesor**; entrega tu fork o rama privada.
