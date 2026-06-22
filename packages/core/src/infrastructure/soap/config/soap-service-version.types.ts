/**
 * SOAP service binding versions.
 */
export const SoapServiceVersions = {
  /** Version 1.2 */
  ServiceSoap12: "ServiceSoap12",
  /** Common version */
  ServiceSoap: "ServiceSoap",
} as const;

export type SoapServiceVersion =
  (typeof SoapServiceVersions)[keyof typeof SoapServiceVersions];
