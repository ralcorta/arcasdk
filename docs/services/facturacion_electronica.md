# 💸 Facturación Electrónica

El servicio `electronicBillingService` permite la gestión completa de comprobantes electrónicos (Facturas, Notas de Crédito, Débito, etc.) a través del Web Service de Facturación Electrónica (WSFE).

::: info Documentación Oficial
[Manual del Desarrollador (PDF)](http://www.arca.gob.ar/fe/documentos/manual_desarrollador_COMPG_v2_10.pdf)
:::

[[toc]]

## Crear Comprobante (CAE)

El método principal para generar una factura y obtener el CAE.

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

## Consultar Último Comprobante

Obtiene el número del último comprobante autorizado para un punto de venta y tipo específico.

```ts
// Consultar último comprobante para Punto de Venta 1, Tipo 6 (Factura B)
const lastVoucher = await arca.electronicBillingService.getLastVoucher(1, 6);
console.log(`Último comprobante: ${lastVoucher}`);
```

## Información de Comprobante

Recupera los datos de un comprobante ya emitido.

```ts
const voucherInfo = await arca.electronicBillingService.getVoucherInfo(1, 1, 6);

if (voucherInfo) {
  console.log("Datos del comprobante:", voucherInfo);
} else {
  console.log("El comprobante no existe.");
}
```

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
const currencies = await arca.electronicBillingService.getCurrenciesTypes();
```

```ts [Tributos]
const taxTypes = await arca.electronicBillingService.getTaxTypes();
```

:::

## Estado del Servidor

Verifica si los servicios de ARCA están operativos.

```ts
const status = await arca.electronicBillingService.getServerStatus();
console.log(status);
```
