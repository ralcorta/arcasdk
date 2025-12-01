/**
 * SOAP Client Port
 * Outbound port for SOAP client operations
 */
import { Client } from "soap";

export interface ISoapClientPort {
  /**
   * Create a SOAP client from a WSDL
   * @param wsdlPath Path to the WSDL file
   * @param options SOAP client options
   * @returns The SOAP client
   */
  createClient<T extends Client>(wsdlName: string, options?: any): Promise<T>;

  /**
   * Set the endpoint URL for the client
   * @param client The SOAP client
   * @param endpoint The endpoint URL
   */
  setEndpoint(client: any, endpoint: string): void;

  /**
   * Execute a SOAP method
   * @param client The SOAP client
   * @param methodName The name of the method to call
   * @param params The parameters for the method
   * @returns The response from the SOAP call (tuple: [result, rawResponse, soapHeader, rawRequest])
   */
  call<T extends [any, string, any, string]>(
    client: any,
    methodName: string,
    params: any
  ): Promise<T>;
}
