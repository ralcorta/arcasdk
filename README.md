# 🚀 Afip SDK

[![npm](https://img.shields.io/npm/v/Afip-SDK.svg?style=flat-square)](https://npmjs.org/package/Afip-SDK)

<br />
<p align="center">
  <a href="https://github.com/valiulab/Afip-SDK">
    <img src="https://user-images.githubusercontent.com/19806540/198080937-468e851b-2ae4-40a7-b2c5-cb929ff7749a.png" alt="Afip.js" width="230">
  </a>

  <h3 align="center">Afip SDK</h3>

  <p align="center">
    Package que provee una interfaz para consumir y usar los Web Services de AFIP
    <br />
    <a href="https://valiulab-core.github.io/Afip-SDK">Documentacion</a>
    <br />
    <br />
    <small> 
        Inspirado en <a href="https://github.com/AfipSDK/afip.js">afip.js</a> 
      <br />
      <a href="https://github.com/valiulab/Afip-SDK/issues">Reportar un bug</a>
    </small>
  </p>
</p>

<!-- [afip.js](https://github.com/AfipSDK/afip.js) -->

#### Servicios disponibles

- [Web Services](https://www.afip.gob.ar/ws/documentacion/arquitectura-general.asp)
  - [Autenticación](https://www.afip.gob.ar/ws/WSAA/WSAAmanualDev.pdf)
  - [Factura electronica](https://www.afip.gob.ar/fe/ayuda//documentos/Manual-desarrollador-V.2.21.pdf)
  - Comming soon...

## Guia

### Intalación

##### NPM

```sh
npm i Afip-SDK --save
```

##### Yarn

```sh
yarn add Afip-SDK
```

### Uso de la SDK

##### Requisitos previos

Se debe tener los certificados emitidos por AFIP, ya sean para los servidores de homologacion o produccion, para poder pasarselos como parametro al paquete y que este haga uso de ellos para comunicarse con los web services.

##### Ejemplo basico

Ejemplo de como generar factura electronica:

```ts
const afip: Afip = new Afip({
  key: "private_key_content",
  cert: "crt_content",
  cuit: 20111111112,
});

const voucherData = {
  // invoice data
};

const voucher = await afip.electronicBillingService.createInvoice(voucherData);
```

<br>

La clase Afip recibe como parametro en el constructor el contexto (Ver type). Ahi esta explicado todas las acciones que puede tomar afip.

#### Comportamientos

Para poder comunicarse con los Web Services de AFIP se debe autenticar con su servicio de [WSAA](https://www.afip.gob.ar/ws/WSAA/WSAAmanualDev.pdf) el cual retorna los tokens necesarios con una validez de hasta 12 horas.
Este servicio de autenticacion solo puede ser llamado cada 2 minutos en los servidores de produccion y hasta 10 minutos en los servidores de homologiacion.

Para esto otros paquetes internamente generan archivos donde guardan estos tokens de manera local en el servidor usando el file sistem de Node (require('fs')). Esto es un problema cuando se ejecuta sobre funciones serverless como las Lambdas de AWS.

Este paquete permite manejar los tickets de acceso (TA que devuelve con los tokens AFIP) de manera personals si se desea, permitiendo tomar datos y guardarlos donde les sea mas conveniente, como en una BD, un S3, o algun storage provider.

Aun asi, si no se quiere manejar personalmente y que se guarden en el servidor, pueden no especificar nada en el contexto de la clase Afip al momento de instanciarlo y este guardara JSONs con los tokens dentro de la carpeta del paquete (Por default root/src/auth/tickets, aunque se puede cambiar desde el constructor).

## Documentacion Afip

Autenticacion: https://www.afip.gob.ar/ws/WSAA/WSAAmanualDev.pdf

Facturacion electrónica: https://www.afip.gob.ar/fe/ayuda//documentos/Manual-desarrollador-V.2.21.pdf

## Desarrollo y contribuciones

### Commit

Usamos ["semantic release library"](https://www.npmjs.com/package/semantic-release) (https://www.npmjs.com/package/semantic-release) para generar nuestras nuevas versiones, tags y changelogs. Para esto necesitamos specificar un mensaje en los commits con un formato que permita determinar que version es aumentada, y tambien ayudar a mejorar el CHANGELOG.md

| Commit message                                                                                                                                                                                   | Release type               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release              |
| `feat(pencil): add ‘graphiteWidth’ option`                                                                                                                                                       | ~~Minor~~ Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |

### Contribuciones

Si encontras un bug o desaes sugerir algo, revisa de que no haya [issues](https://github.com/valiulab/Afip-SDK/issues) con el mismo tema, y de ser asi [puedes generar uno aqui](https://github.com/valiulab/Afip-SDK/issues/new).

### Desarrollo

Seria genial si puedes ayudarnos mejorando `Afip-SDK`. ¿Como hacer?

1. [Clonar](https://github.com/valiulab/Afip-SDK).

2. `npm install`.

3. Rompela escribiendo tu codigo.

4. Correr los test: `npm test`.

5. Cear un [Pull Request](https://github.com/valiulab/Afip-SDK/compare).

## License

Este proyecto esta bajo la licencia `MIT` - Ver [LICENSE](LICENSE) para mas detalles.

<small>
Este software y sus desarrolladores no tienen ninguna relación con la AFIP.
</small>
