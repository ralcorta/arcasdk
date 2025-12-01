/**
 * Generic Service
 * Service for making generic requests to AFIP/ARCA
 */
import { IGenericRepositoryPort } from "@application/ports/generic/generic-repository.port";

export class GenericService {
  constructor(private readonly repository: IGenericRepositoryPort) {}

  /**
   * Call a SOAP method on a service
   * @param serviceName Service name (e.g., 'wsfe', 'ws_sr_padron_a13')
   * @param methodName Method name to call (e.g., 'FECompUltimoAutorizado')
   * @param params Parameters for the method
   * @returns Promise with the result
   */
  async call(
    serviceName: string,
    methodName: string,
    params: any,
    options?: { wsdlContent?: string }
  ): Promise<any> {
    return this.repository.call(serviceName, methodName, params, options);
  }
}
