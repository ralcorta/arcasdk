---
layout: home

hero:
  name: "Arca SDK"
  text: "Tu conexión directa con ARCA"
  tagline: Biblioteca TypeScript moderna para integrar facturación electrónica, padrón y demás servicios de ARCA (ex AFIP) en Node.js — sin intermediarios, con tipos completos.
  image:
    src: /logo.png
    alt: Arca SDK Logo
  actions:
    - theme: brand
      text: Comenzar
      link: /introduction
    - theme: alt
      text: Ver ejemplo
      link: /basic-use
    - theme: alt
      text: GitHub
      link: https://github.com/ralcorta/arcasdk
---

<div class="home-content">

<div class="home-stats">
  <div class="home-stat">
    <strong>TypeScript</strong>
    <span>Tipado estático completo</span>
  </div>
  <div class="home-stat">
    <strong>Open Source</strong>
    <span>MIT · Sin costos</span>
  </div>
  <div class="home-stat">
    <strong>Directo a ARCA</strong>
    <span>Sin intermediarios</span>
  </div>
  <div class="home-stat">
    <strong>Node & Edge</strong>
    <span>Lambda, Vercel, Workers</span>
  </div>
</div>

<div class="home-ide">
  <div class="home-ide-header">
    <div class="home-ide-dots">
      <span class="home-ide-dot red"></span>
      <span class="home-ide-dot yellow"></span>
      <span class="home-ide-dot green"></span>
    </div>
    <div class="home-ide-title">quick-start.ts</div>
    <span class="home-ide-badge">@arcasdk/core</span>
  </div>
  <div class="home-ide-body">

::: code-group

```bash [npm]
npm i @arcasdk/core
```

```bash [yarn]
yarn add @arcasdk/core
```

```bash [pnpm]
pnpm add @arcasdk/core
```

:::

```ts
import { Arca } from "@arcasdk/core";

const arca = new Arca({
  cuit: 20111111112,
  cert: process.env.AFIP_CERT,
  key: process.env.AFIP_KEY,
});

const invoice = await arca.electronicBillingService.createVoucher({
  // ... tu comprobante
});
```

  </div>
</div>

<div class="home-section">
  <div class="home-section-header">
    <span class="home-eyebrow">Por qué Arca SDK</span>
    <h2 class="home-section-title">Hecho para producción</h2>
    <p class="home-section-desc">Todo lo que necesitás para conectar tu app con ARCA: autenticación WSAA, servicios tipados y arquitectura lista para escalar.</p>
  </div>

  <div class="home-features">
    <div class="home-feature">
      <div class="home-feature-icon">🛡️</div>
      <div>
        <h3>Type-safe por diseño</h3>
        <p>DTOs y respuestas tipadas en cada servicio. Autocompletado y errores en compile-time, no en producción.</p>
      </div>
    </div>
    <div class="home-feature">
      <div class="home-feature-icon">⚡</div>
      <div>
        <h3>Serverless ready</h3>
        <p>Funciona en AWS Lambda, Vercel, Cloudflare Workers y contenedores. Sin dependencias pesadas ni estado global.</p>
      </div>
    </div>
    <div class="home-feature">
      <div class="home-feature-icon">🔑</div>
      <div>
        <h3>WSAA automático</h3>
        <p>Gestión de tickets de acceso, renovación de tokens y cache configurable. Vos solo pasás cert y key.</p>
      </div>
    </div>
    <div class="home-feature">
      <div class="home-feature-icon">🧩</div>
      <div>
        <h3>Modular y extensible</h3>
        <p>Servicios dedicados para cada WS de ARCA, más un cliente genérico SOAP para cualquier WSDL.</p>
      </div>
    </div>
  </div>
</div>

<div class="home-section">
  <div class="home-section-header">
    <span class="home-eyebrow">Cómo funciona</span>
    <h2 class="home-section-title">De cero a facturar en minutos</h2>
    <p class="home-section-desc">Tres pasos para emitir tu primer comprobante con CAE.</p>
  </div>

  <div class="home-steps">
    <div class="home-step">
      <div class="home-step-num">1</div>
      <h3>Instalá el SDK</h3>
      <p>Agregá <code>@arcasdk/core</code> a tu proyecto Node.js con npm, yarn o pnpm.</p>
    </div>
    <div class="home-step">
      <div class="home-step-num">2</div>
      <h3>Configurá credenciales</h3>
      <p>Certificado y clave privada de ARCA. El SDK maneja WSAA y el ticket de acceso.</p>
    </div>
    <div class="home-step">
      <div class="home-step-num">3</div>
      <h3>Emití comprobantes</h3>
      <p>Llamá al servicio de facturación y obtené el CAE directamente desde tu app.</p>
    </div>
  </div>
