/**
 * Generic Repository Port
 * Port defined by the application layer for generic service operations
 */
export interface IGenericRepositoryPort {
  /**
   * Call a SOAP method on a service
   * @param serviceName Service name (e.g., 'wsfe', 'ws_sr_padron_a13')
   * @param methodName Method name to call (e.g., 'FECompUltimoAutorizado')
   * @param params Parameters for the method
   * @returns Promise with the result
   */
  call(
    serviceName: string,
    methodName: string,
    params: any,
    options?: { wsdlContent?: string }
  ): Promise<any>;
}
