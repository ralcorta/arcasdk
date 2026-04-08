# Smoke / integración “como npm”

Este directorio **no** forma parte del workspace `packages/*`. Así `npm install` instala el **tarball** generado por `npm pack`, igual que un proyecto que agrega `@arcasdk/core` desde el registro.

## Uso

Desde la raíz del monorepo:

```bash
npm run test:consumer
```

Esto:

1. Empaqueta `packages/core` con `integration/scripts/pack-package-for-consumer.js` → `integration/consumer-app/vendor/core.tgz`
2. Instala dependencias del consumidor (incluye `@arcasdk/core` desde ese archivo)
3. Ejecuta Jest: smoke de API pública + suite opcional contra homologación

### Más paquetes en el monorepo

El script es genérico:

```bash
node integration/scripts/pack-package-for-consumer.js <ruta-bajo-la-raíz-del-repo> [--out ruta/salida.tgz]
```

Por defecto (sin `--out`) escribe en `integration/consumer-app/vendor/<último-segmento-del-nombre>.tgz` (p. ej. `@arcasdk/core` → `core.tgz`). Para otro consumidor:

```bash
node integration/scripts/pack-package-for-consumer.js packages/mi-lib --out integration/consumer-mi-lib/vendor/mi-lib.tgz
```

En `package.json` raíz, `pack:core` es un atajo; podés añadir `pack:mi-lib` igual que `pack:core` cuando exista el paquete.

Desde la raíz, con argumentos extra:

```bash
npm run pack:pkg -- packages/mi-lib --out integration/consumer-mi-lib/vendor/mi-lib.tgz
```

## Homologación (WSFE)

Los tests que llaman a ARCA requieren certificados y:

```bash
export ENABLE_INTEGRATION_TESTS=true
```

Variables útiles: `TEST_CUIT`, `TEST_CREDENTIALS_FOLDER`, `TEST_PRIVATE_KEY_FILE_NAME`, `TEST_CERT_FILE_NAME` (el `jest.setup.cjs` resuelve rutas relativas respecto a la raíz del repo).

Comando dedicado:

```bash
npm run test:consumer:integration
```

Las carpetas `vendor/`, `node_modules/` y `.ticket-cache/` están ignoradas por git.
