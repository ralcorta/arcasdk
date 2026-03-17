import {
  ISoapClientPort,
  ISoapOptions,
} from "@infrastructure/outbound/ports/soap/soap-client.port";
import { Client, createClientAsync } from "soap";
import { DEFAULT_USE_HTTPS_AGENT } from "@infrastructure/constants";
import { getWsdlString } from "./wsdl-strings";
import { isNode } from "std-env";

export class SoapClient implements ISoapClientPort {
  private readonly useHttpsAgent: boolean;

  constructor(useHttpsAgent: boolean = DEFAULT_USE_HTTPS_AGENT) {
    this.useHttpsAgent = useHttpsAgent;
  }

  async createClient<T extends Client>(
    wsdlName: string,
    options: ISoapOptions = {},
  ): Promise<T> {
    const finalOptions: any = {
      disableCache: true,
      forceSoap12Headers: options?.forceSoap12Headers ?? false,
      ...options,
    };

    // Use the unified Factory to handle environment-specific transport
    if (!finalOptions.httpClient) {
      /**
       * We use dynamic import here to avoid loading the entire engines module
       * (which might include Node-specific or Universal-specific code)
       * until we absolutely need it during client creation.
       */
      const { createSoapEngine } = await import("./engines");
      finalOptions.httpClient = await createSoapEngine({
        isNode,
        useHttpsAgent: this.useHttpsAgent,
        requestOptions: finalOptions.request,
      });
    }

    // Resolve WSDL content
    let wsdlXml: string | undefined;
    if (options?.wsdlContent) {
      wsdlXml = options.wsdlContent;
    } else {
      wsdlXml = getWsdlString(wsdlName);
      if (!wsdlXml) {
        throw new Error(`WSDL ${wsdlName} not found`);
      }
    }

    // Create client using soap library
    return (await createClientAsync(wsdlXml!, finalOptions)) as T;
  }

  setEndpoint(client: any, endpoint: string): void {
    if (client && typeof client.setEndpoint === "function") {
      client.setEndpoint(endpoint);
    }
  }

  async call<T extends [any, string, any, string]>(
    client: any,
    methodName: string,
    params: any,
  ): Promise<T> {
    if (!client || typeof client[methodName] !== "function") {
      throw new Error(`Method ${methodName} not found on SOAP client`);
    }

    return client[methodName](params) as Promise<T>;
  }
}
