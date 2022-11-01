# Configuración

### Context:

La clase `Afip` recibe como parametro un objecto de tipo `Context` el cual provee de los datos basicos necesarios para el uso de los Web Services de Afip, como tambien de como debe comportarse:

- `Context`:
  - `production` <small>(boolean)</small>: Flag que permite indicar si se usara los servicios de produccion o de homologacion (Testing).
  - `cert` <small>\*(string)</small>: Contenido del certificado `(.crt)`.
  - `key` <small>\*(string)</small>: Contenido de la llave privada.
  - `cuit` <small>\*(number)</small>: Cuit del usuario a usar.
  - `authTokens` <small>(WSAuthTokens)</small>: Objeto de tipo WSAuthTokens ([Ver](https://github.com/valiulab/afip.ts/blob/main/src/auth/types.ts#L5)). Aca es donde se asigna los tokens de autenticacion si es que tiene alguno guardado.
  - `handleTicket` <small>(boolean)</small>: Flag que indica si los tickets de autenticacion son manejados localmente automaticamente por el package o van a ser dados por el desarrollador (Mas adelante se indicara como hacer log in y luego pasar los tokens antes de una llamada al Web Service deseado). Esto es util cuando se desea usar el package sobre una `lambda`, ya que en estas no podremos guardar localemnte los tokens.
  - `ticketPath` <small>(string)</small>: Ruta preferencial donde se desea guardaran los tokens obtenidos desde el servicio WSAA si no se desea la carpeta default.

<br/>
Context Type code:

```ts
type Context = {
  /**
   * Flag for production or testing environment
   *
   * @var boolean
   **/
  production?: boolean;

  /**
   * Content file for the X.509 certificate in PEM format
   *
   * @var string
   **/
  cert: string;

  /**
   * Content file for the private key correspoding to CERT (PEM)
   *
   * @var string
   **/
  key: string;

  /**
   * The CUIT to use
   *
   * @var int
   **/
  cuit: number;

  /**
   * Tokens object if you have one created before
   *
   * @var authTokens
   **/
  authTokens?: WSAuthTokens;

  /**
   * Flag that if is true, the access tickets data is handled by the developer, otherwise is saved locally.
   */
  handleTicket?: boolean;

  /**
   * The path of the auth obj if the package is auto managed
   */
  ticketPath?: string;
};
```

<br>
