# 💳 Factura de Crédito Electrónica (WSFEcred)

El servicio `wsfecredService` permite gestionar Facturas de Crédito Electrónicas MiPyMEs mediante el Web Service de Factura de Crédito Electrónica (WSFEcred).

[[toc]]

## Aceptar factura

```ts
const result = await arca.wsfecredService.aceptarFECred({
  rolCUITRepresentada: "COMPRADOR",
  idCtaCte: 123456789,
  tipoCancelacion: "PAR",
  importeCancelado: 1000,
});
```

## Rechazar factura

```ts
const result = await arca.wsfecredService.rechazarFECred({
  rolCUITRepresentada: "COMPRADOR",
  idCtaCte: 123456789,
  codMotivoRechazo: 12,
  descMotivoRechazo: "Diferencia en condiciones",
});
```

## Rechazar nota de débito/crédito

```ts
const result = await arca.wsfecredService.rechazarNotaDC({
  rolCUITRepresentada: "COMPRADOR",
  idComprobante: 987654321,
  codMotivoRechazo: 5,
});
```

## Informar factura a agente de depósito colectivo

```ts
const result = await arca.wsfecredService.informarFacturaAgtDptoCltv({
  rolCUITRepresentada: "VENDEDOR",
  idCtaCte: 123456789,
  codAgtDptoCltv: "BCBA",
});
```

## Informar cancelación total

```ts
const result = await arca.wsfecredService.informarCancelacionTotalFECred({
  rolCUITRepresentada: "COMPRADOR",
  idCtaCte: 123456789,
  importeCancelacion: 1500,
});
```

## Modificar opción de transferencia

```ts
const result = await arca.wsfecredService.modificarOpcionTransferencia({
  rolCUITRepresentada: "VENDEDOR",
  idCtaCte: 123456789,
  opcionTransferencia: "ADC",
});
```

## Consultas

La consulta de obligación de recepción por monto reemplaza a la operación
`consultarObligadoRecepcion`, que está deprecada por AFIP.

::: code-group

```ts [Comprobantes]
const data = await arca.wsfecredService.consultarComprobantes({
  rolCUITRepresentada: "COMPRADOR",
  nroPagina: 1,
});
```

```ts [Cuenta Corriente]
const cta = await arca.wsfecredService.consultarCtaCte({
  rolCUITRepresentada: "COMPRADOR",
  idCtaCte: 123456789,
});
```

```ts [Cuentas Corrientes]
const ctas = await arca.wsfecredService.consultarCtasCtes({
  rolCUITRepresentada: "COMPRADOR",
  nroPagina: 1,
});
```

```ts [Historial de estados]
const history = await arca.wsfecredService.consultarHistorialEstadosComprobante({
  rolCUITRepresentada: "COMPRADOR",
  idComprobante: 987654321,
});
```

```ts [Obligación de recepción por monto]
const obligado = await arca.wsfecredService.consultarMontoObligadoRecepcion({
  rolCUITRepresentada: "COMPRADOR",
  cuitConsultada: 20210861220,
  importeComprobante: 1000,
  fechaEmision: "2024-01-01",
});
```

```ts [Tipos de motivos de rechazo]
const reasons = await arca.wsfecredService.consultarTiposMotivosRechazo({
  rolCUITRepresentada: "COMPRADOR",
});
```

```ts [Tipos de formas de cancelación]
const cancelTypes = await arca.wsfecredService.consultarTiposFormasCancelacion({
  rolCUITRepresentada: "COMPRADOR",
});
```

```ts [Tipos de retenciones]
const retenciones = await arca.wsfecredService.consultarTiposRetenciones({
  rolCUITRepresentada: "COMPRADOR",
});
```

```ts [Remitos asociados]
const remitos = await arca.wsfecredService.obtenerRemitos({
  rolCUITRepresentada: "COMPRADOR",
  idComprobante: 987654321,
});
```

:::

## Estado del servidor

```ts
const status = await arca.wsfecredService.getServerStatus();
console.log(status);
```
