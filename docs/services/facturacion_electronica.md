# Facturación Electrónica

El servicio `electronicBillingService` permite la gestión completa de comprobantes electrónicos (Facturas, Notas de Crédito, Débito, etc.) a través del Web Service de Facturación Electrónica (WSFE).

::: info Documentación Oficial
[Manual del Desarrollador - ARCA (PDF)](http://www.arca.gob.ar/fe/documentos/manual_desarrollador_COMPG_v2_10.pdf)
:::

[[toc]]

---

## Crear Comprobante (CAE)

El método principal para generar una factura y obtener el CAE.

### Parámetros de `createVoucher`

| Parámetro    | Tipo       | Descripción                                  |
| ------------ | ---------- | -------------------------------------------- |
| `CantReg`    | number     | Cantidad de registros (normalmente `1`)      |
| `PtoVta`     | number     | Punto de venta (1-9999)                      |
| `CbteTipo`   | number     | Tipo de comprobante (ver tabla)              |
| `Concepto`   | number     | Tipo de concepto (ver tabla)                 |
| `DocTipo`    | number     | Tipo de documento del receptor (ver tabla)   |
| `DocNro`     | number     | Nro de documento (`0` para Consumidor Final) |
| `CbteDesde`  | number     | Número de comprobante desde                  |
| `CbteHasta`  | number     | Número de comprobante hasta                  |
| `CbteFch`    | string     | Fecha en formato `YYYYMMDD`                  |
| `ImpTotal`   | number     | Importe total                                |
| `ImpNeto`    | number     | Importe neto gravado                         |
| `ImpIVA`     | number     | Importe IVA total                            |
| `ImpTotConc` | number     | Importe no gravado                           |
| `ImpOpEx`    | number     | Importe operaciones exentas                  |
| `ImpTrib`    | number     | Importe de tributos                          |
| `MonId`      | string     | Moneda (`PES`, `DOL`, etc.)                  |
| `MonCotiz`   | number     | Cotización de la moneda                      |
| `Iva`        | IVA[]      | Alícuotas de IVA aplicadas                   |
| `Tributos`   | Tributo[]  | _(opcional)_ Tributos adicionales            |
| `CbtesAsoc`  | CbteAsoc[] | _(opcional)_ Comprobantes asociados (NC/ND)  |

### Tipos de Comprobante (`CbteTipo`)

| Código | Descripción                        |
| ------ | ---------------------------------- |
| 1      | Factura A                          |
| 2      | Nota de Débito A                   |
| 3      | Nota de Crédito A                  |
| 6      | Factura B                          |
| 7      | Recibo B                           |
| 8      | Nota de Débito B                   |
| 9      | Nota de Crédito B                  |
| 11     | Factura C                          |
| 12     | Recibo C                           |
| 13     | Nota de Débito C                   |
| 14     | Nota de Crédito C                  |
| 51     | Factura M                          |
| 81     | Tique Factura A                    |
| 82     | Tique Factura B                    |
| 83     | Tique                              |
| 91     | Remito R                           |
| 118    | Tique Factura T                    |
| 201    | Factura de Crédito MiPyMEs (FCE) A |
| 206    | Factura de Crédito MiPyMEs (FCE) B |
| 211    | Factura de Crédito MiPyMEs (FCE) C |

### Tipos de Documento (`DocTipo`)

| Código | Descripción         |
| ------ | ------------------- |
| 80     | CUIT                |
| 86     | CUIL                |
| 87     | DNI                 |
| 89     | Libreta Cívica (LC) |
| 90     | Extranjeros         |
| 91     | Pasaporte           |
| 92     | Documento Mercosur  |
| 99     | Consumidor Final    |

### Conceptos (`Concepto`)

| Código | Descripción           |
| ------ | --------------------- |
| 1      | Productos             |
| 2      | Servicios             |
| 3      | Productos y Servicios |

### Códigos de Alícuota IVA (`Iva[].Id`)

| ID  | Tasa  |
| --- | ----- |
| 3   | 0%    |
| 4   | 10.5% |
| 5   | 21%   |
| 6   | 27%   |
| 7   | 5%    |
| 8   | 2.5%  |

### Respuesta (`CreateVoucherResultDto`)

`createVoucher` y `createNextVoucher` devuelven un `CreateVoucherResultDto` con los campos principales del CAE y, si AFIP los informa, errores u observaciones estructurados.

```ts
interface CreateVoucherResultDto {
  CAE?: string;
  CAEFchVto?: string;
  Resultado?: "A" | "R" | "P";
  Reproceso?: "S" | "N";
  PtoVta?: number;
  CbteTipo?: number;
  // ... FECAEDetResponse, errors, etc.
}
```

Los mismos métodos existen como `createInvoice` y `createNextInvoice` (equivalentes a `createVoucher` y `createNextVoucher`).

### Ejemplo Básico

```ts
const invoice = await arca.electronicBillingService.createVoucher({
  CantReg: 1,
  PtoVta: 1,
  CbteTipo: 6, // Factura B
  Concepto: 1, // Productos
  DocTipo: 99, // Consumidor Final
  DocNro: 0,
  CbteDesde: 1,
  CbteHasta: 1,
  CbteFch: "20240101", // String en formato YYYYMMDD
  ImpTotal: 121,
  ImpTotConc: 0,
  ImpNeto: 100,
  ImpOpEx: 0,
  ImpIVA: 21,
  ImpTrib: 0,
  MonId: "PES",
  MonCotiz: 1,
  Iva: [
    {
      Id: 5, // 21%
      BaseImp: 100,
      Importe: 21,
    },
  ],
});
```

::: details Ver respuesta completa

```json
{
  "CAE": "74154876254185",
  "CAEFchVto": "20240111",
  "Resultado": "A",
  "Reproceso": "N",
  "PtoVta": 1,
  "CbteTipo": 6
}
```

:::

---

## Siguiente Comprobante Automático

`createNextVoucher` combina `getLastVoucher` + `createVoucher` en un solo paso. No requiere `CbteDesde` ni `CbteHasta`.

```ts
const invoice = await arca.electronicBillingService.createNextVoucher({
  CantReg: 1,
  PtoVta: 1,
  CbteTipo: 6,
  Concepto: 1,
  DocTipo: 99,
  DocNro: 0,
  CbteFch: "20240501",
  ImpTotal: 121,
  ImpTotConc: 0,
  ImpNeto: 100,
  ImpOpEx: 0,
  ImpIVA: 21,
  ImpTrib: 0,
  MonId: "PES",
  MonCotiz: 1,
  Iva: [{ Id: 5, BaseImp: 100, Importe: 21 }],
});
```

---

## Consultar Último Comprobante

Obtiene el número del último comprobante autorizado para un punto de venta y tipo específico.

```ts
const lastVoucher = await arca.electronicBillingService.getLastVoucher(1, 6);
// getLastVoucher(puntoVenta, tipoComprobante)

if (lastVoucher.cbteNro !== undefined) {
  console.log(`Último comprobante: ${lastVoucher.cbteNro}`);
}
```

---

## Información de Comprobante

Recupera los datos de un comprobante ya emitido.

```ts
const voucherInfo = await arca.electronicBillingService.getVoucherInfo(1, 1, 6);
// getVoucherInfo(nroComprobante, puntoVenta, tipoComprobante)

if (voucherInfo) {
  console.log("Datos del comprobante:", voucherInfo);
} else {
  console.log("El comprobante no existe.");
}
```

---

## Tablas de Referencia

Métodos auxiliares para obtener los códigos y tipos disponibles en ARCA.

::: code-group

```ts [Puntos de Venta]
const salesPoints = await arca.electronicBillingService.getSalesPoints();
```

```ts [Tipos Comprobante]
const voucherTypes = await arca.electronicBillingService.getVoucherTypes();
```

```ts [Conceptos]
const conceptTypes = await arca.electronicBillingService.getConceptTypes();
```

```ts [Documentos]
const documentTypes = await arca.electronicBillingService.getDocumentTypes();
```

```ts [Alícuotas]
const aliquotTypes = await arca.electronicBillingService.getAliquotTypes();
```

```ts [Monedas]
const currencies = await arca.electronicBillingService.getCurrencyTypes();
```

```ts [Tributos]
const taxTypes = await arca.electronicBillingService.getTaxTypes();
```

```ts [Opcionales]
const optionalTypes = await arca.electronicBillingService.getOptionalTypes();
```

```ts [IVA Receptor]
const ivaReceptorTypes =
  await arca.electronicBillingService.getIvaReceptorTypes();
// Parámetro opcional: claseCmp (string)
```

```ts [Países]
const countries = await arca.electronicBillingService.getCountries();
```

```ts [Actividades]
const activities = await arca.electronicBillingService.getActivities();
```

```ts [Cotización]
const quotation = await arca.electronicBillingService.getQuotation("DOL");
```

```ts [Máx. registros]
const maxRecords =
  await arca.electronicBillingService.getMaxRecordsPerRequest();
```

:::

---

## CAEA (Código de Autorización Electrónico Anticipado)

El flujo CAEA permite emitir comprobantes sin solicitar CAE en cada operación, usando un código anticipado por quincena.

### Periodo y orden

- `period`: entero `YYYYMM` (ej. `202406` para junio 2024).
- `order`: `1` (1.ª quincena) o `2` (2.ª quincena).

```ts
const period = 202406;
const order = 1;

const caeaResponse = await arca.electronicBillingService.getCaea(period, order);
const caea = caeaResponse.resultGet?.caea;
```

### Consultar CAEA vigente

```ts
const consulted = await arca.electronicBillingService.consultCaea(period, order);
```

### Sin movimiento en un punto de venta

```ts
const informed = await arca.electronicBillingService.informCaeaNoMovement(
  caea,
  puntoVenta,
);

const status = await arca.electronicBillingService.consultCaeaNoMovement(
  caea,
  puntoVenta,
);
```

### Informar comprobante con CAEA

`informCaeaUsage` recibe el payload del comprobante (misma forma que `createVoucher`) más el código CAEA:

```ts
const usage = await arca.electronicBillingService.informCaeaUsage(
  {
    CantReg: 1,
    PtoVta: 1,
    CbteTipo: 6,
    Concepto: 1,
    DocTipo: 99,
    DocNro: 0,
    CbteDesde: 1,
    CbteHasta: 1,
    CbteFch: "20240615",
    ImpTotal: 121,
    ImpTotConc: 0,
    ImpNeto: 100,
    ImpOpEx: 0,
    ImpIVA: 21,
    ImpTrib: 0,
    MonId: "PES",
    MonCotiz: 1,
    Iva: [{ Id: 5, BaseImp: 100, Importe: 21 }],
  },
  caea,
);
```

::: info Disponibilidad en homologación
CAEA puede no estar habilitado para todos los periodos en testing. La respuesta incluye `errors` estructurados de AFIP cuando el código no está disponible.
:::

---

## Estado del Servidor

Verifica si los servicios de ARCA están operativos.

```ts
const status = await arca.electronicBillingService.getServerStatus();
console.log(status);
```
