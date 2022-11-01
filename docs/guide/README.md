# Introduction

## Servicios disponibles

- [Web Services](https://www.afip.gob.ar/ws/documentacion/arquitectura-general.asp)
  - [Autenticación](https://www.afip.gob.ar/ws/WSAA/WSAAmanualDev.pdf)
  - [Factura electronica](https://www.afip.gob.ar/fe/ayuda//documentos/Manual-desarrollador-V.2.21.pdf)
  - Comming soon...

## Intalación

##### NPM

```sh
npm i afip.ts --save
```

##### Yarn

```sh
yarn add afip.ts
```

### Requisitos previos

Se debe tener los certificados emitidos por AFIP, ya sean para los servidores de homologacion o produccion, para poder pasarselos como parametro al paquete y que este haga uso de ellos para comunicarse con los web services.
