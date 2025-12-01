# 4️⃣ Padrón Alcance 4

El servicio `registerScopeFourService` permite consultar los datos de un contribuyente en el Padrón de ARCA (Alcance 4).

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

## Estado del Servidor

Verifica si el servicio de Padrón A4 está operativo.

```ts
const status = await arca.registerScopeFourService.getServerStatus();
console.log(status);
```
