# Arca SDK — guía para agentes de código

Monorepo TypeScript para integrar Web Services de **ARCA** (ex AFIP) en Node.js.

## Paquetes publicados

| Paquete         | Uso                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------- |
| `@arcasdk/core` | WSAA, facturación electrónica (WSFE), padrones, FCE, WSFEX, WSCT, WSCDC, servicio genérico SOAP |
| `@arcasdk/pdf`  | PDF de comprobantes (A, B, C, E, M)                                                             |

**Importante:** el paquete legacy `afip.ts` en npm es la versión anterior. El desarrollo actual es `@arcasdk/core`.

## Instalación (consumidor)

```bash
npm i @arcasdk/core
# opcional PDF
npm i @arcasdk/pdf
```

## Uso mínimo

```ts
import { Arca } from "@arcasdk/core";

const arca = new Arca({
  cuit: 20111111112,
  cert: process.env.AFIP_CERT!, // PEM o ruta al .crt
  key: process.env.AFIP_KEY!, // PEM o ruta al .key
  production: false, // homologación
});

const status = await arca.electronicBillingService.getServerStatus();
const invoice = await arca.electronicBillingService.createNextVoucher({
  /* ... */
});
const taxpayer = await arca.registerScopeFourService.getTaxpayerDetails(20111111111);
```

## Punto de entrada API

- Clase principal: `Arca` (`packages/core/src/infrastructure/composition/arca.ts`)
- Referencia pública: [docs/referencia-api.md](docs/referencia-api.md)
- Índice para LLMs: [docs/public/llms.txt](docs/public/llms.txt)

### Servicios en `Arca`

| Propiedad                         | Web service                           |
| --------------------------------- | ------------------------------------- |
| `electronicBillingService`        | WSFE — facturas, NC, ND, CAEA         |
| `wsfexService`                    | WSFEX — exportación                   |
| `wsfecredService`                 | WSFECRED — factura de crédito MiPyMEs |
| `wsctService`                     | WSCT — comprobantes T de turismo      |
| `wscdcService`                    | WSCDC — constatación de comprobantes  |
| `registerScopeFourService`        | Padrón alcance 4                      |
| `registerScopeFiveService`        | Padrón alcance 5                      |
| `registerScopeTenService`         | Padrón alcance 10                     |
| `registerScopeThirteenService`    | Padrón alcance 13                     |
| `registerInscriptionProofService` | Constancia de inscripción             |
| `genericService`                  | Cualquier WSDL/SOAP de ARCA           |

## Credenciales y entorno

- Homologación: certificado de testing emitido en el portal ARCA (`production: false` o omitido).
- Producción: certificado de producción + `production: true`.
- El CUIT del contexto debe coincidir con el del certificado.
- WSAA gestiona tickets automáticamente; en serverless usar `ticketStorage` custom o `handleTicket: true` con credenciales pre-obtenidas.
- Ver [docs/credential_management.md](docs/credential_management.md) y [docs/config.md](docs/config.md).

## Errores frecuentes

Consultar [docs/faq/errors.md](docs/faq/errors.md) antes de inventar workarounds. Casos típicos:

- **10016**: número o fecha de comprobante incorrectos → usar `getLastVoucher` o `createNextVoucher`.
- **10048**: `ImpTotal` no cierra → incluir `ImpOpEx` e `ImpTotConc` en la suma. Un Recibo A exento es válido con `ImpOpEx = ImpTotal`. El SDK no pre-valida esto.
- **10197**: NC/ND sin asociación → enviar `CbtesAsoc` o `PeriodoAsoc`.
- **11002**: punto de venta no habilitado en ARCA.
- **alreadyAuthenticated**: reutilizar ticket WSAA (`FileSystemTicketStorage` o `MemoryTicketStorage`).
- **coe.notAuthorized**: autorizar el web service para el certificado en el portal ARCA.

## Desarrollo en este repo

```bash
npm install
npm run lint
npm test
npm run build
npm run test:integration   # requiere certificados en test-credentials/
```

Estructura:

- `packages/core/` — SDK principal
- `packages/pdf/` — generador PDF
- `docs/` — VitePress (`npm run docs:dev`)

Tests:

- Unit: `packages/core/tests/unit/`
- Integración: `packages/core/tests/integration/` (credenciales gitignored)

## Seguridad — no commitear

- `.env`, certificados (`.crt`, `.key`, `.pem`), `test-credentials/`
- `.ticket-cache*`, `*/mocks/credentials`

## Documentación online

https://ralcorta.github.io/arcasdk
