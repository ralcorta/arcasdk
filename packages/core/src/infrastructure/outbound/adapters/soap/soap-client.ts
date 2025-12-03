/**
 * SOAP Client
 * Implements ISoapClientPort using the soap library
 */
import { ISoapClientPort } from "@infrastructure/outbound/ports/soap/soap-client.port";
import { SoapClientFacade } from "./soap-client-facade";
import { Client } from "soap";
import {
  MIN_DH_SIZE_LEGACY,
  DEFAULT_USE_HTTPS_AGENT,
} from "@infrastructure/constants";
import { getWsdlString } from "./wsdl-strings";
import { isNode } from "std-env";

export class SoapClient implements ISoapClientPort {
  private useHttpsAgent: boolean;

  constructor(useHttpsAgent: boolean = DEFAULT_USE_HTTPS_AGENT) {
    this.useHttpsAgent = useHttpsAgent;
  }

  async createClient<T extends Client>(
    wsdlName: string,
    options?: any
  ): Promise<T> {
    const finalOptions: any = {
      disableCache: true,
      forceSoap12Headers: options?.forceSoap12Headers ?? false,
      ...options,
    };

    // Only create HTTPS agent if:
    // 1. We're in a Node.js environment (detected via std-env)
    // 2. useHttpsAgent is enabled (see DEFAULT_USE_HTTPS_AGENT constant)
    if (this.useHttpsAgent && isNode) {
      try {
        // Dynamic import to avoid issues in non-Node environments
        const https = await import("https");
        const legacyHttpsAgent = new https.Agent({
          rejectUnauthorized: true,
          minDHSize: MIN_DH_SIZE_LEGACY,
        });

        finalOptions.wsdl_options = {
          ...finalOptions.wsdl_options,
          httpsAgent: legacyHttpsAgent,
        };
        finalOptions.request = {
          ...finalOptions.request,
          httpsAgent: legacyHttpsAgent,
        };
      } catch (error) {
        // If https module is not available (e.g., Cloudflare Workers), skip agent
        // The SOAP library will use the default fetch adapter
        // Silently continue without the agent - this is expected in non-Node environments
      }
    }

    let wsdlXml: string | undefined;
    if (options?.wsdlContent) {
      wsdlXml = options.wsdlContent;
    } else {
      wsdlXml = getWsdlString(wsdlName);
      if (!wsdlXml) {
        throw new Error(`WSDL ${wsdlName} not found`);
      }
    }

    return SoapClientFacade.create<T>({
      wsdl: wsdlXml!,
      options: finalOptions,
    });
  }

  setEndpoint(client: any, endpoint: string): void {
    if (client && typeof client.setEndpoint === "function") {
      client.setEndpoint(endpoint);
    }
  }

  async call<T extends [any, string, any, string]>(
    client: any,
    methodName: string,
    params: any
  ): Promise<T> {
    if (!client || typeof client[methodName] !== "function") {
      throw new Error(`Method ${methodName} not found on SOAP client`);
    }

    return client[methodName](params) as Promise<T>;
  }
}
