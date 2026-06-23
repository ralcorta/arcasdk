# Constancia de Inscripción

El servicio `registerInscriptionProofService` permite consultar la constancia de inscripción de un contribuyente en el Padrón de ARCA. Este servicio devuelve información detallada sobre el estado fiscal, impuestos y actividades.

::: info Documentación Oficial
[Manual del Desarrollador - ARCA (PDF)](https://www.arca.gob.ar/ws/WSCI/manual-ws-sr-ws-constancia-inscripcion.pdf)
:::

[[toc]]

---

## Obtener Datos del Contribuyente

Consulta los detalles completos de una persona física o jurídica mediante su CUIT.

```ts
// Consultar datos del CUIT 20111111111
const taxpayerDetails = await arca.registerInscriptionProofService.getTaxpayerDetails(20111111111);

if (taxpayerDetails) {
  console.log("Datos del contribuyente:", taxpayerDetails);
} else {
  console.log("Contribuyente no encontrado.");
}
```

::: details Ver respuesta completa

```json
{
  "metadata": {
    "fechaHora": "2024-01-01T12:00:00.000-03:00",
    "servidor": "server1"
  },
  "datosGenerales": {
    "idPersona": 20111111111,
    "tipoPersona": "FISICA",
    "estadoClave": "ACTIVO",
    "domicilioFiscal": {
      "direccion": "CALLE FALSA 123",
      "codPostal": "1000",
      "provincia": 0
    }
  },
  "datosMonotributo": {
    "categoria": "A",
    "actividad": "SERVICIOS"
  },
  "datosRegimenGeneral": {
    "impuestos": [10, 30],
    "actividad": "VENTA AL POR MENOR"
  }
}
```

:::

## Obtener Datos de Múltiples Contribuyentes

Permite consultar hasta 250 CUITs en una sola petición.

```ts
const taxpayers = await arca.registerInscriptionProofService.getTaxpayersDetails([20111111111, 20222222222]);

console.log(`Se encontraron ${taxpayers.cantidadRegistros} contribuyentes.`);
```

::: details Ver respuesta completa

```json
{
  "metadata": {
    "fechaHora": "2024-01-01T12:00:00.000-03:00",
    "servidor": "server1"
  },
  "cantidadRegistros": 2,
  "persona": [
    {
      "datosGenerales": {
        "idPersona": 20111111111
        // ... más datos
      }
    },
    {
      "datosGenerales": {
        "idPersona": 20222222222
        // ... más datos
      }
    }
  ]
}
```

:::

## Estado del Servidor

Verifica si el servicio de Constancia de Inscripción está operativo.

```ts
const status = await arca.registerInscriptionProofService.getServerStatus();
console.log(status);
```

::: details Ver respuesta completa

```json
{
  "appServer": "OK",
  "dbServer": "OK",
  "authServer": "OK"
}
```

:::
