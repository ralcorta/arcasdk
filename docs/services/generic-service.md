# Servicio Genérico

El `GenericService` permite interactuar con cualquier servicio web de AFIP, incluso aquellos que no tienen una implementación específica en el SDK. Esto es útil para acceder a servicios menos comunes o para utilizar nuevas funcionalidades antes de que sean incorporadas oficialmente en el paquete.

## Uso Básico

Para utilizar el servicio genérico, se accede a través de la propiedad `genericService` de la instancia de `Arca`.

### Llamada a un servicio existente (pre-configurado)

Si el servicio ya tiene su WSDL incluido en el SDK (ver `wsdl-strings.ts`), puedes llamarlo simplemente por su nombre.

```typescript
import { Arca } from "arcasdk";

const arca = new Arca({
  cuit: 20111111112,
  cert: "...",
  key: "...",
});

async function checkServerStatus() {
  try {
    // Llamada al método 'dummy' del servicio 'ws_sr_padron_a4'
    const result = await arca.genericService.call(
      "ws_sr_padron_a4",
      "dummy",
      {}
    );

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

## Uso Avanzado

### Llamada con WSDL personalizado

Si necesitas utilizar un servicio cuyo WSDL no está incluido en el SDK, puedes proporcionar el contenido del WSDL directamente. Esto es útil para servicios nuevos o personalizados.

Debes proporcionar el contenido XML del WSDL en la opción `wsdlContent`.

```typescript
import { Arca } from "arcasdk";
import * as fs from "fs";

const arca = new Arca({
  cuit: 20111111112,
  cert: "...",
  key: "...",
});

async function callCustomService() {
  // Leer el archivo WSDL (o obtenerlo de cualquier otra fuente)
  const wsdlContent = fs.readFileSync("./path/to/custom-service.wsdl", "utf8");

  try {
    const result = await arca.genericService.call(
      "custom_service_name", // Nombre usado para la autenticación (WSAA)
      "someMethod", // Método a llamar
      { param1: "value" }, // Parámetros
      { wsdlContent } // Contenido del WSDL
    );

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
```

> **Nota Importante**: Aunque proporciones el WSDL manualmente, el primer argumento (`serviceName`) sigue siendo crucial. Este nombre se utiliza para solicitar el Ticket de Acceso (TA) al servicio de autenticación de AFIP (WSAA). Asegúrate de usar el nombre de servicio correcto (alias) que AFIP espera para la autenticación.

### Configuración de SOAP 1.2

Por defecto, el SDK intenta usar SOAP 1.2. Si el servicio que estás consumiendo solo soporta SOAP 1.1, puedes deshabilitarlo en la configuración de `Arca` o asegurarte de que tu WSDL defina correctamente los bindings.

```typescript
const arca = new Arca({
  // ... otras opciones
  useSoap12: false, // Forzar SOAP 1.1
});
```
