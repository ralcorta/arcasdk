# Arquitectura Hexagonal - Detalle de Implementación

## Estructura Completa de Archivos

```
src/
├── domain/
│   ├── entities/
│   │   ├── access-ticket.entity.ts          # Entidad: Ticket de autenticación
│   │   ├── voucher.entity.ts                # Entidad: Comprobante electrónico
│   │   └── taxpayer.entity.ts               # Entidad: Contribuyente (opcional)
│   │
│   └── value-objects/
│       ├── cuit.vo.ts                       # Value Object: CUIT validado
│       ├── cae.vo.ts                        # Value Object: CAE
│       └── voucher-number.vo.ts             # Value Object: Número de comprobante
│
├── application/
│   ├── use-cases/
│   │   ├── authentication/
│   │   │   └── login.use-case.ts           # Caso de uso: Autenticación
│   │   │
│   │   ├── electronic-billing/
│   │   │   ├── base-electronic-billing.use-case.ts  # Base para casos de uso
│   │   │   ├── create-voucher.use-case.ts           # Crear comprobante
│   │   │   ├── create-next-voucher.use-case.ts      # Crear siguiente comprobante
│   │   │   ├── get-server-status.use-case.ts        # Estado del servidor
│   │   │   ├── get-sales-points.use-case.ts          # Puntos de venta
│   │   │   ├── get-last-voucher.use-case.ts         # Último comprobante
│   │   │   ├── get-voucher-info.use-case.ts         # Info de comprobante
│   │   │   ├── get-voucher-types.use-case.ts         # Tipos de comprobantes
│   │   │   └── get-parameter-types.use-case.ts       # Tipos de parámetros
│   │   │
│   │   └── register/
│   │       ├── base-register.use-case.ts             # Base para casos de uso
│   │       ├── get-taxpayer-details.use-case.ts      # Detalles de contribuyente
│   │       └── get-server-status.use-case.ts         # Estado del servidor
│   │
│   └── services/
│       ├── electronic-billing.service.ts    # Servicio de aplicación: Facturación
│       └── register.service.ts              # Servicio de aplicación: Registro
│
├── interfaces/
│   ├── inbound/                             # Puertos de entrada (expuestos)
│   │   ├── electronic-billing.port.ts       # Puerto: Facturación electrónica
│   │   └── register.port.ts                 # Puerto: Registro
│   │
│   └── outbound/                            # Puertos de salida (necesarios)
│       ├── auth-repository.port.ts          # Puerto: Repositorio de autenticación
│       ├── soap-client.port.ts              # Puerto: Cliente SOAP
│       ├── ticket-storage.port.ts           # Puerto: Almacenamiento de tickets
│       └── logger.port.ts                   # Puerto: Logger
│
└── infrastructure/
    ├── inbound/                             # Adaptadores de entrada (opcional)
    │   └── cli/                             # CLI adapter (futuro)
    │
    └── outbound/                            # Adaptadores de salida
        ├── soap/
        │   └── soap-client.adapter.ts       # Adaptador: Cliente SOAP (soap library)
        ├── auth/
        │   └── afip-auth.adapter.ts         # Adaptador: Autenticación AFIP
        ├── storage/
        │   └── file-system-ticket-storage.adapter.ts  # Adaptador: FS para tickets
        └── logger/
            └── winston-logger.adapter.ts    # Adaptador: Logger Winston
```

## Detalle de Componentes

### Domain Layer

#### Entities

**access-ticket.entity.ts**
```typescript
export class AccessTicket {
  private constructor(
    private readonly header: ILoginCmsReturnHeaders,
    private readonly credentials: ILoginCmsReturnCredentials
  ) {}

  static create(data: ILoginCredentials): AccessTicket {
    // Validaciones de creación
    return new AccessTicket(data.header, data.credentials);
  }

  getSign(): string
  getToken(): string
  getExpiration(): Date
  isExpired(): boolean
  getWSAuthFormat(cuit: number): WSAuthParam
}
```

