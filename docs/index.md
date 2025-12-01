---
layout: home

hero:
  name: "Arca SDK"
  text: "SDK TypeScript para ARCA"
  tagline: Solución moderna y completa para consumir los Web Services de ARCA (ex AFIP)
  image:
    src: /logo.png
    alt: Arca SDK Logo
  actions:
    - theme: brand
      text: 🚀 Comenzar
      link: /introduction
    - theme: alt
      text: 📖 Ver Ejemplos
      link: /basic-use
    - theme: alt
      text: 💸 Facturar
      link: /services/facturacion_electronica#crear-y-asignar-cae-a-un-comprobante

features:
  - icon: 🎯
    title: TypeScript Nativo
    details: Desarrollado 100% en TypeScript con tipado fuerte y autocompletado completo para una experiencia de desarrollo excepcional.
  - icon: ⚡
    title: Soporte Serverless
    details: Gestión inteligente de tokens de autenticación, perfecto para arquitecturas serverless y aplicaciones modernas.
  - icon: 🔒
    title: Seguro y Confiable
    details: Manejo seguro de certificados y credenciales, siguiendo las mejores prácticas de seguridad.
  - icon: 📦
    title: Fácil de Integrar
    details: Instalación simple con npm/yarn, configuración mínima y API intuitiva para empezar rápidamente.
  - icon: 🛠️
    title: Múltiples Servicios
    details: Soporte completo para Facturación Electrónica, Consultas de Padrón y más servicios de ARCA.
  - icon: 📚
    title: Documentación Completa
    details: Guías detalladas, ejemplos prácticos y tutoriales paso a paso para todos los casos de uso.
---

## ⚡ Inicio Rápido

Instala el paquete y comienza a usar Arca SDK en minutos:

```bash
npm i @arcasdk/core --save
# o
yarn add @arcasdk/core
```

```ts
import { Arca } from "@arcasdk/core";

const arca = new Arca({
  key: "private_key_content",
  cert: "crt_content",
  cuit: 20111111112,
});

// Crear una factura electrónica
const invoice = await arca.electronicBillingService.createVoucher({
  // ... configuración de la factura
});
```

## 🎯 Servicios Disponibles

<div class="services-grid">

### 💸 Facturación Electrónica

Emití comprobantes electrónicos con CAE automático. Soporte completo para todos los tipos de comprobantes.

[Ver documentación →](/services/facturacion_electronica)

### 🔍 Consultas de Padrón

Consulta información de contribuyentes con múltiples alcances disponibles.

- [Alcance 4](/services/consulta_padron_alcance_4)
- [Alcance 5](/services/consulta_padron_alcance_5)
- [Alcance 10](/services/consulta_padron_alcance_10)
- [Alcance 13](/services/consulta_padron_alcance_13)
- [Constancia de Inscripción](/services/consulta_padron_constancia_inscripcion)

</div>

## 📖 Recursos

<div class="resources-grid">

### 🎓 Guías

- [Introducción](/introduction) - Conoce los servicios disponibles
- [Uso Básico](/basic-use) - Primeros pasos con la SDK
- [Configuración](/config) - Opciones avanzadas de configuración
- [Gestión de Credenciales](/credential_management) - Manejo seguro de certificados

### 🛠️ Tutoriales

- [Obtener Certificados de Testing](/tutorial/enable_testing_certificates)
- [Obtener Certificados de Producción](/tutorial/enable-production-certificate-manager)
- [Autorizar Servicios Web](/tutorial/authorize-test-web-service)

### 💬 Ayuda

- [FAQ - Errores Comunes](/faq/errors)
- [Comportamiento de la SDK](/behaviour)
- [Contribuir](/contribution)

</div>

<style>
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.services-grid h3 {
  margin-top: 0;
  color: var(--vp-c-brand-1);
}

.services-grid ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.resources-grid h3 {
  margin-top: 0;
  color: var(--vp-c-brand-1);
  font-size: 1.1rem;
}

.resources-grid ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  list-style: none;
}

.resources-grid ul li {
  margin: 0.5rem 0;
}

.resources-grid ul li::before {
  content: "→ ";
  color: var(--vp-c-brand-1);
  font-weight: bold;
}

@media (max-width: 768px) {
  .services-grid,
  .resources-grid {
    grid-template-columns: 1fr;
  }
}
</style>
