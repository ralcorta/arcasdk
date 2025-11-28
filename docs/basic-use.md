# 🚀 Uso Básico

### Ejemplo Básico

Para utilizar la SDK, debes instanciar la clase `Arca` proporcionando los siguientes datos mínimos:

- [`key`](https://www.afip.gob.ar/ws/documentacion/certificados.asp): Contenido de la clave privada generada para ARCA.
- [`cert`](https://www.afip.gob.ar/ws/documentacion/certificados.asp): Contenido del certificado generado en ARCA.
- `cuit`: CUIT del usuario.

Esto resultará en la creación de un objeto con los servicios disponibles para su uso, como por ejemplo `electronicBillingService`:

```ts:line-numbers
import { Arca } from "@arcasdk/core";

const arca: Arca = new Arca({
  key: "contenido_de_la_clave_privada",
  cert: "contenido_del_certificado",
  cuit: 20111111112,
});

const factura = await arca.electronicBillingService.createInvoice({
  // datos de la factura
});
```

La clase `Arca` acepta un parámetro adicional en el constructor llamado "contexto" (ver tipo). Aquí se explican todos los comportamientos que puede tomar Arca.
