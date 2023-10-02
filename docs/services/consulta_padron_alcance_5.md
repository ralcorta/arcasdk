# Padrón de AFIP alcance 5

Los métodos de este Web Service se encuentran disponibles en `afip.registerScopeFiveService`

La especificación de este Web Service se encuentra disponible [aquí](http://www.afip.gob.ar/ws/ws_sr_padron_a5/manual_ws_sr_padron_a5_v1.0.pdf)

<h2> Índice </h2>

[[toc]]


## Obtener datos del contribuyente

Debemos utilizar el metodo `getTaxpayerDetails` pasando como parámetro el documento identificador del contribuyente, por ej. el CUIT. Nos devolvera un objeto con los detalles o `null` en caso de no existir en el padrón

```js
const taxpayerDetails = await afip.registerScopeFiveService.getTaxpayerDetails(
  20111111111
); //Devuelve los datos del contribuyente correspondiente al identificador 20111111111
```

Para mas información acerca de este método ver el item 3.2 de la [especificación del Web service](http://www.afip.gob.ar/ws/ws_sr_padron_a5/manual_ws_sr_padron_a5_v1.0.pdf)

## Obtener datos de múltiples contribuyentes

Debemos utilizar el método `getTaxpayersDetails` pasando como parámetro un array con los documentos identificadores de los contribuyentes. Nos devolverá un array con los detalles de cada contribuyente.

```js
const taxpayersDetails =
  await afip.registerScopeFiveService.getTaxpayersDetails([
    20111111111, 20111111112,
  ]); //Devuelve los datos de los contribuyentes correspondientes a los identificadores 20111111111y 20111111112
```

## Obtener estado del servidor

Para esto utilizaremos el método `getServerStatus`

```js
const serverStatus = await afip.registerScopeFiveService.getServerStatus();

console.log("Este es el estado del servidor:");
console.log(serverStatus);
```

Para mas información acerca de este método ver el item 3.1 de la [especificación del Web service](http://www.afip.gob.ar/ws/ws_sr_padron_a5/manual_ws_sr_padron_a5_v1.0.pdf)
