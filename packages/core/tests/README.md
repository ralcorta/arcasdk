# Tests de Integración con Certificados de Homologación

Este proyecto soporta tests de integración usando certificados reales de homologación (testeo) contra los servidores de ARCA/AFIP.

## Configuración

### 1. Obtener Certificados de Homologación

Primero necesitas obtener los certificados de homologación desde el sitio de ARCA:

- [Habilitar Certificados de Homologación](https://www.afip.gob.ar/fe/ayuda/documentos/manual-desarrollador-v.2.21.pdf)

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (o copia `.env.example`) con las siguientes variables:

```env
# CUIT de prueba para tests (CUIT de homologación)
TEST_CUIT=20111111112

# Carpeta donde se encuentran los certificados de homologación
# Puede ser una ruta absoluta o relativa al directorio del proyecto
TEST_CREDENTIALS_FOLDER=test-credentials

# Nombre del archivo de clave privada (certificado de homologación)
TEST_PRIVATE_KEY_FILE_NAME=homologacion.key

# Nombre del archivo de certificado (certificado de homologación)
TEST_CERT_FILE_NAME=homologacion.crt

# Habilitar tests de integración reales (usa servidores de homologación)
# Si es false, los tests usarán mocks
ENABLE_INTEGRATION_TESTS=false
```

### 3. Estructura de Archivos

Coloca tus certificados de homologación en la carpeta especificada:

```
test-credentials/
  ├── homologacion.key  # Clave privada
  └── homologacion.crt  # Certificado
```

## Uso en Tests

### Método Recomendado: `getIntegrationTestContext`

Usa el método `getIntegrationTestContext` que automáticamente:

- Configura `production: false` para usar servidores de homologación
- Carga los certificados desde las variables de entorno
- Muestra advertencias si los certificados no están disponibles

```typescript
import { ContextTest } from "../../utils/context-test.utils";
import { Arca } from "../../../src/arca";

describe("Mi Test", () => {
  beforeEach(async () => {
    // Obtiene contexto configurado para homologación
    const context = await ContextTest.getIntegrationTestContext({
      cuit: 20111111112,
      handleTicket: false, // opcional
    });

    const arca = new Arca(context);
    // ... usar arca para tests
  });
});
```

### Verificar Certificados Reales

Puedes verificar si los certificados reales están disponibles:

```typescript
const hasRealCerts = await ContextTest.hasRealCertificates();
if (!hasRealCerts) {
  console.warn("Usando certificados mock - los tests no harán llamadas reales");
}
```

## Ejecutar Tests

### Tests con Mocks (por defecto)

```bash
# Ejecutar todos los tests (unit + integration)
npm test

# Ejecutar solo tests unitarios
npm run test:unit
```

Los tests usarán certificados mock y no harán llamadas reales a los servidores.

### Tests de Integración Real

Para ejecutar tests de integración reales contra servidores de homologación:

1. Configura las variables de entorno con certificados reales (ver sección "Configurar Variables de Entorno")
2. Coloca los certificados en la carpeta especificada
3. Ejecuta los tests de integración:

```bash
# Ejecutar todos los tests de integración
npm run test:integration

# Ejecutar un test de integración específico
npm run test:integration -- tests/integration/electronic-billing.integration.test.ts

# Ejecutar tests con manejo automático de tokens (por defecto)
npm run test:integration:auto

# Ejecutar tests con manejo manual de tokens (para lambdas/serverless)
npm run test:integration:manual

# Ejecutar tests de integración en modo watch
npm run test:integration:watch

# Ejecutar un test específico por nombre
npm run test:integration -- --testNamePattern="should get server status"
```

Si los certificados están configurados correctamente, los tests harán llamadas reales a los servidores de homologación de ARCA/AFIP.

**Nota:** Si no hay certificados configurados, los tests de integración se saltarán automáticamente (skipped) con un mensaje informativo.

## Notas Importantes

- **Siempre usa `production: false`** en tests para apuntar a servidores de homologación
- Los certificados de homologación son diferentes a los de producción
- Los servidores de homologación tienen límites de rate limiting
- Los tests de integración pueden ser más lentos que los tests con mocks

## Resetear Datos en Homologación

**⚠️ Importante:** Los servidores de homologación de ARCA/AFIP **NO permiten borrar o resetear datos** una vez creados. Los comprobantes y datos creados en homologación persisten en el servidor.

### Opciones disponibles:

1. **Usar CUITs específicas de homologación**: ARCA proporciona CUITs específicas para testing que pueden resetearse periódicamente por su parte.

2. **Aceptar que los datos persisten**: Los datos creados durante los tests permanecerán en el servidor de homologación. Esto es normal y esperado.

3. **Contactar a ARCA**: Si necesitas resetear datos específicos, puedes contactar al soporte de ARCA para solicitar un reseteo manual del ambiente de homologación (esto puede tomar tiempo y no está garantizado).

4. **Usar diferentes puntos de venta**: Para evitar conflictos, puedes usar diferentes puntos de venta en tus tests.

### Recomendaciones para tests:

- **No crear comprobantes en tests de integración** a menos que sea necesario para probar funcionalidad específica
- **Usar solo métodos de consulta** (`getSalesPoints`, `getVoucherTypes`, etc.) cuando sea posible
- **Documentar qué datos se crean** para referencia futura
- **Usar números de comprobante incrementales** para evitar duplicados

## Troubleshooting

### Error: "Test key file not found"

Asegúrate de que:

- La variable `TEST_CREDENTIALS_FOLDER` apunta a la carpeta correcta
- Los archivos de certificados existen y tienen los nombres correctos
- Tienes permisos de lectura en los archivos

### Error: "Using mock certificates"

Esto es normal si no has configurado los certificados. Los tests funcionarán con mocks.

### Error de conexión SSL

Si tienes problemas de SSL con los servidores de homologación, verifica que:

- Los certificados sean válidos y no estén expirados
- La configuración de SSL en `ArcaService` esté correcta
