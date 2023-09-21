const { description } = require("../../package");

module.exports = {
  // base: '/afip.ts/',

  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "AfipTs",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "https://github.com/ralcorta/afip.ts",
    editLinks: true,
    docsDir: "docs",
    docsBranch: "main",
    editLinkText: "Editar",
    lastUpdated: true,
    nav: [
      {
        text: "Guia",
        link: "/guide/",
      },
      {
        text: "Contribuir",
        link: "/contributions/",
      },
      // {
      //   text: 'Config',
      //   link: '/config/'
      // }
    ],
    sidebar: {
      "/guide/": [
        {
          title: "Guia",
          collapsable: false,
          children: [
            "",
            "basic-use",
            "config",
            "behaviour",
            "Facturación-Electrónica",
            "Consulta-al-padron-de-AFIP-alcance-4",
            "Consulta-al-padron-de-AFIP-alcance-5",
            "Consulta-al-padron-de-AFIP-alcance-10",
            "Consulta-al-padron-de-AFIP-alcance-13",
          ],
        },
      ],
      // '/contributions/': [
      //   {
      //     title: 'Support',
      //     collapsable: false,
      //     children: [
      //       '',
      //     ]
      //   },
      // ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],

  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "es", // this will be set as the lang attribute on <html>
      title: "Afip.ts",
      description: "SDK para Web Services de Afip",
    },
    "/en/": {
      lang: "en-US",
      title: "Afip.ts",
      description: "Nodejs Package to use Afip Web Services",
    },
  },
};
