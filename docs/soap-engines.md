# Engines SOAP y runtimes

Esta guía explica cómo el SDK selecciona el transporte SOAP según el entorno de ejecución y cómo inyectar un engine personalizado.

## Selección automática de engine

El SDK detecta el runtime y selecciona un engine SOAP:

- **Node.js**: usa `HttpClient` de `soap`.
- **Universal**: `fetch` para Workers, navegadores y demás entornos no-Node.

La detección se realiza con `detectSoapRuntime` y el engine se crea con `createSoapEngine`.

## Compatibilidad con ARCA/AFIP

- En **Node.js** se puede habilitar compatibilidad TLS legacy (`useHttpsAgent`) para servidores que lo requieran.
- En **Universal** (Workers, edge, etc.) no existe `https.Agent`; dependen de la pila TLS del runtime.

Si un endpoint requiere renegociación o parámetros TLS legacy específicos, el entorno recomendado es Node.js.

## Inyectar un engine personalizado

Podés inyectar tu propio transporte SOAP pasando `httpClient` al crear el cliente.  
Cuando `httpClient` está definido, no se usa el engine default del SDK.

```ts
import type { IHttpClient } from "soap";
import { SoapClient } from "@arcasdk/core";

const customEngine: IHttpClient = {
  request(rurl, data, callback, exheaders, exoptions) {
    // Implementación custom del transporte
    callback(null, { statusCode: 200, headers: {}, body: "", data: "" }, "");
  },
};

const soapClient = new SoapClient();
const client = await soapClient.createClient("wsaa.wsdl", {
  httpClient: customEngine,
});
```

## Forzar runtime explícitamente

También podés forzar el runtime sin inyectar `httpClient`, para obligar al SDK a usar un engine interno específico.

```ts
import { SoapClient } from "@arcasdk/core";
import { SoapRuntime } from "@arcasdk/core";

const soapClient = new SoapClient();
const client = await soapClient.createClient("wsaa.wsdl", {
  runtime: SoapRuntime.Universal,
});
```

## Cuándo usar cada enfoque

- Usar engine default: recomendado para la mayoría de los casos.
- Inyectar `httpClient`: útil si necesitás observabilidad, retry policies custom o un transporte propio.