**voucher.entity.ts**
```typescript
export class Voucher {
  private constructor(private readonly data: IVoucher) {
    this.validate();
  }

  static create(data: IVoucher): Voucher {
    return new Voucher(data);
  }

  private validate(): void {
    // Validaciones de negocio:
    // - PtoVta > 0
    // - CbteTipo > 0
    // - CbteDesde <= CbteHasta
    // - Factura C (tipo 11) no tiene IVA
    // - ImpTotal = ImpNeto + ImpTrib + ImpIVA
  }

  getPtoVta(): number
  getCbteTipo(): number
  getImpTotal(): number
  isFacturaC(): boolean
  toDTO(): IVoucher
}
```

#### Value Objects

**cuit.vo.ts**
```typescript
export class CUIT {
  private constructor(private readonly value: number) {
    this.validate();
  }

  static create(value: number | string): CUIT {
    const numValue = typeof value === 'string' ? parseInt(value) : value;
    return new CUIT(numValue);
  }

  private validate(): void {
    // Validar formato de CUIT
  }

  getValue(): number
  toString(): string
}
```

### Application Layer

#### Use Cases

**base-electronic-billing.use-case.ts**
```typescript
export abstract class BaseElectronicBillingUseCase {
  protected constructor(
    protected readonly authRepository: IAuthRepositoryPort,
    protected readonly soapClient: ISoapClientPort,
    protected readonly logger: ILoggerPort,
    protected readonly cuit: number,
    protected readonly serviceName: ServiceNamesEnum,
    protected readonly wsdlPath: WsdlPathEnum,
    protected readonly endpoint: EndpointsEnum
  ) {}

  protected async getAuthenticatedClient<T>(): Promise<T> {
    // Obtiene cliente SOAP autenticado
    // Crea proxy que inyecta auth automáticamente
  }
}
```

**create-voucher.use-case.ts**
```typescript
export class CreateVoucherUseCase extends BaseElectronicBillingUseCase {
  async execute(voucherData: IVoucher): Promise<ICreateVoucherResult> {
    // 1. Crear entidad Voucher (validaciones de dominio)
    const voucher = Voucher.create(voucherData);
    
    // 2. Obtener cliente SOAP autenticado
    const client = await this.getAuthenticatedClient();
    
    // 3. Preparar request SOAP
    const soapRequest = this.prepareSoapRequest(voucher);
    
    // 4. Llamar servicio SOAP
    const response = await this.soapClient.call(client, "FECAESolicitarAsync", soapRequest);
    
    // 5. Transformar respuesta
    return this.transformResponse(response);
  }
}
```

#### Application Services

**electronic-billing.service.ts**
```typescript
export class ElectronicBillingService implements IElectronicBillingPort {
  constructor(
    private readonly createVoucherUseCase: CreateVoucherUseCase,
    private readonly getSalesPointsUseCase: GetSalesPointsUseCase,
    // ... otros casos de uso
  ) {}

  async createVoucher(voucher: IVoucher): Promise<ICreateVoucherResult> {
    return this.createVoucherUseCase.execute(voucher);
  }

  async getSalesPoints(): Promise<IGetSalesPointsResult> {
    return this.getSalesPointsUseCase.execute();
  }
  
  // ... otros métodos
}
```

### Interfaces Layer (Ports)

#### Inbound Ports

**electronic-billing.port.ts**
```typescript
export interface IElectronicBillingPort {
  getServerStatus(): Promise<IFEDummyOutput>;
  getSalesPoints(): Promise<IGetSalesPointsResult>;
  getVoucherTypes(): Promise<ServiceSoap12Types.IFEParamGetTiposCbteResult>;
  getLastVoucher(salesPoint: number, voucherType: number): Promise<...>;
  getVoucherInfo(number: number, salesPoint: number, type: number): Promise<...>;
  createVoucher(voucher: IVoucher): Promise<ICreateVoucherResult>;
  createNextVoucher(req: INextVoucher): Promise<ICreateVoucherResult>;
  // ... otros métodos
}
```

