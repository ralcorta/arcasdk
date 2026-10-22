# ⚙️ Contexto

### Contexto de Arca:

La clase `Arca` recibe un objeto de tipo `Context` como parámetro, el cual proporciona los datos básicos necesarios para utilizar los servicios web de ARCA, así como también cómo deben comportarse:

```ts
const instancia = new Arca(Contexto);
```

- `Contexto`:
  - `production` <small>(booleano)</small>: Flag que permite especificar si se utilizarán los servicios de producción o de homologación (pruebas).
  - `cert` <small>\*(cadena)</small>: Contenido del certificado `(.crt)`.
  - `key` <small>\*(cadena)</small>: Contenido de la llave privada.
  - `cuit` <small>\*(número)</small>: CUIT del usuario que se utilizará.
  - `credentials` <small>(ILoginCredentials)</small>: Un objeto de tipo `ILoginCredentials` que contiene las credenciales de autenticación si ya se tienen guardadas. Este objeto debe tener la estructura `{ header: {...}, credentials: {...} }` obtenida de un `AccessTicket` mediante el método `toLoginCredentials()`.
  - `ticketStorage` <small>(ITicketStoragePort)</small>: Implementación custom de persistencia de tickets WSAA (Redis, BD, etc.). Si se define, la SDK usa este storage en lugar del filesystem por defecto. Ver [Gestión de Credenciales](/credential_management#opcion-3-almacenamiento-personalizado-ticketstorage).
  - `handleTicket` <small>(booleano)</small>: Flag que indica si los tickets de autenticación son gestionados automáticamente por el paquete o si serán proporcionados por el desarrollador (más adelante se explicará cómo hacer inicio de sesión y luego pasar los tokens antes de llamar al servicio web deseado). Esto es útil cuando se desea utilizar el paquete en una función `lambda` o en algun lugar que no se tenga almacenamiento.
  - `ticketPath` <small>(cadena)</small>: Ruta donde guardar los tickets WSAA cuando el modo es automático en Node.js (`handleTicket: false`, valor por defecto). Por defecto apunta a `lib/infrastructure/storage/auth/tickets` **dentro del paquete instalado** (`node_modules/@arcasdk/core/...`). Personalizala con una ruta absoluta en tu servidor.
  - `useSoap12` <small>(booleano, opcional)</small>: Flag que indica si se debe usar SOAP 1.2 en lugar de SOAP 1.1 para el servicio de Facturación Electrónica. Por defecto es `true` (usa SOAP 1.2).
  - `useHttpsAgent` <small>(booleano, opcional)</small>: Flag que habilita el uso de un agente HTTPS con configuración legacy para servidores ARCA/AFIP antiguos. **Por defecto es `false`** (deshabilitado). Ver más detalles abajo.
  - `onEvent` <small>(función, opcional)</small>: Recibe un evento por cada pedido, respuesta o error de cada llamada a ARCA, WSAA incluido, con los parámetros, la respuesta y el XML enviado y recibido. Sirve para loguear, medir tiempos o reaccionar a errores. Ver [`onEvent`](#onevent).

<br/>
Context Type:

```ts
type Context = {
  /**
   * Flag for production or testing environment
   *
   * @var boolean
   **/
  production?: boolean;

  /**
   * Content file for the X.509 certificate in PEM format
   *
   * @var string
   **/
  cert: string;

  /**
   * Content file for the private key corresponding to CERT (PEM)
   *
   * @var string
   **/
  key: string;

  /**
   * The CUIT to use
   *
   * @var int
   **/
  cuit: number;

  /**
   * Tokens object if you have one created before
   *
   * @var credentials
   **/
  credentials?: ILoginCredentials;

  /**
   * Custom ticket persistence (Redis, DB, etc.). Overrides default FS storage.
   */
  ticketStorage?: ITicketStoragePort;

  /**
   * Flag that if is true, the access tickets data is handled by the developer, otherwise is saved locally.
   */
  handleTicket?: boolean;

  /**
   * Directory for WSAA tickets when auto-managed on Node.js (default: inside installed package)
   */
  ticketPath?: string;

  /**
   * Use SOAP 1.2 instead of SOAP 1.1 for Electronic Billing service
   * @default true (uses SOAP 1.2 by default)
   */
  useSoap12?: boolean;

  /**
   * Enable HTTPS Agent for Node.js environments (required for legacy ARCA servers)
   * Set to true when running in Node.js environments that require legacy HTTPS agent
   * Set to false when running in Cloudflare Workers or other edge runtimes
   * @default false (disabled by default)
   */
  useHttpsAgent?: boolean;

  /**
   * Receives a request, response or error event for every call to ARCA,
   * WSAA included, with the parameters, the result and the XML (token and sign redacted)
   */
  onEvent?: ArcaEventListener;
};
```

## 🔧 Parámetros Avanzados

### `onEvent`

Función que la SDK llama con un evento por cada llamada a ARCA, incluido el login en WSAA. Permite loguear los pedidos y las respuestas, medir tiempos o reaccionar ante errores sin depender de un logger en particular.

```ts
import { Arca, type ArcaEvent } from "@arcasdk/core";

const arca = new Arca({
  cuit,
  cert,
  key,
  onEvent: (event: ArcaEvent) => {
    switch (event.type) {
      case "request":
        logger.debug(`ARCA ${event.service}.${event.method}`, event.params);
        break;
      case "response":
        logger.debug(`ARCA ${event.method} ${event.durationMs}ms`, event.result);
        break;
      case "error":
        logger.error(`ARCA ${event.method} falló`, event.fault ?? event.error);
        break;
    }
  },
});
```

| Evento | Cuándo | Datos además de `service`, `method`, `endpoint` y `requestId` |
| ------ | ------ | -------------------------------------------------------------- |
| `request` | Justo antes de enviar el pedido | `params`: parámetros de la llamada, antes de pasarlos a XML; `xml`: XML enviado |
| `response` | ARCA respondió y se pudo leer la respuesta | `result`: respuesta de ARCA leída del XML, antes de que la SDK la convierta a sus propios tipos; `xml`: XML recibido; `durationMs` |
| `error` | La llamada falló: error de red, HTTP o fault de ARCA | `error`; `fault`: el fault de ARCA leído del XML, si lo hubo; `xml`: cuerpo de la respuesta, si hubo; `durationMs` |

- `service` es el servicio de ARCA (`wsfe`, `ws_sr_padron_a5`, …) o `wsaa` en el login. `method` es la operación de ARCA (`FECAESolicitar`, `loginCms`, …).
- `params`, `result` y `fault` usan los nombres de ARCA (`FeCAEReq`, `FECAESolicitarResult`, `faultstring`, …), igual que el XML.
- `requestId` identifica la llamada: el `request` y su `response` o `error` comparten el mismo, aunque haya llamadas simultáneas.
- **El token y el sign de WSAA nunca aparecen:** en `params`, `result`, `fault` y `xml` se reemplazan por `[REDACTED]`, incluido el ticket que devuelve el login. También el pedido firmado que se envía al login (`in0`), porque mientras es válido alguien podría reenviarlo para obtener un ticket. El resto (CUIT, importes, datos del receptor) sale completo; tenelo en cuenta al elegir dónde guardar los logs.
- `params`, `result` y `fault` son copias: modificarlos no cambia lo que se envía ni lo que devuelve la SDK.
- Se emite `error` para todo fault de ARCA, aunque la SDK lo traduzca después (por ejemplo, "No existe persona" en los padrones termina en `null`).
- La función se llama de forma sincrónica y **lo que lance se ignora**: un listener con errores nunca rompe una llamada a ARCA. Para trabajo lento (enviar a un servicio externo), encolalo en lugar de esperarlo.

### `useHttpsAgent`

Este parámetro controla si se utiliza un agente HTTPS con configuración legacy para conectarse a los servidores de ARCA/AFIP.

::: warning Valor por defecto
`useHttpsAgent` es **`false`** por defecto, para compatibilidad con Cloudflare Workers y runtimes modernos sin configuración SSL especial.
:::

#### Cuándo usar `useHttpsAgent: false` (por defecto)

El valor por defecto `false` es adecuado para:

- **Cloudflare Workers** y otros entornos edge
- **Entornos Node.js modernos** que no requieren configuración SSL legacy
- **Mayoría de casos de uso** donde no se experimentan problemas de conexión SSL

#### Cuándo usar `useHttpsAgent: true`

Debes habilitar este parámetro (`true`) solo si:

- ⚠️ Estás ejecutando en **Node.js** (no en edge runtimes)
- ⚠️ Experimentas errores de conexión SSL relacionados con parámetros Diffie-Hellman débiles
- ⚠️ Te conectas a **servidores ARCA/AFIP legacy** que requieren configuración SSL legacy

#### Errores TLS en Producción

Para errores como `EPROTO`, `dh key too small` o fallas de handshake TLS en producción, consulta la sección especial de errores frecuentes:

- [Errores de conexión SSL/TLS en Producción](/faq/errors#errores-de-conexion-ssl-tls-en-produccion-issue-112)

#### Ejemplo de uso

```ts
import { Arca } from "@arcasdk/core";

// Configuración por defecto (recomendada para la mayoría de casos)
const arca = new Arca({
  cuit: 20111111112,
  cert: "contenido_del_certificado",
  key: "contenido_de_la_clave_privada",
  // useHttpsAgent no se especifica, usa false por defecto
});

// Habilitar HTTPS Agent solo si es necesario (Node.js con servidores legacy)
const arcaLegacy = new Arca({
  cuit: 20111111112,
  cert: "contenido_del_certificado",
  key: "contenido_de_la_clave_privada",
  useHttpsAgent: true, // Solo si experimentas problemas SSL en Node.js
});
```

::: tip Nota Técnica
El agente HTTPS legacy se crea solo cuando:

1. `useHttpsAgent` está en `true`
2. El código se ejecuta en un entorno Node.js (detectado automáticamente)

En entornos edge como Cloudflare Workers, el agente se omite automáticamente incluso si está habilitado, ya que estos entornos no soportan el módulo `https` de Node.js.
:::

<br>
