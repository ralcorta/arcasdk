# Guía de Contribución

Gracias por tu interés en contribuir a arcasdk. Esta guía te ayudará a entender cómo contribuir al proyecto de manera efectiva.

## Código de Conducta

Por favor, sé respetuoso con otros contribuyentes. Esperamos un ambiente inclusivo y colaborativo.

## Reportando Issues

Si encontraste un bug o tienes una sugerencia:

1. **Busca primero**: Revisa [issues existentes](https://github.com/ralcorta/arcasdk/issues) para evitar duplicados
2. **Crea un nuevo issue**: [Abre un issue aquí](https://github.com/ralcorta/arcasdk/issues/new)
3. **Incluye detalles**:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Versión de arcasdk y Node.js

## Reportando Vulnerabilidades de Seguridad

⚠️ **NO abras un issue público para vulnerabilidades de seguridad**

En su lugar, lee [SECURITY.md](.github/SECURITY.md) para instrucciones.

## Configuración del Desarrollo

### 1. Clonar y Preparar

```bash
git clone https://github.com/ralcorta/arcasdk.git
cd arcasdk
npm install
```

### 2. Crear una rama

Usa convenciones de nombres claras:

```bash
# Features
git checkout -b feature/nombre-descriptivo

# Bug fixes
git checkout -b fix/descripcion-del-bug

# Documentation
git checkout -b docs/tema

# Performance
git checkout -b perf/descripcion
```

## Desarrollo

### Estructura del Proyecto

```
packages/
├── core/              # SDK principal
│   ├── src/
│   ├── tests/
│   └── jest.config.js
docs/                  # Documentación
.github/
├── workflows/         # CI/CD pipelines
└── actions/           # Custom GitHub Actions
```

### Comandos Útiles

```bash
# Lint (verifica código)
npm run lint

# Tests (unit tests)
npm run test

# Tests con cobertura
npm run test:coverage

# Build
npm run build

# Watch mode para desarrollo
npm run test -- --watch
```

### Estándares de Calidad

Antes de pushear, asegúrate de:

- Tests pasan: `npm test`
- Coverage thresholds se cumplen (85% statements, 80% branches, 95% functions)
- Lint sin errores: `npm run lint`
- TypeScript sin errores: `npm run build`
- Tests para nueva funcionalidad
- Documentación actualizada

## Convenciones de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Tipos de Commits

- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato/linting (sin cambios funcionales)
- `refactor`: Refactorización de código
- `perf`: Mejoras de performance
- `test`: Agregación/actualización de tests
- `chore`: Cambios en dependencias, build, etc.

### Ejemplos

```bash
git commit -m "feat(register): agregar validación de CUIT"
git commit -m "fix(auth): resolver issue de token expirado"
git commit -m "docs: actualizar README con ejemplos"
git commit -m "test(coverage): agregar tests para error handling"
```

## Pull Requests

### Antes de Abrir un PR

1. **Sincroniza con main**:

   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Corre los tests**:

   ```bash
   npm run lint
   npm test
   npm run test:coverage
   ```

3. **Prueba tu código**:
   ```bash
   npm run build
   ```

### Al Abrir un PR

1. **Título descriptivo**: Usa el mismo formato que commits
2. **Descripción clara**:
   - ¿Qué cambia?
   - ¿Por qué es necesario?
   - ¿Cómo se prueba?
3. **Enlaza issues relacionados**: Usa `Closes #123` en la descripción
4. **Tests y cobertura**: Asegúrate que los checks de CI pasen

### Ejemplo de PR

```markdown
## Descripción

Agregué validación de CUIT según normas AFIP

## Cambios

- Valida que CUIT tenga 11 dígitos
- Verifica dígito verificador con algoritmo AFIP

## Relacionado

Closes #45

## Tests

- Tests unitarios agregados
- Cobertura: 95%
- CI/CD: Todos los checks pasaron
```

## Guía de Código

### TypeScript

- Usa `strict: true` en tsconfig
- Evita `any` - define tipos correctos
- Usa interfaces para contratos públicos
- Documenta funciones públicas

### Tests

- Mínimo 1 test por función pública
- Usa descriptores claros
- Test happy path + edge cases
- Mock dependencias externas

### Documentación

- Comenta código complejo
- Actualiza README si cambias comportamiento
- Documenta cambios breaking en CHANGELOG.md

## Proceso de Review

1. **CI/CD**: Los checks automatizados deben pasar
2. **Review**: Un mantenedor revisará el código
3. **Feedback**: Responde preguntas y ajusta si es necesario
4. **Merge**: Un mantenedor mergeará cuando esté aprobado

## Publicación

Los releases se publican automáticamente:

1. Commits en `main` se analizan automáticamente
2. Semver se calcula basado en commits
3. Version se actualiza y publica a NPM
4. GitHub Release se crea automáticamente

## Ayuda

- 📖 [Documentación oficial](../docs/index.md)
- 💬 [Discusiones](https://github.com/ralcorta/arcasdk/discussions)
- 🐛 [Issues](https://github.com/ralcorta/arcasdk/issues)

## Licencia

Al contribuir, aceptas que tu código sea distribuido bajo la licencia ISC.

---

¡Gracias por contribuir a arcasdk! 🚀

### Convenciones

- Commits: usar Conventional Commits (`feat:`, `fix:`, `test:`, `docs:`, `refactor:`).
- Ramas: usar prefijos `feat/`, `fix/`, `test/`, `docs/`, `chore/`.
