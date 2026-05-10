# Facturación Electrónica de Exportación

El servicio `wsfexService` permite la gestión de comprobantes electrónicos de exportación a través del Web Service de Facturación Electrónica de Exportación (WSFEX).

::: info Documentación Oficial
[Manual del Desarrollador WSFEX - ARCA (PDF)](https://www.afip.gob.ar/fe/documentos/WSFEX-Manualparaeldesarrollador_V1.7.pdf)
:::

[[toc]]

---

## Autorizar Comprobante de Exportación

El método `authorize` genera un comprobante de exportación y obtiene el CAE.

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
| `Cmp.Moneda_Id`         | string | Moneda (`DOL`, `PES`, etc.)        |
| `Cmp.Moneda_ctz`        | number | Cotización de la moneda            |
| `Cmp.Imp_total`         | number | Importe total                      |
| `Cmp.Obs`               | string | Observaciones                      |
| `Cmp.Forma_pago`        | string | Forma de pago                      |
| `Cmp.Incoterms`         | string | Código Incoterm                    |
| `Cmp.Incoterms_Ds`      | string | Descripción Incoterm               |
| `Cmp.Idioma_cbte`       | number | Idioma del comprobante (ver tabla) |
| `Cmp.Items`             | object | Detalle de ítems                   |
| `Cmp.Fecha_pago`        | string | Fecha de pago (`YYYYMMDD`)         |

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

Obtiene el último comprobante autorizado para el CUIT autenticado.

```ts
const result = await arca.wsfexService.getLastCmp({});
console.log(result.FEXGetLast_CMPResult);
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
// Factura E (19), NC E (20), ND E (21)
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
// 203: Brasil, 212: Chile, etc.
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
