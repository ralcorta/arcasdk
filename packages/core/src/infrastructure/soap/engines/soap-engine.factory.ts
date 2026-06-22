import type { EngineConfig } from "@infrastructure/types/soap-engine.types";
import { SoapRuntime } from "@infrastructure/utils/soap-runtime";
import { HttpClient, IHttpClient } from "soap";

export async function createSoapEngine(
  config: EngineConfig,
): Promise<IHttpClient> {
  const { useHttpsAgent, runtime, requestOptions } = config;

  if (runtime === SoapRuntime.Node) {
    const httpClient = new HttpClient(requestOptions);

    if (useHttpsAgent) {
      const { createLegacyHttpsAgent } = await import("./node-security.engine");
      const agent = await createLegacyHttpsAgent();
      const originalRequest = httpClient.request.bind(httpClient);
      httpClient.request = (rurl, data, callback, exheaders, exoptions) => {
        return originalRequest(rurl, data, callback, exheaders, {
          ...exoptions,
          httpsAgent: exoptions?.httpsAgent || agent,
        });
      };
    }

    return httpClient;
  }

  const { FetchHttpClient } = await import("./universal-transport.engine");
  return new FetchHttpClient();
}
