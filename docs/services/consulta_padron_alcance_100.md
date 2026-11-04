# Padrón Alcance 100

El servicio `registerScopeHundredService` consulta las tablas de parámetros del Padrón de ARCA (Alcance 100): provincias, tipos de domicilio, formas jurídicas, tipos de teléfono y demás códigos que devuelven los otros alcances del Padrón.

::: info Documentación Oficial
[Manual del Desarrollador - ARCA (PDF)](https://www.afip.gob.ar/ws/ws_sr_padron_a100/manual_ws_sr_padron_a100_v2.1.pdf)
:::

::: tip Autorización del certificado
El alias WSAA del servicio es `ws_sr_padron_a100` (`ArcaServiceNames.WSSR_PADRON_HUNDRED`). Hay que autorizarlo para el certificado en el portal de ARCA, igual que los demás alcances.
:::

[[toc]]

---

## Obtener una Colección de Parámetros

Devuelve todos los registros de una tabla de parámetros. El nombre de la tabla es el `collectionName` del anexo 5.1 del manual.

```ts
const provincias =
  await arca.registerScopeHundredService.getParameterCollection(
    "SUPA.E_PROVINCIA",
  );

for (const provincia of provincias?.parameters ?? []) {
  console.log(provincia.id, provincia.description);
}
```

Cada parámetro trae su `id`, su `description` y los atributos de la tabla en `attributes`, indexados por nombre. El `id` coincide con el atributo que indica el manual para cada colección (en `SUPA.E_PROVINCIA`, `COD_PROVINCIA`).

::: details Ver respuesta completa

```json
{
  "name": "SUPA.E_PROVINCIA",
  "fechaHora": "2026-09-25T12:38:03.144Z",
  "parameters": [
    {
      "id": "0",
      "description": "CIUDAD AUTONOMA BUENOS AIRES",
      "attributes": {
        "NOMBRE_PROVINCIA": "CIUDAD AUTONOMA BUENOS AIRES",
        "COD_PROVINCIA": "0",
        "CODIGO_SIM_PROVINCIA": "CF"
      }
    }
  ]
}
```

:::

Si ARCA no devuelve la colección, el método resuelve `null`. Un `collectionName` que no existe produce un error SOAP de ARCA (`ParameterDefinition no encontrada en PUC_PARAM.DICCIONARIO_PARAMETROS`), que el SDK propaga sin modificar.

### Colecciones disponibles

Algunas de las colecciones del anexo 5.1 del manual:

| `collectionName` | Contenido |
| ---------------- | --------- |
| `SUPA.E_PROVINCIA` | Provincias |
| `SUPA.TIPO_DOMICILIO` | Tipos de domicilio |
| `SUPA.TIPO_DATO_ADICIONAL_DOMICILIO` | Tipos de dato adicional del domicilio |
| `SUPA.TIPO_TELEFONO` | Tipos de teléfono |
| `SUPA.TIPO_EMAIL` | Tipos de email |
| `SUPA.TIPO_EMPRESA_JURIDICA` | Formas jurídicas |
| `SUPA.TIPO_DOCUMENTO` | Tipos de documento |
| `SUPA.TIPO_CLAVE_IDENTIFICACION` | Tipos de clave (CUIT, CUIL, CDI) |
| `SUPA.E_ORGANISMO_INFORMANTE` | Organismos informantes |
| `SUPA.E_REGIMEN` | Regímenes vigentes y no vigentes |
| `SUPA.E_CARACTERIZACION` | Caracterizaciones de los contribuyentes |
| `PUC_PARAM.T_CALLE` | Calles (sólo CABA) |
| `PUC_PARAM.T_LOCALIDAD` | Localidades |

La lista completa y el atributo que identifica a cada registro están en el manual.

## Estado del Servidor

Verifica si el servicio de Padrón A100 está operativo. No requiere autenticación.

```ts
const status = await arca.registerScopeHundredService.getServerStatus();
console.log(status);
```

::: details Ver respuesta completa

```json
{
  "appServer": "OK",
  "dbServer": "OK",
  "authServer": "OK"
}
```

:::
