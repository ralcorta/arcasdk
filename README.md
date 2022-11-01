# 🚀 Afip SDK

[![npm](https://img.shields.io/npm/v/afip.ts.svg?style=flat-square)](https://npmjs.org/package/afip.ts)

<br />
<p align="center">
  <a href="https://github.com/valiulab/afip.ts">
    <img src="https://user-images.githubusercontent.com/19806540/198080937-468e851b-2ae4-40a7-b2c5-cb929ff7749a.png" alt="afip.ts" width="230">
  </a>

  <h3 align="center">Afip Ts</h3>

  <p align="center">
    SDK para consumir y usar los Web Services de AFIP
    <br />
    <a href="https://valiulab.github.io/afip.ts">Ver documentacion completa</a>
    <br />
    <br />
    <small> 
        Inspirado en <a href="https://github.com/AfipSDK/afip.js">afip.js</a> 
      <br />
      <a href="https://github.com/valiulab/afip.ts/issues">Reportar un bug</a>
    </small>
  </p>
</p>

## Guia

### Intalación

##### NPM

```sh
npm i afip.ts --save
```

##### Yarn

```sh
yarn add afip.ts
```

### Uso de la SDK

##### Requisitos previos

Se debe tener los certificados emitidos por AFIP, ya sean para los servidores de homologacion o produccion, para poder pasarselos como parametro al paquete y que este haga uso de ellos para comunicarse con los web services.

[Documentacion oficial de certificados](https://www.afip.gob.ar/ws/documentacion/certificados.asp)

##### Ejemplo basico

Ejemplo de como generar factura electronica:

```ts
const afip: Afip = new Afip({
  key: "private_key_content",
  cert: "crt_content",
  cuit: 20111111112,
});

const voucher = await afip.electronicBillingService.createInvoice({
  // voucher data
});

const points = await afip.electronicBillingService.getSalesPoints();
```

<br>

La clase Afip recibe como parametro en el constructor el contexto (Ver type). Ahi esta explicado todos los comportamientos que puede tomar afip.

- Soporte para `Serverless Functions`

Para mas <strong>documentacion</strong> del package, ir al [sitio oficial](https://valiulab.github.io/afip.ts).

## Desarrollo y contribuciones

### Commit

Usamos ["semantic release library"](https://www.npmjs.com/package/semantic-release) (https://www.npmjs.com/package/semantic-release) para generar nuestras nuevas versiones, tags y changelogs. Para esto necesitamos specificar un mensaje en los commits con un formato que permita determinar que version es aumentada, y tambien ayudar a mejorar el CHANGELOG.md

| Commit message                                                                                                                                                                                   | Release type               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release              |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |

### Contribuciones

Si encontras un bug o desaes sugerir algo, revisa de que no haya [issues](https://github.com/valiulab/afip.ts/issues) con el mismo tema, y de ser asi [puedes generar uno aqui](https://github.com/valiulab/afip.ts/issues/new).

### Desarrollo

Seria genial si puedes ayudarnos mejorando `afip.ts`. ¿Como hacer?

1. [Clonar](https://github.com/valiulab/afip.ts).

2. `npm install`.

3. Rompela escribiendo tu codigo.

4. Correr los test: `npm test`.

5. Cear un [Pull Request](https://github.com/valiulab/afip.ts/compare).

## License

Este proyecto esta bajo la licencia `MIT` - Ver [LICENSE](LICENSE) para mas detalles.

<small>
Este software y sus desarrolladores no tienen ninguna relación con la AFIP.
</small>
