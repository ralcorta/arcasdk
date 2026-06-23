# Referencia de la API pública

Resumen de lo que exporta `@arcasdk/core` y cómo acceder a cada servicio desde una instancia de `Arca`.

[[toc]]

---

## Clase `Arca`

Punto de entrada principal. Se construye con un [`Context`](/config) y expone un servicio tipado por cada web service de ARCA soportado.

```ts
import { Arca } from "@arcasdk/core";

const arca = new Arca({
  cuit: 20111111112,
  cert: "...",
  key: "...",
  production: false,
});
```

### Propiedades de servicio

| Propiedad | Web service | Documentación |
| --------- | ----------- | ------------- |
| `electronicBillingService` | WSFE | [Facturación electrónica](/services/facturacion_electronica) |
| `wsfexService` | WSFEX | [Facturación de exportación](/services/facturacion_electronica_exportacion) |
| `wsfecredService` | WSFECRED | [Factura de crédito MiPyMEs](/services/factura_credito_electronica) |
| `registerScopeFourService` | Padrón A4 | [Padrón alcance 4](/services/consulta_padron_alcance_4) |
| `registerScopeFiveService` | Padrón A5 | [Padrón alcance 5](/services/consulta_padron_alcance_5) |
| `registerScopeTenService` | Padrón A10 | [Padrón alcance 10](/services/consulta_padron_alcance_10) |
| `registerScopeThirteenService` | Padrón A13 | [Padrón alcance 13](/services/consulta_padron_alcance_13) |
| `registerInscriptionProofService` | Constancia inscripción | [Constancia de inscripción](/services/consulta_padron_constancia_inscripcion) |
| `genericService` | Cualquier WSDL / SOAP genérico | [Servicio genérico](/services/generic-service) |

Ejemplo rápido por servicio:

```ts
import { Arca, ArcaServiceNames } from "@arcasdk/core";

await arca.electronicBillingService.getServerStatus();
await arca.wsfexService.dummy();
await arca.wsfecredService.consultarTiposRetenciones();
await arca.registerScopeFourService.getTaxpayerDetails(20111111111);
await arca.genericService.call(ArcaServiceNames.WSFE, "FEDummy", {});
```

---

## `ArcaServiceNames`

Constantes con los **alias WSAA** de cada servicio. Usalas con `AuthRepository`, `genericService.call()` y cualquier API que reciba un nombre de servicio.

```ts
import { Arca, ArcaServiceNames, AuthRepository } from "@arcasdk/core";

const ticket = await authRepository.requestLogin(ArcaServiceNames.WSFE);

await arca.genericService.call(
  ArcaServiceNames.WSSR_PADRON_FOUR,
  "dummy",
  {},
);
```

| Constante | Valor (alias WSAA) |
| --------- | ------------------ |
| `WSFE` | `wsfe` |
| `WSFEX` | `wsfex` |
| `WSFECRED` | `wsfecred` |
| `WSSR_PADRON_FOUR` | `ws_sr_padron_a4` |
| `WSSR_PADRON_FIVE` | `ws_sr_padron_a5` |
| `WSSR_PADRON_TEN` | `ws_sr_padron_a10` |
| `WSSR_PADRON_THIRTEEN` | `ws_sr_padron_a13` |
| `WSSR_INSCRIPTION_PROOF` | `ws_sr_constancia_inscripcion` |
| `FE_DUMMY` | `FEDummy` |

`FE_DUMMY` sirve como alias WSAA; no incluye WSDL en el paquete. Para usarlo con `genericService`, pasá `wsdlContent` en las opciones.

---

## Autenticación WSAA

### Automática (recomendada)

Con `handleTicket: false` (por defecto), `Arca` renueva y persiste tickets sin código extra. Ver [Gestión de credenciales](/credential_management).

### `AuthRepository`

Cliente WSAA de bajo nivel, útil cuando controlás vos el ciclo del ticket:

```ts
import { AuthRepository, ArcaServiceNames } from "@arcasdk/core";

const authRepository = new AuthRepository({
  cuit: 20111111112,
  cert: "...",
  key: "...",
  production: false,
});

const ticket = await authRepository.requestLogin(ArcaServiceNames.WSFE);
const credentials = ticket.toLoginCredentials();
```

