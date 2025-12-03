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
  - `handleTicket` <small>(booleano)</small>: Flag que indica si los tickets de autenticación son gestionados automáticamente por el paquete o si serán proporcionados por el desarrollador (más adelante se explicará cómo hacer inicio de sesión y luego pasar los tokens antes de llamar al servicio web deseado). Esto es útil cuando se desea utilizar el paquete en una función `lambda` o en algun lugar que no se tenga almacenamiento.
  - `ticketPath` <small>(cadena)</small>: La ruta preferida donde se desean guardar los tokens obtenidos del servicio WSAA si no se desea utilizar la carpeta predeterminada.
  - `useSoap12` <small>(booleano, opcional)</small>: Flag que indica si se debe usar SOAP 1.2 en lugar de SOAP 1.1 para el servicio de Facturación Electrónica. Por defecto es `true` (usa SOAP 1.2).
  - `enableLogging` <small>(booleano, opcional)</small>: Flag que habilita el registro de logs en consola. Por defecto es `false`.
  - `useHttpsAgent` <small>(booleano, opcional)</small>: Flag que habilita el uso de un agente HTTPS con configuración legacy para servidores ARCA/AFIP antiguos. **Por defecto es `false`** (deshabilitado). Ver más detalles abajo.

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
   * Flag that if is true, the access tickets data is handled by the developer, otherwise is saved locally.
   */
  handleTicket?: boolean;

  /**
   * The path of the auth obj if the package is auto managed
   */
  ticketPath?: string;

  /**
   * Enable console logging
   *
   * @default false
   */
  enableLogging?: boolean;

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
};
```

## 🔧 Parámetros Avanzados

### `useHttpsAgent`

Este parámetro controla si se utiliza un agente HTTPS con configuración legacy para conectarse a los servidores de ARCA/AFIP.

::: warning Cambio Importante
**Desde la versión 0.3.5, el valor por defecto cambió de `true` a `false`.**

Este cambio mejora la compatibilidad con entornos edge como Cloudflare Workers y otros runtimes modernos que no requieren configuración SSL legacy.
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
