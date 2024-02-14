import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Afip TS",
  description: "Afip typescript SDK",
  lang: "es",
  head: [["link", { rel: "icon", href: "/logo.ico" }]],
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
          { text: "⚙️ Configuración", link: "/config" },
          { text: "🧐 Comportamiento", link: "/behaviour" },
          {
            text: "☁️ Gestión de Credenciales",
            link: "/credential_management",
          },
        ],
      },
      {
        text: "🛠️ Servicios",
        base: "/services",
        items: [
          {
            text: "💸 Facturación electrónica",
            link: "/facturacion_electronica",
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
        text: "📚 Obtener certificados",
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
        text: "💬 FAQ",
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
      { icon: "github", link: "https://github.com/ralcorta/afip.ts" },
    ],

    footer: {
      message: "Made by Rodrigo Alcorta with ❤️",
      // copyright: `Copyright © ${new Date().getFullYear()}`,
    },
  },
});
