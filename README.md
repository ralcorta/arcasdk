> ### ⚠️ AVISO DE MIGRACIÓN
>
> **Este proyecto ha evolucionado de `afip.ts` a Arca SDK.**
>
> El repositorio ha sido renombrado y el paquete ahora se publica como [`@arcasdk/core`](https://www.npmjs.com/package/@arcasdk/core).
>
> **¿Cómo seguir usando la versión anterior?**
> El código original de `afip.ts` se encuentra preservado en la rama [`afip.ts`](../../tree/afip.ts) y el paquete sigue disponible en npm como [`afip.ts`](https://www.npmjs.com/package/afip.ts).
>
> Todo el desarrollo futuro continuará en la rama `main` bajo el nuevo nombre.

# 🚀 Arca SDK

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

[![npm](https://img.shields.io/npm/v/@arcasdk/core.svg?style=flat-square)](https://npmjs.org/package/@arcasdk/core)
![GitHub Repo stars](https://img.shields.io/github/stars/ralcorta/arca-sdk)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ralcorta/arca-sdk)
![GitHub](https://img.shields.io/github/license/ralcorta/arca-sdk)
![npm](https://img.shields.io/npm/dt/@arcasdk/core)

<br />
<p align="center">
  <a href="https://github.com/ralcorta/arca-sdk">
    <img src="https://user-images.githubusercontent.com/19806540/198080937-468e851b-2ae4-40a7-b2c5-cb929ff7749a.png" alt="arca-sdk" width="230">
  </a>

  <h3 align="center">Arca SDK</h3>

  <p align="center">
    SDK para consumir y usar los Web Services de ARCA (ex AFIP)
    <br />
    <a href="https://ralcorta.github.io/arca-sdk">Ver documentacion completa</a>
    <br />
    <br />
    <small> 
        Inspirado en <a href="https://github.com/AfipSDK/afip.js">afip.js</a> 
      <br />
      <a href="https://github.com/ralcorta/arca-sdk/issues">Reportar un bug</a>
    </small>
  </p>
</p>

<br />
<p align="center">
<a href='https://cafecito.app/rodrigoalcorta' rel='noopener' target='_blank'><img srcset='https://cdn.cafecito.app/imgs/buttons/button_5.png 1x, https://cdn.cafecito.app/imgs/buttons/button_5_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_5_3.75x.png 3.75x' src='https://cdn.cafecito.app/imgs/buttons/button_5.png' alt='Invitame un café en cafecito.app' /></a>
</p>

## Guia

### Instalación

##### NPM

```sh
npm i @arcasdk/core --save
```

##### Yarn

```sh
yarn add @arcasdk/core
```

### Uso de la SDK

##### Requisitos previos

Se debe tener los certificados emitidos por ARCA/AFIP, ya sean para los servidores de homologacion (test) o produccion, para poder pasarselos como parametro al paquete y que este haga uso de ellos para comunicarse con los web services.

- [Guia de como obtenerlos](https://ralcorta.github.io/arca-sdk/tutorial/enable_testing_certificates.html)
- [Documentacion oficial de certificados](https://www.afip.gob.ar/ws/documentacion/certificados.asp)

##### Ejemplo basico

Ejemplo de como generar factura electronica:

```ts
import { Arca } from "@arcasdk/core";

const arca: Arca = new Arca({
  key: "private_key_content",
  cert: "crt_content",
  cuit: 20111111112,
});

const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  .toISOString()
  .split("T")[0];

const payload = {
  CantReg: 1, // Cantidad de comprobantes a registrar
  PtoVta: 1, // Punto de venta
  CbteTipo: 6, // Tipo de comprobante (ver tipos disponibles)
  Concepto: 1, // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
  DocTipo: 99, // Tipo de documento del comprador (99 consumidor final, ver tipos disponibles)
  DocNro: 0, // Número de documento del comprador (0 consumidor final)
  CbteDesde: 1, // Número de comprobante o numero del primer comprobante en caso de ser mas de uno
  CbteHasta: 1, // Número de comprobante o numero del último comprobante en caso de ser mas de uno
  CbteFch: parseInt(date.replace(/-/g, "")), // (Opcional) Fecha del comprobante (yyyymmdd) o fecha actual si es nulo
  ImpTotal: 121, // Importe total del comprobante
  ImpTotConc: 0, // Importe neto no gravado
  ImpNeto: 100, // Importe neto gravado
  ImpOpEx: 0, // Importe exento de IVA
  ImpIVA: 21, //Importe total de IVA
  ImpTrib: 0, //Importe total de tributos
  MonId: "PES", //Tipo de moneda usada en el comprobante (ver tipos disponibles)('PES' para pesos argentinos)
  MonCotiz: 1, // Cotización de la moneda usada (1 para pesos argentinos)
  CondicionIVAReceptorId: 1, // Condición de IVA del receptor
  Iva: [
    // (Opcional) Alícuotas asociadas al comprobante
    {
      Id: 5, // Id del tipo de IVA (5 para 21%)(ver tipos disponibles)
      BaseImp: 100, // Base imponible
      Importe: 21, // Importe
    },
  ],
};

const invoice = await arca.electronicBillingService.createInvoice(payload);
```

Ejemplo de otros endpoints:

```ts
const points = await arca.electronicBillingService.getSalesPoints();
```

## Caracteristicas

Toda configuracion del package es pasada por el constructor de la clase `Arca` la cual recibe [Context](https://www.arcasdk.com/guide/config.html).

Caracteristicas:

- Escrito enteramente con `Typescript`
- Soporte para `Serverless`. El package permite manejar los token de autenticacion de manera aislada.

Para mas <strong>documentacion</strong>, ir al [sitio oficial](https://ralcorta.github.io/arca-sdk).

## Desarrollo y contribuciones

### Contribuciones

Si encontras un bug o desaes sugerir algo, revisa de que no haya [issues](https://github.com/ralcorta/arca-sdk/issues) con el mismo tema, y de ser asi [puedes generar uno aqui](https://github.com/ralcorta/arca-sdk/issues/new).

### Desarrollo

Seria genial si puedes ayudarnos mejorando `arca-sdk`. ¿Como hacer?

1. [Clonar](https://github.com/ralcorta/arca-sdk).

2. `npm install`.

3. Rompela escribiendo tu codigo.

4. Correr los test: `npm test`.

5. Cear un [Pull Request](https://github.com/ralcorta/arca-sdk/compare).

## Licencia

Este proyecto esta bajo la licencia `MIT` - Ver [LICENSE](LICENSE) para mas detalles.

<small>
Este software y sus desarrolladores no tienen ninguna relación con la ARCA/AFIP.
</small>
