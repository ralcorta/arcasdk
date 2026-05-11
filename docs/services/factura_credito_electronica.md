# Factura de Crédito Electrónica MiPyMEs

El servicio `wsfecredService` permite gestionar Facturas de Crédito Electrónicas MiPyMEs (FCE) a través del Web Service de Factura de Crédito (WSFECred).

::: info Documentación Oficial
[Manual del Desarrollador WSFECred - ARCA](https://www.afip.gob.ar/facturadecreditoelectronica/documentos/manual-desarrollador-V2.19.pdf)
:::

[[toc]]

---

## Aceptar Factura de Crédito

Acepta una Factura de Crédito Electrónica recibida.

```ts
const result = await arca.wsfecredService.aceptarFECred({
  idCtaCte: { CUITEmisor: 20111111112, codTipoCmp: 201, ptoVta: 1, nroCmp: 1 },
  arrayConfirmarNotasDC: { confirmarNotaDC: [] },
  arrayFormasCancelacion: {
    formaCancelacion: [{ codigo: 1, descripcion: "Acreditación en cuenta" }],
  },
  arrayRetenciones: { retencion: [] },
  arrayAjustesOperacion: { ajusteOperacion: [] },
  tipoCancelacion: "TOT",
  importeCancelado: 10000,
  importeTotalRetPesos: 0,
  importeEmbargoPesos: 0,
  saldoAceptado: 10000,
  codMoneda: "PES",
  cotizacionMonedaUlt: 1,
  informaCBU: "N",
  CBUComprador: "",
});
```

---

## Rechazar Factura de Crédito

Rechaza una Factura de Crédito Electrónica recibida.

```ts
const result = await arca.wsfecredService.rechazarFECred({
  idCtaCte: { CUITEmisor: 20111111112, codTipoCmp: 201, ptoVta: 1, nroCmp: 1 },
  arrayMotivosRechazo: {
    motivoRechazo: [{ codigo: 1, descripcion: "No corresponde" }],
  },
});
```

---

## Rechazar Nota de Débito/Crédito

Rechaza una Nota de Débito o Crédito asociada a una FCE.

```ts
const result = await arca.wsfecredService.rechazarNotaDC({
  idComprobante: {
    CUITEmisor: 20111111112,
    codTipoCmp: 202,
    ptoVta: 1,
    nroCmp: 1,
  },
  arrayMotivosRechazo: {
    motivoRechazo: [{ codigo: 2, descripcion: "Importe incorrecto" }],
  },
});
```

---

## Informar Cancelación Total

Informa la cancelación total de una cuenta corriente FCE.

```ts
const result = await arca.wsfecredService.informarCancelacionTotalFECred({
  idCtaCte: { CUITEmisor: 20111111112, codTipoCmp: 201, ptoVta: 1, nroCmp: 1 },
  arrayFormasCancelacion: {
    formaCancelacion: [{ codigo: 1, descripcion: "Acreditación en cuenta" }],
  },
  importeCancelacion: 10000,
});
```

---

## Modificar Opción de Transferencia

Modifica la opción de transferencia de una cuenta corriente (SCA o ADC).

```ts
const result = await arca.wsfecredService.modificarOpcionTransferencia({
  idCtaCte: { CUITEmisor: 20111111112, codTipoCmp: 201, ptoVta: 1, nroCmp: 1 },
  opcionTransferencia: "SCA", // o "ADC"
});
```

---

## Consultar Comprobantes

Consulta comprobantes de FCE según filtros.

```ts
const result = await arca.wsfecredService.consultarComprobantes({
  rolCUITRepresentada: "Emisor", // o "Receptor"
  CUITContraparte: 30716756411,
  codTipoCmp: 201,
  estadoCmp: "Aceptado",
  fecha: { desde: "2024-01-01", hasta: "2024-12-31" },
  codCtaCte: 0,
  estadoCtaCte: "Aceptada",
  nroPagina: 1,
});

console.log(result.consultarCmpReturn);
```

---

## Consultar Cuentas Corrientes

Consulta las cuentas corrientes de FCE.

```ts
const result = await arca.wsfecredService.consultarCtasCtes({
  rolCUITRepresentada: "Receptor",
  CUITContraparte: 30716756411,
  fecha: { desde: "2024-01-01", hasta: "2024-12-31" },
  estadoCtaCte: "Aceptada",
  nroPagina: 1,
  opcionTransferencia: "SCA",
});

console.log(result.consultarCtasCtesReturn);
```

---

## Consultar Cuenta Corriente Individual

Consulta una cuenta corriente específica.

```ts
const result = await arca.wsfecredService.consultarCtaCte({
  idCtaCte: { CUITEmisor: 20111111112, codTipoCmp: 201, ptoVta: 1, nroCmp: 1 },
});

console.log(result.consultarCtaCteReturn);
```

---

## Consultar Obligado a Recepción

Verifica si un CUIT está obligado a recepcionar FCE.

```ts
const result = await arca.wsfecredService.consultarObligadoRecepcion({
  cuitConsultada: 30716756411,
});

console.log(result.consultarObligadoRecepcionReturn);
```

---

## Consultar Monto Obligado Recepción

Consulta el monto a partir del cual un CUIT está obligado a recepcionar FCE.

```ts
const result = await arca.wsfecredService.consultarMontoObligadoRecepcion({
  cuitConsultada: 30716756411,
});

console.log(result.consultarMontoObligadoRecepcionReturn);
```

---

## Historial de Estados

### Historial de un Comprobante

```ts
const result = await arca.wsfecredService.consultarHistorialEstadosComprobante({
  idComprobante: {
    CUITEmisor: 20111111112,
    codTipoCmp: 201,
    ptoVta: 1,
    nroCmp: 1,
  },
});

console.log(result.consultarHistorialEstadosCmpReturn);
```

### Historial de una Cuenta Corriente

```ts
const result = await arca.wsfecredService.consultarHistorialEstadosCtaCte({
  idCtaCte: { CUITEmisor: 20111111112, codTipoCmp: 201, ptoVta: 1, nroCmp: 1 },
});

console.log(result.consultarHistorialEstadosCtaCteReturn);
```

---

## Agente de Depósito Colectivo

### Informar Factura a Agente

```ts
const result = await arca.wsfecredService.informarFacturaAgtDptoCltv({
  idCtaCte: { CUITEmisor: 20111111112, codTipoCmp: 201, ptoVta: 1, nroCmp: 1 },
  ctaAgente: { cuit: 30000000001, nroCuenta: "1234567890" },
});
```

### Consultar Facturas en Agente

```ts
const result = await arca.wsfecredService.consultarFacturasAgtDptoCltv({
  idCtaCte: { CUITEmisor: 20111111112, codTipoCmp: 201, ptoVta: 1, nroCmp: 1 },
  filtroFecha: { desde: "2024-01-01", hasta: "2024-12-31" },
});
```

### Consultar Cuentas en Agente

```ts
const result = await arca.wsfecredService.consultarCuentasEnAgtDptoCltv();
console.log(result.consultarCuentasEnAgtDptoCltvReturn);
```

---

## Obtener Remitos

Obtiene los remitos asociados a un comprobante FCE.

```ts
const result = await arca.wsfecredService.obtenerRemitos({
  idComprobante: {
    CUITEmisor: 20111111112,
    codTipoCmp: 201,
    ptoVta: 1,
    nroCmp: 1,
  },
});

console.log(result.obtenerRemitosReturn);
```

---

## Tablas de Referencia

Métodos para obtener los códigos y tipos válidos.

::: code-group

```ts [Tipos de Retenciones]
const result = await arca.wsfecredService.consultarTiposRetenciones();
console.log(result.consultarTiposRetencionesReturn);
```

```ts [Motivos de Rechazo]
const result = await arca.wsfecredService.consultarTiposMotivosRechazo();
console.log(result.codigoDescripcionReturn);
```

```ts [Formas de Cancelación]
const result = await arca.wsfecredService.consultarTiposFormasCancelacion();
console.log(result.codigoDescripcionReturn);
```

```ts [Ajustes de Operación]
const result = await arca.wsfecredService.consultarTiposAjustesOperacion();
console.log(result.codigoDescripcionReturn);
```

:::

---

## Estados de Comprobante

| Estado             | Descripción                       |
| ------------------ | --------------------------------- |
| PendienteRecepcion | Pendiente de recepción por MiPyME |
| Recepcionado       | Recepcionado por MiPyME           |
| Aceptado           | Aceptado                          |
| Rechazado          | Rechazado                         |
| InformadaAgDpto    | Informada a Agente de Depósito    |

## Estados de Cuenta Corriente

| Estado          | Descripción                              |
| --------------- | ---------------------------------------- |
| Modificable     | Aún puede recibir notas de DC            |
| Aceptada        | Aceptada por el receptor                 |
| Rechazada       | Rechazada por el receptor                |
| CanceladaTotal  | Cancelada totalmente                     |
| InformadaAgDpto | Informada a Agente de Depósito Colectivo |

## Tipos de Cancelación

| Código | Descripción         |
| ------ | ------------------- |
| PAR    | Cancelación parcial |
| TOT    | Cancelación total   |

## Opciones de Transferencia

| Código | Descripción                      |
| ------ | -------------------------------- |
| SCA    | Sin Cláusula de No Transferencia |
| ADC    | A Disposición del Comprador      |
