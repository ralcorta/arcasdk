# Comportamientos

---

## Autenticación (WSAA)

### El Desafío

Para interactuar con los servicios web de ARCA, es esencial autenticarse a través de su servicio [WSAA](https://www.arca.gob.ar/ws/WSAA/WSAAmanualDev.pdf), que proporciona tokens con validez de **12 horas**.

Pero hay restricciones importantes:

- **Producción:** 1 solicitud cada 2 minutos
- **Homologación (testing):** 1 solicitud cada 10 minutos

**Conclusión:** No puedes solicitar un token en cada request. Debes generar una vez y reutilizar durante 12 horas.

### El Problema con Almacenamiento Local

Muchas librerías resuelven esto guardando tokens en archivos locales del servidor (usando `fs` de Node). Esto funciona bien en servidores tradicionales, pero **falla en entornos serverless** (AWS Lambda, Vercel, Cloudflare Workers, etc.) donde el sistema de archivos es efímero.

### La Solución: Dos Formas de Gestionar Tokens

Esta SDK ofrece **dos estrategias complementarias**:

#### 1. Automática (por defecto)

La SDK genera, almacena y reutiliza tokens internamente. En Node.js los guarda en disco:

- Por defecto: `node_modules/@arcasdk/core/lib/infrastructure/storage/auth/tickets` (relativo a la instalación del paquete)
- Personalizable con `ticketPath` (ruta absoluta recomendada en servidores)

**Ideal para:** Servidores tradicionales, desarrollo local.

#### 2. Manual (para serverless)

Tú controlas dónde guardar credenciales. Obtienes el token, lo extraes y lo almacenas en tu infraestructura:

- Base de datos
- Redis
- S3
- Cualquier storage persistente

Luego reutilizas ese token en próximos requests pasándolo a la SDK.

**Ideal para:** AWS Lambda, Vercel, entornos edge, compartir tokens entre instancias.

---

## Resumen Conceptual

| Aspecto                | Automática (disco)        | `ticketStorage`            | Manual (`credentials`)     |
| ---------------------- | ------------------------- | -------------------------- | -------------------------- |
| **Ubicación de token** | FS (`ticketPath`)         | Tu Redis/BD/S3             | Tu BD/Redis/S3             |
| **Generación**         | SDK automática            | SDK automática             | SDK + Extraes credenciales |
| **Almacenamiento**     | SDK en disco              | Tu adapter                 | Tú guardas                 |
| **Reutilización**      | SDK busca en FS           | SDK busca en adapter       | Tú pasas al crear Arca     |
| **Serverless**         | ✗ No funciona bien        | ✓ Funciona                 | ✓ Funciona                 |
| **Complejidad**        | Baja                      | Media                      | Media                      |

---

## Implementación

Para ver ejemplos prácticos y paso a paso de cómo implementar ambas estrategias, consulta [Gestión de Credenciales](./credential_management.md).