</div>

<div class="home-section">
  <div class="home-section-header">
    <span class="home-eyebrow">Servicios</span>
    <h2 class="home-section-title">Todo el ecosistema ARCA</h2>
    <p class="home-section-desc">Wrappers tipados para los web services más usados, con documentación y ejemplos para cada uno.</p>
  </div>

  <div class="home-services">
    <a href="/services/facturacion_electronica" class="home-service">
      <span class="home-service-tag">Facturación</span>
      <div class="home-service-icon">💸</div>
      <h3>Facturación Electrónica</h3>
      <p>Emisión y autorización de comprobantes (CAE). Facturas A, B, C, notas de crédito y más.</p>
      <span class="home-service-arrow">Ver documentación →</span>
    </a>
    <a href="/services/facturacion_electronica_exportacion" class="home-service">
      <span class="home-service-tag export">Exportación</span>
      <div class="home-service-icon">🌍</div>
      <h3>Facturación de Exportación</h3>
      <p>Comprobantes WSFEX: autorización, parámetros y consultas de exportación.</p>
      <span class="home-service-arrow">Ver documentación →</span>
    </a>
    <a href="/services/factura_credito_electronica" class="home-service">
      <span class="home-service-tag">MiPyMEs</span>
      <div class="home-service-icon">🏭</div>
      <h3>Factura de Crédito</h3>
      <p>WSFECred: aceptación, rechazo, cuentas corrientes y parámetros FCE.</p>
      <span class="home-service-arrow">Ver documentación →</span>
    </a>
    <a href="/services/consulta_padron_alcance_4" class="home-service">
      <span class="home-service-tag padron">Padrón</span>
      <div class="home-service-icon">🔍</div>
      <h3>Consulta de Padrón</h3>
      <p>Validá CUITs y obtené datos fiscales actualizados en tiempo real.</p>
      <span class="home-service-arrow">Ver documentación →</span>
    </a>
    <a href="/services/consulta_padron_constancia_inscripcion" class="home-service">
      <span class="home-service-tag padron">Padrón</span>
      <div class="home-service-icon">📄</div>
      <h3>Constancia de Inscripción</h3>
      <p>Obtén y verifica constancias de inscripción de forma programática.</p>
      <span class="home-service-arrow">Ver documentación →</span>
    </a>
    <a href="/services/generic-service" class="home-service">
      <span class="home-service-tag tools">Avanzado</span>
      <div class="home-service-icon">🔧</div>
      <h3>Servicio Genérico</h3>
      <p>Llamadas SOAP a cualquier WSDL de ARCA, con o sin wrapper dedicado.</p>
      <span class="home-service-arrow">Ver documentación →</span>
    </a>
    <a href="/referencia-api" class="home-service">
      <span class="home-service-tag tools">Referencia</span>
      <div class="home-service-icon">📘</div>
      <h3>Referencia API</h3>
      <p>ArcaServiceNames, storages, DTOs y composición avanzada de servicios.</p>
      <span class="home-service-arrow">Ver documentación →</span>
    </a>
  </div>
</div>

<div class="home-section">
  <div class="home-section-header">
    <span class="home-eyebrow">Guías</span>
    <h2 class="home-section-title">Empezá por acá</h2>
    <p class="home-section-desc">Rutas recomendadas según lo que necesites hacer primero.</p>
  </div>

  <div class="home-links">
    <a href="/tutorial/obtain-testing-certificate" class="home-link">
      <span class="home-link-icon">📜</span>
      <div>
        <strong>Certificado de testing</strong>
        <span>Paso a paso para obtener tu primer certificado en homologación.</span>
      </div>
    </a>
    <a href="/services/facturacion_electronica" class="home-link">
      <span class="home-link-icon">💸</span>
      <div>
        <strong>Emitir una factura</strong>
        <span>Guía completa de facturación electrónica con ejemplos de código.</span>
      </div>
    </a>
    <a href="/packages/pdf" class="home-link">
      <span class="home-link-icon">🧾</span>
      <div>
        <strong>Generar PDF</strong>
        <span>Paquete <code>@arcasdk/pdf</code> para comprobantes listos para imprimir.</span>
      </div>
    </a>
  </div>
</div>

<div class="home-cta">
  <h2>¿Listo para integrar ARCA?</h2>
  <p>Documentación completa con tutoriales, referencia de API y solución de errores frecuentes.</p>
  <div class="home-cta-actions">
    <a href="/introduction" class="VPButton brand">Ir a la documentación</a>
    <a href="/referencia-api" class="VPButton alt">Referencia API</a>
  </div>
</div>

</div>
