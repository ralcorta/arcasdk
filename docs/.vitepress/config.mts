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
        text: "📖 Guia",
        link: "/guide/index",
      },
      // {
      //   text: "Contribuir",
      //   link: "/contributions/index",
      // },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Guia",
          base: "/guide",
          items: [
            { text: "🎉 Introducción", link: "/index" },
            { text: "🚀 Uso basico", link: "/basic-use" },
            { text: "⚙️ Configuración", link: "/config" },
            { text: "🧐 Comportamiento", link: "/behaviour" },
            {
              text: "🛠️ Servicios",
              base: "/guide/services",
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
                  ],
                },
              ],
            },
            {
              text: "☁️ Gestión de Credenciales",
              link: "/credential_management",
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/ralcorta/afip.ts" },
    ],

    footer: {
      message: "Made by Rodrigo Alcorta with ❤️",
      // copyright: `Copyright © ${new Date().getFullYear()}`,
    },
  },
});
