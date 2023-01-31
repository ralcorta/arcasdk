# Uso Básico

### Ejemplo basico:

Para usar la SDK debemos instanciar la clase `Afip` con los siguientes minimos datos:

- [`key`](https://www.afip.gob.ar/ws/documentacion/certificados.asp) : Contenido de la clave privada generada para Afip
- [`cert`](https://www.afip.gob.ar/ws/documentacion/certificados.asp) : Contenido del certificado generado en Afip
- `cuit` : Cuit del usuario

Esto data como resultado un objecto con los respectivos servicios disponibles para usar, como por ejemplo `electronicBillingService`:

```ts
import { Afip } from "afipts";

const afip: Afip = new Afip({
  key: "private_key_content",
  cert: "crt_content",
  cuit: 20111111112,
});

const voucher = await afip.electronicBillingService.createInvoice({
  // voucher data
});
```

<br>

La clase Afip recibe como parametro en el constructor el contexto (Ver type). Ahi esta explicado todos los comportamientos que puede tomar afip.
