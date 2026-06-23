# Servicio Genérico

El `GenericService` permite interactuar con servicios web de ARCA que no tienen un wrapper dedicado en el SDK, o invocar métodos SOAP de servicios ya soportados con una API de bajo nivel. Es útil para servicios menos comunes, pruebas de conectividad (`dummy`) o funcionalidades nuevas antes de incorporarlas como servicio tipado.

[[toc]]

---

## Uso básico

Accedé al servicio desde `arca.genericService`. El primer argumento es el **alias WSAA** del servicio; usá las constantes `ArcaServiceNames` para evitar errores de tipeo.

```typescript
import { Arca, ArcaServiceNames } from "@arcasdk/core";

const arca = new Arca({
  cuit: 20111111112,
  cert: "...",
  key: "...",
});

async function checkPadronStatus() {
  const result = await arca.genericService.call(
    ArcaServiceNames.WSSR_PADRON_FOUR,
    "dummy",
    {},
  );

  console.log(result);
}
```

### Firma de `call`

```ts
genericService.call(
  serviceName: ArcaServiceName,
  methodName: string,
  params: Record<string, unknown>,
  options?: { wsdlContent?: string },
): Promise<unknown>;
```

- `serviceName`: alias WSAA (ver tabla abajo).
- `methodName`: nombre del método SOAP **sin** sufijo `Async` (ej. `dummy`, `getPersona`, `FEDummy`).
- `params`: cuerpo del request según el WSDL.
- `options.wsdlContent`: XML del WSDL si el servicio no está preconfigurado en el SDK.

---

## Servicios con WSDL incluido

Estos servicios tienen WSDL, endpoint y mapeo de autenticación configurados en el SDK. No necesitás pasar `wsdlContent`:

| `ArcaServiceNames` | Alias WSAA | Servicio |
| ------------------ | ---------- | -------- |
| `WSFE` | `wsfe` | Facturación electrónica |
| `WSFEX` | `wsfex` | Facturación de exportación |
| `WSFECRED` | `wsfecred` | Factura de crédito MiPyMEs |
| `WSSR_PADRON_FOUR` | `ws_sr_padron_a4` | Padrón alcance 4 |
| `WSSR_PADRON_FIVE` | `ws_sr_padron_a5` | Padrón alcance 5 |
| `WSSR_PADRON_TEN` | `ws_sr_padron_a10` | Padrón alcance 10 |
| `WSSR_PADRON_THIRTEEN` | `ws_sr_padron_a13` | Padrón alcance 13 |
| `WSSR_INSCRIPTION_PROOF` | `ws_sr_constancia_inscripcion` | Constancia de inscripción |

### Ejemplos por servicio

```typescript
// WSFE — estado del servidor
await arca.genericService.call(ArcaServiceNames.WSFE, "FEDummy", {});

// WSFEX — dummy de exportación
await arca.genericService.call(ArcaServiceNames.WSFEX, "FEXDummy", {});

// WSFECRED — consulta de parámetros
await arca.genericService.call(
  ArcaServiceNames.WSFECRED,
  "consultarTiposRetenciones",
  {},
);

// Padrón A4 — consulta de contribuyente (auth inyectada automáticamente)
await arca.genericService.call(ArcaServiceNames.WSSR_PADRON_FOUR, "getPersona", {
  idPersona: 20111111111,
});
```

::: tip Servicios dedicados
Para uso diario preferí los servicios tipados (`electronicBillingService`, `wsfexService`, `registerScopeFourService`, etc.). El genérico es para casos avanzados o paridad con el WSDL crudo.
:::

---

## Servicios sin WSDL bundled

`ArcaServiceNames.FE_DUMMY` (`FEDummy`) existe como alias WSAA pero **no** incluye WSDL en el paquete. Si lo usás sin `wsdlContent`, la SDK lanza un error explícito.

Cualquier otro servicio ARCA no listado arriba requiere que proveas el WSDL manualmente.

---

## WSDL personalizado

Si el servicio no está en la tabla anterior, pasá el contenido XML del WSDL:

```typescript
import { Arca } from "@arcasdk/core";
import * as fs from "fs";

const arca = new Arca({
  cuit: 20111111112,
  cert: "...",
  key: "...",
});

async function callCustomService() {
  const wsdlContent = fs.readFileSync("./mi-servicio.wsdl", "utf8");

  const result = await arca.genericService.call(
    "mi_alias_wsaa", // debe coincidir con el alias autorizado en WSAA
    "someMethod",
    { param1: "value" },
    { wsdlContent },
  );

  console.log(result);
}
```

::: warning Alias WSAA
El primer argumento (`serviceName`) se usa para solicitar el Ticket de Acceso (TA). Debe ser el **alias exacto** configurado en ARCA para tu certificado, no necesariamente el nombre del archivo WSDL.
:::

---

## Autenticación automática

El `GenericService` reutiliza el mismo proxy de autenticación que los repositorios dedicados:

- Inyecta token WSAA en métodos que lo requieren según el WSDL.
- Usa mappers específicos para padrón y WSFECRED.
- Excluye métodos `dummy` / `FEXDummy` donde AFIP no espera auth en el body.

No necesitás llamar a WSAA manualmente salvo que uses `handleTicket: true` con credenciales propias.

---

## SOAP 1.2

Por defecto el SDK usa SOAP 1.2 (`useSoap12: true` en el `Context`). Algunos servicios (padrón, WSFECRED) fuerzan SOAP 1.1 internamente. Si un WSDL custom solo soporta 1.1:

```typescript
const arca = new Arca({
  cuit: 20111111112,
  cert: "...",
  key: "...",
  useSoap12: false,
});
```