#### Outbound Ports

**auth-repository.port.ts**
```typescript
export interface IAuthRepositoryPort {
  requestLogin(serviceName: string): Promise<AccessTicket>;
  getAuthParams(ticket: AccessTicket, cuit: number): WSAuthParam;
}
```

**soap-client.port.ts**
```typescript
export interface ISoapClientPort {
  createClient<T>(wsdlPath: string, options?: any): Promise<T>;
  setEndpoint(client: any, endpoint: string): void;
  call<T>(client: any, methodName: string, params: any): Promise<T>;
}
```

**ticket-storage.port.ts**
```typescript
export interface ITicketStoragePort {
  save(ticket: AccessTicket, serviceName: string): Promise<void>;
  get(serviceName: string): Promise<AccessTicket | null>;
  delete(serviceName: string): Promise<void>;
}
```

**logger.port.ts**
```typescript
export interface ILoggerPort {
  info(message: string, meta?: any): void;
  error(message: string, error?: Error, meta?: any): void;
  warn(message: string, meta?: any): void;
  debug(message: string, meta?: any): void;
}
```

### Infrastructure Layer

#### Adapters

**soap-client.adapter.ts**
```typescript
export class SoapClientAdapter implements ISoapClientPort {
  constructor(private readonly soapClientFacade: SoapClientFacade) {}

  async createClient<T>(wsdlPath: string, options?: any): Promise<T> {
    // Usa SoapClientFacade para crear cliente
    // Configura HTTPS agent para servidores legacy
    return this.soapClientFacade.create<T>({ wsdl: wsdlPath, options });
  }

  setEndpoint(client: any, endpoint: string): void {
    client.setEndpoint(endpoint);
  }

  async call<T>(client: any, methodName: string, params: any): Promise<T> {
    return client[methodName](params);
  }
}
```

**afip-auth.adapter.ts**
```typescript
export class AfipAuthRepositoryAdapter implements IAuthRepositoryPort {
  constructor(
    private readonly soapClient: ISoapClientPort,
    private readonly ticketStorage: ITicketStoragePort,
    private readonly config: AuthConfig
  ) {}

  async requestLogin(serviceName: string): Promise<AccessTicket> {
    // 1. Verificar si hay ticket válido en storage
    // 2. Si no, crear TRA y firmarlo
    // 3. Llamar a WSAA
    // 4. Parsear respuesta y crear AccessTicket
    // 5. Guardar en storage si handleTicket es false
    return ticket;
  }

  getAuthParams(ticket: AccessTicket, cuit: number): WSAuthParam {
    return ticket.getWSAuthFormat(cuit);
  }
}
```

**file-system-ticket-storage.adapter.ts**
```typescript
export class FileSystemTicketStorageAdapter implements ITicketStoragePort {
  constructor(private readonly config: StorageConfig) {}

  async save(ticket: AccessTicket, serviceName: string): Promise<void> {
    // Guardar en archivo JSON
  }

  async get(serviceName: string): Promise<AccessTicket | null> {
    // Leer de archivo JSON
    // Retornar null si no existe o está expirado
  }

  async delete(serviceName: string): Promise<void> {
    // Eliminar archivo
  }
}
```

**winston-logger.adapter.ts**
```typescript
export class WinstonLoggerAdapter implements ILoggerPort {
  constructor(private readonly logger: winston.Logger) {}

  info(message: string, meta?: any): void {
    this.logger.info(message, meta);
  }

  error(message: string, error?: Error, meta?: any): void {
    this.logger.error(message, { error, ...meta });
  }

  // ... otros métodos
}
```

## Integración: Clase Arca

