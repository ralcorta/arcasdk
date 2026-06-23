# 🚀 Uso Básico

A continuación, veremos cómo instanciar la SDK y realizar una operación básica: crear una factura electrónica.

---

## Inicialización

Para comenzar, necesitas instanciar la clase principal `Arca`. Esta clase actúa como el punto de entrada a todos los servicios.

::: info Requisitos
Asegúrate de tener a mano tu **clave privada** (`key`) y tu **certificado** (`cert`) generados en el portal de ARCA.
:::

```ts
import { Arca } from "@arcasdk/core";

// Instancia la SDK con tus credenciales
const arca = new Arca({
  cuit: 20111111112,
  cert: "contenido_del_certificado", // O path al archivo .crt
  key: "contenido_de_la_clave_privada", // O path al archivo .key
});
```

---

## Ejemplo: Crear Factura (CAE)

El siguiente ejemplo muestra cómo generar un comprobante (Factura B) para un consumidor final.

::: tip Gestión Automática
La SDK maneja automáticamente la obtención del ticket de acceso (TA) si este ha expirado. ¡No necesitas preocuparte por la autenticación manual!
:::

```ts
try {
  const invoice = await arca.electronicBillingService.createVoucher({
    CantReg: 1, // Cantidad de registros
    PtoVta: 1, // Punto de venta configurado en ARCA
    CbteTipo: 6, // 6 = Factura B
    Concepto: 1, // 1 = Productos
    DocTipo: 99, // 99 = Consumidor Final
    DocNro: 0, // 0 para Consumidor Final
    CbteDesde: 1, // Número de comprobante (debe ser el próximo libre)
    CbteHasta: 1,
    CbteFch: "20240101", // Fecha del comprobante (YYYYMMDD como string)
    ImpTotal: 121, // Importe Total
    ImpTotConc: 0, // Importe Neto no Gravado
    ImpNeto: 100, // Importe Neto Gravado
    ImpOpEx: 0, // Importe Exento
    ImpIVA: 21, // Importe IVA
    ImpTrib: 0, // Importe Tributos
    MonId: "PES", // Moneda
    MonCotiz: 1, // Cotización

    // Detalle de IVA (21%)
    Iva: [
      {
        Id: 5, // 5 = 21%
        BaseImp: 100,
        Importe: 21,
      },
    ],
  });

  console.log("CAE Asignado:", invoice.CAE);
  console.log("Vencimiento CAE:", invoice.CAEFchVto);
} catch (error) {
  console.error("Error al facturar:", error.message);
}
```

::: details Ver respuesta completa de ARCA

```json
{
  "CAE": "74154876254185",
  "CAEFchVto": "20240111",
  "Resultado": "A",
  "Reproceso": "N",
  "PtoVta": 1,
  "CbteTipo": 6
}
```

:::

---

## Respuesta de ARCA

La respuesta incluye el **CAE (Código de Autorización Electrónica)** que es el dato más importante:

| Campo         | Descripción                                    |
| ------------- | ---------------------------------------------- |
| **CAE**       | Código único de autorización del comprobante   |
| **CAEFchVto** | Fecha de vencimiento del CAE (YYYYMMDD)        |
| **Resultado** | `A` = Aceptado, `R` = Rechazado, `P` = Parcial |
| **Reproceso** | `S` = Sí, `N` = No                             |
| **PtoVta**    | Punto de venta utilizado                       |
| **CbteTipo**  | Tipo de comprobante                            |

---

## Próximos Pasos

- [Referencia de la API](/referencia-api) — Todos los servicios y exports de `@arcasdk/core`
- [Facturación Electrónica](/services/facturacion_electronica) — Explora todas las opciones de facturación
- [Padrón Alcance 4](/services/consulta_padron_alcance_4) — Consulta datos de contribuyentes
- [Configuración](/config) — Personaliza la SDK para tu entorno
- [Gestión de Credenciales](/credential_management) — Mejores prácticas de seguridad
