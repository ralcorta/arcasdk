# 🎉 Introducción

## Servicios Disponibles

La SDK actualmente ofrece soporte para una variedad de servicios de AFIP:

- **Web Services** - [Documentación](https://www.afip.gob.ar/ws/documentacion/catalogo.asp)
  - **Autenticación** - [Documentación](https://www.afip.gob.ar/ws/WSAA/WSAAmanualDev.pdf)
  - **Facturación Electrónica** - [Documentación](https://www.afip.gob.ar/fe/ayuda//documentos/Manual-desarrollador-V.2.21.pdf)
  - **Padrón Alcance 4** - [Documentación](https://www.afip.gob.ar/ws/ws_sr_padron_a4/manual_ws_sr_padron_a4_v1.2.pdf)
  - **Padrón Alcance 5** - [Documentación](https://www.afip.gob.ar/ws/ws_sr_padron_a5/manual_ws_sr_padron_a5_v1.0.pdf)
  - **Padrón Alcance 10** - [Documentación](https://www.afip.gob.ar/ws/ws_sr_padron_a10/manual_ws_sr_padron_a10_v1.1.pdf)
  - **Padrón Alcance 13** - [Documentación](https://www.afip.gob.ar/ws/ws-padron-a13/manual-ws-sr-padron-a13-v1.2.pdf)

Si deseas contribuir y añadir soporte para un nuevo servicio, puedes hacer un fork del repositorio y enviar un PR con los cambios. ¡Los evaluaremos y los incorporaremos!

## Instalación

##### NPM

```sh
npm i afip.ts --save
```

##### Yarn

```sh
yarn add afip.ts
```

### Requisitos Previos

Para utilizar esta SDK, debes tener los certificados emitidos por AFIP, ya sea para los servidores de homologación o producción. Estos certificados serán necesarios para la autenticación a través del servicio WSAA en la instancia de Afip.