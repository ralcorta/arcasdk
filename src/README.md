# Nueva Arquitectura Hexagonal

Esta carpeta contiene la nueva implementación del SDK usando arquitectura hexagonal (Ports & Adapters).

## Estructura

```
src/
├── domain/                    # Lógica de negocio pura
│   ├── entities/               # Entidades de dominio
│   └── value-objects/         # Value Objects inmutables
│
├── application/               # Casos de uso y servicios de aplicación
│   ├── use-cases/            # Casos de uso específicos
│   │   ├── authentication/
│   │   ├── electronic-billing/
│   │   └── register/
│   └── services/              # Servicios de aplicación (orquestadores)
│
├── interfaces/                # Contratos (Ports)
│   ├── inbound/              # Puertos de entrada (expuestos)
│   └── outbound/             # Puertos de salida (necesarios)
│
└── infrastructure/            # Implementaciones (Adapters)
    └── outbound/              # Adaptadores de salida
        ├── soap/
        ├── auth/
        ├── storage/
        └── logger/
```

## Backup

El código anterior está en `src.backup/` para referencia.

## Documentación

Ver `ARCHITECTURE.md` y `ARCHITECTURE_DETAILED.md` en la raíz del proyecto para más detalles.

