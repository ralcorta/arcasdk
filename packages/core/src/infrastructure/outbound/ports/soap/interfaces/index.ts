/**
 * SOAP Interfaces
 * Re-export interfaces with namespaces to avoid naming conflicts
 *
 * Note: Direct imports from specific files are recommended to avoid conflicts
 * Example: import { ILoginCmsSoap } from "@infrastructure/outbound/ports/soap/interfaces/LoginCMSService/LoginCms"
 */

// Export as namespaces to avoid conflicts
export * as LoginCMSService from "./LoginCMSService/LoginCms";
export * as PersonaServiceA10 from "./PersonaServiceA10/PersonaServiceA10Port";
export * as PersonaServiceA13 from "./PersonaServiceA13/PersonaServiceA13Port";
export * as PersonaServiceA4 from "./PersonaServiceA4/PersonaServiceA4Port";
export * as PersonaServiceA5 from "./PersonaServiceA5/PersonaServiceA5Port";
export * as PersonaServiceInscriptionProof from "./PersonaServiceInscriptionProof/PersonaServiceInscriptionProofPort";
export * as ServiceSoapTypes from "./Service/ServiceSoap";
export * as ServiceSoap12Types from "./Service/ServiceSoap12";
