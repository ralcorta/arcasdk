---
layout: home

hero:
  name: "Arca SDK"
  text: "Tu conexión directa con ARCA"
  tagline: La biblioteca TypeScript más robusta y moderna para integrar los servicios de ARCA (ex AFIP) en tus aplicaciones Node.js.
  image:
    src: /logo.png
    alt: Arca SDK Logo
  actions:
    - theme: brand
      text: 🚀 Comenzar Ahora
      link: /introduction
    - theme: alt
      text: 📖 Ver Documentación
      link: /basic-use
    - theme: alt
      text: 🐙 GitHub
      link: https://github.com/ralcorta/arcasdk
---

<div class="home-content">

<div class="ide-window">
  <div class="window-header">
    <div class="dots">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
    </div>
    <div class="title">quick-start.ts</div>
  </div>
  <div class="window-content">

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

// ¡Listo para facturar!
const invoice = await arca.electronicBillingService.createVoucher({
  // ... tu magia aquí
});
```

  </div>
</div>

<div class="features-grid">
  <div class="feature-item">
    <div class="feature-icon">🛡️</div>
    <h3>Type-Safe por Diseño</h3>
    <p>Disfruta de una experiencia de desarrollo superior con tipos estáticos completos. Olvídate de los errores en tiempo de ejecución.</p>
  </div>
  <div class="feature-item">
    <div class="feature-icon">⚡</div>
    <h3>Serverless Ready</h3>
    <p>Diseñada pensando en la nube. Funciona perfectamente en AWS Lambda, Vercel, Cloudflare Workers y contenedores.</p>
  </div>
  <div class="feature-item">
    <div class="feature-icon">🆓</div>
    <h3>100% Gratuito y Libre</h3>
    <p>Sin costos, sin suscripciones y sin intermediarios. Conéctate directamente a ARCA usando tus propias credenciales. Siempre gratis.</p>
  </div>
  <div class="feature-item">
    <div class="feature-icon">🌐</div>
    <h3>Universal & Versátil</h3>
    <p>Funciona donde lo necesites: Backend, Frontend (Next.js, Remix) o Scripts. Pensada para integrarse en cualquier arquitectura moderna.</p>
  </div>
</div>

## 🌟 Servicios de Poder

Explora la suite completa de herramientas diseñadas para potenciar tu negocio.

<div class="services-grid">
  <a href="/services/facturacion_electronica" class="service-card">
    <div class="card-icon">💸</div>
    <h3>Facturación Electrónica</h3>
    <p>Emisión y autorización de comprobantes (CAE) automatizada. Soporte para facturas A, B, C, notas de crédito y más.</p>
  </a>
  <a href="/services/consulta_padron_alcance_4" class="service-card">
    <div class="card-icon">🔍</div>
    <h3>Consulta de Padrón</h3>
    <p>Accede a la base de datos de contribuyentes más actualizada. Valida CUITs y obtén datos fiscales en tiempo real.</p>
  </a>
   <a href="/services/consulta_padron_constancia_inscripcion" class="service-card">
    <div class="card-icon">📄</div>
    <h3>Constancia de Inscripción</h3>
    <p>Obtén y verifica las constancias de inscripción de forma programática y segura.</p>
  </a>
</div>

## 📚 Centro de Conocimiento

Domina la integración con nuestros recursos detallados.

<div class="resources-grid">
  <a href="/introduction" class="resource-card">
    <h3>🎓 Guía de Inicio</h3>
    <p>Todo lo que necesitas saber para empezar desde cero.</p>
  </a>
  <a href="/config" class="resource-card">
    <h3>⚙️ Configuración Avanzada</h3>
    <p>Ajusta la SDK a tus necesidades específicas.</p>
  </a>
  <a href="/credential_management" class="resource-card">
    <h3>🔑 Gestión de Credenciales</h3>
    <p>Aprende a manejar certificados de forma segura.</p>
  </a>
  <a href="/tutorial/enable_testing_certificates" class="resource-card">
    <h3>🧪 Modo Testing</h3>
    <p>Configura tu entorno de pruebas sin miedo a romper nada.</p>
  </a>
</div>

</div>

<style>
/* Hero Title Gradient */
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
}

/* Animated Background */
.VPHome {
  background: radial-gradient(circle at 50% 0%, rgba(189, 52, 254, 0.1) 0%, transparent 60%),
              radial-gradient(circle at 80% 10%, rgba(65, 209, 255, 0.1) 0%, transparent 50%);
  animation: bg-pulse 10s ease-in-out infinite alternate;
}

@keyframes bg-pulse {
  0% { background-size: 100% 100%; }
  100% { background-size: 120% 120%; }
}

.home-content {
  margin-top: 0;
}

/* IDE Window Styling */
.ide-window {
  background: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  overflow: hidden;
  margin: 0 auto 4rem auto;
  border: 1px solid #333;
  max-width: 900px;
  animation: slide-up 0.8s ease-out;
}

@keyframes slide-up {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.window-header {
  background: #2d2d2d;
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #333;
  position: relative;
}

.dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f56; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #27c93f; }

.window-header .title {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  color: #999;
  font-family: monospace;
  font-size: 0.9rem;
  pointer-events: none;
}

.window-content {
  padding: 0;
}

.window-content div[class*='language-'] {
  margin: 0 !important;
  border-radius: 0 !important;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
}

.feature-item {
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fade-in-up 0.5s ease-out forwards;
  opacity: 0;
}

.feature-item:nth-child(1) { animation-delay: 0.1s; }
.feature-item:nth-child(2) { animation-delay: 0.2s; }
.feature-item:nth-child(3) { animation-delay: 0.3s; }
.feature-item:nth-child(4) { animation-delay: 0.4s; }
.feature-item:nth-child(5) { animation-delay: 0.5s; }
.feature-item:nth-child(6) { animation-delay: 0.6s; }
.feature-item:nth-child(7) { animation-delay: 0.7s; }
.feature-item:nth-child(8) { animation-delay: 0.8s; }

.feature-item:hover {
  transform: translateY(-5px);
  background-color: rgba(255, 255, 255, 0.1);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 20px rgba(189, 52, 254, 0.2);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.feature-item h3 {
  margin: 0 0 0.5rem 0;
  font-weight: 600;
  font-size: 1.1rem;
}

.feature-item p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
}

.service-card {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-decoration: none !important;
  height: 100%;
}

.service-card:hover {
  transform: translateY(-5px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 30px rgba(65, 209, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.1);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.service-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

/* Resources Grid */
.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.resource-card {
  padding: 1.5rem;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
  text-decoration: none !important;
}

.resource-card:hover {
  border-color: var(--vp-c-brand-2);
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 15px rgba(189, 52, 254, 0.15);
}

.resource-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.resource-card p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.home-content h2 {
  border-top: none !important;
  text-align: center;
  margin-top: 4rem !important;
  margin-bottom: 2rem !important;
  font-size: 2rem;
  font-weight: 700;
  background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
