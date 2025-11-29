# Infrastructure Layer

Esta capa contiene los **ports** (interfaces) y **adapters** (implementaciones) que conectan la aplicación con sistemas externos.

## Estructura

```
infrastructure/
└── outbound/
    ├── ports/              # Interfaces (contratos)
    │   ├── auth-repository.port.ts
    │   ├── soap-client.port.ts
    │   ├── ticket-storage.port.ts
    │   └── logger.port.ts
    │
    ├── adapters/           # Implementaciones
    │   ├── soap/
    │   │   ├── soap-client.adapter.ts
    │   │   └── soap-client-facade.ts
    │   ├── auth/
    │   │   └── afip-auth.adapter.ts
    │   ├── storage/
    │   │   └── file-system-ticket-storage.adapter.ts
    │   └── logger/
    │       └── winston-logger.adapter.ts
```

## Ports (Interfaces)

### 1. IAuthRepositoryPort
- **Ubicación**: `ports/auth-repository.port.ts`
- **Propósito**: Contrato para operaciones de autenticación
- **Métodos**:
  - `requestLogin(serviceName: string): Promise<AccessTicket>`
  - `getAuthParams(ticket: AccessTicket, cuit: number): WSAuthParam`

### 2. ISoapClientPort
- **Ubicación**: `ports/soap-client.port.ts`
- **Propósito**: Contrato para cliente SOAP
- **Métodos**:
  - `createClient<T>(wsdlPath: string, options?: any): Promise<T>`
  - `setEndpoint(client: any, endpoint: string): void`
  - `call<T>(client: any, methodName: string, params: any): Promise<T>`

### 3. ITicketStoragePort
- **Ubicación**: `ports/ticket-storage.port.ts`
- **Propósito**: Contrato para almacenamiento de tickets
- **Métodos**:
  - `save(ticket: AccessTicket, serviceName: string): Promise<void>`
  - `get(serviceName: string): Promise<AccessTicket | null>`
  - `delete(serviceName: string): Promise<void>`

### 4. ILoggerPort
- **Ubicación**: `ports/logger.port.ts`
- **Propósito**: Contrato para logging
- **Métodos**:
  - `info(message: string, meta?: any): void`
  - `error(message: string, error?: Error, meta?: any): void`
  - `warn(message: string, meta?: any): void`
  - `debug(message: string, meta?: any): void`

## Adapters (Implementaciones)

### 1. SoapClientAdapter
- **Port**: `ISoapClientPort`
- **Implementación**: Usa la librería `soap` a través de `SoapClientFacade`
- **Características**:
  - Configura HTTPS agent para servidores legacy (minDHSize: 512)
  - Soporta SOAP 1.1 y 1.2
  - Maneja creación de clientes, endpoints y llamadas

### 2. AfipAuthRepositoryAdapter
- **Port**: `IAuthRepositoryPort`
- **Implementación**: Autenticación con AFIP/ARCA usando WSAA
- **Características**:
  - Crea y firma TRA (Token Request Authorization)
  - Maneja tickets existentes para evitar "alreadyAuthenticated"
  - Soporta `handleTicket` para gestión manual/automática
  - Integra con `ITicketStoragePort` para persistencia

### 3. FileSystemTicketStorageAdapter
- **Port**: `ITicketStoragePort`
- **Implementación**: Almacenamiento en sistema de archivos
- **Características**:
  - Guarda tickets como archivos JSON
  - Crea directorios automáticamente
  - Maneja lectura/escritura/eliminación de tickets
  - Nombres de archivo: `TA-{CUIT}-{serviceName}.json`

### 4. WinstonLoggerAdapter
- **Port**: `ILoggerPort`
- **Implementación**: Logger usando Winston
- **Características**:
  - Soporta info, error, warn, debug
  - Configurable (puede estar silencioso)
  - Usa `createArcaLogger` utility

## Principio de Diseño

Los **ports** definen **qué** necesita la aplicación.
Los **adapters** definen **cómo** se implementa.

La aplicación depende de ports (abstracciones), no de adapters (implementaciones).

## Uso

```typescript
// Los adaptadores se instancian y se inyectan en los casos de uso
const soapClient = new SoapClientAdapter();
const ticketStorage = new FileSystemTicketStorageAdapter({...});
const authRepository = new AfipAuthRepositoryAdapter(soapClient, {...});
const logger = new WinstonLoggerAdapter(enableLogging);
```
