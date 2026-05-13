import { ServiceNamesEnum } from "@infrastructure/constants/service-names.enum";

export interface IGenericRepositoryPort {
  /**
   * Call a SOAP method on a service
   * @param serviceName AFIP/ARCA SOAP service (WSDL key)
   * @param methodName Method name to call (e.g., 'FECompUltimoAutorizado')
   * @param params Parameters for the method
   * @returns Promise with the result
   */
  call(
    serviceName: ServiceNamesEnum,
    methodName: string,
    params: Record<string, unknown>,
    options?: { wsdlContent?: string },
  ): Promise<unknown>;
}
