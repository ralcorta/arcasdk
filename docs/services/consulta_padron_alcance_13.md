# 1️⃣3️⃣ Padrón Alcance 13

El servicio `registerScopeThirteenService` permite consultar los datos de un contribuyente en el Padrón de ARCA (Alcance 13). Este alcance está orientado a consultar actividades económicas y permite buscar CUIT por DNI.

::: info Documentación Oficial
[Manual del Desarrollador (PDF)](http://www.arca.gob.ar/ws/ws-padron-a13/manual-ws-sr-padron-a13-v1.2.pdf)
:::

[[toc]]

## Obtener Datos del Contribuyente

Consulta los detalles de una persona física o jurídica mediante su CUIT.

```ts
// Consultar datos del CUIT 20111111111
const taxpayerDetails =
  await arca.registerScopeThirteenService.getTaxpayerDetails(20111111111);

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

## Obtener CUIT por Documento

Permite obtener el CUIT asociado a un número de documento (DNI).

```ts
const taxID = await arca.registerScopeThirteenService.getTaxIDByDocument(
  "11111111"
);

if (taxID.idPersona) {
  console.log(`El CUIT para el DNI 11111111 es: ${taxID.idPersona}`);
} else {
  console.log("No se encontró CUIT para ese documento.");
}
```

::: details Ver respuesta completa

```json
{
  "idPersona": 20111111111,
  "metadata": {
    "fechaHora": "2024-01-01T12:00:00.000-03:00",
    "servidor": "server1"
  }
}
```

:::

## Estado del Servidor

Verifica si el servicio de Padrón A13 está operativo.

```ts
const status = await arca.registerScopeThirteenService.getServerStatus();
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
