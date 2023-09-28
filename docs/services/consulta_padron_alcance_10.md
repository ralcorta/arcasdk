# Padrón de AFIP alcance 10

Los métodos de este Web Service se encuentran disponibles en `afip.registerScopeTenService`

La especificación de este Web Service se encuentra disponible [aquí](http://www.afip.gob.ar/ws/ws_sr_padron_a10/manual_ws_sr_padron_a10_v1.1.pdf)

<h2> Índice </h2>

[[toc]]


## Obtener datos del contribuyente

Debemos utilizar el metodo `getTaxpayerDetails` pasando como parámetro el documento identificador del contribuyente, por ej. el CUIT. Nos devolvera un objeto con los detalles o `null` en caso de no existir en el padrón

```js
const taxpayerDetails = await afip.registerScopeTenService.getTaxpayerDetails(
  20111111111
); //Devuelve los datos del contribuyente correspondiente al identificador 20111111111
```

Para mas información acerca de este método ver el item 3.2 de la [especificación del Web service](http://www.afip.gob.ar/ws/ws_sr_padron_a10/manual_ws_sr_padron_a10_v1.1.pdf)

## Obtener estado del servidor

Para esto utilizaremos el método `getServerStatus`

```js
const serverStatus = await afip.registerScopeTenService.getServerStatus();

console.log("Este es el estado del servidor:");
console.log(serverStatus);
```

Para mas información acerca de este método ver el item 3.1 de la [especificación del Web service](http://www.afip.gob.ar/ws/ws_sr_padron_a10/manual_ws_sr_padron_a10_v1.1.pdf)
