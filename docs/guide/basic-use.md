# Uso Básico

### Ejemplo de como generar factura electronica:

```ts
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
