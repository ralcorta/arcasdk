# Outbound Ports

Los **ports** (puertos) definen los contratos que la aplicación necesita para interactuar con sistemas externos.

## Principio

Los ports son **interfaces** que definen **qué** necesita la aplicación, sin especificar **cómo** se implementa.

## Ports Disponibles

1. **IAuthRepositoryPort** - Autenticación con AFIP/ARCA
2. **ISoapClientPort** - Cliente SOAP
3. **ITicketStoragePort** - Almacenamiento de tickets
4. **ILoggerPort** - Logging

## Implementaciones

Cada port tiene una o más implementaciones (adapters) en las carpetas correspondientes:
- `../auth/` - Implementaciones de autenticación
- `../soap/` - Implementaciones de cliente SOAP
- `../storage/` - Implementaciones de almacenamiento
- `../logger/` - Implementaciones de logger

