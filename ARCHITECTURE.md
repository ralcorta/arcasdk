# Arquitectura Hexagonal - ARCA SDK

## Visión General

Este documento describe la arquitectura hexagonal (Ports & Adapters) completa para el SDK de ARCA/AFIP. La arquitectura separa la lógica de negocio de los detalles de infraestructura, facilitando el testing, mantenimiento y evolución del código.

## Estructura de Capas

```
src/
├── domain/                    # Capa de Dominio (Core Business Logic)
│   ├── entities/              # Entidades de dominio
│   │   ├── access-ticket.ts
│   │   ├── voucher.ts
│   │   └── taxpayer.ts
│   └── value-objects/         # Value Objects (inmutables)
│       ├── cuit.ts
│       ├── cae.ts
│       └── voucher-number.ts
│
├── application/               # Capa de Aplicación (Use Cases)
│   ├── use-cases/
│   │   ├── authentication/
│   │   │   └── login.use-case.ts
│   │   ├── electronic-billing/
│   │   │   ├── create-voucher.use-case.ts
│   │   │   ├── get-sales-points.use-case.ts
│   │   │   ├── get-voucher-types.use-case.ts
│   │   │   └── ...
│   │   └── register/
│   │       ├── get-taxpayer-details.use-case.ts
│   │       └── get-server-status.use-case.ts
│   └── services/              # Application Services (Orquestadores)
│       ├── electronic-billing.service.ts
│       └── register.service.ts
│
├── interfaces/                # Capa de Interfaces (Ports)
│   ├── inbound/               # Puertos de entrada (driven by application)
│   │   ├── electronic-billing.port.ts
│   │   └── register.port.ts
│   └── outbound/              # Puertos de salida (driven by domain/application)
│       ├── auth-repository.port.ts
│       ├── soap-client.port.ts
│       ├── ticket-storage.port.ts
│       └── logger.port.ts
│
└── infrastructure/            # Capa de Infraestructura (Adapters)
    ├── inbound/               # Adaptadores de entrada (opcional, para CLI/API)
    │   └── cli/
    └── outbound/              # Adaptadores de salida
        ├── soap/
        │   └── soap-client.adapter.ts
        ├── auth/
        │   └── afip-auth.adapter.ts
        ├── storage/
        │   └── file-system-ticket-storage.adapter.ts
        └── logger/
            └── winston-logger.adapter.ts
```

## Descripción de Capas

### 1. Domain (Dominio)

**Responsabilidad**: Contiene la lógica de negocio pura, sin dependencias externas.

#### Entities (Entidades)
- **AccessTicket**: Representa un ticket de autenticación con sus reglas de negocio
  - Validación de expiración
  - Formato de autenticación para SOAP
  - Métodos de acceso a token y sign

- **Voucher**: Representa un comprobante electrónico
  - Validaciones de negocio (Factura C no tiene IVA, etc.)
  - Cálculo de totales
  - Validación de rangos de comprobantes

- **Taxpayer**: Representa un contribuyente (opcional, para futuras expansiones)

#### Value Objects
- **CUIT**: Representa un CUIT válido con validación
- **CAE**: Código de Autorización Electrónico
- **VoucherNumber**: Número de comprobante con validaciones

### 2. Application (Aplicación)

**Responsabilidad**: Orquesta casos de uso y coordina entre dominio e infraestructura.

#### Use Cases (Casos de Uso)
Cada caso de uso representa una acción específica del negocio:

- **Authentication**:
  - `LoginUseCase`: Autentica con AFIP/ARCA

- **Electronic Billing**:
  - `CreateVoucherUseCase`: Crea un comprobante electrónico
  - `GetSalesPointsUseCase`: Obtiene puntos de venta
  - `GetVoucherTypesUseCase`: Obtiene tipos de comprobantes
  - `GetLastVoucherUseCase`: Obtiene último comprobante autorizado
  - `GetVoucherInfoUseCase`: Obtiene información de un comprobante
  - `GetParameterTypesUseCase`: Obtiene tipos de parámetros (documentos, conceptos, etc.)

- **Register**:
  - `GetTaxpayerDetailsUseCase`: Obtiene detalles de contribuyente
  - `GetServerStatusUseCase`: Obtiene estado del servidor

#### Application Services
Orquestan múltiples casos de uso y exponen la API pública:

- **ElectronicBillingService**: Expone todos los casos de uso de facturación electrónica
- **RegisterService**: Expone todos los casos de uso de registro

### 3. Interfaces (Puertos)

**Responsabilidad**: Define contratos que la aplicación necesita, sin implementación.

#### Inbound Ports (Puertos de Entrada)
Interfaces que la aplicación expone hacia el exterior:

- **IElectronicBillingPort**: Contrato para operaciones de facturación electrónica
- **IRegisterPort**: Contrato para operaciones de registro

#### Outbound Ports (Puertos de Salida)
Interfaces que la aplicación necesita de infraestructura:

- **IAuthRepositoryPort**: Contrato para autenticación
- **ISoapClientPort**: Contrato para cliente SOAP
- **ITicketStoragePort**: Contrato para almacenamiento de tickets
- **ILoggerPort**: Contrato para logging

### 4. Infrastructure (Infraestructura)

**Responsabilidad**: Implementa los adaptadores que conectan con sistemas externos.

#### Outbound Adapters (Adaptadores de Salida)

