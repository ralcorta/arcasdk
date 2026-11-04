# 🗄️ Tickets en Redis

El paquete `@arcasdk/redis-storage` guarda los tickets de acceso de WSAA en **Redis**, a través de la interfaz [`ticketStorage`](/credential_management#opcion-3-almacenamiento-personalizado-ticketstorage) de `@arcasdk/core`.

::: tip ¿Cuándo usarlo?
Cuando varias instancias o procesos usan el mismo certificado: varios servidores detrás de un balanceador, workers o funciones serverless. WSAA entrega un solo ticket por certificado y servicio hasta que vence, así que todas tienen que compartirlo. Si cada una lo guarda por su lado, las demás reciben `coe.alreadyAuthenticated`.
:::

[[toc]]

---

## Instalación

```bash
npm i @arcasdk/core @arcasdk/redis-storage
```

Funciona con el cliente de Redis que ya uses: [`redis`](https://www.npmjs.com/package/redis) (v4 o posterior) o [`ioredis`](https://www.npmjs.com/package/ioredis). El paquete no instala ninguno.

## Uso

::: code-group

```ts [redis]
import { Arca } from "@arcasdk/core";
import { RedisTicketStorage } from "@arcasdk/redis-storage";
import { createClient } from "redis";

const client = await createClient({ url: process.env.REDIS_URL }).connect();

const arca = new Arca({
  cuit: 20111111112,
  cert: process.env.AFIP_CERT!,
  key: process.env.AFIP_KEY!,
  ticketStorage: new RedisTicketStorage({ client, cuit: 20111111112 }),
});
```

```ts [ioredis]
import { Arca } from "@arcasdk/core";
import { RedisTicketStorage } from "@arcasdk/redis-storage";
import Redis from "ioredis";

const client = new Redis(process.env.REDIS_URL!);

const arca = new Arca({
  cuit: 20111111112,
  cert: process.env.AFIP_CERT!,
  key: process.env.AFIP_KEY!,
  ticketStorage: new RedisTicketStorage({ client, cuit: 20111111112 }),
});
```

:::

## Opciones

| Opción       | Tipo                       | Descripción                                                |
| ------------ | -------------------------- | ---------------------------------------------------------- |
| `client`     | `RedisTicketStorageClient` | Cliente conectado de `redis` (v4+) o `ioredis`             |
| `cuit`       | `number`                   | CUIT del certificado                                       |
| `production` | `boolean`                  | Ambiente de producción. Por defecto `false` (homologación) |
| `keyPrefix`  | `string`                   | Prefijo de las claves. Por defecto `arcasdk:ticket:`       |

`RedisTicketStorageClient` es la parte de la API de Redis que usa el paquete (`get`, `set` y `del`), así que también podés pasar un wrapper propio.

## Cómo guarda los tickets

- **Clave:** `<keyPrefix><cuit>:<servicio>`, con el sufijo `:production` en producción. Por ejemplo, `arcasdk:ticket:20111111112:wsfe`.
- **Valor:** JSON con `header` y `credentials`, el mismo formato que `FileSystemTicketStorage`.
- **Sin TTL:** hay una sola clave por CUIT y servicio, cada renovación la sobrescribe y `@arcasdk/core` descarta los tickets vencidos.

::: warning Seguridad
El ticket permite operar los web services del contribuyente hasta que vence. Usá un Redis que no esté expuesto públicamente y, si lo compartís con otras aplicaciones, un `keyPrefix` propio.
:::
