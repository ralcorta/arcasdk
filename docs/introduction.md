# 🎉 Introducción

Bienvenido a **Arca SDK**, la herramienta definitiva para integrar los servicios de ARCA (ex AFIP) en tus aplicaciones Node.js.

> Desarrollada para ser robusta, fácil de usar y moderna. Con tipado estático, gestión automática de credenciales y arquitectura modular.

---

## Características Principales

| Característica              | Descripción                                                                    |
| --------------------------- | ------------------------------------------------------------------------------ |
| **Tipado Estático**         | Desarrollado en TypeScript para garantizar seguridad de tipos y autocompletado |
| **Gestión de Credenciales** | Manejo automático de tickets de acceso (WSAA) y renovación de tokens           |
| **Modular**                 | Arquitectura basada en servicios independientes (Facturación, Padrón, etc.)    |
| **Isomórfico**              | Compatible con entornos Node.js y Edge runtimes                                |

---

## Servicios Disponibles

La SDK ofrece soporte de primera clase para los servicios más críticos:

<div class="services-list-grid">
  <a href="https://www.arca.gob.ar/ws/WSAA/WSAAmanualDev.pdf" target="_blank" class="service-link-card">
    <div class="service-link-icon">🔐</div>
    <div class="service-link-content">
      <strong>Autenticación (WSAA)</strong>
      <span>Manejo de tickets de acceso</span>
    </div>
  </a>
  <a href="https://www.arca.gob.ar/fe/ayuda//documentos/Manual-desarrollador-V.2.21.pdf" target="_blank" class="service-link-card">
    <div class="service-link-icon">💸</div>
    <div class="service-link-content">
      <strong>Facturación Electrónica</strong>
      <span>Emisión de comprobantes (WSFE)</span>
    </div>
  </a>
  <a href="https://www.arca.gob.ar/ws/ws_sr_padron_a4/manual_ws_sr_padron_a4_v1.2.pdf" target="_blank" class="service-link-card">
    <div class="service-link-icon">4️⃣</div>
    <div class="service-link-content">
      <strong>Padrón Alcance 4</strong>
      <span>Consulta de contribuyentes</span>
    </div>
  </a>
  <a href="https://www.arca.gob.ar/ws/ws_sr_padron_a5/manual_ws_sr_padron_a5_v1.0.pdf" target="_blank" class="service-link-card">
    <div class="service-link-icon">5️⃣</div>
    <div class="service-link-content">
      <strong>Padrón Alcance 5</strong>
      <span>Datos completos</span>
    </div>
  </a>
  <a href="https://www.arca.gob.ar/ws/ws_sr_padron_a10/manual_ws_sr_padron_a10_v1.1.pdf" target="_blank" class="service-link-card">
    <div class="service-link-icon">🔟</div>
    <div class="service-link-content">
      <strong>Padrón Alcance 10</strong>
      <span>Exentos y Monotributo</span>
    </div>
  </a>
  <a href="https://www.arca.gob.ar/ws/ws-padron-a13/manual-ws-sr-padron-a13-v1.2.pdf" target="_blank" class="service-link-card">
    <div class="service-link-icon">1️⃣3️⃣</div>
    <div class="service-link-content">
      <strong>Padrón Alcance 13</strong>
      <span>Actividades económicas</span>
    </div>
  </a>
  <a href="/services/facturacion_electronica_exportacion" class="service-link-card">
    <div class="service-link-icon">🌍</div>
    <div class="service-link-content">
      <strong>Facturación de exportación</strong>
      <span>Comprobantes WSFEX</span>
    </div>
  </a>
  <a href="/services/factura_credito_electronica" class="service-link-card">
    <div class="service-link-icon">🏭</div>
    <div class="service-link-content">
      <strong>Factura de crédito MiPyMEs</strong>
      <span>WSFECred</span>
    </div>
  </a>
  <a href="/services/generic-service" class="service-link-card">
    <div class="service-link-icon">🔧</div>
    <div class="service-link-content">
      <strong>Servicio genérico</strong>
      <span>Cualquier WSDL de ARCA</span>
    </div>
  </a>
</div>

---

## Instalación

::: code-group

```sh [npm]
npm i @arcasdk/core --save
```

```sh [yarn]
yarn add @arcasdk/core
```

```sh [pnpm]
pnpm add @arcasdk/core
```

:::

---

## Requisitos Previos

::: warning Certificados Requeridos
Para utilizar esta SDK, debes tener los **certificados emitidos por ARCA** (homologación o producción). Son necesarios para la autenticación WSAA.

[Ver guía de certificados](/tutorial/enable_testing_certificates)
:::

---

## Próximos Pasos

- [Uso Básico](/basic-use) — Aprende cómo instanciar y hacer tu primera operación
- [Configuración](/config) — Configura tu entorno
- [Gestión de Credenciales](/credential_management) — Maneja credenciales de forma segura
- [Documentación de Servicios](/services/facturacion_electronica) — Explora todos los servicios disponibles

---

::: tip Contribuciones
¿Necesitas otro servicio? ¡El proyecto es Open Source! Puedes hacer un [fork en GitHub](https://github.com/ralcorta/arcasdk) y enviar un PR.
:::
