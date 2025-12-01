# NX Monorepo Configuration

Este proyecto está configurado como un monorepo usando NX.

## Estructura

- `packages/core`: Paquete principal del SDK

## Comandos NX

### Build

```bash
# Build todos los proyectos
npm run build

# Build solo core
npm run build:core
# o
npx nx build core
```

### Tests

```bash
# Ejecutar todos los tests
npm run test

# Tests unitarios de core
npm run test:core:unit
# o
npx nx test:unit core

# Tests de integración de core
npm run test:core:integration
# o
npx nx test:integration core
```

### Otros comandos NX útiles

```bash
# Ver gráfico de dependencias
npx nx graph

# Ver información de un proyecto
npx nx show project core

# Ejecutar múltiples targets
npx nx run-many --target=test --all

# Limpiar cache de NX
npx nx reset
```

## Configuración

- `nx.json`: Configuración principal de NX
- `packages/core/project.json`: Configuración del proyecto core
- `.nxignore`: Archivos y carpetas ignorados por NX

## Cache

NX utiliza cache para acelerar las ejecuciones. Los resultados de `build` y `test` se cachean automáticamente.

Para limpiar el cache:

```bash
npx nx reset
```
