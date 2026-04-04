import { ISoapClientPort } from "@infrastructure/outbound/ports/soap/soap-client.port";
import type {
  ISoapOptions,
  SoapCallResult,
} from "@infrastructure/types/soap-client.types";
import { Client, createClientAsync, type IOptions } from "soap";
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
    const {
      wsdlContent,
      request: adapterRequestOptions,
      ...soapOptions
    } = options;
    const finalOptions: IOptions & Record<string, unknown> = {
      ...soapOptions,
      disableCache: true,
      forceSoap12Headers: soapOptions.forceSoap12Headers ?? false,
    };

    if (!finalOptions.httpClient) {
      /**
       * We use dynamic import here to avoid loading the entire engines module
       * (which might include Node-specific or Universal-specific code)
       * until we absolutely need it during client creation.
       */
      const { createSoapEngine, detectSoapRuntime } = await import("./engines");
      finalOptions.httpClient = await createSoapEngine({
        runtime: options.runtime ?? detectSoapRuntime(isNode),
        useHttpsAgent: this.useHttpsAgent,
        requestOptions:
          adapterRequestOptions == null
            ? undefined
            : (adapterRequestOptions as IOptions),
      });
    }

    let wsdlXml: string | undefined;
    if (wsdlContent) {
      wsdlXml = wsdlContent;
    } else {
      wsdlXml = getWsdlString(wsdlName);
      if (!wsdlXml) {
        throw new Error(`WSDL ${wsdlName} not found`);
      }
    }

    return (await createClientAsync(wsdlXml, finalOptions)) as T;
  }

  setEndpoint(client: Client, endpoint: string): void {
    if (typeof client.setEndpoint === "function") {
      client.setEndpoint(endpoint);
    }
  }

  async call<T extends SoapCallResult>(
    client: Client,
    methodName: string,
    params: unknown,
  ): Promise<T> {
    const method = client[methodName];
    if (typeof method !== "function") {
      throw new Error(`Method ${methodName} not found on SOAP client`);
    }

    return method(params) as Promise<T>;
  }
}
