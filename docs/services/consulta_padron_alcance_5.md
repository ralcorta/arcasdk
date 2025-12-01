# 5️⃣ Padrón Alcance 5

El servicio `registerScopeFiveService` permite consultar los datos completos de un contribuyente en el Padrón de ARCA (Alcance 5). Este alcance incluye datos de Monotributo y Régimen General.

::: info Documentación Oficial
[Manual del Desarrollador (PDF)](http://www.arca.gob.ar/ws/ws_sr_padron_a5/manual_ws_sr_padron_a5_v1.0.pdf)
:::

[[toc]]

## Obtener Datos del Contribuyente

Consulta los detalles completos de una persona física o jurídica mediante su CUIT.

```ts
// Consultar datos del CUIT 20111111111
const taxpayerDetails = await arca.registerScopeFiveService.getTaxpayerDetails(
  20111111111
);

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
const taxpayers = await arca.registerScopeFiveService.getTaxpayersDetails([
  20111111111, 20222222222,
]);

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

Verifica si el servicio de Padrón A5 está operativo.

```ts
const status = await arca.registerScopeFiveService.getServerStatus();
console.log(status);
```

::: details Ver respuesta completa

```json
{
  "appserver": "OK",
  "dbserver": "OK",
  "authserver": "OK"
}
```

:::
