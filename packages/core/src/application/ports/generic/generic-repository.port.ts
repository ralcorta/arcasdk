import { ArcaServiceName } from "@application/types/service-name.types";

export interface IGenericRepositoryPort {
  call(
    serviceName: ArcaServiceName,
    methodName: string,
    params: Record<string, unknown>,
    options?: { wsdlContent?: string },
  ): Promise<unknown>;
}
