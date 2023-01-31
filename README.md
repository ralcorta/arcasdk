# 🚀 Afip SDK

[![npm](https://img.shields.io/npm/v/afipts.svg?style=flat-square)](https://npmjs.org/package/afipts)

<br />
<p align="center">
  <a href="https://github.com/ralcorta/afipts">
    <img src="https://user-images.githubusercontent.com/19806540/198080937-468e851b-2ae4-40a7-b2c5-cb929ff7749a.png" alt="afipts" width="230">
  </a>

  <h3 align="center">Afip Ts</h3>

  <p align="center">
    SDK para consumir y usar los Web Services de AFIP
    <br />
    <a href="https://ralcorta.github.io/afipts">Ver documentacion completa</a>
    <br />
    <br />
    <small> 
        Inspirado en <a href="https://github.com/AfipSDK/afip.js">afip.js</a> 
      <br />
      <a href="https://github.com/ralcorta/afipts/issues">Reportar un bug</a>
    </small>
  </p>
</p>

## Guia

### Intalación

##### NPM

```sh
npm i afipts --save
```

##### Yarn

```sh
yarn add afipts
```

### Uso de la SDK

##### Requisitos previos

Se debe tener los certificados emitidos por AFIP, ya sean para los servidores de homologacion o produccion, para poder pasarselos como parametro al paquete y que este haga uso de ellos para comunicarse con los web services.

[Documentacion oficial de certificados](https://www.afip.gob.ar/ws/documentacion/certificados.asp)

##### Ejemplo basico

Ejemplo de como generar factura electronica:

```ts
import { Afip } from "afipts";

const afip: Afip = new Afip({
  key: "private_key_content",
  cert: "crt_content",
  cuit: 20111111112,
});

const voucher = await afip.electronicBillingService.createInvoice({
  /**
   * Invoice / Voucher Data
   */
});

// Otros servicios
const points = await afip.electronicBillingService.getSalesPoints();
```

<br>

La clase Afip recibe como parametro en el constructor el contexto (Ver type). Ahi esta explicado todos los comportamientos que puede tomar afip.

- Soporte para `Serverless`

Para mas <strong>documentacion</strong> del package, ir al [sitio oficial](https://ralcorta.github.io/afipts).

## Desarrollo y contribuciones

### Contribuciones

Si encontras un bug o desaes sugerir algo, revisa de que no haya [issues](https://github.com/ralcorta/afipts/issues) con el mismo tema, y de ser asi [puedes generar uno aqui](https://github.com/ralcorta/afipts/issues/new).

### Desarrollo

Seria genial si puedes ayudarnos mejorando `afipts`. ¿Como hacer?

1. [Clonar](https://github.com/ralcorta/afipts).

2. `npm install`.

3. Rompela escribiendo tu codigo.

4. Correr los test: `npm test`.

5. Cear un [Pull Request](https://github.com/ralcorta/afipts/compare).

## Licencia

Este proyecto esta bajo la licencia `MIT` - Ver [LICENSE](LICENSE) para mas detalles.

<small>
Este software y sus desarrolladores no tienen ninguna relación con la AFIP.
</small>
