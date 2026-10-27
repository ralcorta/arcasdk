# Facturación Electrónica de Exportación

El servicio `wsfexService` permite la gestión de comprobantes electrónicos de exportación a través del Web Service de Facturación Electrónica de Exportación (WSFEX).

::: info Documentación Oficial
[Manual del Desarrollador WSFEX - ARCA (PDF)](https://www.afip.gob.ar/fe/documentos/WSFEX-Manualparaeldesarrollador_V1.7.pdf)
:::

[[toc]]

---

## Emitir Factura E

`createNextVoucher` es la forma recomendada de emitir. Asigna el `Id` de la solicitud y el número de comprobante (el último autorizado + 1). Después autoriza el comprobante y devuelve el CAE.

Recibe los mismos campos que `authorize`, sin `Id` ni `Cbte_nro`. Los campos opcionales del WSDL se pueden omitir.

```ts
import { CurrencyIds, ExportVoucherTypes } from "@arcasdk/core";

// Cotización de la moneda del comprobante
const ctz = await arca.wsfexService.getParamCtz({
  Mon_id: CurrencyIds.EUR,
  FchCotiz: "20261027",
});

const { cae, caeFchVto, response } = await arca.wsfexService.createNextVoucher({
  Cbte_Tipo: ExportVoucherTypes.FACTURA_E,
  Punto_vta: 3,
  Fecha_cbte: "20261027",
  Tipo_expo: 2, // Servicios
  Dst_cmp: 212, // País de destino (Estados Unidos): getParamDstPais()
  Cliente: "Acme Inc.",
  Cuit_pais_cliente: 55000002206, // CUIT del país del cliente: getParamDstCuit()
  Domicilio_cliente: "1 Main St, Miami, FL, USA",
  Id_impositivo: "12-3456789",
  Moneda_Id: CurrencyIds.EUR, // o CurrencyIds.USD
  Moneda_ctz: ctz.FEXGetPARAM_CtzResult.FEXResultGet.Mon_ctz,
  Imp_total: 1000,
  Idioma_cbte: 1, // Español
  Fecha_pago: "20261126", // Obligatoria para servicios (Tipo_expo 2 y 4)
  Items: {
    Item: [
      {
        Pro_codigo: "SRV-1",
        Pro_ds: "Desarrollo de software",
        Pro_qty: 1,
        Pro_umed: 7, // Unidades
        Pro_precio_uni: 1000,
        Pro_bonificacion: 0,
        Pro_total_item: 1000,
      },
    ],
  },
  Actividades: { Actividad: [{ Id: 620100 }] }, // getParamActividades()
});

if (!cae) {
  // Rechazado: el motivo está en FEXErr y en FEXResultAuth.Motivos_Obs
  console.error(response.FEXErr, response.FEXResultAuth?.Motivos_Obs);
}
```

- `cae` y `caeFchVto` quedan vacíos si ARCA rechaza el comprobante.
- Si ARCA no devuelve el último `Id` o el último número, `createNextVoucher` lanza un error y no envía el comprobante. Por ejemplo, cuando el punto de venta no está habilitado para exportación.
- `Permiso_existente` (`"S"` / `"N"`) aplica solo a exportación de bienes (`Tipo_expo: 1`). En servicios, se omite.

### Monedas

`CurrencyIds` tiene los códigos de ARCA de las monedas más comunes: `PESOS` (`"PES"`), `USD` (`"DOL"`) y `EUR` (`"060"`). Para otras monedas, consultá el catálogo completo con `getParamMon()`.

### Actividades

`getParamActividades()` devuelve las actividades habilitadas del emisor, es decir, del CUIT con el que se autentica el SDK. Pasá sus `Id` en `Actividades`:

```ts
const { FEXGetPARAM_ActividadesResult } =
  await arca.wsfexService.getParamActividades({});
const actividades =
  FEXGetPARAM_ActividadesResult.FEXResultGet?.ClsFEXResponse_ActividadTipo ?? [];
// [{ Id: 620100, Orden: 1, Desc: "..." }]

await arca.wsfexService.createNextVoucher({
  // ...
  Actividades: { Actividad: actividades.map((a) => ({ Id: a.Id })) },
});
```

En WSFEX, `Actividades` va con la forma del WSDL (`{ Actividad: [...] }`). En WSFE (`createVoucher`), en cambio, se pasa como array `[{ Id }]` y el SDK lo envuelve.

---

## Autorizar Comprobante de Exportación

El método `authorize` genera un comprobante de exportación y obtiene el CAE. Tenés que enviar el `Id` y el `Cbte_nro` vos mismo; para que se asignen solos, usá `createNextVoucher`.

### Parámetros de `authorize`

| Parámetro               | Tipo   | Descripción                        |
| ----------------------- | ------ | ---------------------------------- |
| `Cmp.Id`                | number | ID único de la solicitud           |
| `Cmp.Fecha_cbte`        | string | Fecha del comprobante (`YYYYMMDD`) |
| `Cmp.Cbte_Tipo`         | number | Tipo de comprobante (ver tabla)    |
| `Cmp.Punto_vta`         | number | Punto de venta                     |
| `Cmp.Cbte_nro`          | number | Número de comprobante              |
| `Cmp.Tipo_expo`         | number | Tipo de exportación (ver tabla)    |
| `Cmp.Permiso_existente` | string | `"S"` o `"N"`                      |
| `Cmp.Permisos`          | object | Permisos de embarque               |
| `Cmp.Dst_cmp`           | number | País de destino (código)           |
| `Cmp.Cliente`           | string | Nombre del cliente                 |
| `Cmp.Cuit_pais_cliente` | number | CUIT del país del cliente          |
| `Cmp.Domicilio_cliente` | string | Domicilio del cliente              |
| `Cmp.Id_impositivo`     | string | ID impositivo del cliente          |
| `Cmp.Moneda_Id`         | string | Moneda (`DOL`, `060`, `PES`, etc.) |
| `Cmp.Moneda_ctz`        | number | Cotización de la moneda            |
| `Cmp.Imp_total`         | number | Importe total                      |
| `Cmp.Obs`               | string | Observaciones                      |
| `Cmp.Forma_pago`        | string | Forma de pago                      |
| `Cmp.Incoterms`         | string | Código Incoterm                    |
| `Cmp.Incoterms_Ds`      | string | Descripción Incoterm               |
| `Cmp.Idioma_cbte`       | number | Idioma del comprobante (ver tabla) |
| `Cmp.Items`             | object | Detalle de ítems                   |
| `Cmp.Fecha_pago`        | string | Fecha de pago (`YYYYMMDD`)         |
| `Cmp.Actividades`       | object | Actividades vinculadas             |

### Ejemplo

```ts
const result = await arca.wsfexService.authorize({
  Cmp: {
    Id: 1,
    Fecha_cbte: "20240601",
    Cbte_Tipo: 19, // Factura E
    Punto_vta: 1,
    Cbte_nro: 1,
    Tipo_expo: 1, // Exportación definitiva
    Permiso_existente: "N",
    Permisos: { Permiso: [] },
    Dst_cmp: 203, // Brasil
    Cliente: "Cliente Exportación SA",
    Cuit_pais_cliente: 50000000016,
    Domicilio_cliente: "Av. Paulista 1000, São Paulo",
    Id_impositivo: "123456789",
    Moneda_Id: "DOL",
    Moneda_ctz: 900.5,
    CanMisMonExt: "N",
    Obs_comerciales: "",
    Imp_total: 1000,
    Obs: "",
    Cmps_asoc: { Cmp_asoc: [] },
    Forma_pago: "Transferencia bancaria",
    Incoterms: "FOB",
    Incoterms_Ds: "Free on Board",
    Idioma_cbte: 1, // Español
    Items: {
      Item: [
        {
          Pro_codigo: "001",
          Pro_ds: "Servicio de consultoría",
          Pro_qty: 1,
          Pro_umed: 7, // Unidad
          Pro_precio_uni: 1000,
          Pro_total_item: 1000,
        },
      ],
    },
    Opcionales: { Opcional: [] },
    Fecha_pago: "20240615",
    Actividades: { Actividad: [] },
  },
});
```

---

## Consultar Comprobante

Recupera los datos de un comprobante de exportación ya emitido.

```ts
const result = await arca.wsfexService.getCmp({
  Cmp: {
    Cbte_tipo: 19,
    Punto_vta: 1,
    Cbte_nro: 1,
  },
});

console.log(result.FEXGetCMPResult);
```

---

## Último Comprobante Autorizado

Obtiene el último comprobante autorizado para un punto de venta y tipo de comprobante.

```ts
const result = await arca.wsfexService.getLastCmp({
  Pto_venta: 1,
  Cbte_Tipo: 19,
});
console.log(result.FEXGetLast_CMPResult.FEXResult_LastCMP.Cbte_nro);
```

---

## Último ID de Solicitud

Obtiene el último ID de solicitud utilizado.

```ts
const result = await arca.wsfexService.getLastId({});
console.log(result.FEXGetLast_IDResult);
```

---

## Verificar Permiso de Embarque

Verifica si un permiso de embarque es válido para un destino.

```ts
const result = await arca.wsfexService.checkPermiso({
  ID_Permiso: "01234567890123",
  Dst_merc: 203, // Brasil
});

console.log(result.FEXCheck_PermisoResult);
```

---

## Cotización de Moneda

Obtiene la cotización de una moneda para una fecha dada.

```ts
const result = await arca.wsfexService.getParamCtz({
  Mon_id: "DOL",
  FchCotiz: "20240601",
});

console.log(result.FEXGetPARAM_CtzResult);
```

---

## Tablas de Referencia

Métodos para obtener los códigos y tipos válidos.

::: code-group

```ts [Tipos Comprobante]
const result = await arca.wsfexService.getParamCbteTipo({});
// Factura E (19), ND E (20), NC E (21)
```

```ts [Tipos Exportación]
const result = await arca.wsfexService.getParamTipoExpo({});
// 1: Definitiva, 2: Bienes bajo suspensión, etc.
```

```ts [Incoterms]
const result = await arca.wsfexService.getParamIncoterms({});
// FOB, CIF, EXW, etc.
```

```ts [Idiomas]
const result = await arca.wsfexService.getParamIdiomas({});
// 1: Español, 2: Inglés, 3: Portugués
```

```ts [Unidades de Medida]
const result = await arca.wsfexService.getParamUMed({});
// 7: Unidad, 1: Kg, etc.
```

```ts [Países Destino]
const result = await arca.wsfexService.getParamDstPais({});
// 203: Brasil, 212: Estados Unidos, etc.
```

```ts [CUIT Destino]
const result = await arca.wsfexService.getParamDstCuit({});
```

```ts [Monedas]
const result = await arca.wsfexService.getParamMon({});
// DOL, PES, EUR, etc.
```

```ts [Monedas con Cotización]
const result = await arca.wsfexService.getParamMonConCotizacion({
  Fecha_CTZ: "20240601",
});
```

```ts [Puntos de Venta]
const result = await arca.wsfexService.getParamPtoVenta({});
```

```ts [Opcionales]
const result = await arca.wsfexService.getParamOpcionales({});
```

```ts [Actividades]
const result = await arca.wsfexService.getParamActividades({});
```

:::

---

## Tipos de Comprobante de Exportación

| Código | Descripción                      |
| ------ | -------------------------------- |
| 19     | Factura de Exportación E         |
| 20     | Nota de Débito de Exportación E  |
| 21     | Nota de Crédito de Exportación E |

## Tipos de Exportación

| Código | Descripción                      |
| ------ | -------------------------------- |
| 1      | Exportación definitiva de bienes |
| 2      | Servicios                        |
| 4      | Otros                            |

---

## Estado del Servidor

Verifica si los servicios de WSFEX están operativos.

```ts
const status = await arca.wsfexService.dummy();
console.log(status.FEXDummyResult);
// { AppServer: "OK", DbServer: "OK", AuthServer: "OK" }
```
