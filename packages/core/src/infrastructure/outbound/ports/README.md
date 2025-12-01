# Outbound Ports

Los **ports** (puertos) definen los contratos que la aplicación necesita para interactuar con sistemas externos.

## Principio

Los ports son **interfaces** que definen **qué** necesita la aplicación, sin especificar **cómo** se implementa.

## Ports Disponibles

1. **ISoapClientPort** - Cliente SOAP
2. **ITicketStoragePort** - Almacenamiento de tickets
3. **ILoggerPort** - Logging

> **Nota**: La autenticación se maneja a través del puerto de aplicación `IAuthenticationRepositoryPort` definido en `@application/ports/authentication/authentication-repository.port.ts`, siguiendo el principio de inversión de dependencias.

## Implementaciones

Cada port tiene una o más implementaciones (adapters) en las carpetas correspondientes:
- `../auth/` - Implementaciones de autenticación
- `../soap/` - Implementaciones de cliente SOAP
- `../storage/` - Implementaciones de almacenamiento
- `../logger/` - Implementaciones de logger