### Almacenamiento de tickets

| Export | Uso |
| ------ | --- |
| `ITicketStoragePort` | Interfaz para persistir `AccessTicket` por servicio |
| `FileSystemTicketStorage` | Implementación en disco |
| `MemoryTicketStorage` | Implementación en memoria (tests, procesos cortos) |

Inyectá un storage custom en el `Context`:

```ts
import {
  Arca,
  FileSystemTicketStorage,
  type ITicketStoragePort,
} from "@arcasdk/core";

const ticketStorage: ITicketStoragePort = new FileSystemTicketStorage({
  ticketPath: "/var/lib/mi-app/arca-tickets",
  cuit: 20111111112,
  production: false,
});

const arca = new Arca({ cuit, cert, key, ticketStorage });
```

---

## SOAP y transporte

| Export | Descripción |
| ------ | ----------- |
| `SoapClient` | Crear clientes SOAP con WSDL bundled o contenido manual |
| `SoapRuntime` | Forzar runtime Node o Universal en `SoapClient` |
| `DateTimeRef` | Utilidad de fecha/hora usada internamente |
| `MS_PER_MINUTE`, `MS_PER_SECOND`, `WSAA_TRA_VALIDITY_WINDOW_MS` | Constantes de tiempo WSAA |

Detalle de engines y TLS: [Engines SOAP](/soap-engines) y [`useHttpsAgent`](/config#usehttpsagent).

---

## Tipos y DTOs

El paquete reexporta tipos de la capa de aplicación para armar requests y tipar responses:

- **Facturación:** `IVoucher`, `INextVoucher`, `CreateVoucherResultDto`, DTOs de parámetros y consultas WSFE.
- **WSFEX / WSFECRED:** tipos bajo los namespaces exportados desde `@arcasdk/core` (p. ej. inputs/outputs de `wsfexService` y `wsfecredService`).
- **Padrón:** DTOs en el módulo de register exportado.
- **Auth:** `ILoginCredentials`, entidades de dominio como `AccessTicket` y `Voucher` cuando se exportan.

También están disponibles los **use cases** (`CreateVoucherUseCase`, `LoginUseCase`, etc.) para composición custom sin pasar por `Arca`.

```ts
import {
  CreateVoucherUseCase,
  type CreateVoucherResultDto,
} from "@arcasdk/core";
```

---

## Dominio exportado

Entidades y value objects reutilizables:

- `Voucher` — modelo de comprobante WSFE
- `AccessTicket` — ticket WSAA con `toLoginCredentials()`
- `CUIT`, `CAE`, `VoucherNumber` — value objects

---

## Servicio genérico vs servicios dedicados

| Enfoque | Cuándo usarlo |
| ------- | ------------- |
| Servicio dedicado (`wsfexService`, etc.) | Uso normal: métodos tipados, menos fricción |
| `genericService` | Métodos no expuestos aún, `dummy` de prueba, WSDL propio con `wsdlContent` |

Ver [Servicio genérico](/services/generic-service) para la lista de WSDL incluidos y ejemplos de `call()`.

---

## Métodos por servicio

Acceso: `arca.<propiedad>.<método>(...)`. Los tipos de entrada y salida se importan desde `@arcasdk/core` (p. ej. `IVoucher`, `IFEXAuthorizeInput`).

### `electronicBillingService` (WSFE)

Guía detallada: [Facturación electrónica](/services/facturacion_electronica)

| Método | Descripción |
| ------ | ----------- |
| `getServerStatus()` | Estado de App/DB/Auth de WSFE |
| `getSalesPoints()` | Puntos de venta habilitados |
| `getLastVoucher(salesPoint, type)` | Último comprobante autorizado por PV y tipo |
| `createVoucher(req)` | Emite comprobante y obtiene CAE (`IVoucher` → `CreateVoucherResultDto`) |
| `createNextVoucher(req)` | Igual que `createVoucher` pero calcula número siguiente (`INextVoucher`) |
| `createInvoice(req)` | Sinónimo de `createVoucher` |
| `createNextInvoice(req)` | Sinónimo de `createNextVoucher` |
| `getVoucherInfo(number, salesPoint, type)` | Consulta comprobante emitido |
| `getVoucherTypes()` | Tipos de comprobante |
| `getConceptTypes()` | Tipos de concepto |
| `getDocumentTypes()` | Tipos de documento receptor |
| `getAliquotTypes()` | Alícuotas IVA |
| `getCurrencyTypes()` | Monedas |
| `getOptionalTypes()` | Campos opcionales |
| `getTaxTypes()` | Tipos de tributo |
| `getIvaReceptorTypes(claseCmp?)` | Condiciones IVA del receptor |
| `getQuotation(currencyId)` | Cotización de moneda |
| `getCountries()` | Países |
| `getActivities()` | Actividades AFIP |
| `getMaxRecordsPerRequest()` | Máximo de registros por request |
| `getCaea(period, order)` | Solicita CAEA (`YYYYMM`, quincena `1` \| `2`) |
| `consultCaea(period, order)` | Consulta CAEA vigente |
| `informCaeaNoMovement(caea, salesPoint)` | Informa sin movimiento en PV |
| `consultCaeaNoMovement(caea, salesPoint)` | Consulta sin movimiento |
| `informCaeaUsage(voucher, caea)` | Informa comprobante emitido con CAEA |

---

### `wsfexService` (WSFEX)

Guía detallada: [Facturación de exportación](/services/facturacion_electronica_exportacion)

| Método | Descripción |
| ------ | ----------- |
| `dummy()` | Estado del servicio |
| `authorize(input)` | Autoriza comprobante de exportación |
| `getCmp(input)` | Consulta comprobante por ID |
| `getLastCmp(input)` | Último comprobante autorizado |
| `getLastId(input)` | Último ID de comprobante |
| `checkPermiso(input)` | Valida permiso de embarque |
| `getParamCbteTipo(input)` | Tipos de comprobante exportación |
| `getParamTipoExpo(input)` | Tipos de exportación |
| `getParamIncoterms(input)` | Incoterms |
| `getParamIdiomas(input)` | Idiomas |
| `getParamUMed(input)` | Unidades de medida |
| `getParamDstPais(input)` | Países destino |
| `getParamDstCuit(input)` | CUITs destino |
| `getParamMon(input)` | Monedas |
| `getParamMonConCotizacion(input)` | Monedas con cotización |
| `getParamCtz(input)` | Cotización |
| `getParamPtoVenta(input)` | Puntos de venta |
| `getParamOpcionales(input)` | Opcionales |
| `getParamActividades(input)` | Actividades |

---

### `wsfecredService` (WSFECRED)

Guía detallada: [Factura de crédito MiPyMEs](/services/factura_credito_electronica)

| Método | Descripción |
| ------ | ----------- |
| `aceptarFECred(input)` | Acepta FCE como receptor |
| `rechazarFECred(input)` | Rechaza FCE |
| `rechazarNotaDC(input)` | Rechaza nota de débito/crédito |
| `informarCancelacionTotalFECred(input)` | Cancelación total |
| `modificarOpcionTransferencia(input)` | Modifica opción de transferencia |
| `consultarComprobantes(input)` | Lista comprobantes FCE |
| `consultarCtasCtes(input)` | Cuentas corrientes |
| `consultarCtaCte(input)` | Detalle de cuenta corriente |
| `consultarHistorialEstadosComprobante(input)` | Historial de estados de comprobante |
| `consultarHistorialEstadosCtaCte(input)` | Historial de estados de cuenta |
| `consultarObligadoRecepcion(input)` | Obligado a recepción |
| `consultarMontoObligadoRecepcion(input)` | Monto obligado recepción |
| `informarFacturaAgtDptoCltv(input)` | Informa factura agente depósito |
| `consultarFacturasAgtDptoCltv(input)` | Consulta facturas agente depósito |
| `consultarCuentasEnAgtDptoCltv()` | Cuentas en agente depósito |
| `obtenerRemitos(input)` | Remitos asociados |
| `consultarTiposRetenciones()` | Catálogo de retenciones |
| `consultarTiposMotivosRechazo()` | Motivos de rechazo |
| `consultarTiposFormasCancelacion()` | Formas de cancelación |
| `consultarTiposAjustesOperacion()` | Tipos de ajuste |

---

### `registerScopeFourService` (Padrón A4)

| Método | Descripción |
| ------ | ----------- |
| `getServerStatus()` | `dummy` del servicio |
| `getTaxpayerDetails(identifier)` | Datos del contribuyente por CUIT |

[Guía alcance 4](/services/consulta_padron_alcance_4)

---

### `registerScopeFiveService` (Padrón A5)

| Método | Descripción |
| ------ | ----------- |
| `getServerStatus()` | `dummy` del servicio |
| `getTaxpayerDetails(identifier)` | Un contribuyente |
| `getTaxpayersDetails(identifiers)` | Varios contribuyentes (lote) |

[Guía alcance 5](/services/consulta_padron_alcance_5)

---

### `registerScopeTenService` (Padrón A10)

| Método | Descripción |
| ------ | ----------- |
| `getServerStatus()` | `dummy` del servicio |
| `getTaxpayerDetails(identifier)` | Datos del contribuyente |

[Guía alcance 10](/services/consulta_padron_alcance_10)

---

### `registerScopeThirteenService` (Padrón A13)

| Método | Descripción |
| ------ | ----------- |
| `getServerStatus()` | `dummy` del servicio |
| `getTaxpayerDetails(identifier)` | Datos del contribuyente |
| `getTaxIDByDocument(documentNumber)` | CUIT a partir de documento |

[Guía alcance 13](/services/consulta_padron_alcance_13)

---

### `registerInscriptionProofService` (Constancia)

| Método | Descripción |
| ------ | ----------- |
| `getServerStatus()` | `dummy` del servicio |
| `getTaxpayerDetails(identifier)` | Constancia de un contribuyente |
| `getTaxpayersDetails(identifiers)` | Constancias en lote |

[Guía constancia](/services/consulta_padron_constancia_inscripcion)

---

### `genericService`

| Método | Descripción |
| ------ | ----------- |
| `call(serviceName, methodName, params, options?)` | Invoca cualquier operación SOAP; `options.wsdlContent` para WSDL externo |

```ts
await arca.genericService.call(
  ArcaServiceNames.WSFECRED,
  "consultarTiposRetenciones",
  {},
);
```

---

### `AuthRepository`

Instancia independiente de `Arca` para flujos WSAA manuales o serverless.

| Método | Descripción |
| ------ | ----------- |
| `login(serviceName)` | Ticket válido (cache/storage o nuevo login) |
| `requestLogin(serviceName)` | Fuerza solicitud WSAA y devuelve `AccessTicket` |
| `getAuthParams(ticket, cuit)` | Parámetros `Token` / `Sign` / `Cuit` para SOAP |

Use cases equivalentes exportados: `LoginUseCase`, `RequestLoginUseCase`, `GetAuthParamsUseCase`.

---

### Use cases (composición avanzada)

Cada método de servicio tiene un use case homónimo exportado desde `@arcasdk/core`. Podés instanciarlos con el puerto de repositorio correspondiente si armás tu propio wiring:

| Módulo | Ejemplos |
| ------ | -------- |
| `authentication` | `LoginUseCase`, `RequestLoginUseCase`, `GetAuthParamsUseCase` |
| `electronic-billing` | `CreateVoucherUseCase`, `GetCaeaUseCase`, `GetSalesPointsUseCase`, … |
| `register` | `GetTaxpayerDetailsUseCase`, `GetRegisterServerStatusUseCase`, … |
| `wsfex` | `AuthorizeUseCase`, `GetCmpUseCase`, `FexDummyUseCase`, … |
| `wsfecred` | `AceptarFECredUseCase`, `ConsultarComprobantesUseCase`, … |

Los tipos `I*RepositoryPort` también se exportan para inyectar implementaciones custom en tests o extensiones.
