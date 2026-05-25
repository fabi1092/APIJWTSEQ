## [2026-05-18]

### Proyecto: APIJWTSEQ

**Contexto:** Implementación inicial del API didáctico para Programación Web (Express, Sequelize, JWT con sesiones múltiples).

**Cambios:** #feature
- Bootstrap Express + SQLite + migraciones y seeders
- Auth: register, login, refresh con rotación, logout, sesiones múltiples
- CRUD Marca y Auto con rutas anidadas `/marcas/:marcaId/autos`
- Documentación `docs/jwt.md`, `docs/orm-sequelize.md`
- Colección Postman y actividad final Cliente/Arriendo

**Decisiones:**
- SQLite con `sqlite3`; refresh token compuesto (JWT + opaco) hasheado en BD
- Rotación de refresh en cada `/auth/refresh`
- JWT obligatorio en marcas/autos; públicos solo `/`, `/health` y auth register/login/refresh

**Próximos pasos:**
- Opcional: roles de usuario, Swagger, soporte PostgreSQL documentado

**Archivos afectados:** `src/**`, `docs/**`, `postman/**`, `actividades/**`, `README.md`, `package.json`
