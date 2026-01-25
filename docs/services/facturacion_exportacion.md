# 🌍 Facturación de Exportación (WSFEX)

El servicio `wsfexService` permite emitir y consultar comprobantes de exportación mediante el Web Service de Facturación de Exportación (WSFEX).

[[toc]]

## Autorizar comprobante

```ts
const result = await arca.wsfexService.authorize({
  Cbte_tipo: 19,
  Punto_vta: 1,
  Cbte_nro: 1,
  Fecha_cbte: "20240123",
  Tipo_expo: 1,
  Permiso_existente: "N",
  Dst_cmp: 212,
  Cliente: "Cliente del exterior",
  Cuit_pais_cliente: 1234567890123,
  Domicilio_cliente: "Calle 123",
  Moneda_Id: "USD",
  Moneda_ctz: 900.5,
  Imp_total: 1000,
  Idioma_cbte: 1,
});
```

## Consultar comprobante

```ts
const cmp = await arca.wsfexService.getCmp({
  Cbte_tipo: 19,
  Punto_vta: 1,
  Cbte_nro: 1,
});
```

## Último comprobante autorizado

```ts
const last = await arca.wsfexService.getLastCmp({
  Pto_venta: 1,
  Cbte_Tipo: 19,
});
```

## Tablas de referencia

::: code-group

```ts [Puntos de Venta]
const points = await arca.wsfexService.getParamPtoVenta();
```

```ts [Tipos de Comprobante]
const types = await arca.wsfexService.getParamCbteTipo();
```

```ts [Tipos de Exportación]
const exportTypes = await arca.wsfexService.getParamTipoExpo();
```

```ts [Incoterms]
const incoterms = await arca.wsfexService.getParamIncoterms();
```

```ts [Monedas]
const currencies = await arca.wsfexService.getParamMon();
```

```ts [Cotización por Moneda]
const quote = await arca.wsfexService.getParamCtz({
  Mon_id: "USD",
  FchCotiz: "20240123",
});
```

```ts [Monedas con Cotización]
const withQuote = await arca.wsfexService.getParamMonCotizacion({
  Fecha_CTZ: "20240123",
});
```

:::

## Estado del servidor

```ts
const status = await arca.wsfexService.getServerStatus();
console.log(status);
```