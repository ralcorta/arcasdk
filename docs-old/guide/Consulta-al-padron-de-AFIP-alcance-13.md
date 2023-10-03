# Padrón de AFIP alcance 13

Los métodos de este Web Service se encuentran disponibles en `afip.registerScopeThirteenService`

La especificación de este Web Service se encuentra disponible en http://www.afip.gob.ar/ws/ws-padron-a13/manual-ws-sr-padron-a13-v1.2.pdf

### Métodos disponibles

1. [Obtener datos del contribuyente _(getPersona)_](#obtener-datos-del-contribuyente)
2. [Obtener CUIT a partir de un DNI](#obtener-cuit-a-partir-de-un-dni)
3. [Obtener estado del servidor](#obtener-estado-del-servidor)

## Obtener datos del contribuyente

Debemos utilizar el metodo `getTaxpayerDetails` pasando como parámetro el documento identificador del contribuyente, por ej. el CUIT. Nos devolvera un objeto con los detalles o `null` en caso de no existir en el padrón

```js
const taxpayerDetails =
  await afip.registerScopeThirteenService.getTaxpayerDetails(20111111111); //Devuelve los datos del contribuyente correspondiente al identificador 20111111111
```

Para mas información acerca de este método ver el item 3.2 de la [especificación del Web service](http://www.afip.gob.ar/ws/ws-padron-a13/manual-ws-sr-padron-a13-v1.2.pdf)

## Obtener CUIT a partir de un DNI

Debemos utilizar el metodo `getTaxIDByDocument` pasando como parámetro el DNI del contribuyente. Nos devolverá el CUIT o `null` en caso de no existir en el padrón

```js
const taxID = await afip.registerScopeThirteenService.getTaxIDByDocument(
  11111111
); //Devuelve el CUIT correspondiente al DNI 11111111
```

## Obtener estado del servidor

Para esto utilizaremos el método `getServerStatus`

```js
const serverStatus = await afip.registerScopeThirteenService.getServerStatus();

console.log("Este es el estado del servidor:");
console.log(serverStatus);
```

Para mas información acerca de este método ver el item 3.1 de la [especificación del Web service](http://www.afip.gob.ar/ws/ws-padron-a13/manual-ws-sr-padron-a13-v1.2.pdf)
