# 4️⃣ Padrón Alcance 4

El servicio `registerScopeFourService` permite consultar los datos de un contribuyente en el Padrón de ARCA (Alcance 4). Este alcance proporciona información básica sobre personas físicas y jurídicas.

::: info Documentación Oficial
[Manual del Desarrollador (PDF)](http://www.arca.gob.ar/ws/ws_sr_padron_a4/manual_ws_sr_padron_a4_v1.1.pdf)
:::

[[toc]]

## Obtener Datos del Contribuyente

Consulta los detalles de una persona física o jurídica mediante su CUIT.

```ts
// Consultar datos del CUIT 20111111111
const taxpayerDetails = await arca.registerScopeFourService.getTaxpayerDetails(
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
  "persona": {
    "idPersona": 20111111111,
    "tipoPersona": "FISICA",
    "estadoClave": "ACTIVO",
    "datosGenerales": {
      "piso": "1",
      "departamento": "A",
      "numeroCalle": 123,
      "codPostal": "1000",
      "tipoDomicilio": "FISCAL",
      "domicilio": "CALLE FALSA 123"
    }
  }
}
```

:::

## Estado del Servidor

Verifica si el servicio de Padrón A4 está operativo.

```ts
const status = await arca.registerScopeFourService.getServerStatus();
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
