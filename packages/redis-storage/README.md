# @arcasdk/redis-storage

Almacenamiento de tickets WSAA en **Redis** para [`@arcasdk/core`](https://www.npmjs.com/package/@arcasdk/core).

Sirve cuando varias instancias o procesos usan el mismo certificado (varios servidores, workers, serverless): todos comparten el ticket de acceso en lugar de pedir uno cada uno, que WSAA rechaza con `coe.alreadyAuthenticated`.

## Instalación

```bash
npm i @arcasdk/core @arcasdk/redis-storage
# y el cliente de Redis que ya uses: redis (v4+) o ioredis
npm i redis
```

## Uso

```ts
import { Arca } from "@arcasdk/core";
import { RedisTicketStorage } from "@arcasdk/redis-storage";
import { createClient } from "redis";

const client = await createClient({ url: process.env.REDIS_URL }).connect();

const arca = new Arca({
  cuit: 20111111112,
  cert: process.env.AFIP_CERT!,
  key: process.env.AFIP_KEY!,
  production: false,
  ticketStorage: new RedisTicketStorage({ client, cuit: 20111111112 }),
});
```

Con `ioredis` es igual: pasale la instancia (`new Redis(process.env.REDIS_URL)`) como `client`.

## Opciones

| Opción       | Tipo                       | Descripción                                                  |
| ------------ | -------------------------- | ------------------------------------------------------------ |
| `client`     | `RedisTicketStorageClient` | Cliente conectado de `redis` (v4+) o `ioredis`               |
| `cuit`       | `number`                   | CUIT del certificado                                         |
| `production` | `boolean`                  | Ambiente de producción. Por defecto `false` (homologación)   |
| `keyPrefix`  | `string`                   | Prefijo de las claves. Por defecto `arcasdk:ticket:`         |

Cada ticket se guarda en `<keyPrefix><cuit>:<servicio>[:production]` como JSON, con el mismo formato que `FileSystemTicketStorage`.

Las claves no tienen TTL: hay una sola por CUIT y servicio, cada renovación la sobrescribe y `@arcasdk/core` descarta los tickets vencidos. El ticket da acceso a los web services del contribuyente, así que usá un Redis que no esté expuesto.

## Licencia

ISC