- **SoapClientAdapter**: Implementa `ISoapClientPort` usando la librería `soap`
- **AfipAuthRepositoryAdapter**: Implementa `IAuthRepositoryPort` para autenticación con AFIP
- **FileSystemTicketStorageAdapter**: Implementa `ITicketStoragePort` usando sistema de archivos
- **WinstonLoggerAdapter**: Implementa `ILoggerPort` usando Winston

## Flujo de Dependencias

```
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                     │
│  (Use Cases, Application Services)                      │
│                                                          │
│  ┌──────────────┐         ┌──────────────┐             │
│  │  Use Cases   │────────▶│   Ports      │             │
│  └──────────────┘         └──────────────┘             │
└─────────────────────────────────────────────────────────┘
                          │
                          │ depends on
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      Domain Layer                       │
│  (Entities, Value Objects)                              │
│                                                          │
│  ┌──────────────┐         ┌──────────────┐             │
│  │  Entities    │         │ Value Objects│             │
│  └──────────────┘         └──────────────┘             │
└─────────────────────────────────────────────────────────┘
                          ▲
                          │ implements
                          │
┌─────────────────────────────────────────────────────────┐
│                  Infrastructure Layer                    │
│  (Adapters)                                              │
│                                                          │
│  ┌──────────────┐         ┌──────────────┐             │
│  │   Adapters   │────────▶│   External   │             │
│  └──────────────┘         │   Systems    │             │
└─────────────────────────────────────────────────────────┘
```

## Principios de Diseño

### 1. Dependency Inversion Principle (DIP)
- La capa de aplicación depende de abstracciones (ports), no de implementaciones
- La infraestructura implementa los ports definidos por la aplicación

### 2. Single Responsibility Principle (SRP)
- Cada caso de uso tiene una única responsabilidad
- Cada adaptador implementa un solo puerto

### 3. Open/Closed Principle (OCP)
- Se pueden agregar nuevos casos de uso sin modificar existentes
- Se pueden agregar nuevos adaptadores sin modificar la aplicación

### 4. Interface Segregation Principle (ISP)
- Los ports están segregados por responsabilidad
- Los adaptadores solo implementan lo que necesitan

## Ejemplo de Flujo: Crear un Voucher

```
1. Cliente llama a: arca.electronicBillingService.createVoucher(data)

2. ElectronicBillingService (Application Service)
   └─▶ CreateVoucherUseCase.execute(voucherData)

3. CreateVoucherUseCase (Use Case)
   ├─▶ Crea entidad Voucher (Domain)
   │   └─▶ Voucher.validate() - Validaciones de negocio
   ├─▶ Obtiene cliente SOAP autenticado
   │   └─▶ IAuthRepositoryPort.requestLogin() (Port)
   │       └─▶ AfipAuthRepositoryAdapter (Infrastructure)
   └─▶ Llama al servicio SOAP
       └─▶ ISoapClientPort.call() (Port)
           └─▶ SoapClientAdapter (Infrastructure)
               └─▶ Servidor AFIP (External)
```

## Ventajas de esta Arquitectura

1. **Testabilidad**: Fácil mockear ports para testear casos de uso
2. **Mantenibilidad**: Separación clara de responsabilidades
3. **Flexibilidad**: Fácil cambiar implementaciones (ej: cambiar SOAP por REST)
4. **Escalabilidad**: Fácil agregar nuevos casos de uso y adaptadores
5. **Independencia**: La lógica de negocio no depende de librerías externas

## Migración desde Arquitectura Actual

### Fase 1: Crear Estructura Base
- [ ] Crear carpetas: domain, application, interfaces, infrastructure
- [ ] Mover entidades existentes a domain/entities
- [ ] Crear ports básicos en interfaces/

### Fase 2: Crear Adaptadores
- [ ] Implementar SoapClientAdapter
- [ ] Implementar AfipAuthRepositoryAdapter
- [ ] Implementar FileSystemTicketStorageAdapter
- [ ] Implementar WinstonLoggerAdapter

### Fase 3: Crear Casos de Uso
- [ ] Crear casos de uso de autenticación
- [ ] Crear casos de uso de facturación electrónica
- [ ] Crear casos de uso de registro

### Fase 4: Crear Application Services
- [ ] Crear ElectronicBillingService
- [ ] Crear RegisterService

### Fase 5: Integrar con Arca
- [ ] Actualizar clase Arca para usar nueva arquitectura
- [ ] Mantener compatibilidad con API pública

### Fase 6: Tests
- [ ] Actualizar tests unitarios
- [ ] Actualizar tests de integración
- [ ] Crear mocks de ports

## Convenciones de Nomenclatura

- **Entities**: PascalCase, sustantivos (AccessTicket, Voucher)
- **Value Objects**: PascalCase, sustantivos (CUIT, CAE)
- **Use Cases**: PascalCase, verbos + UseCase (CreateVoucherUseCase)
- **Ports**: I + PascalCase + Port (IElectronicBillingPort)
- **Adapters**: PascalCase + Adapter (SoapClientAdapter)
- **Services**: PascalCase + Service (ElectronicBillingService)

## Notas de Implementación

1. **No hay dependencias circulares**: Domain → Application → Interfaces ← Infrastructure
2. **Los adaptadores se inyectan**: Dependency Injection en constructores
3. **Los ports son interfaces TypeScript**: Fáciles de mockear
4. **La clase Arca es el punto de entrada**: Orquesta la creación de servicios

