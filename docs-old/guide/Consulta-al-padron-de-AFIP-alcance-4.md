# Padrón de AFIP alcance 4

Los métodos de este Web Service se encuentran disponibles en `afip.registerScopeFourService`

La especificación de este Web Service se encuentra disponible en http://www.afip.gob.ar/ws/ws_sr_padron_a4/manual_ws_sr_padron_a4_v1.1.pdf

### Métodos disponibles

1. [Obtener datos del contribuyente _(getPersona)_](#obtener-datos-del-contribuyente)
2. [Obtener estado del servidor](#obtener-estado-del-servidor)

## Obtener datos del contribuyente

Debemos utilizar el metodo `getTaxpayerDetails` pasando como parámetro el documento identificador del contribuyente, por ej. el CUIT. Nos devolvera un objeto con los detalles o `null` en caso de no existir en el padrón

```js
const taxpayerDetails = await afip.registerScopeFourService.getTaxpayerDetails(
  20111111111
); //Devuelve los datos del contribuyente correspondiente al identificador 20111111111
```

Para mas información acerca de este método ver el item 3.2 de la [especificación del Web service](http://www.afip.gob.ar/ws/ws_sr_padron_a4/manual_ws_sr_padron_a4_v1.1.pdf)

## Obtener estado del servidor

Para esto utilizaremos el método `getServerStatus`

```js
const serverStatus = await afip.registerScopeFourService.getServerStatus();

console.log("Este es el estado del servidor:");
console.log(serverStatus);
```

Para mas información acerca de este método ver el item 3.1 de la [especificación del Web service](http://www.afip.gob.ar/ws/ws_sr_padron_a4/manual_ws_sr_padron_a4_v1.1.pdf)
