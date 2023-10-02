# ☁️ Gestión de Credenciales

### Gestión de credenciales

Por defecto, el paquete guardará automáticamente las credenciales recibidas del Web Service de AFIP al iniciar sesión. Estas credenciales se almacenan para su posterior uso en las request que las requieran. Esta práctica se debe a que el servicio de autenticación de AFIP (WSAA) limita la generación de credenciales para un usuario en intervalos de tiempo específicos, como se explica en la sección de [comportamientos](./behaviour).

Sin embargo, si estás trabajando en un entorno que no puede administrar el espacio de memoria de manera prolongada para almacenar estas credenciales, debes encargarte de su gestión de forma manual. Para ello, puedes utilizar la función de inicio de sesión proporcionada y especificarle a la instancia que lo manejaras por tu cuenta, agregandole al contexto dado en el momento de la isntancia de afip el flag `handleTicket` en `true`. Cada Service tiene su propio método de inicio de sesión, el cual devuelve un objeto JSON que contiene las credenciales. Estas credenciales deben guardarse de manera segura para poder proporcionarlas posteriormente a la instancia de Afip. Puedes hacerlo a través de su constructor o configurándolas con el método `.setCredentials(credentials)`.

Una vez que las credenciales se han configurado correctamente, puedes ejecutar cualquier método desde tu servicio de AFIP. El paquete automáticamente adjuntará las credenciales necesarias a la solicitud correspondiente.


#### Ejemplo
```ts:line-numbers
import { Afip } from "afip.ts";

const afip: Afip = new Afip({
  key: "contenido_de_la_clave_privada",
  cert: "contenido_del_certificado",
  cuit: 20111111112,
  handleTicket: true,
});

const ticket = await afip.electronicBillingService.login();

// Aca podes agregar código para almacenar el ticket y utilizarlo en futuras ocasiones.

afip.electronicBillingService.setCredentials(ticket);

// Podemos chequear si la credencial que le guardamos es valida (osea que no se haya vencido)
const status = afip.electronicBillingService.isCredentialStillValid();
if(!status)
  throw new Error("Credencial expirada");

// Facturamos normalmente
const factura = await afip.electronicBillingService.createInvoice({
  // datos de la factura
});
```