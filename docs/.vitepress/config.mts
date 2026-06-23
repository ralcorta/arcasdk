import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

// Google Analytics ID - Puedes usar una variable de entorno o poner el ID directamente
const GA_ID = "G-B4XM660Y48"; // Reemplaza con tu ID de Google Analytics

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    title: "Arca SDK",
    description: "Arca typescript SDK",
    lang: "es",
    appearance: "dark",
    sitemap: {
      hostname: "https://afipts.com",
    },
    head: [
      ["link", { rel: "icon", href: "/logo.ico" }],
      // Google Analytics
      [
        "script",
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
        },
      ],
      [
        "script",
        {},
        `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');`,
      ],
    ],
    themeConfig: {
      logo: "/logo.png",
      search: {
        provider: "local",
      },
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        {
          text: "📖 Ejemplo",
          link: "/basic-use",
        },
        {
          text: "💸 Facturar",
          link: "/services/facturacion_electronica#crear-y-asignar-cae-a-un-comprobante",
        },
      ],
      sidebar: [
        {
          text: "Guia",
          items: [
            { text: "🎉 Introducción", link: "/introduction" },
            { text: "🚀 Uso basico", link: "/basic-use" },
            { text: "📘 Referencia API", link: "/referencia-api" },
            { text: "⚙️ Configuración", link: "/config" },
            { text: "🧩 Engines SOAP", link: "/soap-engines" },
            {
              text: "☁️ Gestión de Credenciales",
              link: "/credential_management",
            },
            { text: "🧐 Comportamiento", link: "/behaviour" },
          ],
        },
        {
          text: "Servicios",
          base: "/services",
          items: [
            {
              text: "💸 Facturación electrónica",
              link: "/facturacion_electronica",
            },
            {
              text: "🌍 Facturación de exportación",
              link: "/facturacion_electronica_exportacion",
            },
            {
              text: "🏭 Factura de crédito MiPyMEs",
              link: "/factura_credito_electronica",
            },
            {
              text: "🔧 Servicio genérico",
              link: "/generic-service",
            },
            {
              text: "🔍 Consultas de padron",
              collapsed: true,
              items: [
                {
                  text: "4️⃣ Alcance 4",
                  link: "/consulta_padron_alcance_4",
                },
                {
                  text: "5️⃣ Alcance 5",
                  link: "/consulta_padron_alcance_5",
                },
                {
                  text: "🔟 Alcance 10",
                  link: "/consulta_padron_alcance_10",
                },
                {
                  text: "1️⃣ 3️⃣ Alcance 13",
                  link: "/consulta_padron_alcance_13",
                },
                {
                  text: "📃 Constancia inscripción",
                  link: "/consulta_padron_constancia_inscripcion",
                },
              ],
            },
          ],
        },
        {
          text: "Paquetes",
          items: [
            {
              text: "📄 Generador de PDF",
              link: "/packages/pdf",
            },
          ],
        },
        {
          text: "Obtener certificados",
          base: "tutorial",
          items: [
            {
              text: "Habilitar certificados de testing",
              link: "/enable_testing_certificates",
            },
            {
              text: "Obtener certificado de testing",
              link: "/obtain-testing-certificate",
            },
            {
              text: "Autorizar servicio web de testing",
              link: "/authorize-test-web-service",
            },
            {
              text: "Habilitar administrador de certificados de producción",
              link: "/enable-production-certificate-manager",
            },
            {
              text: "Obtención de certificado de producción",
              link: "/obtain-production-certificate",
            },
            {
              text: "Autorizar web service de producción",
              link: "/authorize-web-production-service",
            },
          ],
        },
        {
          text: "FAQ",
          base: "faq",
          items: [
            {
              text: "❗Errores",
              link: "/errors",
            },
          ],
        },
      ],

      socialLinks: [
        { icon: "github", link: "https://github.com/ralcorta/arcasdk" },
      ],

      footer: {
        message: "Made by Rodrigo Alcorta with ❤️",
        // copyright: `Copyright © ${new Date().getFullYear()}`,
      },
    },
  }),
);
