# JSON Web Token (JWT) — Guía didáctica

Este documento explica cómo funciona la autenticación en **APIJWTSEQ** y los conceptos que debes dominar en Programación Web.

## ¿Qué es un JWT?

Un **JSON Web Token** es un estándar (RFC 7519) para transmitir información de forma compacta y firmada entre cliente y servidor. No es “encriptación total”: el payload suele ser legible en Base64; la **firma** garantiza que nadie lo alteró sin conocer el secreto del servidor.

Un JWT tiene tres partes separadas por puntos (`.`):

```
header.payload.signature
```

| Parte       | Contenido típico                                      |
|-------------|--------------------------------------------------------|
| **Header**  | Algoritmo (`HS256`) y tipo (`JWT`)                    |
| **Payload** | Claims: `sub` (id usuario), `email`, `exp`, `iat`…  |
| **Signature** | HMAC del header + payload con un secreto          |

## Access token vs refresh token

En esta API usamos **dos tipos** de token:

| Token            | Duración (por defecto) | Uso                                      |
|------------------|------------------------|------------------------------------------|
| **Access token** | 15 minutos             | Cada petición protegida (`Authorization`) |
| **Refresh token**| 7 días                 | Obtener un nuevo access sin volver a login |

**¿Por qué dos?** El access token viaja en muchas peticiones; si se filtra, el daño es limitado por su corta vida. El refresh token se usa poco y se guarda con más cuidado.

### Formato del refresh en este proyecto

El refresh que recibes combina:

1. Un JWT firmado con `JWT_REFRESH_SECRET` (incluye `sub` = usuario y `sid` = id de sesión).
2. Un token opaco aleatorio, separado por un punto final.

En base de datos **no guardamos el token en claro**: solo un **hash SHA-256** del segmento opaco. Así, si alguien roba la BD, no puede reutilizar los refresh directamente.

## Sesiones múltiples

Cada `POST /auth/login` crea una fila en la tabla `refresh_tokens`. Eso representa una **sesión** (navegador, celular, laboratorio, etc.).

- `GET /auth/sesiones` — lista sesiones activas del usuario.
- `DELETE /auth/sesiones/:id` — revoca una sesión concreta.
- `DELETE /auth/sesiones` — revoca todas; con body `{ "refreshToken": "..." }` y query `?except=current` puedes conservar la sesión actual.

Al hacer `POST /auth/refresh`, la sesión anterior se **revoca** y se emite un par nuevo (**rotación**), lo que reduce el riesgo si un refresh token viejo fue interceptado.

## Cómo enviar el token

En rutas protegidas, el cliente envía:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Sin este header, la API responde **401 Unauthorized**.

## Códigos HTTP relacionados

| Código | Significado en auth                          |
|--------|-----------------------------------------------|
| 401    | Token ausente, inválido, expirado o sesión revocada |
| 403    | Token válido pero sin permiso (reservado para roles futuros) |
| 409    | Conflicto de datos (p. ej. email duplicado en registro) |

## Buenas prácticas (no negociables)

1. **Nunca** subas `.env` con secretos a Git.
2. Usa HTTPS en producción.
3. No guardes el access token en `localStorage` si puedes evitarlo en apps sensibles; para este curso Postman/cookies de sesión son suficientes.
4. En logout, envía el `refreshToken` para revocar la sesión en servidor.

## Flujo resumido

```mermaid
sequenceDiagram
    participant Cliente
    participant API
    participant BD

    Cliente->>API: POST /auth/login
    API->>BD: INSERT refresh_tokens
    API-->>Cliente: accessToken + refreshToken
    Cliente->>API: GET /marcas (Bearer access)
    API-->>Cliente: 200 OK
    Cliente->>API: POST /auth/refresh
    API->>BD: revocar sesión vieja, crear nueva
    API-->>Cliente: nuevos tokens
```

## Referencias

- [jwt.io](https://jwt.io) — decodificar tokens de prueba (solo en entorno educativo).
- Código: `src/services/tokenService.js`, `src/services/authService.js`, `src/middlewares/auth.js`.
