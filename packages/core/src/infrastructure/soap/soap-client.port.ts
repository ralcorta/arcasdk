import { Client } from "soap";
import type { ISoapOptions, SoapCallResult } from "@infrastructure/types/soap-client.types";

export interface ISoapClientPort {
  
  createClient<T extends Client>(
    wsdlName: string,
    options?: ISoapOptions,
  ): Promise<T>;

  
  setEndpoint(client: Client, endpoint: string): void;

  
  call<T extends SoapCallResult>(
    client: Client,
    methodName: string,
    params: unknown,
  ): Promise<T>;
}