**arca.ts**
```typescript
export class Arca {
  private readonly electronicBillingService: ElectronicBillingService;
  private readonly registerService: RegisterService;

  constructor(context: Context) {
    // 1. Crear adaptadores (infrastructure)
    const soapClient = new SoapClientAdapter(new SoapClientFacade());
    const ticketStorage = new FileSystemTicketStorageAdapter({
      ticketPath: context.ticketPath,
      cuit: context.cuit,
      production: context.production,
    });
    const authRepository = new AfipAuthRepositoryAdapter(
      soapClient,
      ticketStorage,
      {
        cert: context.cert,
        key: context.key,
        cuit: context.cuit,
        production: context.production,
        handleTicket: context.handleTicket,
      }
    );
    const logger = new WinstonLoggerAdapter(
      createArcaLogger(context.enableLogging ?? false)
    );

    // 2. Crear casos de uso (application)
    const createVoucherUseCase = new CreateVoucherUseCase(
      authRepository,
      soapClient,
      logger,
      context.cuit,
      ServiceNamesEnum.WSFE,
      WsdlPathEnum.WSFE,
      EndpointsEnum.WSFEV1
    );
    // ... otros casos de uso

    // 3. Crear servicios de aplicación (application)
    this.electronicBillingService = new ElectronicBillingService(
      createVoucherUseCase,
      getSalesPointsUseCase,
      // ... otros casos de uso
    );

    // 4. Similar para registerService
  }
}
```

## Flujo de Dependencias Detallado

```
┌─────────────────────────────────────────────────────────────┐
│                      Arca (Entry Point)                      │
│  - Crea adaptadores                                          │
│  - Crea casos de uso                                         │
│  - Crea servicios de aplicación                              │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│              Application Services                            │
│  - ElectronicBillingService                                  │
│  - RegisterService                                           │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Use Cases                                 │
│  - CreateVoucherUseCase                                       │
│  - GetSalesPointsUseCase                                      │
│  - ...                                                        │
└─────────────────────────────────────────────────────────────┘
         │                              │
         │                              │
         ▼                              ▼
┌──────────────────┐        ┌──────────────────────────────┐
│   Domain         │        │      Ports (Interfaces)        │
│   - Entities     │        │  - IAuthRepositoryPort        │
│   - Value Objects│        │  - ISoapClientPort             │
└──────────────────┘        │  - ITicketStoragePort        │
                             │  - ILoggerPort               │
                             └──────────────────────────────┘
                                        ▲
                                        │ implements
                                        │
                             ┌──────────────────────────────┐
                             │      Adapters                │
                             │  - AfipAuthRepositoryAdapter │
                             │  - SoapClientAdapter         │
                             │  - FileSystemTicketStorage   │
                             │  - WinstonLoggerAdapter      │
                             └──────────────────────────────┘
```

## Principios Aplicados

1. **Dependency Inversion**: Application depende de Ports, no de Adapters
2. **Single Responsibility**: Cada clase tiene una única responsabilidad
3. **Open/Closed**: Fácil agregar nuevos casos de uso sin modificar existentes
4. **Interface Segregation**: Ports pequeños y específicos
5. **Dependency Injection**: Todas las dependencias se inyectan

## Testing Strategy

### Unit Tests
- **Domain**: Testear entidades y value objects directamente
- **Use Cases**: Mockear ports para testear lógica de casos de uso
- **Adapters**: Testear adaptadores con mocks de librerías externas

### Integration Tests
- Testear flujo completo: Arca → Service → Use Case → Adapter → External System
- Usar certificados reales de homologación
- Verificar respuestas reales de AFIP

## Ventajas de esta Estructura

1. **Testabilidad**: Fácil mockear ports
2. **Mantenibilidad**: Separación clara de responsabilidades
3. **Flexibilidad**: Cambiar implementaciones sin afectar lógica de negocio
4. **Escalabilidad**: Agregar nuevos casos de uso es simple
5. **Claridad**: Estructura predecible y fácil de navegar

