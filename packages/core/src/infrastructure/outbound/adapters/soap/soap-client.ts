/**
 * SOAP Client
 * Implements ISoapClientPort using the soap library
 */
import { ISoapClientPort } from "@infrastructure/outbound/ports/soap/soap-client.port";
import { SoapClientFacade } from "./soap-client-facade";
import { Client } from "soap";
import * as https from "https";
import { MIN_DH_SIZE_LEGACY } from "@infrastructure/constants/ssl.constants";

export class SoapClient implements ISoapClientPort {
  async createClient<T extends Client>(
    wsdlPath: string,
    options?: any
  ): Promise<T> {
    // Create HTTPS agent for legacy servers (AFIP uses weak DH parameters)
    const legacyHttpsAgent = new https.Agent({
      rejectUnauthorized: true,
      minDHSize: MIN_DH_SIZE_LEGACY,
    });

    const finalOptions = {
      disableCache: true,
      forceSoap12Headers: options?.forceSoap12Headers ?? false,
      wsdl_options: {
        httpsAgent: legacyHttpsAgent,
      },
      request: {
        httpsAgent: legacyHttpsAgent,
      } as any,
      ...options,
    };

    return SoapClientFacade.create<T>({
      wsdl: wsdlPath,
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
