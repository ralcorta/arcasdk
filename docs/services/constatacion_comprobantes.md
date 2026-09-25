# Constatación de Comprobantes (WSCDC)

El servicio `wscdcService` verifica contra las bases de ARCA que un comprobante emitido por un tercero exista y coincida con los datos informados (CAE, CAEA o CAI), a través del Web Service de Constatación de Comprobantes (WSCDC). Sirve, por ejemplo, para validar las facturas de proveedores antes de registrarlas.

::: info Documentación Oficial
[Manual del Desarrollador WSCDC v3 - ARCA (PDF)](https://www.arca.gob.ar/ws/WSCDCV1/WSCDC_manual_desarrollador_v.3.pdf)
:::

::: tip Detalles técnicos
- El alias WSAA del servicio es `wscdc` (`ArcaServiceNames.WSCDC`). Hay que autorizarlo para el certificado en el portal de ARCA. Ver [Gestión de credenciales](/credential_management).
- WSCDC usa conexiones HTTP propias, sin keep-alive: comparte host con WSFE y ARCA rechaza las llamadas que llegan por una conexión abierta por WSFE.
- También podés invocar cualquier operación vía [`genericService`](/services/generic-service) con `ArcaServiceNames.WSCDC`.
:::

[[toc]]

---

## Constatar un comprobante

`constatarComprobante` envía los datos del comprobante y devuelve `Resultado`: `"A"` si coincide con lo registrado en ARCA y `"R"` si no. En el rechazo, `Observaciones` explica el motivo.

```ts
const result = await arca.wscdcService.constatarComprobante({
  CmpReq: {
    CbteModo: "CAE", // CAE, CAEA o CAI
    CuitEmisor: 20111111112,
    PtoVta: 3,
    CbteTipo: 1, // Factura A
    CbteNro: 31,
    CbteFch: "20260924", // yyyymmdd
    ImpTotal: 507.74,
    CodAutorizacion: "86390926314486",
    DocTipoReceptor: "80", // CUIT
    DocNroReceptor: "20077041096",
  },
});

const constatacion = result.ComprobanteConstatarResult;
if (constatacion.Resultado === "A") {
  console.log("Comprobante válido");
} else {
  console.log("Comprobante rechazado:", constatacion.Observaciones?.Obs);
}
```

`DocTipoReceptor`, `DocNroReceptor` y `Opcionales` son opcionales: ARCA exige los datos del receptor sólo para algunos tipos de comprobante (errores `113` y `114`).

::: details Ver respuesta completa (aprobado)

```json
{
  "ComprobanteConstatarResult": {
    "CmpResp": {
      "CbteModo": "CAE",
      "CuitEmisor": 20111111112,
      "PtoVta": 3,
      "CbteTipo": 1,
      "CbteNro": 31,
      "CbteFch": "20260924",
      "ImpTotal": 507.74,
      "CodAutorizacion": "86390926314486",
      "DocTipoReceptor": "80",
      "DocNroReceptor": "20077041096"
    },
    "Resultado": "A",
    "FchProceso": "20260925094622",
    "Events": { "Evt": [{ "Code": 0 }] }
  }
}
```

:::

::: details Ver respuesta completa (rechazado)

```json
{
  "ComprobanteConstatarResult": {
    "CmpResp": { "CbteModo": "CAE", "CuitEmisor": 20111111112, "...": "..." },
    "Resultado": "R",
    "Observaciones": {
      "Obs": [
        {
          "Code": 100,
          "Msg": "El N° de CAI/CAE/CAEA consultado no existe en las bases del organismo."
        }
      ]
    },
    "FchProceso": "20260925094541",
    "Events": { "Evt": [{ "Code": 0 }] }
  }
}
```

:::

## Tablas de parámetros

Devuelven los códigos válidos para armar el pedido de constatación.

| Método | Operación SOAP | Contenido |
| ------ | -------------- | --------- |
| `getComprobantesModalidad()` | `ComprobantesModalidadConsultar` | Modalidades de autorización (`CAE`, `CAEA`, `CAI`) |
| `getComprobantesTipo()` | `ComprobantesTipoConsultar` | Tipos de comprobante |
| `getDocumentosTipo()` | `DocumentosTipoConsultar` | Tipos de documento del receptor |
| `getOpcionalesTipo()` | `OpcionalesTipoConsultar` | Tipos de datos opcionales |

```ts
const modalidades = await arca.wscdcService.getComprobantesModalidad();
console.log(
  modalidades.ComprobantesModalidadConsultarResult.ResultGet.FacModTipo,
);
// [{ Cod: "CAE", Desc: "Comprobantes - CAE" }, { Cod: "CAEA", ... }, { Cod: "CAI", ... }]
```

Si una tabla no tiene registros, ARCA devuelve el error `503` ("Sin Resultados") en `Errors` en lugar de `ResultGet`.

## Estado del Servidor

`dummy` verifica si el servicio está operativo. No requiere autenticación.

```ts
const status = await arca.wscdcService.dummy();
console.log(status.ComprobanteDummyResult);
```

::: details Ver respuesta completa

```json
{
  "ComprobanteDummyResult": {
    "AppServer": "OK",
    "DbServer": "OK",
    "AuthServer": "OK"
  }
}
```

:::
