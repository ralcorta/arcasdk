/**
 * Application Types - Results
 * Types for application service results
 */
import { ServiceSoap12Types } from "@infrastructure/outbound/ports/soap/interfaces/Service/ServiceSoap12";

export interface ICreateVoucherResult {
  response: ServiceSoap12Types.IFECAESolicitarResult;
  cae: string;
  caeFchVto: string;
}
