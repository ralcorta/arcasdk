(window.webpackJsonp = window.webpackJsonp || []).push([
  [21],
  {
    291: function (t, e, a) {
      "use strict";
      a.r(e);
      var s = a(14),
        n = Object(s.a)(
          {},
          function () {
            var t = this,
              e = t._self._c;
            return e(
              "ContentSlotsDistributor",
              { attrs: { "slot-key": t.$parent.slotKey } },
              [
                e("h1", { attrs: { id: "contexto" } }, [
                  e(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#contexto" },
                    },
                    [t._v("#")]
                  ),
                  t._v(" Contexto"),
                ]),
                t._v(" "),
                e("h3", { attrs: { id: "afip-context" } }, [
                  e(
                    "a",
                    {
                      staticClass: "header-anchor",
                      attrs: { href: "#afip-context" },
                    },
                    [t._v("#")]
                  ),
                  t._v(" Afip Context:"),
                ]),
                t._v(" "),
                e("p", [
                  t._v("La clase "),
                  e("code", [t._v("Afip")]),
                  t._v(" recibe como parametro un objecto de tipo "),
                  e("code", [t._v("Context")]),
                  t._v(
                    " el cual provee de los datos basicos necesarios para el uso de los Web Services de Afip, como tambien de como debe comportarse:"
                  ),
                ]),
                t._v(" "),
                e("div", { staticClass: "language-ts extra-class" }, [
                  e("pre", { pre: !0, attrs: { class: "language-ts" } }, [
                    e("code", [
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token keyword" } },
                        [t._v("const")]
                      ),
                      t._v(" instance "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token operator" } },
                        [t._v("=")]
                      ),
                      t._v(" "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token keyword" } },
                        [t._v("new")]
                      ),
                      t._v(" "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token class-name" } },
                        [t._v("Afip")]
                      ),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token punctuation" } },
                        [t._v("(")]
                      ),
                      t._v("Context"),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token punctuation" } },
                        [t._v(")")]
                      ),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token punctuation" } },
                        [t._v(";")]
                      ),
                      t._v("\n"),
                    ]),
                  ]),
                ]),
                e("ul", [
                  e("li", [
                    e("code", [t._v("Context")]),
                    t._v(":\n"),
                    e("ul", [
                      e("li", [
                        e("code", [t._v("production")]),
                        t._v(" "),
                        e("small", [t._v("(boolean)")]),
                        t._v(
                          ": Flag que permite indicar si se usara los servicios de produccion o de homologacion (Testing)."
                        ),
                      ]),
                      t._v(" "),
                      e("li", [
                        e("code", [t._v("cert")]),
                        t._v(" "),
                        e("small", [t._v("*(string)")]),
                        t._v(": Contenido del certificado "),
                        e("code", [t._v("(.crt)")]),
                        t._v("."),
                      ]),
                      t._v(" "),
                      e("li", [
                        e("code", [t._v("key")]),
                        t._v(" "),
                        e("small", [t._v("*(string)")]),
                        t._v(": Contenido de la llave privada."),
                      ]),
                      t._v(" "),
                      e("li", [
                        e("code", [t._v("cuit")]),
                        t._v(" "),
                        e("small", [t._v("*(number)")]),
                        t._v(": Cuit del usuario a usar."),
                      ]),
                      t._v(" "),
                      e("li", [
                        e("code", [t._v("credentials")]),
                        t._v(" "),
                        e("small", [t._v("(WSAuthTokens)")]),
                        t._v(": Objeto de tipo WSAuthTokens ("),
                        e(
                          "a",
                          {
                            attrs: {
                              href: "https://github.com/valiulab/afip.ts/blob/main/src/auth/types.ts#L5",
                              target: "_blank",
                              rel: "noopener noreferrer",
                            },
                          },
                          [t._v("Ver"), e("OutboundLink")],
                          1
                        ),
                        t._v(
                          "). Aca es donde se asigna los tokens de autenticacion si es que tiene alguno guardado."
                        ),
                      ]),
                      t._v(" "),
                      e("li", [
                        e("code", [t._v("handleTicket")]),
                        t._v(" "),
                        e("small", [t._v("(boolean)")]),
                        t._v(
                          ": Flag que indica si los tickets de autenticacion son manejados localmente automaticamente por el package o van a ser dados por el desarrollador (Mas adelante se indicara como hacer log in y luego pasar los tokens antes de una llamada al Web Service deseado). Esto es util cuando se desea usar el package sobre una "
                        ),
                        e("code", [t._v("lambda")]),
                        t._v(
                          ", ya que en estas no podremos guardar localemnte los tokens."
                        ),
                      ]),
                      t._v(" "),
                      e("li", [
                        e("code", [t._v("ticketPath")]),
                        t._v(" "),
                        e("small", [t._v("(string)")]),
                        t._v(
                          ": Ruta preferencial donde se desea guardaran los tokens obtenidos desde el servicio WSAA si no se desea la carpeta default."
                        ),
                      ]),
                    ]),
                  ]),
                ]),
                t._v(" "),
                e("br"),
                t._v("\nContext Type code:\n"),
                e("div", { staticClass: "language-ts extra-class" }, [
                  e("pre", { pre: !0, attrs: { class: "language-ts" } }, [
                    e("code", [
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token keyword" } },
                        [t._v("type")]
                      ),
                      t._v(" "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token class-name" } },
                        [t._v("Context")]
                      ),
                      t._v(" "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token operator" } },
                        [t._v("=")]
                      ),
                      t._v(" "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token punctuation" } },
                        [t._v("{")]
                      ),
                      t._v("\n  "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token comment" } },
                        [
                          t._v(
                            "/**\n   * Flag for production or testing environment\n   *\n   * @var boolean\n   **/"
                          ),
                        ]
                      ),
                      t._v("\n  production"),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token operator" } },
                        [t._v("?")]
                      ),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token operator" } },
                        [t._v(":")]
                      ),
                      t._v(" "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token builtin" } },
                        [t._v("boolean")]
                      ),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token punctuation" } },
                        [t._v(";")]
                      ),
                      t._v("\n\n  "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token comment" } },
                        [
                          t._v(
                            "/**\n   * Content file for the X.509 certificate in PEM format\n   *\n   * @var string\n   **/"
                          ),
                        ]
                      ),
                      t._v("\n  cert"),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token operator" } },
                        [t._v(":")]
                      ),
                      t._v(" "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token builtin" } },
                        [t._v("string")]
                      ),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token punctuation" } },
                        [t._v(";")]
                      ),
                      t._v("\n\n  "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token comment" } },
                        [
                          t._v(
                            "/**\n   * Content file for the private key correspoding to CERT (PEM)\n   *\n   * @var string\n   **/"
                          ),
                        ]
                      ),
                      t._v("\n  key"),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token operator" } },
                        [t._v(":")]
                      ),
                      t._v(" "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token builtin" } },
                        [t._v("string")]
                      ),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token punctuation" } },
                        [t._v(";")]
                      ),
                      t._v("\n\n  "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token comment" } },
                        [
                          t._v(
                            "/**\n   * The CUIT to use\n   *\n   * @var int\n   **/"
                          ),
                        ]
                      ),
                      t._v("\n  cuit"),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token operator" } },
                        [t._v(":")]
                      ),
                      t._v(" "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token builtin" } },
                        [t._v("number")]
                      ),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token punctuation" } },
                        [t._v(";")]
                      ),
                      t._v("\n\n  "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token comment" } },
                        [
                          t._v(
                            "/**\n   * Tokens object if you have one created before\n   *\n   * @var credentials\n   **/"
                          ),
                        ]
                      ),
                      t._v("\n  credentials"),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token operator" } },
                        [t._v("?")]
                      ),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token operator" } },
                        [t._v(":")]
                      ),
                      t._v(" WSAuthTokens"),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token punctuation" } },
                        [t._v(";")]
                      ),
                      t._v("\n\n  "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token comment" } },
                        [
                          t._v(
                            "/**\n   * Flag that if is true, the access tickets data is handled by the developer, otherwise is saved locally.\n   */"
                          ),
                        ]
                      ),
                      t._v("\n  handleTicket"),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token operator" } },
                        [t._v("?")]
                      ),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token operator" } },
                        [t._v(":")]
                      ),
                      t._v(" "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token builtin" } },
                        [t._v("boolean")]
                      ),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token punctuation" } },
                        [t._v(";")]
                      ),
                      t._v("\n\n  "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token comment" } },
                        [
                          t._v(
                            "/**\n   * The path of the auth obj if the package is auto managed\n   */"
                          ),
                        ]
                      ),
                      t._v("\n  ticketPath"),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token operator" } },
                        [t._v("?")]
                      ),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token operator" } },
                        [t._v(":")]
                      ),
                      t._v(" "),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token builtin" } },
                        [t._v("string")]
                      ),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token punctuation" } },
                        [t._v(";")]
                      ),
                      t._v("\n"),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token punctuation" } },
                        [t._v("}")]
                      ),
                      e(
                        "span",
                        { pre: !0, attrs: { class: "token punctuation" } },
                        [t._v(";")]
                      ),
                      t._v("\n"),
                    ]),
                  ]),
                ]),
                e("br"),
              ]
            );
          },
          [],
          !1,
          null,
          null,
          null
        );
      e.default = n.exports;
    },
  },
]);
