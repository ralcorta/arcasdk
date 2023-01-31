# Introduction

## Servicios disponibles

Actualmente la SDK soporta los siguientes servicios de afip:

- Web Serices - [Doc](https://www.afip.gob.ar/ws/documentacion/catalogo.asp)
  - Autenticación - [Doc](https://www.afip.gob.ar/ws/WSAA/WSAAmanualDev.pdf)
  - Factura electronica - [Doc](https://www.afip.gob.ar/fe/ayuda//documentos/Manual-desarrollador-V.2.21.pdf)
  - Padron alcance 4 - [Doc](https://www.afip.gob.ar/ws/ws_sr_padron_a4/manual_ws_sr_padron_a4_v1.2.pdf)
  - Padron alcance 5 - [Doc](https://www.afip.gob.ar/ws/ws_sr_padron_a5/manual_ws_sr_padron_a5_v1.0.pdf)
  - Padron alcance 10 - [Doc](https://www.afip.gob.ar/ws/ws_sr_padron_a10/manual_ws_sr_padron_a10_v1.1.pdf)
  - Padron alcance 13 - [Doc](https://www.afip.gob.ar/ws/ws-padron-a13/manual-ws-sr-padron-a13-v1.2.pdf)

Si deseas aportar y queres integrar un nuevo servicio, puedes hacer fork del repositorio y generar un PR con los cambios para que los evaluemos y los sumemos!

## Intalación

##### NPM

```sh
npm i afipts --save
```

##### Yarn

```sh
yarn add afipts
```

### Requisitos previos

Se debe tener los certificados emitidos por AFIP, ya sean para los servidores de homologacion o produccion. Estos seran requeridos por la instancia de Afip para la autenticacion a travez del servicio WSAA.
