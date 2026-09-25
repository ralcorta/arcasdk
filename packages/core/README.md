# @arcasdk/core

**Arca SDK** — TypeScript SDK para integrar Web Services de ARCA (ex AFIP) en Node.js: facturación electrónica (WSFE), padrones, factura de crédito MiPyMEs, exportación, comprobantes T de turismo, constatación de comprobantes (WSCDC). Sin intermediarios, tipos completos, MIT.

> El paquete npm `afip.ts` es legacy. El desarrollo actual es `@arcasdk/core`.

## 🚀 Instalación

```bash
npm install @arcasdk/core
```

## 📚 Uso rápido

```ts
import { Arca } from "@arcasdk/core";

const arca = new Arca({
  cuit: 20111111112,
  cert: process.env.AFIP_CERT!,
  key: process.env.AFIP_KEY!,
  production: false,
});

const status = await arca.electronicBillingService.getServerStatus();
```

## Recursos

- **Documentación**: https://ralcorta.github.io/arcasdk
- **Referencia API**: https://ralcorta.github.io/arcasdk/referencia-api
- **Guía para agentes IA**: https://github.com/ralcorta/arcasdk/blob/main/AGENTS.md
- **GitHub**: https://github.com/ralcorta/arcasdk

## Licencia

MIT
